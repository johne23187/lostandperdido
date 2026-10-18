/* A little starlight, then the L&P posting schedule. */
(() => {
 const stage=document.querySelector('.watch-section');if(!stage)return;
 const t=(en,es)=>document.documentElement.lang==='es'?es:en;
 const star=document.createElement('button');star.type='button';star.className='little-detour-star';
 const starArt=(id)=>`<svg viewBox="0 0 64 64" aria-hidden="true"><defs><radialGradient id="${id}" cx="35%" cy="25%" r="80%"><stop stop-color="#fff9a5"/><stop offset=".45" stop-color="#ffdf36"/><stop offset="1" stop-color="#eeac13"/></radialGradient></defs><path d="M32 3Q34 3 35 7L42 21 58 23Q63 23 59 28L47 40 50 57Q51 62 46 59L32 51 18 59Q13 62 14 57L17 40 5 28Q1 23 6 23L22 21 29 7Q30 3 32 3Z" fill="url(#${id})" stroke="#d89010" stroke-width="1.4" stroke-linejoin="round"/><path d="m30 9-7 15-14 2" fill="none" stroke="#fffbd6" stroke-width="2" stroke-linecap="round" opacity=".8"/><g class="power-star-eyes"><rect x="23" y="25" width="6" height="17" rx="3" fill="#161725"/><rect x="35" y="25" width="6" height="17" rx="3" fill="#161725"/><ellipse cx="25" cy="29" rx="1" ry="2.6" fill="#fff"/><ellipse cx="37" cy="29" rx="1" ry="2.6" fill="#fff"/></g></svg>`;
 star.innerHTML=starArt('detour-gold');const space=document.querySelector('.space-chapter');space.append(star);


 const dialog=document.createElement('dialog');dialog.id='little-detour';dialog.className='star-schedule';dialog.setAttribute('aria-labelledby','star-schedule-title');document.body.append(dialog);
 star.setAttribute('aria-haspopup','dialog');star.setAttribute('aria-controls',dialog.id);
 let timer,subtitleTimer,opening=false;
 function kart(person,color,number){const name=person==='john'?'John':'Mateo',face=person==='john'?'john-yankees-smiling':'mateo-yankees-head';return `<svg class="star-kart star-kart-${person}" viewBox="0 0 120 122" role="img" aria-label="${name} in a racing kart"><defs><linearGradient id="kart-${person}" x2=".2" y2="1"><stop stop-color="${color}"/><stop offset="1" stop-color="#153445"/></linearGradient></defs><ellipse cx="60" cy="111" rx="48" ry="5" fill="#000" opacity=".25"/><g stroke="#172431" stroke-linejoin="round"><path d="M31 79h58l11 21-15 7H35l-15-7Z" fill="#223744" stroke-width="2"/><rect x="15" y="88" width="19" height="23" rx="7" fill="#101921" stroke-width="2"/><rect x="86" y="88" width="19" height="23" rx="7" fill="#101921" stroke-width="2"/><path d="M18 93v12m4-14v16m76-14v12m-4-14v16" stroke="#71838a" stroke-width="1.4"/><path d="M41 56q19-9 38 0l9 27H32Z" fill="${color}" stroke-width="2"/><path d="M43 61 32 74l15 7M77 61l11 13-15 7" fill="none" stroke="#d6a77d" stroke-width="8" stroke-linecap="round"/><ellipse cx="60" cy="79" rx="17" ry="7" fill="none" stroke="#111d27" stroke-width="4"/><path d="M33 85 42 80h36l9 5-4 21H37Z" fill="url(#kart-${person})" stroke-width="2"/><path d="m56 82-3 24h14l-3-24" fill="#fff4d1" stroke="none"/><path d="M25 101h70v6H25Z" fill="#b9d4d5" stroke-width="2"/><path d="M37 89h9m28 0h9" stroke="#ffedb5" stroke-width="3" stroke-linecap="round"/></g><image href="assets/${face}-192.webp" x="29" y="0" width="62" height="69"/><circle cx="60" cy="93" r="8" fill="#fff8dc"/><text x="60" y="97" text-anchor="middle" fill="#213547" font-family="Arial,sans-serif" font-size="11" font-weight="900">${number}</text></svg>`;}
 function render(){
  star.setAttribute('aria-label',t('Our posting schedule','Nuestro calendario de publicaciones'));star.title=t('See you under the stars.','Nos vemos bajo las estrellas.');
  dialog.innerHTML=`<button class="star-schedule-close" type="button" aria-label="${t('Close','Cerrar')}" autofocus>×</button><div class="star-race-track" aria-hidden="true"><svg viewBox="0 0 600 100" preserveAspectRatio="none"><g fill="none" stroke-linecap="round"><path d="M-30 82C130 82 170 14 320 38S490 95 630 18" stroke="#ff659a" stroke-width="42"/><path d="M-30 82C130 82 170 14 320 38S490 95 630 18" stroke="#ffa354" stroke-width="34"/><path d="M-30 82C130 82 170 14 320 38S490 95 630 18" stroke="#ffe779" stroke-width="26"/><path d="M-30 82C130 82 170 14 320 38S490 95 630 18" stroke="#65e3b6" stroke-width="18"/><path d="M-30 82C130 82 170 14 320 38S490 95 630 18" stroke="#66bbff" stroke-width="10"/><path d="M-30 82C130 82 170 14 320 38S490 95 630 18" stroke="#bc91ff" stroke-width="4"/><path class="rainbow-road-glint" d="M-30 82C130 82 170 14 320 38S490 95 630 18" stroke="#fff" stroke-width="2" stroke-dasharray="18 600"/></g></svg></div><div class="star-schedule-glow" aria-hidden="true">${kart('john','#55becb','1')}${starArt('detour-dialog-gold')}${kart('mateo','#e8a747','2')}</div><div class="star-schedule-intro"><h2 id="star-schedule-title">${t('You are a star.','Eres una estrella.')}</h2><p>${t('We’re racing toward ours.','Corremos hacia la nuestra.')}</p></div><div class="star-schedule-content"><p class="star-schedule-eyebrow">${t('SAME DREAM. NEW EPISODES.','MISMO SUEÑO. NUEVOS EPISODIOS.')}</p><div class="star-schedule-premiere"><span>YouTube</span><strong>${t('Every Sunday','Cada domingo')}</strong><b>8 PM EST</b><small>${t('Starting November 1, 2026','Desde el 1 de noviembre de 2026')}</small></div><div class="star-schedule-daily"><strong>${t('A little lost. Every day.','Un poquito perdidos. Cada día.')}</strong><p>Instagram Reels · Facebook · TikTok</p><span>${t('New posts daily','Publicaciones todos los días')}</span></div><p class="star-schedule-footer">${t('Come for the journey. Stay for the plot twists.','Ven por el viaje. Quédate por los giros inesperados.')}</p></div>`;
  dialog.querySelector('.star-schedule-close').addEventListener('click',()=>dialog.close());
 }
 render();document.addEventListener('lp:languagechange',render);
 star.addEventListener('click',async()=>{
  if(opening||dialog.open)return;opening=true;star.setAttribute('aria-busy','true');
  if(!matchMedia('(prefers-reduced-motion: reduce)').matches){star.classList.add('star-powered');await new Promise(resolve=>setTimeout(resolve,1100));}
  star.classList.remove('star-powered');star.removeAttribute('aria-busy');opening=false;if(document.hidden)return;
  clearTimeout(timer);clearTimeout(subtitleTimer);dialog.classList.remove('schedule-ready','subtitle-ready');render();dialog.showModal();dialog.scrollTop=0;
  if(matchMedia('(prefers-reduced-motion: reduce)').matches)dialog.classList.add('schedule-ready','subtitle-ready');
  else{subtitleTimer=setTimeout(()=>dialog.classList.add('subtitle-ready'),1800);timer=setTimeout(()=>dialog.classList.add('schedule-ready'),2800);}
 });
 dialog.addEventListener('close',()=>{clearTimeout(timer);clearTimeout(subtitleTimer);star.focus({preventScroll:true});});
 dialog.addEventListener('click',e=>{if(e.target!==dialog)return;const r=dialog.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)dialog.close();});
 let visible=false,hovered=false,focused=false,frameId,last=0,elapsed=0,route=null;
 const reduced=matchMedia('(prefers-reduced-motion: reduce)');
 let position={x:16,y:Math.max(100,stage.offsetTop+stage.offsetHeight-85)};
 const paint=()=>{star.style.transform=`translate3d(${position.x}px,${position.y}px,0)`;};paint();
 function destination(){
  const box=space.getBoundingClientRect(),low=Math.max(20,100-box.top),high=Math.min(space.clientHeight-75,innerHeight-box.top-80),width=space.clientWidth;
  if(high<low)return position;
  const blockers=[...space.querySelectorAll('h2,h3,p,button:not(.little-detour-star),.sky-legend,.location-gps,a')].filter(el=>!star.contains(el)).map(el=>el.getBoundingClientRect()).filter(r=>r.width&&r.height&&r.bottom>0&&r.top<innerHeight);
  for(let i=0;i<60;i++){
   const x=8+Math.random()*Math.max(1,width-72),y=low+Math.random()*(high-low),r={left:box.left+x-8,right:box.left+x+64,top:box.top+y-8,bottom:box.top+y+64};
   if(!blockers.some(b=>r.left<b.right&&r.right>b.left&&r.top<b.bottom&&r.bottom>b.top))return{x,y};
  }
  return position;
 }
 function frame(now){
  if(!visible||document.hidden||reduced.matches){frameId=null;last=0;return;}
  const delta=last?Math.min(now-last,50):0;last=now;
  if(!hovered&&!focused&&!opening&&!dialog.open){
   if(!route){route={from:{...position},to:destination()};elapsed=0;}
   elapsed+=delta;const progress=Math.min(elapsed/4000,1),ease=progress*progress*(3-2*progress);
   position={x:route.from.x+(route.to.x-route.from.x)*ease,y:route.from.y+(route.to.y-route.from.y)*ease};paint();
   if(elapsed>6200)route=null;
  }
  frameId=requestAnimationFrame(frame);
 }
 const sync=()=>{star.classList.toggle('star-resting',!visible||document.hidden);if(visible&&!document.hidden&&!reduced.matches&&!frameId)frameId=requestAnimationFrame(frame);};
 star.addEventListener('pointerenter',()=>hovered=true);star.addEventListener('pointerleave',()=>hovered=false);
 star.addEventListener('focus',()=>focused=true);star.addEventListener('blur',()=>focused=false);
 star.addEventListener('pointerdown',()=>hovered=true);star.addEventListener('pointerup',()=>hovered=false);
 new IntersectionObserver(entries=>{visible=entries[0].isIntersecting;sync();}).observe(space);document.addEventListener('visibilitychange',sync);reduced.addEventListener('change',sync);
 window.addEventListener('resize',()=>{position.x=Math.max(8,Math.min(position.x,space.clientWidth-64));position.y=Math.min(position.y,space.clientHeight-72);route=null;paint();});sync();
})();
