/* Shared mobile interaction behavior; all existing desktop components remain intact. */
(() => {
 const mobileNav=matchMedia('(max-width:1000px)');
 const menu=document.querySelector('#navigation'),toggle=document.querySelector('.menu-toggle');
 const open=()=>mobileNav.matches&&toggle.getAttribute('aria-expanded')==='true';
 function sync(){document.body.classList.toggle('mobile-menu-open',open());}
 new MutationObserver(sync).observe(toggle,{attributes:true,attributeFilter:['aria-expanded']});
 mobileNav.addEventListener('change',()=>{closeMenu();sync();});
 document.addEventListener('click',event=>{if(open()&&!event.target.closest('.site-header'))closeMenu();});
 document.addEventListener('keydown',event=>{
  if(!open()||event.key!=='Tab')return;
  const targets=[toggle,...menu.querySelectorAll('a,button')].filter(e=>e.getClientRects().length);
  const first=targets[0],last=targets.at(-1);
  if(event.shiftKey&&document.activeElement===first){event.preventDefault();last.focus();}
  else if(!event.shiftKey&&document.activeElement===last){event.preventDefault();first.focus();}
 });
 const story=document.querySelector('#how-we-met');
 const controls=document.createElement('div');controls.className='story-mobile-paging';
 controls.innerHTML='<button type="button" data-story-step="-1" aria-label="Previous page">←</button><span role="status"></span><button type="button" data-story-step="1" aria-label="Next page">→</button><button type="button" data-story-close aria-label="Close book">×</button>';
 story.insertBefore(controls,story.firstChild);let page=0;
 function updateStory(){
  const es=document.documentElement.lang==='es';story.dataset.storyPage=String(page);
  controls.querySelector('span').textContent=(es?'PÁGINA ':'PAGE ')+(page+1)+' / 2';
  controls.querySelector('[data-story-step="-1"]').disabled=page===0;controls.querySelector('[data-story-step="1"]').disabled=page===1;
  controls.querySelector('[data-story-step="-1"]').setAttribute('aria-label',es?'Página anterior':'Previous page');
  controls.querySelector('[data-story-step="1"]').setAttribute('aria-label',es?'Página siguiente':'Next page');
  controls.querySelector('[data-story-close]').setAttribute('aria-label',es?'Cerrar libro':'Close book');
 }
 controls.addEventListener('click',event=>{if(event.target.closest('[data-story-close]'))story.close();const button=event.target.closest('[data-story-step]');if(button){page=Math.max(0,Math.min(1,page+Number(button.dataset.storyStep)));updateStory();story.scrollTo({top:0,behavior:'instant'});}});
 story.addEventListener('close',()=>{page=0;updateStory();});
 document.addEventListener('lp:languagechange',updateStory);updateStory();
})();
