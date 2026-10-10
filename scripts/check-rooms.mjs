import {pathToFileURL} from 'node:url';
import {join} from 'node:path';
import {homedir} from 'node:os';
import {createSiteServer} from './server.mjs';
import {mkdir} from 'node:fs/promises';
const {chromium}=await import(pathToFileURL(join(homedir(),'.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright/index.mjs')).href);
const server=await createSiteServer({dataDir:'.local-data/room-audit'});await new Promise(r=>server.listen(0,'127.0.0.1',r));let browser;
try{
 browser=await chromium.launch({executablePath:'C:/Program Files/Google/Chrome/Application/chrome.exe',headless:true});const page=await browser.newPage();const errors=[];page.on('pageerror',e=>errors.push(e.message));
 await page.route('**/api/destinations',route=>route.fulfill({json:{stories:Array.from({length:3},(_,i)=>({place:'Destination '+i,name:'Argentina',story:'A beautiful destination with mountain trails, local food and welcoming people. '.repeat(6)}))}}));
 await page.goto('http://127.0.0.1:'+server.address().port,{waitUntil:'domcontentloaded'});await page.waitForTimeout(1000);await mkdir('.local-data/room-audit',{recursive:true});
 for(const [width,height] of [[1440,900],[390,844],[320,640],[844,390]]){
 await page.setViewportSize({width,height});
 await page.locator('.daily-sun').evaluate(e=>e.click());await page.waitForTimeout(2600);
 for(let i=0;i<14;i++){
 await page.evaluate(i=>{const v=window.LPDailyVerses[i];document.querySelector('#daily-verse blockquote').textContent=v.text;document.querySelector('.daily-verse-reference').textContent=v.reference;},i);
 const fit=await page.locator('#daily-verse').evaluate(e=>({fit:e.scrollHeight<=e.clientHeight+1&&e.scrollWidth<=e.clientWidth+1,h:e.scrollHeight,c:e.clientHeight,compass:!!e.querySelector('.section-compass-dock')}));if(!fit.fit||fit.compass)(()=>{throw Error('Scripture overflow: '+JSON.stringify({width,height,i,fit}));})();
 }
 await page.screenshot({path:'.local-data/room-audit/verse-'+width+'.png'});await page.keyboard.press('Escape');
 await page.locator('.where-next-ship').first().evaluate(e=>e.click());await page.waitForTimeout(300);
 if(!await page.locator('#where-next').evaluate(e=>e.scrollHeight<=e.clientHeight+1&&e.scrollWidth<=e.clientWidth+1))throw Error('Destination overflow at '+width+'x'+height);const previousPage=parseInt(await page.locator('.destination-pager span').textContent(),10);await page.locator('.destination-pager button').last().click();if(!await page.locator('.destination-pager span').textContent().then(t=>parseInt(t,10)===previousPage+1))throw Error('Pagination did not advance');console.log('Viewport fit passed:',width,height);
 await page.screenshot({path:'.local-data/room-audit/next-'+width+'.png'});await page.keyboard.press('Escape');
 await page.locator('.little-detour-star').evaluate(e=>e.click());await page.waitForTimeout(3700);if(!await page.locator('#little-detour').evaluate(e=>e.scrollHeight<=e.clientHeight+1&&e.scrollWidth<=e.clientWidth+1))throw Error('Star overflow at '+width+'x'+height);await page.screenshot({path:'.local-data/room-audit/star-'+width+'.png'});await page.keyboard.press('Escape');
 }
 await page.setViewportSize({width:1440,height:900});await page.locator('.after-dark-moon').evaluate(e=>e.click());await page.waitForTimeout(1400);await page.screenshot({path:'.local-data/room-audit/dancer.png'});if(errors.length)throw Error(errors.join('; '));console.log('All scripture passages, destination pagination, star viewport and runtime checks passed.');
}finally{await browser?.close();server.closeAllConnections();await new Promise(r=>server.close(r));}
