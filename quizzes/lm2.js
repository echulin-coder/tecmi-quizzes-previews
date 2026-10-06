// LM #2 — ¿Tu futuro está en el Comercio Global?
// Réplica del Typeform ktaLxhgT con las correcciones de la auditoría del 06-oct-2026:
//   - las preguntas 4–6 de la Sección 5 suman a la Sección 5 (en Typeform sumaban a la 4,
//     por eso casi todos salían "Negociador internacional");
//   - el perfil siempre se asigna: gana la sección (o par de secciones) con mejor promedio,
//     en vez de reglas ≥12 donde "gana la última" y a veces no quedaba ninguno;
//   - "Solucionador Global" ya es alcanzable (dependía de una variable que nunca se calculaba);
//   - la escala se explica como 1–4, igual que los botones;
//   - se agregan aviso de privacidad, opt-in y UTMs como en LM #4.

const SCALE = [
  { value: 1, label: 'No me describe' },
  { value: 2, label: 'Me describe un poco' },
  { value: 3, label: 'Me describe bastante' },
  { value: 4, label: 'Me describe por completo' },
];

// Escala 1–4 que vale 0–3 puntos.
function scale(section, id, title) {
  return {
    id,
    section,
    title,
    type: 'scale',
    options: SCALE.map((s) => ({ id: `${id}_${s.value}`, label: s.label, short: String(s.value), points: s.value - 1 })),
  };
}

const sections = [
  {
    id: 'seccion_1',
    title: 'Motivación global real',
    description: 'Explora si tu interés va más allá de solo querer viajar y refleja una verdadera curiosidad por el impacto de los negocios en el mundo.',
    questions: [
      scale('seccion_1', 's1q1', 'Me genera curiosidad conocer por qué un producto cuesta distinto en otros países.'),
      scale('seccion_1', 's1q2', 'Sigo noticias sobre acuerdos comerciales o conflictos económicos internacionales.'),
      scale('seccion_1', 's1q3', 'Me emociona la idea de que una empresa local pueda ofrecer sus productos a diversos lugares del mundo.'),
      scale('seccion_1', 's1q4', 'Me interesa comprender cómo influyen las diferencias culturales en la manera de hacer negocios.'),
      scale('seccion_1', 's1q5', 'Me visualizo trabajando en un entorno internacional donde el idioma y los horarios pueden variar de manera constante.'),
      scale('seccion_1', 's1q6', 'Tengo apertura para adaptar mis ideas a distintas culturas y formas de pensar.'),
    ],
  },
  {
    id: 'seccion_2',
    title: 'Pensamiento estratégico y visión comercial',
    description: 'Descubre tu afinidad por los datos y la toma de decisiones estratégicas.',
    questions: [
      scale('seccion_2', 's2q1', 'Antes de comprar algo importante, me gusta comparar opciones y leer reseñas.'),
      scale('seccion_2', 's2q2', 'Tengo la facilidad de interpretar gráficas o tablas de datos para entender una situación.'),
      scale('seccion_2', 's2q3', 'Disfruto planificar estrategias para alcanzar una meta, analizando los posibles riesgos.'),
      scale('seccion_2', 's2q4', 'Me interesa entender cómo las decisiones políticas afectan el precio del dólar o la inflación.'),
      scale('seccion_2', 's2q5', 'Soy de los que prefieren tener un "Plan B" antes de actuar.'),
      scale('seccion_2', 's2q6', 'Me atrae el reto de optimizar recursos para que un negocio sea más rentable.'),
    ],
  },
  {
    id: 'seccion_3',
    title: 'Operación, logística y ejecución',
    description: 'Evalúa tu afinidad con los procesos que hacen posible el comercio.',
    questions: [
      scale('seccion_3', 's3q1', 'Disfruto organizar tareas complejas paso a paso para asegurarme de que todo se ejecute de manera correcta.'),
      scale('seccion_3', 's3q2', 'Me genera satisfacción ver cómo un plan se ejecuta con precisión.'),
      scale('seccion_3', 's3q3', 'Soy de los que prefieren dar seguimiento a cada etapa de un proceso.'),
      scale('seccion_3', 's3q4', 'Me interesa entender cómo funcionan los puertos, aduanas y transportes internacionales.'),
      scale('seccion_3', 's3q5', 'Tengo facilidad para coordinar a diferentes personas para lograr un objetivo común.'),
      scale('seccion_3', 's3q6', 'Ante un retraso, analizo la situación y ajusto el proceso para cumplir los objetivos.'),
    ],
  },
  {
    id: 'seccion_4',
    title: 'Comunicación, negociación y relación multicultural',
    description: 'Descubre tu talento para conectar con otros y cerrar acuerdos.',
    questions: [
      scale('seccion_4', 's4q1', 'Me siento cómodo expresando mis ideas ante personas que no conozco.'),
      scale('seccion_4', 's4q2', 'Disfruto el reto de convencer a otros sobre los beneficios de una propuesta.'),
      scale('seccion_4', 's4q3', 'Soy empático y trato de entender el punto de vista de alguien con una cultura distinta a la mía.'),
      scale('seccion_4', 's4q4', 'Me gusta mediar en conflictos para encontrar una solución que beneficie a todos.'),
      scale('seccion_4', 's4q5', 'Detecto con facilidad los intereses y motivaciones de la otra persona en una conversación.'),
      scale('seccion_4', 's4q6', 'Considero que el lenguaje corporal y el tono de voz son tan importantes como las palabras.'),
    ],
  },
  {
    id: 'seccion_5',
    title: 'Adaptabilidad y tolerancia a la incertidumbre',
    description: 'El comercio internacional cambia cada segundo; aquí descubres tu capacidad para adaptarte.',
    questions: [
      scale('seccion_5', 's5q1', 'No me frustro fácilmente cuando las reglas del juego cambian de un momento a otro.'),
      scale('seccion_5', 's5q2', 'Me gusta proponer soluciones creativas cuando los métodos tradicionales fallan.'),
      scale('seccion_5', 's5q3', 'Puedo trabajar bajo presión sin perder el enfoque en el resultado final.'),
      scale('seccion_5', 's5q4', 'Cuando surgen imprevistos, los abordo como oportunidades de crecimiento y mejora.'),
      scale('seccion_5', 's5q5', 'Me adapto rápido a nuevas herramientas digitales o formas de trabajo.'),
      scale('seccion_5', 's5q6', 'Me siento cómodo tomando decisiones aunque no tenga toda la información disponible al momento.'),
    ],
  },
];

export default {
  id: 'lm2',
  version: 'lm2-cf-v1',
  name: 'LM #2 - ¿Tu futuro está en el Comercio Global?',

  welcome: {
    title: '¿Tu futuro está en el comercio global?',
    description:
      'Este test tiene 5 secciones y te tomará unos 5 minutos. Al final conocerás tu afinidad con la carrera y el ADN profesional que posees. No hay respuestas buenas ni malas: responde con honestidad para descubrir el camino que más te apasiona.',
    button: 'Empezar',
    meta: '5 secciones · 30 afirmaciones · 5 minutos',
  },

  // Indicación que se repite arriba de cada sección.
  scaleHint: 'Califica del 1 al 4 qué tanto te describe cada afirmación.',
  scaleLegend: SCALE,

  sections,
  questions: sections.flatMap((s) => s.questions),

  scoring: { type: 'sections' },

  // Nivel según el puntaje total (0–90).
  outcomes: [
    {
      id: 'exploracion_inicial',
      min: 0,
      max: 30,
      title: 'Exploración inicial',
      description:
        'Sientes curiosidad, pero aún estás descubriendo si este es tu propósito. Conocer las bases y las realidades del día a día en esta área te ayudará a tomar una decisión informada.',
    },
    {
      id: 'perfil_bien_alineado',
      min: 31,
      max: 61,
      title: 'Perfil bien alineado',
      description:
        'Tus respuestas reflejan afinidad con los retos y dinámicas del entorno internacional. La formación profesional fortalecerá tus competencias estratégicas.',
    },
    {
      id: 'perfil_sobresaliente',
      min: 62,
      max: 90,
      title: 'Perfil sobresaliente',
      description:
        'Tus respuestas reflejan un perfil altamente alineado con Comercio Internacional. Cuentas con mentalidad estratégica, curiosidad global y capacidad de adaptación, competencias clave para esta carrera.',
    },
  ],

  // ADN profesional: gana el mejor promedio de sus secciones. En empate gana el primero de la lista.
  profiles: [
    {
      id: 'estratega_mercado',
      title: 'Estratega de mercado',
      sections: ['seccion_1', 'seccion_2'],
      description:
        'Te motiva entender el "porqué" de las cosas y diseñar planes estratégicos, por lo que puedes destacar en analizar tendencias mundiales, conocer el rumbo de la empresa y fortalecer tu capacidad de ejecución para que todas tus ideas logren concretarse.',
    },
    {
      id: 'operador_global',
      title: 'Operador global',
      sections: ['seccion_3'],
      description:
        'La eficiencia y el orden son tus principales motivadores, lo que te puede llevar a gestionar cadenas de suministro complejas para asegurar la correcta distribución de los productos, así como fortalecer la visión estratégica a largo plazo.',
    },
    {
      id: 'negociador_internacional',
      title: 'Negociador internacional',
      sections: ['seccion_4'],
      description:
        'Tu principal motivador es crear conexiones humanas y cerrar tratos que beneficien a todas las partes, por lo que puedes desenvolverte fácilmente al abrir nuevos mercados y oportunidades.',
    },
    {
      id: 'solucionador_global',
      title: 'Solucionador global',
      sections: ['seccion_5'],
      description:
        'Resolver problemas complejos en tiempo real y moverte en entornos donde nada es estático son tus principales motivadores, por lo que puedes destacar en roles de gestión de crisis, consultoría internacional o dirección de proyectos.',
    },
  ],

  result: {
    profileLabel: 'Tu ADN profesional',
    cta: {
      label: 'Conoce la carrera',
      url: 'https://universidad.tecmilenio.mx/licenciatura-en-comercio-y-negocios-internacionales',
    },
  },

  lead: {
    title: 'Antes de ver tus resultados, compártenos tus datos',
    description: 'Te mostraremos tu nivel de afinidad con la carrera y tu ADN profesional.',
    disclaimer:
      'Este test orienta tus intereses; no es una evaluación vocacional ni garantiza el desempeño profesional.',
    submit: 'Ver mis resultados',
    fields: [
      { name: 'firstname', label: 'Nombre', type: 'text', required: true, autocomplete: 'given-name' },
      { name: 'lastname', label: 'Apellidos', type: 'text', required: true, autocomplete: 'family-name' },
      { name: 'email', label: 'Correo electrónico', type: 'email', required: true, autocomplete: 'email' },
      { name: 'phone', label: 'Teléfono', type: 'tel', required: false, autocomplete: 'tel', placeholder: '+52 55 1234 5678' },
      { name: 'campus', label: '¿Cuál es tu campus de interés?', type: 'text', required: false },
    ],
    privacy: {
      label: 'He leído y acepto el',
      linkText: 'Aviso de Privacidad para Prospectos',
      url: 'https://www.tecmilenio.mx/es/aviso-de-privacidad/alumno-prospecto',
    },
    optin: { label: 'Quiero recibir información y contenidos de Tecmilenio.' },
  },

  hidden: ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'audience_origin', 'content_origin', 'quiz_version'],

  // Por confirmar con Tecmilenio: se copiaron de LM #4 (el Typeform de LM #2 no los tenía).
  constants: {
    origen: 'Campañas de Marketing Digital',
    medio1: 'Lead Magnet',
    detalle_origen: 'Otro (223)',
  },

  hubspot: {
    portalId: null,
    formGuid: null,
    subscriptionTypeId: null,
    labels: {
      outcome: 'Quiz Comercio Global: nivel de afinidad',
      profile: 'Quiz Comercio Global: ADN profesional',
      scores: 'Quiz LM2: puntajes por sección',
    },
    properties: {
      firstname: 'firstname',
      lastname: 'lastname',
      email: 'email',
      phone: 'phone',
      campus: 'campus_de_interes',
      outcome: 'quiz_comercio_global_nivel',
      profile: 'quiz_comercio_global_perfil',
      scores: 'quiz_lm2_puntajes',
      quiz: 'quiz_lead_magnet',
      optin: 'acepta_comunicaciones_tecmilenio',
      utm_source: 'utm_source',
      utm_medium: 'utm_medium',
      utm_campaign: 'utm_campaign',
      utm_content: 'utm_content',
      audience_origin: 'audience_origin',
      content_origin: 'content_origin',
      quiz_version: 'quiz_version',
      origen: 'origen',
      medio1: 'medio1',
      detalle_origen: 'detalle_origen',
    },
  },
};
