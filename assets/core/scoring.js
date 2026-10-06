// Cálculo del resultado. Lo usan el navegador (para mostrar) y el servidor (fuente de verdad).
//
// Tipos de quiz (quiz.scoring.type):
//   classification — cada opción suma a una ruta; gana la ruta con más puntos (LM #3, LM #4).
//   points         — se suman los puntos de todas las respuestas; el total cae en un rango (Connect).
//   sections       — puntos por sección: el total da el nivel y la mejor sección da el perfil (LM #2).
//
// Todos devuelven { outcome, totals } y, si aplica, { profile }.

export function findOption(question, optionId) {
  return question.options.find((o) => o.id === optionId);
}

export function picked(answers, questionId) {
  const value = answers?.[questionId];
  if (value == null) return [];
  return Array.isArray(value) ? value : [value];
}

function pointsOf(question, answers) {
  return picked(answers, question.id).reduce((sum, id) => sum + (findOption(question, id)?.points ?? 0), 0);
}

function inRange(outcomes, value) {
  return outcomes.find((o) => value >= o.min && value <= o.max) ?? outcomes[0];
}

function classification(quiz, answers) {
  const totals = Object.fromEntries(quiz.outcomes.map((o) => [o.id, 0]));

  for (const question of quiz.questions) {
    for (const optionId of picked(answers, question.id)) {
      const option = findOption(question, optionId);
      if (option?.outcome in totals) totals[option.outcome] += option.points ?? 1;
    }
  }

  const max = Math.max(...Object.values(totals));
  const tied = quiz.outcomes.filter((o) => totals[o.id] === max).map((o) => o.id);
  let winner = tied[0];

  if (tied.length > 1) {
    for (const questionId of quiz.scoring.tiebreak ?? []) {
      const question = quiz.questions.find((q) => q.id === questionId);
      const choice = picked(answers, questionId)
        .map((id) => findOption(question, id)?.outcome)
        .find((outcome) => tied.includes(outcome));
      if (choice) {
        winner = choice;
        break;
      }
    }
  }

  return { outcome: quiz.outcomes.find((o) => o.id === winner), totals, tied };
}

function points(quiz, answers) {
  const score = quiz.questions.reduce((sum, q) => sum + pointsOf(q, answers), 0);
  return { outcome: inRange(quiz.outcomes, score), totals: { score } };
}

function sections(quiz, answers) {
  const bySection = Object.fromEntries(quiz.sections.map((s) => [s.id, 0]));
  for (const question of quiz.questions) bySection[question.section] += pointsOf(question, answers);
  const total = Object.values(bySection).reduce((a, b) => a + b, 0);

  // Cada perfil se mide con el promedio de sus secciones; gana el más alto.
  // En empate decide el orden de quiz.profiles (el primero gana).
  let profile = null;
  let best = -1;
  for (const candidate of quiz.profiles) {
    const value = candidate.sections.reduce((sum, id) => sum + bySection[id], 0) / candidate.sections.length;
    if (value > best) {
      best = value;
      profile = candidate;
    }
  }

  return { outcome: inRange(quiz.outcomes, total), profile, totals: { ...bySection, total } };
}

const SCORERS = { classification, points, sections };

export function scoreQuiz(quiz, answers) {
  const scorer = SCORERS[quiz.scoring.type];
  if (!scorer) throw new Error(`Tipo de quiz desconocido: ${quiz.scoring.type}`);
  return scorer(quiz, answers);
}

// "ventas_estrategicas:3, inteligencia_mercados:2, ..." para guardar en el CRM.
export function formatTotals(totals) {
  return Object.entries(totals)
    .map(([id, n]) => `${id}:${n}`)
    .join(', ');
}
