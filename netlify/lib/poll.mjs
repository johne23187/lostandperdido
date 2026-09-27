import { createHash, randomUUID } from 'node:crypto';
import { Buffer } from 'node:buffer';

// One conditional write updates the totals and eligibility together. Retried
// concurrent votes cannot overwrite each other or count the same browser twice.
export function createPollHandler(store, clock = () => new Date()) {
  return async function handle(request) {
    const cookie = request.headers.get('cookie')?.match(/(?:^|;\s*)lp_poll=([a-f0-9-]{36})(?:;|$)/);
    const identity = cookie?.[1] || randomUUID();
    const voter = createHash('sha256').update(identity).digest('hex');
    const day = clock().toISOString().slice(0, 10);
    const headers = { 'Cache-Control':'no-store', 'Content-Type':'application/json' };
    if (!cookie) headers['Set-Cookie'] = `lp_poll=${identity}; Path=/; Max-Age=34560000; HttpOnly; Secure; SameSite=Lax`;
    function respond(status, data) { return new Response(JSON.stringify(data), {status,headers}); }
    function snapshot(state) {
      const last = state.voters[voter];
      return { lost:state.lost, perdido:state.perdido, choice:last?.day===day ? last.choice : '', day,
        nextVoteAt:new Date(Date.parse(day)+86400000).toISOString(), live:'poll' };
    }
    try {
      if (!['GET','POST'].includes(request.method)) return respond(405,{error:'Method not allowed'});
      let choice;
      if (request.method === 'POST') {
        if (!request.headers.get('content-type')?.startsWith('application/json')) return respond(415,{error:'JSON required'});
        const origin=request.headers.get('origin');
        if (origin && origin!==new URL(request.url).origin) return respond(403,{error:'Same-origin votes only'});
        // Bound the streamed body as well as declared content length.
        const reader=request.body?.getReader();
        if(!reader)return respond(400,{error:'Invalid vote'});
        const chunks=[];let length=0;
        while(true){const {done,value}=await reader.read();if(done)break;length+=value.length;if(length>1024){await reader.cancel();return respond(413,{error:'Request too large'});}chunks.push(value);}
        try { choice=JSON.parse(Buffer.concat(chunks).toString()).choice; } catch { return respond(400,{error:'Invalid vote'}); }
        if(!['lost','perdido'].includes(choice))return respond(400,{error:'Invalid choice'});
      }
      for(let attempt=0;attempt<12;attempt++){
        const current=await store.getWithMetadata('state',{type:'json'});
        const state=current?.data || {lost:0,perdido:0,voters:{}};
        if(!choice)return respond(200,snapshot(state));
        if(state.voters[voter]?.day===day)return respond(409,snapshot(state));
        const next={...state,[choice]:state[choice]+1,voters:{...state.voters,[voter]:{day,choice}}};
        const result=await store.setJSON('state',next,current?{onlyIfMatch:current.etag}:{onlyIfNew:true});
        if(result.modified)return respond(200,{...snapshot(next),accepted:true});
      }
      return respond(503,{error:'The poll is busy. Please try again.'});
    } catch {
      return respond(503,{error:'Voting is temporarily unavailable.'});
    }
  };
}
