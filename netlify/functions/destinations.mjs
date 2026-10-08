import { getStore } from '@netlify/blobs';
import { createDestinationsHandler } from '../lib/destinations.mjs';
export default async function handler(request){
 const context=process.env.CONTEXT||'production';
 const name=context==='production'?'lost-perdido-destinations-v1':`lost-perdido-destinations-preview-${process.env.DEPLOY_ID||context}`;
 return createDestinationsHandler(getStore({name,consistency:'strong'}))(request);
}
export const config={path:'/api/destinations'};
