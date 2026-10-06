// "¿Qué tan Connect eres?" — quiz de engagement del blog de Tecmilenio.
// Réplica del Typeform Nkm3zo0d (embebido en blog.tecmilenio.mx). Cambios:
//   - se quitó la frase de la intro sobre "la pregunta 10" (no tenía lógica detrás);
//   - el botón final lleva a una página de Connect (en Typeform no tenía URL).
// Igual que el original, NO captura datos: no envía nada a HubSpot (lead: null).
//
// ⚠️ Las imágenes se sirven desde el CDN de Typeform: hay que rehospedarlas antes de
// dar de baja Typeform, y validar licencias (fotos de Shutterstock y una de Feid).

const IMG = (id) => `https://images.typeform.com/images/${id}`;

function yesNo(id, title, image) {
  return {
    id,
    title,
    image: IMG(image),
    type: 'single',
    options: [
      { id: `${id}_si`, label: 'Sí', points: 1 },
      { id: `${id}_no`, label: 'No', points: 0 },
    ],
  };
}

export default {
  id: 'connect',
  version: 'connect-cf-v1',
  name: '¿Qué tan Connect eres?',

  theme: {
    accent: '#007a63',
    accentHover: '#00614f',
    accentSoft: '#e0f2ee',
    question: '#000000',
    font: "system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif",
  },

  welcome: {
    title: '¿Qué tan Connect eres?',
    description:
      'El futuro es Connect, y ¿tú estás listo o estás esperando conectarte a internet por línea telefónica? Responde con sí o no y calcula qué tan Connect eres.',
    button: 'Comenzar',
    meta: '16 preguntas · 2 minutos',
  },

  scoring: { type: 'points' },

  questions: [
    yesNo('q1', 'Prefieres mandar mensajes a tus compañeros de trabajo, en vez de hablar por teléfono.', 'gPJPuKPfAd8h'),
    yesNo('q2', 'Eres de los que les gusta ver películas en plataformas de streaming, en vez de ir al cine rodeado de 30 personas y palomitas.', '9ssPe6FxheyF'),
    yesNo('q3', '¿Los videos en redes sociales pueden ser educativos?', 'GBtCws3g2XW3'),
    yesNo('q4', 'Hablas al mismo tiempo con una persona por WhatsApp, Instagram, Facebook y DM, teniendo distintas conversaciones a la vez.', 'CqAg7487QCAE'),
    yesNo('q5', 'Toda tu vida está en tu celular (clases, tareas, fotos, recordatorios, banca electrónica, contactos, agenda).', '6Z6yihKPpa74'),
    yesNo('q6', 'Entiendes lo que es "almacenamiento en la nube".', '8A5Yyw4C9d5x'),
    yesNo('q7', 'Usas laptop o tablet en lugar de libretas para tus tareas del día y pendientes.', 'Hwvn7Jgpusje'),
    yesNo('q8', 'Después de la pandemia, te enamoraste de las clases online y de ir al campus una vez a la semana para ver a tus amigos.', '96UdA7Hst9Tf'),
    yesNo('q9', 'Consultas libros electrónicos en lugar de ir a la biblioteca.', 'GdUUwJTyYfnv'),
    yesNo('q10', 'Los trabajos en equipo los haces en documentos colaborativos en lugar de reunirte con tus compañeros.', 'yYs8E9UruHSi'),
    yesNo('q11', 'Cuando quieres saber algo sobre algún tema, lo buscas en Google.', 'WZV7JYghbaGb'),
    yesNo('q12', 'Te brincas los instructivos y prefieres ver tutoriales en YouTube.', 'TJWEVmJUppkv'),
    yesNo('q13', 'Usas TikTok para aprender datos, ver tutoriales y hacks.', '6BanfnCxKAcE'),
    yesNo('q14', 'Utilizas herramientas o aplicaciones para administrar proyectos junto con todo tu equipo (Trello, Monday, etc.).', 'hNXyHNwZ9imV'),
    yesNo('q15', 'Sueles escuchar podcasts para aprender y divertirte.', '2iPb3ptp3QwX'),
    yesNo('q16', 'Sabes más de la vida de tus compañeros por redes sociales que por convivir con ellos.', 'eGRq6A7bAwsr'),
  ],

  // Cada "Sí" vale 1 punto (0–16).
  outcomes: [
    {
      id: 'connect_10',
      min: 0,
      max: 3,
      title: '¡Eres 10% Connect!',
      image: IMG('zB3FQv2dRJ9K'),
      description:
        'Lo tuyo, lo tuyo, fue aprender por televisión y radio. Estabas pendiente de los programas como "En Familia con Chabelo" y "El Chavo del Ocho". Tú todavía sabes lo que es una hemeroteca y el olor del periódico guardado en la cochera de casa. Eres presencial, totalmente.\n\n¡Anímate! ¡Para el amor no hay edades, y para Connect, tampoco!',
    },
    {
      id: 'connect_30',
      min: 4,
      max: 5,
      title: '¡Eres 30% Connect!',
      image: IMG('s2Q6TLqMvifx'),
      description:
        'Todavía recuerdas los años mozos del walkman, los teléfonos Nokia e ir a la biblioteca con tus amigos. Lo tuyo sigue siendo estudiar presencial. Tal vez usar Spotify no está tan mal, después de todo; verás que estudiar en modalidad Connect será muy natural para ti.',
    },
    {
      id: 'connect_50',
      min: 6,
      max: 8,
      title: '¡Eres 50% Connect!',
      image: IMG('5HKw5fSqrcKy'),
      description:
        'Tienes un buen nivel de tolerancia a los sonidos elevados porque te entrenaste con el zumbido del módem al conectarse a internet (léase con el sonido en tu cabeza de fondo). Pasabas horas esperando a que una imagen se descargara. ¿Google?, ¡qué es eso!, tú navegabas por AOL o Yahoo. Todavía conoces lo que es una monografía y lo que era esperar a que contestaran los papás de tu ligue cuando llamabas a su casa.\n\nSi regresaras a estudiar, la modalidad Connect te ayudará a actualizarte, mientras generas redes de contactos e incluso haces amigos de manera presencial. Su flexibilidad será algo que probarás y te gustará. Tú serás dueño de la manera en que estudias con el acompañamiento de un mentor guía.',
    },
    {
      id: 'connect_75',
      min: 9,
      max: 12,
      title: '¡Eres 75% Connect!',
      image: IMG('38wK4UQHWaXq'),
      description:
        'Tú sí sabes distinguir entre la notificación de ICQ y la de Messenger, porque tú viviste esa transición. Lo tuyo era subir las fotos al Metroflog y descargar música (ya sabes cómo). Facebook no tenía nada que hacer contra tu perfil de Hi5. El Microsoft Encarta era tu Google.\n\nBienvenido al mundo de la educación híbrida: si te decides a estudiar en modalidad Connect, te adaptarás muy rápido a eso de tomar tus clases a la hora que tú puedas, desde donde te convenga. ¡Te encantará tener esa flexibilidad en tu vida!',
    },
    {
      id: 'connect_90',
      min: 13,
      max: 15,
      title: '¡Eres 90% Connect!',
      image: IMG('aeUeXdjfp5BH'),
      description:
        'Lo tuyo son los videotutoriales. Te pasabas horas viendo datos curiosos. Hacer videos en Vine, pasar tiempo jugando FarmVille y estar en FaceTime con tus amigos era genial. Wikipedia y YouTube eran indispensables para investigar tus tareas. Y hoy no puedes vivir sin el celular; incluso WhatsApp es una herramienta de trabajo para ti.\n\nLo híbrido es lo tuyo. ¡Tecmilenio Connect es ideal para ti! Podrás verte con tus amigos para estudiar algunos días, mientras otros asistes a clase desde casa y en pijama.',
    },
    {
      id: 'connect_100',
      min: 16,
      max: 16,
      title: '¡Eres 100% Connect!',
      image: IMG('EgtxwEuSJuAc'),
      description:
        'Tú sí le sabes al POV. Snapchat ve de lejos los challenges que subes con tus amigos a TikTok. Lo tuyo es estar actualizado y buscar "hacks" para aprender. Disfrutas subir videos con tus amigos entre clases y dominas todas las aplicaciones para mejorar tus trabajos escolares.\n\nEres 100% Connect, es decir, tú eres dueño de tu tiempo y sabrás perfectamente cómo administrar tu día a día. Si buscas un espacio para estudiar a tan solo un clic o a 10 km, vas a encontrar a Tecmilenio.',
    },
  ],

  result: {
    cta: {
      label: 'Conoce más de Connect',
      // Por confirmar con Tecmilenio: no encontramos una landing general de Connect.
      url: 'https://blog.tecmilenio.mx/articulos/que-es-la-modalidad-connect-y-por-que-es-una-opcion-para-estudiar-en-tecmilenio',
    },
  },

  lead: null,
  hidden: ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content'],
  hubspot: null,
};
