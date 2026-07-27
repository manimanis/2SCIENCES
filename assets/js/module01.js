/**
 * Antigravity Interactive Modules Engine - Module 1 (Introduction & Concepts de base)
 * Enseignant: Mohamed Anis MANI - Cours Informatique 2e Sciences
 */

if (typeof window.getEl !== 'function') {
  window.getEl = id => document.getElementById(id);
}

document.addEventListener('DOMContentLoaded', () => {

  // -------------------------------------------------------------
  // Module 1 Handlers
  // -------------------------------------------------------------
  let ropesTimer = null;
  document.addEventListener('click', (e) => {
    if (e.target.closest('#btn-start-ropes')) {
      const ropesStatus = getEl('ropes-status');
      if (ropesStatus) {
        ropesStatus.classList.remove('d-none');
        ropesStatus.innerHTML = '🔥 Allumage : Corde 1 (aux 2 extrémités) et Corde 2 (à 1 extrémité)...';
      }
      let time = 0;
      clearInterval(ropesTimer);
      ropesTimer = setInterval(() => {
        time += 5;
        if (ropesStatus) {
          if (time === 30) {
            ropesStatus.innerHTML = '⏳ <strong>30 minutes écoulées !</strong> Corde 1 s\'est entièrement consumée. On allume immédiatement la 2ème extrémité de la Corde 2 !';
          } else if (time === 45) {
            ropesStatus.innerHTML = '✨ <strong>45 minutes écoulées !</strong> Corde 2 s\'est entièrement consumée. Mesure exacte de 45 min accomplie ! 🎉';
            clearInterval(ropesTimer);
          }
        }
      }, 1000);
    }
  });

  let switchStates = { 1: false, 2: false, 3: false };
  let switchOnTimes = { 1: 0, 2: 0, 3: 0 };
  setInterval(() => {
    for (let i = 1; i <= 3; i++) {
      if (switchStates[i]) switchOnTimes[i] += 1;
    }
  }, 1000);

  document.addEventListener('click', (e) => {
    const swBtn = e.target.closest('.btn-toggle-switch');
    if (swBtn) {
      const sw = swBtn.dataset.switch;
      switchStates[sw] = !switchStates[sw];
      if (switchStates[sw]) {
        swBtn.classList.add('btn-success');
        swBtn.classList.remove('btn-outline-secondary');
      } else {
        swBtn.classList.remove('btn-success');
        swBtn.classList.add('btn-outline-secondary');
      }
      swBtn.textContent = `Interrupteur ${sw} : ${switchStates[sw] ? 'ALLUMÉ (ON)' : 'ÉTEINT (OFF)'}`;
    }

    if (e.target.closest('#btn-enter-room')) {
      const roomResult = getEl('room-result');
      if (roomResult) {
        let html = '<div class="row text-center mt-3">';
        for (let i = 1; i <= 3; i++) {
          let state = 'Éteinte & Froide';
          let badge = 'bg-secondary';
          let bulbIcon = '💡';
          if (switchStates[i]) {
            state = 'Allumée & Chaude 🔥';
            badge = 'bg-warning text-dark';
          } else if (switchOnTimes[i] > 5) {
            state = 'Éteinte mais CHAUDE 🔥 (A été allumée récemment)';
            badge = 'bg-danger';
          }
          html += `
            <div class="col-md-4 mb-2">
              <div class="card p-3 shadow-sm border">
                <h4>${bulbIcon} Lampe ${i}</h4>
                <span class="badge ${badge} fs-6">${state}</span>
                <small class="text-muted mt-2">Contrôlée par Interrupteur ${i}</small>
              </div>
            </div>
          `;
        }
        html += '</div>';
        roomResult.innerHTML = html;
      }
    }

    if (e.target.closest('#btn-check-ex3-analysis')) {
      const entries = (getEl('ex3-input-entries')?.value || '').toLowerCase();
      const t1 = (getEl('ex3-input-t1')?.value || '').toLowerCase();
      const t2 = (getEl('ex3-input-t2')?.value || '').toLowerCase();
      const sorties = (getEl('ex3-input-sorties')?.value || '').toLowerCase();

      const hasEntries = entries.includes('a') && entries.includes('b');
      const hasT1 = t1.includes('a') && t1.includes('b') && (t1.includes('+') || t1.includes('s'));
      const hasT2 = t2.includes('a') && t2.includes('b') && (t2.includes('*') || t2.includes('p'));
      const hasSorties = (sorties.includes('s') && sorties.includes('p')) || (sorties.includes('somme') && sorties.includes('produit'));

      const feedback = getEl('ex3-analysis-feedback');
      if (feedback) {
        if (hasEntries && (hasT1 || hasT2) && hasSorties) {
          feedback.innerHTML = '<div class="alert alert-success">🎉 Très bien ! Entrées: a, b &bull; Traitements: s ← a + b, p ← a * b &bull; Sorties: s, p.</div>';
        } else {
          feedback.innerHTML = '<div class="alert alert-warning">💡 Vérifiez vos réponses. Rappel : Entrées = <strong>a, b</strong> &bull; Traitements = <strong>s ← a + b</strong> et <strong>p ← a * b</strong> &bull; Sorties = <strong>s, p</strong>.</div>';
        }
      }
    }

    if (e.target.closest('#btn-check-ex3-tdo')) {
      const o1 = (getEl('tdo-obj-1')?.value || '').toLowerCase();
      const t1 = getEl('tdo-type-1')?.value || '';
      const o2 = (getEl('tdo-obj-2')?.value || '').toLowerCase();
      const t2 = getEl('tdo-type-2')?.value || '';

      const feedback = getEl('ex3-tdo-feedback');
      if (feedback) {
        if ((o1.includes('a') || o1.includes('b')) && t1 === 'entier' && (o2.includes('s') || o2.includes('p')) && t2 === 'entier') {
          feedback.innerHTML = '<div class="alert alert-success">🎉 Excellent TDO ! Les objets a, b, s, p sont tous de type <strong>entier</strong>.</div>';
        } else {
          feedback.innerHTML = '<div class="alert alert-warning">💡 Rappel TDO : Les variables (a, b) et les résultats (s, p) sont tous des nombres <strong>entiers</strong>.</div>';
        }
      }
    }

    if (e.target.closest('#btn-check-steps')) {
      const s1 = getEl('step1')?.value;
      const s2 = getEl('step2')?.value;
      const s3 = getEl('step3')?.value;
      const s4 = getEl('step4')?.value;
      const feedback = getEl('steps-feedback');
      if (feedback) {
        if (s1 === 'Analyse' && s2 === 'Algorithme' && s3 === 'Programme' && s4 === 'Exécution et Test') {
          feedback.innerHTML = '<div class="alert alert-success">🎉 Parfait ! L\'ordre exact est : Analyse ➔ Algorithme ➔ Programme ➔ Exécution et Test.</div>';
        } else {
          feedback.innerHTML = '<div class="alert alert-danger">❌ Ordre incorrect. Rappel : Analyse ➔ Algorithme ➔ Programme ➔ Exécution et Test.</div>';
        }
      }
    }

    if (e.target.closest('#btn-calc-pred-succ')) {
      const a = parseInt(getEl('ex7-a')?.value) || 0;
      const out = getEl('ex7-out');
      if (out) {
        if (a % 2 !== 0) {
          out.innerHTML = '<div class="alert alert-warning">Veuillez saisir un nombre PAIR.</div>';
        } else {
          out.innerHTML = `<div class="alert alert-success fs-5">Prédécesseur : <strong>${a - 2}</strong> &bull; Nombre : <strong>${a}</strong> &bull; Successeur : <strong>${a + 2}</strong><br>Résultat : <code>${a - 2} – ${a} – ${a + 2}</code></div>`;
        }
      }
    }
  });

  const calcH = () => {
    const geoA = getEl('geo-a');
    if (!geoA) return;
    const a = parseFloat(geoA.value) || 0;
    const area = (10 / 3) * a * a;
    const res = getEl('geo-result');
    if (res) res.innerHTML = `Aire de la forme H : <strong>${area.toFixed(2)}</strong> (3 carrés + 1 rectangle)`;
  };
  document.addEventListener('input', (e) => {
    if (e.target.id === 'geo-a') calcH();
  });
  calcH();

  const calcEx6 = () => {
    const rEl = getEl('ex6-r');
    if (!rEl) return;
    const r = parseFloat(rEl.value) || 0;
    const x = parseFloat(getEl('ex6-x')?.value) || 0;
    const y = parseFloat(getEl('ex6-y')?.value) || 0;
    const area = (Math.PI * r * r) / 4 + (r + x) * y + x * r;
    const res = getEl('ex6-result');
    if (res) res.innerHTML = `Aire totale Forme R : <strong>${area.toFixed(2)}</strong>`;
  };
  document.addEventListener('input', (e) => {
    if (['ex6-r', 'ex6-x', 'ex6-y'].includes(e.target.id)) calcEx6();
  });
  calcEx6();
});
