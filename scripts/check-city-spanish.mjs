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
 const keys=await page.evaluate(()=>Object.keys(window.LPCityHeaders));if(keys.length!==19)throw Error('Missing city photography');
 for(const key of keys){await page.locator(`.city-pin[data-stop="${key}"]`).evaluate(e=>e.click());if(!await page.locator(`#stop-${key} .city-photo-header`).evaluate(e=>e.style.backgroundImage.includes('assets/city-headers/')))throw Error('Photo missing '+key);await page.keyboard.press('Escape');}
 for(const width of [1440,390]){await page.setViewportSize({width,height:844});await page.locator('.city-pin[data-stop="sucre"]').evaluate(e=>e.click());if(!await page.locator('#city-popup').evaluate(e=>e.scrollWidth<=e.clientWidth+1))throw Error('City width overflow');await page.waitForTimeout(300);await page.screenshot({path:'.local-data/room-audit/city-'+width+'.png'});await page.keyboard.press('Escape');}
 await page.evaluate(()=>document.documentElement.lang='es');await page.locator('.daily-sun').evaluate(e=>e.click());if(!await page.locator('#daily-verse blockquote').evaluate(e=>e.lang==='es'&&!e.textContent.includes('undefined')))throw Error('Spanish verse missing');
 for(const [width,height] of [[1440,900],[390,844],[320,640],[844,390]]){await page.setViewportSize({width,height});for(let i=0;i<14;i++){await page.evaluate(i=>{const v=window.LPDailyVerses[i].spanish;document.querySelector('#daily-verse blockquote').textContent=v.text;document.querySelector('.daily-verse-reference').textContent=v.reference;},i);if(!await page.locator('#daily-verse').evaluate(e=>e.scrollHeight<=e.clientHeight+1&&e.scrollWidth<=e.clientWidth+1))throw Error('Spanish overflow '+width+' verse '+i);}}
 await page.keyboard.press('Escape');await page.setViewportSize({width:1440,height:900});await page.locator('.passport-object').evaluate(e=>e.click());await page.locator('#passport-reader [data-page="4"]').click();await page.waitForTimeout(1200);if(await page.locator('.story-refresh').count())throw Error('Refresh button remains');posts=[{id:'automatic',name:'Traveler',place:'Sucre',story:'A wonderful afternoon.'}];await page.waitForTimeout(12500);if(!await page.locator('.story-postcards').textContent().then(s=>s.includes('A wonderful afternoon.')))throw Error('Stories did not refresh automatically');
 if(errors.length)throw Error(errors.join('; '));console.log('19 photo headers, desktop/mobile city cards, all Spanish verses at four sizes, and automatic story updates passed.');
}finally{await browser?.close();server.closeAllConnections();await new Promise(r=>server.close(r));}
