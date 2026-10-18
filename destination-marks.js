/* Small, direct destination links shared by photo galleries and magazine previews. */
(() => {
 const places={
  regioni:{name:'Le Regioni, Milano',href:'https://www.facebook.com/Ristorante-Le-Regioni-578550282238233/',logo:'assets/collaborations/le-regioni-logo.svg'},
  airbnb:{name:'Airbnb',href:'https://www.airbnb.com/',logo:'assets/collaborations/airbnb-logo.svg'},
  stingray:{name:'Stingray City Antigua',href:'https://stingraycityantigua.com/',logo:'assets/stingray-city-logo.png'},
  terroubi:{name:'Terrou-Bi, Dakar',href:'https://terroubi.com/en/',logo:'assets/collaborations/terroubi-logo.svg'},
  yosemite:{name:'Yosemite National Park',href:'https://www.nps.gov/yose/index.htm',logo:'assets/collaborations/nps-logo.png'},
  zipaquira:{name:'Catedral de Sal de Zipaquirá',href:'https://www.catedraldesal.gov.co/',logo:'assets/collaborations/zipaquira-logo.webp'},
  taj:{name:'Taj Mahal',href:'https://tajmahal.gov.in/',logo:'assets/collaborations/taj-mahal-logo.png'},
  duomo:{name:'Duomo di Milano',href:'https://www.duomomilano.it/en/',logo:'assets/collaborations/duomo-logo.svg'}
 };
 const escape=value=>String(value).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
 function render(key,language=document.documentElement.lang,extra=''){
  const place=places[key];if(!place)return '';
  const label=language==='es'?'Visita '+place.name+' (abre en otra pestaña)':'Visit '+place.name+' (opens in a new tab)';
  return `<a class="destination-mark destination-mark-${key} ${extra}" href="${place.href}" target="_blank" rel="noopener noreferrer" aria-label="${escape(label)}"><img src="${place.logo}" alt="${escape(place.name)}" decoding="async"></a>`;
 }
 function forPhoto(src=''){
  if(/stingray-antigua|6491edeb4000|6AEBE64B-10D9-40B0-AB56-953038A92850|D713DD71-5E6A-4B65-839B-336DAC31A43C/i.test(src))return 'stingray';
  if(/john-duomo|4EBF7BCB-6E23-4575-8ABF-E5C0B40AAE7C/i.test(src))return 'duomo';
  if(/john-colombia-cave|zipaquira-cathedral|A08EE8EE-A5FF-42A1-BD4A-6B05B0A1F591/i.test(src))return 'zipaquira';
  return null;
 }
 window.LPDestinationMarks={render,forPhoto};
})();
