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
  const voiceResponse=await fetch(base+'/assets/audio/social-boom-voice.wav');
  assert.equal(voiceResponse.status,200,'Local preview must serve the spoken BOOM');
  assert.equal(voiceResponse.headers.get('content-type'),'audio/wav');
  const voiceBytes=Buffer.from(await voiceResponse.arrayBuffer());
  assert.equal(voiceBytes.toString('ascii',0,4),'RIFF','The response must be a WAV, not an error page');
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
    const rangeBytes=Buffer.from(await range.arrayBuffer());
    assert.equal(rangeBytes.length,20,'Range responses count bytes, including a UTF-8 BOM');
    assert.deepEqual(rangeBytes,(await readFile(new URL('../index.html',import.meta.url))).subarray(0,20));
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
  // Exercise the real folding geometry and timeline for two complete albums.
  const transition=source.slice(source.indexOf('function queueMemoryFrame(callback)'),source.indexOf('function startMemory()'));
  const geometry=source.slice(source.indexOf('function makeFoldingPaper(photo)'),source.indexOf('function foldPaper('));
  const context=vm.createContext({clearTimeout,console,setTimeout:()=>0,cancelAnimationFrame:()=>{}});
  vm.runInContext(`
    let memoryBusy=false,memoryPlaying=true,memoryGeneration=0,memoryIndex=0,memoryTimer;
    let meetingStory={open:true},memories=Array.from({length:14},(_,i)=>({src:'photo-'+i,caption:'Photo '+i})),scheduled=0,frames=[],clock=0,foldingPaper=null;
    const albumMotion={matches:false};
    const element=()=>({style:{},classList:{add(){}},setAttribute(key,value){if(String(value).includes('NaN'))throw new Error('Invalid geometry');},append(){},remove(){}});
    const document={hidden:false,createElementNS:element};
    const paperCard={...element(),offsetWidth:180,offsetHeight:222};
    const paperFigure=element(),paperStage={clientWidth:320};
    const albumText=s=>s;
    function requestAnimationFrame(fn){frames.push(fn);}
    function resetPaper(){foldingPaper=null;paperCard.style.transform='';}
    function renderMemory(){} function scheduleMemory(){scheduled++;}
    function suspendMemory(){memoryGeneration++;memoryBusy=false;resetPaper();}
    ${geometry}
    ${transition}
    function drain(){let steps=0;while(frames.length){if(++steps>200)throw new Error('Stalled animation');clock+=16;frames.shift()(clock);}}
  `,context);
  for(let i=0;i<28;i++){
    vm.runInContext('transitionMemory(1);drain()',context);
    assert.equal(vm.runInContext('memoryIndex',context),(i+1)%14);
    assert.equal(vm.runInContext('memoryBusy',context),false);
  }
  vm.runInContext('transitionMemory(1);const stale=frames.shift();suspendMemory();transitionMemory(1);stale(clock)',context);
  assert.equal(vm.runInContext('memoryBusy',context),true,'Stale callbacks cannot unlock a new animation');
  vm.runInContext('drain();albumMotion.matches=true;transitionMemory(1)',context);
  assert.equal(vm.runInContext('memoryBusy',context),false,'Reduced-motion slideshow keeps advancing');
  vm.runInContext('albumMotion.matches=false;transitionMemory(1);document.hidden=true;drain()',context);
  assert.equal(vm.runInContext('memoryBusy',context),false,'Hidden tabs release the active frame');
  vm.runInContext('document.hidden=false;transitionMemory(1);drain()',context);
  assert.equal(vm.runInContext('memoryBusy',context),false,'Playback resumes after hiding');
  // Removing a seal line must not prevent the magazine cover from rendering.
  {
    const books=await readFile(new URL('../editorial-books.js',import.meta.url),'utf8');
    const start=books.indexOf('function localize(){');
    const localize=books.slice(start,books.indexOf('\n',start));
    for(const language of ['en','es']){
      const seal={lastElementChild:{}},cover={innerHTML:'',append(node){this.stamp=node;}};
      const scope={seal,cover,passportButton:{},services:{querySelectorAll:()=>[]},indexLabel:{},endCTA:{},landscape:'cover.jpg',pair:(en,es)=>({en,es}),t:value=>value[language],words:(en,es)=>language==='es'?es:en,magazine:{refresh(){}},passportReader:{refresh(){}},$:()=>({open:false}),window:{}};
      vm.runInNewContext(localize+';localize();localize();',scope);
      assert.match(cover.innerHTML,/magazine-masthead/);
      assert.match(cover.innerHTML,/<img/);
      assert.equal(cover.stamp,seal,'Stamp stays inside the cover after language refresh');
    }
    const scope={window:{}};
    vm.runInNewContext(await readFile(new URL('../globe-interactions.js',import.meta.url),'utf8'),scope);
    for(const width of [280,320,480,700])for(const zoom of [.5,1,2,8]){
      const points=Array.from({length:18},(_,i)=>({x:width/2+(i%4)*12*zoom,y:width/2+Math.floor(i/4)*10*zoom}));
      const original=JSON.stringify(points),groups=scope.window.LPGlobe.cluster(points,42);
      assert.equal(JSON.stringify(points),original,'Clustering must never move geographic anchors');
      assert.equal(groups.flat().length,points.length,'Every destination is retained');
      for(let i=0;i<groups.length;i++)for(let j=i+1;j<groups.length;j++){
        assert.ok(Math.hypot(groups[i][0].x-groups[j][0].x,groups[i][0].y-groups[j][0].y)>=42,'Cluster centers stay separated');
      }
    }
  }
  return 'Passed: persistent totals, daily rollover, duplicate/concurrent votes, API validation, live events, private-file protection, range requests, JS syntax and 28 photo transitions with real fold geometry, close/reopen isolation, reduced motion and hidden-tab recovery.';
}

if (typeof process !== 'undefined' && process.argv[1]?.endsWith('test-site.mjs')) console.log(await runChecks());
