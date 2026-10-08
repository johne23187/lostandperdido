import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
const events={},windowEvents={},nodes=[];
function param(){return {value:0,setValueAtTime(){},linearRampToValueAtTime(){},exponentialRampToValueAtTime(){}};}
function node(){const n={frequency:param(),detune:param(),gain:param(),delayTime:param(),playbackRate:param(),threshold:param(),ratio:param(),connect(){},disconnect(){},start(t){this.started=t;},stop(t){this.stopped=t;}};nodes.push(n);return n;}
class AudioContext{constructor(){this.state='suspended';this.currentTime=1;this.sampleRate=1000;}async resume(){this.state='running';}suspend(){this.state='suspended';}async decodeAudioData(){return {duration:.8};}createGain(){return node();}createOscillator(){return node();}createBufferSource(){return node();}createBiquadFilter(){return node();}createDynamicsCompressor(){return node();}createDelay(){return node();}createConvolver(){return node();}createBuffer(c,l){return {getChannelData:()=>new Float32Array(l)};}}
const document={hidden:false,addEventListener:(name,fn)=>{events[name]=fn;}};
const window={AudioContext,addEventListener:(name,fn)=>{windowEvents[name]=fn;}};
vm.runInNewContext(fs.readFileSync(new URL('../social-boom.js',import.meta.url),'utf8'),{document,window,fetch:async()=>({ok:true,arrayBuffer:async()=>new ArrayBuffer(8)}),Math,Set,setTimeout,clearTimeout});
window.LPSocialBoom.fall();window.LPSocialBoom.play();assert.equal(nodes.length,0,'Blocked reveal stays silent without consuming later playback');
await events.pointerdown();await new Promise(resolve=>setImmediate(resolve));
window.LPSocialBoom.fall(1.1);assert.equal(nodes.filter(n=>n.started===1).length,3,'Slide whistle, overtone and vibrato start with the jet');
assert.ok(nodes.some(n=>n.stopped===2.1),'Whistle ends at impact');
const before=nodes.length;window.LPSocialBoom.play();assert.ok(nodes.length>before);assert.ok(nodes.some(n=>n.started===1.55),'Voice follows impact promptly');
assert.equal(nodes.filter(n=>n.buffer?.duration===.8).length,1,'One intelligible voice, without overlapping repeated syllables');
assert.equal(nodes.find(n=>n.buffer?.duration===.8).playbackRate.value,.84,'Voice is modestly deepened for intelligibility');
const after=nodes.length;window.LPSocialBoom.play();assert.equal(nodes.length,after,'Explosion never repeats');
await events.click({isTrusted:true,target:{closest:()=>({disabled:true})}});assert.equal(nodes.length,after,'Disabled controls stay silent');
await events.click({isTrusted:true,target:{closest:()=>({getAttribute:()=>null})}});assert.ok(nodes.length>after,'Clickable controls make a shutter sound');
document.hidden=true;events.visibilitychange();assert.ok(nodes.filter(n=>n.started!==undefined).every(n=>n.stopped===undefined),'Hiding the page stops every source immediately');
console.log('Audio checks passed: gesture gate, whistle timing, voice timing, one-shot reveal, click sounds and cleanup.');
