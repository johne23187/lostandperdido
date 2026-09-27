import { getStore } from '@netlify/blobs';
import { createPollHandler } from '../lib/poll.mjs';

export default async function handler(request) {
  // Preview votes never enter the production poll. Site-wide storage persists
  // through production deployments; no server filesystem or secrets are needed.
  const context=process.env.CONTEXT || 'production';
  const name=context==='production'?'lost-perdido-poll-v1':`lost-perdido-poll-preview-${process.env.DEPLOY_ID || context}`;
  const store=getStore({name,consistency:'strong'});
  return createPollHandler(store)(request);
}

export const config = { path:'/api/poll' };
