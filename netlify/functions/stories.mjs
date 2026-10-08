import { getStore } from '@netlify/blobs';
import { createStoriesHandler } from '../lib/stories.mjs';
export default async function handler(request){
 const context=process.env.CONTEXT||'production';
 const name=context==='production'?'lost-perdido-stories-v1':`lost-perdido-stories-preview-${process.env.DEPLOY_ID||context}`;
 return createStoriesHandler(getStore({name,consistency:'strong'}))(request);
}
export const config={path:'/api/stories'};
