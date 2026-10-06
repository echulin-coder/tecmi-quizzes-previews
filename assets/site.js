// Configuración pública del sitio (no va nada secreto aquí).
export default {
  // Modo revisión (GitHub Pages): el formulario valida pero no envía nada y se muestra un aviso.
  // Lo activa scripts/build-preview.mjs; en Cloudflare va en false.
  demo: true,
  // Site key de Cloudflare Turnstile. La secret va como variable TURNSTILE_SECRET en Pages.
  turnstileSiteKey: null,
  // Portal de HubSpot para cargar el código de seguimiento (cookie hubspotutk).
  hubspotTrackingPortalId: null,
  // Contenedor de Google Tag Manager, si Tecmilenio quiere medir en GA4.
  gtmId: null,
};
