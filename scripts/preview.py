"""Local preview with byte-range support for the site's video player.
Run: python3 scripts/preview.py [port] (default 8766).
"""
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path
import re
import json
import sqlite3
import sys

ROOT = Path(__file__).resolve().parents[1]

class PreviewHandler(SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=str(ROOT), **kwargs)

    def poll_response(self, vote=None):
        data_dir = ROOT / '.local-data'
        data_dir.mkdir(exist_ok=True)
        with sqlite3.connect(data_dir / 'poll.sqlite3') as db:
            db.execute('CREATE TABLE IF NOT EXISTS votes (voter TEXT PRIMARY KEY, choice TEXT NOT NULL)')
            if vote:
                db.execute('INSERT INTO votes VALUES (?, ?) ON CONFLICT(voter) DO UPDATE SET choice=excluded.choice', vote)
            counts = {'lost': 0, 'perdido': 0}
            counts.update(dict(db.execute('SELECT choice, COUNT(*) FROM votes GROUP BY choice')))
        payload = json.dumps(counts).encode()
        self.send_response(200)
        self.send_header('Content-Type', 'application/json')
        self.send_header('Content-Length', str(len(payload)))
        self.end_headers()
        self.wfile.write(payload)

    def do_GET(self):
        if self.path == '/api/poll':
            return self.poll_response()
        return super().do_GET()

    def do_POST(self):
        if self.path != '/api/poll':
            return self.send_error(404)
        try:
            length = int(self.headers.get('Content-Length', '0'))
            if not 0 < length <= 1024:
                raise ValueError()
            payload = json.loads(self.rfile.read(length))
            voter, choice = payload['voter'], payload['choice']
            if not isinstance(voter, str) or not re.fullmatch(r'[a-zA-Z0-9-]{16,80}', voter) or choice not in ('lost', 'perdido'):
                raise ValueError()
        except (ValueError, KeyError, TypeError):
            return self.send_error(400, 'Invalid vote')
        self.poll_response((voter, choice))

    def end_headers(self):
        self.send_header('Cache-Control', 'no-cache')
        super().end_headers()

    def send_head(self):
        self.byte_range = None
        path = Path(self.translate_path(self.path))
        request = self.headers.get('Range')
        if not request or not path.is_file():
            return super().send_head()
        size = path.stat().st_size
        match = re.fullmatch(r'bytes=(\d*)-(\d*)', request.strip())
        if not match or not any(match.groups()):
            return super().send_head()
        first, last = match.groups()
        start = int(first) if first else max(0, size - int(last))
        end = min(int(last), size - 1) if first and last else size - 1
        if start > end or start >= size:
            self.send_response(416)
            self.send_header('Content-Range', f'bytes */{size}')
            self.send_header('Content-Length', '0')
            self.end_headers()
            return None
        stream = path.open('rb')
        stream.seek(start)
        self.byte_range = (start, end)
        self.send_response(206)
        self.send_header('Content-Type', self.guess_type(str(path)))
        self.send_header('Accept-Ranges', 'bytes')
        self.send_header('Content-Range', f'bytes {start}-{end}/{size}')
        self.send_header('Content-Length', str(end - start + 1))
        self.end_headers()
        return stream

    def copyfile(self, source, outputfile):
        if self.byte_range is None:
            return super().copyfile(source, outputfile)
        remaining = self.byte_range[1] - self.byte_range[0] + 1
        while remaining:
            chunk = source.read(min(65536, remaining))
            if not chunk:
                break
            outputfile.write(chunk)
            remaining -= len(chunk)

if __name__ == '__main__':
    port = int(sys.argv[1]) if len(sys.argv) > 1 else 8766
    print(f'Preview: http://127.0.0.1:{port}/index.html', flush=True)
    ThreadingHTTPServer(('127.0.0.1', port), PreviewHandler).serve_forever()
