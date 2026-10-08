/* Camera shutters, cartoon falling whistle, and a cinematic crash sequence. */
(() => {
 let context, voice, voiceReady, played=false, lastClick=-Infinity;
 const active=new Set();
 const bytes=fetch('assets/audio/social-boom-voice.wav').then(r=>r.ok?r.arrayBuffer():null).catch(()=>null);
 async function unlock(){
  try{
   const Audio=window.AudioContext||window.webkitAudioContext;if(!Audio)return;
   if(!context){context=new Audio();voiceReady=bytes.then(data=>data&&context.decodeAudioData(data)).then(buffer=>{voice=buffer;}).catch(()=>{});}
   await context.resume();
  }catch{}
 }
 document.addEventListener('pointerdown',unlock,{passive:true});
 document.addEventListener('keydown',unlock);
 function quiet(){for(const node of active){try{node.stop();}catch{}}active.clear();}
 function shortSound(sources,connections){
  let count=sources.length;
  for(const [node,start,end] of sources){active.add(node);node.onended=()=>{active.delete(node);node.disconnect();if(!--count)connections.forEach(n=>n.disconnect());};node.start(start);node.stop(end);}
 }
 function shutter(){
  if(document.hidden||context?.state!=='running')return;
  const now=context.currentTime;if(now-lastClick<.055)return;lastClick=now;
  const output=context.createGain();output.gain.value=.20;output.connect(context.destination);
  const filter=context.createBiquadFilter();filter.type='highpass';filter.frequency.value=900;filter.connect(output);
  const sources=[],connections=[output,filter];
  for(const [delay,duration,level] of [[0,.022,.8],[.043,.055,.55]]){
   const buffer=context.createBuffer(1,Math.ceil(context.sampleRate*duration),context.sampleRate),data=buffer.getChannelData(0);
   for(let i=0;i<data.length;i++)data[i]=(Math.random()*2-1)*Math.exp(-i/data.length*5);
   const source=context.createBufferSource(),gain=context.createGain();source.buffer=buffer;gain.gain.value=level;source.connect(gain);gain.connect(filter);connections.push(gain);sources.push([source,now+delay,now+delay+duration]);
  }
  const body=context.createOscillator(),bodyGain=context.createGain();body.type='triangle';body.frequency.setValueAtTime(440,now);body.frequency.exponentialRampToValueAtTime(130,now+.07);bodyGain.gain.setValueAtTime(.18,now);bodyGain.gain.exponentialRampToValueAtTime(.0001,now+.08);body.connect(bodyGain);bodyGain.connect(output);connections.push(bodyGain);sources.push([body,now,now+.085]);shortSound(sources,connections);
 }
 document.addEventListener('click',async event=>{
  if(!event.isTrusted)return;
  const control=event.target.closest?.('a[href],button,summary,[role="button"],[role="menuitem"],[role="tab"],input[type="submit"]');
  if(!control||control.disabled||control.getAttribute('aria-disabled')==='true')return;
  await unlock();shutter();
 },{capture:true});
 window.LPSocialBoom={async prepare(){
  // Resume the already-unlocked context after browser suspension and decode the voice before impact.
  await Promise.race([unlock(),new Promise(resolve=>setTimeout(resolve,350))]);
  if(context?.state==='running')await Promise.race([voiceReady,new Promise(resolve=>setTimeout(resolve,800))]);
 },fall(duration=1.1){
  if(document.hidden||context?.state!=='running')return;
  const now=context.currentTime,length=Math.max(.2,Math.min(duration,4)),end=now+length;
  const whistle=context.createOscillator(),gain=context.createGain(),wobble=context.createOscillator(),depth=context.createGain(),overtone=context.createOscillator(),overtoneGain=context.createGain();
  // A clean, higher slide whistle: one continuous fall without a buzzy edge.
  whistle.type='sine';overtone.type='sine';
  for(const [oscillator,multiple] of [[whistle,1],[overtone,2]]){
   oscillator.frequency.setValueAtTime(1900*multiple,now);
   for(const [fraction,hz] of [[.08,2200],[1,160]])oscillator.frequency.exponentialRampToValueAtTime(hz*multiple,now+length*fraction);
  }
  // Barely perceptible breath variation, rather than a robotic warble.
  wobble.frequency.setValueAtTime(3,now);wobble.frequency.linearRampToValueAtTime(4,end);
  depth.gain.setValueAtTime(4,now);depth.gain.linearRampToValueAtTime(8,now+length*.7);depth.gain.linearRampToValueAtTime(0,end);
  wobble.connect(depth);depth.connect(whistle.detune);depth.connect(overtone.detune);
  gain.gain.setValueAtTime(.0001,now);gain.gain.exponentialRampToValueAtTime(.16,now+length*.055);gain.gain.setValueAtTime(.16,now+length*.9);gain.gain.exponentialRampToValueAtTime(.0001,end);
  overtoneGain.gain.value=.012;overtone.connect(overtoneGain);overtoneGain.connect(gain);
  whistle.connect(gain);gain.connect(context.destination);shortSound([[whistle,now,end],[wobble,now,end],[overtone,now,end]],[gain,depth,overtoneGain]);
 },play(){
  if(played)return;
  if(document.hidden||context?.state!=='running')return;
  played=true;
  const now=context.currentTime;
  const master=context.createGain();master.gain.value=.95;
  const limiter=context.createDynamicsCompressor();limiter.threshold.value=-8;limiter.ratio.value=8;
  master.connect(limiter);limiter.connect(context.destination);
  const connections=[master,limiter];
  let remaining=0;
  function run(source,start,end){
   remaining++;active.add(source);
   source.onended=()=>{active.delete(source);source.disconnect();if(!--remaining)connections.forEach(n=>n.disconnect());};
   source.start(start);source.stop(end);
  }
  // A descending sub hit and filtered noise make an impact without a harsh crack.
  const sub=context.createOscillator(),subGain=context.createGain();
  sub.frequency.setValueAtTime(100,now);sub.frequency.exponentialRampToValueAtTime(28,now+1.6);
  subGain.gain.setValueAtTime(.0001,now);subGain.gain.exponentialRampToValueAtTime(1.25,now+.012);subGain.gain.exponentialRampToValueAtTime(.045,now+.5);subGain.gain.exponentialRampToValueAtTime(.0001,now+2.1);
  sub.connect(subGain);subGain.connect(master);connections.push(subGain);run(sub,now,now+2.2);
  const noise=context.createBuffer(1,Math.ceil(context.sampleRate*4.8),context.sampleRate),samples=noise.getChannelData(0);
  let brown=0;for(let i=0;i<samples.length;i++){brown=(brown+.035*(Math.random()*2-1))/1.035;samples[i]=brown*6+(Math.random()*2-1)*.12;}
  const blast=context.createBufferSource(),filter=context.createBiquadFilter(),blastGain=context.createGain();blast.buffer=noise;
  filter.type='lowpass';filter.frequency.setValueAtTime(4800,now);filter.frequency.exponentialRampToValueAtTime(90,now+4.6);
  blastGain.gain.setValueAtTime(.0001,now);blastGain.gain.exponentialRampToValueAtTime(2.1,now+.008);blastGain.gain.exponentialRampToValueAtTime(.8,now+.22);blastGain.gain.exponentialRampToValueAtTime(.045,now+.5);blastGain.gain.exponentialRampToValueAtTime(.0001,now+4.7);
  blast.connect(filter);filter.connect(blastGain);blastGain.connect(master);connections.push(filter,blastGain);run(blast,now,now+4.8);
  // A short mid-bass shockwave gives the crash weight even on smaller speakers.
  const shock=context.createOscillator(),shockGain=context.createGain();
  shock.type='triangle';shock.frequency.setValueAtTime(210,now);shock.frequency.exponentialRampToValueAtTime(48,now+.38);
  shockGain.gain.setValueAtTime(.0001,now);shockGain.gain.exponentialRampToValueAtTime(.7,now+.01);shockGain.gain.exponentialRampToValueAtTime(.0001,now+.43);
  shock.connect(shockGain);shockGain.connect(master);connections.push(shockGain);run(shock,now,now+.45);
  if(voice){
   // Keep the direct word dominant; a delayed room tail adds scale without repeated syllables.
   const speech=context.createBufferSource(),gain=context.createGain(),bass=context.createBiquadFilter(),room=context.createConvolver(),wet=context.createGain();
   const rate=.84,tail=3.4,start=now+.55;
   speech.buffer=voice;speech.playbackRate.value=rate;gain.gain.value=1.6;wet.gain.value=.52;
   bass.type='lowshelf';bass.frequency.value=220;bass.gain.value=6;
   const impulse=context.createBuffer(2,Math.ceil(context.sampleRate*tail),context.sampleRate);
   for(let channel=0;channel<2;channel++){
    const samples=impulse.getChannelData(channel);let smooth=0;
    for(let i=0;i<samples.length;i++){
     const elapsed=i/context.sampleRate-.18;if(elapsed<0)continue;
     smooth=.72*smooth+.28*(Math.random()*2-1);
     samples[i]=smooth*Math.exp(-elapsed*1.8);
    }
   }
   room.buffer=impulse;
   speech.connect(bass);bass.connect(gain);gain.connect(master);bass.connect(room);room.connect(wet);wet.connect(master);
   connections.push(gain,bass,room,wet);run(speech,start,start+voice.duration/rate+.05);
   // Retain the graph until the complete reverberation has faded, even after speech ends.
   const tailKeeper=context.createBufferSource();tailKeeper.buffer=context.createBuffer(1,Math.ceil(context.sampleRate*(voice.duration/rate+tail)),context.sampleRate);
   tailKeeper.connect(master);run(tailKeeper,start,start+voice.duration/rate+tail);
  }
 }};
 document.addEventListener('visibilitychange',()=>{if(document.hidden)quiet();});
 window.addEventListener('pagehide',()=>{quiet();context?.suspend();});
})();
