/**
 * Antigravity Interactive Modules Engine - Module 5 (Structures Itératives & Modules Additionnels)
 * Enseignant: Mohamed Anis MANI - Cours Informatique 2e Sciences
 */

// Helper functions for DOM manipulation
if (typeof window.getEl !== 'function') {
  window.getEl = id => document.getElementById(id);
}

document.addEventListener('DOMContentLoaded', () => {

  // -------------------------------------------------------------
  // Module 5 Handlers - Exercice 1 (Fonction range)
  // -------------------------------------------------------------
  function highlightCode(code, lang) {
    if (typeof window.hljs !== 'undefined') {
      try {
        if (window.hljs.getLanguage && window.hljs.getLanguage(lang)) {
          return window.hljs.highlight(code, { language: lang }).value;
        } else if (window.hljs.highlightAuto) {
          return window.hljs.highlightAuto(code).value;
        }
      } catch (err) {
        // Fallback
      }
    }
    return code
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;");
  }

  function updateRangeSimulation() {
    const varName = (getEl('rng-var')?.value || 'i').trim();
    const vi = parseInt(getEl('rng-start')?.value) || 0;
    const vf = parseInt(getEl('rng-end')?.value) || 0;
    const step = parseInt(getEl('rng-step')?.value) || 1;
    const out = getEl('rng-out');
    if (!out) return;

    if (step === 0) {
      out.innerHTML = `<div class="alert alert-danger shadow-sm border-0 mb-0">⚠️ Erreur : Le pas (step) ne peut pas être égal à 0 en Python (provoque <code>ValueError: range() arg 3 must not be zero</code>).</div>`;
      return;
    }

    let values = [];
    if (step > 0) {
      for (let v = vi; v < vf; v += step) values.push(v);
    } else {
      for (let v = vi; v > vf; v += step) values.push(v);
    }

    const pyCodeFull = step === 1
      ? `for ${varName} in range(${vi}, ${vf}):\n    print(${varName})`
      : `for ${varName} in range(${vi}, ${vf}, ${step}):\n    print(${varName})`;

    let algoCode = '';
    if (values.length > 0) {
      const minV = values[0];
      const maxV = values[values.length - 1];
      const pasStr = step !== 1 ? ` [Pas=${step}]` : '';
      algoCode = `Pour ${varName} de ${minV} à ${maxV} Faire${pasStr}\n    Ecrire(${varName})\nFin Pour`;
    } else {
      algoCode = `// Boucle non exécutée (Intervalle vide)`;
    }

    const highlightedPy = highlightCode(pyCodeFull, 'python');
    const highlightedAlgo = highlightCode(algoCode, 'algorithm');

    let valBadges = values.length > 0
      ? values.map((val, idx) => `<span class="badge bg-primary font-monospace fs-6 me-1 mb-1 px-3 py-2 shadow-sm" title="Itération ${idx + 1}">${val}</span>`).join('')
      : `<span class="badge bg-secondary font-monospace fs-6 px-3 py-2">Aucune (0 itération)</span>`;

    const rangeBoundsText = values.length > 0
      ? `${values[0]} / ${values[values.length - 1]}`
      : `Aucun (Pas ${step > 0 ? '+' : ''}${step})`;

    out.innerHTML = `
      <div class="row g-3">
        <div class="col-lg-7">
          <!-- Carte Code Python -->
          <div class="card shadow-sm border-0 mb-3 overflow-hidden">
            <div class="card-header text-white font-monospace small d-flex justify-content-between align-items-center py-2" style="background-color: #15803d;">
              <span class="fw-bold">🐍 Code Python</span>
              <span class="badge bg-white text-success fw-bold">range()</span>
            </div>
            <div class="card-body p-0 bg-white">
              <pre class="m-0 p-3 bg-light text-dark" style="font-family: 'Consolas', 'Fira Code', monospace; font-size: 14px; line-height: 1.5;"><code class="language-python hljs">${highlightedPy}</code></pre>
            </div>
          </div>

          <!-- Carte Code Algorithme -->
          <div class="card shadow-sm border-0 overflow-hidden">
            <div class="card-header text-white font-monospace small d-flex justify-content-between align-items-center py-2" style="background-color: #0284c7;">
              <span class="fw-bold">📐 Equivalent Algorithmique</span>
              <span class="badge bg-white text-primary fw-bold">Pseudo-code</span>
            </div>
            <div class="card-body p-0 bg-white">
              <pre class="m-0 p-3 bg-light text-dark" style="font-family: 'Consolas', 'Fira Code', monospace; font-size: 14px; line-height: 1.5;"><code class="language-algorithm hljs">${highlightedAlgo}</code></pre>
            </div>
          </div>
        </div>

        <div class="col-lg-5">
          <!-- Carte Statistiques & Bornes -->
          <div class="card shadow-sm border-0 bg-light h-100">
            <div class="card-header bg-secondary bg-opacity-10 fw-bold text-dark py-2">
              📊 Métriques de la boucle
            </div>
            <div class="card-body">
              <div class="d-flex justify-content-between align-items-center border-bottom pb-2 mb-2">
                <span class="text-muted fw-bold">Compteur :</span>
                <span class="badge bg-primary fs-6 font-monospace px-3 py-1">${varName}</span>
              </div>
              <div class="d-flex justify-content-between align-items-center border-bottom pb-2 mb-2">
                <span class="text-muted fw-bold">Bornes (V<sub>i</sub> / V<sub>f</sub>) :</span>
                <span class="badge bg-info text-dark fs-6 font-monospace px-3 py-1">${rangeBoundsText}</span>
              </div>
              <div class="d-flex justify-content-between align-items-center border-bottom pb-2 mb-3">
                <span class="text-muted fw-bold">Nombre d'itérations :</span>
                <span class="badge bg-dark fs-6 font-monospace px-3 py-1">${values.length}</span>
              </div>

              <h6 class="fw-bold text-secondary mb-2">Valeurs générées par le compteur :</h6>
              <div class="d-flex flex-wrap align-items-center p-2 bg-white rounded border-0 shadow-sm">${valBadges}</div>
            </div>
          </div>
        </div>
      </div>
    `;

    if (window.MathJax && MathJax.typesetPromise) {
      MathJax.typesetPromise([out]).catch(() => { });
    }
  }

  // Écouteurs d'événements pour le simulateur range
  ['rng-var', 'rng-start', 'rng-end', 'rng-step'].forEach(id => {
    getEl(id)?.addEventListener('input', updateRangeSimulation);
  });

  // Initialiser la simulation au chargement
  updateRangeSimulation();

  document.addEventListener('click', (e) => {
    // Boutons presets Exercice 1
    const presetBtn = e.target.closest('.btn-preset-range');
    if (presetBtn) {
      if (getEl('rng-var')) getEl('rng-var').value = presetBtn.dataset.var || 'i';
      if (getEl('rng-start')) getEl('rng-start').value = presetBtn.dataset.vi || '0';
      if (getEl('rng-end')) getEl('rng-end').value = presetBtn.dataset.vf || '5';
      if (getEl('rng-step')) getEl('rng-step').value = presetBtn.dataset.pas || '1';
      updateRangeSimulation();
    }

    // Vérification de la grille d'auto-évaluation Exercice 1
    if (e.target.closest('#btn-check-ex1-all')) {
      const inputs = document.querySelectorAll('.ex1-input-compteur, .ex1-input-bornes, .ex1-input-valeurs');
      let correct = 0;
      let total = inputs.length;

      inputs.forEach(inp => {
        const userVal = (inp.value || '').trim().toLowerCase().replace(/\s+/g, '');
        const targetVal = (inp.dataset.ans || '').trim().toLowerCase().replace(/\s+/g, '');

        const isAlternateMatch = (targetVal === '2/10' && (userVal === '2/8' || userVal === '2à8')) ||
                                 (targetVal === '10/-5' && (userVal === '10/-9' || userVal === '10à-9'));

        if (userVal === targetVal || (targetVal.includes('/') && userVal === targetVal.replace('/', 'à')) || isAlternateMatch) {
          inp.classList.remove('is-invalid');
          inp.classList.add('is-valid');
          correct++;
        } else {
          inp.classList.remove('is-valid');
          inp.classList.add('is-invalid');
        }
      });

      const statusEl = getEl('ex1-score-status');
      if (statusEl) {
        if (correct === total) {
          statusEl.className = 'fw-bold text-success';
          statusEl.innerHTML = `🎉 Parfait ! Réponses exactes : <strong>${correct} / ${total}</strong>. Bravo !`;
        } else {
          statusEl.className = 'fw-bold text-danger';
          statusEl.innerHTML = `⚠️ Score : <strong>${correct} / ${total}</strong> réponses correctes. Corrigez les cases en rouge !`;
        }
      }
    }

    // Afficher les solutions Exercice 1
    if (e.target.closest('#btn-show-ex1-sol')) {
      const inputs = document.querySelectorAll('.ex1-input-compteur, .ex1-input-bornes, .ex1-input-valeurs');
      inputs.forEach(inp => {
        inp.value = inp.dataset.ans || '';
        inp.classList.remove('is-invalid');
        inp.classList.add('is-valid');
      });
      const statusEl = getEl('ex1-score-status');
      if (statusEl) {
        statusEl.className = 'fw-bold text-primary';
        statusEl.innerHTML = `💡 Solutions affichées. Tous les champs ont été complétés avec la correction exacte.`;
      }
    }
  });

  // -------------------------------------------------------------
  // Exercice 2 (Bonjour) Handlers
  // -------------------------------------------------------------
  function updateExercice2() {
    const n = Math.max(1, Math.min(100, parseInt(getEl('ex2-n')?.value) || 1));
    const isQ1 = getEl('ex2-mode-q1')?.checked;
    const out = getEl('ex2-bonjour-out');
    if (!out) return;

    const msgsQ2 = ['Hello', 'Bonjour', 'Asselema'];
    let salutations = [];
    let badgesHtml = [];

    for (let i = 0; i < n; i++) {
      let word = isQ1 ? 'Hello' : msgsQ2[i % 3];
      salutations.push(word);

      let badgeClass = 'bg-primary';
      if (!isQ1) {
        if (word === 'Bonjour') badgeClass = 'bg-success';
        else if (word === 'Asselema') badgeClass = 'bg-warning text-dark';
      }
      badgesHtml.push(`<span class="badge ${badgeClass} font-monospace fs-6 me-1 mb-1 px-3 py-2 shadow-sm" title="Itération i = ${i} (i % 3 = ${i % 3})">${word}</span>`);
    }

    const consoleOutputText = salutations.join(' ');

    out.innerHTML = `
      <div class="card shadow-sm border-0 mb-0 overflow-hidden">
        <div class="card-header text-white font-monospace small d-flex justify-content-between align-items-center py-2" style="background-color: #15803d;">
          <span class="fw-bold">💻 Sortie Console Python (print(..., end=" "))</span>
          <span class="badge bg-white text-success font-monospace fw-bold">N = ${n}</span>
        </div>
        <div class="card-body p-0 bg-white">
          <pre class="m-0 p-3 bg-light text-dark fw-bold" style="font-family: 'Consolas', 'Fira Code', monospace; font-size: 15px; line-height: 1.5; white-space: pre-wrap; word-break: break-word;"><code>${consoleOutputText}</code></pre>
        </div>
      </div>
    `;
  }

  // Écouteurs d'événements pour l'Exercice 2
  getEl('ex2-n')?.addEventListener('input', updateExercice2);
  document.querySelectorAll('input[name="ex2-mode"]').forEach(radio => {
    radio.addEventListener('change', updateExercice2);
  });

  // Initialiser Exercice 2 au chargement
  updateExercice2();

  // -------------------------------------------------------------
  // Exercice 3 (Somme des impairs) Handlers
  // -------------------------------------------------------------
  function updateExercice3() {
    const a = parseInt(getEl('imp-a')?.value) || 0;
    const b = parseInt(getEl('imp-b')?.value) || 0;
    const out = getEl('imp-out');
    if (!out) return;

    if (b <= a) {
      out.innerHTML = `
        <div class="alert alert-danger shadow-sm border-0 mb-0">
          ⚠️ <strong>Condition non respectée</strong> : La borne finale <code>b</code> (${b}) doit être strictement supérieure à <code>a</code> (${a}) !
        </div>`;
      return;
    }

    let oddNumbers = [];
    let tableRows = [];
    let sum = 0;

    for (let i = a; i <= b; i++) {
      const isOdd = (i % 2 !== 0);
      if (isOdd) {
        sum += i;
        oddNumbers.push(i);
        tableRows.push(`
          <tr>
            <td class="font-monospace fw-bold">${i}</td>
            <td><span class="badge bg-success font-monospace">Impair (${i} % 2 ≠ 0)</span></td>
            <td class="text-success fw-bold">+ ${i}</td>
            <td class="font-monospace fw-bold text-primary">${sum}</td>
          </tr>
        `);
      } else {
        tableRows.push(`
          <tr class="table-light text-muted">
            <td class="font-monospace">${i}</td>
            <td><span class="badge bg-secondary font-monospace">Pair (ignoré)</span></td>
            <td>0</td>
            <td class="font-monospace">${sum}</td>
          </tr>
        `);
      }
    }

    const equationText = oddNumbers.length > 0 ? `${oddNumbers.join(' + ')} = ${sum}` : 'Aucun impair dans l\'intervalle';

    out.innerHTML = `
      <!-- Résumé exécutif & Formule -->
      <div class="card shadow-sm border-0 mb-3 bg-white">
        <div class="card-body p-3">
          <div class="d-flex flex-wrap justify-content-between align-items-center gap-2 mb-2">
            <span class="fw-bold text-secondary">Équation de la somme des impairs dans [${a}, ${b}] :</span>
            <span class="badge bg-success fs-5 font-monospace px-3 py-2">Somme = ${sum}</span>
          </div>
          <div class="p-3 bg-light rounded font-monospace fs-5 text-success fw-bold border-0 text-center">
            ${equationText}
          </div>
        </div>
      </div>

      <!-- Tracé pas à pas de la boucle -->
      <div class="card shadow-sm border-0 overflow-hidden">
        <div class="card-header text-white font-monospace small d-flex justify-content-between align-items-center py-2" style="background-color: #0f172a !important;">
          <span>🔍 Tracé pas à pas de la boucle Pour i de ${a} à ${b}</span>
          <span class="badge bg-primary font-monospace">${oddNumbers.length} impairs trouvés</span>
        </div>
        <div class="card-body p-0">
          <div class="table-responsive">
            <table class="table table-hover align-middle mb-0 text-center">
              <thead class="table-light">
                <tr>
                  <th>Compteur (i)</th>
                  <th>Test de parité (i % 2 ≠ 0)</th>
                  <th>Ajout à la somme (som += i)</th>
                  <th>Cumul Somme (som)</th>
                </tr>
              </thead>
              <tbody>
                ${tableRows.join('')}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    `;
  }

  // Écouteurs pour l'Exercice 3
  ['imp-a', 'imp-b'].forEach(id => {
    getEl(id)?.addEventListener('input', updateExercice3);
  });

  // Initialiser Exercice 3 au chargement
  updateExercice3();

  // -------------------------------------------------------------
  // Exercice 4 (Voyelles et Consonnes) Handlers & Dynamic SVG
  // -------------------------------------------------------------
  function renderDynamicSvgExercice4(ch) {
    const svgContainer = getEl('ex4-dynamic-svg');
    if (!svgContainer) return;

    const rawStr = (ch || '').trim();
    if (rawStr.length === 0) {
      svgContainer.innerHTML = `<div class="alert alert-secondary mb-0">Veuillez saisir une chaîne pour générer le schéma.</div>`;
      return;
    }

    const VOWELS = 'AEIOUYaeiouy';
    const chars = rawStr.slice(0, 16); // max 16 chars display
    const boxWidth = 72;
    const boxHeight = 85;
    const boxGap = 14;
    const startX = 20;
    const svgWidth = Math.max(560, startX * 2 + chars.length * (boxWidth + boxGap));
    const svgHeight = 250;

    let nbVow = 0;
    let nbCons = 0;
    let charElementsSvg = '';

    chars.split('').forEach((char, idx) => {
      const x = startX + idx * (boxWidth + boxGap);
      const upper = char.toUpperCase();
      let boxColor = '#94a3b8'; // gray
      let label = 'Autre';

      if (VOWELS.includes(char)) {
        nbVow++;
        boxColor = '#ec4899'; // pink
        label = 'Voyelle';
      } else if (upper >= 'A' && upper <= 'Z') {
        nbCons++;
        boxColor = '#0284c7'; // cyan
        label = 'Consonne';
      }

      const displayChar = char === ' ' ? '␣' : char;

      charElementsSvg += `
        <g transform="translate(${x}, 60)">
          <rect width="${boxWidth}" height="${boxHeight}" rx="10" fill="${boxColor}" filter="url(#shadow)"/>
          <text x="${boxWidth / 2}" y="46" font-family="'Consolas', monospace" font-size="30" font-weight="bold" fill="#ffffff" text-anchor="middle">${displayChar}</text>
          <rect x="5" y="58" width="${boxWidth - 10}" height="20" rx="5" fill="#ffffff" fill-opacity="0.25"/>
          <text x="${boxWidth / 2}" y="72" font-family="sans-serif" font-size="11" font-weight="bold" fill="#ffffff" text-anchor="middle">${label}</text>
        </g>
      `;
    });

    const cardWidth = 230;
    const cardHeight = 52;
    const totalCardsW = cardWidth * 2 + 20;
    const card1X = Math.max(10, (svgWidth - totalCardsW) / 2);
    const card2X = card1X + cardWidth + 20;

    const svgHtml = `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${svgWidth} ${svgHeight}" width="100%" height="100%" style="max-height: 270px;">
        <defs>
          <linearGradient id="dynBgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#f8fafc"/>
            <stop offset="100%" stop-color="#f1f5f9"/>
          </linearGradient>
          <filter id="shadow" x="-5%" y="-5%" width="110%" height="110%">
            <feDropShadow dx="0" dy="3" stdDeviation="3" flood-color="#0f172a" flood-opacity="0.1"/>
          </filter>
        </defs>

        <rect x="2" y="2" width="${svgWidth - 4}" height="${svgHeight - 4}" rx="12" fill="url(#dynBgGrad)" stroke="#e2e8f0" stroke-width="1.5"/>

        <text x="${svgWidth / 2}" y="32" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="16" font-weight="bold" fill="#0f172a" text-anchor="middle">
          🔍 Schéma de décomposition dynamique de "${rawStr}"
        </text>

        ${charElementsSvg}

        <!-- Synthèse finale bas (Haut contraste agrandi) -->
        <g transform="translate(${card1X}, 175)">
          <rect width="${cardWidth}" height="${cardHeight}" rx="10" fill="#be185d" filter="url(#shadow)"/>
          <text x="16" y="32" font-family="sans-serif" font-size="14" font-weight="bold" fill="#ffffff">🌸 Voyelles :</text>
          <text x="195" y="34" font-family="'Consolas', monospace" font-size="24" font-weight="bold" fill="#ffffff" text-anchor="middle">${nbVow}</text>
        </g>

        <g transform="translate(${card2X}, 175)">
          <rect width="${cardWidth}" height="${cardHeight}" rx="10" fill="#0369a1" filter="url(#shadow)"/>
          <text x="16" y="32" font-family="sans-serif" font-size="14" font-weight="bold" fill="#ffffff">🔹 Consonnes :</text>
          <text x="195" y="34" font-family="'Consolas', monospace" font-size="24" font-weight="bold" fill="#ffffff" text-anchor="middle">${nbCons}</text>
        </g>
      </svg>
    `;

    svgContainer.innerHTML = svgHtml;
  }

  function updateExercice4() {
    const ch = (getEl('vow-txt')?.value || '').trim();
    const out = getEl('vow-out');
    if (!out) return;

    renderDynamicSvgExercice4(ch);

    if (ch.length === 0) {
      out.innerHTML = `
        <div class="alert alert-warning shadow-sm border-0 mb-0">
          ⚠️ <strong>Chaîne vide</strong> : Veuillez saisir au moins un caractère dans la chaîne <code>ch</code> !
        </div>`;
      return;
    }

    const VOWELS = 'AEIOUYaeiouy';
    let nbVoyelles = 0;
    let nbConsonnes = 0;
    let charBadges = [];

    for (let char of ch) {
      const upperChar = char.toUpperCase();
      if (VOWELS.includes(char)) {
        nbVoyelles++;
        charBadges.push(`<span class="badge bg-danger text-white font-monospace fs-6 me-1 mb-1 px-3 py-2 shadow-sm" title="${char} est une voyelle">${char}</span>`);
      } else if (upperChar >= 'A' && upperChar <= 'Z') {
        nbConsonnes++;
        charBadges.push(`<span class="badge bg-primary text-white font-monospace fs-6 me-1 mb-1 px-3 py-2 shadow-sm" title="${char} est une consonne">${char}</span>`);
      } else {
        charBadges.push(`<span class="badge bg-secondary font-monospace fs-6 me-1 mb-1 px-2 py-2 opacity-75" title="${char} est ignoré (symbole/chiffre)">${char === ' ' ? '␣' : char}</span>`);
      }
    }

    out.innerHTML = `
      <div class="row g-3 mb-3">
        <div class="col-md-6">
          <div class="card shadow-sm border-0 bg-danger text-white h-100">
            <div class="card-body d-flex justify-content-between align-items-center p-3">
              <div>
                <h5 class="fw-bold text-white mb-0">🌸 Nombre de Voyelles :</h5>
                <small class="text-white-50">(A, E, I, O, U, Y)</small>
              </div>
              <span class="badge bg-white text-danger fs-2 font-monospace px-3 py-2 fw-bold shadow-sm">${nbVoyelles}</span>
            </div>
          </div>
        </div>
        <div class="col-md-6">
          <div class="card shadow-sm border-0 bg-primary text-white h-100">
            <div class="card-body d-flex justify-content-between align-items-center p-3">
              <div>
                <h5 class="fw-bold text-white mb-0">🔹 Nombre de Consonnes :</h5>
                <small class="text-white-50">(Autres lettres alphabétiques)</small>
              </div>
              <span class="badge bg-white text-primary fs-2 font-monospace px-3 py-2 fw-bold shadow-sm">${nbConsonnes}</span>
            </div>
          </div>
        </div>
      </div>

      <div class="card shadow-sm border-0 bg-light">
        <div class="card-header bg-secondary bg-opacity-10 fw-bold text-dark py-2">
          🔍 Analyse caractère par caractère de "${ch}" :
        </div>
        <div class="card-body p-3 bg-white">
          <div class="d-flex flex-wrap align-items-center">${charBadges.join('')}</div>
        </div>
      </div>
    `;
  }

  // Écouteur pour l'Exercice 4
  getEl('vow-txt')?.addEventListener('input', updateExercice4);

  // Initialiser Exercice 4 au chargement
  updateExercice4();

  // -------------------------------------------------------------
  // Exercice 5 (Filtrage chl & chc) Handlers & Dynamic SVG
  // -------------------------------------------------------------
  function renderDynamicSvgExercice5(ch) {
    const svgContainer = getEl('ex5-dynamic-svg');
    if (!svgContainer) return;

    const rawStr = (ch || '').trim();
    if (rawStr.length === 0) {
      svgContainer.innerHTML = `<div class="alert alert-secondary mb-0">Veuillez saisir une chaîne pour générer le schéma.</div>`;
      return;
    }

    const chars = rawStr.slice(0, 16);
    const boxWidth = 72;
    const boxHeight = 85;
    const boxGap = 14;
    const startX = 20;

    let chl = '';
    let chc = '';
    let charElementsSvg = '';

    chars.split('').forEach((char, idx) => {
      const x = startX + idx * (boxWidth + boxGap);
      const upper = char.toUpperCase();
      let boxColor = '#94a3b8'; // gray
      let label = 'Autre';

      if (upper >= 'A' && upper <= 'Z') {
        chl += char;
        boxColor = '#d97706'; // amber/yellow
        label = 'chl';
      } else if (char >= '0' && char <= '9') {
        chc += char;
        boxColor = '#0284c7'; // cyan
        label = 'chc';
      }

      const displayChar = char === ' ' ? '␣' : char;

      charElementsSvg += `
        <g transform="translate(${x}, 60)">
          <rect width="${boxWidth}" height="${boxHeight}" rx="10" fill="${boxColor}" filter="url(#shadow)"/>
          <text x="${boxWidth / 2}" y="46" font-family="'Consolas', monospace" font-size="30" font-weight="bold" fill="#ffffff" text-anchor="middle">${displayChar}</text>
          <rect x="5" y="58" width="${boxWidth - 10}" height="20" rx="5" fill="#ffffff" fill-opacity="0.25"/>
          <text x="${boxWidth / 2}" y="72" font-family="sans-serif" font-size="11" font-weight="bold" fill="#ffffff" text-anchor="middle">${label}</text>
        </g>
      `;
    });

    const maxValLen = Math.max(chl.length, chc.length, 1);
    const cardWidth = Math.max(260, maxValLen * 15 + 140);
    const cardHeight = 52;
    const totalCardsW = cardWidth * 2 + 20;
    const svgWidth = Math.max(580, startX * 2 + chars.length * (boxWidth + boxGap), totalCardsW + 40);
    const svgHeight = 250;

    const card1X = Math.max(20, (svgWidth - totalCardsW) / 2);
    const card2X = card1X + cardWidth + 20;

    const svgHtml = `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${svgWidth} ${svgHeight}" width="100%" height="100%" style="max-height: 270px;">
        <defs>
          <linearGradient id="dynBgGrad5" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#f8fafc"/>
            <stop offset="100%" stop-color="#f1f5f9"/>
          </linearGradient>
          <filter id="shadow" x="-5%" y="-5%" width="110%" height="110%">
            <feDropShadow dx="0" dy="3" stdDeviation="3" flood-color="#0f172a" flood-opacity="0.1"/>
          </filter>
        </defs>

        <rect x="2" y="2" width="${svgWidth - 4}" height="${svgHeight - 4}" rx="12" fill="url(#dynBgGrad5)" stroke="#e2e8f0" stroke-width="1.5"/>

        <text x="${svgWidth / 2}" y="32" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="16" font-weight="bold" fill="#0f172a" text-anchor="middle">
          🔍 Filtrage de "${rawStr}" en Lettres (chl) &amp; Chiffres (chc)
        </text>

        ${charElementsSvg}

        <!-- Synthèse finale bas (Largeur dynamique auto-adaptative) -->
        <g transform="translate(${card1X}, 175)">
          <rect width="${cardWidth}" height="${cardHeight}" rx="10" fill="#d97706" filter="url(#shadow)"/>
          <text x="16" y="32" font-family="sans-serif" font-size="14" font-weight="bold" fill="#ffffff">🔤 Lettres (chl) :</text>
          <text x="${cardWidth - 20}" y="33" font-family="'Consolas', monospace" font-size="19" font-weight="bold" fill="#ffffff" text-anchor="end">${chl.length > 0 ? chl : '∅'}</text>
        </g>

        <g transform="translate(${card2X}, 175)">
          <rect width="${cardWidth}" height="${cardHeight}" rx="10" fill="#0284c7" filter="url(#shadow)"/>
          <text x="16" y="32" font-family="sans-serif" font-size="14" font-weight="bold" fill="#ffffff">🔢 Chiffres (chc) :</text>
          <text x="${cardWidth - 20}" y="33" font-family="'Consolas', monospace" font-size="19" font-weight="bold" fill="#ffffff" text-anchor="end">${chc.length > 0 ? chc : '∅'}</text>
        </g>
      </svg>
    `;

    svgContainer.innerHTML = svgHtml;
  }

  function updateExercice5() {
    const ch = (getEl('filter-str')?.value || '').trim();
    const out = getEl('filter-out');
    if (!out) return;

    renderDynamicSvgExercice5(ch);

    if (ch.length === 0) {
      out.innerHTML = `
        <div class="alert alert-warning shadow-sm border-0 mb-0">
          ⚠️ <strong>Chaîne vide</strong> : Veuillez saisir au moins un caractère dans la chaîne <code>ch</code> !
        </div>`;
      return;
    }

    let chl = '';
    let chc = '';
    let charBadges = [];

    for (let char of ch) {
      const upperChar = char.toUpperCase();
      if (upperChar >= 'A' && upperChar <= 'Z') {
        chl += char;
        charBadges.push(`<span class="badge bg-warning text-dark font-monospace fs-6 me-1 mb-1 px-3 py-2 shadow-sm" title="${char} est une lettre (chl)">${char}</span>`);
      } else if (char >= '0' && char <= '9') {
        chc += char;
        charBadges.push(`<span class="badge bg-info text-dark font-monospace fs-6 me-1 mb-1 px-3 py-2 shadow-sm" title="${char} est un chiffre (chc)">${char}</span>`);
      } else {
        charBadges.push(`<span class="badge bg-secondary font-monospace fs-6 me-1 mb-1 px-2 py-2 opacity-75" title="${char} est un symbole/espace ignoré">${char === ' ' ? '␣' : char}</span>`);
      }
    }

    out.innerHTML = `
      <div class="row g-3 mb-0">
        <div class="col-md-6">
          <div class="card shadow-sm border-0 bg-warning text-dark h-100">
            <div class="card-body d-flex justify-content-between align-items-center p-3">
              <div>
                <h5 class="fw-bold mb-0">🔤 Lettres (chl) :</h5>
                <small class="text-dark-50">(${chl.length} lettres)</small>
              </div>
              <span class="badge bg-dark text-warning fs-3 font-monospace px-3 py-2 fw-bold shadow-sm">${chl.length > 0 ? chl : 'Aucune'}</span>
            </div>
          </div>
        </div>
        <div class="col-md-6">
          <div class="card shadow-sm border-0 bg-info text-dark h-100">
            <div class="card-body d-flex justify-content-between align-items-center p-3">
              <div>
                <h5 class="fw-bold mb-0">🔢 Chiffres (chc) :</h5>
                <small class="text-dark-50">(${chc.length} chiffres)</small>
              </div>
              <span class="badge bg-dark text-info fs-3 font-monospace px-3 py-2 fw-bold shadow-sm">${chc.length > 0 ? chc : 'Aucun'}</span>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  // -------------------------------------------------------------
  // Exercice 7 (Nombre Abondant / Déficient / Parfait)
  // -------------------------------------------------------------
  function updateExercice7() {
    const n = parseInt(getEl('num-n')?.value) || 0;
    const out = getEl('num-out');
    if (!out) return;

    if (n <= 0) {
      out.innerHTML = `<div class="alert alert-warning shadow-sm border-0 mb-0">⚠️ Veuillez saisir un entier strictement positif (N > 0).</div>`;
      return;
    }

    let divisors = [];
    let sd = 0;
    for (let i = 1; i < n; i++) {
      if (n % i === 0) {
        divisors.push(i);
        sd += i;
      }
    }

    let statusBadge = '';
    let statusText = '';

    if (sd === n) {
      statusBadge = `<span class="badge bg-success text-white fs-3 font-monospace px-3 py-2 shadow-sm">PARFAIT</span>`;
      statusText = `Le nombre ${n} est égal à la somme de ses diviseurs stricts (${sd} = ${n}).`;
    } else if (sd > n) {
      statusBadge = `<span class="badge bg-warning text-dark fs-3 font-monospace px-3 py-2 shadow-sm">ABONDANT</span>`;
      statusText = `La somme des diviseurs stricts (${sd}) est strictement supérieure à ${n} (${sd} > ${n}).`;
    } else {
      statusBadge = `<span class="badge bg-info text-dark fs-3 font-monospace px-3 py-2 shadow-sm">DÉFICIENT</span>`;
      statusText = `La somme des diviseurs stricts (${sd}) est strictement inférieure à ${n} (${sd} < ${n}).`;
    }

    out.innerHTML = `
      <div class="card shadow-sm border-0 mb-3 bg-light">
        <div class="card-body d-flex justify-content-between align-items-center p-3">
          <div>
            <h5 class="fw-bold mb-1">Résultat : Nombre ${n}</h5>
            <p class="mb-0 text-muted">${statusText}</p>
          </div>
          <div>${statusBadge}</div>
        </div>
      </div>

      <div class="p-3 bg-white rounded shadow-sm border-0">
        <h6 class="fw-bold text-secondary mb-2">🔍 Détail du calcul des diviseurs stricts :</h6>
        <div class="font-monospace mb-2">
          • Diviseurs stricts de ${n} : <span class="badge bg-secondary font-monospace fs-6">${divisors.join(', ')}</span>
          <br>• Somme SD = ${divisors.join(' + ')} = <strong>${sd}</strong>
        </div>
      </div>
    `;
  }

  // -------------------------------------------------------------
  // Exercice 8 (Nombre Poly-divisible - Ticket de Caisse)
  // -------------------------------------------------------------
  function updateExercice8() {
    const ticket = (getEl('poly-num')?.value || '').trim();
    const out = getEl('poly-out');
    if (!out) return;

    if (!/^\d{10}$/.test(ticket)) {
      out.innerHTML = `<div class="alert alert-warning shadow-sm border-0 mb-0">⚠️ Un numéro de ticket doit être une chaîne numérique d'exactement 10 chiffres (ex: <code>1624560840</code>).</div>`;
      return;
    }

    let isPoly = true;
    let stepsHtml = [];

    for (let k = 2; k <= 10; k++) {
      const prefixStr = ticket.substring(0, k);
      const val = parseInt(prefixStr, 10);
      const rem = val % k;
      const ok = (rem === 0);
      if (!ok) isPoly = false;

      stepsHtml.push(`
        <tr class="${ok ? 'table-success' : 'table-danger'}">
          <td class="fw-bold">${k} chiffres</td>
          <td class="font-monospace">${prefixStr}</td>
          <td class="font-monospace">${val} ÷ ${k} = ${Math.floor(val / k)} (reste ${rem})</td>
          <td>${ok ? '✅ Divisible par ' + k : '❌ Non divisible par ' + k}</td>
        </tr>
      `);
    }

    const badge = isPoly
      ? `<span class="badge bg-success text-white fs-3 font-monospace px-3 py-2 shadow-sm">🎉 TICKET GAGNANT</span>`
      : `<span class="badge bg-danger text-white fs-3 font-monospace px-3 py-2 shadow-sm">❌ TICKET NON GAGNANT</span>`;

    out.innerHTML = `
      <div class="card shadow-sm border-0 mb-3 bg-light">
        <div class="card-body d-flex justify-content-between align-items-center p-3">
          <div>
            <h5 class="fw-bold mb-1">Ticket n° <code>${ticket}</code></h5>
            <p class="mb-0 text-muted">${isPoly ? 'Ce numéro possède la propriété de poly-divisibilité sur les 10 étapes !' : 'La propriété de poly-divisibilité a échoué pendant le test.'}</p>
          </div>
          <div>${badge}</div>
        </div>
      </div>

      <div class="table-responsive">
        <table class="table table-bordered align-middle text-center mb-0 small">
          <thead class="table-dark">
            <tr>
              <th>Longueur k</th>
              <th>Sous-nombre (préfixe)</th>
              <th>Test de divisibilité par k</th>
              <th>Résultat</th>
            </tr>
          </thead>
          <tbody>
            ${stepsHtml.join('')}
          </tbody>
        </table>
      </div>
    `;
  }

  // -------------------------------------------------------------
  // Exercice 9 (Série Numérique Sn)
  // -------------------------------------------------------------
  function updateExercice9() {
    const n = parseInt(getEl('serie-n')?.value) || 1;
    const out = getEl('serie-out');
    if (!out) return;

    let sum = 0;
    let terms = [];
    let rows = [];

    for (let k = 1; k <= n; k++) {
      const sign = Math.pow(-1, k + 1);
      const pwr = Math.pow(k, k);
      const termVal = sign * pwr;
      sum += termVal;

      const signChar = sign > 0 ? '+' : '−';
      terms.push(`${k === 1 ? '' : signChar} ${k}<sup>${k}</sup>`);

      rows.push(`
        <tr>
          <td class="font-monospace fw-bold">${k}</td>
          <td class="font-monospace">${k}<sup>${k}</sup> = ${pwr}</td>
          <td class="font-monospace">${sign > 0 ? '+ ' + pwr : '- ' + pwr}</td>
          <td class="font-monospace fw-bold text-primary">${sum}</td>
        </tr>
      `);
    }

    out.innerHTML = `
      <div class="card shadow-sm border-0 mb-3 bg-info text-dark">
        <div class="card-body d-flex justify-content-between align-items-center p-3">
          <div>
            <h5 class="fw-bold mb-0">Somme finale S<sub>${n}</sub> :</h5>
            <small class="text-dark-50">(${terms.join(' ')})</small>
          </div>
          <span class="badge bg-dark text-info fs-2 font-monospace px-3 py-2 fw-bold shadow-sm">${sum}</span>
        </div>
      </div>

      <div class="table-responsive">
        <table class="table table-bordered align-middle text-center mb-0 small">
          <thead class="table-dark">
            <tr>
              <th>i</th>
              <th>Terme i<sup>i</sup></th>
              <th>Signe et valeur (−1)<sup>i+1</sup> i<sup>i</sup></th>
              <th>Somme cumulée S<sub>i</sub></th>
            </tr>
          </thead>
          <tbody>
            ${rows.join('')}
          </tbody>
        </table>
      </div>
    `;
  }

  // -------------------------------------------------------------
  // Exercice 10 (Carte de Fidélité Check_card)
  // -------------------------------------------------------------
  function updateExercice10() {
    const card = (getEl('card-num')?.value || '').trim().toUpperCase();
    const out = getEl('card-out');
    if (!out) return;

    if (card.length === 0) {
      out.innerHTML = `<div class="alert alert-warning shadow-sm border-0 mb-0">⚠️ Veuillez saisir un numéro de carte !</div>`;
      return;
    }

    let digitsSum = 0;
    let digitsList = [];
    let lettersRankSum = 0;
    let letterRanksList = [];
    let letterCount = 0;

    for (let char of card) {
      if (char >= '0' && char <= '9') {
        const val = parseInt(char, 10);
        digitsSum += val;
        digitsList.push(val);
      } else if (char >= 'A' && char <= 'Z') {
        letterCount++;
        const rank = char.charCodeAt(0) - 65;
        lettersRankSum += rank;
        letterRanksList.push(`${char}(${rank})`);
      }
    }

    const cond1 = card.length >= 8;
    const cond2 = (digitsSum % 3 === 0) || (digitsSum % 7 === 0);
    const cond3 = (lettersRankSum % 2) === (letterCount % 2);

    const isValid = cond1 && cond2 && cond3;

    const badge = isValid
      ? `<span class="badge bg-success text-white fs-3 font-monospace px-3 py-2 shadow-sm">🎉 CARTE VALIDE</span>`
      : `<span class="badge bg-danger text-white fs-3 font-monospace px-3 py-2 shadow-sm">❌ CARTE INVALIDE</span>`;

    out.innerHTML = `
      <div class="card shadow-sm border-0 mb-3 bg-light">
        <div class="card-body d-flex justify-content-between align-items-center p-3">
          <div>
            <h5 class="fw-bold mb-1">Carte n° <code>${card}</code></h5>
            <p class="mb-0 text-muted">${isValid ? 'La carte respecte tous les critères de la marque !' : 'La carte ne respecte pas un ou plusieurs critères de validité.'}</p>
          </div>
          <div>${badge}</div>
        </div>
      </div>

      <div class="row g-3">
        <div class="col-md-4">
          <div class="p-3 ${cond1 ? 'bg-success bg-opacity-10 border-success' : 'bg-danger bg-opacity-10 border-danger'} border rounded">
            <h6 class="fw-bold ${cond1 ? 'text-success' : 'text-danger'} mb-1">Critère 1 : Longueur $\ge$ 8</h6>
            <div class="small">${cond1 ? '✅' : '❌'} Longueur = <strong>${card.length}</strong> caract.</div>
          </div>
        </div>
        <div class="col-md-4">
          <div class="p-3 ${cond2 ? 'bg-success bg-opacity-10 border-success' : 'bg-danger bg-opacity-10 border-danger'} border rounded">
            <h6 class="fw-bold ${cond2 ? 'text-success' : 'text-danger'} mb-1">Critère 2 : Somme chiffres div 3/7</h6>
            <div class="small">${cond2 ? '✅' : '❌'} Somme = <strong>${digitsSum}</strong> (${digitsList.length > 0 ? digitsList.join(' + ') : '0'})</div>
          </div>
        </div>
        <div class="col-md-4">
          <div class="p-3 ${cond3 ? 'bg-success bg-opacity-10 border-success' : 'bg-danger bg-opacity-10 border-danger'} border rounded">
            <h6 class="fw-bold ${cond3 ? 'text-success' : 'text-danger'} mb-1">Critère 3 : Parité Rangs &amp; Nb Lettres</h6>
            <div class="small">${cond3 ? '✅' : '❌'} Somme Rangs = <strong>${lettersRankSum}</strong> (${letterRanksList.length > 0 ? letterRanksList.join(', ') : 'Aucune'}), Nb Lettres = <strong>${letterCount}</strong></div>
          </div>
        </div>
      </div>
    `;
  }

  // -------------------------------------------------------------
  // Exercice 11 (Progression Croissante / Décroissante)
  // -------------------------------------------------------------
  function updateExercice11() {
    const str = String(getEl('prog-num')?.value || '').trim();
    const out = getEl('prog-out');
    if (!out) return;

    if (str.length === 0) {
      out.innerHTML = `<div class="alert alert-warning shadow-sm border-0 mb-0">⚠️ Veuillez saisir un nombre !</div>`;
      return;
    }

    let inc = true;
    let dec = true;
    let exprList = [];

    for (let i = 0; i < str.length - 1; i++) {
      const d1 = parseInt(str[i], 10);
      const d2 = parseInt(str[i + 1], 10);

      if (d1 > d2) inc = false;
      if (d1 < d2) dec = false;

      let op = '=';
      if (d1 < d2) op = '≤';
      else if (d1 > d2) op = '≥';
      exprList.push(`${d1} ${op} ${d2}`);
    }

    let badge = '';
    let title = '';

    if (inc && dec) {
      badge = `<span class="badge bg-primary text-white fs-3 font-monospace px-3 py-2 shadow-sm">CONSTANTE</span>`;
      title = `Tous les chiffres sont identiques.`;
    } else if (inc) {
      badge = `<span class="badge bg-primary text-white fs-3 font-monospace px-3 py-2 shadow-sm">📈 PROGRESSION CROISSANTE</span>`;
      title = `Les chiffres forment une suite croissante de gauche à droite.`;
    } else if (dec) {
      badge = `<span class="badge bg-info text-dark fs-3 font-monospace px-3 py-2 shadow-sm">📉 PROGRESSION DÉCROISSANTE</span>`;
      title = `Les chiffres forment une suite décroissante de gauche à droite.`;
    } else {
      badge = `<span class="badge bg-secondary text-white fs-3 font-monospace px-3 py-2 shadow-sm">🔀 PAS DE PROGRESSION</span>`;
      title = `La suite des chiffres n'est ni croissante ni décroissante.`;
    }

    out.innerHTML = `
      <div class="card shadow-sm border-0 mb-3 bg-light">
        <div class="card-body d-flex justify-content-between align-items-center p-3">
          <div>
            <h5 class="fw-bold mb-1">Nombre N = <code>${str}</code></h5>
            <p class="mb-0 text-muted">${title}</p>
          </div>
          <div>${badge}</div>
        </div>
      </div>

      <div class="p-3 bg-white rounded shadow-sm border-0 font-monospace">
        🔹 Comparaison des chiffres adjacents : <strong>${exprList.join(' , ')}</strong>
      </div>
    `;
  }

  // Écouteurs pour Exercices 7 à 11
  getEl('num-n')?.addEventListener('input', updateExercice7);
  getEl('poly-num')?.addEventListener('input', updateExercice8);
  getEl('serie-n')?.addEventListener('input', updateExercice9);
  getEl('card-num')?.addEventListener('input', updateExercice10);
  getEl('prog-num')?.addEventListener('input', updateExercice11);

  // Initialisation au chargement
  updateExercice7();
  updateExercice8();
  updateExercice9();
  updateExercice10();
  updateExercice11();

  document.addEventListener('click', (e) => {
    // Boutons N Exercice 2
    const ex2BtnN = e.target.closest('.ex2-btn-n');
    if (ex2BtnN) {
      if (getEl('ex2-n')) getEl('ex2-n').value = ex2BtnN.dataset.n || '2';
      updateExercice2();
    }

    if (e.target.closest('#btn-gen-bonjour')) {
      updateExercice2();
    }

    // Boutons exemples Exercice 3
    const ex3BtnTest = e.target.closest('.ex3-btn-test');
    if (ex3BtnTest) {
      if (getEl('imp-a')) getEl('imp-a').value = ex3BtnTest.dataset.a || '5';
      if (getEl('imp-b')) getEl('imp-b').value = ex3BtnTest.dataset.b || '11';
      updateExercice3();
    }

    if (e.target.closest('#btn-calc-imp')) {
      updateExercice3();
    }

    // Boutons exemples Exercice 4
    const ex4BtnTest = e.target.closest('.ex4-btn-test');
    if (ex4BtnTest) {
      if (getEl('vow-txt')) getEl('vow-txt').value = ex4BtnTest.dataset.str || '';
      updateExercice4();
    }

    if (e.target.closest('#btn-calc-vow')) {
      updateExercice4();
    }

    // Boutons exemples Exercice 5
    const ex5BtnTest = e.target.closest('.ex5-btn-test');
    if (ex5BtnTest) {
      if (getEl('filter-str')) getEl('filter-str').value = ex5BtnTest.dataset.str || '';
      updateExercice5();
    }

    if (e.target.closest('#btn-do-filter')) {
      updateExercice5();
    }

    // Boutons exemples Exercice 7
    const ex7BtnTest = e.target.closest('.ex7-btn-test');
    if (ex7BtnTest) {
      if (getEl('num-n')) getEl('num-n').value = ex7BtnTest.dataset.n || '6';
      updateExercice7();
    }
    if (e.target.closest('#btn-check-num')) {
      updateExercice7();
    }

    // Boutons exemples Exercice 8
    const ex8BtnTest = e.target.closest('.ex8-btn-test');
    if (ex8BtnTest) {
      if (getEl('poly-num')) getEl('poly-num').value = ex8BtnTest.dataset.ticket || '';
      updateExercice8();
    }
    if (e.target.closest('#btn-check-poly')) {
      updateExercice8();
    }

    // Boutons exemples Exercice 9
    const ex9BtnTest = e.target.closest('.ex9-btn-test');
    if (ex9BtnTest) {
      if (getEl('serie-n')) getEl('serie-n').value = ex9BtnTest.dataset.n || '4';
      updateExercice9();
    }
    if (e.target.closest('#btn-calc-serie')) {
      updateExercice9();
    }

    // Boutons exemples Exercice 10
    const ex10BtnTest = e.target.closest('.ex10-btn-test');
    if (ex10BtnTest) {
      if (getEl('card-num')) getEl('card-num').value = ex10BtnTest.dataset.card || '';
      updateExercice10();
    }
    if (e.target.closest('#btn-check-card')) {
      updateExercice10();
    }

    // Boutons exemples Exercice 11
    const ex11BtnTest = e.target.closest('.ex11-btn-test');
    if (ex11BtnTest) {
      if (getEl('prog-num')) getEl('prog-num').value = ex11BtnTest.dataset.n || '';
      updateExercice11();
    }
    if (e.target.closest('#btn-check-prog')) {
      updateExercice11();
    }
  });
});

