// LM #3 — Descubre qué ruta es para ti (Comercio y Negocios Internacionales).
// Réplica del Typeform mrFhCa7Y con las correcciones de la auditoría del 06-oct-2026:
//   - el resultado ya no está invertido: gana la ruta con más respuestas (en Typeform,
//     quien contestaba 7/7 hacia logística recibía "Negocios Internacionales");
//   - en las preguntas 3 y 5 se corrigieron dos opciones que sumaban a la ruta contraria;
//   - opciones como botones en vez de dropdown, en orden aleatorio;
//   - el botón final lleva a la carrera (no tenía URL);
//   - se agregan aviso de privacidad, opt-in y UTMs como en LM #4.

const N = 'negocios_internacionales';
const L = 'logistica';

export default {
  id: 'lm3',
  version: 'lm3-cf-v1',
  name: 'LM #3 - Descubre qué ruta es para ti',

  welcome: {
    title: 'Descubre tu ruta en la Lic. en Comercio y Negocios Internacionales',
    description:
      'Realiza el test y en menos de 5 minutos descubre qué enfoque de la carrera va más contigo: Negocios Internacionales o Logística.',
    button: 'Iniciar test',
  },

  outcomes: [
    {
      id: N,
      crmLabel: 'Negocios Internacionales',
      title: 'Tu ruta va enfocada hacia Negocios Internacionales',
      description:
        'Tus respuestas muestran que te interesa el lado estratégico del mundo de los negocios. Te llama la atención entender cómo crecen las empresas, detectar oportunidades y tomar decisiones que impactan en distintos mercados.\n\nUna ruta enfocada en Negocios Internacionales puede ayudarte a desarrollar tu perfil profesional y prepararte para un entorno global.',
    },
    {
      id: L,
      crmLabel: 'Logística y Cadena de Suministro',
      title: 'Tu ruta va enfocada a Logística',
      description:
        'Tus respuestas demuestran que te interesa cómo funcionan las cosas detrás del comercio internacional. Te enfocas en la organización, los procesos y en lograr que todo se ejecute de forma correcta.\n\nUna ruta enfocada en Logística y Cadena de Suministro puede ayudarte a desarrollar ese perfil profesional y llevarlo a otro nivel.',
    },
  ],

  // Son 7 preguntas de una sola respuesta: no puede haber empate. Se deja la regla por si cambia.
  scoring: { type: 'classification', tiebreak: ['q7'] },

  result: {
    cta: {
      label: 'Explora tu ruta',
      url: 'https://universidad.tecmilenio.mx/licenciatura-en-comercio-y-negocios-internacionales',
    },
  },

  questions: [
    {
      id: 'q1',
      title: '¿Qué te llama más la atención del comercio y los negocios internacionales?',
      type: 'single',
      randomize: true,
      options: [
        { id: 'q1_n1', label: 'Entender cómo crecen las empresas en otros países', outcome: N },
        { id: 'q1_n2', label: 'Identificar oportunidades en mercados internacionales', outcome: N },
        { id: 'q1_l1', label: 'Ver cómo los productos llegan de un país a otro', outcome: L },
        { id: 'q1_l2', label: 'Entender cómo se coordinan transportes, rutas y entregas', outcome: L },
      ],
    },
    {
      id: 'q2',
      title: 'En un proyecto, ¿qué tarea te gusta hacer más?',
      type: 'single',
      randomize: true,
      options: [
        { id: 'q2_n1', label: 'Proponer ideas y definir hacia dónde ir', outcome: N },
        { id: 'q2_n2', label: 'Analizar opciones antes de tomar decisiones', outcome: N },
        { id: 'q2_l1', label: 'Organizar cómo se va a ejecutar', outcome: L },
        { id: 'q2_l2', label: 'Asegurar que todo salga bien y a tiempo', outcome: L },
      ],
    },
    {
      id: 'q3',
      title: '¿Qué tipo de desafíos disfrutas más resolver?',
      type: 'single',
      randomize: true,
      options: [
        { id: 'q3_n1', label: 'Detectar oportunidades de crecimiento en un negocio', outcome: N },
        { id: 'q3_n2', label: 'Mejorar resultados y estrategias de un negocio', outcome: N },
        { id: 'q3_l1', label: 'Resolver problemas en procesos y operaciones', outcome: L },
        { id: 'q3_l2', label: 'Coordinar la entrega eficiente de productos o servicios', outcome: L },
      ],
    },
    {
      id: 'q4',
      title: '¿Qué te parece más interesante?',
      type: 'single',
      randomize: true,
      options: [
        { id: 'q4_n1', label: 'Analizar mercados y tendencias globales', outcome: N },
        { id: 'q4_n2', label: 'Entender cómo funcionan las empresas a nivel global', outcome: N },
        { id: 'q4_l1', label: 'Optimizar tiempos, rutas o recursos', outcome: L },
        { id: 'q4_l2', label: 'Coordinar procesos para que todo funcione correctamente', outcome: L },
      ],
    },
    {
      id: 'q5',
      title: 'Si trabajaras en una empresa internacional, preferirías:',
      type: 'single',
      randomize: true,
      options: [
        { id: 'q5_n1', label: 'Representarla frente a clientes o socios', outcome: N },
        { id: 'q5_n2', label: 'Participar en la toma de decisiones estratégicas', outcome: N },
        { id: 'q5_l1', label: 'Coordinar operaciones internas y asegurar que todo funcione correctamente', outcome: L },
        { id: 'q5_l2', label: 'Gestionar la logística de productos, tiempos y entregas', outcome: L },
      ],
    },
    {
      id: 'q6',
      title: '¿Qué disfrutas más en tu día a día?',
      type: 'single',
      randomize: true,
      options: [
        { id: 'q6_n1', label: 'Hablar con personas y generar ideas', outcome: N },
        { id: 'q6_n2', label: 'Analizar información para tomar decisiones', outcome: N },
        { id: 'q6_l1', label: 'Organizar tareas y procesos', outcome: L },
        { id: 'q6_l2', label: 'Dar seguimiento a actividades para que todo avance correctamente', outcome: L },
      ],
    },
    {
      id: 'q7',
      title: '¿Cómo te gusta ver los resultados de tu trabajo?',
      type: 'single',
      randomize: true,
      options: [
        { id: 'q7_n1', label: 'En crecimiento, expansión o nuevas oportunidades', outcome: N },
        { id: 'q7_n2', label: 'En decisiones que generan impacto', outcome: N },
        { id: 'q7_l1', label: 'En procesos que funcionan mejor y sin errores', outcome: L },
        { id: 'q7_l2', label: 'En operaciones más organizadas y eficientes', outcome: L },
      ],
    },
  ],

  lead: {
    title: 'Antes de ver tu resultado, compártenos tus datos',
    description: 'Te mostraremos qué enfoque de la carrera va más contigo.',
    disclaimer:
      'Este test orienta tus intereses; no es una evaluación vocacional ni garantiza el desempeño profesional.',
    submit: 'Ver mi resultado',
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

  // Por confirmar con Tecmilenio: se copiaron de LM #4 (el Typeform de LM #3 no los tenía).
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
      outcome: 'Quiz: ruta en Comercio y Negocios Internacionales',
      scores: 'Quiz LM3: puntajes por ruta',
    },
    properties: {
      firstname: 'firstname',
      lastname: 'lastname',
      email: 'email',
      phone: 'phone',
      campus: 'campus_de_interes',
      outcome: 'quiz_ruta_comercio_internacional',
      scores: 'quiz_lm3_puntajes',
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
