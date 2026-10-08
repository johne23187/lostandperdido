import assert from 'node:assert/strict';
import {mkdtemp,rm} from 'node:fs/promises';
import {tmpdir} from 'node:os';
import {join} from 'node:path';
import {randomUUID} from 'node:crypto';
import {createSiteServer} from './server.mjs';
const dir=await mkdtemp(join(tmpdir(),'lp-destinations-'));
const server=await createSiteServer({dataDir:dir});
await new Promise(resolve=>server.listen(0,'127.0.0.1',resolve));
const base=`http://127.0.0.1:${server.address().port}`;
try{
 const body={id:randomUUID(),name:'Japan',place:'Kyoto',story:'Night walks and excellent food.'};
 const post=data=>fetch(base+'/api/destinations',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(data)});
 assert.equal((await post({...body,name:''})).status,400);
 assert.equal((await post({...body,place:' '})).status,400);
 assert.equal((await post(body)).status,201);
 assert.equal((await post(body)).status,200);
 assert.equal((await post({...body,id:randomUUID()})).status,429);
 const data=await (await fetch(base+'/api/destinations')).json();
 assert.equal(data.stories.length,1);assert.equal(data.stories[0].place,'Kyoto');
 assert.equal((await (await fetch(base+'/api/stories')).json()).stories.length,0,'Suggestions stay separate from passport stories');
 console.log('Destination API passed: required fields, saving, deduplication, rate limits, and separate storage.');
}finally{await new Promise(resolve=>server.close(resolve));await rm(dir,{recursive:true,force:true});}
