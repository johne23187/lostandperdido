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
  'OUR SOUNDTRACK': 'NUESTRA BANDA SONORA',
  'Listen on YouTube ↗': 'Escuchar en YouTube ↗',
  "A summer to remember.": "Un verano para recordar.",
  "Friends from camp.": "Amigos del campamento.",
  "Along for the ride.": "Compartiendo el viaje.",
  "Camp nights.": "Noches de campamento.",
  "Our first chapter.": "Nuestro primer capítulo.",
  "On the road together.": "Juntos en el camino.",
  "Showing up together.": "Siempre juntos.",
  "A night in New York.": "Una noche en Nueva York.",
  "Back where it began.": "Donde todo comenzó.",
  "Two friends. One team.": "Dos amigos. Un equipo.",
  "Camp memories.": "Recuerdos del campamento.",
  "Exploring together.": "Explorando juntos.",
  "More summer memories.": "Más recuerdos de verano.",
  "Click here ↗": "Haz clic aquí ↗",
  "Play": "Reproducir",
  "Pause": "Pausar",
  "Add photos": "Añadir fotos",
  "Selected photos stay in this preview until you reload.": "Las fotos seleccionadas quedan en esta vista previa hasta que recargues.",
  "Camp Chipinaw. Where it all began.": "Camp Chipinaw. Donde todo comenzó.",
  "Your photo goes here": "Tu foto va aquí",
  "Our first summer.": "Nuestro primer verano.",
  "Learning together.": "Aprendiendo juntos.",
  "Still finding our way.": "Seguimos encontrando nuestro camino.",
  "Our memories": "Nuestros recuerdos",
  "Start our photo story": "Iniciar nuestra historia en fotos",
  "USA, New York — how we met": "EE. UU., Nueva York — cómo nos conocimos",
  "Our photo memories": "Nuestros recuerdos en fotos",
  "Previous photo": "Foto anterior",
  "Next photo": "Foto siguiente",
  "Our first summer": "Nuestro primer verano",
  "Where our story began.": "Donde comenzó nuestra historia.",
  "Learning together": "Aprendiendo juntos",
  "A little practice, every day.": "Un poco de práctica, cada día.",
  "More adventures ahead": "Más aventuras por delante",
  "Still finding our way, together.": "Seguimos encontrando nuestro camino, juntos.",
  "Our photo is coming soon.": "Nuestra foto llegará pronto.",
  "We met at Camp Chipinaw, a Jewish summer camp in New York. We came from different worlds: John, a New Yorker struggling with Spanish, and Mateo, a Bolivian struggling with English. We each wanted to learn the other’s language. Neither of us knew that we were about to find the person who would help us find our way.": "Nos conocimos en Camp Chipinaw, un campamento de verano judío en Nueva York. Veníamos de mundos distintos: John, un neoyorquino que batallaba con el español, y Mateo, un boliviano que batallaba con el inglés. Cada uno quería aprender el idioma del otro. No sabíamos que estábamos a punto de encontrar a la persona que nos ayudaría a encontrar nuestro camino.",
  "Soon after we met, we started challenging each other every day. We practiced, made mistakes, and counted on each other to catch them. We learned to ask questions, accept corrections, and keep the conversation going, even when we couldn’t find the right words.": "Poco después de conocernos, empezamos a retarnos todos los días. Practicábamos, cometíamos errores y contábamos el uno con el otro para corregirlos. Aprendimos a hacer preguntas, aceptar correcciones y seguir conversando, incluso cuando no encontrábamos las palabras.",
  "When camp ended, we kept showing up for each other. We built a habit and a system around working together: phone calls, daily practice, and honest feedback. We still make time to speak, listen, and help each other improve every day.": "Cuando terminó el campamento, seguimos apoyándonos. Creamos un hábito y un sistema de trabajo juntos: llamadas, práctica diaria y comentarios sinceros. Seguimos haciendo tiempo para hablar, escuchar y ayudarnos a mejorar cada día.",
  "When we found each other, we were both lost in the language-learning process. We helped each other find our way. Now we want to help you find yours, drawing on everything we’ve learned together and the experience and expertise we bring in English and Spanish.": "Cuando nos encontramos, los dos estábamos perdidos en el proceso de aprender un idioma. Nos ayudamos a encontrar nuestro camino. Ahora queremos ayudarte a encontrar el tuyo, compartiendo todo lo que hemos aprendido juntos y nuestra experiencia y conocimientos de inglés y español.",
  "How we met": "Cómo nos conocimos",
  "Close our story": "Cerrar nuestra historia",
  "TWO LANGUAGES. ONE FRIENDSHIP.": "DOS IDIOMAS. UNA AMISTAD.",
  'Discover with us': 'Descubre con nosotros',
  'STORIES ALONG THE WAY': 'HISTORIAS EN EL CAMINO',
  '04 / DISCOVER WITH US': '04 / DESCUBRE CON NOSOTROS',
  'Unlock the world': 'Descubre el mundo',
  'with us.': 'con nosotros.',
  'Click a pin.': 'Haz clic en un pin.',
  'Let the adventure begin.': 'Que comience la aventura.',
  'New York · Visited': 'Nueva York · Visitado',
  'Visited · New York, USA': 'Visitado · Nueva York, EE. UU.',
  'Not visited yet': 'Aún por visitar',
  'UGC & brand content': 'UGC y contenido de marca',
  'Experiences and destinations': 'Experiencias y destinos',
  'Long-term partnerships': 'Colaboraciones a largo plazo',
  'Social media features': 'Menciones en redes sociales',
  'Photography': 'Fotografía',
  'Media packages': 'Paquetes de medios',
  'Instagram followers': 'Seguidores en Instagram',
  'TikTok followers': 'Seguidores en TikTok',
  'click me!': '¡haz clic!',
  "06 / LEARN WITH US": "06 / APRENDE CON NOSOTROS",
  "No one learns": "Nadie aprende",
  "alone.": "a solas.",
  "Coming soon · skool.com": "Próximamente · skool.com",
  "We’re committed to learning, then sharing what we learn. We’re building an English and Spanish community where we can practice, teach, and grow together.": "Nos comprometemos a aprender y compartir lo aprendido. Estamos creando una comunidad de inglés y español donde podamos practicar, enseñar y crecer juntos.",
  "Lost on your own? Maybe. With someone to practice with, you’ll always find your way.": "¿Perdido a solas? Tal vez. Con alguien con quien practicar, siempre encontrarás tu camino.",
  "Our learning modules are a work in progress. We’re putting them together, one lesson at a time. Nos vemos pronto.": "Nuestros módulos de aprendizaje están en construcción. Los estamos preparando, una lección a la vez. Nos vemos pronto.",

  "Socials": "Redes",
  "Learn with us": "Aprende con nosotros",
  "Your story": "Tu historia",
  "1,284 likes": "1.284 Me gusta",
  "View all 32 comments": "Ver los 32 comentarios",
  "All": "Todo",
  "Travel": "Viajes",
  "Music": "Música",
  "Live": "En vivo",
  "We got lost in Santiago 🇨🇱": "Nos perdimos en Santiago 🇨🇱",
  "Lost & Perdido · 24K views · 2 days ago": "Lost & Perdido · 24 mil vistas · hace 2 días",
  "This view was worth the wrong turn": "Esta vista valió el desvío",
  "One more stop in Mendoza 🍇": "Una parada más en Mendoza 🍇",
  "Subscriptions": "Suscripciones",
  "You": "Tú",

  'Following': 'Siguiendo',
  'For You': 'Para ti',
  'Share': 'Compartir',
  'Home': 'Inicio',
  'Friends': 'Amigos',
  'Inbox': 'Bandeja',
  'Profile': 'Perfil',
  'Wrong turn. Right view. 🏔️': 'Desvío con vistas. 🏔️',
  '♫ original sound · Lost & Perdido': '♫ sonido original · Lost & Perdido',
  "Notes from this stop": "Notas de esta parada",
  "Close city details": "Cerrar detalles de la ciudad",
  "About this place ↗": "Sobre este lugar ↗",
  "Our photo diary": "Nuestro diario de fotos",
  "We must be lost right now.": "Debemos estar perdidos ahora mismo.",
  "Photos will find their way here after we do.": "Las fotos llegarán aquí después de nosotros.",
  "A wine-growing city at the foot of the Andes.": "Una ciudad vitivinícola al pie de los Andes.",
  "The surrounding vineyards are especially known for Malbec.": "Los viñedos de sus alrededores son conocidos por el Malbec.",
  "Chile’s capital combines historic neighborhoods with mountain views.": "La capital de Chile combina barrios históricos con vistas a las montañas.",
  "Cerro San Cristóbal is part of the city’s Metropolitan Park.": "El cerro San Cristóbal forma parte del Parque Metropolitano.",
  "Known as Chile’s Garden City.": "Conocida como la Ciudad Jardín de Chile.",
  "Its Flower Clock and seaside promenade are local landmarks.": "El Reloj de Flores y su paseo costero son símbolos de la ciudad.",
  "La Paz is Bolivia’s seat of government.": "La Paz es la sede de gobierno de Bolivia.",
  "Cable cars connect neighborhoods across the city and El Alto.": "Los teleféricos conectan barrios de la ciudad y El Alto.",
  "Its historic center is a UNESCO World Heritage Site.": "Su centro histórico es Patrimonio Mundial de la UNESCO.",
  "The city is known for its white colonial buildings.": "La ciudad es conocida por sus edificios coloniales blancos.",
  "An Andean canyon southeast of Santiago.": "Un cajón andino al sureste de Santiago.",
  "San José de Maipo is its main gateway town.": "San José de Maipo es su principal localidad de acceso.",
  "Cerro Rico’s silver mines shaped the city’s history.": "Las minas de plata del Cerro Rico marcaron su historia.",
  "Its UNESCO-listed heritage includes the historic mint, Casa de la Moneda.": "Su patrimonio reconocido por la UNESCO incluye la Casa de la Moneda.",
  "Plaza 24 de Septiembre is the heart of the historic center.": "La Plaza 24 de Septiembre es el corazón del centro histórico.",
  "The Metropolitan Cathedral overlooks the main square.": "La Catedral Metropolitana se encuentra frente a la plaza principal.",
  "A gateway to the vast Salar de Uyuni salt flats.": "Una puerta de entrada al inmenso Salar de Uyuni.",
  "A train cemetery sits just outside the city.": "Un cementerio de trenes se encuentra a las afueras de la ciudad.",
  "A hillside town in Bolivia’s green Yungas region.": "Un pueblo entre las laderas verdes de los Yungas bolivianos.",
  "The Yungas form a transition between the Altiplano and the Amazon.": "Los Yungas forman una transición entre el Altiplano y la Amazonía.",
  "Cristo de la Concordia overlooks the city.": "El Cristo de la Concordia domina las vistas de la ciudad.",
  "Plaza 14 de Septiembre anchors its historic center.": "La Plaza 14 de Septiembre es el corazón de su centro histórico.",
  "A port city and gateway to Chilean Patagonia.": "Una ciudad portuaria y puerta de entrada a la Patagonia chilena.",
  "Nearby Lake Llanquihue and Osorno Volcano shape the region’s landscape.": "El cercano lago Llanquihue y el volcán Osorno marcan el paisaje regional.",
  "Sits on the shores of Lake Llanquihue.": "Se encuentra a orillas del lago Llanquihue.",
  "The lakeside Teatro del Lago is one of its cultural landmarks.": "El Teatro del Lago es uno de sus principales símbolos culturales.",
  "A lakeside city on Lake Llanquihue.": "Una ciudad a orillas del lago Llanquihue.",
  "Its heritage architecture reflects German immigration.": "Su arquitectura patrimonial refleja la inmigración alemana.",
  "An iconic volcano beside Lake Llanquihue.": "Un volcán emblemático junto al lago Llanquihue.",
  "Its slopes offer views toward the lake and surrounding mountains.": "Sus laderas ofrecen vistas al lago y a las montañas cercanas.",

  'Osorno Volcano': 'Volcán Osorno',
  'Miles traveled': 'Millas recorridas',
  'Cities visited': 'Ciudades visitadas',
  'Flights taken': 'Vuelos tomados',
  'Buses taken': 'Buses tomados',
  'Wrong turns': 'Vueltas equivocadas',
  'Empanadas eaten': 'Empanadas comidas',
  'Beds slept in': 'Camas dormidas',
  'Videos published': 'Videos publicados',
  'The journey, in numbers.': 'El viaje, en números.',
  'Every mile. Every detour. Every empanada.': 'Cada milla. Cada desvío. Cada empanada.',
  'LOST METER': 'NIVEL DE PERDIDOS',
  'A little off course.': 'Un poco fuera de rumbo.',
  'SIGNAL CONNECTED': 'SEÑAL CONECTADA',
  'THE ADVENTURE STARTS AT ZERO.': 'LA AVENTURA EMPIEZA EN CERO.',
  'Return to globe': 'Volver al globo',
  'Explore satellite travel stats': 'Explorar estadísticas del viaje',
  'Show globe': 'Ver globo',
  'Select a country to zoom in and reveal its cities. Select a city for notes from that stop.': 'Elige un país para acercarte y ver sus ciudades. Elige una ciudad para leer las notas de esa parada.',
  'On our route': 'En nuestra ruta',
  'For another adventure': 'Para otra aventura',
  'Start with Argentina, Chile or Bolivia on the globe, then pick a city to explore our route. This is where our trip photos and stories will land.': 'Empieza por Argentina, Chile o Bolivia en el globo y elige una ciudad para explorar nuestra ruta. Aquí llegarán las fotos e historias del viaje.',
  'Three countries. A world of stories ahead.': 'Tres países. Un mundo de historias por descubrir.',
  'OUR WORLD, ONE STOP AT A TIME': 'NUESTRO MUNDO, PARADA A PARADA',
  'Show whole world': 'Ver todo el mundo',
  'Click a flag to zoom in. Select another stop or return to the whole world.': 'Haz clic en una bandera para acercarte. Elige otra parada o vuelve al mapa mundial.',

  "POSTCARDS FROM THE ROAD": "POSTALES DEL CAMINO",
  "Pick a pin. Come along.": "Elige una parada. Acompáñanos.",
  "Tap a stop to explore our route. This is where our trip photos and stories will land.": "Toca una parada para explorar nuestra ruta. Aquí llegarán las fotos e historias del viaje.",
  "Photos to come": "Próximamente: fotos",
  "The trip is still ahead. Check back for photos, favorite finds, and stories from this stop.": "El viaje está por comenzar. Vuelve para ver fotos, descubrimientos e historias de esta parada.",
  "An illustrated route, with room for detours.": "Una ruta ilustrada, con espacio para desvíos.",
  "A little lost. A lot to discover.": "Un poco perdidos. Mucho por descubrir.",
  "South America": "Sudamérica",
  "Pacific Ocean": "Océano Pacífico",
  "Atlantic Ocean": "Océano Atlántico",

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
  '01 / THE ITINERARY': '01 / EL ITINERARIO',
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
  'Meet your hosts': 'Conoce a tus anfitriones',
  'Born and raised in New York, NY.': 'Nacido y criado en Nueva York, NY.',
  'Born and raised in La Paz, Bolivia.': 'Nacido y criado en La Paz, Bolivia.',
  'Languages spoken': 'Idiomas',
  'English (native), Spanish (fluent), Portuguese (no sabo).': 'Inglés (nativo), español (fluido), portugués (no sabo).',
  'Spanish (native), English (fluent), Portuguese (proficient).': 'Español (nativo), inglés (fluido), portugués (competente).',
  'Ethnicity': 'Origen étnico',
  'Dominican and Antiguan': 'Dominicano y antiguano',
  'Bolivian': 'Boliviano',
  'Same place.': 'El mismo lugar.',
  'Dos perspectivas.': 'Dos perspectivas.',
  'We’re two travel companions, one Latino-American English speaker who learned Spanish later in life, and one Bolivian born native Spanish speaker who learned English later in life, experiencing Latin America together. Sometimes we see things differently. Sometimes we get lost along the way. Usually, that’s where the good story starts.': 'Somos dos compañeros de viaje: una persona latinoamericana angloparlante que aprendió español más adelante en la vida y una persona boliviana, hablante nativa de español, que aprendió inglés más adelante. Estamos viviendo Latinoamérica juntos. A veces vemos las cosas de manera distinta. A veces nos perdemos en el camino. Y normalmente ahí empieza la buena historia.',
  'English and Spanish live side by side here: in conversations with locals, over food, on bus rides and in the moments we couldn’t have planned.': 'Aquí el inglés y el español conviven: en conversaciones con gente local, alrededor de la comida, durante viajes en bus y en esos momentos que nunca podríamos haber planeado.',
  'You don’t need to speak both languages.': 'No necesitas hablar los dos idiomas.',
  'You just need a little curiosity.': 'Solo necesitas un poco de curiosidad.',
  '03 / FOLLOW US': '03 / SÍGUENOS',
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
  '05 / JOIN THE FAMILY': '05 / ÚNETE A LA FAMILIA',
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
  "Close city details": "Cerrar detalles de la ciudad",
  "Notes from this stop": "Notas de esta parada",
  'Osorno Volcano': 'Volcán Osorno',
  'Globe showing our route through Argentina, Chile and Bolivia': 'Globo con nuestra ruta por Argentina, Chile y Bolivia',
  'Globe centered on South America, with Argentina, Chile and Bolivia outlined and filled with their flags.': 'Globo centrado en Sudamérica, con Argentina, Chile y Bolivia delineados y rellenos con sus banderas.',
  'Explore Argentina': 'Explorar Argentina',
  'Explore Chile': 'Explorar Chile',
  'Explore Bolivia': 'Explorar Bolivia',
  'Illustrated world trip map': 'Mapa mundial ilustrado del viaje',
  'Lost and Perdido home': 'Inicio de Lost & Perdido',
  'Main navigation': 'Navegación principal',
  'Language': 'Idioma',
  'Dominican Republic flag': 'Bandera de la República Dominicana',
  'Antigua and Barbuda flag': 'Bandera de Antigua y Barbuda',
  'Statue of Liberty': 'Estatua de la Libertad',
  'Bolivia flag': 'Bandera de Bolivia',
  'John E. riding a horse on a beach': 'John E. montando a caballo en una playa',
  'Mateo L. standing in front of the mountains': 'Mateo L. frente a las montañas',
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

// Globe artwork and pins share the same orthographic projection.
const worldMap = document.querySelector('.world-map');
const worldArt = document.querySelector('.world-map-art');
const mapPins = [...document.querySelectorAll('.world-pin')];
const countryPins = mapPins.filter(pin => pin.classList.contains('country-pin'));
const cityPins = mapPins.filter(pin => pin.classList.contains('city-pin'));
const mapReset = document.querySelector('.map-reset');
let mapView = { scale: 1, x: 0, y: 0 };
let mapAnimation;
function drawWorldMap() {
  const { width, height } = worldMap.getBoundingClientRect();
  worldArt.style.transform = `translate(${mapView.x * width}px, ${mapView.y * height}px) scale(${mapView.scale})`;
  const questions = worldMap.querySelector('.country-questions');
  questions.style.transform = worldArt.style.transform;
  // CSS defines 1 cm as 96 / 2.54 pixels. Show a mark only when the
  // country's largest visible dimension reaches that size on this display.
  questions.querySelectorAll('[data-country-size]').forEach(mark => {
    const displayedSize = Number(mark.dataset.countrySize) / 800 * width * mapView.scale;
    mark.style.display = displayedSize >= 96 / 2.54 ? '' : 'none';
  });
  const lines = [];
  const cityLabels = [];
  mapPins.forEach((pin) => {
    if (pin.hidden || pin.style.visibility === 'hidden') return;
    const x = (Number(pin.dataset.x) / 100 * mapView.scale + mapView.x) * width;
    const y = (Number(pin.dataset.y) / 100 * mapView.scale + mapView.y) * height;
    if (pin.classList.contains('city-pin')) {
      pin.style.left = `${x}px`;
      pin.style.top = `${y}px`;
      const badge = pin.querySelector('.world-pin-badge');
      const w = badge.offsetWidth || 100;
      let lx = x + 18;
      if (lx + w > width - 6) lx = x - w - 18;
      let ly = y - 12;
      for (let n=0;n<20;n++) {
        if (!cityLabels.some(p => lx < p.x+p.w+6 && lx+w+6 > p.x && Math.abs(ly-p.y)<25)) break;
        ly += 25;
      }
      cityLabels.push({x:lx,y:ly,w});
      pin.style.setProperty('--city-label-x', `${lx-x+12}px`);
      pin.style.setProperty('--city-label-y', `${ly-y+12}px`);
      return;
    }
    // Keep country names and city labels inside narrow mobile viewports.
    const dx = Number(pin.dataset.dx) * Math.min(1, width / 450);
    const dy = Number(pin.dataset.dy);
    const labelWidth = pin.querySelector('.world-pin-badge').offsetWidth;
    const inset = labelWidth / 2 + 8;
    const column = pin.dataset.labelSide;
    const preferredX = column ? (Number(column) < 0 ? inset : width - inset) : x + dx;
    const preferredY = pin.dataset.labelRow ? Number(pin.dataset.labelRow) * height : y + dy;
    const labelX = Math.max(inset, Math.min(width - inset, preferredX));
    const labelY = Math.max(20, Math.min(height - 20, preferredY));
    pin.style.left = `${x}px`;
    pin.style.top = `${y}px`;
    pin.style.setProperty('--label-x', `${labelX - x}px`);
    pin.style.setProperty('--label-y', `${labelY - y}px`);
    lines.push(`<line x1="${x}" y1="${y}" x2="${labelX}" y2="${labelY}" stroke="#ffe6a1" stroke-width="1"/>`);
  });
  document.querySelector('.map-connectors').innerHTML = lines.join('');
}
function animateMap(target) {
  cancelAnimationFrame(mapAnimation);
  const from = { ...mapView };
  const start = performance.now();
  const duration = window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 0 : 850;
  function frame(now) {
    const progress = duration ? Math.min(1, (now - start) / duration) : 1;
    const eased = 1 - Math.pow(1 - progress, 3);
    for (const key of ['scale', 'x', 'y']) mapView[key] = from[key] + (target[key] - from[key]) * eased;
    drawWorldMap();
    if (progress < 1) mapAnimation = requestAnimationFrame(frame);
  }
  mapAnimation = requestAnimationFrame(frame);
}
countryPins.forEach(pin => pin.addEventListener('click', () => {
  if (pin.dataset.country === 'usa') { openMeetingStory(pin); return; }
  const stops = cityPins.filter(city => city.dataset.country === pin.dataset.country);
  countryPins.forEach(country => { country.hidden = true; });
  cityPins.forEach(city => { city.hidden = !stops.includes(city); });
  const xs = stops.map(city => Number(city.dataset.x)/100);
  const ys = stops.map(city => Number(city.dataset.y)/100);
  const x = (Math.min(...xs)+Math.max(...xs))/2;
  const y = (Math.min(...ys)+Math.max(...ys))/2;
  const scale = Math.min(14, .62 / Math.max(Math.max(...xs)-Math.min(...xs), Math.max(...ys)-Math.min(...ys), .045));
  worldArt.src = `assets/map-${pin.dataset.country}.svg`;
  worldMap.classList.add('country-focused');
  animateMap({ scale, x: .46 - x * scale, y: .44 - y * scale });
  stops[0].focus({ preventScroll: true });
}));
const cityPopup = document.getElementById('city-popup');
let activeCityPin;
function renderCityGallery(stop) {
  const gallery = document.querySelector(`[data-gallery="${stop}"]`);
  const photos = cityPhotos[stop] || [];
  gallery.replaceChildren();
  gallery.hidden = photos.length === 0;
  gallery.nextElementSibling.hidden = photos.length > 0;
  photos.forEach(photo => {
    const figure = document.createElement('figure');
    const image = document.createElement('img');
    image.src = photo.src;
    image.alt = currentLanguage === 'es' ? (photo.altEs || photo.alt) : photo.alt;
    image.loading = 'lazy';
    image.decoding = 'async';
    figure.append(image);
    const caption = currentLanguage === 'es' ? (photo.captionEs || photo.caption) : photo.caption;
    if (caption) {
      const text = document.createElement('figcaption');
      text.textContent = caption;
      figure.append(text);
    }
    gallery.append(figure);
  });
  gallery.tabIndex = photos.length ? 0 : -1;
}
cityPins.forEach(pin => pin.addEventListener('click', () => {
  activeCityPin = pin;
  cityPins.forEach(other => other.setAttribute('aria-pressed', String(other === pin)));
  document.querySelectorAll('.map-stop').forEach(panel => {
    panel.hidden = panel.id !== `stop-${pin.dataset.stop}`;
  });
  renderCityGallery(pin.dataset.stop);
  loadCityWeather(pin.dataset.stop);
  cityPopup.setAttribute('aria-labelledby', `city-title-${pin.dataset.stop}`);
  cityPopup.showModal();
  cityPopup.scrollTop = 0;
}));
cityPopup.querySelector('.city-popup-close').addEventListener('click', () => cityPopup.close());
cityPopup.addEventListener('click', event => {
  const box = cityPopup.getBoundingClientRect();
  if (event.target === cityPopup && (event.clientX < box.left || event.clientX > box.right || event.clientY < box.top || event.clientY > box.bottom)) cityPopup.close();
});
cityPopup.addEventListener('close', () => {
  cityPins.forEach(pin => pin.setAttribute('aria-pressed', 'false'));
  if (activeCityPin && !activeCityPin.hidden) activeCityPin.focus({ preventScroll: true });
});
mapReset.addEventListener('click', () => {
  worldArt.src = 'assets/travel-globe.svg';
  worldMap.classList.remove('country-focused');
  if (cityPopup.open) cityPopup.close();
  countryPins.forEach(pin => { pin.hidden = false; });
  cityPins.forEach(pin => { pin.hidden = true; pin.setAttribute('aria-pressed', 'false'); });
  animateMap({ scale: 1, x: 0, y: 0 });
  document.querySelectorAll('.map-stop').forEach(panel => { panel.hidden = true; });
  document.getElementById('map-welcome').hidden = false;
});
new ResizeObserver(drawWorldMap).observe(worldMap);
drawWorldMap();

// Continuous depth and tangent-based steering keep both loops seamless.
const socialsSection = document.querySelector('.watch-section');
const socialsStage = document.querySelector('.socials-showcase');
const orbitPhones = [...document.querySelectorAll('.social-card')];
const spacePlane = document.querySelector('.space-plane');
const socialsMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
let socialsVisible = false;
let socialsFrame;
let socialsElapsed = 0;
let socialsLastTime;
let socialsSize = { width: 0, height: 0, stage: 0 };
function paintSocialsMotion() {
  const phase = socialsElapsed / 24000 * Math.PI * 2;
  const radius = Math.max(0, (socialsSize.stage - (orbitPhones[0]?.offsetWidth || 140)) / 2 - 12);
  orbitPhones.forEach((card, index) => {
    const angle = phase + (index - 1) * Math.PI * 2 / 3;
    const depth = Math.cos(angle);
    const scale = .83 + depth * .17;
    card.style.transform = `translate(-50%, -50%) translate(${Math.sin(angle) * radius}px, ${depth * 30}px) scale(${scale})`;
    card.style.zIndex = String(Math.round((depth + 1) * 100));
    card.style.setProperty('--phone-tilt', `${-Math.sin(angle) * 15}deg`);
    card.style.setProperty('--phone-roll', `${Math.sin(angle) * 2}deg`);
  });
  // A broad figure eight traverses the full star field behind the phones.
  const flight = socialsElapsed / 30000 * Math.PI * 2 - Math.PI / 2;
  // Leave room for the larger aircraft at every heading.
  const planeMargin = spacePlane.clientWidth * .61 + 12;
  const rx = Math.max(0, socialsSize.width / 2 - planeMargin);
  const ry = Math.max(0, socialsSize.height / 2 - planeMargin);
  const x = socialsSize.width / 2 + Math.sin(flight) * rx;
  const y = socialsSize.height / 2 + Math.sin(flight * 2) * ry;
  const heading = Math.atan2(2 * ry * Math.cos(flight * 2), rx * Math.cos(flight)) * 180 / Math.PI;
  spacePlane.style.transform = `translate(${x}px, ${y}px) translate(-50%, -50%) rotate(${heading}deg)`;
}
function tickSocials(now) {
  if (socialsLastTime !== undefined) socialsElapsed += Math.min(now - socialsLastTime, 64);
  socialsLastTime = now;
  paintSocialsMotion();
  socialsFrame = requestAnimationFrame(tickSocials);
}
function syncSocialsMotion() {
  cancelAnimationFrame(socialsFrame);
  socialsLastTime = undefined;
  if (socialsVisible && !document.hidden && !socialsMotion.matches) socialsFrame = requestAnimationFrame(tickSocials);
  else paintSocialsMotion();
}
new ResizeObserver(() => {
  socialsSize = { width: socialsSection.clientWidth, height: socialsSection.clientHeight, stage: socialsStage.clientWidth };
  paintSocialsMotion();
}).observe(socialsSection);
new IntersectionObserver(([entry]) => {
  socialsVisible = entry.isIntersecting;
  syncSocialsMotion();
}).observe(socialsSection);
socialsMotion.addEventListener('change', syncSocialsMotion);
document.addEventListener('visibilitychange', syncSocialsMotion);

// Seven-segment shot-clock numerals, drawn locally so they need no font download.
const clockSegments = ['0,1 3,0 15,0 18,1 15,4 3,4', '19,2 20,5 20,17 18,20 16,17 16,5', '18,22 20,25 20,37 19,40 16,37 16,25', '0,41 3,38 15,38 18,41 15,42 3,42', '0,22 3,25 3,37 0,40 -1,37 -1,25', '0,2 3,5 3,17 0,20 -1,17 -1,5', '1,21 4,19 14,19 17,21 14,23 4,23'];
const clockDigits = ['1111110', '0110000', '1101101', '1111001', '0110011', '1011011', '1011111', '1110000', '1111111', '1111011'];
function renderShotClock(element, value) {
  element.classList.add('shot-clock');
  element.setAttribute('role', 'img');
  element.setAttribute('aria-label', String(value));
  element.innerHTML = String(value).split('').map(digit => `<svg viewBox="-2 -1 24 44" aria-hidden="true">${clockSegments.map((points, i) => `<polygon points="${points}" fill="currentColor" opacity="${clockDigits[Number(digit)][i] === '1' ? 1 : .07}"/>`).join('')}</svg>`).join('');
}
document.querySelectorAll('[data-digits]').forEach(element => renderShotClock(element, element.dataset.digits));
const satelliteButton = document.querySelector('.satellite');
const satelliteDialog = document.getElementById('satellite-stats');
let satelliteZoomAnimations = [];
satelliteButton.addEventListener('click', () => {
  // Freeze the actual spacecraft so the camera starts precisely at its screen.
  satelliteButton.style.animationPlayState = 'paused';
  const source = satelliteButton.getBoundingClientRect();
  satelliteDialog.showModal();
  const panel = satelliteDialog.querySelector('.satellite-interior');
  let craft = satelliteDialog.querySelector('.satellite-closeup');
  if (!craft) {
    craft = satelliteButton.querySelector('svg').cloneNode(true);
    craft.classList.add('satellite-closeup');
    craft.setAttribute('preserveAspectRatio', 'none');
    satelliteDialog.prepend(craft);
  }
  const destination = panel.getBoundingClientRect();
  // The enlarged hull uses the same SVG as the floating satellite. Its small
  // 22 × 22 screen becomes the entire readout, leaving the wings off camera.
  const craftWidth = destination.width * 120 / 22;
  const craftHeight = destination.height * 90 / 22;
  Object.assign(craft.style, {
    width: `${craftWidth}px`, height: `${craftHeight}px`,
    left: `${destination.left - destination.width * 49 / 22}px`,
    top: `${destination.top - destination.height * 38 / 22}px`
  });
  const dx = source.left + source.width / 2 - (destination.left + destination.width / 2);
  const dy = source.top + source.height * 49 / 90 - (destination.top + destination.height / 2);
  const start = `translate(${dx}px, ${dy}px) scale(${source.width * 22 / 120 / destination.width}, ${source.height * 22 / 90 / destination.height})`;
  craft.style.transformOrigin = '50% 54.444444%';
  if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    satelliteZoomAnimations = [craft, panel].map(element => element.animate([
      { transform: start }, { transform: 'translate(0, 0) scale(1)' }
    ], { duration: 1200, easing: 'cubic-bezier(.65, 0, .2, 1)' }));
  }
});
satelliteDialog.addEventListener('close', () => { satelliteZoomAnimations.forEach(animation => animation.cancel()); satelliteButton.style.animationPlayState = ''; satelliteButton.focus({ preventScroll: true }); });
// Edit these coordinates when our location changes; never use the visitor's location.
const gpsLocation = { latitude: 40.7128, longitude: -74.0060, label: 'NEW YORK · USA' };
const gpsButton = document.querySelector('.gps-lost');
const gpsDialog = document.getElementById('gps-tracker');
const gpsDevice = gpsDialog.querySelector('.gps-expanded-device');
const gpsTravelers = gpsDialog.querySelector('.gps-travelers');
gpsTravelers.style.left = `${(gpsLocation.longitude + 180) / 360 * 100}%`;
gpsTravelers.style.top = `${(90 - gpsLocation.latitude) / 180 * 100}%`;
gpsDialog.querySelector('.gps-location-name').textContent = gpsLocation.label;
let gpsZoomAnimation;
gpsButton.addEventListener('click', () => {
  const source = document.querySelector('.location-gps .gps-screen').getBoundingClientRect();
  gpsDialog.showModal();
  gpsDialog.scrollTop = 0;
  const screen = gpsDialog.querySelector('.gps-expanded-screen').getBoundingClientRect();
  const device = gpsDevice.getBoundingClientRect();
  // Anchor both the housing and the map to the physical GPS screen while zooming.
  gpsDevice.style.transformOrigin = `${screen.left + screen.width / 2 - device.left}px ${screen.top + screen.height / 2 - device.top}px`;
  const dx = source.left + source.width / 2 - screen.left - screen.width / 2;
  const dy = source.top + source.height / 2 - screen.top - screen.height / 2;
  gpsZoomAnimation?.cancel();
  if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    gpsZoomAnimation = gpsDevice.animate([
      { transform: `translate(${dx}px, ${dy}px) scale(${source.width / screen.width}, ${source.height / screen.height})` },
      { transform: 'translate(0, 0) scale(1)' }
    ], { duration: 1200, easing: 'cubic-bezier(.65, 0, .2, 1)' });
  }
});
gpsDialog.addEventListener('click', event => {
  if (event.target === gpsDialog) gpsDialog.close();
});
gpsDialog.addEventListener('close', () => {
  gpsZoomAnimation?.cancel();
  gpsButton.focus({ preventScroll: true });
});

// One deterministic reading per local calendar day, stable across reloads.
function dailyLostValue(date) {
  const day = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
  let hash = 2166136261;
  for (const character of day) hash = Math.imul(hash ^ character.charCodeAt(0), 16777619);
  return (hash >>> 0) % 101;
}
function lostDescription(value) {
  if (value < 20) return 'we have a plan';
  if (value < 40) return 'mas o menos';
  if (value < 60) return 'we are figuring it out';
  if (value < 80) return 'perdido';
  return 'lost and perdido';
}
let lostMeterTimeout;
function updateLostMeter() {
  clearTimeout(lostMeterTimeout);
  const now = new Date();
  const value = dailyLostValue(now);
  renderShotClock(document.getElementById('lost-percentage'), value);
  const gauge = document.getElementById('lost-gauge');
  gauge.value = value;
  gauge.textContent = `${value}%`;
  const description = document.getElementById('lost-description');
  description.textContent = lostDescription(value);
  originalText.set(description.firstChild, description.textContent);
  const midnight = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1);
  lostMeterTimeout = setTimeout(updateLostMeter, midnight - now + 50);
}
updateLostMeter();
document.addEventListener('visibilitychange', () => { if (!document.hidden) updateLostMeter(); });

const meetingLink = document.querySelector('.how-we-met-link');
const meetingStory = document.getElementById('how-we-met');
let meetingNavigate = false;
let meetingOpener = meetingLink;
function openMeetingStory(opener) {
  meetingOpener = opener;
  meetingNavigate = false;
  meetingStory.showModal();
  meetingStory.scrollTop = 0;
  startMeetingMusic();
}
// Load the player in the open dialog; failed players can be rebuilt on retry.
let meetingMusicPlayer;
let meetingMusicReady = false;
let meetingMusicWanted = false;
let meetingMusicFailure = '';
let meetingMusicTimeout;
const musicAction = document.querySelector('.meeting-music-action');
const musicNotice = document.querySelector('.meeting-music-notice');
function setMusicNotice(message) { musicNotice.textContent = message; }
function startMeetingMusic() {
  meetingMusicWanted = true;
  if (location.protocol === 'file:') {
    setMusicNotice('Music needs the website preview: open this page with VS Code Live Server, then try again.');
    musicAction.hidden = true;
    return;
  }
  if (meetingMusicFailure) {
    meetingMusicReady = false;
    meetingMusicPlayer?.destroy();
    meetingMusicPlayer = undefined;
    meetingMusicFailure = '';
  }
  prepareMeetingMusic();
  musicAction.hidden = false;
  clearTimeout(meetingMusicTimeout);
  meetingMusicTimeout = setTimeout(() => {
    if (!meetingStory.open || !meetingMusicWanted) return;
    musicAction.hidden = false;
    setMusicNotice(meetingMusicReady ? 'Sound has not started. Tap Play on the YouTube player below.' : 'YouTube has not loaded. Check your connection or content blocker, or use Listen on YouTube below.');
  }, 7000);
  if (meetingMusicReady) {
    meetingMusicPlayer.unMute();
    meetingMusicPlayer.setVolume(55);
    meetingMusicPlayer.playVideo();
    setMusicNotice('Starting music…');
  } else { setMusicNotice('Loading music…'); }
}
function prepareMeetingMusic() {
  if (!meetingStory.open || !meetingMusicWanted || meetingMusicPlayer || !window.YT?.Player) return;
  if (location.protocol === 'file:') return;
  const holder = document.createElement('iframe'); holder.id = 'meeting-youtube-player';
  holder.title = 'mi buena suerte. — feel trip.';
  holder.allow = 'autoplay; encrypted-media; picture-in-picture';
  holder.referrerPolicy = 'strict-origin-when-cross-origin';
  holder.src = 'https://www.youtube.com/embed/DckpfFeSfyc?enablejsapi=1&playsinline=1&autoplay=1&rel=0&origin=' + encodeURIComponent(location.origin);
  document.getElementById('meeting-music').replaceChildren(holder);
  meetingMusicPlayer = new YT.Player(holder, {
    host: 'https://www.youtube.com',
    width: 360, height: 203, videoId: 'DckpfFeSfyc',
    playerVars: { autoplay: 1, playsinline: 1, rel: 0, ...(location.protocol.startsWith('http') ? { origin: location.origin } : {}) },
    events: {
      onReady: event => {
        meetingMusicReady = true;
        event.target.getIframe().setAttribute('allow', 'autoplay; encrypted-media; picture-in-picture');
        if (meetingMusicWanted && meetingStory.open) startMeetingMusic();
      },
      onStateChange: event => {
        if (event.data === 1) {
          if (!meetingStory.open || !meetingMusicWanted) { event.target.pauseVideo(); return; }
          clearTimeout(meetingMusicTimeout);
          musicAction.hidden = true; setMusicNotice('');
        }
      },
      onAutoplayBlocked: () => {
        if (!meetingStory.open) return;
        clearTimeout(meetingMusicTimeout);
        musicAction.hidden = false;
        setMusicNotice('Tap Play music to start the song.');
      },
      onError: event => {
        clearTimeout(meetingMusicTimeout);
        meetingMusicFailure = event.data === 153
          ? 'YouTube rejected this preview (153). Open the site with Live Server or on its published address.'
          : `YouTube could not play the song (error ${event.data}). Tap Play music to retry, or use Listen on YouTube below.`;
        meetingMusicReady = false;
        musicAction.hidden = false;
        setMusicNotice(meetingMusicFailure);
      }
    }
  });
}
musicAction.addEventListener('click', startMeetingMusic);
window.onYouTubeIframeAPIReady = prepareMeetingMusic;
if (window.YT?.Player) prepareMeetingMusic();
else {
  const api = document.createElement('script'); api.src = 'https://www.youtube.com/iframe_api'; api.async = true;
  api.onerror = () => { meetingMusicFailure = 'YouTube is blocked or unavailable. Use Listen on YouTube below.'; musicAction.hidden = true; setMusicNotice(meetingMusicFailure); };
  document.head.append(api);
}
meetingLink.addEventListener('click', () => openMeetingStory(meetingLink));
meetingStory.addEventListener('click', event => {
  if (event.target !== meetingStory) return;
  const rect = meetingStory.getBoundingClientRect();
  if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) meetingStory.close();
});
meetingStory.addEventListener('close', () => {
  meetingMusicWanted = false;
  clearTimeout(meetingMusicTimeout);
  if (meetingMusicReady) meetingMusicPlayer.pauseVideo();
  if (!meetingNavigate) meetingOpener.focus({ preventScroll: true });
});
meetingStory.querySelector('.meeting-learn').addEventListener('click', () => { meetingNavigate = true; meetingStory.close(); });

// Paper album: fold into a plane → take off → next plane arrives → unfold → 3-second hold.
const memoryAlbum = document.querySelector('.meeting-album');
const paperStage = memoryAlbum.querySelector('.paper-stage');
const paperCard = memoryAlbum.querySelector('.paper-card-wrap');
const paperFigure = paperCard.querySelector('.paper-card');
let foldingPaper = null;
const memoryImage = memoryAlbum.querySelector('.memory-image');
const memoryCaption = memoryAlbum.querySelector('.memory-caption');
const memoryLaunch = memoryAlbum.querySelector('.memory-launch');
const memoryPlay = memoryAlbum.querySelector('.memory-play');
const albumMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
const campMemory = { src: 'assets/camp-chipinaw.jpg', caption: 'Camp Chipinaw. Where it all began.', alt: 'Camp Chipinaw and its wooded lakeshore' };
// Permanent album photos, in display order after the opening camp photo.
const savedMemories = [
  {
    "src": "assets/D87CB6EE-A606-434C-B191-C475EC1F3969_1_105_c.jpeg",
    "caption": "A summer to remember.",
    "alt": "John and Mateo sitting on a car beneath a cloudy sky"
  },
  {
    "src": "assets/2A6FD356-B01C-4972-BC30-FDA74F58107A_1_201_a.jpeg",
    "caption": "Friends from camp.",
    "alt": "John and Mateo with a friend beside a school bus at Chipinaw"
  },
  {
    "src": "assets/4D54E296-E8F1-4E7F-9DED-13E406162A0A_1_105_c.jpeg",
    "caption": "Along for the ride.",
    "alt": "John and Mateo wearing sunglasses on a bus"
  },
  {
    "src": "assets/F557E415-A007-4845-95BF-87EAEF1DC592.jpeg",
    "caption": "Camp nights.",
    "alt": "John and Mateo wearing Chipinaw bucket hats at camp"
  },
  {
    "src": "assets/4ABC8EFE-33F6-4674-A40A-26C3844D70F1.jpeg",
    "caption": "Our first chapter.",
    "alt": "John and Mateo together outside in white shirts"
  },
  {
    "src": "assets/8D206D47-FDB5-4350-A402-10051D3B6033_1_105_c.jpeg",
    "caption": "On the road together.",
    "alt": "John and Mateo taking a selfie on a bus"
  },
  {
    "src": "assets/EC9924B8-672A-46FD-9E09-8DB541DFB97F.jpeg",
    "caption": "Showing up together.",
    "alt": "John and Mateo posing for a gym mirror photo"
  },
  {
    "src": "assets/EF9AF2F0-F921-4A7E-A9BD-80163E380A82_1_105_c.jpeg",
    "caption": "A night in New York.",
    "alt": "John and Mateo together on a city sidewalk at night"
  },
  {
    "src": "assets/C1DEEB30-69E8-4744-AEDD-044695368520_1_105_c.jpeg",
    "caption": "Back where it began.",
    "alt": "John and Mateo outside the Chipinaw building beside a yellow bus"
  },
  {
    "src": "assets/2EA6D4BC-C72D-4AC1-BC61-01DF255EEA1E_1_105_c.jpeg",
    "caption": "Two friends. One team.",
    "alt": "John and Mateo wearing football jerseys on a patio"
  },
  {
    "src": "assets/05DDC0FE-9F90-48FB-AB59-7E927331B0D5_1_105_c.jpeg",
    "caption": "Camp memories.",
    "alt": "John and Mateo posing beside a white fence and school bus at Chipinaw"
  },
  {
    "src": "assets/0B82DD12-3C58-43C5-A4EC-3F8658E93327_1_105_c.jpeg",
    "caption": "Exploring together.",
    "alt": "John and Mateo exploring a New York street beneath American flags"
  },
  {
    "src": "assets/CEF4F7A2-8BED-44F7-A9A2-0A6336BB2458_1_105_c.jpeg",
    "caption": "More summer memories.",
    "alt": "John and Mateo posing on a car in a grassy field"
  }
];
const memories = [campMemory, ...savedMemories];
let memoryIndex = 0;
let memoryPlaying = false;
let memoryBusy = false;
let memoryTimer;
let memoryGeneration = 0;
const paperAnimations = new Set();
function albumText(text) { return currentLanguage === 'es' ? (spanish[text] || text) : text; }
function memoryButtonLabel() { memoryPlay.textContent = albumText(memoryPlaying ? 'Pause' : 'Play'); }
function renderMemory() {
  const photo = memories[memoryIndex];
  memoryImage.hidden = !!photo.placeholder;
  if (photo.src) { memoryImage.src = photo.src; memoryImage.alt = photo.alt; }
  memoryLaunch.classList.toggle('is-placeholder', !!photo.placeholder);
  memoryLaunch.dataset.placeholder = albumText('Your photo goes here');
  memoryCaption.textContent = albumText(photo.caption);
  memoryAlbum.querySelector('.memory-counter').textContent = `${memoryIndex + 1} / ${memories.length}`;
  memoryAlbum.querySelector('.memory-click').hidden = memoryPlaying || memoryIndex !== 0;
  memoryButtonLabel();
  const nextPhoto = new Image();
  nextPhoto.src = memories[(memoryIndex + 1) % memories.length].src;
}
function resetPaper() {
  paperAnimations.forEach(animation => animation.cancel());
  paperAnimations.clear();
  paperCard.style.opacity = '1'; paperCard.style.visibility = 'visible';
  if (foldingPaper) { foldingPaper.remove(); foldingPaper = null; }
  paperFigure.style.visibility = '';
  paperStage.classList.remove('is-folding', 'is-flying');
}
function stopMemory() {
  memoryPlaying = false; memoryGeneration++; memoryBusy = false;
  clearTimeout(memoryTimer); resetPaper(); renderMemory();
}
async function paperAnimate(element, frames, duration, generation, easing = 'ease-in-out') {
  const animation = element.animate(frames, { duration, easing, fill: 'forwards' });
  paperAnimations.add(animation);
  try { await animation.finished; } catch { return false; }
  return generation === memoryGeneration;
}
function scheduleMemory() {
  clearTimeout(memoryTimer);
  if (memoryPlaying && meetingStory.open && !document.hidden) memoryTimer = setTimeout(() => transitionMemory(1), 3000);
}
// One paper surface throughout: eight photo-textured facets become the wings.
function makeFoldingPaper(photo) {
  const ns = 'http://www.w3.org/2000/svg';
  const width = paperCard.offsetWidth, height = paperCard.offsetHeight;
  const svg = document.createElementNS(ns, 'svg');
  svg.setAttribute('viewBox', `0 0 ${width} ${height}`);
  svg.setAttribute('aria-hidden', 'true'); svg.classList.add('folding-paper');
  const nodes = [[0,0],[width/2,0],[width,0],[0,height/2],[width/2,height/2],[width,height/2],[0,height],[width/2,height],[width,height]];
  const faces = [[0,1,4],[0,4,3],[1,2,5],[1,5,4],[3,4,7],[3,7,6],[4,5,8],[4,8,7]];
  const defs = document.createElementNS(ns, 'defs'); svg.append(defs);
  const facets = faces.map((ids, index) => {
    const clip = document.createElementNS(ns, 'clipPath'); clip.id = `memory-facet-${index}`;
    const polygon = document.createElementNS(ns, 'polygon'); polygon.setAttribute('points', ids.map(i=>nodes[i].join(',')).join(' ')); clip.append(polygon); defs.append(clip);
    const group = document.createElementNS(ns, 'g');
    const surface = document.createElementNS(ns, 'g'); surface.setAttribute('clip-path', `url(#${clip.id})`);
    const paper = document.createElementNS(ns, 'rect');
    Object.entries({width,height,fill:'#fffdf6'}).forEach(([key,value])=>paper.setAttribute(key,value)); surface.append(paper);
    const image = document.createElementNS(ns, 'image');
    Object.entries({href:photo.src,x:12,y:12,width:width-24,height:width-24,preserveAspectRatio:'xMidYMid meet'}).forEach(([key,value])=>image.setAttribute(key,value)); surface.append(image);
    const caption = document.createElementNS(ns, 'text');
    Object.entries({x:width/2,y:width+24,'text-anchor':'middle',fill:'#655d51','font-size':13,'font-family':'Georgia, serif'}).forEach(([key,value])=>caption.setAttribute(key,value)); caption.textContent = albumText(photo.caption); surface.append(caption);
    const shade = document.createElementNS(ns, 'rect');
    Object.entries({width,height,fill:['#ffffff','#ffffff','#b5b5b5','#b5b5b5','#b5b5b5','#dedede','#ffffff','#ffffff'][index],opacity:0}).forEach(([key,value])=>shade.setAttribute(key,value)); surface.append(shade);
    group.append(surface); svg.append(group); return {ids,group,shade};
  });
  paperCard.append(svg); paperFigure.style.visibility = 'hidden'; foldingPaper = svg;
  // Reference silhouette: two white triangular wings, gray center, small
  // underside. Rotate its up-right nose to face along the flight path.
  const reference = { a:[392,203], b:[493,250], n:[750,60], d:[547,275], c:[526,345], e:[675,333] };
  const angle = 42 * Math.PI / 180;
  const target = ['a','b','n','b','n','d','c','d','e'].map(key => {
    const [x,y] = reference[key], dx=x-571, dy=y-203;
    return [width*.5+(dx*Math.cos(angle)-dy*Math.sin(angle))*width/490,
      height*.5+(dx*Math.sin(angle)+dy*Math.cos(angle))*width/490];
  });
  // Each pose represents a separate hand fold, with a brief crease press.
  const corners = nodes.map(p=>[...p]);
  corners[0]=[width*.43,height*.20]; corners[2]=[width*.57,height*.20];
  const center = corners.map(p=>[...p]);
  [0,3,6].forEach(i=>{ center[i]=[width-center[i][0],center[i][1]]; });
  const firstWing = center.map(p=>[...p]);
  [0,1,3,4,6,7].forEach(i=>{ firstWing[i]=[...target[i]]; });
  return { svg, width, height, nodes, target, facets, poses:[nodes,corners,center,firstWing,target] };
}
function paintPaperFold(mesh, amount) {
  const step = Math.min(3, Math.floor(amount * 4));
  const progress = amount === 1 ? 1 : amount * 4 - step;
  // Fast movement followed by a hold reads as folding and pressing a crease.
  const move = Math.min(1, progress / .72);
  const ease = move * move * (3 - 2 * move);
  const vertices = mesh.poses[step].map((point,index)=>point.map((v,axis)=>v+(mesh.poses[step+1][index][axis]-v)*ease));
  mesh.facets.forEach(({ids,group,shade})=>{
    const [p,q,r] = ids.map(i=>mesh.nodes[i]); const [u,v,w] = ids.map(i=>vertices[i]);
    const det=(q[0]-p[0])*(r[1]-p[1])-(r[0]-p[0])*(q[1]-p[1]);
    const a=((v[0]-u[0])*(r[1]-p[1])-(w[0]-u[0])*(q[1]-p[1]))/det;
    const c=((w[0]-u[0])*(q[0]-p[0])-(v[0]-u[0])*(r[0]-p[0]))/det;
    const b=((v[1]-u[1])*(r[1]-p[1])-(w[1]-u[1])*(q[1]-p[1]))/det;
    const d=((w[1]-u[1])*(q[0]-p[0])-(v[1]-u[1])*(r[0]-p[0]))/det;
    group.setAttribute('transform', `matrix(${a} ${b} ${c} ${d} ${u[0]-a*p[0]-c*p[1]} ${u[1]-b*p[0]-d*p[1]})`);
    // Let the photographic face turn into the clean reverse of the paper.
    shade.setAttribute('opacity', Math.min(1, amount * 1.2));
  });

}
function foldPaper(mesh, from, to, duration, generation) {
  return new Promise(resolve=>{
    const start=performance.now();
    function frame(now) {
      if (generation !== memoryGeneration) { resolve(false); return; }
      const t=Math.min(1,(now-start)/duration);
      paintPaperFold(mesh,from+(to-from)*t);
      if(t<1) requestAnimationFrame(frame); else resolve(true);
    }
    requestAnimationFrame(frame);
  });
}
async function transitionMemory(direction) {
  if (memoryBusy) return;
  clearTimeout(memoryTimer); memoryBusy = true;
  const generation = ++memoryGeneration;
  const nextIndex = (memoryIndex + direction + memories.length) % memories.length;
  // Decode before starting so every landing opens onto a fully loaded photo.
  const ready = new Image(); ready.src = memories[nextIndex].src;
  try { await ready.decode(); } catch { /* A failed image must not lock controls. */ }
  if (generation !== memoryGeneration) return;
  if (!albumMotion.matches) {
    const mesh = makeFoldingPaper(memories[memoryIndex]);
    const foldMovement = paperAnimate(paperCard,[
      {transform:'translate(0,0) rotate(-2deg)'},
      {transform:'translate(0,-3px) rotate(0deg)',offset:.25},
      {transform:'translate(0,1px) rotate(-2deg)',offset:.5},
      {transform:'translate(0,-2px) rotate(1deg)',offset:.75},
      {transform:'translate(0,-5px) rotate(-4deg)'}
    ],440,generation);
    if (!await foldPaper(mesh,0,1,440,generation) || !await foldMovement) return;
    const distance = paperStage.clientWidth/2+paperCard.offsetWidth;
    const departureAngle = Math.atan2(-160 + 30, distance - 80) * 180 / Math.PI;
    if (!await paperAnimate(paperCard,[
      {transform:'translate(0,-5px) rotate(-4deg)'},
      {transform:'translate(-20px,2px) rotate(2deg)',offset:.22},
      {transform:'translate(80px,-30px) rotate(-14deg)',offset:.52},
      {transform:`translate(${distance}px,-160px) rotate(${departureAngle}deg)`}
    ],1000 / 3,generation,'cubic-bezier(.42,0,.65,1)')) return;
    // Exchange the photograph only while the sheet is completely offstage.
    mesh.svg.remove(); foldingPaper = null;
    memoryIndex = nextIndex; renderMemory();
    const incoming = makeFoldingPaper(memories[memoryIndex]); paintPaperFold(incoming,1);
    if (!await paperAnimate(paperCard,[
      {transform:`translate(${-distance}px,95px) rotate(-14deg)`},
      {transform:'translate(-120px,-32px) rotate(-16deg)',offset:.52},
      {transform:'translate(18px,-19px) rotate(8deg)',offset:.82},
      {transform:'translate(0,-5px) rotate(-4deg)'}
    ],450,generation,'cubic-bezier(.25,.5,.4,1)')) return;
    const landing = paperAnimate(paperCard,[
      {transform:'translate(0,-5px) rotate(-4deg)'},
      {transform:'translate(0,-15px) rotate(2deg)',offset:.56},
      {transform:'translate(0,3px) rotate(-3deg)',offset:.86},
      {transform:'translate(0,0) rotate(-2deg)'}
    ],600,generation);
    if (!await foldPaper(incoming,1,0,600,generation) || !await landing) return;
  } else { memoryIndex = nextIndex; renderMemory(); }
  if (generation !== memoryGeneration) return;
  resetPaper(); memoryBusy = false; scheduleMemory();
}
function startMemory() {
  if (memoryBusy || memoryPlaying) return;
  memoryPlaying = true; renderMemory(); transitionMemory(1);
}
memoryLaunch.addEventListener('click', startMemory);
memoryPlay.addEventListener('click', () => memoryPlaying ? stopMemory() : startMemory());
for (const [selector, direction] of [['.memory-prev', -1], ['.memory-next', 1]]) {
  memoryAlbum.querySelector(selector).addEventListener('click', () => { stopMemory(); transitionMemory(direction); });
}
memoryAlbum.addEventListener('keydown', event => {
  if (!['ArrowLeft', 'ArrowRight'].includes(event.key) || event.target.matches('input')) return;
  event.preventDefault(); stopMemory(); transitionMemory(event.key === 'ArrowLeft' ? -1 : 1);
});
meetingStory.addEventListener('close', () => { stopMemory(); memoryIndex = 0; renderMemory(); });
document.addEventListener('visibilitychange', () => { if (document.hidden) stopMemory(); });
albumMotion.addEventListener('change', stopMemory);
renderMemory();

// Dust follows the actual glyph positions, so the final text never moves.
const learnMotto = document.querySelector('.learn-motto');
const seasoningMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
let seasoningFrame;
let seasoningCanvas;
function finishSeasoning() {
  cancelAnimationFrame(seasoningFrame);
  seasoningCanvas?.remove(); seasoningCanvas = null;
  learnMotto.classList.remove('seasoning-ready', 'is-seasoning');
  learnMotto.querySelectorAll('.learn-motto-from, .learn-motto-to').forEach(line => line.style.opacity = '');
}
function pourWordDust() {
  if (seasoningMotion.matches) { finishSeasoning(); return; }
  const bounds = learnMotto.getBoundingClientRect();
  const canvas = document.createElement('canvas');
  canvas.className = 'seasoning-dust'; canvas.setAttribute('aria-hidden', 'true');
  const paddingX = 80, paddingY = 170;
  const width = bounds.width + paddingX * 2, height = bounds.height + paddingY + 90;
  const ratio = Math.min(window.devicePixelRatio || 1, 2);
  canvas.width = Math.ceil(width * ratio); canvas.height = Math.ceil(height * ratio);
  Object.assign(canvas.style, { width: `${width}px`, height: `${height}px`, left: `${-paddingX}px`, top: `${-paddingY}px` });
  const ctx = canvas.getContext('2d');
  if (!ctx) { finishSeasoning(); return; }
  ctx.scale(ratio, ratio); learnMotto.append(canvas); seasoningCanvas = canvas;
  const shaker = learnMotto.querySelector('.adobo-shaker');
  const lines = [...learnMotto.querySelectorAll('.learn-motto-from, .learn-motto-to')];
  const particles = [];
  lines.forEach((line, index) => {
    const mask = document.createElement('canvas'); mask.width = Math.ceil(width); mask.height = Math.ceil(height);
    const ink = mask.getContext('2d'), style = getComputedStyle(line);
    ink.font = `${style.fontWeight} ${style.fontSize} ${style.fontFamily}`;
    ink.textBaseline = 'top'; ink.fillStyle = '#fff';
    // Measure each character independently to preserve the existing tracking
    // and any responsive line wrapping rather than approximating a new layout.
    const node = line.firstChild;
    for (let i = 0; i < node.textContent.length; i++) {
      const range = document.createRange(); range.setStart(node, i); range.setEnd(node, i + 1);
      const rect = range.getBoundingClientRect();
      ink.fillText(node.textContent[i], rect.left - bounds.left + paddingX, rect.top - bounds.top + paddingY);
    }
    const pixels = ink.getImageData(0, 0, mask.width, mask.height).data;
    const spacing = bounds.width < 400 ? 2 : 3;
    for (let y = 0; y < mask.height; y += spacing) for (let x = 0; x < mask.width; x += spacing) {
      if (pixels[(y * mask.width + x) * 4 + 3] < 100) continue;
      particles.push({ x, y, color: style.color, birth: (index ? 3190 : 2380) + Math.random() * 330,
        duration: 680 + Math.random() * 340, bend: (Math.random() - .5) * 100,
        size: .65 + Math.random() * .65, origin: null, line: index });
    }
  });
  function capPosition() {
    const style = getComputedStyle(shaker), origin = style.transformOrigin.split(' ').map(parseFloat);
    const matrix = new DOMMatrix(style.transform);
    const point = new DOMPoint(shaker.offsetWidth * .5 - origin[0], shaker.offsetHeight * .07 - origin[1]).matrixTransform(matrix);
    return { x: shaker.offsetLeft + origin[0] + point.x + paddingX, y: shaker.offsetTop + origin[1] + point.y + paddingY };
  }
  learnMotto.classList.add('is-seasoning');
  const start = performance.now();
  function frame(now) {
    // Run the shared shake-and-dust timeline 25% faster.
    const elapsed = (now - start) / .75;
    ctx.clearRect(0, 0, width, height);
    const source = capPosition();
    const fades = [Math.max(0, Math.min(1, (elapsed - 3730) / 300)), Math.max(0, Math.min(1, (elapsed - 4540) / 300))];
    lines.forEach((line, i) => { line.style.opacity = fades[i]; });
    particles.forEach(p => {
      if (elapsed < p.birth) return;
      if (!p.origin) p.origin = { x: source.x + (Math.random() - .5) * 5, y: source.y };
      const t = Math.min(1, (elapsed - p.birth) / p.duration), ease = 1 - Math.pow(1 - t, 2);
      const x = p.origin.x + (p.x - p.origin.x) * ease + Math.sin(t * Math.PI) * (1 - t) * p.bend;
      const y = p.origin.y + (p.y - p.origin.y) * ease + Math.sin(t * Math.PI) * (1 - t) * 55;
      ctx.globalAlpha = Math.min(1, t * 8) * (1 - fades[p.line]);
      ctx.fillStyle = t < .3 ? '#cfb47a' : p.color;
      ctx.beginPath(); ctx.arc(x, y, p.size, 0, Math.PI * 2); ctx.fill();
    });
    ctx.globalAlpha = 1;
    if (elapsed < 4900) seasoningFrame = requestAnimationFrame(frame); else finishSeasoning();
  }
  seasoningFrame = requestAnimationFrame(frame);
}
let seasoningRepeatTimer;
let seasoningRuns = 0;
function runSeasoningCycle() {
  if (seasoningMotion.matches || seasoningRuns >= 5) return;
  finishSeasoning();
  learnMotto.classList.add('seasoning-ready');
  seasoningRuns += 1;
  pourWordDust();
  // Start at 0, 5, 10, 15, and 20 seconds; leave the words visible after run five.
  if (seasoningRuns < 5) seasoningRepeatTimer = setTimeout(runSeasoningCycle, 5000);
}
const seasoningObserver = new IntersectionObserver(entries => {
  if (!entries.some(entry => entry.isIntersecting)) return;
  seasoningObserver.disconnect();
  document.fonts.ready.then(runSeasoningCycle).catch(finishSeasoning);
}, { threshold: .6 });
if (!seasoningMotion.matches) { learnMotto.classList.add('seasoning-ready'); seasoningObserver.observe(learnMotto); }
seasoningMotion.addEventListener('change', event => { if (event.matches) { clearTimeout(seasoningRepeatTimer); seasoningObserver.disconnect(); finishSeasoning(); } });
window.addEventListener('resize', () => { if (seasoningCanvas) finishSeasoning(); });

// The backseat collection. Add more local clips here.
// Example: { src: 'assets/videos/camp.mp4', title: 'Camp days', poster: 'assets/videos/camp.jpg' }
const vanVideos = [
  { src: 'assets/videos/backseat-01.mp4', title: 'Backseat tape 01' },
  { src: 'assets/videos/backseat-02.mp4', title: 'Backseat tape 02' },
  { src: 'assets/videos/backseat-03.mp4', title: 'Backseat tape 03' },
  { src: 'assets/videos/backseat-04.mp4', title: 'Backseat tape 04' },
  { src: 'assets/videos/backseat-05.mp4', title: 'Backseat tape 05' }
];
const vanButton = document.querySelector('.memory-van');
const vanCinema = document.getElementById('van-cinema');
const vanCabin = vanCinema.querySelector('.van-cabin');
const vanVideo = vanCinema.querySelector('.van-video');
const vanPlaceholder = vanCinema.querySelector('.van-video-placeholder');
const vanControls = vanCinema.querySelector('.van-video-controls');
let vanVideoIndex = 0;
let vanAnimations = [];
let vanZoomShell;
let resumeVanSoundtrack = false;
const vanStatic = vanCinema.querySelector('.van-static');
const vanNoiseContext = vanStatic.getContext('2d');
let vanNoiseTimer;
let vanRevealTimer;
let vanStaticUntil = 0;
let vanPlaybackGeneration = 0;
function stopVanStatic() {
  clearInterval(vanNoiseTimer);
  clearTimeout(vanRevealTimer);
  vanStatic.hidden = true;
}
function startVanStatic() {
  stopVanStatic();
  vanStatic.hidden = false;
  vanStaticUntil = performance.now() + 500;
  function drawNoise() {
    if (!vanNoiseContext) return;
    const frame = vanNoiseContext.createImageData(240, 135);
    for (let i = 0; i < frame.data.length; i += 4) {
      const shade = 65 + Math.floor(Math.random() * 145);
      frame.data[i] = frame.data[i + 1] = frame.data[i + 2] = shade;
      frame.data[i + 3] = 255;
    }
    vanNoiseContext.putImageData(frame, 0, 0);
  }
  drawNoise();
  if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) vanNoiseTimer = setInterval(drawNoise, 90);
}
function vanPlaybackError(error) {
  stopVanStatic();
  vanPlaceholder.hidden = false;
  vanPlaceholder.querySelector('p').textContent = 'This tape could not play';
  const code = vanVideo.error?.code;
  vanPlaceholder.querySelector('span:last-child').textContent = code === 2
    ? 'The video could not load. Check your connection and reload.'
    : code === 3 || code === 4 || error?.name === 'NotSupportedError'
      ? 'This preview cannot decode the video. Open the site in Safari or Chrome.'
      : 'Playback was interrupted. Reopen the van to try again.';
  console.warn('Backseat video playback failed', { source: vanVideo.currentSrc, code, message: vanVideo.error?.message || error?.message });
}
function showVanVideo(index) {
  if (!vanVideos.length || !vanCinema.open) return;
  const generation = ++vanPlaybackGeneration;
  vanVideoIndex = (index + vanVideos.length) % vanVideos.length;
  const clip = vanVideos[vanVideoIndex];
  vanVideo.pause();
  startVanStatic();
  vanVideo.src = clip.src;
  if (clip.poster) vanVideo.poster = clip.poster;
  else vanVideo.removeAttribute('poster');
  vanVideo.hidden = false;
  vanPlaceholder.hidden = true;
  vanControls.hidden = vanVideos.length < 2;
  vanCinema.querySelector('.van-video-title').textContent = clip.title;
  vanVideo.setAttribute('aria-label', clip.title);
  vanVideo.load();
  // Start directly in the van/arrow click gesture so sound is allowed where supported.
  vanVideo.play().catch(async error => {
    if (generation !== vanPlaybackGeneration || !vanCinema.open || error.name === 'AbortError') return;
    if (error.name === 'NotAllowedError') {
      vanVideo.muted = true;
      try { await vanVideo.play(); }
      catch { if (generation === vanPlaybackGeneration && vanCinema.open) vanPlaybackError(); }
    } else vanPlaybackError(error);
  });
}
vanVideo.addEventListener('playing', () => {
  if (!vanCinema.open) { vanVideo.pause(); return; }
  clearTimeout(vanRevealTimer);
  vanRevealTimer = setTimeout(stopVanStatic, Math.max(0, vanStaticUntil - performance.now()));
});
vanVideo.addEventListener('ended', () => showVanVideo(vanVideoIndex + 1));
vanVideo.addEventListener('error', () => { if (vanCinema.open) vanPlaybackError(); });
function clearVanZoom() {
  vanAnimations.forEach(animation => animation.cancel());
  vanAnimations = [];
  vanZoomShell?.remove();
  vanZoomShell = undefined;
}
vanButton.addEventListener('click', () => {
  const source = vanButton.querySelector('img').getBoundingClientRect();
  resumeVanSoundtrack = meetingMusicReady && meetingMusicPlayer?.getPlayerState() === 1;
  if (meetingMusicReady) meetingMusicPlayer.pauseVideo();
  meetingMusicWanted = false;
  clearTimeout(meetingMusicTimeout);
  stopMemory();
  clearVanZoom();
  vanCinema.showModal();
  vanCinema.scrollTop = 0;
  showVanVideo(vanVideoIndex);
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  // Approach the passenger window, then continue through to the backseat.
  vanZoomShell = vanButton.querySelector('img').cloneNode(true);
  vanZoomShell.className = 'van-zoom-shell';
  vanZoomShell.alt = '';
  Object.assign(vanZoomShell.style, { left: `${source.left}px`, top: `${source.top}px`, width: `${source.width}px`, height: `${source.height}px` });
  vanCinema.append(vanZoomShell);
  const dx = window.innerWidth / 2 - (source.left + source.width * .64);
  const dy = window.innerHeight / 2 - (source.top + source.height * .48);
  const scale = Math.max(window.innerWidth / source.width, window.innerHeight / source.height) * 2.4;
  const shellFlight = vanZoomShell.animate([
    { transform: 'translate(0, 0) scale(1)', opacity: 1 },
    { transform: `translate(${dx}px, ${dy}px) scale(${scale * .7})`, opacity: 1, offset: .72 },
    { transform: `translate(${dx}px, ${dy}px) scale(${scale})`, opacity: 0 }
  ], { duration: 1250, easing: 'cubic-bezier(.65, 0, .2, 1)', fill: 'both' });
  const cabinArrival = vanCabin.animate([
    { transform: 'scale(.86)', opacity: 0 },
    { transform: 'scale(.92)', opacity: 0, offset: .48 },
    { transform: 'scale(1)', opacity: 1 }
  ], { duration: 1450, easing: 'cubic-bezier(.2, .65, .2, 1)', fill: 'both' });
  vanAnimations = [shellFlight, cabinArrival];
  cabinArrival.finished.then(clearVanZoom).catch(() => {});
});
vanCinema.querySelector('.van-video-prev').addEventListener('click', () => showVanVideo(vanVideoIndex - 1));
vanCinema.querySelector('.van-video-next').addEventListener('click', () => showVanVideo(vanVideoIndex + 1));
vanCinema.addEventListener('close', () => {
  ++vanPlaybackGeneration;
  stopVanStatic();
  clearVanZoom();
  vanVideo.pause();
  if (meetingStory.open) {
    vanButton.focus({ preventScroll: true });
    if (resumeVanSoundtrack) startMeetingMusic();
  }
  resumeVanSoundtrack = false;
});
meetingStory.addEventListener('close', () => { if (vanCinema.open) vanCinema.close(); });

const serviceDialog = document.getElementById('service-details');
let serviceOpener;
document.querySelectorAll('[data-service]').forEach(button => {
  button.addEventListener('click', () => {
    serviceOpener = button;
    serviceDialog.classList.add('service-dialog-ugc');
    serviceDialog.dataset.service = button.dataset.service;
    const content = document.getElementById(`service-content-${button.dataset.service}`);
    serviceDialog.querySelector('h2').textContent = content.dataset.title;
    serviceDialog.querySelector('.service-body').replaceChildren(content.content.cloneNode(true));
    serviceDialog.querySelector('.service-inquiry').textContent = ['Create with us ↗', 'Explore a destination partnership ↗', 'Build a partnership ↗', 'Plan your recurring feature ↗', 'Plan your shoot ↗', 'Build your media package ↗'][Number(button.dataset.service)];
    serviceDialog.querySelector('.service-inquiry').href = `mailto:hola@lostandperdido.com?subject=${encodeURIComponent(content.dataset.title + ' — Lost & Perdido')}`;
    serviceDialog.showModal();
    serviceDialog.scrollTop = 0;
  });
});
serviceDialog.addEventListener('click', event => {
  if (event.target !== serviceDialog) return;
  const r = serviceDialog.getBoundingClientRect();
  if (event.clientX < r.left || event.clientX > r.right || event.clientY < r.top || event.clientY > r.bottom) serviceDialog.close();
});
serviceDialog.addEventListener('close', () => serviceOpener?.focus({ preventScroll: true }));

// A p-shaped magnifier lifts out of the heading and enlarges the actual lettering.
const perspectiveHeading = document.querySelector('.perspective-heading');
const perspectiveP = perspectiveHeading.querySelector('.perspective-p');
const perspectiveMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
let perspectiveFrame;
let perspectiveLens;
let perspectiveFinished = false;
function finishPerspective() {
  cancelAnimationFrame(perspectiveFrame);
  perspectiveLens?.remove();
  perspectiveP.style.opacity = '';
  perspectiveFinished = true;
}
function preparePerspective() {
  if (perspectiveMotion.matches || perspectiveFinished) return;
  const r = perspectiveHeading.getBoundingClientRect();
  const p = perspectiveP.getBoundingClientRect();
  const startX = p.left - r.left + p.width / 2;
  const startY = p.top - r.top + p.height * .46;
  const size = Math.max(14, p.width * .95);
  const copy = perspectiveHeading.cloneNode(true);
  copy.className = 'perspective-copy';
  copy.querySelector('.perspective-p').style.opacity = '1';
  copy.style.width = `${r.width}px`;
  perspectiveLens = document.createElement('span');
  perspectiveLens.className = 'perspective-lens';
  perspectiveLens.setAttribute('aria-hidden', 'true');
  const glass = document.createElement('span'); glass.className = 'perspective-glass';
  glass.append(copy); perspectiveLens.append(glass); perspectiveHeading.append(perspectiveLens);
  perspectiveP.style.opacity = '0';
  function draw(x, y, diameter, opacity) {
    const scale = diameter / 100;
    Object.assign(perspectiveLens.style, { left: `${x - 50}px`, top: `${y - 50}px`, transform: `scale(${scale})`, opacity });
    // Cancel the lens's scale for the text, then magnify 1.8x inside its clipping circle.
    const zoom = 1.8 / scale;
    copy.style.transformOrigin = '0 0';
    copy.style.transform = `translate(${45 - x * zoom}px, ${45 - y * zoom}px) scale(${zoom})`;
  }
  draw(startX, startY, size, 1);
  const observer = new IntersectionObserver(entries => {
    if (!entries.some(entry => entry.isIntersecting)) return;
    observer.disconnect();
    const start = performance.now();
    function frame(now) {
      const t = Math.min(1, (now - start) / 3400);
      if (t === 1 || perspectiveMotion.matches) { finishPerspective(); return; }
      const lift = Math.min(1, t / .25);
      const eased = 1 - Math.pow(1 - lift, 3);
      perspectiveP.style.opacity = String(Math.min(1, lift * 2));
      const sweep = Math.max(0, (t - .25) / .75);
      const targetX = r.width * (.12 + .76 * sweep);
      const targetY = r.height * (.22 + .56 * sweep);
      draw(startX + (targetX - startX) * eased, startY + (targetY - startY) * eased,
        size + (Math.min(145, r.width * .38) - size) * eased, Math.min(1, (1 - t) / .17));
      perspectiveFrame = requestAnimationFrame(frame);
    }
    perspectiveFrame = requestAnimationFrame(frame);
  }, { threshold: .8 });
  observer.observe(perspectiveHeading);
  window.addEventListener('resize', () => { observer.disconnect(); finishPerspective(); }, { once: true });
}
document.fonts.ready.then(preparePerspective);
perspectiveMotion.addEventListener('change', event => { if (event.matches) finishPerspective(); });

// Shared totals come from the preview's poll API; never invent fallback percentages.
const pollButtons = [...document.querySelectorAll('[data-poll]')];
const pollStatus = document.querySelector('.gps-poll-status');
let pollVoter = '';
let pollChoice = '';
try {
  pollVoter = localStorage.getItem('lp-poll-voter') || '';
  pollChoice = localStorage.getItem('lp-poll-choice') || '';
} catch {}
if (!pollVoter) pollVoter = crypto.randomUUID ? crypto.randomUUID() : `${Date.now()}-${Math.random().toString(36).slice(2)}`;
try { localStorage.setItem('lp-poll-voter', pollVoter); } catch {}
function renderPoll(counts) {
  const total = counts.lost + counts.perdido;
  const lost = total ? Math.round(counts.lost / total * 100) : 0;
  pollButtons.forEach(button => {
    const choice = button.dataset.poll;
    button.querySelector('strong').textContent = total ? `${choice === 'lost' ? lost : 100 - lost}%` : '—';
    button.setAttribute('aria-pressed', String(choice === pollChoice));
  });
  pollStatus.textContent = total ? `${total} ${total === 1 ? 'vote' : 'votes'} · ${pollChoice ? 'Your vote is in!' : 'Pick your side.'}` : 'Be the first to pick a side.';
}
async function fetchPoll(choice) {
  const response = await fetch('/api/poll', choice ? {
    method: 'POST', headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ voter: pollVoter, choice })
  } : { cache: 'no-store' });
  if (!response.ok) throw new Error('Poll unavailable');
  const counts = await response.json();
  if (![counts.lost, counts.perdido].every(n => Number.isInteger(n) && n >= 0)) throw new Error('Invalid totals');
  if (choice) {
    pollChoice = choice;
    try { localStorage.setItem('lp-poll-choice', choice); } catch {}
  }
  renderPoll(counts);
}
pollButtons.forEach(button => button.addEventListener('click', async () => {
  pollButtons.forEach(item => { item.disabled = true; });
  pollStatus.textContent = 'Counting your vote…';
  try { await fetchPoll(button.dataset.poll); }
  catch { pollStatus.textContent = 'Voting is unavailable right now. Please try again later.'; }
  finally { pollButtons.forEach(item => { item.disabled = false; }); }
}));
gpsButton.addEventListener('click', () => {
  fetchPoll().catch(() => { pollStatus.textContent = 'Voting is unavailable right now. Please try again later.'; });
});

// Current conditions refresh on entry and every ten minutes while a city is open.
const cityWeatherCache = new Map();
const cityWeatherPending = new Set();
function describeCityWeather(code) {
  const es = currentLanguage === 'es';
  if (code === 0) return es ? 'Despejado' : 'Clear sky';
  if (code <= 2) return es ? 'Parcialmente nublado' : 'Partly cloudy';
  if (code === 3) return es ? 'Nublado' : 'Overcast';
  if ([45,48].includes(code)) return es ? 'Niebla' : 'Fog';
  if ([51,53,55,56,57].includes(code)) return es ? 'Llovizna' : 'Drizzle';
  if ([61,63,65,66,67,80,81,82].includes(code)) return es ? 'Lluvia' : 'Rain';
  if ([71,73,75,77,85,86].includes(code)) return es ? 'Nieve' : 'Snow';
  if ([95,96,99].includes(code)) return es ? 'Tormenta' : 'Thunderstorm';
  return es ? 'Condiciones actuales' : 'Current conditions';
}
async function loadCityWeather(stop) {
  const box = document.querySelector(`#stop-${stop} .city-weather`);
  if (!box || cityWeatherPending.has(stop)) return;
  const value = box.querySelector('.city-weather-value');
  const condition = box.querySelector('.city-weather-condition');
  const cached = cityWeatherCache.get(stop);
  function render(data) {
    value.textContent = `${Math.round(data.temperature_2m)}°C`;
    condition.textContent = `${describeCityWeather(data.weather_code)} · ${data.time.slice(11,16)}`;
  }
  if (cached && Date.now() - cached.fetched < 600000) { render(cached.current); return; }
  value.textContent = currentLanguage === 'es' ? 'Cargando…' : 'Loading…';
  condition.textContent = '';
  cityWeatherPending.add(stop);
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 10000);
  try {
    const params = new URLSearchParams({ latitude: box.dataset.lat, longitude: box.dataset.lon,
      current: 'temperature_2m,weather_code', timezone: 'auto', forecast_days: '1' });
    const response = await fetch(`https://api.open-meteo.com/v1/forecast?${params}`, { signal: controller.signal });
    if (!response.ok) throw new Error('Weather unavailable');
    const data = await response.json();
    if (!Number.isFinite(data.current?.temperature_2m) || !Number.isInteger(data.current?.weather_code) || typeof data.current?.time !== 'string') throw new Error('Invalid weather');
    cityWeatherCache.set(stop, { current: data.current, fetched: Date.now() });
    render(data.current);
  } catch {
    value.textContent = currentLanguage === 'es' ? 'No disponible' : 'Unavailable';
    condition.textContent = currentLanguage === 'es' ? 'Inténtalo más tarde' : 'Check again soon';
  } finally {
    clearTimeout(timeout);
    cityWeatherPending.delete(stop);
  }
}
setInterval(() => {
  if (cityPopup.open && !document.hidden && activeCityPin) loadCityWeather(activeCityPin.dataset.stop);
}, 600000);


// A little flight from one mountain friend to the other.
(() => {
  const flyer = document.querySelector('.mountain-paraglider');
  const friend = document.querySelector('.mountain-sitter');
  if (!flyer || !friend) return;
  let started = false;
  flyer.addEventListener('click', () => {
    if (started) return;
    started = true;
    flyer.setAttribute('aria-disabled', 'true');
    flyer.classList.add('is-flying');
    const seated = friend.querySelector('svg').cloneNode(true);
    seated.setAttribute('aria-label', 'Smiling stick figure sitting beside his friend');
    const duration = matchMedia('(prefers-reduced-motion: reduce)').matches ? 0 : 2800;
    const start = performance.now();
    function frame(now) {
      const progress = duration ? Math.min((now - start) / duration, 1) : 1;
      const ease = progress * progress * (3 - 2 * progress);
      // Read the untransformed position so resizing during flight stays accurate.
      flyer.style.transform = 'none';
      const origin = flyer.getBoundingClientRect();
      const target = friend.getBoundingClientRect();
      const x = (target.left - 38 - origin.left) * ease;
      const y = (target.top - origin.top) * ease - Math.sin(Math.PI * progress) * 65;
      const bank = Math.sin(progress * Math.PI * 2) * 12;
      flyer.style.transform = `translate(${x}px, ${y}px) rotate(${bank}deg)`;
      if (progress > .84) flyer.classList.add('is-landing');
      if (progress < 1) {
        requestAnimationFrame(frame);
      } else {
        flyer.querySelector('svg:not(.paraglider-canopy)').replaceWith(seated);
        flyer.querySelector('.paraglider-canopy').remove();
        flyer.classList.remove('is-flying');
        flyer.classList.add('has-landed');
        flyer.style.transform = '';
        flyer.setAttribute('aria-label', 'Together at last, sitting beside our friend');
      }
    }
    requestAnimationFrame(frame);
  });
})();

// Once reunited, either traveler can open the little Bible scene.
(() => {
  const left = document.querySelector('.mountain-paraglider');
  const right = document.querySelector('.mountain-sitter');
  if (!left || !right) return;
  let shown = false;
  function revealBible() {
    if (!left.classList.contains('has-landed') || shown) return;
    shown = true;
    left.querySelector('span').hidden = true;
    left.querySelector('span').style.display = 'none';
    right.querySelector('span').textContent = 'May God be with us.';
    right.insertAdjacentHTML('beforeend', '<svg class="tiny-bible" viewBox="0 0 40 30" role="img" aria-label="An open Bible"><path d="M2 4Q12 0 20 5Q29 0 38 4V27Q29 23 20 28Q11 23 2 27Z" fill="#fff4d2" stroke="#583d2b" stroke-width="2"/><path d="M20 5V28M10 7V19M6 11H14" fill="none" stroke="#947240" stroke-width="2"/></svg>');
    left.setAttribute('aria-label', 'Sitting together');
    right.setAttribute('aria-label', 'Reading the Bible together. May God be with us.');
    right.removeAttribute('role');
    right.removeAttribute('tabindex');
  }
  new MutationObserver(() => {
    if (left.classList.contains('has-landed') && !shown) {
      left.removeAttribute('aria-disabled');
      left.setAttribute('aria-label', 'Read together');
      right.setAttribute('role', 'button');
      right.setAttribute('tabindex', '0');
      right.setAttribute('aria-label', 'Read together');
    }
  }).observe(left, {attributes:true, attributeFilter:['class']});
  left.addEventListener('click', revealBible);
  right.addEventListener('click', revealBible);
  right.addEventListener('keydown', event => {
    if (event.key === 'Enter' || event.key === ' ') { event.preventDefault(); revealBible(); }
  });
})();

// Each phone keeps cycling while its service is open; reopening starts fresh.
(() => {
  const dialog = document.getElementById('service-details');
  let timer;
  const features = [
    ['Restaurants', 'assets/latin-campaigns.png', 'Sabores worth sharing.', 'Argentine empanadas campaign concept'],
    ['Ziplining', 'assets/latin-campaigns.png', 'A new perspective. A little courage.', 'Costa Rican rainforest ziplining campaign concept'],
    ['Water sports', 'assets/latin-campaigns.png', 'Find your next adventure on the water.', 'Colombian Caribbean paddleboarding campaign concept'],
    ['Wine tours', 'assets/latin-campaigns.png', 'A taste of Mendoza. A story to share.', 'Mendoza wine tour campaign concept'],
    ['Community stays', 'assets/hostel-community-concept.png', 'Arrive as travelers. Leave as friends.', 'Hostel community concept']
  ];
  const brands = [
    ['Skool.com', '', 'Find your people. Find your words.'],
    ['DJI', 'assets/partner-campaigns.png', 'Every journey has a story worth capturing.'],
    ['Airalo', 'assets/partner-campaigns.png', 'New destination. Stay connected.', '▣', 'eSIM / ON THE GO'],
    ['World Nomads', 'assets/partner-campaigns.png', 'For the journeys beyond the familiar.'],
    ['Samsonite', 'assets/partner-campaigns.png', 'Packed for the next chapter.', '🧳', 'READY FOR DEPARTURE']
  ];
  function start() {
    clearInterval(timer);
    if (!dialog.open || !['2','3'].includes(dialog.dataset.service)) return;
    const phone = dialog.querySelector('.ugc-phone');
    const image = phone.querySelector('.ig-post-image');
    const original = image.innerHTML;
    const partnership = dialog.dataset.service === '2';
    const slides = partnership ? brands : features;
    let index = 0;
    function render() {
      const [name, src, caption, detail, tag] = slides[index];
      image.className = 'ig-post-image campaign-slide';
      image.replaceChildren();
      if (partnership && index === 0) {
        image.classList.add('skool-promo');
        image.innerHTML = original;
      } else if (src) {
        const img = document.createElement('img');
        img.src = src; img.alt = partnership ? name + ' partnership concept' : detail;
        if (src.includes('campaigns.png')) {
          const quadrant = partnership ? index - 1 : index;
          const crop = document.createElement('div'); crop.className = 'campaign-photo-crop';
          img.style.left = quadrant % 2 ? '-100%' : '0';
          img.style.top = quadrant > 1 ? '-100%' : '0';
          crop.append(img); image.append(crop);
          const fit = () => {
            if (!img.naturalWidth) return;
            const ratio = img.naturalWidth / img.naturalHeight;
            const width = Math.max(image.clientWidth, image.clientHeight * ratio);
            crop.style.width = width + 'px'; crop.style.height = width / ratio + 'px';
          };
          img.addEventListener('load', fit, {once:true});
          crop.fitPhoto = fit;
          fit();
        } else image.append(img);
      } else {
        const art = document.createElement('div'); art.className = 'brand-art';
        const icon = document.createElement('em'); icon.textContent = detail;
        art.append(name, icon, tag); image.append(art);
      }
      if (!(partnership && index === 0)) {
        const label = document.createElement('div'); label.className = 'campaign-label'; label.textContent = name;
        image.append(label);
      }
      phone.querySelector('.ig-post-byline small').textContent = partnership ? name + ' · partnership concept' : name + ' spotlight · concept';
      phone.querySelector('.ig-post-copy > strong').textContent = partnership ? 'Lost & Perdido × ' + name : name + ', through our lens.';
      const copy = phone.querySelector('.ig-post-copy p'); copy.replaceChildren();
      const handle = document.createElement('b'); handle.textContent = 'lostandperdido'; copy.append(handle, ' ' + caption);
      phone.querySelector('.ig-carousel-dots').textContent = slides.map((_,i) => i === index ? '●' : '○').join(' ');
      image.classList.remove('slide-enter'); void image.offsetWidth; image.classList.add('slide-enter');
    }
    slides.forEach(slide => { if(slide[1]) { const img = new Image(); img.src = slide[1]; } });
    render();
    timer = setInterval(() => { index = (index + 1) % slides.length; render(); }, 4000);
  }
  new MutationObserver(start).observe(dialog, {attributes:true,attributeFilter:['open']});
  dialog.addEventListener('close', () => clearInterval(timer));
})();

// A compact destination index keeps nearby city beacons easy to select.
(() => {
  const navigation = document.createElement('nav');
  navigation.className = 'city-navigation'; navigation.hidden = true;
  navigation.setAttribute('aria-label', 'Destinations in the selected country');
  worldMap.after(navigation);
  countryPins.forEach(country => country.addEventListener('click', () => {
    if (country.dataset.country === 'usa') return;
    const visible = cityPins.filter(pin => !pin.hidden);
    navigation.replaceChildren();
    const heading = document.createElement('p');
    heading.textContent = country.dataset.country + ' / ' + visible.length + ' destinations';
    const list = document.createElement('div');
    visible.forEach((pin,index) => {
      pin.querySelector('.world-pin-dot').textContent = '';
      const button = document.createElement('button'); button.type = 'button';
      button.append(pin.getAttribute('aria-label'));
      button.addEventListener('click', () => pin.click()); list.append(button);
    });
    navigation.append(heading,list); navigation.hidden = false;
  }));
  mapReset.addEventListener('click', () => { navigation.hidden = true; });
})();

window.addEventListener('resize', () => document.querySelectorAll('.campaign-photo-crop').forEach(crop => crop.fitPhoto?.()));
