import assert from 'node:assert/strict';
import { readFile, mkdtemp } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import vm from 'node:vm';
import { createPollStore } from './poll-store.mjs';
import { createSiteServer } from './server.mjs';

export async function runChecks() {
  const directory = await mkdtemp(join(tmpdir(), 'lp-poll-test-'));
  let now = new Date('2026-09-26T23:59:59Z');
  const filename = join(directory, 'unit.sqlite3');
  let store = createPollStore(filename, () => now);
  assert.equal(store.vote('alice', 'lost').accepted, true);
  assert.equal(store.vote('alice', 'perdido').accepted, false);
  assert.equal(store.snapshot('alice').lost, 1);
  assert.equal(store.snapshot('alice').perdido, 0);
  assert.equal(store.vote('bob', 'perdido').accepted, true);
  store.close();
  store = createPollStore(filename, () => now);
  assert.equal(store.snapshot('alice').choice, 'lost');
  now = new Date('2026-09-27T00:00:00Z');
  assert.equal(store.snapshot('alice').choice, '');
  assert.equal(store.vote('alice', 'perdido').accepted, true);
  assert.equal(store.snapshot('alice').perdido, 2);
  store.close();

  const server = await createSiteServer({ dataDir:directory });
  await new Promise(resolve => server.listen(0, '127.0.0.1', resolve));
  const base = `http://127.0.0.1:${server.address().port}`;
  try {
    const first = await fetch(base + '/api/poll');
    const cookie = first.headers.get('set-cookie').split(';')[0];
    assert.equal((await first.json()).lost, 0);
    const post = choice => fetch(base + '/api/poll', { method:'POST', headers:{'Content-Type':'application/json',Cookie:cookie}, body:JSON.stringify({choice}) });
    const replies = await Promise.all([post('lost'), post('perdido'), post('lost')]);
    assert.deepEqual(replies.map(r => r.status).sort(), [200,409,409]);
    const saved = await (await fetch(base + '/api/poll', {headers:{Cookie:cookie}})).json();
    assert.equal(saved.lost + saved.perdido, 1);
    assert.equal((await post('invalid')).status, 400);
    assert.equal((await fetch(base + '/.local-data/daily-poll.sqlite3')).status, 404);
    const range = await fetch(base + '/index.html', {headers:{Range:'bytes=0-19'}});
    assert.equal(range.status, 206);
    assert.equal((await range.text()).length, 20);
    const eventsAbort = new AbortController();
    const events = await fetch(base + '/api/poll/events', {headers:{Cookie:cookie}, signal:eventsAbort.signal});
    const reader = events.body.getReader();
    assert.match(new TextDecoder().decode((await reader.read()).value), /data:.*"choice"/);
    await fetch(base + '/api/poll', {method:'POST', headers:{'Content-Type':'application/json'}, body:JSON.stringify({choice:'perdido'})});
    assert.match(new TextDecoder().decode((await reader.read()).value), /data:/);
    await reader.cancel();
    eventsAbort.abort();
  } finally {
    server.closeAllConnections();
    await new Promise(resolve => server.close(resolve));
  }

  const source = await readFile(new URL('../script.js', import.meta.url), 'utf8');
  new vm.Script(source);
  // Reproduce closing/reopening while a previous transition still awaits decoding.
  const transition = source.slice(source.indexOf('async function transitionMemory(direction)'), source.indexOf('async function runMemoryTransition'));
  const context = vm.createContext({ setTimeout, clearTimeout, console });
  vm.runInContext(`
    let memoryBusy=false,memoryPlaying=true,memoryGeneration=0,memoryIndex=0,memoryTimer;
    let meetingStory={open:true},memories=[1,2,3],pending=[],scheduled=0;
    function resetPaper(){} function renderMemory(){} function scheduleMemory(){scheduled++;}
    function runMemoryTransition(){return new Promise(resolve=>pending.push(resolve));}
    ${transition}
  `, context);
  const oldRun = vm.runInContext('transitionMemory(1)', context);
  vm.runInContext('memoryGeneration++;memoryBusy=false;', context);
  const currentRun = vm.runInContext('transitionMemory(1)', context);
  vm.runInContext('pending[0]()', context);
  await oldRun;
  assert.equal(vm.runInContext('memoryBusy', context), true, 'An old completion must not unlock the new animation');
  assert.equal(vm.runInContext('scheduled', context), 0);
  vm.runInContext('pending[1]()', context);
  await currentRun;
  assert.equal(vm.runInContext('memoryBusy', context), false);
  for (let i=0; i<20; i++) {
    const run = vm.runInContext('transitionMemory(1)', context);
    vm.runInContext('pending.at(-1)()', context);
    await run;
    assert.equal(vm.runInContext('memoryBusy', context), false);
  }
  return 'Passed: persistent totals, daily rollover, duplicate/concurrent votes, API validation, live events, private-file protection, range requests, JS syntax and 20 repeated animation lifecycle runs.';
}

if (typeof process !== 'undefined' && process.argv[1]?.endsWith('test-site.mjs')) console.log(await runChecks());
