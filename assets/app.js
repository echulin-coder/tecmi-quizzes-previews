// Motor del quiz en el navegador: pantallas, respuestas, captura y envío.
import site from './site.js';
import { scoreQuiz, picked } from './core/scoring.js';
import { validateQuestion, validateLead } from './core/validate.js';

const root = document.getElementById('quiz');
const quizId = root.dataset.quiz;
const { default: quiz } = await import(`../quizzes/${quizId}.js`);

const KEYS = 'ABCDEFGHIJ';
const STORE = `quiz:${quiz.id}`;

// Pasos del quiz: una sección con varias preguntas (LM #2) o una pregunta por pantalla.
const steps = quiz.sections ?? quiz.questions.map((q) => ({ id: q.id, questions: [q] }));

// ---------- utilidades ----------

function h(tag, attrs = {}, ...children) {
  const el = document.createElement(tag);
  for (const [key, value] of Object.entries(attrs)) {
    if (value == null || value === false) continue;
    if (key.startsWith('on')) el.addEventListener(key.slice(2), value);
    else if (key === 'class') el.className = value;
    else el.setAttribute(key, value === true ? '' : value);
  }
  for (const child of children.flat()) {
    if (child == null || child === false) continue;
    el.append(child instanceof Node ? child : document.createTextNode(child));
  }
  return el;
}

// Texto con párrafos separados por línea en blanco.
function paragraphs(text, cls = 'lead-text') {
  return String(text ?? '')
    .split(/\n{2,}/)
    .filter(Boolean)
    .map((p) => h('p', { class: cls }, p));
}

function track(event, data = {}) {
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({ event, quiz_id: quiz.id, quiz_version: quiz.version, ...data });
}

function load(key, fallback) {
  try {
    return JSON.parse(sessionStorage.getItem(`${STORE}:${key}`)) ?? fallback;
  } catch {
    return fallback;
  }
}

function save(key, value) {
  try {
    sessionStorage.setItem(`${STORE}:${key}`, JSON.stringify(value));
  } catch {
    /* almacenamiento bloqueado: el quiz sigue funcionando sin persistir */
  }
}

function forget(key) {
  try {
    sessionStorage.removeItem(`${STORE}:${key}`);
  } catch {
    /* sin almacenamiento */
  }
}

function shuffle(list) {
  const copy = [...list];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

function cookie(name) {
  return document.cookie.split('; ').find((c) => c.startsWith(`${name}=`))?.split('=')[1];
}

// ---------- tema ----------

const THEME_VARS = { accent: '--c-accent', accentHover: '--c-accent-hover', accentSoft: '--c-accent-soft', question: '--c-question', font: '--font' };
for (const [key, cssVar] of Object.entries(THEME_VARS)) {
  if (quiz.theme?.[key]) document.documentElement.style.setProperty(cssVar, quiz.theme[key]);
}

// ---------- estado ----------

// Parámetros ocultos: lo que trae la URL gana sobre lo guardado en la sesión.
const params = new URLSearchParams(location.search);
const hidden = load('hidden', {});
for (const key of quiz.hidden ?? []) if (params.get(key)) hidden[key] = params.get(key).slice(0, 250);
save('hidden', hidden);

// Orden de opciones fijo durante la sesión para que "Atrás" no las revuelva.
const order = load('order', {});
for (const q of quiz.questions) {
  const ids = q.options.map((o) => o.id);
  const valid = order[q.id]?.length === ids.length && ids.every((id) => order[q.id].includes(id));
  if (!valid) order[q.id] = q.randomize ? shuffle(ids) : ids;
}
save('order', order);

const state = {
  screen: 'welcome', // welcome | step | lead | result
  index: 0,
  answers: load('answers', {}),
  lead: { optin: false, privacy: false },
};

// ---------- integraciones opcionales ----------

let turnstileWidget = null;
function loadScript(src) {
  const s = document.createElement('script');
  s.src = src;
  s.async = true;
  document.head.append(s);
}
if (site.hubspotTrackingPortalId) loadScript(`https://js.hs-scripts.com/${site.hubspotTrackingPortalId}.js`);
if (site.gtmId) {
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({ 'gtm.start': Date.now(), event: 'gtm.js' });
  loadScript(`https://www.googletagmanager.com/gtm.js?id=${site.gtmId}`);
}
if (site.turnstileSiteKey && quiz.lead) loadScript('https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit');

// ---------- render ----------

const progressBar = h('div', { class: 'progress__bar' });
const progress = h('div', { class: 'progress', role: 'progressbar', 'aria-label': 'Avance del quiz', 'aria-valuemin': 0, 'aria-valuemax': 100 }, progressBar);
const stage = h('div', { class: 'stage' });
const demoBanner = site.demo && h('p', { class: 'demo-banner', role: 'note' },
  'Versión de revisión: puedes contestar todo; los datos no se envían ni se guardan.');
root.replaceChildren(...[demoBanner, progress, stage].filter(Boolean));

function setProgress() {
  const total = steps.length + (quiz.lead ? 1 : 0);
  const done = { welcome: 0, step: state.index, lead: steps.length, result: total }[state.screen];
  const pct = Math.round((done / total) * 100);
  progressBar.style.width = `${pct}%`;
  progress.setAttribute('aria-valuenow', pct);
}

function show(screen) {
  stage.replaceChildren(screen);
  setProgress();
  screen.classList.add('screen--in');
  const focusTarget = screen.querySelector('[data-autofocus]') ?? screen.querySelector('h1, h2');
  focusTarget?.focus({ preventScroll: true });
  window.scrollTo({ top: 0 });
}

function render() {
  if (state.screen === 'welcome') show(renderWelcome());
  if (state.screen === 'step') {
    const step = steps[state.index];
    show(step.questions.length === 1 && !step.title ? renderQuestion(step.questions[0]) : renderSection(step));
  }
  if (state.screen === 'lead') show(renderLead());
  if (state.screen === 'result') show(renderResult());
}

function go(screen, index = state.index) {
  state.screen = screen;
  state.index = index;
  render();
}

function back() {
  if (state.index === 0) go('welcome');
  else go('step', state.index - 1);
}

// Avanza al siguiente paso; al terminar va a los datos o, si el quiz no captura, al resultado.
function advance() {
  if (state.index < steps.length - 1) return go('step', state.index + 1);
  if (quiz.lead) {
    track('quiz_lead_form_view');
    return go('lead');
  }
  track('quiz_complete', { outcome: scoreQuiz(quiz, state.answers).outcome.id });
  go('result');
}

function saveAnswer(question, optionId, checked) {
  let current = picked(state.answers, question.id);
  if (question.type === 'multi') {
    current = checked ? [...new Set([...current, optionId])] : current.filter((id) => id !== optionId);
    if (current.length > (question.max ?? Infinity)) return false;
    state.answers[question.id] = current;
  } else {
    state.answers[question.id] = optionId;
  }
  save('answers', state.answers);
  return true;
}

function renderWelcome() {
  const { welcome } = quiz;
  return h('section', { class: 'screen screen--welcome' },
    h('h1', { tabindex: -1 }, welcome.title),
    paragraphs(welcome.description),
    h('button', {
      class: 'btn btn--primary', type: 'button', 'data-autofocus': true,
      onclick: () => { track('quiz_start'); go('step', 0); },
    }, welcome.button),
    h('p', { class: 'meta' }, welcome.meta ?? `${quiz.questions.length} preguntas · 2 a 3 minutos`),
  );
}

function stepCount() {
  return quiz.sections ? `Sección ${state.index + 1} de ${steps.length}` : `Pregunta ${state.index + 1} de ${steps.length}`;
}

function navButtons(isLast) {
  return h('div', { class: 'nav' },
    h('button', { class: 'btn btn--ghost', type: 'button', onclick: back }, 'Atrás'),
    h('button', { class: 'btn btn--primary', type: 'submit' }, isLast && !quiz.lead ? 'Ver mi resultado' : isLast ? 'Continuar' : 'Siguiente'),
  );
}

// Una pregunta por pantalla (opción única o múltiple).
function renderQuestion(question) {
  const multi = question.type === 'multi';
  const options = order[question.id].map((id) => question.options.find((o) => o.id === id));
  const error = h('p', { class: 'error', role: 'alert' });
  const isLast = state.index === steps.length - 1;
  let advancing = false;

  const next = () => {
    const problem = validateQuestion(question, state.answers);
    if (problem) {
      error.textContent = problem;
      advancing = false;
      return;
    }
    track('quiz_answer', { question_id: question.id, question_number: state.index + 1 });
    advance();
  };

  const inputs = [];
  const list = h('div', { class: 'options' },
    options.map((option, i) => {
      const input = h('input', {
        type: multi ? 'checkbox' : 'radio',
        name: question.id,
        value: option.id,
        class: 'option__input',
        checked: picked(state.answers, question.id).includes(option.id),
        onchange: (e) => {
          if (!saveAnswer(question, option.id, e.target.checked)) e.target.checked = false;
          error.textContent = '';
          syncLimit();
          // Avance automático en opción única; el candado evita saltarse una pregunta con doble clic.
          if (!multi && !advancing) {
            advancing = true;
            setTimeout(next, 280);
          }
        },
      });
      inputs.push(input);
      return h('label', { class: 'option' },
        input,
        h('span', { class: 'option__key', 'aria-hidden': 'true' }, KEYS[i]),
        h('span', { class: 'option__text' }, option.label),
      );
    }),
  );

  // En opción múltiple se deshabilitan las restantes al llegar al máximo.
  function syncLimit() {
    if (!multi || !question.max) return;
    const full = picked(state.answers, question.id).length >= question.max;
    for (const input of inputs) input.disabled = full && !input.checked;
  }
  syncLimit();

  const body = h('div', { class: 'question' },
    h('p', { class: 'eyebrow' }, stepCount()),
    h('fieldset', {},
      h('legend', {}, h('h2', { tabindex: -1 }, question.title)),
      question.hint && h('p', { class: 'hint' }, question.hint),
      list,
    ),
    error,
    navButtons(isLast),
    h('p', { class: 'meta meta--keys' }, 'Tip: puedes responder con las teclas ', h('kbd', {}, 'A'), '–', h('kbd', {}, KEYS[inputs.length - 1]), '.'),
  );

  const form = h('form', {
    class: `screen screen--question${question.image ? ' screen--media' : ''}`, novalidate: true,
    onsubmit: (e) => { e.preventDefault(); next(); },
    onkeydown: (e) => {
      const i = KEYS.indexOf(e.key.toUpperCase());
      if (e.ctrlKey || e.metaKey || e.altKey || i < 0 || i >= inputs.length || inputs[i].disabled) return;
      e.preventDefault();
      inputs[i].click();
    },
  },
    question.image && h('div', { class: 'media' }, h('img', { src: question.image, alt: '', loading: 'eager', decoding: 'async' })),
    body,
  );
  // El foco inicial va a la opción marcada o a la primera.
  (inputs.find((i) => i.checked) ?? inputs[0]).setAttribute('data-autofocus', '');
  return form;
}

// Varias afirmaciones con escala en una pantalla (LM #2).
function renderSection(step) {
  const isLast = state.index === steps.length - 1;
  const error = h('p', { class: 'error', role: 'alert' });
  const rows = new Map();
  const missingQuestions = () => step.questions.filter((q) => validateQuestion(q, state.answers));
  const missingText = (n) => (n === 0 ? '' : n === 1 ? 'Te falta 1 afirmación por calificar.' : `Te faltan ${n} afirmaciones por calificar.`);

  const items = step.questions.map((question, qi) => {
    const legendId = `${question.id}-legend`;
    const row = h('fieldset', { class: 'scale' },
      h('legend', { id: legendId, class: 'scale__text' }, h('span', { class: 'scale__num' }, `${qi + 1}.`), ' ', question.title),
      h('div', { class: 'scale__options' },
        question.options.map((option) => h('label', { class: 'scale__option', title: option.label },
          h('input', {
            type: 'radio',
            name: question.id,
            value: option.id,
            class: 'option__input',
            'aria-label': `${option.short}: ${option.label}`,
            checked: picked(state.answers, question.id).includes(option.id),
            onchange: () => {
              saveAnswer(question, option.id, true);
              row.classList.remove('scale--missing');
              // Si ya se mostró el aviso, el conteo se actualiza con cada respuesta.
              if (error.textContent) error.textContent = missingText(missingQuestions().length);
            },
          }),
          h('span', { class: 'scale__value', 'aria-hidden': 'true' }, option.short),
          h('span', { class: 'scale__label', 'aria-hidden': 'true' }, option.label),
        )),
      ),
    );
    rows.set(question.id, row);
    return row;
  });

  const next = () => {
    const missing = missingQuestions();
    for (const [id, row] of rows) row.classList.toggle('scale--missing', missing.some((q) => q.id === id));
    if (missing.length) {
      error.textContent = missingText(missing.length);
      rows.get(missing[0].id).querySelector('input').focus();
      rows.get(missing[0].id).scrollIntoView({ block: 'center', behavior: 'smooth' });
      return;
    }
    track('quiz_answer', { question_id: step.id, question_number: state.index + 1 });
    advance();
  };

  return h('form', { class: 'screen screen--section', novalidate: true, onsubmit: (e) => { e.preventDefault(); next(); } },
    h('p', { class: 'eyebrow' }, stepCount()),
    h('h2', { tabindex: -1 }, step.title),
    step.description && h('p', { class: 'lead-text' }, step.description),
    quiz.scaleHint && h('div', { class: 'scale-legend' },
      h('p', {}, quiz.scaleHint),
      h('ol', {}, (quiz.scaleLegend ?? []).map((s) => h('li', {}, h('strong', {}, String(s.value)), ` ${s.label}`))),
    ),
    items,
    error,
    navButtons(isLast),
  );
}

function renderLead() {
  const { lead } = quiz;
  const errors = {};
  const status = h('p', { class: 'error', role: 'alert' });

  const fieldEls = lead.fields.map((field) => {
    const id = `f-${field.name}`;
    const error = h('p', { class: 'field__error', id: `${id}-err` });
    errors[field.name] = error;
    const input = h('input', {
      id, name: field.name, type: field.type, required: field.required,
      autocomplete: field.autocomplete, placeholder: field.placeholder,
      maxlength: 200, value: state.lead[field.name] ?? '',
      'aria-describedby': `${id}-err`,
      inputmode: field.type === 'tel' ? 'tel' : undefined,
      oninput: (e) => { state.lead[field.name] = e.target.value; error.textContent = ''; },
    });
    return h('div', { class: 'field' },
      h('label', { for: id }, field.label, field.required ? h('span', { class: 'req', 'aria-hidden': 'true' }, ' *') : h('span', { class: 'opt' }, ' (opcional)')),
      input,
      error,
    );
  });
  fieldEls[0].querySelector('input').setAttribute('data-autofocus', '');

  const privacyErr = h('p', { class: 'field__error', id: 'privacy-err' });
  errors.privacy = privacyErr;
  const privacy = h('div', { class: 'check' },
    h('input', {
      id: 'f-privacy', type: 'checkbox', checked: state.lead.privacy, 'aria-describedby': 'privacy-err',
      onchange: (e) => { state.lead.privacy = e.target.checked; privacyErr.textContent = ''; },
    }),
    h('label', { for: 'f-privacy' }, `${lead.privacy.label} `,
      h('a', { href: lead.privacy.url, target: '_blank', rel: 'noopener' }, lead.privacy.linkText), '.', h('span', { class: 'req', 'aria-hidden': 'true' }, ' *')),
  );
  const optin = h('div', { class: 'check' },
    h('input', { id: 'f-optin', type: 'checkbox', checked: state.lead.optin, onchange: (e) => { state.lead.optin = e.target.checked; } }),
    h('label', { for: 'f-optin' }, lead.optin.label),
  );

  // Honeypot: invisible para personas, los bots lo llenan.
  const honeypot = h('div', { class: 'hp', 'aria-hidden': 'true' },
    h('label', { for: 'f-website' }, 'No llenar'),
    h('input', { id: 'f-website', name: 'website', tabindex: -1, autocomplete: 'off', oninput: (e) => { state.lead.website = e.target.value; } }),
  );

  const turnstileBox = h('div', { class: 'turnstile' });
  if (site.turnstileSiteKey) {
    const mount = () => {
      if (!window.turnstile) return setTimeout(mount, 200);
      turnstileWidget = window.turnstile.render(turnstileBox, { sitekey: site.turnstileSiteKey, language: 'es' });
    };
    mount();
  }

  const button = h('button', { class: 'btn btn--primary', type: 'submit' }, lead.submit);

  async function submit(e) {
    e.preventDefault();
    for (const el of Object.values(errors)) el.textContent = '';
    status.textContent = '';

    const leadErrors = validateLead(quiz, state.lead);
    if (Object.keys(leadErrors).length) {
      for (const [name, msg] of Object.entries(leadErrors)) if (errors[name]) errors[name].textContent = msg;
      form.querySelector(`#f-${Object.keys(leadErrors)[0]}`)?.focus();
      return;
    }

    if (site.demo) {
      track('quiz_submit', { demo: true });
      forget('answers');
      go('result');
      return;
    }

    button.disabled = true;
    button.textContent = 'Enviando…';
    try {
      // Relativa a la página (/lm4/ -> /api/submit) para funcionar también bajo un subdirectorio.
      const response = await fetch(new URL('../api/submit', location.href), {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({
          quizId: quiz.id,
          answers: state.answers,
          lead: state.lead,
          hidden,
          turnstileToken: turnstileWidget != null ? window.turnstile.getResponse(turnstileWidget) : undefined,
          context: { hutk: cookie('hubspotutk'), pageUri: location.href, pageName: document.title },
        }),
      });
      const data = await response.json().catch(() => ({}));
      if (!response.ok || !data.ok) throw new Error(data.error || `HTTP ${response.status}`);

      track('quiz_submit', { outcome: data.outcome, profile: data.profile });
      forget('answers');
      go('result');
    } catch (err) {
      console.error(err);
      status.textContent = err.message === 'turnstile'
        ? 'No pudimos verificar que no eres un robot. Intenta de nuevo.'
        : 'No pudimos enviar tus datos. Revisa tu conexión e intenta de nuevo.';
      if (turnstileWidget != null) window.turnstile.reset(turnstileWidget);
      button.disabled = false;
      button.textContent = lead.submit;
    }
  }

  const form = h('form', { class: 'screen screen--lead', novalidate: true, onsubmit: submit },
    h('h2', { tabindex: -1 }, lead.title),
    h('p', { class: 'lead-text' }, lead.description),
    fieldEls,
    privacy,
    privacyErr,
    optin,
    honeypot,
    turnstileBox,
    status,
    h('div', { class: 'nav' },
      h('button', { class: 'btn btn--ghost', type: 'button', onclick: () => go('step', steps.length - 1) }, 'Atrás'),
      button,
    ),
    h('p', { class: 'meta' }, lead.disclaimer),
  );
  return form;
}

function renderResult() {
  // Mismo cálculo que el servidor (core/scoring.js), que es el que llega al CRM.
  const { outcome, profile } = scoreQuiz(quiz, state.answers);
  track('quiz_result_view', { outcome: outcome.id, profile: profile?.id });
  if (!quiz.lead) forget('answers');
  const { cta, note, profileLabel } = quiz.result;

  return h('section', { class: `screen screen--result${outcome.image ? ' screen--media' : ''}`, 'aria-live': 'polite' },
    outcome.image && h('div', { class: 'media' }, h('img', { src: outcome.image, alt: '', decoding: 'async' })),
    h('div', { class: 'result' },
      h('p', { class: 'eyebrow' }, 'Tu resultado'),
      h('h1', { tabindex: -1 }, outcome.title),
      paragraphs(outcome.description),
      profile && h('div', { class: 'profile' },
        h('p', { class: 'eyebrow' }, profileLabel ?? 'Tu perfil'),
        h('h2', {}, profile.title),
        paragraphs(profile.description, 'profile__text'),
      ),
      note && h('p', { class: 'note' }, note),
      cta?.url && h('a', { class: 'btn btn--primary', href: cta.url, target: '_top', onclick: () => track('quiz_cta_click', { outcome: outcome.id }) }, cta.label),
    ),
  );
}

render();
