import assert from 'node:assert/strict';
import { createPollHandler } from '../netlify/lib/poll.mjs';

export async function checkNetlifyPoll(){
  let data=null,etag=0,now=new Date('2026-09-26T23:59:59Z');
  const store={
    async getWithMetadata(){return data?{data:structuredClone(data),etag:String(etag)}:null;},
    async setJSON(key,next,options){
      if((options.onlyIfNew&&data)||(options.onlyIfMatch&&options.onlyIfMatch!==String(etag)))return {modified:false};
      data=structuredClone(next);etag++;return {modified:true,etag:String(etag)};
    }
  };
  const handle=createPollHandler(store,()=>now);
  const url='https://lostandperdido.netlify.app/api/poll';
  const initial=await handle(new Request(url));
  assert.equal(initial.status,200);
  const cookie=initial.headers.get('set-cookie').split(';')[0];
  const request=(choice,identity=cookie)=>new Request(url,{method:'POST',headers:{'Content-Type':'application/json',Cookie:identity},body:JSON.stringify({choice})});
  const same=await Promise.all([handle(request('lost')),handle(request('perdido'))]);
  assert.deepEqual(same.map(r=>r.status).sort(),[200,409]);
  const others=await Promise.all(Array.from({length:6},(_,i)=>handle(request(i%2?'lost':'perdido',`lp_poll=00000000-0000-4000-8000-${String(i).padStart(12,'0')}`))));
  assert(others.every(r=>r.status===200));
  assert.equal(data.lost+data.perdido,7);
  // A new handler (another cold start/deploy) reads the same persistent state.
  const reloaded=createPollHandler(store,()=>now);
  const remembered=await (await reloaded(new Request(url,{headers:{Cookie:cookie}}))).json();
  assert.equal(remembered.choice,'lost');
  now=new Date('2026-09-27T00:00:00Z');
  assert.equal((await (await handle(new Request(url,{headers:{Cookie:cookie}}))).json()).choice,'');
  assert.equal((await handle(request('perdido'))).status,200);
  assert.equal(data.lost+data.perdido,8);
  assert.equal((await handle(request('invalid'))).status,400);
  assert.equal((await handle(new Request(url,{method:'POST',headers:{'Content-Type':'application/json',Origin:'https://other.example'},body:'{"choice":"lost"}'}))).status,403);
  assert.equal((await handle(new Request(url,{method:'POST',headers:{'Content-Type':'application/json'},body:'x'.repeat(1100)}))).status,413);
  return 'Netlify poll: concurrent votes, duplicate protection, persisted identity, UTC rollover and invalid requests passed.';
}

if(typeof process!=='undefined'&&process.argv[1]?.endsWith('test-netlify-poll.mjs'))console.log(await checkNetlifyPoll());
