import {pathToFileURL} from 'node:url';
import {join} from 'node:path';
import {homedir} from 'node:os';
import {createSiteServer} from './server.mjs';
const {chromium}=await import(pathToFileURL(join(homedir(),'.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright/index.mjs')).href);
const server=await createSiteServer({dataDir:'.local-data/room-audit'});await new Promise(r=>server.listen(0,'127.0.0.1',r));let browser;
try{
 browser=await chromium.launch({executablePath:'C:/Program Files/Google/Chrome/Application/chrome.exe',headless:true});const page=await browser.newPage({viewport:{width:1440,height:900},reducedMotion:'no-preference'});const errors=[];page.on('pageerror',e=>errors.push(e.message));
 let posts=[];await page.route('**/api/stories',route=>route.fulfill({json:{stories:posts}}));
 await page.goto('http://127.0.0.1:'+server.address().port,{waitUntil:'domcontentloaded'});
 await page.emulateMedia({reducedMotion:'no-preference'});await page.setViewportSize({width:Number(process.argv[2])||390,height:844});
 await page.evaluate(()=>{
  window.shouts=[];const original=window.LPSocialBoom.ohYeah;
  window.LPSocialBoom.ohYeah=function(onEnd){window.shouts.push(performance.now());return original.call(this,()=>{window.shoutEnded=performance.now();onEnd?.();});};
 });
 await page.locator('body').click({position:{x:5,y:5}});await page.evaluate(()=>window.LPSocialBoom.prepare());
 const starHidden=()=>page.locator('.little-detour-star').evaluate(e=>getComputedStyle(e).visibility==='hidden'&&+getComputedStyle(e).opacity===0);
 if(!await starHidden())throw Error('Star visible before reveal');
 const labels=await page.locator('.arrival-lost-label').evaluateAll(nodes=>nodes.map(e=>({color:getComputedStyle(e).color,font:getComputedStyle(e).fontFamily})));
 if(labels.length!==3||labels.some(e=>e.color!=='rgb(237, 53, 63)'||!e.font.includes('DM Sans')))throw Error('Timer label color/font mismatch');
 await page.evaluate(()=>{
  const stage=document.querySelector('.socials-showcase');window.shoutSnapshot=stage.querySelector('.social-burst').cloneNode(true);window.revealPhases=[];
  new MutationObserver(()=>window.revealPhases.push({time:performance.now(),armed:stage.classList.contains('reveal-armed'),active:stage.classList.contains('oh-yeah-active'),departing:stage.classList.contains('oh-yeah-departing'),phones:stage.classList.contains('phones-revealing'),star:getComputedStyle(document.querySelector('.little-detour-star')).visibility})).observe(stage,{attributes:true,attributeFilter:['class']});
 });
 await page.locator('.socials-showcase').scrollIntoViewIfNeeded();
 await page.waitForFunction(()=>window.revealPhases.some(p=>p.active));
 await page.waitForTimeout(700);
 const held=await page.evaluate(()=>({text:+getComputedStyle(document.querySelector('.social-smoke-shout')).opacity,light:+getComputedStyle(document.querySelector('.oh-yeah-electric')).opacity,phones:[...document.querySelectorAll('.social-card')].map(e=>+getComputedStyle(e).opacity),extras:document.querySelectorAll('.oh-yeah-portal,.oh-yeah-echo,.oh-yeah-letter').length}));
 if(held.text!==1||held.light!==0||held.phones.some(n=>n>0)||held.extras)throw Error('Clean two-second hold incorrect: '+JSON.stringify(held));
 const typography=await page.evaluate(()=>{const title=getComputedStyle(document.querySelector('.socials-title')),shout=getComputedStyle(document.querySelector('.social-smoke-shout'));return {same:title.fontFamily===shout.fontFamily&&title.fontWeight===shout.fontWeight,tracking:Math.abs(parseFloat(title.letterSpacing)/parseFloat(title.fontSize)-parseFloat(shout.letterSpacing)/parseFloat(shout.fontSize))};});
 if(!typography.same||typography.tracking>.001)throw Error('Shout typography does not match SOCIALS');
 const titleBounds=await page.locator('.social-smoke-shout').boundingBox();
 if(titleBounds.x<0||titleBounds.x+titleBounds.width>page.viewportSize().width)throw Error('OH YEAH lettering clipped');
 await page.screenshot({path:'.local-data/room-audit/oh-yeah-clean-'+page.viewportSize().width+'.png'});
 await page.waitForFunction(()=>window.revealPhases.some(p=>!p.armed));
 const phases=await page.evaluate(()=>window.revealPhases),hold=phases.find(p=>p.active),outro=phases.find(p=>p.departing&&!p.phones),reveal=phases.find(p=>p.phones);
 if(!outro||outro.star!=='hidden')throw Error('Star appeared before the electric outro');
 const holdTime=outro.time-hold.time,revealDelay=reveal?.time-outro.time;
 if(holdTime<1950||holdTime>2250)throw Error('Title did not hold for two seconds: '+holdTime);
 if(!reveal||reveal.star!=='visible'||revealDelay<270||revealDelay>550)throw Error('Phones did not follow the electric sweep: '+revealDelay);
 const timing=await page.evaluate(()=>({count:window.shouts.length,elapsed:window.shoutEnded-window.shouts[0],duration:window.LPSocialBoom.shoutDuration()}));
 if(timing.count!==1||!Number.isFinite(timing.elapsed)||timing.elapsed<timing.duration-50||timing.elapsed>timing.duration+500)throw Error('Recorded voice was interrupted: '+JSON.stringify(timing));
 if(!await page.locator('.social-card').evaluateAll(nodes=>nodes.every(e=>+getComputedStyle(e).opacity===1)))throw Error('Phones did not settle');
 await page.screenshot({path:'.local-data/room-audit/phones-revealed-'+page.viewportSize().width+'.png'});
 // Freeze the brief electric sweep for visual inspection.
 await page.evaluate(()=>{
  const stage=document.querySelector('.socials-showcase');stage.append(window.shoutSnapshot);stage.classList.add('reveal-armed','reveal-exploding','oh-yeah-departing');
  for(const animation of window.shoutSnapshot.getAnimations({subtree:true})){animation.pause();animation.currentTime=animation.animationName.startsWith('oh-yeah-')?160:10000;}
 });
 await page.screenshot({path:'.local-data/room-audit/oh-yeah-electric-'+page.viewportSize().width+'.png'});
 await page.evaluate(()=>document.querySelector('.social-burst')?.remove());
 await page.emulateMedia({reducedMotion:'reduce'});
 if(!await page.locator('.social-card').evaluateAll(nodes=>nodes.every(e=>+getComputedStyle(e).opacity===1)))throw Error('Reduced motion hid the phones');
 if(errors.length)throw Error(errors.join('; '));
 console.log('Clean title holds two seconds, electric sweep precedes phones, voice completes, reduced motion works.',{holdTime,revealDelay,...timing});
}finally{await browser?.close();server.closeAllConnections();await new Promise(r=>server.close(r));}
