/* Shared passport postcards. Visitor text is always rendered as text, never HTML. */
(() => {
 const t=(en,es)=>document.documentElement.lang==='es'?es:en;
 let stories=[],draft={name:'',place:'',story:''},pending=false,submissionId=null,revision=0;
 const esc=value=>String(value).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
 async function request(options){const response=await fetch('/api/stories',{...options,signal:AbortSignal.timeout(12000)});const data=await response.json();if(!response.ok)throw new Error(data.error||'Unavailable');return data;}
 function cards(root,newId){
  const deck=root.querySelector('.story-postcards');if(!deck)return;
  deck.replaceChildren();
  if(!stories.length)return;
  stories.forEach((entry,index)=>{
   const card=document.createElement('article');card.className='story-postcard'+(entry.id===newId?' story-just-landed':'');card.style.setProperty('--story-tilt',index%2?'1.2deg':'-1deg');
   const stamp=document.createElement('span');stamp.className='story-stamp';stamp.textContent=t('STILL LOST','AÚN PERDIDOS');stamp.setAttribute('aria-hidden','true');
   const place=document.createElement('small');place.textContent=entry.place||t('Somewhere worth remembering','Un lugar para recordar');
   const text=document.createElement('p');text.textContent=entry.story;
   const author=document.createElement('footer');author.textContent='— '+entry.name;
   card.append(stamp,place,text,author);deck.append(card);
  });
 }
 function mount(container=document){container.querySelectorAll('[data-story-journal]').forEach(root=>{
  if(root.dataset.mounted)return;root.dataset.mounted='true';
  root.innerHTML=`<details class="travel-journal"><summary><img class="story-notebook-art" src="assets/story-notebook.svg" alt="" aria-hidden="true"><span class="story-notebook-invite"><strong>${t('Your story belongs here.','Tu historia va aquí.')}</strong><span>${t('A wrong turn. A new friend. A moment worth sharing.','Un desvío. Un nuevo amigo. Un momento para compartir.')}</span><b>${t('Open the notebook','Abre el cuaderno')} &#8599;</b></span></summary><form class="passport-story-form"><div class="story-author-fields"><label>${t('First name or nickname','Nombre o apodo')}<input name="name" maxlength="40" value="${esc(draft.name)}" autocomplete="given-name" placeholder="${t('A fellow wanderer','Un viajero más')}"></label><label>${t('Where were you?','¿Dónde estabas?')}<input name="place" maxlength="60" value="${esc(draft.place)}" placeholder="${t('Somewhere in…','En algún lugar de…')}"></label></div><label>${t('The story','La historia')}<textarea name="story" rows="5" maxlength="2500" required>${esc(draft.story)}</textarea></label><label class="story-honeypot" aria-hidden="true">Website<input name="website" tabindex="-1" autocomplete="off"></label><small class="story-word-count">0 / 100 ${t('words','palabras')}</small><p class="journal-help">${t('Your story and name will be public.','Tu historia y el nombre que elijas aparecerán públicamente en este pasaporte.')}</p><button type="submit">${t('Tuck it into the passport','Guárdala en el pasaporte')} ↗</button></form></details><p class="story-status" role="status"></p><div class="story-postcards"></div>`;
  const form=root.querySelector('form'),status=root.querySelector('.story-status'),submit=form.querySelector('[type=submit]');
  const count=()=>{const total=form.elements.story.value.trim().split(/\s+/u).filter(Boolean).length;root.querySelector('.story-word-count').textContent=total+' / 100 '+t('words','palabras');form.elements.story.setCustomValidity(total>100?t('Keep it to 100 words or fewer.','Máximo 100 palabras.'):'');};
  form.addEventListener('input',()=>{draft={name:form.elements.name.value,place:form.elements.place.value,story:form.elements.story.value};submissionId=null;count();});count();submit.disabled=pending;cards(root);
  let refreshing=false;
  async function refresh(){
   if(refreshing||pending)return;refreshing=true;const version=revision;
   try{const data=await request();if(version!==revision||!root.isConnected)return;
    const changed=JSON.stringify(stories)!==JSON.stringify(data.stories);stories=data.stories;if(changed)cards(root);
   }catch{/* Preserve drafts and submission feedback; retry automatically. */}finally{refreshing=false;}
  }
  root.refreshStories=refresh;
  form.addEventListener('submit',async event=>{
   event.preventDefault();count();if(pending||!form.reportValidity())return;
   pending=true;submit.disabled=true;submissionId??=crypto.randomUUID();status.textContent=t('Your postcard is landing…','Tu postal está llegando…');
   try{
    const data=await request({method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({...draft,id:submissionId,website:form.elements.website.value})});
    revision++;stories=[data.story,...stories.filter(entry=>entry.id!==data.story.id)];draft={name:'',place:'',story:''};submissionId=null;
    const current=document.querySelector('[data-story-journal]');if(current){cards(current,data.story.id);current.querySelectorAll('input,textarea').forEach(field=>field.value='');current.querySelector('.story-word-count').textContent='0 / 100 '+t('words','palabras');current.querySelector('details').open=false;current.querySelector('.story-status').textContent=t('Officially part of the journey. Your story has landed!','¡Ya eres parte del viaje! Tu historia ha llegado.');}
   }catch(error){status.textContent=error.message==='Give this page a minute before adding another story.'?t('Let the ink dry. Try another story in a minute.','Deja secar la tinta. Prueba otra historia en un minuto.'):t('Your story has not been posted. Your draft is safe here—please try again.','Tu historia no se publicó. El borrador sigue aquí; inténtalo de nuevo.');}
   finally{pending=false;document.querySelectorAll('.passport-story-form [type=submit]').forEach(button=>button.disabled=false);}
  });
  refresh();
 });}
 const refreshVisible=()=>{if(document.hidden)return;document.querySelectorAll('[data-story-journal]').forEach(root=>{if(root.checkVisibility()&&(!root.closest('dialog')||root.closest('dialog').open))root.refreshStories?.();});};
 setInterval(refreshVisible,12000);document.addEventListener('visibilitychange',refreshVisible);window.addEventListener('focus',refreshVisible);
 window.LPStories={mount};mount();
})();
