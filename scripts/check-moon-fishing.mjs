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
 await page.emulateMedia({reducedMotion:'no-preference'});
 for(const width of [320,390,1440]){
 await page.setViewportSize({width,height:844});await page.locator('.after-dark-moon').scrollIntoViewIfNeeded();
 await page.locator('.after-dark-moon').screenshot({path:'.local-data/room-audit/moon-fisher-'+width+'.png'});
 const rect=await page.locator('.after-dark-moon').boundingBox();if(rect.x<0||rect.x+rect.width>width)throw Error('Moon clips');
 }
 await page.setViewportSize({width:390,height:844});
 await page.locator('.after-dark-moon').evaluate(e=>e.click());await page.waitForTimeout(400);
 if(await page.locator('#lost-after-dark').isVisible())throw Error('Night starts before fall');
 await page.locator('.after-dark-moon').evaluate(e=>e.click());
 await page.locator('#lost-after-dark').waitFor({state:'visible'});
 if(await page.locator('.after-dark-moon').getAttribute('aria-busy'))throw Error('Busy state stuck');
 await page.keyboard.press('Escape');await page.locator('.after-dark-moon').evaluate(e=>e.click());await page.keyboard.press('Escape');await page.waitForTimeout(1300);
 if(await page.locator('#lost-after-dark').isVisible())throw Error('Escape did not cancel fall');
 await page.emulateMedia({reducedMotion:'reduce'});await page.locator('.after-dark-moon').evaluate(e=>e.click());await page.locator('#lost-after-dark').waitFor({state:'visible',timeout:500});
 if(errors.length)throw Error(errors.join('; '));console.log('Moon fishing, mobile framing, delayed entrance, repeat taps, cancellation and reduced motion passed.');
}finally{await browser?.close();server.closeAllConnections();await new Promise(r=>server.close(r));}
