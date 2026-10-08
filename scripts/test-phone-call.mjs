import assert from 'node:assert/strict';
import vm from 'node:vm';
import {readFile} from 'node:fs/promises';
let time=0,next=0,visibleCallback,mutationCallback;const buzzTimes=[];
const timers=new Map(),events={};
class Element{
 constructor(){this.children=[];this.events={};this.attributes={};this.classList={add(value){if(value==='phone-ringing')buzzTimes.push(time);},remove(){}};}
 append(node){this.children.push(node);}after(node){this.sibling=node;}setAttribute(key,value){this.attributes[key]=value;}addEventListener(name,fn){this.events[name]=fn;}
}
const phone=new Element();let modal=false;
const document={body:{},hidden:false,querySelector:selector=>selector==='dialog[open]'?modal:phone,createElement:()=>new Element(),addEventListener:(name,fn)=>events[name]=fn,removeEventListener:name=>delete events[name]};
const scope={document,window:{addEventListener(){}},matchMedia:()=>({matches:false,addEventListener(){}}),setTimeout:(fn,delay)=>{const id=++next;timers.set(id,{fn,at:time+delay});return id;},clearTimeout:id=>timers.delete(id),IntersectionObserver:class{constructor(fn){visibleCallback=fn;}observe(){}},MutationObserver:class{constructor(fn){mutationCallback=fn;}observe(){}}};
function advance(ms){const end=time+ms;while(true){const ready=[...timers].filter(([,timer])=>timer.at<=end).sort((a,b)=>a[1].at-b[1].at)[0];if(!ready)break;time=ready[1].at;timers.delete(ready[0]);ready[1].fn();}time=end;}
vm.runInNewContext(await readFile(new URL('../phone-call.js',import.meta.url),'utf8'),scope);
const bubble=phone.children[0];assert.equal(bubble.attributes['aria-label'],'Messages from L&P: are you lost?');assert.match(bubble.innerHTML,/phone-message-icon/);assert.match(bubble.innerHTML,/are you lost<\/span>/);assert.equal(phone.sibling,undefined,'No sound toggle button');assert.equal(bubble.hidden,true);
visibleCallback([{isIntersecting:true}]);advance(1200+1899);assert.equal(bubble.hidden,true);advance(1);assert.equal(bubble.hidden,false);
advance(2999);assert.equal(bubble.hidden,false);advance(1);assert.equal(bubble.hidden,true,'Message disappears after exactly three seconds');
advance(9000);assert.equal(bubble.hidden,true);assert.ok(buzzTimes.length>=4);for(let i=1;i<buzzTimes.length;i++)assert.equal(buzzTimes[i]-buzzTimes[i-1],3000,'Buzz starts repeat every three seconds');modal=true;mutationCallback();assert.equal(bubble.hidden,true,'Opening a dialog silences and clears phone');advance(40000);assert.equal(bubble.hidden,true);
modal=false;mutationCallback();advance(2000+1900);assert.equal(bubble.hidden,false);document.hidden=true;events.visibilitychange();assert.equal(bubble.hidden,true);assert.equal(timers.size,0,'Hidden pages stop all call timers');
console.log('Phone call passed: call timing, single three-second message, modal interruption and hidden-page cleanup.');
