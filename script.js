function verificarRespostas(formId, feedbackId) {
  const form = document.getElementById(formId);
  const questions = form.querySelectorAll('.mc-question');
  let acertos = 0;
  let respondidas = 0;

  questions.forEach(q => {
    const correctVal = q.getAttribute('data-answer');
    const labels = q.querySelectorAll('.option-label');
    labels.forEach(l => l.classList.remove('correct', 'incorrect'));

    const selected = q.querySelector('input[type="radio"]:checked');
    if (selected) {
      respondidas++;
      const parentLabel = selected.closest('.option-label');
      if (selected.value === correctVal) {
        acertos++;
        parentLabel.classList.add('correct');
      } else {
        parentLabel.classList.add('incorrect');
        const rightInput = q.querySelector(`input[value="${correctVal}"]`);
        if (rightInput) rightInput.closest('.option-label').classList.add('correct');
      }
    }
  });

  const feedback = document.getElementById(feedbackId);
  if (respondidas < questions.length) {
    feedback.textContent = `Você acertou ${acertos} de ${questions.length} questões objetivas (${questions.length - respondidas} ainda sem resposta).`;
  } else {
    feedback.textContent = `Resultado das questões objetivas: ${acertos} de ${questions.length} acertos!`;
  }
}

function limparRespostas(formId, feedbackId) {
  const form = document.getElementById(formId);
  form.reset();
  form.querySelectorAll('.option-label').forEach(l => l.classList.remove('correct', 'incorrect'));
  document.getElementById(feedbackId).textContent = '';
}

function toggleSolucao(btn) {
  const box = btn.nextElementSibling;
  box.classList.toggle('visible');
  btn.textContent = box.classList.contains('visible') ? 'Ocultar Sugestão de Código' : 'Ver Sugestão de Código';
}
