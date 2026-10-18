import {pathToFileURL} from 'node:url';
import {join} from 'node:path';
import {homedir} from 'node:os';
import {createSiteServer} from './server.mjs';
const {chromium}=await import(pathToFileURL(join(homedir(),'.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright/index.mjs')).href);
const server=await createSiteServer({dataDir:'.local-data/room-audit'});await new Promise(r=>server.listen(0,'127.0.0.1',r));let browser;
try{
 browser=await chromium.launch({executablePath:'C:/Program Files/Google/Chrome/Application/chrome.exe',headless:true});const page=await browser.newPage({viewport:{width:1440,height:900},reducedMotion:'reduce'});const errors=[];page.on('pageerror',e=>errors.push(e.message));
 let posts=[];await page.route('**/api/stories',route=>route.fulfill({json:{stories:posts}}));
 await page.addInitScript(()=>{
 window.pianoStarts=0;const start=OscillatorNode.prototype.start;OscillatorNode.prototype.start=function(...args){if(new Error().stack.includes('passport-music.js'))window.pianoStarts++;return start.apply(this,args);};
 window.songPlays=0;window.YT={Player:function(holder,opts){this.getIframe=()=>holder;this.unMute=()=>{};this.setVolume=()=>{};this.pauseVideo=()=>{};this.destroy=()=>{};this.playVideo=()=>{window.songPlays++;opts.events.onStateChange({data:1,target:this});};setTimeout(()=>opts.events.onReady({target:this}),5);}};
 });
 await page.goto('http://127.0.0.1:'+server.address().port,{waitUntil:'domcontentloaded'});
 await page.setViewportSize({width:390,height:844});
 await page.locator('.passport-object').click();await page.waitForTimeout(650);
 if(await page.evaluate(()=>window.pianoStarts)<6)throw Error('Passport music did not start');
 await page.locator('.passport-music-toggle').click();const paused=await page.evaluate(()=>window.pianoStarts);await page.waitForTimeout(600);if(await page.evaluate(()=>window.pianoStarts)!==paused)throw Error('Pause failed');
 await page.locator('.passport-music-toggle').click();await page.waitForTimeout(300);if(await page.evaluate(()=>window.pianoStarts)<=paused)throw Error('Resume failed');
 await page.keyboard.press('Escape');const closed=await page.evaluate(()=>window.pianoStarts);await page.waitForTimeout(600);if(await page.evaluate(()=>window.pianoStarts)!==closed)throw Error('Music survived close');
 await page.locator('.how-we-met-link').click();await page.waitForTimeout(150);if(!await page.evaluate(()=>window.songPlays))throw Error('Story click did not play song');await page.keyboard.press('Escape');
 const caption=await page.locator('.shelf-guide>span').evaluate(e=>({font:getComputedStyle(e).fontFamily,border:getComputedStyle(e).borderTopWidth}));if(!caption.font.includes('Caveat')||caption.border!=='0px')throw Error('Caption not restored');
 if(errors.length)throw Error(errors.join('; '));console.log('Passport piano start/pause/resume/close, story-song playback request and original caption passed.');
}finally{await browser?.close();server.closeAllConnections();await new Promise(r=>server.close(r));}
