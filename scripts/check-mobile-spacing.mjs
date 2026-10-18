import {pathToFileURL} from 'node:url';
import {join} from 'node:path';
import {homedir} from 'node:os';
import {createSiteServer} from './server.mjs';
const {chromium}=await import(pathToFileURL(join(homedir(),'.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright/index.mjs')).href);
const server=await createSiteServer({dataDir:'.local-data/room-audit'});await new Promise(r=>server.listen(0,'127.0.0.1',r));let browser;
try{
 browser=await chromium.launch({executablePath:'C:/Program Files/Google/Chrome/Application/chrome.exe',headless:true});const page=await browser.newPage({viewport:{width:1440,height:900},reducedMotion:'reduce'});const errors=[];page.on('pageerror',e=>errors.push(e.message));
 let posts=[];await page.route('**/api/stories',route=>route.fulfill({json:{stories:posts}}));
 await page.goto('http://127.0.0.1:'+server.address().port,{waitUntil:'domcontentloaded'});
 for(const width of [320,375,390,430]){
  await page.setViewportSize({width,height:844});
  for(const mode of ['planned','footprint']){
   await page.locator('[data-globe-mode="'+mode+'"]').click();await page.locator('.discovery-title').scrollIntoViewIfNeeded();
   const fit=await page.evaluate(()=>{const a=document.querySelector('.daily-sun').getBoundingClientRect(),b=document.querySelector('.discovery-title').getBoundingClientRect();return a.bottom+8<=b.top;});if(!fit)throw Error('Sun overlaps title at '+width+' '+mode);
   await page.locator('.space-chapter').evaluate(e=>window.scrollTo(0,e.getBoundingClientRect().top+scrollY));await page.screenshot({path:'.local-data/room-audit/mobile-title-'+width+'-'+mode+'.png'});
  }
  await page.locator('.mountain-sitter').scrollIntoViewIfNeeded();
  if(width===320){await page.locator('.mountain-sitter').click();await page.waitForTimeout(8500);}
  const bubbles=await page.locator('.closing').evaluate(e=>{const a=e.querySelector('.mountain-sitter>span').getBoundingClientRect(),b=e.querySelector('.mountain-paraglider>span').getBoundingClientRect(),r=e.getBoundingClientRect();return a.right<=innerWidth&&b.left>=0&&b.right+4<=a.left&&a.bottom<=r.bottom&&b.bottom<=r.bottom;});if(!bubbles){const detail=await page.locator('.closing').evaluate(e=>Object.fromEntries(['.mountain-sitter>span','.mountain-paraglider>span'].map(s=>[s,e.querySelector(s).getBoundingClientRect().toJSON()])));throw Error('Dialogue collision at '+width+' '+JSON.stringify(detail));}
  await page.locator('.closing').screenshot({path:'.local-data/room-audit/mobile-dialogue-'+width+'.png'});
 }
 if(errors.length)throw Error(errors.join('; '));console.log('Both globe headings and seated dialogue fit at 320, 375, 390 and 430px.');
}finally{await browser?.close();server.closeAllConnections();await new Promise(r=>server.close(r));}
