import assert from 'node:assert/strict';
import {mkdtemp,rm} from 'node:fs/promises';
import {tmpdir} from 'node:os';
import {join} from 'node:path';
import {randomUUID} from 'node:crypto';
import {createStoryStore} from './story-store.mjs';
import {createStoriesHandler} from '../netlify/lib/stories.mjs';
const dir=await mkdtemp(join(tmpdir(),'lp-stories-'));
try{
 let now=Date.now();const file=join(dir,'stories.json');const handler=createStoriesHandler(createStoryStore(file),()=>now);
 const post=(body,ip='one',origin='https://example.com')=>handler(new Request('https://example.com/api/stories',{method:'POST',headers:{'Content-Type':'application/json',origin,'x-nf-client-connection-ip':ip},body:JSON.stringify(body)}));
 const body={id:randomUUID(),name:'John',place:'Mendoza',story:'Wrong bus. Best lunch.'};
 assert.equal((await post(body)).status,201);
 assert.equal((await post(body)).status,200,'Retries are idempotent');
 assert.equal((await post({...body,id:randomUUID()})).status,429);
 assert.equal((await post({...body,id:randomUUID(),story:'word '.repeat(101)},'two')).status,400);
 assert.equal((await post({...body,id:randomUUID()},'two','https://other.com')).status,403);
 assert.equal((await post({...body,id:randomUUID(),website:'spam'},'two')).status,400);
 const results=await Promise.all(Array.from({length:5},(_,i)=>post({...body,id:randomUUID(),story:'Story '+i},'visitor-'+i)));
 assert.ok(results.every(result=>result.status===201),'Concurrent stories retained');
 const reopened=createStoriesHandler(createStoryStore(file));
 const snapshot=await (await reopened(new Request('https://example.com/api/stories'))).json();assert.equal(snapshot.stories.length,6,'Stories persist across restart');
 now+=61000;assert.equal((await post({...body,id:randomUUID()})).status,201);
 console.log('Stories passed: persistence, concurrent submissions, retry deduplication, validation, origin and rate limits.');
}finally{await rm(dir,{recursive:true,force:true});}
