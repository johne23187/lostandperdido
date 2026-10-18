/* Netlify handles delivery; the static form schema lives in index.html. */
(() => {
 const t=(en,es)=>document.documentElement.lang==='es'?es:en;
 const esc=value=>String(value??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
 const categories=[['restaurants','Food & dining','Gastronomía'],['stays','Hotels & stays','Alojamientos'],['experiences','Experiences','Experiencias'],['ugc','Brand content','Contenido de marca'],['partnerships','Partnerships','Alianzas'],['social','Social media','Redes sociales'],['photography','Photography','Fotografía'],['films','Films & media','Videos y medios'],['other','Something else','Otra idea']];
 const plane='<svg class="collab-plane" viewBox="0 0 24 24" aria-hidden="true" fill="currentColor"><path transform="rotate(45 12 12)" d="M12 2c1 0 1.5 1 1.5 2v4l7.5 5v2l-7.5-2v5l2.5 2v1l-4-1-4 1v-1l2.5-2v-5L3 15v-2l7.5-5V4c0-1 .5-2 1.5-2Z"/></svg>';
 const dialog=document.createElement('dialog');dialog.id='collaboration-inquiry';dialog.className='collab-dialog collab-form-dialog';dialog.setAttribute('aria-labelledby','collab-form-title');document.body.append(dialog);
 let opener,draft={},state='idle',autoSubject='';
 const field=(name,label,options={})=>`<label class="collab-field ${options.wide?'collab-field-wide':''}"><span>${label}${options.optional?` <small>${t('(optional)','(opcional)')}</small>`:''}</span><input name="${name}" type="${options.type||'text'}" ${options.optional?'':'required'} maxlength="${options.max||160}" ${options.autocomplete?`autocomplete="${options.autocomplete}"`:''} value="${esc(draft[name])}"></label>`;
 function capture(){const form=dialog.querySelector('form');if(form&&state!=='sending')draft=Object.fromEntries(new FormData(form));}
 function render(){
  dialog.innerHTML=`<header class="collab-topbar"><span>L&amp;P / ${t('NEXT STOP: YOUR IDEA','PRÓXIMA PARADA: TU IDEA')}</span><button type="button" class="collab-close" aria-label="${t('Close inquiry','Cerrar consulta')}">×</button></header><div class="collab-form-content"><div class="collab-form-heading"><span class="collab-form-mark">${plane}</span><p class="collab-eyebrow">JOHN + MATEO</p><h2 id="collab-form-title">${t('Work with us.','Trabaja con nosotros.')}</h2><p>${t('Your place. Your idea. Our next story together.','Tu lugar. Tu idea. Nuestra próxima historia juntos.')}</p></div>${state==='sent'?`<div class="collab-form-success" role="status" tabindex="-1"><strong>${t('Your idea is on its way.','Tu idea ya está en camino.')}</strong><p>${t('Thanks for reaching out. John & Mateo will reply by email.','Gracias por escribirnos. John y Mateo te responderán por correo.')}</p><button type="button" class="collab-inquiry collab-form-back">${t('Back to exploring','Volver a explorar')} ${plane}</button></div>`:`<form class="collab-form" name="collaboration" method="POST" action="/" aria-busy="${state==='sending'}"><input type="hidden" name="form-name" value="collaboration"><input type="hidden" name="language" value="${document.documentElement.lang==='es'?'es':'en'}"><div hidden><label>Leave empty<input name="bot-field" tabindex="-1" autocomplete="off"></label></div><fieldset ${state==='sending'?'disabled':''}><legend class="collab-form-sr">${t('Collaboration details','Datos de la colaboración')}</legend><div class="collab-form-grid">${field('name',t('Your name','Tu nombre'),{autocomplete:'name',max:120})}${field('email',t('Email','Correo electrónico'),{type:'email',autocomplete:'email',max:254})}${field('company',t('Company / brand','Empresa / marca'),{autocomplete:'organization',optional:true,max:160})}<label class="collab-field"><span>${t('Collaboration','Colaboración')}</span><select name="category" required>${categories.map(([id,en,es])=>`<option value="${id}" ${draft.category===id?'selected':''}>${t(en,es)}</option>`).join('')}</select></label>${field('subject',t('Subject','Asunto'),{wide:true,max:180})}<label class="collab-field collab-field-wide"><span>${t('What do you have in mind?','¿Qué tienes en mente?')}</span><textarea name="message" required minlength="10" maxlength="5000" rows="3" placeholder="${t('Tell us about your place, your idea, and what you want to create.','Cuéntanos sobre tu lugar, tu idea y lo que quieres crear.')}">${esc(draft.message)}</textarea></label>${field('location',t('Location','Ubicación'),{optional:true,max:160})}${field('timing',t('Ideal timing','Fechas ideales'),{optional:true,max:160})}</div><p class="collab-form-note">${t('We’ll only use these details to respond to your inquiry.','Solo usaremos estos datos para responder a tu consulta.')}</p><button type="submit" class="collab-inquiry collab-form-send">${state==='sending'?t('Sending…','Enviando…'):t('Send it our way','Envíanos tu idea')} ${plane}</button></fieldset><p class="collab-form-status" role="status" aria-live="polite">${state==='error'?t('We couldn’t confirm your submission. Your details are still here—please try again in a moment.','No pudimos confirmar el envío. Tus datos siguen aquí. Inténtalo de nuevo en un momento.'):''}</p></form>`}</div>`;
 }
 function openInquiry(trigger){
  if(dialog.open)return;
  opener=trigger;if(state==='sent'){draft={};state='idle';autoSubject='';}
  if(trigger.closest('#navigation')){
   const toggle=document.querySelector('.menu-toggle');
   document.querySelector('#navigation')?.classList.remove('is-open');toggle?.setAttribute('aria-expanded','false');
   if(matchMedia('(max-width:1000px)').matches)opener=toggle;
  }
  if(state!=='sending'){
   const service=trigger.closest('#service-details'),feature=trigger.closest('.magazine-feature');
   const serviceCategories=['ugc','experiences','partnerships','social','photography','films'];
   const theme=feature?.className.match(/feature-(ugc|destination|partnership|social|photography|films)/)?.[1];
   const themeCategories={ugc:'ugc',destination:'experiences',partnership:'partnerships',social:'social',photography:'photography',films:'films'};
   draft.category=trigger.dataset.collabInquiry||serviceCategories[Number(service?.dataset.service)]||themeCategories[theme]||'other';
   if(!draft.subject||draft.subject===autoSubject){
    const heading=service?.querySelector('#service-title')||feature?.querySelector('.editorial-kicker');
    autoSubject=heading?.textContent.replace(/^\s*\d+\s*\/\s*/,'').trim()||'';draft.subject=autoSubject;
   }
  }
  render();dialog.showModal();dialog.scrollTop=0;dialog.querySelector('.collab-close').focus({preventScroll:true});
 }
 // Capture before book readers and anchor scrolling handle the same click.
 // This also covers future email CTAs without launching a visitor's mail app.
 document.addEventListener('click',event=>{
  const trigger=event.target.closest('[data-collab-inquiry],a[href="#collaboration-inquiry"],a[href="#contact"],a[href^="mailto:"]');
  if(!trigger||trigger.closest('#collaboration-inquiry'))return;
  event.preventDefault();event.stopPropagation();openInquiry(trigger);
 },true);
 function markTriggers(){document.querySelectorAll('a[href="#collaboration-inquiry"],a[href="#contact"]').forEach(link=>{link.setAttribute('aria-haspopup','dialog');link.setAttribute('aria-controls','collaboration-inquiry');});}
 markTriggers();document.addEventListener('lp:languagechange',markTriggers);
 dialog.addEventListener('input',capture);dialog.addEventListener('change',capture);
 dialog.addEventListener('click',event=>{if(event.target.closest('.collab-close,.collab-form-back'))dialog.close();});
 dialog.addEventListener('close',()=>{capture();const target=opener?.isConnected?opener:document.querySelector('#collaboration-showcase .collab-inquiry');target?.focus({preventScroll:true});});
 dialog.addEventListener('submit',async event=>{
  if(!event.target.matches('.collab-form'))return;event.preventDefault();
  if(state==='sending'||!event.target.reportValidity())return;
  capture();if(draft['bot-field'])return;
  const body=new URLSearchParams(draft);state='sending';render();
  try{
   const response=await fetch('/',{method:'POST',headers:{'Content-Type':'application/x-www-form-urlencoded'},body:body.toString(),signal:AbortSignal.timeout(20000)});
   if(!response.ok)throw Error('Submission not accepted');
   state='sent';draft={};
  }catch{state='error';}
  if(dialog.open){render();const status=dialog.querySelector('.collab-form-success,.collab-form-status');status?.setAttribute('tabindex','-1');status?.focus({preventScroll:false});}
 });
 document.addEventListener('lp:languagechange',()=>{if(dialog.open){capture();render();}});
})();
