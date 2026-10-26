// LM #4 — Descubre qué ruta de Mercadotecnia va contigo.
// Réplica del Typeform szAZJReD con las correcciones de la auditoría del 06-oct-2026:
// sin bloque de contacto duplicado, etiquetas en español, opciones en orden aleatorio
// y desempate explícito.
// 26-oct-2026: la pregunta 7 ya no suma puntos, solo desempata (antes contaba doble).

export default {
  id: 'lm4',
  version: 'lm4-cf-v1',
  name: 'LM #4 - Descubre qué ruta de Mercadotecnia va contigo',

  welcome: {
    title: 'Descubre qué ruta de Mercadotecnia va contigo',
    description:
      'Responde siete preguntas y encuentra el área de Mercadotecnia que mejor se relaciona con tus intereses. Solo te tomará de 2 a 3 minutos.',
    button: 'Comenzar',
  },

  // Cada opción suma 1 punto a su ruta, salvo la pregunta 7, que vale 0 y solo desempata.
  // Gana la ruta con más puntos.
  outcomes: [
    {
      id: 'ventas_estrategicas',
      title: 'Tu ruta: Gestión de ventas estratégicas',
      description:
        'Te motiva conectar con personas, negociar y convertir oportunidades en resultados.',
    },
    {
      id: 'inteligencia_mercados',
      title: 'Tu ruta: Inteligencia de mercados',
      description:
        'Te interesa descubrir patrones, entender a los consumidores y convertir información en decisiones.',
    },
    {
      id: 'buscadores_ecommerce',
      title: 'Tu ruta: Buscadores y comercio electrónico',
      description:
        'Te atraen los entornos digitales y mejorar cómo las marcas conectan y venden en línea.',
    },
    {
      id: 'estrategia_publicitaria',
      title: 'Tu ruta: Estrategia publicitaria',
      description:
        'Disfrutas transformar ideas en mensajes y campañas que conectan con las personas.',
    },
  ],

  scoring: {
    type: 'classification',
    // En empate decide la respuesta de la última pregunta ("si hoy tuvieras que
    // elegir"); si sigue empatado, la primera. Typeform no tenía regla explícita.
    // La q7 solo desempata: sus opciones valen 0 puntos y no suman a ninguna ruta.
    tiebreak: ['q7', 'q1'],
  },

  result: {
    note: 'Te enviamos por correo el detalle de tu perfil.',
    cta: {
      label: 'Conoce más de la carrera',
      url: 'https://universidad.tecmilenio.mx/licenciatura-en-mercadotecnia',
    },
  },

  questions: [
    {
      id: 'q1',
      title: '¿Qué te gustaría lograr en un proyecto de Mercadotecnia?',
      type: 'single',
      randomize: true,
      options: [
        { id: 'q1_v', label: 'Convertir oportunidades en ventas y relaciones duraderas', outcome: 'ventas_estrategicas' },
        { id: 'q1_m', label: 'Descubrir qué piensan y necesitan los consumidores', outcome: 'inteligencia_mercados' },
        { id: 'q1_b', label: 'Hacer crecer una marca en buscadores y tiendas en línea', outcome: 'buscadores_ecommerce' },
        { id: 'q1_p', label: 'Crear una campaña que conecte y sea recordada', outcome: 'estrategia_publicitaria' },
      ],
    },
    {
      id: 'q2',
      title: '¿En qué actividades te visualizas?',
      hint: 'Elige hasta dos.',
      type: 'multi',
      min: 1,
      max: 2,
      randomize: true,
      options: [
        { id: 'q2_v', label: 'Negociar y construir relaciones comerciales', outcome: 'ventas_estrategicas' },
        { id: 'q2_m', label: 'Analizar información de consumidores', outcome: 'inteligencia_mercados' },
        { id: 'q2_b', label: 'Optimizar campañas y experiencias digitales', outcome: 'buscadores_ecommerce' },
        { id: 'q2_p', label: 'Transformar ideas en mensajes y campañas', outcome: 'estrategia_publicitaria' },
      ],
    },
    {
      id: 'q3',
      title: 'Una marca lanzará un nuevo producto. ¿Qué harías primero?',
      type: 'single',
      randomize: true,
      options: [
        { id: 'q3_v', label: 'Definir metas comerciales y cómo acercarnos a clientes clave', outcome: 'ventas_estrategicas' },
        { id: 'q3_m', label: 'Investigar al público y revisar los datos disponibles', outcome: 'inteligencia_mercados' },
        { id: 'q3_b', label: 'Identificar búsquedas, canales digitales y oportunidades de venta en línea', outcome: 'buscadores_ecommerce' },
        { id: 'q3_p', label: 'Crear el concepto y el mensaje central de la campaña', outcome: 'estrategia_publicitaria' },
      ],
    },
    {
      id: 'q4',
      title: '¿Qué habilidad reconocen más en ti?',
      type: 'single',
      randomize: true,
      options: [
        { id: 'q4_v', label: 'Comunicación y negociación', outcome: 'ventas_estrategicas' },
        { id: 'q4_m', label: 'Análisis y curiosidad', outcome: 'inteligencia_mercados' },
        { id: 'q4_b', label: 'Facilidad para aprender herramientas digitales', outcome: 'buscadores_ecommerce' },
        { id: 'q4_p', label: 'Creatividad y capacidad para contar historias', outcome: 'estrategia_publicitaria' },
      ],
    },
    {
      id: 'q5',
      title: '¿En qué tipo de entorno te sentirías más a gusto?',
      type: 'single',
      randomize: true,
      options: [
        { id: 'q5_v', label: 'Conversando con clientes y coordinando objetivos', outcome: 'ventas_estrategicas' },
        { id: 'q5_m', label: 'Investigando patrones para tomar decisiones', outcome: 'inteligencia_mercados' },
        { id: 'q5_b', label: 'Probando y mejorando experiencias en plataformas digitales', outcome: 'buscadores_ecommerce' },
        { id: 'q5_p', label: 'Desarrollando ideas con equipos creativos', outcome: 'estrategia_publicitaria' },
      ],
    },
    {
      id: 'q6',
      title: 'En tres años, ¿qué te gustaría estar haciendo?',
      type: 'single',
      randomize: true,
      options: [
        { id: 'q6_v', label: 'Liderando cuentas, negociaciones o equipos comerciales', outcome: 'ventas_estrategicas' },
        { id: 'q6_m', label: 'Presentando hallazgos que ayuden a una marca a decidir', outcome: 'inteligencia_mercados' },
        { id: 'q6_b', label: 'Impulsando crecimiento digital y ventas en línea', outcome: 'buscadores_ecommerce' },
        { id: 'q6_p', label: 'Creando campañas, conceptos y experiencias de marca', outcome: 'estrategia_publicitaria' },
      ],
    },
    {
      id: 'q7',
      title: 'Si hoy tuvieras que elegir, ¿qué te entusiasma más?',
      // Solo desempata (scoring.tiebreak): por eso sus opciones valen 0 puntos.
      type: 'single',
      randomize: true,
      options: [
        { id: 'q7_v', label: 'Cerrar una oportunidad y construir una relación comercial', outcome: 'ventas_estrategicas', points: 0 },
        { id: 'q7_m', label: 'Encontrar un insight que cambie una decisión', outcome: 'inteligencia_mercados', points: 0 },
        { id: 'q7_b', label: 'Mejorar el desempeño de un canal digital', outcome: 'buscadores_ecommerce', points: 0 },
        { id: 'q7_p', label: 'Crear una campaña que conecte con las personas', outcome: 'estrategia_publicitaria', points: 0 },
      ],
    },
  ],

  lead: {
    title: 'Tu resultado está listo',
    description:
      'Déjanos tus datos para conocer tu resultado y recibir por correo tu perfil completo con habilidades relacionadas, ejemplos de roles y cómo se vive esta ruta en la carrera.',
    disclaimer:
      'Este quiz orienta tus intereses; no es una evaluación vocacional ni garantiza el desempeño profesional.',
    submit: 'Ver mi resultado',
    // `name` es la clave lógica; el nombre interno en HubSpot sale de hubspot.properties.
    fields: [
      { name: 'firstname', label: 'Nombre', type: 'text', required: true, autocomplete: 'given-name' },
      { name: 'lastname', label: 'Apellidos', type: 'text', required: false, autocomplete: 'family-name' },
      { name: 'email', label: 'Correo electrónico', type: 'email', required: true, autocomplete: 'email' },
      { name: 'phone', label: 'Teléfono', type: 'tel', required: false, autocomplete: 'tel', placeholder: '+52 55 1234 5678' },
      { name: 'campus', label: '¿Cuál es tu campus de interés?', type: 'text', required: false },
    ],
    privacy: {
      label: 'He leído y acepto el',
      linkText: 'Aviso de Privacidad para Prospectos',
      url: 'https://www.tecmilenio.mx/es/aviso-de-privacidad/alumno-prospecto',
    },
    optin: {
      label: 'Quiero recibir información y contenidos de Tecmilenio.',
    },
  },

  // Parámetros que se leen de la URL y viajan al CRM.
  hidden: ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'audience_origin', 'content_origin', 'quiz_version'],

  // Valores fijos de atribución (eran variables en el Typeform).
  constants: {
    origen: 'Campañas de Marketing Digital',
    medio1: 'Lead Magnet',
    detalle_origen: 'Otro (223)',
  },

  hubspot: {
    // Se llenan después de correr `npm run setup:hubspot -- --apply`.
    // No son secretos: van en cualquier embed de formulario de HubSpot.
    portalId: null,
    formGuid: null,
    // ID del tipo de suscripción para el opt-in, si el portal usa consentimiento GDPR.
    subscriptionTypeId: null,
    labels: {
      outcome: 'Quiz: ruta de Mercadotecnia',
      scores: 'Quiz LM4: puntajes por ruta',
    },
    // Clave lógica -> nombre interno de la propiedad de contacto.
    properties: {
      firstname: 'firstname',
      lastname: 'lastname',
      email: 'email',
      phone: 'phone',
      campus: 'campus_de_interes',
      outcome: 'quiz_ruta_mercadotecnia',
      scores: 'quiz_lm4_puntajes',
      quiz: 'quiz_lead_magnet',
      optin: 'acepta_comunicaciones_tecmilenio',
      utm_source: 'utm_source',
      utm_medium: 'utm_medium',
      utm_campaign: 'utm_campaign',
      utm_content: 'utm_content',
      audience_origin: 'audience_origin',
      content_origin: 'content_origin',
      quiz_version: 'quiz_version',
      // Por confirmar contra el portal de Tecmilenio: probablemente ya existen.
      origen: 'origen',
      medio1: 'medio1',
      detalle_origen: 'detalle_origen',
    },
  },
};
