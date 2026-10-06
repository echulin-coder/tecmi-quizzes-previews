// Validación compartida entre navegador y servidor.
import { findOption, picked } from './scoring.js';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const PHONE_RE = /^[+()\d\s.-]{7,20}$/;

export function validateQuestion(question, answers) {
  const chosen = picked(answers, question.id);
  if (chosen.some((id) => !findOption(question, id))) return 'Opción no válida.';
  if (new Set(chosen).size !== chosen.length) return 'Opción repetida.';

  if (question.type === 'multi') {
    const min = question.min ?? 1;
    const max = question.max ?? question.options.length;
    if (chosen.length < min) return min === 1 ? 'Elige al menos una opción.' : `Elige al menos ${min} opciones.`;
    if (chosen.length > max) return `Elige máximo ${max}.`;
  } else if (chosen.length !== 1) {
    return 'Elige una opción.';
  }
  return null;
}

// Devuelve { [questionId]: mensaje } solo con las que fallan.
export function validateAnswers(quiz, answers) {
  const errors = {};
  for (const question of quiz.questions) {
    const error = validateQuestion(question, answers);
    if (error) errors[question.id] = error;
  }
  return errors;
}

// Devuelve { [campo]: mensaje } solo con los que fallan.
export function validateLead(quiz, lead) {
  const errors = {};
  for (const field of quiz.lead.fields) {
    const value = String(lead?.[field.name] ?? '').trim();
    if (!value) {
      if (field.required) errors[field.name] = 'Este dato es obligatorio.';
      continue;
    }
    if (value.length > 200) errors[field.name] = 'Es demasiado largo.';
    else if (field.type === 'email' && !EMAIL_RE.test(value)) errors[field.name] = 'Revisa tu correo.';
    else if (field.type === 'tel' && !PHONE_RE.test(value)) errors[field.name] = 'Revisa tu teléfono.';
  }
  if (lead?.privacy !== true) errors.privacy = 'Necesitamos que aceptes el aviso de privacidad.';
  return errors;
}
