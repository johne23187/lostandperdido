/* Original, softly voiced piano variations for the passport. */
(() => {
 const book=document.querySelector('#passport-reader');if(!book)return;
 let ctx,bus,timer,next=0,beat=0,muted=false,running=false;
 const notes=new Set(),progressions=[[[48,52,55,59],[45,48,52,55],[50,53,57,60],[43,47,50,53]],[[53,57,60,64],[48,52,55,59],[50,53,57,60],[43,47,50,53]]];
 let chords=progressions[0];
 function unlock(){const Engine=window.AudioContext||window.webkitAudioContext;if(!Engine)return;ctx??=new Engine();ctx.resume().catch(()=>{});}
 function piano(midi,at,length,volume){
  const envelope=ctx.createGain();envelope.gain.setValueAtTime(0,at);envelope.gain.linearRampToValueAtTime(volume,at+.012);envelope.gain.exponentialRampToValueAtTime(.0001,at+length);envelope.connect(bus);
  let count=0;for(const [harmonic,level] of [[1,1],[2,.24],[3,.07]]){const osc=ctx.createOscillator(),gain=ctx.createGain();osc.type='sine';osc.frequency.value=440*2**((midi-69)/12)*harmonic;gain.gain.value=level;osc.connect(gain);gain.connect(envelope);notes.add(osc);count++;osc.onended=()=>{notes.delete(osc);osc.disconnect();gain.disconnect();if(!--count)envelope.disconnect();};osc.start(at);osc.stop(at+length+.03);}
 }
 function schedule(){
  if(!running)return;
  while(next<ctx.currentTime+.35){const chord=chords[Math.floor(beat/8)%4],step=beat%8;
   if(step===0)piano(chord[0]-12,next,2.3,.17);
   piano(chord[[0,2,1,3,2,1,3,2][step]]+12,next,1.6,.075);
   if(step===0||step===4)chord.slice(1).forEach(n=>piano(n,next,1.9,.035));
   next+=.38;beat++;if(beat%32===0)chords=progressions[Math.floor(Math.random()*progressions.length)];
  }
 }
 function stop(){running=false;clearInterval(timer);for(const osc of notes){try{osc.stop();}catch{}}notes.clear();bus?.disconnect();bus=null;}
 function label(){const button=book.querySelector('.passport-music-toggle');if(button){const es=document.documentElement.lang==='es';button.textContent=muted?(es?'Reproducir música':'Play classical music'):(es?'Pausar música':'Pause music');button.setAttribute('aria-pressed',String(!muted));}}
 async function start(){if(running||muted||!book.open||document.hidden)return;unlock();if(!ctx)return;await ctx.resume().catch(()=>{});if(running||muted||!book.open||document.hidden)return;bus=ctx.createGain();bus.gain.value=.34;bus.connect(ctx.destination);running=true;beat=0;next=ctx.currentTime+.05;chords=progressions[Math.floor(Math.random()*progressions.length)];schedule();timer=setInterval(schedule,120);}
 function sync(){if(!book.open){stop();return;}const top=book.querySelector('.reader-top');if(top&&!top.querySelector('.passport-music-toggle')){const button=document.createElement('button');button.type='button';button.className='passport-music-toggle';button.addEventListener('click',()=>{muted=!muted;muted?stop():start();label();});top.insertBefore(button,top.querySelector('.reader-close'));label();}start();}
 document.addEventListener('click',e=>{if(e.target.closest?.('.passport-object')){muted=false;unlock();}},{capture:true});
 new MutationObserver(sync).observe(book,{attributes:true,attributeFilter:['open'],childList:true});
 book.addEventListener('close',stop);document.addEventListener('visibilitychange',()=>document.hidden?stop():start());window.addEventListener('pagehide',stop);
 document.addEventListener('lp:languagechange',label);
})();
