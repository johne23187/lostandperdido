/* Short, gesture-initiated local sound effects. No downloads or autoplay. */
(() => {
 let audio,output,burstTimers=[];
 function ready(){try{const Engine=window.AudioContext||window.webkitAudioContext;if(!Engine)return false;if(!audio){audio=new Engine();output=audio.createGain();output.gain.value=.22;output.connect(audio.destination);}if(audio.state==='suspended')audio.resume().catch(()=>{});return true;}catch{return false;}}
 document.addEventListener('click',ready,{capture:true});
 function tone(frequencies,duration,type='triangle',volume=.2){if(!ready())return;const now=audio.currentTime,osc=audio.createOscillator(),gain=audio.createGain();osc.type=type;frequencies.forEach(([time,hz])=>osc.frequency.exponentialRampToValueAtTime(hz,now+time));gain.gain.setValueAtTime(.0001,now);gain.gain.exponentialRampToValueAtTime(volume,now+.025);gain.gain.exponentialRampToValueAtTime(.0001,now+duration);osc.connect(gain);gain.connect(output);osc.start(now);osc.stop(now+duration);osc.onended=()=>{osc.disconnect();gain.disconnect();};}
 function noise(duration,frequency,volume){if(!ready())return;const now=audio.currentTime,buffer=audio.createBuffer(1,Math.ceil(audio.sampleRate*duration),audio.sampleRate),data=buffer.getChannelData(0);for(let i=0;i<data.length;i++)data[i]=Math.random()*2-1;const source=audio.createBufferSource(),filter=audio.createBiquadFilter(),gain=audio.createGain();source.buffer=buffer;filter.type='bandpass';filter.frequency.setValueAtTime(frequency,now);filter.frequency.exponentialRampToValueAtTime(frequency*.4,now+duration);gain.gain.setValueAtTime(.0001,now);gain.gain.exponentialRampToValueAtTime(volume,now+.008);gain.gain.exponentialRampToValueAtTime(.0001,now+duration);source.connect(filter);filter.connect(gain);gain.connect(output);source.start();source.onended=()=>{source.disconnect();filter.disconnect();gain.disconnect();};}
 // A vintage film-camera capture: mirror slap, curtain snap, spring return.
 function shutter(){
  if(!ready())return;
  const rate=audio.sampleRate,duration=.24,buffer=audio.createBuffer(1,Math.ceil(rate*duration),rate),samples=buffer.getChannelData(0);
  let previous=0;
  for(let i=0;i<samples.length;i++){
   const t=i/rate,white=Math.random()*2-1,transient=white-previous;previous=white;
   const decay=(start,length)=>t>=start?Math.exp(-(t-start)/length):0;
   const mirror=decay(.001,.012),curtain=decay(.043,.006),latch=decay(.108,.016);
   const metal=Math.sin(2*Math.PI*890*t)*decay(.046,.018)+.35*Math.sin(2*Math.PI*1640*t)*decay(.108,.012);
   samples[i]=transient*(mirror*.18+curtain*.34+latch*.12)+Math.sin(2*Math.PI*240*t)*mirror*.22+metal*.07;
  }
  const source=audio.createBufferSource(),filter=audio.createBiquadFilter(),gain=audio.createGain();source.buffer=buffer;filter.type='lowpass';filter.frequency.value=6400;gain.gain.value=.95;source.playbackRate.value=.94+Math.random()*.12;source.connect(filter);filter.connect(gain);gain.connect(output);source.start();source.onended=()=>{source.disconnect();filter.disconnect();gain.disconnect();};
 }
 function stopBurst(){burstTimers.forEach(clearTimeout);burstTimers=[];}
 window.LPEffects={
  meow(){tone([[0,520],[.12,850],[.3,690],[.65,350]],.75,'sawtooth',.1);tone([[0,1040],[.12,1700],[.3,1380],[.65,700]],.7,'sine',.045);},
  fly(){noise(2.8,1100,.5);tone([[0,430],[.8,850],[2.6,220]],2.8,'sine',.09);},
  paparazzi(){stopBurst();if(!ready())return;for(let i=0;i<11;i++)burstTimers.push(setTimeout(()=>{const hall=document.getElementById('lp-top-picks');if(!document.hidden&&hall?.open&&hall.getAttribute('data-hall-entrance')==='true')shutter();},100+i*260+(Math.random()-.5)*140));}
 };
 document.addEventListener('visibilitychange',()=>{if(document.hidden)stopBurst();});
})();
