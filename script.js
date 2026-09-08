document.getElementById('year').textContent = new Date().getFullYear();

const menuToggle = document.querySelector('.menu-toggle');
const navigation = document.getElementById('navigation');
document.body.classList.add('js-ready');
menuToggle.hidden = false;

function closeMenu() {
  menuToggle.setAttribute('aria-expanded', 'false');
  navigation.classList.remove('is-open');
}

menuToggle.addEventListener('click', () => {
  const open = menuToggle.getAttribute('aria-expanded') !== 'true';
  menuToggle.setAttribute('aria-expanded', String(open));
  navigation.classList.toggle('is-open', open);
});

navigation.addEventListener('click', (event) => {
  // Don't close the mobile menu just because the visitor changes language.
  if (event.target.closest('a')) closeMenu();
});

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && menuToggle.getAttribute('aria-expanded') === 'true') {
    closeMenu();
    menuToggle.focus();
  }
});

window.matchMedia('(min-width: 701px)').addEventListener('change', closeMenu);

// ---------- Bilingual EN / ES site ----------
// The HTML remains readable without JavaScript. English is the source language;
// this dictionary swaps visible copy into neutral Latin American Spanish.
const spanish = {
  'Skip to content': 'Saltar al contenido',
  'ENGLISH + ESPAÑOL': 'ENGLISH + ESPAÑOL',
  'Menu': 'Menú',
  'The journey': 'El viaje',
  'Our story': 'Nuestra historia',
  'Field notes': 'Notas de viaje',
  'Work with us': 'Trabaja con nosotros',
  'TWO CULTURES. TWO LANGUAGES. ONE ADVENTURE.': 'DOS CULTURAS. DOS IDIOMAS. UNA AVENTURA.',
  'somewhere between': 'en algún lugar entre',
  'here': 'aquí',
  'and': 'y',
  'alla': 'allá',
  'Real people. Wrong turns. Stories in English': 'Personas reales. Giros inesperados. Historias en inglés',
  'y español.': 'y español.',
  'We’re getting lost in Latin America—and you’re coming with us.': 'Nos vamos a perder por Latinoamérica, y tú vienes con nosotros.',
  'Come along': 'Acompáñanos',
  'Meet Lost & Perdido': 'Conoce Lost & Perdido',
  'hello.': 'hola.',
  '¿cómo estás?': '¿cómo estás?',
  'tudo bem!': '¡todo bien!',
  'Nos vemos en el camino. ↘': 'Nos vemos en el camino. ↘',
  'First season in the making': 'Primera temporada en camino',
  'First arrival: October 18, 2026': 'Primera llegada: 18 de octubre de 2026',
  'Argentina': 'Argentina',
  'Chile': 'Chile',
  'Bolivia ↗': 'Bolivia ↗',
  '01 / THE FIRST CHAPTER': '01 / EL PRIMER CAPÍTULO',
  'Three countries.': 'Tres países.',
  'No perfect itinerary.': 'Sin itinerario perfecto.',
  'About a month on the road. From Mendoza to coastal Chile, then deeper into Bolivia. This is the starting plan. The people we meet will help write the rest.': 'Cerca de un mes en el camino. De Mendoza a la costa de Chile y después más adentro de Bolivia. Este es el plan inicial. La gente que conozcamos ayudará a escribir el resto.',
  '01 / ARGENTINA': '01 / ARGENTINA',
  '5 DAYS': '5 DÍAS',
  'Photo: xxxx': 'Foto: xxxx',
  '· cropped to fit': '· recortada para ajustar',
  'WINE COUNTRY & WRONG TURNS': 'TIERRA DE VINO Y GIROS INESPERADOS',
  'Starting in Argentina.': 'Empezamos en Argentina.',
  'Food, wine country and a first taste of the road. Valle de Uco and thermal springs are on our radar.': 'Comida, tierra de vinos y una primera probada de la ruta. El Valle de Uco y las aguas termales están en nuestro radar.',
  'Arriving': 'Llegamos el',
  'October 18, 2026': '18 de octubre de 2026',
  'Counting down to the journey.': 'Cuenta regresiva para el viaje.',
  'Enable JavaScript to see the live countdown.': 'Activa JavaScript para ver la cuenta regresiva.',
  'The opening chapter': 'El capítulo inicial',
  '02 / CHILE': '02 / CHILE',
  '8 DAYS': '8 DÍAS',
  'Photo: Rjcastillo': 'Foto: Rjcastillo',
  '· resized & cropped to fit': '· redimensionada y recortada para ajustar',
  'CITY STREETS TO PACIFIC AIR': 'DE CALLES URBANAS AL AIRE DEL PACÍFICO',
  'Over the border.': 'Cruzando la frontera.',
  'Santiago’s Plaza de Armas and Metropolitan Cathedral, the Maipo Valley and Viña del Mar. A new country, new conversations and a change of pace.': 'La Plaza de Armas y la Catedral Metropolitana de Santiago, el Valle del Maipo y Viña del Mar. Un nuevo país, nuevas conversaciones y un cambio de ritmo.',
  'October 23, 2026': '23 de octubre de 2026',
  'The next turn': 'El siguiente giro',
  '03 / BOLIVIA': '03 / BOLIVIA',
  '2+ WEEKS': '2+ SEMANAS',
  'Photo: Otrokirito': 'Foto: Otrokirito',
  'STAY LONGER. GO DEEPER.': 'QUEDARSE MÁS. IR MÁS A FONDO.',
  'More than passing through.': 'Más que estar de paso.',
  'Time to settle in, meet people and follow local leads. Fewer boxes to tick. More stories to stumble into.': 'Tiempo para instalarnos, conocer gente y seguir recomendaciones locales. Menos cosas por tachar de una lista. Más historias por encontrar sin buscarlas.',
  'October 31, 2026': '31 de octubre de 2026',
  'The deeper dive': 'Más a fondo',
  'Countdowns run to midnight at each destination. The unexpected is still the point.': 'Las cuentas regresivas terminan a medianoche en cada destino. Lo inesperado sigue siendo parte del punto.',
  'Vamos a ver qué pasa.': 'Vamos a ver qué pasa.',
  'Lost': 'Lost',
  'Perdido': 'Perdido',
  'TWO PERSPECTIVES · ONE ROAD': 'DOS PERSPECTIVAS · UN CAMINO',
  '02 / NICE TO MEET YOU · MUCHO GUSTO': '02 / MUCHO GUSTO · NICE TO MEET YOU',
  'Same place.': 'El mismo lugar.',
  'Dos perspectivas.': 'Dos perspectivas.',
  'We’re two travel companions, one Latino-American English speaker who learned Spanish later in life, and one Bolivian born native Spanish speaker who learned English later in life, experiencing Latin America together. Sometimes we see things differently. Sometimes we get lost along the way. Usually, that’s where the good story starts.': 'Somos dos compañeros de viaje: una persona latinoamericana angloparlante que aprendió español más adelante en la vida y una persona boliviana, hablante nativa de español, que aprendió inglés más adelante. Estamos viviendo Latinoamérica juntos. A veces vemos las cosas de manera distinta. A veces nos perdemos en el camino. Y normalmente ahí empieza la buena historia.',
  'English and Spanish live side by side here: in conversations with locals, over food, on bus rides and in the moments we couldn’t have planned.': 'Aquí el inglés y el español conviven: en conversaciones con gente local, alrededor de la comida, durante viajes en bus y en esos momentos que nunca podríamos haber planeado.',
  'You don’t need to speak both languages.': 'No necesitas hablar los dos idiomas.',
  'You just need a little curiosity.': 'Solo necesitas un poco de curiosidad.',
  '03 / FROM THE ROAD': '03 / DESDE EL CAMINO',
  'The good stuff': 'Lo mejor',
  'is rarely planned.': 'casi nunca se planea.',
  'FIRST SEASON · COMING SOON': 'PRIMERA TEMPORADA · PRÓXIMAMENTE',
  'Missed buses. New friends. A meal we can’t stop talking about. The big adventures and everything between them will live here.': 'Buses perdidos. Nuevos amigos. Una comida de la que no podemos dejar de hablar. Las grandes aventuras y todo lo que pasa entre ellas vivirán aquí.',
  '01 / THE WHOLE STORY': '01 / LA HISTORIA COMPLETA',
  'Stay for the journey.': 'Quédate para el viaje.',
  'Longer films with room for the people, the problems and the unexpected payoff.': 'Videos más largos, con espacio para la gente, los problemas y esas recompensas inesperadas.',
  'Planned: every 2 weeks': 'Planeado: cada 2 semanas',
  '02 / THE UNFILTERED BITS': '02 / SIN FILTRO',
  'Lost in the moment.': 'Perdidos en el momento.',
  'Language mix-ups, food discoveries and the moments too funny to leave on the camera.': 'Confusiones de idioma, descubrimientos de comida y momentos demasiado graciosos para dejarlos fuera.',
  'Short stories, often': 'Historias cortas, seguido',
  '03 / YOU’RE COMING TOO': '03 / TÚ TAMBIÉN VIENES',
  'Take the back seat.': 'Súbete con nosotros.',
  'Travel days, behind the scenes, photo diaries and a say in what we try next.': 'Días de viaje, detrás de cámaras, diarios de fotos y una voz en lo que probamos después.',
  'Life between the edits': 'La vida entre ediciones',
  'We’re getting the first chapter ready. Channel links and episodes will appear here when the relaunch is live.': 'Estamos preparando el primer capítulo. Los enlaces de los canales y los episodios aparecerán aquí cuando el relanzamiento esté en vivo.',
  '04 / THE TRAVEL NOTEBOOK': '04 / EL CUADERNO DE VIAJE',
  'Learned on the road.': 'Aprendido en el camino.',
  'Shared with you.': 'Compartido contigo.',
  'Useful notes will grow out of the trip: what we spent, how we got around and what we wish we’d known. First, we go. Then, we share.': 'Del viaje saldrán notas útiles: cuánto gastamos, cómo nos movimos y qué nos habría gustado saber. Primero vamos. Después compartimos.',
  'Routes & real budgets': 'Rutas y presupuestos reales',
  'After the trip': 'Después del viaje',
  'Language & local connections': 'Idioma y conexiones locales',
  'What actually earned its place in our bags': 'Lo que realmente se ganó un lugar en nuestras mochilas',
  '05 / LET’S MAKE SOMETHING REAL': '05 / HAGAMOS ALGO REAL',
  'Your place.': 'Tu lugar.',
  'Our perspective.': 'Nuestra perspectiva.',
  'A shared story.': 'Una historia compartida.',
  'We partner with stays, restaurants, local experiences and travel brands to create human, culturally curious content in English and Spanish.': 'Colaboramos con alojamientos, restaurantes, experiencias locales y marcas de viaje para crear contenido humano y culturalmente curioso en inglés y español.',
  'UGC & content production': 'UGC y producción de contenido',
  'Brand partnerships': 'Colaboraciones con marcas',
  'Destination storytelling': 'Narrativa de destinos',
  'Let’s talk': 'Hablemos',
  'We’re not just showing you where we’re going.': 'No solo te estamos mostrando adónde vamos.',
  'We’re taking you': 'Te llevamos',
  'with us.': 'con nosotros.',
  'See you out there.': 'Nos vemos por ahí.',
  'Nos vemos allá.': 'Nos vemos allá.',
  'Two languages. One shared adventure.': 'Dos idiomas. Una aventura compartida.'
};

const spanishAttributes = {
  'Lost and Perdido home': 'Inicio de Lost & Perdido',
  'Main navigation': 'Navegación principal',
  'Language': 'Idioma',
  'Rows of vines below snowy mountains in Mendoza, Argentina': 'Hileras de viñedos bajo montañas nevadas en Mendoza, Argentina',
  'Santiago Metropolitan Cathedral and historic buildings beside Plaza de Armas in daylight': 'Catedral Metropolitana de Santiago y edificios históricos junto a la Plaza de Armas durante el día',
  'Snow-covered Illimani in the Bolivian Andes': 'Illimani cubierto de nieve en los Andes bolivianos',
  'Countdown to Argentina': 'Cuenta regresiva para Argentina',
  'Countdown to Chile': 'Cuenta regresiva para Chile',
  'Countdown to Bolivia': 'Cuenta regresiva para Bolivia'
};

const originalText = new WeakMap();
const originalAttributes = new WeakMap();
let currentLanguage = 'en';

function preserveWhitespace(original, replacement) {
  const leading = original.match(/^\s*/)?.[0] || '';
  const trailing = original.match(/\s*$/)?.[0] || '';
  return `${leading}${replacement}${trailing}`;
}

function collectTranslatableText() {
  const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, {
    acceptNode(node) {
      const parent = node.parentElement;
      if (!parent || parent.matches('script, style')) return NodeFilter.FILTER_REJECT;
      return node.textContent.trim() ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_REJECT;
    }
  });
  let node;
  while ((node = walker.nextNode())) originalText.set(node, node.textContent);

  document.querySelectorAll('[aria-label], img[alt]').forEach((element) => {
    originalAttributes.set(element, {
      ariaLabel: element.getAttribute('aria-label'),
      alt: element.getAttribute('alt')
    });
  });
}

function translateStaticText(language) {
  originalText.forEach?.(() => {}); // WeakMaps are intentionally not enumerable.
  const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, {
    acceptNode(node) {
      const parent = node.parentElement;
      if (!parent || parent.matches('script, style, .countdown')) return NodeFilter.FILTER_REJECT;
      return node.textContent.trim() ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_REJECT;
    }
  });
  let node;
  while ((node = walker.nextNode())) {
    if (!originalText.has(node)) originalText.set(node, node.textContent);
    const source = originalText.get(node);
    const key = source.trim();
    node.textContent = language === 'es' && spanish[key]
      ? preserveWhitespace(source, spanish[key])
      : source;
  }

  document.querySelectorAll('[aria-label], img[alt]').forEach((element) => {
    if (!originalAttributes.has(element)) {
      originalAttributes.set(element, {
        ariaLabel: element.getAttribute('aria-label'),
        alt: element.getAttribute('alt')
      });
    }
    const source = originalAttributes.get(element);
    if (source.ariaLabel !== null) {
      element.setAttribute('aria-label', language === 'es' && spanishAttributes[source.ariaLabel]
        ? spanishAttributes[source.ariaLabel] : source.ariaLabel);
    }
    if (source.alt !== null) {
      element.setAttribute('alt', language === 'es' && spanishAttributes[source.alt]
        ? spanishAttributes[source.alt] : source.alt);
    }
  });
}

function updateLanguageButtons(language) {
  document.querySelectorAll('.lang-button').forEach((button) => {
    const active = button.dataset.lang === language;
    button.classList.toggle('is-active', active);
    button.setAttribute('aria-pressed', String(active));
  });
}

function setLanguage(language, save = true) {
  currentLanguage = language === 'es' ? 'es' : 'en';
  document.documentElement.lang = currentLanguage;
  translateStaticText(currentLanguage);
  updateLanguageButtons(currentLanguage);

  const metaDescription = document.querySelector('meta[name="description"]');
  if (currentLanguage === 'es') {
    document.title = 'Lost & Perdido — Dos idiomas. Una aventura.';
    if (metaDescription) metaDescription.content = 'Dos culturas, dos idiomas, una aventura. Sigue a Lost & Perdido por Argentina, Chile y Bolivia en busca de historias reales, conexiones locales y algunos giros inesperados.';
  } else {
    document.title = 'Lost & Perdido — Two languages. One adventure.';
    if (metaDescription) metaDescription.content = 'Two cultures, two languages, one adventure. Follow Lost & Perdido through Argentina, Chile and Bolivia for real stories, local connections and a few wrong turns.';
  }

  if (save) localStorage.setItem('lostandperdido-language', currentLanguage);
  updateCountdowns();
}

collectTranslatableText();
document.querySelectorAll('.lang-button').forEach((button) => {
  button.addEventListener('click', () => setLanguage(button.dataset.lang));
});

// Dates are midnight at each destination, with explicit UTC offsets so
// every visitor sees the same countdown regardless of their own timezone.
const arrivals = Array.from(document.querySelectorAll('[data-arrival]'), (element) => ({
  element,
  timestamp: Date.parse(element.dataset.arrival)
}));

function countdownParts(target, now) {
  const seconds = Math.max(0, Math.ceil((target - now) / 1000));
  return [Math.floor(seconds / 86400), Math.floor(seconds / 3600) % 24,
    Math.floor(seconds / 60) % 60, seconds % 60];
}

function updateCountdowns() {
  if (typeof arrivals === 'undefined') return;
  const now = Date.now();
  const labels = currentLanguage === 'es'
    ? ['días', 'horas', 'minutos', 'segundos']
    : ['days', 'hours', 'minutes', 'seconds'];

  arrivals.forEach(({ element, timestamp }) => {
    const country = element.dataset.country;
    if (now >= timestamp) {
      element.textContent = currentLanguage === 'es'
        ? 'Fecha de llegada alcanzada — ¡vamos!'
        : 'Arrival date reached — ¡vamos!';
      element.setAttribute('aria-label', currentLanguage === 'es'
        ? `${country}: fecha de llegada alcanzada`
        : `${country}: arrival date reached`);
      return;
    }

    const values = countdownParts(timestamp, now);
    element.innerHTML = values.map((value, index) =>
      `<span class="countdown-unit"><strong>${String(value).padStart(2, '0')}</strong><small>${labels[index]}</small></span>`
    ).join('');

    element.setAttribute('aria-label', currentLanguage === 'es'
      ? `${country}: ${values.map((value, index) => `${value} ${labels[index]}`).join(', ')} para la llegada`
      : `${country}: ${values.map((value, index) => `${value} ${labels[index]}`).join(', ')} until arrival`);
  });
}

// Use a prior choice when available; otherwise use the browser language.
const savedLanguage = localStorage.getItem('lostandperdido-language');
const preferredLanguage = savedLanguage || (navigator.language.toLowerCase().startsWith('es') ? 'es' : 'en');
setLanguage(preferredLanguage, false);

setInterval(updateCountdowns, 1000);
document.addEventListener('visibilitychange', () => {
  if (!document.hidden) updateCountdowns();
});
