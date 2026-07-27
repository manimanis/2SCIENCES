/**
 * Antigravity Interactive Modules Engine - Shared Utilities & Global QCM Engine
 * Enseignant: Mohamed Anis MANI - Cours Informatique 2e Sciences
 */

// Global DOM helper function
if (typeof window.getEl !== 'function') {
  window.getEl = id => document.getElementById(id);
}

document.addEventListener('DOMContentLoaded', () => {

  // -------------------------------------------------------------
  // Global QCM Verification Engine
  // -------------------------------------------------------------
  document.addEventListener('click', (e) => {
    const btn = e.target.closest('.btn-check-qcm');
    if (!btn) return;

    const container = btn.closest('.qcm-container');
    if (!container) return;

    let total = 0;
    let score = 0;

    const questions = container.querySelectorAll('.qcm-question');
    questions.forEach(q => {
      total++;
      const correctAns = q.dataset.answer || '';
      const correctArray = String(correctAns).split(',').map(s => s.trim());

      const checkedInputs = q.querySelectorAll('input:checked');
      let selected = [];
      checkedInputs.forEach(inp => selected.push(inp.value));

      const feedback = q.querySelector('.qcm-feedback');

      const isCorrect = selected.length === correctArray.length && selected.every(v => correctArray.includes(v));

      if (feedback) {
        feedback.classList.remove('d-none', 'alert-success', 'alert-danger', 'alert-warning');
        if (isCorrect) {
          score++;
          q.classList.add('border-success');
          q.classList.remove('border-danger');
          feedback.classList.add('alert-success');
          feedback.innerHTML = '✅ Excellente réponse !';
        } else {
          q.classList.add('border-danger');
          q.classList.remove('border-success');
          let expl = q.dataset.explanation || `La bonne réponse était : ${correctArray.join(', ')}`;
          feedback.classList.add('alert-danger');
          feedback.innerHTML = `❌ Incorrect. ${expl}`;
        }
      }
    });

    const scoreCard = container.querySelector('.qcm-score');
    if (scoreCard) {
      scoreCard.classList.remove('d-none');
      const pct = Math.round((score / total) * 100);
      scoreCard.innerHTML = `
        <div class="alert alert-${pct >= 70 ? 'success' : pct >= 50 ? 'warning' : 'danger'} text-center fs-5 mb-0">
          <strong>Votre Score : ${score} / ${total} (${pct}%)</strong>
          <div>${pct === 100 ? '🎉 Félicitations ! Vous maîtrisez parfaitement ce chapitre.' : 'N\'hésitez pas à revoir les notions et à réessayer.'}</div>
        </div>
      `;
    }
  });
});
