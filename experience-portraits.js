/* Personal encounters and destinations, from our own travel library. */
(() => {
 const t=(en,es)=>document.documentElement.lang==='es'?es:en;
 const photos=[
  {src:'travel-photos/India/C226A786-57F7-4075-854C-2D4CEF6A21F8.JPG',title:['With His Holiness the 14th Dalai Lama','Con Su Santidad el XIV Dalái Lama'],place:['India','India'],alt:['John shaking hands with His Holiness the Dalai Lama in India','John estrechando la mano de Su Santidad el Dalái Lama en India']},
  {src:'assets/collaborations/senegal-palace-meeting.webp',title:['With His Excellency Macky Sall','Con Su Excelencia Macky Sall'],tab:['Senegal','Senegal'],place:['President of the Republic of Senegal, 2012–2024','Presidente de la República de Senegal, 2012–2024'],alt:['John meeting His Excellency Macky Sall at the presidential palace','John con Su Excelencia Macky Sall en el palacio presidencial']},
  {src:'assets/collaborations/john-taj-gardens.webp',destination:'taj',title:['A postcard from the Taj Mahal','Una postal del Taj Mahal'],tab:['Taj Mahal','Taj Mahal'],place:['Agra, India','Agra, India'],alt:['John smiling in front of the Taj Mahal and its reflecting pool','John sonriendo frente al Taj Mahal y su estanque reflectante'],position:'50% 50%'},
  {src:'assets/collaborations/john-duomo.webp',destination:'duomo',title:['An afternoon at the Duomo','Una tarde en el Duomo'],tab:['Duomo','Duomo'],place:['Milan, Italy','Milán, Italia'],alt:['John in front of the Duomo di Milano','John frente al Duomo de Milán'],position:'50% 73%'},
  {src:'assets/collaborations/zipaquira-guide-tunnel.webp',destination:'zipaquira',title:['Beneath the surface in Zipaquirá','Bajo la superficie de Zipaquirá'],tab:['Zipaquirá','Zipaquirá'],place:['Catedral de Sal, Colombia','Catedral de Sal, Colombia'],alt:['A tour guide walking into an illuminated tunnel in Zipaquirá','Un guía caminando por un túnel iluminado en Zipaquirá'],position:'50% 50%'},
  {src:'assets/collaborations/yosemite-waterfall.webp',destination:'yosemite',title:['Small beneath the falls','Pequeños ante la cascada'],tab:['Yosemite','Yosemite'],place:['Yosemite National Park, USA','Parque Nacional de Yosemite, EE. UU.'],alt:['A personal travel moment beneath a Yosemite waterfall','Un momento de viaje bajo una cascada de Yosemite']},
  {src:'assets/collaborations/stingray-antigua.webp',destination:'stingray',title:['A moment to remember','Un momento para recordar'],tab:['Antigua','Antigua'],place:['Stingray City, Antigua','Stingray City, Antigua'],alt:['John holding a stingray in the clear waters of Antigua','John sosteniendo una mantarraya en las aguas claras de Antigua'],position:'50% 40%'}
 ];
 const roots=[document.querySelector('#service-details'),document.querySelector('#partner-reader')].filter(Boolean),states=new Map();
 function schedule(state){clearTimeout(state.timer);if(!state.paused&&!state.hover&&!state.focus&&!document.hidden&&state.host.isConnected&&state.host.closest('dialog')?.open)state.timer=setTimeout(()=>show(state,(state.index+1)%photos.length),5000);}
 function show(state,index){
  state.index=index;state.host.dataset.photo=String(index);
  state.host.querySelectorAll('.experience-frame').forEach((frame,i)=>{frame.classList.toggle('is-active',i===index);frame.setAttribute('aria-hidden',String(i!==index));frame.inert=i!==index;});
  state.host.querySelectorAll('[data-encounter]').forEach((button,i)=>button.setAttribute('aria-pressed',String(i===index)));
  state.host.querySelector('.experience-caption strong').textContent=t(...photos[index].title);
  state.host.querySelector('.experience-caption small').textContent=t(...photos[index].place);
  schedule(state);
 }
 function mount(host){
  const state={host,index:0,paused:false,hover:false,focus:false,timer:null,controller:new AbortController()};states.set(host,state);const options={signal:state.controller.signal};
  host.setAttribute('aria-label',t('Personal travel encounters','Encuentros de nuestros viajes'));
  host.innerHTML=`<p class="experience-eyebrow">${t('THE PEOPLE MAKE THE JOURNEY.','LAS PERSONAS HACEN EL VIAJE.')}</p><div class="experience-stage">${photos.map((photo,i)=>`<figure class="experience-frame ${i===0?'is-active':''}" aria-hidden="${i!==0}"><img src="${photo.src}" alt="${t(...photo.alt)}" style="object-position:${photo.position||'50% 50%'}" decoding="async">${window.LPDestinationMarks.render(photo.destination)}</figure>`).join('')}</div><div class="experience-caption"><div><strong></strong><small></small></div><button type="button" class="experience-pause" aria-label="${t('Pause photo rotation','Pausar fotos')}">Ⅱ</button></div><div class="experience-selectors" role="group" aria-label="${t('Choose an encounter','Elige un encuentro')}">${photos.map((photo,i)=>`<button type="button" data-encounter="${i}" aria-pressed="${i===0}"><span>0${i+1}</span>${t(...(photo.tab||photo.place))}</button>`).join('')}</div>`;
  host.addEventListener('click',event=>{
   const button=event.target.closest('[data-encounter]');
   if(button){state.paused=true;show(state,Number(button.dataset.encounter));updatePause();}
   else if(event.target.closest('.experience-pause')){state.paused=!state.paused;updatePause();schedule(state);}
  },options);
  function updatePause(){const button=host.querySelector('.experience-pause');button.textContent=state.paused?'▷':'Ⅱ';button.setAttribute('aria-label',state.paused?t('Resume photo rotation','Reanudar fotos'):t('Pause photo rotation','Pausar fotos'));}
  host.addEventListener('pointerenter',event=>{if(event.pointerType==='mouse'){state.hover=true;clearTimeout(state.timer);}},options);
  host.addEventListener('pointerleave',()=>{state.hover=false;schedule(state);},options);
  host.addEventListener('focusin',()=>{state.focus=true;clearTimeout(state.timer);},options);
  host.addEventListener('focusout',event=>{if(!host.contains(event.relatedTarget)){state.focus=false;schedule(state);}},options);
  show(state,0);
 }
 function sync(){
  for(const [host,state] of states){if(!host.isConnected||!host.closest('dialog')?.open){clearTimeout(state.timer);state.controller.abort();states.delete(host);host.replaceChildren();}}
  roots.forEach(root=>{if(root.open)root.querySelectorAll('[data-experience-portraits]').forEach(host=>{if(!states.has(host))mount(host);});});
 }
 const observer=new MutationObserver(sync);roots.forEach(root=>observer.observe(root,{childList:true,subtree:true,attributes:true,attributeFilter:['open']}));
 document.addEventListener('visibilitychange',()=>states.forEach(schedule));
 document.addEventListener('lp:languagechange',()=>{states.forEach(state=>{clearTimeout(state.timer);state.controller.abort();});states.clear();sync();});
 window.addEventListener('pagehide',()=>states.forEach(state=>clearTimeout(state.timer)));
 sync();
})();
