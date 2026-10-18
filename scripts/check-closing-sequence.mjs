import {pathToFileURL} from 'node:url';
import {join} from 'node:path';
import {homedir} from 'node:os';
import {createSiteServer} from './server.mjs';
const {chromium}=await import(pathToFileURL(join(homedir(),'.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright/index.mjs')).href);
const server=await createSiteServer({dataDir:'.local-data/closing-sequence'});await new Promise(r=>server.listen(0,'127.0.0.1',r));let browser;
try{
 browser=await chromium.launch({executablePath:'C:/Program Files/Google/Chrome/Application/chrome.exe',headless:true});const page=await browser.newPage({viewport:{width:1440,height:900},reducedMotion:'reduce'});const errors=[];page.on('pageerror',e=>errors.push(e.message));
 let posts=[];await page.route('**/api/stories',route=>route.fulfill({json:{stories:posts}}));
 await page.goto('http://127.0.0.1:'+server.address().port,{waitUntil:'domcontentloaded'});
 await page.emulateMedia({reducedMotion:'no-preference'});await page.setViewportSize({width:390,height:844});
 const heads=await page.locator('.learning-head').evaluateAll(nodes=>nodes.map(n=>n.dataset.portrait));if(heads.join(',')!=='mateo,john')throw Error('Bodega heads not swapped');
 await page.locator('.garnish-conversation').screenshot({path:'.local-data/room-audit/bodega-swapped.png'});
 await page.locator('.lost-invitation').click();await page.waitForFunction(()=>document.querySelector('.closing').classList.contains('closing-question'));
 if(await page.locator('#how-we-met').isVisible())throw Error('Stamp still opens book');
 if(await page.locator('.mountain-paraglider').evaluate(e=>e.classList.contains('is-flying')))throw Error('Flight before question');
 if(await page.locator('.mountain-paraglider>span').isVisible())throw Error('Reply visible too early');
 await page.waitForFunction(()=>document.querySelector('.closing').classList.contains('closing-answer'));
 if(!await page.locator('.mountain-paraglider>span').isVisible())throw Error('Reply missing');
 if(await page.locator('.mountain-paraglider').evaluate(e=>e.classList.contains('is-flying')))throw Error('Flight before reply');
 await page.locator('.lost-invitation').evaluate(e=>e.click());
 await page.waitForFunction(()=>document.querySelector('.mountain-paraglider').classList.contains('has-landed'));
 await page.waitForFunction(()=>!!document.querySelector('.tiny-bible'));
 await page.waitForFunction(()=>!!document.querySelector('.tiny-cross'));
 if(await page.locator('.tiny-bible').count()!==1||await page.locator('.tiny-cross').count()!==1)throw Error('Duplicate sequence');
 await page.locator('.closing').screenshot({path:'.local-data/room-audit/closing-sequence.png'});
 if(errors.length)throw Error(errors.join('; '));console.log('Bodega head swap and stamp question/reply/flight/blessing order passed, including repeat clicks.');
}finally{await browser?.close();server.closeAllConnections();await new Promise(r=>server.close(r));}
