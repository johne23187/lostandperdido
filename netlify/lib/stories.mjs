import { createHash } from 'node:crypto';

export function createStoriesHandler(store, clock=()=>Date.now()) {
 return async request=>{
  const respond=(status,data)=>new Response(JSON.stringify(data),{status,headers:{'Content-Type':'application/json','Cache-Control':'no-store'}});
  try {
   if(!['GET','POST'].includes(request.method))return respond(405,{error:'Method not allowed'});
   let entry;
   if(request.method==='POST'){
    if(request.headers.get('origin') && request.headers.get('origin')!==new URL(request.url).origin)return respond(403,{error:'Same-origin requests only'});
    if(!request.headers.get('content-type')?.startsWith('application/json'))return respond(415,{error:'JSON required'});
    const reader=request.body?.getReader();if(!reader)return respond(400,{error:'Missing story'});
    const chunks=[];let size=0;
    while(true){const {done,value}=await reader.read();if(done)break;size+=value.length;if(size>12000){await reader.cancel();return respond(413,{error:'Story too large'});}chunks.push(value);}
    let body;try{body=JSON.parse(Buffer.concat(chunks).toString());}catch{return respond(400,{error:'Invalid story'});}
    const clean=(value,max)=>typeof value==='string'?value.trim().replace(/[\u0000-\u001f]/g,' ').slice(0,max):'';
    const story=typeof body.story==='string'?body.story.trim():'';
    if(!/^[a-f0-9-]{36}$/.test(body.id||'')||!story||story.length>2500||story.split(/\s+/u).length>100||body.website)return respond(400,{error:'Share a story in 100 words or fewer.'});
    entry={id:body.id,story,name:clean(body.name,40)||'A fellow wanderer',place:clean(body.place,60),createdAt:new Date(clock()).toISOString()};
   }
   for(let attempt=0;attempt<12;attempt++){
    const current=await store.getWithMetadata('journal',{type:'json'});
    const state=current?.data||{stories:[],recent:{}};
    if(!entry)return respond(200,{stories:state.stories});
    const existing=state.stories.find(item=>item.id===entry.id);
    if(existing)return respond(200,{story:existing});
    const identity=createHash('sha256').update(request.headers.get('x-nf-client-connection-ip')||'local').digest('hex');
    if(state.recent[identity] && clock()-state.recent[identity]<60000)return respond(429,{error:'Give this page a minute before adding another story.'});
    const recent=Object.fromEntries(Object.entries(state.recent).filter(([,when])=>clock()-when<60000));recent[identity]=clock();
    const next={stories:[entry,...state.stories].slice(0,300),recent};
    const result=await store.setJSON('journal',next,current?{onlyIfMatch:current.etag}:{onlyIfNew:true});
    if(result.modified)return respond(201,{story:entry});
   }
   return respond(503,{error:'The journal is busy. Please try again.'});
  }catch{return respond(503,{error:'The journal is unavailable. Your draft is still here.'});}
 };
}
