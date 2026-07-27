/**
 * Antigravity Interactive Modules Engine - Module 4 (Structures Conditionnelles)
 * Enseignant: Mohamed Anis MANI - Cours Informatique 2e Sciences
 */

// Helper functions for DOM manipulation
if (typeof window.getEl !== 'function') {
  window.getEl = id => document.getElementById(id);
}

document.addEventListener('DOMContentLoaded', () => {

  // -------------------------------------------------------------
  // Module 4 Handlers
  // -------------------------------------------------------------
  document.addEventListener('click', (e) => {
    if (e.target.closest('#btn-check-qcm3')) {
      const container = getEl('qcm3-matching-container');
      if (!container) return;
      const items = container.querySelectorAll('.qcm3-item');
      let score = 0;
      let total = items.length;

      items.forEach((item) => {
        const sel = item.querySelector('.qcm3-select');
        const feedback = item.querySelector('.qcm3-feedback');
        const correct = item.dataset.correct;
        const val = sel ? sel.value : '';

        if (feedback) {
          feedback.classList.remove('d-none', 'alert-success', 'alert-danger', 'alert-warning');
          if (val === correct) {
            score++;
            item.classList.add('border-success');
            item.classList.remove('border-danger');
            feedback.classList.add('alert-success');
            feedback.innerHTML = `✅ Réponse exacte ! (Expression ${correct.toUpperCase()})`;
          } else {
            item.classList.add('border-danger');
            item.classList.remove('border-success');
            feedback.classList.add('alert-danger');
            if (!val) {
              feedback.innerHTML = `⚠️ Veuillez choisir une expression dans la liste.`;
            } else {
              feedback.innerHTML = `❌ Incorrect. La bonne correspondance est l'expression <strong>${correct.toUpperCase()}</strong>.`;
            }
          }
        }
      });

      const scoreBox = getEl('qcm3-score');
      if (scoreBox) {
        scoreBox.classList.remove('d-none');
        const pct = Math.round((score / total) * 100);
        scoreBox.className = `mt-3 alert ${pct >= 70 ? 'alert-success' : 'alert-warning'} fw-bold fs-5 shadow-sm`;
        scoreBox.innerHTML = `📊 Score : ${score} / ${total} (${pct}%) ${pct >= 70 ? '🎉 Excellent travail !' : '💡 Consultez les indices pour corriger vos associations.'}`;
      }
    }

    if (e.target.closest('#btn-check-ex4')) {
      const container = getEl('ex4-container');
      if (!container) return;
      const items = container.querySelectorAll('.ex4-item');
      let score = 0;
      let total = items.length;

      items.forEach((item) => {
        const selCount = item.querySelector('.ex4-select-count')?.value || '';
        const selForme = item.querySelector('.ex4-select-forme')?.value || '';
        const selRole = item.querySelector('.ex4-select-role')?.value || '';
        const feedback = item.querySelector('.ex4-feedback');

        const expCount = item.dataset.condCount;
        const expForme = item.dataset.condForme;
        const expRole = item.dataset.condRole;

        const isCountCorrect = String(expCount).split(',').map(s => s.trim()).includes(selCount);
        const isFormeCorrect = String(expForme).split(',').map(s => s.trim()).includes(selForme);
        const isRoleCorrect = String(expRole).split(',').map(s => s.trim()).includes(selRole);
        const isCorrect = isCountCorrect && isFormeCorrect && isRoleCorrect;

        if (feedback) {
          feedback.classList.remove('d-none', 'alert-success', 'alert-danger', 'alert-warning');
          if (isCorrect) {
            score++;
            item.classList.add('border-success');
            item.classList.remove('border-danger');
            feedback.classList.add('alert-success');
            feedback.innerHTML = `✅ Analyse parfaite ! (Nombre de conditions, forme et rôle tous corrects).`;
          } else {
            item.classList.add('border-danger');
            item.classList.remove('border-success');
            feedback.classList.add('alert-danger');
            let errs = [];
            if (!isCountCorrect) errs.push('Nombre de conditions');
            if (!isFormeCorrect) errs.push('Forme de la structure');
            if (!isRoleCorrect) errs.push('Rôle de l\'algorithme');
            feedback.innerHTML = `❌ Incorrect. Veuillez revoir : <strong>${errs.join(', ')}</strong>.`;
          }
        }
      });

      const scoreBox = getEl('ex4-score');
      if (scoreBox) {
        scoreBox.classList.remove('d-none');
        const pct = Math.round((score / total) * 100);
        scoreBox.className = `mt-3 alert ${pct >= 70 ? 'alert-success' : 'alert-warning'} fw-bold fs-5 shadow-sm`;
        scoreBox.innerHTML = `📊 Score Exécution Manuelle : ${score} / ${total} (${pct}%) ${pct >= 70 ? '🎉 Excellent travail !' : '💡 Consultez les indices pour corriger vos choix.'}`;
      }
    }

    if (e.target.closest('.btn-cube-preset')) {
      const presetBtn = e.target.closest('.btn-cube-preset');
      const val = presetBtn.dataset.val;
      const input = getEl('cube-n');
      if (input) {
        input.value = val;
        getEl('btn-check-cube')?.click();
      }
    }

    if (e.target.closest('#btn-check-cube')) {
      const input = getEl('cube-n');
      const out = getEl('cube-out');
      if (!input || !out) return;

      const n = parseInt(input.value);
      if (isNaN(n) || n < 100 || n > 999) {
        out.className = 'alert alert-warning shadow-sm';
        out.innerHTML = `⚠️ Veuillez saisir un nombre entier de 3 chiffres compris entre 100 et 999.`;
        return;
      }

      const c = Math.floor(n / 100);
      const d = Math.floor(n / 10) % 10;
      const u = n % 10;

      const c3 = c * c * c;
      const d3 = d * d * d;
      const u3 = u * u * u;
      const sum = c3 + d3 + u3;

      const isCubic = (sum === n);

      out.className = `alert ${isCubic ? 'alert-success border-success' : 'alert-danger border-danger'} shadow-sm rounded p-3`;
      out.innerHTML = `
        <div class="fw-bold fs-5 mb-2">${isCubic ? '🎉 ' + n + ' est un nombre CUBIQUE (Armstrong) !' : '❌ ' + n + ' N\'EST PAS un nombre cubique.'}</div>
        <hr class="my-2">
        <div class="font-monospace small">
          <div><strong>1. Extraction des chiffres :</strong> Centaines (c) = ${c}, Dizaines (d) = ${d}, Unités (u) = ${u}</div>
          <div><strong>2. Somme des cubes (c*c*c + d*d*d + u*u*u) :</strong> (${c}*${c}*${c}) + (${d}*${d}*${d}) + (${u}*${u}*${u}) = ${c3} + ${d3} + ${u3} = <strong>${sum}</strong></div>
          <div class="mt-1"><strong>3. Comparaison :</strong> ${sum} ${isCubic ? '=' : '≠'} ${n}</div>
        </div>
      `;
    }

    if (e.target.closest('#btn-check-ex7')) {
      const q1Forme = getEl('ex7-q1-forme')?.value || '';
      const q1Rewrite = getEl('ex7-q1-rewrite')?.value || '';

      const q2ValA = parseInt(getEl('ex7-q2-val-a')?.value);
      const q2ValB = parseInt(getEl('ex7-q2-val-b')?.value);
      const q2Role = getEl('ex7-q2-role')?.value || '';
      const q2Simple = getEl('ex7-q2-simple')?.value || '';

      const q1Feedback = getEl('ex7-q1-feedback');
      const q2Feedback = getEl('ex7-q2-feedback');
      const scoreBox = getEl('ex7-score');

      let q1Correct = (q1Forme === 'alternative' && q1Rewrite === 'optA');
      let q2Correct = (q2ValA === 1 && q2ValB === 3 && q2Role === 'position_alphabet' && q2Simple === 'ord_majus');

      let score = 0;
      if (q1Correct) score++;
      if (q2Correct) score++;

      if (q1Feedback) {
        q1Feedback.classList.remove('d-none', 'alert-success', 'alert-danger');
        if (q1Correct) {
          q1Feedback.className = 'mt-2 alert alert-success mb-0';
          q1Feedback.innerHTML = `✅ Question 1 exacte ! (Forme alternative + Réécriture sous forme réduite validée).`;
        } else {
          q1Feedback.className = 'mt-2 alert alert-danger mb-0';
          let errs = [];
          if (q1Forme !== 'alternative') errs.push('Forme de la structure (Forme alternative/complète)');
          if (q1Rewrite !== 'optA') errs.push('Réécriture sous forme réduite');
          q1Feedback.innerHTML = `❌ Question 1 incorrecte. À réviser : <strong>${errs.join(', ')}</strong>.`;
        }
      }

      if (q2Feedback) {
        q2Feedback.classList.remove('d-none', 'alert-success', 'alert-danger');
        if (q2Correct) {
          q2Feedback.className = 'mt-2 alert alert-success mb-0';
          q2Feedback.innerHTML = `✅ Question 2 exacte ! (P('A') = 1, P('c') = 3, rôle et instruction simple validés).`;
        } else {
          q2Feedback.className = 'mt-2 alert alert-danger mb-0';
          let errs = [];
          if (q2ValA !== 1) errs.push(`P('A') [attendu: 1]`);
          if (q2ValB !== 3) errs.push(`P('c') [attendu: 3]`);
          if (q2Role !== 'position_alphabet') errs.push(`Rôle de la séquence`);
          if (q2Simple !== 'ord_majus') {
            if (q2Simple === 'pos_majus') {
              errs.push(`Instruction simple : Attention au piège ! Pos("A", ...) retourne 0 (ou premier indice), alors que le rang 1 pour 'A' est obtenu par Ord(Majus(C)) - 64`);
            } else {
              errs.push(`Instruction simple équivalente (P ← Ord(Majus(C)) - 64)`);
            }
          }
          q2Feedback.innerHTML = `❌ Question 2 incorrecte. À réviser : <strong>${errs.join(', ')}</strong>.`;
        }
      }

      if (scoreBox) {
        scoreBox.classList.remove('d-none');
        const pct = Math.round((score / 2) * 100);
        scoreBox.className = `mt-3 alert ${pct === 100 ? 'alert-success' : 'alert-warning'} fw-bold fs-5 shadow-sm`;
        scoreBox.innerHTML = `📊 Score Exercice 7 : ${score} / 2 (${pct}%) ${pct === 100 ? '🎉 Bravo ! Excellente maîtrise des formes conditionnelles.' : '💡 Consultez les indices pour corriger les erreurs.'}`;
      }
    }

    if (e.target.closest('#btn-check-sign')) {
      const n = parseInt(getEl('sign-n')?.value) || 0;
      const sign = n >= 0 ? 'POSITIF (+)' : 'NÉGATIF (-)';
      const parity = Math.abs(n) % 2 === 0 ? 'PAIR' : 'IMPAIR';
      const out = getEl('sign-out');
      if (out) {
        out.classList.remove('d-none');
        out.innerHTML = `Le nombre ${n} est <strong>${sign}</strong> et <strong>${parity}</strong>.`;
      }
    }

    if (e.target.closest('.btn-char-preset')) {
      const presetBtn = e.target.closest('.btn-char-preset');
      const val = presetBtn.dataset.val;
      const input = getEl('char-val');
      if (input) {
        input.value = val;
        getEl('btn-check-char')?.click();
      }
    }

    if (e.target.closest('#btn-check-char')) {
      const input = getEl('char-val');
      const out = getEl('char-out');
      if (!input || !out) return;

      const c = input.value;
      if (!c) {
        out.className = 'alert alert-warning shadow-sm';
        out.innerHTML = `⚠️ Veuillez saisir un caractère.`;
        return;
      }

      const code = c.charCodeAt(0);
      let type = '';
      let badgeClass = '';
      let condText = '';

      if (code >= 65 && code <= 90) {
        type = 'Lettre Majuscule';
        badgeClass = 'bg-primary';
        condText = `65 ≤ ${code} ≤ 90 ("A" ≤ "${c}" ≤ "Z")`;
      } else if (code >= 97 && code <= 122) {
        type = 'Lettre Minuscule';
        badgeClass = 'bg-info text-dark';
        condText = `97 ≤ ${code} ≤ 122 ("a" ≤ "${c}" ≤ "z")`;
      } else if (code >= 48 && code <= 57) {
        type = 'Chiffre';
        badgeClass = 'bg-success';
        condText = `48 ≤ ${code} ≤ 57 ("0" ≤ "${c}" ≤ "9")`;
      } else {
        type = 'Symbole / Caractère Spécial';
        badgeClass = 'bg-secondary';
        condText = `Branche Sinon (Hors des plages majuscules, minuscules et chiffres)`;
      }

      out.className = `alert alert-light border shadow-sm p-3 rounded d-block`;
      out.innerHTML = `
        <div class="d-flex align-items-center justify-content-between flex-wrap gap-2 mb-2">
          <div class="fs-5 fw-bold text-dark">
            Caractère analysé : <span class="badge bg-dark font-monospace fs-4 px-3 py-1">'${c}'</span>
          </div>
          <span class="badge ${badgeClass} fs-6 px-3 py-2">${type}</span>
        </div>
        <hr class="my-2">
        <div class="font-monospace small text-muted">
          <div>&bull; Code ASCII : <strong>ord('${c}') = ${code}</strong></div>
          <div>&bull; Condition satisfaite : <code>${condText}</code></div>
        </div>
      `;
    }

    if (e.target.closest('.btn-calc-preset')) {
      const presetBtn = e.target.closest('.btn-calc-preset');
      const val = presetBtn.dataset.val;
      const input = getEl('calc-expr');
      if (input) {
        input.value = val;
        getEl('btn-do-calc')?.click();
      }
    }

    if (e.target.closest('#btn-do-calc')) {
      const input = getEl('calc-expr');
      const out = getEl('calc-out');
      if (!input || !out) return;

      const expr = input.value.trim().replace(/\s+/g, '');
      if (!expr) {
        out.className = 'alert alert-warning shadow-sm';
        out.innerHTML = `⚠️ Veuillez saisir une expression (ex: 15+7, 18/2, 1/0).`;
        return;
      }

      const match = expr.match(/^([+-]?\d+)\s*([+\-*/])\s*([+-]?\d+)$/);
      if (!match) {
        out.className = 'alert alert-danger shadow-sm';
        out.innerHTML = `❌ Expression invalide. Format attendu : <code>A op B</code> (ex: 15+7, 18/2, -5*4).`;
        return;
      }

      const a = parseInt(match[1]);
      const op = match[2];
      const b = parseInt(match[3]);

      if (op === '/' && b === 0) {
        out.className = 'alert alert-danger border-danger shadow-sm p-3 rounded d-block';
        out.innerHTML = `
          <div class="fw-bold fs-5 mb-1">❌ ${expr} = Division par zéro !</div>
          <div class="small font-monospace text-muted">&bull; Extraction : A = ${a}, op = '/', B = 0<br>&bull; Division par 0 impossible en mathématiques et en informatique.</div>
        `;
        return;
      }

      let res = 0;
      if (op === '+') res = a + b;
      else if (op === '-') res = a - b;
      else if (op === '*') res = a * b;
      else if (op === '/') res = a / b;

      out.className = 'alert alert-success border-success shadow-sm p-3 rounded d-block';
      out.innerHTML = `
        <div class="fw-bold fs-5 mb-1">✅ ${expr} = <strong>${res}</strong></div>
        <div class="small font-monospace text-muted">&bull; Extraction : A = ${a}, op = '${op}', B = ${b}<br>&bull; Résultat de l'opération : ${a} ${op} ${b} = ${res}</div>
      `;
    }

    if (e.target.closest('.btn-ph-preset')) {
      const presetBtn = e.target.closest('.btn-ph-preset');
      const val = parseFloat(presetBtn.dataset.val);
      const input = getEl('ph-val');
      if (input) input.value = val;
      getEl('btn-check-ph')?.click();
    }

    if (e.target.closest('#btn-check-ph')) {
      const input = getEl('ph-val');
      const out = getEl('ph-out');
      if (!input || !out) return;

      const ph = parseFloat(input.value);
      if (isNaN(ph)) {
        out.className = 'alert alert-warning shadow-sm';
        out.innerHTML = `⚠️ Veuillez saisir une valeur numérique de pH.`;
        return;
      }

      if (ph < 0 || ph > 14) {
        out.className = 'alert alert-danger border-danger shadow-sm p-3 rounded d-block';
        out.innerHTML = `
          <div class="fw-bold fs-5 mb-1">❌ Saisie invalide ! pH = ${ph}</div>
          <div class="small font-monospace text-muted">&bull; Condition satisfaite : (pH < 0) ou (pH > 14)<br>&bull; Le potentiel hydrogène (pH) doit être compris obligatoirement entre 0.0 et 14.0.</div>
        `;
        return;
      }

      let nature = '';
      let badgeClass = '';
      let condText = '';

      if (ph < 3) {
        nature = 'Acide fort';
        badgeClass = 'bg-danger';
        condText = `0 ≤ ${ph} < 3 (pH < 3)`;
      } else if (ph < 7) {
        nature = 'Acide faible';
        badgeClass = 'bg-warning text-dark';
        condText = `3 ≤ ${ph} < 7 (3 ≤ pH < 7)`;
      } else if (ph === 7) {
        nature = 'Neutre';
        badgeClass = 'bg-success';
        condText = `${ph} = 7 (pH = 7)`;
      } else if (ph <= 11) {
        nature = 'Base faible';
        badgeClass = 'bg-info text-dark';
        condText = `7 < ${ph} ≤ 11 (7 < pH ≤ 11)`;
      } else {
        nature = 'Base forte';
        badgeClass = 'bg-primary';
        condText = `11 < ${ph} ≤ 14 (pH > 11)`;
      }

      out.className = 'alert alert-light border shadow-sm p-3 rounded d-block';
      out.innerHTML = `
        <div class="d-flex align-items-center justify-content-between flex-wrap gap-2 mb-2">
          <div class="fs-5 fw-bold text-dark">
            pH analysé : <span class="badge bg-dark font-monospace fs-4 px-3 py-1">${ph.toFixed(1)}</span>
          </div>
          <span class="badge ${badgeClass} fs-5 px-3 py-2">Nature : ${nature}</span>
        </div>
        <hr class="my-2">
        <div class="font-monospace small text-muted">
          <div>&bull; Intervalle vérifié : <code>${condText}</code></div>
          <div>&bull; Résultat affiché par l'algorithme : <strong>"${nature}"</strong></div>
        </div>
      `;
    }

    if (e.target.closest('#btn-check-ex11')) {
      const b1a = parseInt(getEl('ex11-b1-a')?.value);
      const b1b = parseInt(getEl('ex11-b1-b')?.value);

      const b2a = parseInt(getEl('ex11-b2-a')?.value);
      const b2b = parseInt(getEl('ex11-b2-b')?.value);

      const b3a = parseInt(getEl('ex11-b3-a')?.value);
      const b3b = parseInt(getEl('ex11-b3-b')?.value);

      const fb1 = getEl('ex11-b1-feedback');
      const fb2 = getEl('ex11-b2-feedback');
      const fb3 = getEl('ex11-b3-feedback');
      const scoreBox = getEl('ex11-score');

      const b1Ok = (b1a === 3 && b1b === 1);
      const b2Ok = (b2a === 2 && b2b === 3);
      const b3Ok = (b3a === 0 && b3b === 2);

      let score = 0;
      if (b1Ok) score++;
      if (b2Ok) score++;
      if (b3Ok) score++;

      if (fb1) {
        fb1.classList.remove('d-none', 'alert-success', 'alert-danger');
        if (b1Ok) {
          fb1.className = 'mt-2 alert alert-success mb-0 small';
          fb1.innerHTML = `✅ Bloc 1 exact ! A = 3, B = 1 (La condition était Fausse).`;
        } else {
          fb1.className = 'mt-2 alert alert-danger mb-0 small';
          fb1.innerHTML = `❌ Bloc 1 incorrect [attendu: A=3, B=1].`;
        }
      }

      if (fb2) {
        fb2.classList.remove('d-none', 'alert-success', 'alert-danger');
        if (b2Ok) {
          fb2.className = 'mt-2 alert alert-success mb-0 small';
          fb2.innerHTML = `✅ Bloc 2 exact ! A = 2, B = 3 (La condition était Vraie).`;
        } else {
          fb2.className = 'mt-2 alert alert-danger mb-0 small';
          fb2.innerHTML = `❌ Bloc 2 incorrect [attendu: A=2, B=3].`;
        }
      }

      if (fb3) {
        fb3.classList.remove('d-none', 'alert-success', 'alert-danger');
        if (b3Ok) {
          fb3.className = 'mt-2 alert alert-success mb-0 small';
          fb3.innerHTML = `✅ Bloc 3 exact ! A = 0, B = 2 (2 div 3 = 0).`;
        } else {
          fb3.className = 'mt-2 alert alert-danger mb-0 small';
          fb3.innerHTML = `❌ Bloc 3 incorrect [attendu: A=0, B=2].`;
        }
      }

      if (scoreBox) {
        scoreBox.classList.remove('d-none');
        const pct = Math.round((score / 3) * 100);
        scoreBox.className = `mt-3 alert ${pct === 100 ? 'alert-success' : 'alert-warning'} fw-bold fs-5 shadow-sm`;
        scoreBox.innerHTML = `📊 Score Exercice 11 : ${score} / 3 (${pct}%) ${pct === 100 ? '🎉 Bravo ! Évaluation parfaite des 3 blocs conditionnels.' : '💡 Corrigez les blocs erronés en relisant les indices.'}`;
      }
    }

    if (e.target.closest('.btn-leap-preset')) {
      const presetBtn = e.target.closest('.btn-leap-preset');
      const val = presetBtn.dataset.val;
      const input = getEl('leap-year');
      if (input) {
        input.value = val;
        getEl('btn-check-leap')?.click();
      }
    }

    if (e.target.closest('#btn-check-leap')) {
      const input = getEl('leap-year');
      const out = getEl('leap-out');
      if (!input || !out) return;

      const y = parseInt(input.value);
      if (isNaN(y) || y <= 0) {
        out.className = 'alert alert-warning shadow-sm';
        out.innerHTML = `⚠️ Veuillez saisir une année valide (entier positif).`;
        return;
      }

      const div4 = (y % 4 === 0);
      const div100 = (y % 100 === 0);
      const div400 = (y % 400 === 0);

      const isLeap = (div4 && !div100) || div400;

      let justification = '';
      if (div400) {
        justification = `Divisible par 400 (${y} mod 400 = 0). C'est une année séculaire bissextile.`;
      } else if (div4 && !div100) {
        justification = `Divisible par 4 (${y} mod 4 = 0) ET non divisible par 100 (${y} mod 100 = ${y % 100} ≠ 0).`;
      } else if (div4 && div100) {
        justification = `Divisible par 4 et par 100 (${y} mod 100 = 0), mais NON divisible par 400 (${y} mod 400 = ${y % 400} ≠ 0).`;
      } else {
        justification = `Non divisible par 4 (${y} mod 4 = ${y % 4} ≠ 0).`;
      }

      out.className = `alert ${isLeap ? 'alert-success border-success' : 'alert-danger border-danger'} shadow-sm p-3 rounded d-block`;
      out.innerHTML = `
        <div class="fw-bold fs-5 mb-2">${isLeap ? '🎉 L\'année ' + y + ' est BISSEXTILE (366 jours, 29 février) !' : '❌ L\'année ' + y + ' N\'EST PAS bissextile (365 jours, 28 février).'}</div>
        <hr class="my-2">
        <div class="font-monospace small text-muted">
          <div><strong>1. Justification :</strong> ${justification}</div>
          <div><strong>2. Test booleen :</strong> (${y} mod 4 = 0 et ${y} mod 100 ≠ 0) ou (${y} mod 400 = 0) &rarr; <strong>${isLeap ? 'VRAI' : 'FAUX'}</strong></div>
        </div>
      `;
    }

    if (e.target.closest('#btn-check-salut-quiz')) {
      const q1Bonjour = getEl('salut-q1-bonjour')?.value || '';
      const q1Apresmidi = getEl('salut-q1-apresmidi')?.value || '';
      const q1Bonsoir = getEl('salut-q1-bonsoir')?.value || '';
      const q1Nuit = getEl('salut-q1-nuit')?.value || '';

      const q2Rewrite = getEl('salut-q2-rewrite')?.value || '';

      const fb1 = getEl('salut-q1-feedback');
      const fb2 = getEl('salut-q2-feedback');
      const scoreBox = getEl('salut-quiz-score');

      const q1Ok = (q1Bonjour === '0..11' && q1Apresmidi === '12..17' && q1Bonsoir === '18..20' && q1Nuit === '21..23');
      const q2Ok = (q2Rewrite === 'optA');

      let score = 0;
      if (q1Ok) score++;
      if (q2Ok) score++;

      if (fb1) {
        fb1.classList.remove('d-none', 'alert-success', 'alert-danger');
        if (q1Ok) {
          fb1.className = 'mt-2 alert alert-success mb-0';
          fb1.innerHTML = `✅ Question 1 exacte ! (Tous les 4 intervalles 0..11, 12..17, 18..20, 21..23 sont corrects).`;
        } else {
          fb1.className = 'mt-2 alert alert-danger mb-0';
          fb1.innerHTML = `❌ Question 1 incorrecte. Vérifiez les bornes d'intervalles entiers pour chaque tranche d'heure.`;
        }
      }

      if (fb2) {
        fb2.classList.remove('d-none', 'alert-success', 'alert-danger');
        if (q2Ok) {
          fb2.className = 'mt-2 alert alert-success mb-0';
          fb2.innerHTML = `✅ Question 2 exacte ! (La Proposition A réécrit correctement avec des plages disjointes).`;
        } else {
          fb2.className = 'mt-2 alert alert-danger mb-0';
          fb2.innerHTML = `❌ Question 2 incorrecte [attendu: Proposition A].`;
        }
      }

      if (scoreBox) {
        scoreBox.classList.remove('d-none');
        const pct = Math.round((score / 2) * 100);
        scoreBox.className = `mt-3 alert ${pct === 100 ? 'alert-success' : 'alert-warning'} fw-bold fs-5 shadow-sm`;
        scoreBox.innerHTML = `📊 Score Exercice 13 : ${score} / 2 (${pct}%) ${pct === 100 ? '🎉 Bravo ! Parfaite maîtrise des réécritures Selon.' : '💡 Relisez les indices pour corriger vos erreurs.'}`;
      }
    }

    if (e.target.closest('.btn-salut-preset')) {
      const presetBtn = e.target.closest('.btn-salut-preset');
      const val = presetBtn.dataset.val;
      const input = getEl('salut-t');
      if (input) {
        input.value = val;
        getEl('btn-check-salut')?.click();
      }
    }

    if (e.target.closest('#btn-check-salut')) {
      const input = getEl('salut-t');
      const out = getEl('salut-out');
      if (!input || !out) return;

      const t = parseInt(input.value);
      if (isNaN(t) || t < 0 || t > 23) {
        out.className = 'alert alert-warning shadow-sm';
        out.innerHTML = `⚠️ Veuillez saisir une heure entière valide entre 0 et 23.`;
        return;
      }

      let msg = 'Bonne nuit';
      let badgeClass = 'bg-dark';
      let rangeText = '21..23 (21h ≤ h ≤ 23h)';

      if (t < 12) {
        msg = 'Bonjour';
        badgeClass = 'bg-primary';
        rangeText = '0..11 (0h ≤ h < 12h)';
      } else if (t < 18) {
        msg = 'Bon Après-midi';
        badgeClass = 'bg-warning text-dark';
        rangeText = '12..17 (12h ≤ h < 18h)';
      } else if (t < 21) {
        msg = 'Bonsoir';
        badgeClass = 'bg-info text-dark';
        rangeText = '18..20 (18h ≤ h < 21h)';
      }

      out.className = 'alert alert-light border shadow-sm p-3 rounded d-block';
      out.innerHTML = `
        <div class="d-flex align-items-center justify-content-between flex-wrap gap-2 mb-2">
          <div class="fs-5 fw-bold text-dark">
            Heure saisie : <span class="badge bg-secondary font-monospace fs-5 px-3 py-1">${t}h00</span>
          </div>
          <span class="badge ${badgeClass} fs-5 px-3 py-2">Salutation : "${msg}"</span>
        </div>
        <hr class="my-2">
        <div class="font-monospace small text-muted">
          <div>&bull; Intervalle correspondant : <code>${rangeText}</code></div>
          <div>&bull; Traduction Selon : <code>h ∈ ${rangeText.split(' ')[0]} : Ecrire("${msg}")</code></div>
        </div>
      `;
    }

    if (e.target.closest('.btn-match-preset')) {
      const btn = e.target.closest('.btn-match-preset');
      const inputN1 = getEl('eq1-name');
      const inputS1 = getEl('eq1-score');
      const inputN2 = getEl('eq2-name');
      const inputS2 = getEl('eq2-score');
      if (inputN1) inputN1.value = btn.dataset.n1;
      if (inputS1) inputS1.value = btn.dataset.s1;
      if (inputN2) inputN2.value = btn.dataset.n2;
      if (inputS2) inputS2.value = btn.dataset.s2;
      getEl('btn-match-result')?.click();
    }

    if (e.target.closest('#btn-match-result')) {
      const n1 = (getEl('eq1-name')?.value || 'Équipe 1').trim();
      const s1 = parseInt(getEl('eq1-score')?.value) || 0;
      const n2 = (getEl('eq2-name')?.value || 'Équipe 2').trim();
      const s2 = parseInt(getEl('eq2-score')?.value) || 0;
      const out = getEl('match-out');
      if (!out) return;

      let msg = '';
      let badgeClass = '';
      let condText = '';

      if (s1 > s2) {
        msg = `L'équipe <strong>${n1}</strong> a gagné !`;
        badgeClass = 'bg-success';
        condText = `sc1 (${s1}) > sc2 (${s2}) → Victoire de ${n1}`;
      } else if (s2 > s1) {
        msg = `L'équipe <strong>${n2}</strong> a gagné !`;
        badgeClass = 'bg-success';
        condText = `sc2 (${s2}) > sc1 (${s1}) → Victoire de ${n2}`;
      } else {
        msg = `Match nul.`;
        badgeClass = 'bg-warning text-dark';
        condText = `sc1 (${s1}) = sc2 (${s2}) → Égalité parfaite`;
      }

      out.className = 'alert alert-light border shadow-sm p-3 rounded d-block';
      out.innerHTML = `
        <div class="d-flex align-items-center justify-content-between flex-wrap gap-2 mb-2">
          <div class="fs-5 fw-bold text-dark">
            Affichage des scores : <span class="badge bg-secondary font-monospace fs-5 px-3 py-1">${n1} ${s1} - ${s2} ${n2}</span>
          </div>
          <span class="badge ${badgeClass} fs-5 px-3 py-2">${msg}</span>
        </div>
        <hr class="my-2">
        <div class="font-monospace small text-muted">
          <div>&bull; Branche conditionnelle exécutée : <code>${condText}</code></div>
          <div>&bull; Message de sortie : <strong>"${msg.replace(/<[^>]*>/g, '')}"</strong></div>
        </div>
      `;
    }

    if (e.target.closest('.btn-eq1d-preset')) {
      const btn = e.target.closest('.btn-eq1d-preset');
      const inputA = getEl('eq1d-a');
      const inputB = getEl('eq1d-b');
      if (inputA) inputA.value = btn.dataset.a;
      if (inputB) inputB.value = btn.dataset.b;
      getEl('btn-calc-eq1d')?.click();
    }

    if (e.target.closest('#btn-calc-eq1d')) {
      const inputA = getEl('eq1d-a');
      const inputB = getEl('eq1d-b');
      const out = getEl('eq1d-out');
      if (!inputA || !inputB || !out) return;

      const a = parseFloat(inputA.value);
      const b = parseFloat(inputB.value);

      if (isNaN(a) || isNaN(b)) {
        out.className = 'alert alert-warning shadow-sm';
        out.innerHTML = `⚠️ Veuillez saisir des valeurs numériques valides pour a et b.`;
        return;
      }

      let resText = '';
      let badgeClass = '';
      let condText = '';

      if (a !== 0) {
        const x = -b / a;
        resText = `Solution unique : x = ${x % 1 === 0 ? x.toFixed(1) : x.toFixed(2)} (S = {${x % 1 === 0 ? x.toFixed(1) : x.toFixed(2)}})`;
        badgeClass = 'bg-success';
        condText = `a (${a}) ≠ 0 → Branche Si (x ← -b/a = -(${b})/${a})`;
      } else {
        if (b === 0) {
          resText = `Infinité de solutions (S = ℝ)`;
          badgeClass = 'bg-info text-dark';
          condText = `a = 0 ET b = 0 → Branche Sinon Si (Tout réel x est solution)`;
        } else {
          resText = `Aucune solution / Impossible (S = ∅)`;
          badgeClass = 'bg-danger';
          condText = `a = 0 ET b (${b}) ≠ 0 → Branche Sinon (Équation impossible)`;
        }
      }

      const eqExpr = `${a === 0 ? '0' : (a === 1 ? '' : (a === -1 ? '-' : a))}x ${b >= 0 ? '+ ' + b : '- ' + Math.abs(b)} = 0`;

      out.className = 'alert alert-light border shadow-sm p-3 rounded d-block';
      out.innerHTML = `
        <div class="d-flex align-items-center justify-content-between flex-wrap gap-2 mb-2">
          <div class="fs-5 fw-bold text-dark">
            Équation : <span class="badge bg-secondary font-monospace fs-5 px-3 py-1">${eqExpr}</span>
          </div>
          <span class="badge ${badgeClass} fs-5 px-3 py-2">${resText}</span>
        </div>
        <hr class="my-2">
        <div class="font-monospace small text-muted">
          <div>&bull; Test effectue : <code>${condText}</code></div>
          <div>&bull; Ensemble des solutions : <strong>${resText}</strong></div>
        </div>
      `;
    }

    if (e.target.closest('.btn-tri-preset')) {
      const btn = e.target.closest('.btn-tri-preset');
      const inputA = getEl('tri-a');
      const inputB = getEl('tri-b');
      const inputC = getEl('tri-c');
      if (inputA) inputA.value = btn.dataset.a;
      if (inputB) inputB.value = btn.dataset.b;
      if (inputC) inputC.value = btn.dataset.c;
      getEl('btn-calc-tri')?.click();
    }

    if (e.target.closest('#btn-calc-tri')) {
      const inputA = getEl('tri-a');
      const inputB = getEl('tri-b');
      const inputC = getEl('tri-c');
      const out = getEl('tri-out');
      if (!inputA || !inputB || !inputC || !out) return;

      const a = parseFloat(inputA.value);
      const b = parseFloat(inputB.value);
      const c = parseFloat(inputC.value);

      if (isNaN(a) || isNaN(b) || isNaN(c) || a <= 0 || b <= 0 || c <= 0) {
        out.className = 'alert alert-warning shadow-sm';
        out.innerHTML = `⚠️ Veuillez saisir des longueurs strictly positives pour a, b et c.`;
        return;
      }

      // Check Triangular Inequality
      const isValid = (a + b > c) && (a + c > b) && (b + c > a);

      if (!isValid) {
        out.className = 'alert alert-danger border-danger shadow-sm p-3 rounded d-block';
        out.innerHTML = `
          <div class="d-flex align-items-center justify-content-between flex-wrap gap-2 mb-2">
            <div class="fs-5 fw-bold text-dark">
              Côtés : <span class="badge bg-secondary font-monospace fs-5 px-3 py-1">a=${a}, b=${b}, c=${c}</span>
            </div>
            <span class="badge bg-danger fs-5 px-3 py-2">Non Triangle</span>
          </div>
          <hr class="my-2">
          <div class="font-monospace small text-muted">
            <div>&bull; Inégalité triangulaire non vérifiée : <code>(${a} + ${b} = ${a + b} ≯ ${c})</code></div>
            <div>&bull; Résultat affiché : <strong>"ABC n'est pas un triangle."</strong></div>
          </div>
        `;
        return;
      }

      // Determine nature
      const isEqui = (a === b && b === c);
      const isRect = (Math.abs(a * a + b * b - c * c) < 0.001 || Math.abs(a * a + c * c - b * b) < 0.001 || Math.abs(b * b + c * c - a * a) < 0.001);
      const isIso = (a === b || a === c || b === c);

      let nature = 'Triangle quelconque';
      let badgeClass = 'bg-primary';
      let condDetail = 'Aucun côté égal, non rectangle';

      if (isEqui) {
        nature = 'Triangle équilatéral';
        badgeClass = 'bg-purple text-white';
        condDetail = `a = b = c = ${a} (3 côtés de même longueur)`;
      } else if (isRect && isIso) {
        nature = 'Triangle rectangle et isocèle';
        badgeClass = 'bg-info text-dark';
        condDetail = `Pythagore vérifié (a*a + b*b = c*c) ET 2 côtés égaux`;
      } else if (isRect) {
        nature = 'Triangle rectangle';
        badgeClass = 'bg-primary';
        condDetail = `Théorème de Pythagore vérifié (a*a + b*b = c*c ou permutation)`;
      } else if (isIso) {
        nature = 'Triangle isocèle';
        badgeClass = 'bg-success';
        condDetail = `2 côtés égaux de même longueur`;
      }

      out.className = 'alert alert-light border shadow-sm p-3 rounded d-block';
      out.innerHTML = `
        <div class="d-flex align-items-center justify-content-between flex-wrap gap-2 mb-2">
          <div class="fs-5 fw-bold text-dark">
            Côtés : <span class="badge bg-secondary font-monospace fs-5 px-3 py-1">a=${a}, b=${b}, c=${c}</span>
          </div>
          <span class="badge ${badgeClass} fs-5 px-3 py-2">Nature : ${nature}</span>
        </div>
        <hr class="my-2">
        <div class="font-monospace small text-muted">
          <div>&bull; Inégalité triangulaire vérifiée : <code>(${a}+${b}&gt;${c}), (${a}+${c}&gt;${b}), (${b}+${c}&gt;${a})</code> &rarr; <strong>VRAI</strong></div>
          <div>&bull; Justification : <strong>${condDetail}</strong></div>
          <div>&bull; Résultat affiché : <strong>"ABC est un ${nature.toLowerCase()}."</strong></div>
        </div>
      `;
    }

    if (e.target.closest('.btn-eq2d-preset')) {
      const btn = e.target.closest('.btn-eq2d-preset');
      const inputA = getEl('eq-a');
      const inputB = getEl('eq-b');
      const inputC = getEl('eq-c');
      if (inputA) inputA.value = btn.dataset.a;
      if (inputB) inputB.value = btn.dataset.b;
      if (inputC) inputC.value = btn.dataset.c;
      getEl('btn-calc-eq')?.click();
    }

    if (e.target.closest('#btn-calc-eq')) {
      const inputA = getEl('eq-a');
      const inputB = getEl('eq-b');
      const inputC = getEl('eq-c');
      const out = getEl('eq-out');
      if (!inputA || !inputB || !inputC || !out) return;

      const a = parseFloat(inputA.value);
      const b = parseFloat(inputB.value);
      const c = parseFloat(inputC.value);

      if (isNaN(a) || isNaN(b) || isNaN(c)) {
        out.className = 'alert alert-warning shadow-sm';
        out.innerHTML = `⚠️ Veuillez saisir des valeurs numériques valides pour a, b et c.`;
        return;
      }

      if (a === 0) {
        out.className = 'alert alert-warning shadow-sm';
        out.innerHTML = `⚠️ Le coefficient 'a' doit être différent de 0 (sinon il s'agit d'une équation du 1er degré).`;
        return;
      }

      const delta = b * b - 4 * a * c;

      let resText = '';
      let badgeClass = '';
      let condText = '';

      if (delta > 0) {
        const x1 = (-b - Math.sqrt(delta)) / (2 * a);
        const x2 = (-b + Math.sqrt(delta)) / (2 * a);
        const fmtX1 = x1 % 1 === 0 ? x1.toFixed(1) : x1.toFixed(2);
        const fmtX2 = x2 % 1 === 0 ? x2.toFixed(1) : x2.toFixed(2);
        resText = `Deux solutions réelles : x₁ = ${fmtX1} et x₂ = ${fmtX2} (S = {${fmtX1}, ${fmtX2}})`;
        badgeClass = 'bg-success';
        condText = `Δ (${delta}) > 0 → Branche Si (x₁ = (-b - √Δ)/(2a), x₂ = (-b + √Δ)/(2a))`;
      } else if (delta === 0) {
        const x0 = -b / (2 * a);
        const fmtX0 = x0 % 1 === 0 ? x0.toFixed(1) : x0.toFixed(2);
        resText = `Solution double réelle : x₀ = ${fmtX0} (S = {${fmtX0}})`;
        badgeClass = 'bg-info text-dark';
        condText = `Δ = 0 → Branche Sinon Si (x₀ = -b / (2a))`;
      } else {
        resText = `Aucune solution réelle dans ℝ (S = ∅)`;
        badgeClass = 'bg-danger';
        condText = `Δ (${delta}) < 0 → Branche Sinon (Racine carrée impossible dans ℝ)`;
      }

      const eqExpr = `${a === 1 ? '' : (a === -1 ? '-' : a)}x² ${b >= 0 ? '+ ' + b : '- ' + Math.abs(b)}x ${c >= 0 ? '+ ' + c : '- ' + Math.abs(c)} = 0`;

      out.className = 'alert alert-light border shadow-sm p-3 rounded d-block';
      out.innerHTML = `
        <div class="d-flex align-items-center justify-content-between flex-wrap gap-2 mb-2">
          <div class="fs-5 fw-bold text-dark">
            Équation : <span class="badge bg-secondary font-monospace fs-5 px-3 py-1">${eqExpr}</span>
          </div>
          <span class="badge ${badgeClass} fs-5 px-3 py-2">${resText}</span>
        </div>
        <hr class="my-2">
        <div class="font-monospace small text-muted">
          <div>&bull; Discriminant calcule : <code>Δ = (${b})² - 4*(${a})*(${c}) = ${delta}</code></div>
          <div>&bull; Branche conditionnelle : <code>${condText}</code></div>
          <div>&bull; Ensemble des solutions : <strong>${resText}</strong></div>
        </div>
      `;
    }
  });

  // -------------------------------------------------------------
  // 3D Molecular Renderer for Alcohols (C_n H_{2n+2} O)
  // -------------------------------------------------------------
  const alc3DState = {
    n: 2,
    rotX: 0.3,
    rotY: 0.5,
    autoRotate: true,
    showLabels: true,
    zoom: 320,
    isDragging: false,
    lastMouseX: 0,
    lastMouseY: 0,
    atoms: [],
    bonds: [],
    animId: null
  };

  function buildAlcohol3DModel(n) {
    const atoms = [];
    const bonds = [];
    const spacing = n > 5 ? 1.1 : 1.35;

    for (let i = 0; i < n; i++) {
      const x = (i - (n - 1) / 2) * spacing;
      const y = (i % 2 === 0 ? 0.45 : -0.45);
      const z = (i % 2 === 0 ? -0.25 : 0.25);
      atoms.push({ type: 'C', label: `C${i + 1}`, x, y, z, r: 0.55, color: '#334155' });

      if (i > 0) {
        bonds.push({ from: i - 1, to: i });
      }
    }

    const oIdx = atoms.length;
    const c1 = atoms[0];
    const ox = c1.x - 1.2;
    const oy = c1.y - 0.8;
    const oz = c1.z + 0.6;
    atoms.push({ type: 'O', label: 'O', x: ox, y: oy, z: oz, r: 0.52, color: '#ef4444' });
    bonds.push({ from: 0, to: oIdx });

    const hoIdx = atoms.length;
    atoms.push({ type: 'H', label: 'H', x: ox - 0.6, y: oy - 0.5, z: oz + 0.5, r: 0.38, color: '#f8fafc' });
    bonds.push({ from: oIdx, to: hoIdx });

    for (let i = 0; i < n; i++) {
      const c = atoms[i];
      const isTerminal = (i === n - 1);
      const isC1 = (i === 0);

      if (isC1) {
        const h1Idx = atoms.length;
        atoms.push({ type: 'H', label: 'H', x: c.x, y: c.y + 0.95, z: c.z + 0.6, r: 0.38, color: '#f8fafc' });
        bonds.push({ from: 0, to: h1Idx });

        const h2Idx = atoms.length;
        atoms.push({ type: 'H', label: 'H', x: c.x + 0.5, y: c.y + 0.6, z: c.z - 0.8, r: 0.38, color: '#f8fafc' });
        bonds.push({ from: 0, to: h2Idx });
      } else {
        const h1Idx = atoms.length;
        atoms.push({ type: 'H', label: 'H', x: c.x, y: c.y + 0.95, z: c.z + (i % 2 === 0 ? 0.7 : -0.7), r: 0.38, color: '#f8fafc' });
        bonds.push({ from: i, to: h1Idx });

        const h2Idx = atoms.length;
        atoms.push({ type: 'H', label: 'H', x: c.x, y: c.y - 0.95, z: c.z + (i % 2 === 0 ? -0.7 : 0.7), r: 0.38, color: '#f8fafc' });
        bonds.push({ from: i, to: h2Idx });

        if (isTerminal) {
          const h3Idx = atoms.length;
          atoms.push({ type: 'H', label: 'H', x: c.x + 1.05, y: c.y, z: c.z, r: 0.38, color: '#f8fafc' });
          bonds.push({ from: i, to: h3Idx });
        }
      }
    }

    alc3DState.atoms = atoms;
    alc3DState.bonds = bonds;
  }

  function renderAlcohol3DFraming() {
    const canvas = getEl('molecule-3d-canvas');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    const w = canvas.width;
    const h = canvas.height;
    const cx = w / 2;
    const cy = h / 2;

    ctx.clearRect(0, 0, w, h);

    if (alc3DState.autoRotate && !alc3DState.isDragging) {
      alc3DState.rotY += 0.012;
    }

    const cosX = Math.cos(alc3DState.rotX);
    const sinX = Math.sin(alc3DState.rotX);
    const cosY = Math.cos(alc3DState.rotY);
    const sinY = Math.sin(alc3DState.rotY);

    if (!alc3DState.atoms || alc3DState.atoms.length === 0) {
      buildAlcohol3DModel(alc3DState.n || 2);
    }

    const projAtoms = alc3DState.atoms.map((a, idx) => {
      let x1 = a.x * cosY - a.z * sinY;
      let z1 = a.x * sinY + a.z * cosY;
      let y1 = a.y;

      let y2 = y1 * cosX - z1 * sinX;
      let z2 = y1 * sinX + z1 * cosX;

      const fov = alc3DState.zoom;
      const dist = Math.max(1.0, z2 + 8.0);
      const perspective = fov / dist;
      const px = cx + x1 * perspective;
      const py = cy + y2 * perspective;
      const pr = Math.max(12, a.r * perspective);

      return { idx, type: a.type, label: a.label, px, py, pr, z: z2, color: a.color };
    });

    const drawList = [];

    alc3DState.bonds.forEach(b => {
      const a1 = projAtoms[b.from];
      const a2 = projAtoms[b.to];
      if (a1 && a2) {
        const avgZ = (a1.z + a2.z) / 2;
        drawList.push({ itemType: 'bond', a1, a2, z: avgZ });
      }
    });

    projAtoms.forEach(a => {
      drawList.push({ itemType: 'atom', atom: a, z: a.z });
    });

    drawList.sort((a, b) => b.z - a.z);

    drawList.forEach(item => {
      if (item.itemType === 'bond') {
        const { a1, a2 } = item;
        const distZ = Math.max(1.0, item.z + 8.0);
        ctx.beginPath();
        ctx.moveTo(a1.px, a1.py);
        ctx.lineTo(a2.px, a2.py);
        ctx.strokeStyle = '#94a3b8';
        ctx.lineWidth = Math.max(2, 45 / distZ);
        ctx.lineCap = 'round';
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(a1.px, a1.py);
        ctx.lineTo(a2.px, a2.py);
        ctx.strokeStyle = '#cbd5e1';
        ctx.lineWidth = Math.max(1, 15 / distZ);
        ctx.stroke();
      } else if (item.itemType === 'atom') {
        const a = item.atom;
        if (isNaN(a.px) || isNaN(a.py) || isNaN(a.pr) || a.pr <= 0) return;

        ctx.save();

        const grad = ctx.createRadialGradient(
          a.px - a.pr * 0.3, a.py - a.pr * 0.3, Math.max(1, a.pr * 0.1),
          a.px, a.py, a.pr
        );

        if (a.type === 'C') {
          grad.addColorStop(0, '#64748b');
          grad.addColorStop(0.7, '#1e293b');
          grad.addColorStop(1, '#0f172a');
        } else if (a.type === 'O') {
          grad.addColorStop(0, '#fca5a5');
          grad.addColorStop(0.6, '#ef4444');
          grad.addColorStop(1, '#7f1d1d');
        } else {
          grad.addColorStop(0, '#ffffff');
          grad.addColorStop(0.7, '#e2e8f0');
          grad.addColorStop(1, '#94a3b8');
        }

        ctx.beginPath();
        ctx.arc(a.px, a.py, a.pr, 0, Math.PI * 2);
        ctx.fillStyle = grad;
        ctx.fill();
        ctx.strokeStyle = (a.type === 'H' ? '#cbd5e1' : 'rgba(0,0,0,0.4)');
        ctx.lineWidth = 1.5;
        ctx.stroke();

        if (alc3DState.showLabels) {
          ctx.fillStyle = '#ffffff';
          ctx.font = `bold ${Math.max(12, Math.round(a.pr * 0.75))}px Consolas, monospace`;
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          ctx.shadowColor = '#000000';
          ctx.shadowBlur = 4;
          ctx.fillText(a.type, a.px, a.py);
          ctx.shadowBlur = 0;
        }

        ctx.restore();
      }
    });

    alc3DState.animId = requestAnimationFrame(renderAlcohol3DFraming);
  }

  function init3DMoleculeEvents() {
    const canvas = getEl('molecule-3d-canvas');
    if (!canvas || canvas.dataset.initialized) return;
    canvas.dataset.initialized = 'true';

    canvas.addEventListener('mousedown', (e) => {
      alc3DState.isDragging = true;
      alc3DState.lastMouseX = e.clientX;
      alc3DState.lastMouseY = e.clientY;
      canvas.style.cursor = 'grabbing';
    });

    window.addEventListener('mousemove', (e) => {
      if (!alc3DState.isDragging) return;
      const dx = e.clientX - alc3DState.lastMouseX;
      const dy = e.clientY - alc3DState.lastMouseY;
      alc3DState.rotY += dx * 0.008;
      alc3DState.rotX += dy * 0.008;
      alc3DState.lastMouseX = e.clientX;
      alc3DState.lastMouseY = e.clientY;
    });

    window.addEventListener('mouseup', () => {
      if (alc3DState.isDragging) {
        alc3DState.isDragging = false;
        if (canvas) canvas.style.cursor = 'grab';
      }
    });
  }

  document.addEventListener('click', (e) => {
    if (e.target.closest('.btn-alc-preset')) {
      const btn = e.target.closest('.btn-alc-preset');
      const formula = btn.dataset.formula;
      const input = getEl('alc-formula');
      if (input) {
        input.value = formula;
        getEl('btn-check-alcohol')?.click();
      }
    }

    if (e.target.closest('#btn-alc-rotate')) {
      const btn = getEl('btn-alc-rotate');
      alc3DState.autoRotate = !alc3DState.autoRotate;
      if (btn) btn.classList.toggle('active', alc3DState.autoRotate);
    }

    if (e.target.closest('#btn-alc-labels')) {
      const btn = getEl('btn-alc-labels');
      alc3DState.showLabels = !alc3DState.showLabels;
      if (btn) btn.classList.toggle('active', alc3DState.showLabels);
    }

    if (e.target.closest('#btn-alc-zoom-in')) {
      alc3DState.zoom = Math.min(550, alc3DState.zoom + 50);
    }

    if (e.target.closest('#btn-alc-zoom-out')) {
      alc3DState.zoom = Math.max(120, alc3DState.zoom - 50);
    }

    if (e.target.closest('#btn-check-alcohol')) {
      const input = getEl('alc-formula');
      const out = getEl('alc-out');
      const titleBadge = getEl('alc-3d-title');
      if (!input || !out) return;

      const f = input.value.trim().toUpperCase();
      const match = f.match(/^C(\d*)H(\d+)O$/);
      if (!match) {
        out.className = 'alert alert-danger border-danger shadow-sm p-3 rounded d-block';
        out.innerHTML = `❌ Formule <strong>"${f}"</strong> invalide ! La formule brute d'un alcool doit être de la forme <code>CnH₂n+₂O</code>.`;
        return;
      }

      const n = match[1] === '' ? 1 : parseInt(match[1]);
      const h = parseInt(match[2]);

      const expectedH = 2 * n + 2;
      if (h !== expectedH) {
        out.className = 'alert alert-warning border-warning shadow-sm p-3 rounded d-block';
        out.innerHTML = `⚠️ La formule <strong>"${f}"</strong> N'EST PAS un alcool ! Pour ${n} Carbone(s), le nombre d'atomes d'Hydrogène devrait être <code>2*${n} + 2 = ${expectedH}</code> (obtenu: ${h}).`;
        return;
      }

      const massC = n * 12.01;
      const massH = h * 1.008;
      const massO = 16.00;
      const molarMass = massC + massH + massO;

      const namesMap = { 1: 'Méthanol', 2: 'Éthanol', 3: 'Propanol', 4: 'Butanol', 5: 'Pentanol', 6: 'Hexanol' };
      const name = namesMap[n] || 'Alcool à longue chaîne';

      let structFormula = '';
      if (n === 1) structFormula = 'CH₃ - OH';
      else if (n === 2) structFormula = 'CH₃ - CH₂ - OH';
      else structFormula = 'CH₃ - ' + 'CH₂ - '.repeat(n - 2) + 'CH₂ - OH';

      if (titleBadge) titleBadge.innerHTML = `${name} (${f})`;

      init3DMoleculeEvents();
      buildAlcohol3DModel(n);
      if (!alc3DState.animId) renderAlcohol3DFraming();

      out.className = 'alert alert-light border shadow-sm p-3 rounded d-block';
      out.innerHTML = `
        <div class="d-flex align-items-center justify-content-between flex-wrap gap-2 mb-2">
          <div class="fs-5 fw-bold text-dark">
            Formule brute : <span class="badge bg-secondary font-monospace fs-5 px-3 py-1">${f}</span>
          </div>
          <span class="badge bg-danger fs-5 px-3 py-2">Alcool identifié : ${name}</span>
        </div>
        <hr class="my-2">
        <div class="row g-2 text-dark font-monospace small">
          <div class="col-12 col-md-6">
            <div>&bull; Atomes de Carbone (C) : <strong>${n}</strong></div>
            <div>&bull; Atomes d'Hydrogène (H) : <strong>${h}</strong> (2*${n} + 2 = ${h})</div>
            <div>&bull; Atome d'Oxygène (O) : <strong>1</strong></div>
          </div>
          <div class="col-12 col-md-6">
            <div>&bull; Formule semi-développée : <code class="fs-6">${structFormula}</code></div>
            <div>&bull; Calcul masse molaire M : <code>${n}*12.01 + ${h}*1.008 + 16.00</code></div>
            <div class="fs-6 fw-bold text-primary">&bull; Masse molaire M = ${molarMass.toFixed(3)} g/mol</div>
          </div>
        </div>
      `;
    }

    if (e.target.closest('.btn-affine-preset')) {
      const btn = e.target.closest('.btn-affine-preset');
      const inputA1 = getEl('a1-val');
      const inputB1 = getEl('b1-val');
      const inputA2 = getEl('a2-val');
      const inputB2 = getEl('b2-val');
      if (inputA1) inputA1.value = btn.dataset.a1;
      if (inputB1) inputB1.value = btn.dataset.b1;
      if (inputA2) inputA2.value = btn.dataset.a2;
      if (inputB2) inputB2.value = btn.dataset.b2;
      getEl('btn-calc-affine')?.click();
    }

    if (e.target.closest('#btn-calc-affine')) {
      const inputA1 = getEl('a1-val');
      const inputB1 = getEl('b1-val');
      const inputA2 = getEl('a2-val');
      const inputB2 = getEl('b2-val');
      const out = getEl('lines-result');
      if (!inputA1 || !inputB1 || !inputA2 || !inputB2 || !out) return;

      const a1 = parseFloat(inputA1.value);
      const b1 = parseFloat(inputB1.value);
      const a2 = parseFloat(inputA2.value);
      const b2 = parseFloat(inputB2.value);

      if (isNaN(a1) || isNaN(b1) || isNaN(a2) || isNaN(b2)) {
        out.className = 'alert alert-warning shadow-sm';
        out.innerHTML = `⚠️ Veuillez saisir des coefficients numériques valides pour a₁, b₁, a₂ et b₂.`;
        return;
      }

      let posText = '';
      let badgeClass = '';
      let condText = '';
      let interPt = null;

      const isSameSlope = Math.abs(a1 - a2) < 0.0001;
      const isSameIntercept = Math.abs(b1 - b2) < 0.0001;
      const isOrthogonal = Math.abs(a1 * a2 + 1) < 0.0001;

      if (isSameSlope) {
        if (isSameIntercept) {
          posText = 'Droites confondues (D₁ = D₂)';
          badgeClass = 'bg-secondary';
          condText = `a₁ = a₂ (${a1}) et b₁ = b₂ (${b1}) → Infinité de points d'intersection (S = ℝ²)`;
        } else {
          posText = 'Droites parallèles (D₁ ∥ D₂)';
          badgeClass = 'bg-info text-dark';
          condText = `a₁ = a₂ (${a1}) et b₁ ≠ b₂ (${b1} ≠ ${b2}) → Aucune intersection (S = ∅)`;
        }
      } else {
        const x = (b2 - b1) / (a1 - a2);
        const y = a1 * x + b1;
        interPt = { x, y };

        const fmtX = x % 1 === 0 ? x.toFixed(1) : x.toFixed(2);
        const fmtY = y % 1 === 0 ? y.toFixed(1) : y.toFixed(2);

        if (isOrthogonal) {
          posText = `Droites orthogonales au point I(${fmtX}, ${fmtY})`;
          badgeClass = 'bg-success';
          condText = `a₁ * a₂ = ${a1} * ${a2} = -1 → Angle droit 90° au point I(${fmtX}, ${fmtY})`;
        } else {
          posText = `Droites sécantes au point I(${fmtX}, ${fmtY})`;
          badgeClass = 'bg-primary';
          condText = `a₁ ≠ a₂ (${a1} ≠ ${a2}) → Intersection unique au point I(${fmtX}, ${fmtY})`;
        }
      }

      const eq1 = `y = ${a1 === 1 ? '' : (a1 === -1 ? '-' : a1)}x ${b1 >= 0 ? '+ ' + b1 : '- ' + Math.abs(b1)}`;
      const eq2 = `y = ${a2 === 1 ? '' : (a2 === -1 ? '-' : a2)}x ${b2 >= 0 ? '+ ' + b2 : '- ' + Math.abs(b2)}`;

      renderAffineCanvas(a1, b1, a2, b2, interPt, isOrthogonal);

      let interHTML = '';
      if (interPt) {
        interHTML = '<div>&bull; Coordonnées exactes : <strong>x = (' + b2 + ' - ' + b1 + ') / (' + a1 + ' - (' + a2 + ')) = ' + interPt.x.toFixed(3) + '</strong>, <strong>y = ' + interPt.y.toFixed(3) + '</strong></div>';
      }

      out.className = 'alert alert-light border shadow-sm p-3 rounded d-block';
      out.innerHTML = `
        <div class="d-flex align-items-center justify-content-between flex-wrap gap-2 mb-2">
          <div class="fs-5 fw-bold text-dark">
            Equations : <span class="badge bg-primary font-monospace fs-6 px-2 py-1">D₁: ${eq1}</span> <span class="badge bg-danger font-monospace fs-6 px-2 py-1">D₂: ${eq2}</span>
          </div>
          <span class="badge ${badgeClass} fs-5 px-3 py-2">${posText}</span>
        </div>
        <hr class="my-2">
        <div class="font-monospace small text-muted">
          <div>&bull; Test des pentes : <code>a₁ = ${a1}, a₂ = ${a2}</code> (Produit a₁*a₂ = ${(a1*a2).toFixed(2)})</div>
          <div>&bull; Relation géométrique : <code>${condText}</code></div>
          ${interHTML}
        </div>
      `;
    }
  });

  // -------------------------------------------------------------
  // 2D Affine Line Canvas Renderer
  // -------------------------------------------------------------
  function renderAffineCanvas(a1, b1, a2, b2, interPt, isOrtho) {
    const canvas = getEl('affine-canvas');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    const w = canvas.width;
    const h = canvas.height;
    const cx = w / 2;
    const cy = h / 2;
    const scale = 30;

    ctx.clearRect(0, 0, w, h);

    ctx.strokeStyle = '#f1f5f9';
    ctx.lineWidth = 1;
    for (let x = cx % scale; x < w; x += scale) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, h);
      ctx.stroke();
    }
    for (let y = cy % scale; y < h; y += scale) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(w, y);
      ctx.stroke();
    }

    ctx.strokeStyle = '#64748b';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(0, cy);
    ctx.lineTo(w, cy);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(cx, 0);
    ctx.lineTo(cx, h);
    ctx.stroke();

    ctx.fillStyle = '#334155';
    ctx.font = '11px Consolas, monospace';
    ctx.textAlign = 'right';
    ctx.textBaseline = 'top';
    ctx.fillText('O', cx - 6, cy + 6);
    ctx.font = 'bold 12px system-ui, sans-serif';
    ctx.textAlign = 'left';
    ctx.fillText('x', w - 15, cy - 16);
    ctx.fillText('y', cx + 10, 10);

    for (let val = -10; val <= 10; val++) {
      if (val === 0) continue;
      const gx = cx + val * scale;
      if (gx > 15 && gx < w - 15) {
        ctx.beginPath();
        ctx.moveTo(gx, cy - 4);
        ctx.lineTo(gx, cy + 4);
        ctx.strokeStyle = '#475569';
        ctx.lineWidth = 1.5;
        ctx.stroke();

        ctx.fillStyle = '#64748b';
        ctx.font = '10px Consolas, monospace';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'top';
        ctx.fillText(val.toString(), gx, cy + 6);
      }
    }

    for (let val = -5; val <= 5; val++) {
      if (val === 0) continue;
      const gy = cy - val * scale;
      if (gy > 15 && gy < h - 15) {
        ctx.beginPath();
        ctx.moveTo(cx - 4, gy);
        ctx.lineTo(cx + 4, gy);
        ctx.strokeStyle = '#475569';
        ctx.lineWidth = 1.5;
        ctx.stroke();

        ctx.fillStyle = '#64748b';
        ctx.font = '10px Consolas, monospace';
        ctx.textAlign = 'right';
        ctx.textBaseline = 'middle';
        ctx.fillText(val.toString(), cx - 7, gy);
      }
    }

    const toPx = x => cx + x * scale;
    const toPy = y => cy - y * scale;

    const minX = -15;
    const maxX = 15;

    ctx.beginPath();
    ctx.moveTo(toPx(minX), toPy(a1 * minX + b1));
    ctx.lineTo(toPx(maxX), toPy(a1 * maxX + b1));
    ctx.strokeStyle = '#2563eb';
    ctx.lineWidth = 3;
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(toPx(minX), toPy(a2 * minX + b2));
    ctx.lineTo(toPx(maxX), toPy(a2 * maxX + b2));
    ctx.strokeStyle = '#ef4444';
    ctx.lineWidth = 3;
    ctx.stroke();

    if (interPt) {
      const ipx = toPx(interPt.x);
      const ipy = toPy(interPt.y);

      ctx.beginPath();
      ctx.arc(ipx, ipy, 10, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(245, 158, 11, 0.3)';
      ctx.fill();

      ctx.beginPath();
      ctx.arc(ipx, ipy, 5, 0, Math.PI * 2);
      ctx.fillStyle = '#f59e0b';
      ctx.fill();
      ctx.strokeStyle = '#ffffff';
      ctx.lineWidth = 2;
      ctx.stroke();

      const fmtX = interPt.x % 1 === 0 ? interPt.x.toFixed(1) : interPt.x.toFixed(2);
      const fmtY = interPt.y % 1 === 0 ? interPt.y.toFixed(1) : interPt.y.toFixed(2);
      const labelStr = `I (${fmtX}, ${fmtY})`;

      ctx.fillStyle = '#0f172a';
      ctx.font = 'bold 12px Consolas, monospace';
      ctx.shadowColor = 'rgba(255,255,255,0.8)';
      ctx.shadowBlur = 4;
      ctx.fillText(labelStr, ipx + 8, ipy - 8);
      ctx.shadowBlur = 0;
    }
  }

  function startInitial3DAlcohol() {
    const canvas = getEl('molecule-3d-canvas');
    if (canvas) {
      init3DMoleculeEvents();
      buildAlcohol3DModel(2);
      if (!alc3DState.animId) renderAlcohol3DFraming();
    }
    const affineCanvas = getEl('affine-canvas');
    if (affineCanvas) {
      getEl('btn-calc-affine')?.click();
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', startInitial3DAlcohol);
  } else {
    startInitial3DAlcohol();
  }
  setTimeout(startInitial3DAlcohol, 300);
});
