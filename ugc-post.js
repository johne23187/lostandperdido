/* Personal photographs rotate inside the existing UGC Instagram post. */
(() => {
 const dialog=document.querySelector('#service-details');if(!dialog)return;
 const t=(en,es)=>document.documentElement.lang==='es'?es:en;
 const photos=[
  ['john-duomo','John exploring the Duomo di Milano','John explorando el Duomo de Mil\u00e1n','50% 48%'],
  ['shared-table','A shared meal and a toast in Italy','Una comida compartida y un brindis en Italia','50% 40%'],
  ['stingray-antigua','An excursion with a stingray in Antigua','Una excursión con una mantarraya en Antigua','50% 40%']
 ];
 const motion=matchMedia('(prefers-reduced-motion:reduce)');
 let host=null,index=0,timer,run=0,paused=false;
 const animations=new Set();
 function cancel(){run++;clearTimeout(timer);animations.forEach(a=>a.cancel());animations.clear();}
 function picture(i){const image=new Image();image.src='assets/collaborations/'+photos[i][0]+'.webp';image.alt=t(photos[i][1],photos[i][2]);image.style.objectPosition=photos[i][3];image.decoding='async';return image;}
 function indicators(){
  host.dataset.slide=String(index);
  host.querySelectorAll('.destination-mark').forEach(mark=>mark.remove());
  host.insertAdjacentHTML('beforeend',window.LPDestinationMarks.render(window.LPDestinationMarks.forPhoto(photos[index][0])));
  host.querySelector('.ugc-photo-count').textContent=(index+1)+' / '+photos.length;
  dialog.querySelectorAll('.ig-carousel-dots b').forEach((dot,i)=>dot.classList.toggle('is-current',i===index));
 }
 function schedule(){clearTimeout(timer);if(host&&dialog.open&&!document.hidden&&!paused)timer=setTimeout(advance,5000);}
 async function advance(){
  const token=run,container=host,next=(index+1)%photos.length,incoming=picture(next);
  try{await incoming.decode();}catch{schedule();return;}
  if(token!==run||container!==host||!dialog.open||document.hidden||paused)return;
  const outgoing=container.querySelector(':scope > img');container.prepend(incoming);index=next;indicators();schedule();
  if(motion.matches){outgoing?.remove();return;}
  const enter=incoming.animate([{transform:'translateX(100%)'},{transform:'translateX(0)'}],{duration:600,easing:'cubic-bezier(.22,.75,.25,1)'});
  const leave=outgoing?.animate([{transform:'translateX(0)',opacity:1},{transform:'translateX(-25%)',opacity:0}],{duration:600,easing:'ease-out'});
  animations.add(enter);if(leave)animations.add(leave);
  Promise.allSettled([enter.finished,leave?.finished]).then(()=>{outgoing?.remove();animations.delete(enter);if(leave)animations.delete(leave);});
 }
 function mount(){
  const next=dialog.open&&dialog.dataset.service==='0'?dialog.querySelector('[data-ugc-gallery]'):null;
  if(next===host)return;
  cancel();host=next;index=0;paused=false;if(!host)return;
  const first=host.querySelector('img');first.src=picture(0).src;first.alt=t(photos[0][1],photos[0][2]);first.style.objectPosition=photos[0][3];
  const count=document.createElement('small');count.className='ugc-photo-count';count.setAttribute('aria-hidden','true');host.append(count);
  const pause=document.createElement('button');pause.type='button';pause.className='ugc-photo-pause';pause.setAttribute('aria-label',t('Pause photo rotation','Pausar fotos'));pause.innerHTML='<svg viewBox="0 0 20 20" aria-hidden="true"><path d="M6 5v10M14 5v10"/></svg>';host.append(pause);
  pause.addEventListener('click',()=>{paused=!paused;pause.setAttribute('aria-label',paused?t('Resume photo rotation','Reanudar fotos'):t('Pause photo rotation','Pausar fotos'));pause.innerHTML=paused?'<svg viewBox="0 0 20 20" aria-hidden="true"><path d="m6 4 9 6-9 6Z"/></svg>':'<svg viewBox="0 0 20 20" aria-hidden="true"><path d="M6 5v10M14 5v10"/></svg>';schedule();});
  const dots=dialog.querySelector('.ig-carousel-dots');if(dots)dots.innerHTML=photos.map(()=>'<b></b>').join('');
  const byline=dialog.querySelector('.ig-post-byline small');if(byline)byline.textContent=t('Travel story · UGC concept','Historia de viaje · Concepto UGC');
  const copy=dialog.querySelector('.ig-post-copy');if(copy){copy.querySelector('strong').textContent=t('Moments worth sharing.','Momentos para compartir.');copy.querySelector('p').innerHTML='<b>lostandperdido</b> '+t('Real places. Our point of view.','Lugares reales. Nuestra mirada.');copy.querySelector('small').textContent=t('Personal travel photos · UGC example','Fotos de nuestros viajes · Ejemplo UGC');}
  const note=dialog.querySelector('.ugc-concept-note');if(note)note.textContent=t('Personal travel photos · Illustrative UGC concept','Fotos de nuestros viajes · Concepto ilustrativo de UGC');
  photos.slice(1).forEach((_,i)=>{picture(i+1).decode().catch(()=>{});});indicators();schedule();
 }
 new MutationObserver(mount).observe(dialog,{childList:true,subtree:true,attributes:true,attributeFilter:['open','data-service']});
 dialog.addEventListener('close',()=>{cancel();host=null;});
 document.addEventListener('visibilitychange',()=>{clearTimeout(timer);if(!document.hidden)schedule();});
 window.addEventListener('pagehide',cancel);window.addEventListener('pageshow',schedule);
 mount();
})();
