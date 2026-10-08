/* A brief incoming call, then one message. Audio unlocks on a visitor gesture. */
(() => {
 const phone=document.querySelector('.top-picks-launch');
 const bubble=document.createElement('span');bubble.className='phone-message';bubble.setAttribute('aria-label','Messages from L&P: are you lost?');bubble.innerHTML='<span class="phone-message-icon" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="M12 3C6.5 3 2 6.6 2 11c0 2.5 1.5 4.8 3.8 6.2L5 21l4.5-2.2c.8.1 1.6.2 2.5.2 5.5 0 10-3.6 10-8S17.5 3 12 3Z"/></svg></span><span class="phone-message-content"><span class="phone-message-heading"><b>MESSAGES</b><small>now</small></span><span class="phone-message-body">are you lost</span></span>';bubble.hidden=true;phone.append(bubble);
 let context,messageBuffer,messageLoading,enabled=false,visible=false,timer,ringEnd,messageStart,messageEnd,phase='idle',nodes=[];
 const reduced=matchMedia('(prefers-reduced-motion: reduce)');
 function unlock(){try{const Audio=window.AudioContext||window.webkitAudioContext;if(!Audio)return;context??=new Audio();context.resume().catch(()=>{});enabled=true;messageLoading??=fetch('assets/audio/apple-note.mp3').then(response=>{if(!response.ok)throw new Error('Message sound unavailable');return response.arrayBuffer();}).then(bytes=>context.decodeAudioData(bytes)).then(buffer=>{messageBuffer=buffer;}).catch(()=>{messageLoading=null;});}catch{enabled=false;}}
 function messageSound(){
  if(!enabled||context?.state!=='running'||!messageBuffer)return;
  const source=context.createBufferSource(),gain=context.createGain();source.buffer=messageBuffer;gain.gain.value=.3;source.connect(gain);gain.connect(context.destination);nodes.push(source);source.onended=()=>{source.disconnect();gain.disconnect();nodes=nodes.filter(node=>node!==source);};source.start();
 }
 function quiet(){nodes.forEach(node=>{try{node.stop();}catch{}});nodes=[];}
 function tone(frequency,start,duration,volume,type='sine'){
  if(!enabled||context?.state!=='running')return;
  const oscillator=context.createOscillator(),gain=context.createGain(),time=context.currentTime+start;
  oscillator.type=type;oscillator.frequency.value=frequency;gain.gain.setValueAtTime(0,time);gain.gain.linearRampToValueAtTime(volume,time+.025);gain.gain.setValueAtTime(volume,time+duration-.05);gain.gain.exponentialRampToValueAtTime(.0001,time+duration);oscillator.connect(gain);gain.connect(context.destination);oscillator.start(time);oscillator.stop(time+duration);nodes.push(oscillator);
  oscillator.onended=()=>{oscillator.disconnect();gain.disconnect();nodes=nodes.filter(node=>node!==oscillator);};
 }
 function available(){return visible&&!document.hidden&&!document.querySelector('dialog[open]');}
 function stop(){[timer,ringEnd,messageStart,messageEnd].forEach(clearTimeout);phone.classList.remove('phone-ringing','phone-notified');bubble.hidden=true;quiet();phase='idle';}
 function schedule(delay=3000){clearTimeout(timer);timer=setTimeout(call,delay);}
 function call(){
  stop();if(!available()){schedule(3000);return;}
  function buzz(){
   if(!available()){stop();return;}
   phase='ringing';phone.classList.add('phone-ringing');
   [0,.65,1.3].forEach(time=>tone(92,time,.45,.035,'triangle'));
   ringEnd=setTimeout(()=>{phone.classList.remove('phone-ringing');phase='idle';},1900);
   timer=setTimeout(buzz,3000);
  }
  buzz();
  messageStart=setTimeout(()=>{
   if(!available()){stop();return;}
   phase='message';phone.classList.add('phone-notified');bubble.hidden=false;messageSound();
   messageEnd=setTimeout(()=>{bubble.hidden=true;phone.classList.remove('phone-notified');},3000);
  },1900);
 }
 function firstGesture(){unlock();document.removeEventListener('pointerdown',firstGesture);document.removeEventListener('keydown',firstGesture);}
 document.addEventListener('pointerdown',firstGesture);document.addEventListener('keydown',firstGesture);
 phone.addEventListener('click',()=>{stop();schedule();});
 document.addEventListener('visibilitychange',()=>{stop();if(!document.hidden)schedule(1200);});
 new IntersectionObserver(entries=>{visible=entries[0].isIntersecting;if(visible)schedule(1200);else stop();},{threshold:.5}).observe(phone);
 new MutationObserver(()=>{if(document.querySelector('dialog[open]'))stop();else if(visible)schedule(2000);}).observe(document.body,{subtree:true,attributes:true,attributeFilter:['open']});
 reduced.addEventListener('change',()=>{stop();if(visible)schedule();});
 window.addEventListener('pagehide',()=>{stop();context?.suspend();});
})();
