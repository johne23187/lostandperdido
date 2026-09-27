import { createServer } from 'node:http';
import { createReadStream } from 'node:fs';
import { mkdir, stat } from 'node:fs/promises';
import { resolve, extname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { randomUUID } from 'node:crypto';
import { createPollStore } from './poll-store.mjs';

const root = fileURLToPath(new URL('../', import.meta.url));
const types = { '.html':'text/html; charset=utf-8', '.css':'text/css', '.js':'text/javascript', '.json':'application/json', '.svg':'image/svg+xml', '.png':'image/png', '.jpg':'image/jpeg', '.jpeg':'image/jpeg', '.webp':'image/webp', '.mp4':'video/mp4', '.mov':'video/quicktime', '.woff2':'font/woff2' };

export async function createSiteServer({ dataDir = resolve(root, '.local-data') } = {}) {
  await mkdir(dataDir, { recursive: true });
  const poll = createPollStore(resolve(dataDir, 'daily-poll.sqlite3'));
  const subscribers = new Set();
  const send = (res, code, value) => {
    res.writeHead(code, { 'Content-Type':'application/json', 'Cache-Control':'no-store' });
    res.end(JSON.stringify(value));
  };
  const server = createServer(async (req, res) => {
    try {
      const url = new URL(req.url, 'http://localhost');
      if (url.pathname === '/api/poll' || url.pathname === '/api/poll/events') {
        const cookie = req.headers.cookie?.match(/(?:^|;\s*)lp_poll=([a-f0-9-]{36})(?:;|$)/);
        const voter = cookie?.[1] || randomUUID();
        if (!cookie) res.setHeader('Set-Cookie', `lp_poll=${voter}; Path=/; Max-Age=34560000; HttpOnly; SameSite=Lax${req.headers['x-forwarded-proto'] === 'https' ? '; Secure' : ''}`);
        if (req.method === 'GET' && url.pathname.endsWith('/events')) {
          res.writeHead(200, { 'Content-Type':'text/event-stream', 'Cache-Control':'no-cache', 'Connection':'keep-alive', 'X-Accel-Buffering':'no' });
          const client = { res, voter };
          subscribers.add(client);
          res.write(`data: ${JSON.stringify(poll.snapshot(voter))}\n\n`);
          const heartbeat = setInterval(() => res.write(': keep-alive\n\n'), 25000);
          req.on('close', () => { clearInterval(heartbeat); subscribers.delete(client); });
          return;
        }
        if (req.method === 'GET') return send(res, 200, poll.snapshot(voter));
        if (req.method !== 'POST' || url.pathname !== '/api/poll') return send(res, 405, { error:'Method not allowed' });
        if (!req.headers['content-type']?.startsWith('application/json')) return send(res, 415, { error:'JSON required' });
        if (req.headers.origin && new URL(req.headers.origin).host !== req.headers.host) return send(res, 403, { error:'Same-origin requests only' });
        let body = '';
        for await (const chunk of req) {
          body += chunk;
          if (body.length > 1024) return send(res, 413, { error:'Request too large' });
        }
        let choice;
        try { choice = JSON.parse(body).choice; } catch { return send(res, 400, { error:'Invalid vote' }); }
        if (!['lost','perdido'].includes(choice)) return send(res, 400, { error:'Invalid choice' });
        const result = poll.vote(voter, choice);
        send(res, result.accepted ? 200 : 409, result);
        if (result.accepted) for (const client of subscribers) client.res.write(`data: ${JSON.stringify(poll.snapshot(client.voter))}\n\n`);
        return;
      }
      if (!['GET','HEAD'].includes(req.method)) return send(res, 405, { error:'Method not allowed' });
      const name = decodeURIComponent(url.pathname === '/' ? '/index.html' : url.pathname);
      const file = resolve(root, '.' + name);
      // Serve only public site artifacts; never databases, source tools or dotfiles.
      if (!file.startsWith(root) || name.split(/[\\/]/).some(p => p.startsWith('.')) || name.startsWith('/scripts/') || !types[extname(file).toLowerCase()]) return send(res, 404, { error:'Not found' });
      const info = await stat(file);
      if (!info.isFile()) return send(res, 404, { error:'Not found' });
      let start = 0, end = info.size - 1, status = 200;
      const headers = { 'Content-Type':types[extname(file).toLowerCase()], 'Accept-Ranges':'bytes', 'Cache-Control':'no-cache' };
      if (req.headers.range) {
        const range = /^bytes=(\d*)-(\d*)$/.exec(req.headers.range);
        if (!range || (!range[1] && !range[2])) return send(res, 416, { error:'Invalid range' });
        start = range[1] ? Number(range[1]) : Math.max(0, info.size - Number(range[2]));
        end = range[1] && range[2] ? Math.min(Number(range[2]), end) : end;
        if (start > end || start >= info.size) { res.writeHead(416, { 'Content-Range':`bytes */${info.size}` }); return res.end(); }
        status = 206;
        headers['Content-Range'] = `bytes ${start}-${end}/${info.size}`;
      }
      headers['Content-Length'] = Math.max(0, end - start + 1);
      res.writeHead(status, headers);
      if (req.method === 'HEAD' || !info.size) return res.end();
      createReadStream(file, { start, end }).on('error', () => res.destroy()).pipe(res);
    } catch (error) {
      if (!res.headersSent) send(res, error.code === 'ENOENT' ? 404 : 500, { error:'Request unavailable' });
      else res.end();
    }
  });
  server.on('close', () => { for (const client of subscribers) client.res.end(); poll.close(); });
  return server;
}

if (typeof process !== 'undefined' && process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const server = await createSiteServer({ dataDir:process.env.POLL_DATA_DIR });
  const port = Number(process.env.PORT || process.argv[2] || 8766);
  server.listen(port, process.env.HOST || '127.0.0.1', () => console.log(`Site: http://localhost:${port}`));
}
