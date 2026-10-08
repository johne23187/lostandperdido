/* Quiet meteors and a small daily light in the shared night sky. */
(() => {
 const sky=document.querySelector('.space-chapter');if(!sky)return;
 const es=()=>document.documentElement.lang==='es';
 const t=(en,spanish)=>es()?spanish:en;
 const layer=document.createElement('div');layer.className='night-meteors';layer.setAttribute('aria-hidden','true');sky.prepend(layer);
 const sun=document.createElement('button');sun.type='button';sun.className='daily-sun';sun.setAttribute('aria-haspopup','dialog');sun.setAttribute('aria-controls','daily-verse');
 sun.innerHTML='<span class="daily-sun-orb" aria-hidden="true"></span><span class="daily-sun-label"></span>';sky.append(sun);
 const dialog=document.createElement('dialog');dialog.id='daily-verse';dialog.className='daily-verse-dialog';dialog.setAttribute('aria-labelledby','daily-verse-title');
 dialog.innerHTML='<button type="button" class="daily-verse-close"></button><div class="verse-sun-seal" aria-hidden="true">☀</div><p class="daily-verse-eyebrow"></p><h2 id="daily-verse-title"></h2><time class="daily-verse-date"></time><blockquote lang="en"></blockquote><p class="daily-verse-reference" lang="en"></p><small class="daily-verse-translation"></small><p class="daily-verse-note"></p>';
 document.body.append(dialog);
 function render(){
  sun.setAttribute('aria-label',t('Open today’s Bible verse','Abrir el versículo bíblico de hoy'));sun.title=sun.getAttribute('aria-label');
  sun.querySelector('.daily-sun-label').innerHTML=es()?'Luz del día':'Daily Ligh<span class="daily-light-cross" aria-hidden="true">†</span>';
  sun.querySelector('.daily-sun-label').setAttribute('aria-label',t('Daily Light','Luz del día'));
  const date=new Date(),verse=window.LPVerseForDate(date);if(!verse)return;
  dialog.querySelector('.daily-verse-close').textContent='×';dialog.querySelector('.daily-verse-close').setAttribute('aria-label',t('Close daily verse','Cerrar versículo'));
  dialog.querySelector('.daily-verse-eyebrow').textContent=t('A LITTLE LIGHT FOR THE JOURNEY','UN POCO DE LUZ PARA EL CAMINO');
  dialog.querySelector('h2').textContent=t('Never walking alone.','Nunca caminas solo.');
  const stamp=dialog.querySelector('time');stamp.textContent=date.toLocaleDateString(es()?'es':'en',{month:'long',day:'numeric',year:'numeric'});stamp.dateTime=[date.getFullYear(),String(date.getMonth()+1).padStart(2,'0'),String(date.getDate()).padStart(2,'0')].join('-');
  dialog.querySelector('blockquote').textContent=verse.text;
  dialog.querySelector('.daily-verse-reference').textContent=verse.reference;
  dialog.querySelector('.daily-verse-translation').textContent=verse.translation+(es()?' · en inglés':'');
  dialog.querySelector('.daily-verse-note').textContent=t('A new verse each day. A little light to take with you.','Un versículo cada día. Un poco de luz para llevar contigo.');
 }
 sun.addEventListener('click',()=>{render();dialog.showModal();});
 dialog.querySelector('button').addEventListener('click',()=>dialog.close());
 dialog.addEventListener('click',event=>{if(event.target===dialog){const r=dialog.getBoundingClientRect();if(event.clientX<r.left||event.clientX>r.right||event.clientY<r.top||event.clientY>r.bottom)dialog.close();}});
 dialog.addEventListener('close',()=>sun.focus({preventScroll:true}));
 document.addEventListener('lp:languagechange',render);render();
 const reduced=matchMedia('(prefers-reduced-motion: reduce)');let visible=false,timer;
 function stop(){clearTimeout(timer);layer.replaceChildren();}
 function schedule(){clearTimeout(timer);if(visible&&!document.hidden&&!reduced.matches)timer=setTimeout(shoot,7000+Math.random()*10000);}
 function shoot(){
  if(!visible||document.hidden||reduced.matches)return;
  if(!document.querySelector('dialog[open]')){
   const rect=sky.getBoundingClientRect(),top=Math.max(0,-rect.top),bottom=Math.min(rect.height,innerHeight-rect.top);
   const star=document.createElement('i');star.className='night-meteor';star.style.left=(12+Math.random()*60)+'%';star.style.top=(top+24+Math.random()*Math.max(0,bottom-top-150))+'px';
   star.style.setProperty('--meteor-travel',(140+Math.random()*100)+'px');star.style.setProperty('--meteor-duration',(1.1+Math.random()*.5)+'s');layer.append(star);
   star.addEventListener('animationend',()=>star.remove(),{once:true});
  }
  schedule();
 }
 new IntersectionObserver(entries=>{visible=entries[0].isIntersecting;stop();schedule();}).observe(sky);
 reduced.addEventListener('change',()=>{stop();schedule();});
 document.addEventListener('visibilitychange',()=>{stop();schedule();if(dialog.open)render();});
 window.addEventListener('pagehide',stop);
})();
