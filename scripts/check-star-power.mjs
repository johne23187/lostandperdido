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
 await page.emulateMedia({reducedMotion:'no-preference'});await page.setViewportSize({width:390,height:844});
 await page.locator('.watch-section').evaluate(e=>{const r=e.getBoundingClientRect();window.scrollTo({top:scrollY+r.top+Math.max(0,(r.height-innerHeight)/2),behavior:'instant'});});
 const rocketBefore=await page.locator('.space-plane').getAttribute('style');
 await page.locator('.space-plane').evaluate(e=>e.dispatchEvent(new MouseEvent('click',{bubbles:true})));
 await page.waitForFunction(before=>document.querySelector('.space-plane').getAttribute('style')!==before,rocketBefore);
 if(await page.locator('.space-plane').evaluate(e=>e.hasAttribute('role')||e.hasAttribute('tabindex')||getComputedStyle(e).pointerEvents!=='none'))throw Error('Rocket pause control remains');
 await page.locator('.little-detour-star').evaluate(e=>e.scrollIntoView({behavior:'instant',block:'center'}));
 const sample=await page.locator('.little-detour-star').evaluate(async e=>{
  e.click();const style=getComputedStyle(e.querySelector('svg')),fill=getComputedStyle(e.querySelector('svg>path'));
  const result={powered:e.classList.contains('star-powered'),spin:style.animationDuration,color:fill.animationDuration,trail:getComputedStyle(e,'::before').animationName};
  getComputedStyle(e.querySelector('.power-star-eyes')).transform;
  await new Promise(r=>setTimeout(r,300));result.eyes=getComputedStyle(e.querySelector('.power-star-eyes')).display;result.open=document.querySelector('#little-detour').open;return result;
 });
 if(!sample.powered||sample.spin!=='1.1s'||sample.color!=='1.1s'||sample.trail!=='none'||sample.open)throw Error('Original sequence failed '+JSON.stringify(sample));
 if(sample.eyes!=='none')throw Error('Eyes visible during spin '+JSON.stringify(sample));
 await page.waitForFunction(()=>document.querySelector('#little-detour').classList.contains('schedule-ready'));
 await page.waitForTimeout(1000);
 if(await page.locator('#little-detour .power-star-eyes').evaluate(e=>getComputedStyle(e).opacity!=='1'))throw Error('Eyes did not return after arrival');
 for(const [width,height] of [[390,844],[320,640],[844,390]]){await page.setViewportSize({width,height});if(!await page.locator('#little-detour').evaluate(e=>e.scrollHeight<=e.clientHeight+1&&e.scrollWidth<=e.clientWidth+1))throw Error('Racing card overflow '+width);await page.screenshot({path:'.local-data/room-audit/racing-star-'+width+'.png'});}
 await page.keyboard.press('Escape');await page.emulateMedia({reducedMotion:'reduce'});await page.locator('.little-detour-star').evaluate(e=>e.click());if(!await page.locator('#little-detour').evaluate(e=>e.open&&e.classList.contains('schedule-ready')))throw Error('Reduced motion failed');
 if(errors.length)throw Error(errors.join('; '));console.log('Rainbow spin precedes reveal; racing card fits phone and landscape; reduced-motion opening passed.');
}finally{await browser?.close();server.closeAllConnections();await new Promise(r=>server.close(r));}
