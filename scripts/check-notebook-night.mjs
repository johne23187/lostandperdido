import {pathToFileURL} from 'node:url';
import {join} from 'node:path';
import {homedir} from 'node:os';
import {createSiteServer} from './server.mjs';
const {chromium}=await import(pathToFileURL(join(homedir(),'.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright/index.mjs')).href);
const server=await createSiteServer({dataDir:'.local-data/room-audit'});await new Promise(r=>server.listen(0,'127.0.0.1',r));let browser;
try{
 browser=await chromium.launch({executablePath:'C:/Program Files/Google/Chrome/Application/chrome.exe',headless:true});const page=await browser.newPage({viewport:{width:1440,height:1000}});const errors=[];page.on('pageerror',e=>errors.push(e.message));
 await page.goto('http://127.0.0.1:'+server.address().port,{waitUntil:'domcontentloaded'});

 await page.locator('.perspective-heading').scrollIntoViewIfNeeded();await page.waitForTimeout(5600);
 if(await page.locator('.caught-magnifier').getAttribute('transform')!=='translate(7 15)')throw Error('Wrong hand');
 await page.locator('.shelf-guide').screenshot({path:'.local-data/room-audit/other-hand.png'});
 for(const width of [1440,390]){
 await page.setViewportSize({width,height:900});await page.locator('.passport-object').evaluate(e=>e.click());
 await page.locator('#passport-reader [data-page="4"]').click();if(width!==1440)await page.locator('#passport-reader [data-step="1"]').click();await page.waitForTimeout(1700);
 if(!await page.locator('.story-notebook-art').isVisible())throw Error('Notebook missing');
 if(!await page.locator('[data-story-journal]').evaluate(e=>e.nextElementSibling.matches('[data-destination-ufo]')))throw Error('UFO not below notebook');
 await page.screenshot({path:'.local-data/room-audit/notebook-'+width+'.png'});
 await page.locator('.travel-journal summary').click();if(!await page.locator('.passport-story-form textarea').isVisible())throw Error('Story form does not open');
 await page.keyboard.press('Escape');
 }
 await page.locator('.after-dark-moon').evaluate(e=>e.click());await page.waitForTimeout(1300);await page.screenshot({path:'.local-data/room-audit/shadow-dancer.png'});await page.waitForTimeout(1800);
 await page.locator('[data-night="1"]').click();
 for(const name of ['Sour Mouse','Barcade','Times Square','7th Street Burger','Fluffies Hot Chicken','Fat Black Pussycat / Comedy Cellar'])if(!await page.locator('.adventure-venues').textContent().then(s=>s.includes(name)))throw Error('Missing '+name);
 await page.locator('[data-adventure="games"]').click();if(!await page.locator('.adventure-venues').textContent().then(s=>s.includes('Sour Mouse')&&s.includes('Barcade')))throw Error('Game filters');
 if(errors.length)throw Error(errors.join('; '));console.log('Other-hand grip, notebook/UFO order, story form, mobile/desktop and all six night picks passed.');
}finally{await browser?.close();server.closeAllConnections();await new Promise(r=>server.close(r));}
