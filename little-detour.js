/* A little starlight, then the L&P posting schedule. */
(() => {
 const stage=document.querySelector('.watch-section');if(!stage)return;
 const t=(en,es)=>document.documentElement.lang==='es'?es:en;
 const star=document.createElement('button');star.type='button';star.className='little-detour-star';
 star.innerHTML='<svg viewBox="0 0 64 64" aria-hidden="true"><defs><radialGradient id="detour-gold" cx="35%" cy="25%" r="80%"><stop stop-color="#fff6a2"/><stop offset=".55" stop-color="#f5d354"/><stop offset="1" stop-color="#d79932"/></radialGradient></defs><path d="m32 5 8 18 20 2-15 14 4 20-17-10-17 10 4-20L4 25l20-2Z" fill="url(#detour-gold)" stroke="#ffe592" stroke-width="1.2"/><path d="m29 17-4 10-11 2" fill="none" stroke="#fffbe0" stroke-width="2" stroke-linecap="round" opacity=".8"/></svg>';stage.append(star);

 const dialog=document.createElement('dialog');dialog.id='little-detour';dialog.className='star-schedule';dialog.setAttribute('aria-labelledby','star-schedule-title');document.body.append(dialog);
 star.setAttribute('aria-haspopup','dialog');star.setAttribute('aria-controls',dialog.id);
 let timer;
 function render(){
  star.setAttribute('aria-label',t('Our posting schedule','Nuestro calendario de publicaciones'));star.title=t('See you under the stars.','Nos vemos bajo las estrellas.');
  dialog.innerHTML=`<button class="star-schedule-close" type="button" aria-label="${t('Close','Cerrar')}" autofocus>×</button><div class="star-schedule-glow" aria-hidden="true">★</div><div class="star-schedule-intro"><h2 id="star-schedule-title">${t('You are a star.','Eres una estrella.')}</h2><p>${t('We’re reaching for ours.','Vamos por la nuestra.')}</p></div><div class="star-schedule-content"><p class="star-schedule-eyebrow">${t('SAME DREAM. NEW EPISODES.','MISMO SUEÑO. NUEVOS EPISODIOS.')}</p><div class="star-schedule-premiere"><span>YouTube</span><strong>${t('Every Sunday','Cada domingo')}</strong><b>8 PM EST</b><small>${t('Starting November 1, 2026','Desde el 1 de noviembre de 2026')}</small></div><div class="star-schedule-daily"><strong>${t('A little lost. Every day.','Un poquito perdidos. Cada día.')}</strong><p>Instagram Reels · Facebook · TikTok</p><span>${t('New posts daily','Publicaciones todos los días')}</span></div><p class="star-schedule-footer">${t('Come for the journey. Stay for the plot twists.','Ven por el viaje. Quédate por los giros inesperados.')}</p></div>`;
  dialog.querySelector('.star-schedule-close').addEventListener('click',()=>dialog.close());
 }
 render();document.addEventListener('lp:languagechange',render);
 star.addEventListener('click',()=>{
  clearTimeout(timer);dialog.classList.remove('schedule-ready');render();dialog.showModal();dialog.scrollTop=0;
  if(matchMedia('(prefers-reduced-motion: reduce)').matches)dialog.classList.add('schedule-ready');
  else timer=setTimeout(()=>dialog.classList.add('schedule-ready'),3200);
 });
 dialog.addEventListener('close',()=>{clearTimeout(timer);star.focus({preventScroll:true});});
 dialog.addEventListener('click',e=>{if(e.target!==dialog)return;const r=dialog.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)dialog.close();});
 let visible=false;const sync=()=>star.classList.toggle('star-resting',!visible||document.hidden);
 new IntersectionObserver(entries=>{visible=entries[0].isIntersecting;sync();}).observe(star);document.addEventListener('visibilitychange',sync);sync();
})();
