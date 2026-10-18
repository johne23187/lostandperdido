/* Original, gesture-triggered miniature scores. No recordings or song melodies. */
(() => {
 const t=(en,es)=>document.documentElement.lang==='es'?es:en;
 let audio,master,voices=[],effects=[],endTimer,playback=0,soundKind;
 const gpsSpeech=new Audio('assets/audio/gps-recalculating.wav');gpsSpeech.preload='auto';gpsSpeech.volume=1;
 let gpsRun=0,gpsSource,gpsBuffer;
 const gpsBytes=fetch('assets/audio/gps-recalculating.wav').then(response=>{if(!response.ok)throw Error('GPS audio unavailable');return response.arrayBuffer();});
 // Keep preload failures handled; playback can still use the media fallback.
 gpsBytes.catch(()=>{});
 function prepareGPS(){
  const Engine=window.AudioContext||window.webkitAudioContext;
  if(!Engine)return Promise.reject(Error('Web Audio unavailable'));
  audio??=new Engine();const ready=audio.resume();
  gpsBuffer??=gpsBytes.then(bytes=>audio.decodeAudioData(bytes.slice(0))).catch(error=>{gpsBuffer=null;throw error;});
  return Promise.all([ready,gpsBuffer]).then(([,buffer])=>buffer);
 }
 function stopGPS(){gpsRun++;try{gpsSource?.stop();}catch{}gpsSource=null;gpsSpeech.pause();gpsSpeech.currentTime=0;}
 function speakGPS(){
  const run=gpsRun;
  prepareGPS().then(buffer=>{
   if(run!==gpsRun||document.hidden)return;
   const source=audio.createBufferSource(),gain=audio.createGain(),limiter=audio.createDynamicsCompressor();
   source.buffer=buffer;gain.gain.value=1.8;limiter.threshold.value=-6;limiter.knee.value=9;limiter.ratio.value=6;
   source.connect(gain);gain.connect(limiter);limiter.connect(audio.destination);gpsSource=source;
   source.onended=()=>{source.disconnect();gain.disconnect();limiter.disconnect();if(gpsSource===source)gpsSource=null;};
   source.start(audio.currentTime+.12);
  }).catch(()=>{if(run===gpsRun&&!document.hidden)gpsSpeech.play().catch(()=>{});});
 }


 function stop(){playback++;clearTimeout(endTimer);for(const node of voices){try{node.stop();}catch{}}voices=[];const oldEffects=effects;effects=[];setTimeout(()=>oldEffects.forEach(node=>node.disconnect()),80);if(master&&audio){master.gain.cancelScheduledValues(audio.currentTime);master.gain.setTargetAtTime(0,audio.currentTime,.015);const old=master;setTimeout(()=>old.disconnect(),80);}}
 async function play(kind){
  stop();soundKind=kind;const run=playback;
  try{
   const Engine=window.AudioContext||window.webkitAudioContext;if(!Engine)return;
   audio??=new Engine();await audio.resume();if(run!==playback||document.hidden)return;const start=audio.currentTime+.04;
   master=audio.createGain();master.gain.value=kind==='moon'?.65:kind==='sun'?.32:.3;const limiter=audio.createDynamicsCompressor();limiter.threshold.value=-12;limiter.knee.value=12;limiter.ratio.value=4;master.connect(limiter);limiter.connect(audio.destination);effects.push(limiter);
   const bus=master,frequency=n=>440*2**((n-69)/12);
   function note(n,offset,length,type='sine',volume=.1,attack=.025){
    const osc=audio.createOscillator(),gain=audio.createGain(),filter=audio.createBiquadFilter();
    osc.type=type;osc.frequency.value=frequency(n);filter.type='lowpass';filter.frequency.value=kind==='moon'?1450:3600;
    const at=start+offset;gain.gain.setValueAtTime(0,at);gain.gain.linearRampToValueAtTime(volume,at+attack);if(kind==='moon')gain.gain.setValueAtTime(volume*.65,at+length*.65);if(kind==='sun'&&length>3)gain.gain.setValueAtTime(volume*.8,at+length*.48);gain.gain.exponentialRampToValueAtTime(.0001,at+length);
    osc.connect(filter);filter.connect(gain);gain.connect(bus);osc.start(at);osc.stop(at+length+.02);voices.push(osc);osc.onended=()=>{osc.disconnect();filter.disconnect();gain.disconnect();};
   }
   if(kind==='gps'){
    [72,79,84].forEach((n,i)=>note(n,i*.085,.22,'sine',.27,.005));note(48,0,.35,'triangle',.12,.01);
   }else if(kind==='satellite'){
    // Two acquisition pings, a rising radio scan, then a clear signal-lock chord.
    note(33,0,1.85,'sine',.32,.09);note(45,0,1.65,'triangle',.14,.12);
    [[81,0],[81,.14],[88,.36]].forEach(([n,at])=>{
     note(n,at,.15,'sine',.32,.006);note(n+12,at,.1,'triangle',.045,.004);
    });
    const scan=audio.createOscillator(),scanGain=audio.createGain();
    scan.type='sine';scan.frequency.setValueAtTime(440,start+.25);scan.frequency.exponentialRampToValueAtTime(1760,start+.66);
    scanGain.gain.setValueAtTime(0,start+.25);scanGain.gain.linearRampToValueAtTime(.13,start+.36);scanGain.gain.exponentialRampToValueAtTime(.0001,start+.7);
    scan.connect(scanGain);scanGain.connect(bus);scan.start(start+.25);scan.stop(start+.72);voices.push(scan);scan.onended=()=>{scan.disconnect();scanGain.disconnect();};
    [69,81,88,93].forEach((n,i)=>{note(n,.72+i*.025,1.08,'sine',i===1?.24:.12,.012);note(n,.98+i*.025,.85,'sine',.035,.04);});
   }else if(kind==='ufo'){
    // A hovering, warbling saucer lifts into a bright upward escape sweep.
    const engine=audio.createOscillator(),wobble=audio.createOscillator(),depth=audio.createGain(),gain=audio.createGain();
    engine.type='sine';engine.frequency.setValueAtTime(310,start);engine.frequency.exponentialRampToValueAtTime(440,start+.72);engine.frequency.exponentialRampToValueAtTime(2300,start+1.28);
    wobble.frequency.setValueAtTime(7,start);wobble.frequency.linearRampToValueAtTime(19,start+1.25);
    depth.gain.setValueAtTime(75,start);depth.gain.linearRampToValueAtTime(230,start+.85);depth.gain.linearRampToValueAtTime(20,start+1.34);
    gain.gain.setValueAtTime(0,start);gain.gain.linearRampToValueAtTime(.38,start+.08);gain.gain.setValueAtTime(.3,start+.74);gain.gain.exponentialRampToValueAtTime(.0001,start+1.35);
    wobble.connect(depth);depth.connect(engine.frequency);engine.connect(gain);gain.connect(bus);
    engine.start(start);wobble.start(start);engine.stop(start+1.36);wobble.stop(start+1.36);voices.push(engine,wobble);
    engine.onended=()=>{engine.disconnect();wobble.disconnect();depth.disconnect();gain.disconnect();};
    [81,88,84].forEach((n,i)=>note(n,.12+i*.11,.16,'sine',.14,.012));
    note(38,0,.95,'triangle',.18,.09);
   }else if(kind==='saturn'){
    // A recognizable little discovery signature, followed by a weightless shimmer.
    [[76,0],[83,.16],[88,.32],[86,.64]].forEach(([n,at])=>{
     note(n,at,.85,'sine',.3,.008);
     note(n+19,at,.3,'sine',.055,.005);
     note(n,at+.19,1.05,'sine',.06,.04);
    });
    [45,57,64,69].forEach((n,i)=>note(n,.12+i*.07,2.7,'sine',.11,.24));
    [93,95,100].forEach((n,i)=>note(n,1+i*.18,1.55,'sine',.055,.12));
   }else if(kind==='sun'){
    // A stereo hall gives the layered vowel voices a soft, spacious tail.
    const hall=audio.createConvolver(),wet=audio.createGain(),impulse=audio.createBuffer(2,audio.sampleRate*2.8,audio.sampleRate);
    for(let channel=0;channel<2;channel++){const data=impulse.getChannelData(channel);for(let i=0;i<data.length;i++)data[i]=(Math.random()*2-1)*Math.pow(1-i/data.length,2.5)*.45;}
    hall.buffer=impulse;wet.gain.value=.32;wet.gain.setValueAtTime(.32,start+4.6);wet.gain.linearRampToValueAtTime(0,start+6.3);hall.connect(wet);wet.connect(bus);effects.push(hall,wet);
    // Sustained synthetic choir: vowel-shaped harmonics with gentle vibrato.
    [55,60,64,67,72,76].flatMap(n=>[n,n]).forEach((n,i)=>{
     const voice=audio.createOscillator(),gain=audio.createGain(),vibrato=audio.createOscillator(),depth=audio.createGain(),real=new Float32Array(65),imag=new Float32Array(65),fundamental=frequency(n);
     for(let h=1;h<65;h++){const f=h*fundamental;imag[h]=(.1+1.6*Math.exp(-Math.pow((f-750)/220,2))+1.1*Math.exp(-Math.pow((f-1150)/280,2))+.35*Math.exp(-Math.pow((f-2600)/420,2)))/h;}
     voice.setPeriodicWave(audio.createPeriodicWave(real,imag));voice.frequency.value=fundamental;voice.detune.value=i%2?6:-6;
     vibrato.frequency.value=4.6+i*.17;depth.gain.value=5;vibrato.connect(depth);depth.connect(voice.detune);
     gain.gain.setValueAtTime(0,start);gain.gain.linearRampToValueAtTime(.075,start+1.4);gain.gain.setValueAtTime(.065,start+3.5);gain.gain.exponentialRampToValueAtTime(.0001,start+4.95);
     voice.connect(gain);gain.connect(bus);gain.connect(hall);voice.start(start);vibrato.start(start);voice.stop(start+4.98);vibrato.stop(start+4.98);voices.push(voice,vibrato);voice.onended=()=>{voice.disconnect();gain.disconnect();vibrato.disconnect();depth.disconnect();};
    });
    [84,88,91].forEach((n,i)=>note(n,.5+i*.4,3.3,'sine',.035,.08));
   }else if(kind==='moon'){
    // An original five-second dance break: drums, syncopated bass, and chord stabs.
    const noise=audio.createBuffer(1,Math.ceil(audio.sampleRate*.3),audio.sampleRate),samples=noise.getChannelData(0);for(let i=0;i<samples.length;i++)samples[i]=Math.random()*2-1;
    function percussion(at,length,volume,cutoff){const source=audio.createBufferSource(),filter=audio.createBiquadFilter(),gain=audio.createGain();source.buffer=noise;filter.type='highpass';filter.frequency.value=cutoff;gain.gain.setValueAtTime(volume,start+at);gain.gain.exponentialRampToValueAtTime(.0001,start+at+length);source.connect(filter);filter.connect(gain);gain.connect(bus);source.start(start+at);source.stop(start+at+length);voices.push(source);source.onended=()=>{source.disconnect();filter.disconnect();gain.disconnect();};}
    for(let beat=0;beat<10;beat++){
     const at=beat*.5,kick=audio.createOscillator(),gain=audio.createGain();kick.frequency.setValueAtTime(145,start+at);kick.frequency.exponentialRampToValueAtTime(48,start+at+.13);gain.gain.setValueAtTime(.5,start+at);gain.gain.exponentialRampToValueAtTime(.0001,start+at+.22);kick.connect(gain);gain.connect(bus);kick.start(start+at);kick.stop(start+at+.23);voices.push(kick);kick.onended=()=>{kick.disconnect();gain.disconnect();};
     if(beat%2){percussion(at,.15,.22,1100);percussion(at+.014,.13,.15,1400);percussion(at+.029,.11,.11,1700);}
     percussion(at+.25,.085,.13,6500);percussion(at,.04,.055,7500);
    }
    const bass=[45,57,52,55,45,52,57,55,50,62,57,60,50,57,60,57];
    for(let i=0;i<32;i++){const at=i*.125;if(i%4===3)continue;note(bass[i%16],at,.18,'triangle',.3,.004);note(bass[i%16]+12,at,.13,'sawtooth',.065,.004);}
    for(let bar=0;bar<2;bar++){const chord=bar?[62,65,69,72]:[60,64,67,71];[.25,.875,1.25,1.75].forEach(offset=>chord.forEach(n=>note(n,bar*2+offset,.19,'triangle',.13,.005)));}
    [76,79,81,79,76,74,72].forEach((n,i)=>note(n,2.75+i*.24,.2,'triangle',.09,.012));
   }else{
    // Original arcade power-up: bright square arpeggios and a bouncing bass.
    const tune=[76,79,84,88,86,83,79,74,77,81,86,89,88,84,81,79];
    for(let i=0;i<32;i++){const at=i*.12,n=tune[i%tune.length];note(n,at,.1,'square',.11,.006);note(n+12,at+.055,.1,'triangle',.045,.004);if(i%2===0)note([48,55,53,57][Math.floor(i/4)%4],at,.19,'triangle',.21,.008);}
    [72,76,79,84].forEach(n=>note(n,3.95,.85,'triangle',.085,.02));

   }
   endTimer=setTimeout(()=>{stop();bus.disconnect();},kind==='sun'?6400:kind==='ufo'?1500:kind==='gps'?1100:kind==='satellite'?2100:kind==='saturn'?3800:5000);
  }catch{/* Interaction remains available when audio is unsupported. */}
 }
 document.addEventListener('click',e=>{const target=e.target.closest?.('.daily-sun,.after-dark-moon,.little-detour-star');if(!target||target.hasAttribute('aria-busy'))return;if(target.matches('.after-dark-moon')){try{const Engine=window.AudioContext||window.webkitAudioContext;if(Engine){audio??=new Engine();audio.resume().catch(()=>{});}}catch{}return;}play(target.matches('.daily-sun')?'sun':'star');},true);
 document.addEventListener('click',e=>{const target=e.target.closest?.('.location-gps,.satellite,.saturn-touch');if(target){stopGPS();play(target.matches('.location-gps')?'gps':target.matches('.satellite')?'satellite':'saturn');if(target.matches('.location-gps'))speakGPS();}},true);
 document.addEventListener('lp:afterdarkintro',()=>play('moon'));
 document.addEventListener('lp:ufolaunch',()=>{stopGPS();play('ufo');});
 document.addEventListener('lp:ufocancel',()=>{if(soundKind==='ufo')stop();});
 document.addEventListener('close',e=>{if(['daily-verse','lost-after-dark','little-detour','gps-tracker','satellite-stats','where-next'].includes(e.target.id))stop();},true);
 document.addEventListener('close',e=>{if(e.target.id==='gps-tracker')stopGPS();},true);
 document.addEventListener('visibilitychange',()=>{if(document.hidden){stop();stopGPS();}});window.addEventListener('pagehide',()=>{stop();stopGPS();});
 const globe=document.querySelector('.world-map-wrap');
 const legend=document.createElement('nav');legend.className='sky-legend';
 const targets={sun:'.daily-sun',moon:'.after-dark-moon',gps:'.location-gps',satellite:'.satellite'};
 legend.innerHTML='<span class="sky-legend-hint"></span>'+Object.keys(targets).map(key=>'<button type="button" data-sky="'+key+'"><span class="sky-mini sky-mini-'+key+'" aria-hidden="true"></span><b></b></button>').join('');
 globe?.querySelector('.globe-mode-switch')?.after(legend);
 for(const key of ['moon','satellite']){
  const source=document.querySelector(targets[key]+' > svg');if(!source)continue;
  const icon=source.cloneNode(true);icon.querySelectorAll('[id]').forEach(node=>{const old=node.id,newId='legend-'+old;node.id=newId;icon.querySelectorAll('*').forEach(el=>{for(const attr of [...el.attributes])if(attr.value.includes('#'+old))el.setAttribute(attr.name,attr.value.replaceAll('#'+old,'#'+newId));});});
  legend.querySelector('.sky-mini-'+key).append(icon);
 }
 legend.querySelector('.sky-mini-sun').innerHTML='<svg viewBox="0 0 48 48"><g stroke="#f3d58a" stroke-width="1.2"><path d="M24 1v5m0 36v5M1 24h5m36 0h5M8 8l4 4m24 24 4 4M8 40l4-4m24-24 4-4M15 3l2 5m14 32 2 5M3 15l5 2m32 14 5 2M3 33l5-2m32-14 5-2M15 45l2-5M31 8l2-5"/></g><defs><radialGradient id="legend-sun"><stop stop-color="#fff6be"/><stop offset="1" stop-color="#ebc467"/></radialGradient></defs><circle cx="24" cy="24" r="16" fill="url(#legend-sun)"/></svg>';
 const gpsMini=document.querySelector('.location-gps').cloneNode(true);gpsMini.className='legend-gps-device';
 gpsMini.removeAttribute('role');gpsMini.removeAttribute('tabindex');gpsMini.removeAttribute('aria-controls');gpsMini.removeAttribute('aria-haspopup');gpsMini.removeAttribute('aria-label');gpsMini.setAttribute('aria-hidden','true');
 gpsMini.querySelectorAll('[id]').forEach(el=>el.removeAttribute('id'));gpsMini.querySelector('.gps-dainty-cue')?.remove();
 legend.querySelector('.sky-mini-gps').append(gpsMini);

 let navigation=0;
 const cancelNavigation=()=>{navigation++;legend.querySelectorAll('[aria-busy]').forEach(el=>el.removeAttribute('aria-busy'));};
 window.addEventListener('wheel',cancelNavigation,{passive:true});window.addEventListener('touchstart',cancelNavigation,{passive:true});
 document.addEventListener('keydown',e=>{if(['Escape','PageDown','PageUp','ArrowDown','ArrowUp','Home','End'].includes(e.key))cancelNavigation();});
 legend.querySelectorAll('[data-sky]').forEach(button=>button.addEventListener('click',async()=>{
  cancelNavigation();const run=navigation,target=document.querySelector(targets[button.dataset.sky]);if(!target)return;
  if(button.dataset.sky==='gps')prepareGPS().catch(()=>{});
  // Resume during the real tap, before scrolling consumes browser activation.
  try{const Engine=window.AudioContext||window.webkitAudioContext;if(Engine){audio??=new Engine();audio.resume().catch(()=>{});}}catch{}
  const r=target.getBoundingClientRect(),header=document.querySelector('.site-header').getBoundingClientRect(),safeTop=Math.max(16,header.bottom+16);
  if(r.top<safeTop||r.bottom>innerHeight-24){
   button.setAttribute('aria-busy','true');const origin=scrollY,destination=Math.max(0,Math.min(document.documentElement.scrollHeight-innerHeight,origin+r.top-(safeTop+(innerHeight-safeTop-r.height)/2)));
   const duration=matchMedia('(prefers-reduced-motion:reduce)').matches?0:Math.min(900,400+Math.abs(destination-origin)*.15),started=performance.now();
   await new Promise(resolve=>{function frame(now){if(run!==navigation){resolve();return;}const p=duration?Math.min(1,(now-started)/duration):1,ease=p<.5?4*p*p*p:1-Math.pow(-2*p+2,3)/2;window.scrollTo({top:origin+(destination-origin)*ease,behavior:'instant'});if(p<1)requestAnimationFrame(frame);else resolve();}requestAnimationFrame(frame);});
   if(run!==navigation||document.hidden)return;
   if(!matchMedia('(prefers-reduced-motion:reduce)').matches)await new Promise(resolve=>setTimeout(resolve,180));
  }
  button.removeAttribute('aria-busy');if(run!==navigation||document.hidden)return;
  target.focus({preventScroll:true});target.click();
 }));
 function labels(){legend.setAttribute('aria-label',t('Explore the sky','Explora el cielo'));legend.querySelector('.sky-legend-hint').textContent=t('TAP TO EXPLORE','TOCA PARA EXPLORAR');legend.querySelector('[data-sky="sun"] b').textContent=t('Daily Light','Luz del día');legend.querySelector('[data-sky="moon"] b').textContent=t('After Dark','De noche');legend.querySelector('[data-sky="gps"] b').textContent=t('Live GPS','GPS en vivo');legend.querySelector('[data-sky="satellite"] b').textContent=t('Travel Stats','El viaje en cifras');}
 labels();document.addEventListener('lp:languagechange',labels);
 const moon=document.querySelector('.after-dark-moon');if(moon){const cue=document.createElement('span');cue.className='moon-touch-hint';cue.textContent=t('After Dark','De noche');moon.append(cue);document.addEventListener('lp:languagechange',()=>cue.textContent=t('After Dark','De noche'));}
 const saturn=document.querySelector('.distant-saturn');if(saturn){
  saturn.removeAttribute('aria-hidden');const button=document.createElement('button');button.type='button';button.className='saturn-touch';button.setAttribute('aria-label',t('Give Saturn a spin','Haz girar Saturno'));button.append(saturn.querySelector('svg'));saturn.append(button);
  const message=document.createElement('span');message.className='saturn-note';message.hidden=true;message.setAttribute('role','status');saturn.append(message);let timer;const missions=[
   ["Bodega draft: pick one drink and one snack for each other. Reveal the combos outside. Best pairing wins.","Duelo de bodega: elijan una bebida y un snack para el otro. Revelen las combinaciones afuera. Gana la mejor."],
   ["House special: ask the server what they eat after a shift. Try it and give it a three-word review.","Plato secreto: pregunta qué come el personal al terminar su turno. Pruébalo y descríbelo en tres palabras."],
   ["Pastry playoffs: split the same pastry from two bakeries. Judge the first bite, filling, and final crumb.","Duelo de panaderías: compartan el mismo dulce de dos lugares. Juzguen el primer bocado, el relleno y la última miga."],
   ["Mystery fruit: ask a market vendor to pick a fruit you have never tried—and show you how to eat it.","Fruta misteriosa: pide a un vendedor una fruta que nunca hayas probado y que te enseñe cómo comerla."],
   ["Snack passport: find a snack made in this country. Keep the wrapper and write the city and your rating inside.","Pasaporte de snacks: busca uno hecho en este país. Guarda el envoltorio y escribe dentro la ciudad y tu puntuación."],
   ["Flavor detective: each guess three ingredients in a shared dish. Ask the server who got closest.","Detectives del sabor: adivinen tres ingredientes de un plato compartido. Pregunten quién acertó más."],
   ["Dessert detour: ask a café worker where they go for dessert. Let that answer choose your next stop.","Desvío dulce: pregunta en una cafetería dónde van por un postre. Que su respuesta decida la próxima parada."],
   ["Blind snack draft: each buy a different local snack. Taste with eyes closed and invent its name before the reveal.","Snack a ciegas: compren dos snacks locales distintos. Pruébenlos con los ojos cerrados e inventen sus nombres."],
   ["Breakfast plot twist: order a local breakfast you cannot pronounce yet. Learn its name before the last bite.","Desayuno sorpresa: pide uno local cuyo nombre aún no sepas pronunciar. Apréndelo antes del último bocado."],
   ["Sauce scout: ask which house sauce belongs with your order. Try one bite with it and one without. Pick a winner.","Explorador de salsas: pregunta cuál salsa de la casa va con tu plato. Compara un bocado con salsa y otro sin ella."],
   ["Picnic puzzle: each bring one mystery snack to a park. Build a shared picnic without coordinating the menu.","Pícnic sorpresa: lleven un snack secreto cada uno a un parque. Armen un pícnic sin coordinar el menú."],
   ["One-coin arcade: each play one round of the same game. Loser delivers a dramatic victory speech for the winner.","Duelo de arcade: jueguen una ronda del mismo juego. Quien pierda dará un discurso épico celebrando al ganador."],
   ["Movie still: use a doorway, one prop, and your most suspicious expression. Make a thriller poster in one photo.","Cartel de suspenso: usa una puerta, un objeto y tu mirada más sospechosa. Crea un póster con una sola foto."],
   ["Album drop: take a dead-serious duo photo outside a laundromat. Name the album after your last travel mishap.","Disco debut: posen muy serios frente a una lavandería. El título del álbum será su último desastre de viaje."],
   ["Tiny giant: use perspective to balance a distant landmark on your palm. You get three attempts.","Gigante diminuto: usa la perspectiva para sostener un monumento lejano en tu palma. Tienes tres intentos."],
   ["Matching game: find a wall that matches your outfit. Disappear into it for one camouflage portrait.","Camuflaje urbano: busca una pared del color de tu ropa. Desaparece en ella para hacer un retrato."],
   ["Reflection heist: fit both of you and a city landmark into one reflection. No selfie camera allowed.","Reflejo robado: encuadren sus caras y un lugar emblemático en un solo reflejo. Sin cámara de selfis."],
   ["Five-second blockbuster: film a dramatic entrance, a confused look, and an exit. Your only prop is a snack.","Superproducción: filmen una entrada dramática, una mirada confundida y una salida. El único accesorio es un snack."],
   ["Photo booth rules: four photos, ten seconds—passport face, villain, lost tourist, unexpected reunion.","Fotomatón: cuatro fotos en diez segundos—cara de pasaporte, villano, turista perdido y reencuentro inesperado."],
   ["Time traveler: find an old photo on a local history sign. Recreate its viewpoint from the sidewalk.","Viaje al pasado: busca una foto antigua en un letrero histórico. Recrea su perspectiva desde la acera."],
   ["Shadow duo: at golden hour, make your shadows shake hands while you stand apart. Photograph the illusion.","Dúo de sombras: al atardecer, hagan que sus sombras se den la mano sin acercarse. Fotografíen la ilusión."],
   ["Postcard mission: buy one postcard. Write your funniest wrong turn on it and mail it to your future self.","Misión postal: compra una postal. Cuenta tu desvío más gracioso y envíasela a tu yo del futuro."],
   ["Local soundtrack: ask a record-shop worker for one song that sounds like this city. Play it on your next walk.","Banda sonora local: pide en una tienda de discos una canción que suene a esta ciudad. Escúchala en tu próximo paseo."],
   ["One-line lesson: ask how locals say 'that was delicious.' Use it after your next meal, without checking your phone.","Lección exprés: aprende cómo dicen aquí «estaba delicioso». Úsalo después de comer sin mirar el teléfono."],
   ["Neighborhood MVP: ask a shopkeeper which nearby business deserves more love. Visit it and find out why.","Tesoro del barrio: pregunta a un comerciante qué negocio cercano merece más atención. Visítalo y descubre por qué."],
   ["The long way home: ask for a scenic walking route instead of the fastest one. Find your favorite stop along it.","Camino largo: pregunta por una ruta bonita para caminar, no la más rápida. Elige tu parada favorita del recorrido."],
   ["Grand opening: choose a café neither of you knows. Give it a ten-second awards speech after your first sip.","Gran estreno: entren en una cafetería nueva para ambos. Tras el primer sorbo, dedíquenle un discurso de diez segundos."],
   ["Tiny thank-you: learn the name of someone who helped your trip. Thank them by name before you leave.","Gracias con nombre: aprende el nombre de alguien que te ayudó en el viaje. Dale las gracias por su nombre al salir."],
   ["Street set: catch three songs by a street musician. Ask the name of your favorite before moving on.","Concierto callejero: escucha tres canciones de un músico. Pregunta el nombre de tu favorita antes de seguir."],
   ["Bookshop oracle: ask a bookseller for a novel set nearby. Find its opening location on a map.","Oráculo literario: pide una novela ambientada cerca. Busca en un mapa el lugar donde empieza."],
   ["Souvenir showdown: find the funniest souvenir for the price of a coffee. Photograph your finalists; no purchase needed.","Duelo de recuerdos: busca el souvenir más gracioso por el precio de un café. Fotografía los finalistas; no hace falta comprar."],
   ["Bench jury: test three public benches. Score the view, shade, and people-watching. Crown your city headquarters.","Jurado de bancos: prueben tres bancos públicos. Puntúen la vista, la sombra y el ambiente. Elijan su sede oficial."],
   ["Neon hunt: find three glowing signs after dark. Choose the one that deserves to be a movie title.","Caza de neón: busca tres letreros luminosos de noche. Elige el que merezca ser el título de una película."],
   ["Door tournament: each nominate the best front door on one block. Argue your case like a museum curator.","Torneo de puertas: elijan la mejor puerta de una cuadra. Defiéndanla como si fueran curadores de un museo."],
   ["Pocket time capsule: save a receipt, ticket, and tiny sketch from today. Seal them with one prediction for tomorrow.","Cápsula del día: guarda un recibo, un boleto y un dibujo pequeño. Añade una predicción para mañana."],
   ["One-block bingo: find a hand-painted sign, a date on a building, and a plant growing somewhere unexpected.","Bingo de una cuadra: busca un letrero pintado a mano, una fecha en un edificio y una planta en un sitio inesperado."],
   ["City alphabet: photograph letters on signs until you can spell LOST. Build your own travel title card.","Alfabeto urbano: fotografía letras de letreros hasta formar LOST. Crea el título de tu propia aventura."],
   ["Name that street: choose a street with a curious name. Find out who—or what—it was named after.","Nombre misterioso: elige una calle con un nombre curioso. Averigua a quién o a qué se lo debe."],
   ["Corner commentary: narrate your friend's ordinary snack purchase like a championship final. Keep it between you two.","Final mundial: narra la compra de un snack de tu amigo como una final de campeonato. Solo para ustedes dos."],
   ["Wrong tour guide: each invent a ridiculous history for the same statue. Then read the plaque and compare.","Guías improvisados: inventen historias absurdas para la misma estatua. Después lean la placa y comparen."],
   ["Silent directions: guide your friend to a visible café using gestures only. You cannot point at its sign.","Direcciones mudas: guía a tu amigo hasta una cafetería visible usando gestos. No puedes señalar su letrero."],
   ["Travel trailer: record a 15-second voice-over for today's trip. It must include one disaster and one triumph.","Tráiler del viaje: graba una narración de quince segundos sobre hoy. Incluye un desastre y un triunfo."],
   ["Sticker summit: draw a tiny mascot for this trip on paper. Give it a name and photograph it at three stops.","Mascota viajera: dibuja una mascota en papel. Ponle nombre y fotografíala en tres paradas del viaje."],
   ["Sunset premiere: arrive fifteen minutes early. Pick a theme song, then watch the last two minutes in silence.","Estreno del atardecer: llega quince minutos antes. Elige una canción y mira los últimos dos minutos en silencio."],
   ["No-camera souvenir: watch one street scene for a minute. Turn away and each sketch what you remember.","Recuerdo sin cámara: miren una escena callejera durante un minuto. Dense vuelta y dibujen lo que recuerden."],
   ["Rematch abroad: challenge your travel partner to rock-paper-scissors at a landmark. Winner names today's adventure.","Revancha viajera: jueguen piedra, papel o tijera junto a un lugar emblemático. Quien gane le pone nombre al día."],
   ["Dinner awards: give today's meal three absurd trophies—best crunch, biggest surprise, most likely to steal your heart.","Premios de la cena: entrega tres trofeos absurdos—mejor crujido, mayor sorpresa y favorito para robarte el corazón."],
   ["Lost & found: leave a notebook story with the exact wrong turn, what you found, and whether you would do it again.","Lost & found: deja una historia en el cuaderno con el desvío exacto, lo que encontraste y si lo repetirías."]
  ];
  const quest=document.createElement('strong');message.append(quest);let bag=[],currentQuest=-1;
  function updateQuest(next=false){if(next||currentQuest<0){if(!bag.length){bag=missions.map((_,i)=>i);for(let i=bag.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[bag[i],bag[j]]=[bag[j],bag[i]];}if(bag[bag.length-1]===currentQuest)[bag[0],bag[bag.length-1]]=[bag[bag.length-1],bag[0]];}currentQuest=bag.pop();}quest.textContent=t('SIDE QUEST: ','MINIMISI\u00d3N: ')+t(...missions[currentQuest]);message.dataset.quest=String(currentQuest);}
  document.addEventListener('lp:languagechange',()=>{if(!message.hidden)updateQuest();});
  button.addEventListener('click',()=>{clearTimeout(timer);updateQuest(true);message.hidden=false;button.querySelector('svg').getAnimations().forEach(animation=>animation.cancel());if(!matchMedia('(prefers-reduced-motion:reduce)').matches)button.querySelector('svg').animate([{transform:'rotate(-5deg)'},{transform:'rotate(355deg)'}],{duration:1100,easing:'cubic-bezier(.2,.7,.2,1)'});timer=setTimeout(()=>message.hidden=true,7000);});
 }
 const cat=document.querySelector('.bodega-cat');if(cat){
  const svg=cat.ownerSVGElement;svg.removeAttribute('aria-hidden');cat.setAttribute('role','button');cat.setAttribute('tabindex','0');cat.setAttribute('aria-label','Meow');
  const ns='http://www.w3.org/2000/svg',bubble=document.createElementNS(ns,'g');bubble.classList.add('cat-meow');bubble.setAttribute('visibility','hidden');bubble.innerHTML='<path d="M12-24H43Q47-24 47-20V-12Q47-8 43-8H17L9-15H12Z" fill="#fff8e8" stroke="#293936" stroke-width=".7"/><text x="29" y="-13" text-anchor="middle" fill="#273b36" stroke="none" font-family="Arial,sans-serif" font-size="7">meow</text>';bubble.setAttribute('transform',cat.getAttribute('transform'));cat.after(bubble);const hit=document.createElementNS(ns,'rect');hit.setAttribute('x','-18');hit.setAttribute('y','-32');hit.setAttribute('width','40');hit.setAttribute('height','38');hit.setAttribute('fill','transparent');hit.setAttribute('stroke','none');hit.style.fill='transparent';hit.style.stroke='none';cat.prepend(hit);let timer;
  const meow=()=>{clearTimeout(timer);bubble.setAttribute('visibility','visible');timer=setTimeout(()=>bubble.setAttribute('visibility','hidden'),1800);};cat.addEventListener('click',meow);cat.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();meow();}});
 }
})();
