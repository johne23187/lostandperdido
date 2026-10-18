import assert from 'node:assert/strict';
import {pathToFileURL} from 'node:url';
import {join} from 'node:path';
import {homedir} from 'node:os';
import {createSiteServer} from './server.mjs';
const {chromium}=await import(pathToFileURL(join(homedir(),'.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright/index.mjs')).href);
const server=await createSiteServer({dataDir:'.local-data/parachute-motion'});
await new Promise(r=>server.listen(0,'127.0.0.1',r));
let browser;
try{
 browser=await chromium.launch({executablePath:'C:/Program Files/Google/Chrome/Application/chrome.exe',headless:true});
 for(const width of [320,390,1440]){
  const page=await browser.newPage({viewport:{width,height:900},reducedMotion:'no-preference'});
  const errors=[];page.on('pageerror',e=>errors.push(e.message));
  await page.goto('http://127.0.0.1:'+server.address().port,{waitUntil:'domcontentloaded'});
  await page.locator('.closing').scrollIntoViewIfNeeded();
  const result=await page.evaluate(()=>new Promise(resolve=>{
   const flyer=document.querySelector('.mountain-paraglider');const samples=[];
   let landedFrames=0;
   function sample(t){
    if(flyer.classList.contains('is-flying')||flyer.classList.contains('has-landed')){
     const rect=flyer.getBoundingClientRect(),head=flyer.querySelector('.illustrated-host-portrait');
     samples.push({t,x:rect.x,y:rect.y,head:head?.getAttribute('href'),transform:head?.getAttribute('transform'),landed:flyer.classList.contains('has-landed')});
     if(flyer.classList.contains('has-landed')&&++landedFrames>5){resolve(samples);return;}
    }
    requestAnimationFrame(sample);
   }
   requestAnimationFrame(sample);flyer.click();flyer.click();
  }));
  assert(result.length>20,'Too few animation frames');
  assert(result.every(s=>s.head?.includes('john-yankees')),'Portrait changed during flight');
  const landing=result.findIndex(s=>s.landed),last=result[landing-1],first=result[landing];
  const jump=Math.hypot(first.x-last.x,first.y-last.y);
  assert(jump<2,`Landing snapped ${jump}px at ${width}px`);
  assert(result.slice(landing).every(s=>s.transform===first.transform),'Hat/head shifted after landing');
  let peakSpeed=0;
  for(let i=1;i<landing;i++){
   const a=result[i-1],b=result[i];peakSpeed=Math.max(peakSpeed,Math.hypot(b.x-a.x,b.y-a.y)/(b.t-a.t));
  }
  assert(peakSpeed<1.2,`Unexpected position jump: ${peakSpeed}px/ms`);
  assert.equal(await page.locator('.flight-anchor').count(),0);
  await page.locator('.closing').screenshot({path:`.local-data/room-audit/parachute-${width}.png`});
  assert.deepEqual(errors,[]);
  console.log({width,frames:result.length,landingJump:jump,peakSpeed});await page.close();
 }
 const reduced=await browser.newPage({viewport:{width:390,height:844},reducedMotion:'reduce'});
 await reduced.goto('http://127.0.0.1:'+server.address().port,{waitUntil:'domcontentloaded'});
 await reduced.locator('.mountain-paraglider').evaluate(e=>e.click());
 await reduced.waitForFunction(()=>document.querySelector('.mountain-paraglider').classList.contains('has-landed'));
 assert.equal(await reduced.locator('.flight-anchor').count(),0);await reduced.close();
}finally{await browser?.close();server.closeAllConnections();await new Promise(r=>server.close(r));}
