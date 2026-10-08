import { readFile,writeFile,rename } from 'node:fs/promises';
export function createStoryStore(file){
 let queue=Promise.resolve();
 async function read(){try{return JSON.parse(await readFile(file,'utf8'));}catch(error){if(error.code==='ENOENT')return null;throw error;}}
 return {
  getWithMetadata:()=>read(),
  setJSON(key,data,options){
   const result=queue.then(async()=>{const old=await read();if(options.onlyIfNew?!!old:old?.etag!==options.onlyIfMatch)return {modified:false};const next={data,etag:String(Number(old?.etag||0)+1)};await writeFile(file+'.tmp',JSON.stringify(next));await rename(file+'.tmp',file);return {modified:true};});
   queue=result.catch(()=>{});return result;
  }
 };
}
