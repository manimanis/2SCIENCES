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
      MathJax.typesetPromise([out]).catch(() => {});
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
        
        if (userVal === targetVal || (targetVal.includes('/') && userVal === targetVal.replace('/', 'à'))) {
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
          <text x="${boxWidth/2}" y="46" font-family="'Consolas', monospace" font-size="30" font-weight="bold" fill="#ffffff" text-anchor="middle">${displayChar}</text>
          <rect x="5" y="58" width="${boxWidth - 10}" height="20" rx="5" fill="#ffffff" fill-opacity="0.25"/>
          <text x="${boxWidth/2}" y="72" font-family="sans-serif" font-size="11" font-weight="bold" fill="#ffffff" text-anchor="middle">${label}</text>
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
          <text x="${boxWidth/2}" y="46" font-family="'Consolas', monospace" font-size="30" font-weight="bold" fill="#ffffff" text-anchor="middle">${displayChar}</text>
          <rect x="5" y="58" width="${boxWidth - 10}" height="20" rx="5" fill="#ffffff" fill-opacity="0.25"/>
          <text x="${boxWidth/2}" y="72" font-family="sans-serif" font-size="11" font-weight="bold" fill="#ffffff" text-anchor="middle">${label}</text>
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
          <td class="font-monospace">${val} ÷ ${k} = ${Math.floor(val/k)} (reste ${rem})</td>
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

    if (e.target.closest('#btn-toggle-x') || e.target.closest('#btn-toggle-y')) {
      if (e.target.closest('#btn-toggle-x')) window.stateLogicX = !window.stateLogicX;
      if (e.target.closest('#btn-toggle-y')) window.stateLogicY = !window.stateLogicY;
      updateLogicSim();
    }
  });

  window.stateLogicX = false;
  window.stateLogicY = false;

  const updateLogicSim = () => {
    const sX = !!window.stateLogicX;
    const sY = !!window.stateLogicY;

    const btnX = getEl('btn-toggle-x');
    const imgX = getEl('img-sw-x');
    const lblX = getEl('lbl-sw-x');

    const btnY = getEl('btn-toggle-y');
    const imgY = getEl('img-sw-y');
    const lblY = getEl('lbl-sw-y');

    if (btnX && imgX && lblX) {
      if (sX) {
        btnX.className = 'btn btn-success fw-bold d-inline-flex align-items-center gap-2 px-3 py-2 shadow-sm';
        imgX.src = 'images/module03/interrupteur_ferme.svg';
        lblX.textContent = 'Fermé (Vrai / 1)';
      } else {
        btnX.className = 'btn btn-outline-danger fw-bold d-inline-flex align-items-center gap-2 px-3 py-2 shadow-sm';
        imgX.src = 'images/module03/interrupteur_ouvert.svg';
        lblX.textContent = 'Ouvert (Faux / 0)';
      }
    }

    if (btnY && imgY && lblY) {
      if (sY) {
        btnY.className = 'btn btn-success fw-bold d-inline-flex align-items-center gap-2 px-3 py-2 shadow-sm';
        imgY.src = 'images/module03/interrupteur_ferme.svg';
        lblY.textContent = 'Fermé (Vrai / 1)';
      } else {
        btnY.className = 'btn btn-outline-danger fw-bold d-inline-flex align-items-center gap-2 px-3 py-2 shadow-sm';
        imgY.src = 'images/module03/interrupteur_ouvert.svg';
        lblY.textContent = 'Ouvert (Faux / 0)';
      }
    }

    const resNon = !sX;
    const imgLedNon = getEl('sim-led-non');
    const statusNon = getEl('status-non');
    const valXNon = getEl('val-x-non');
    const resNonEl = getEl('res-non');

    if (imgLedNon && statusNon) {
      imgLedNon.src = resNon ? 'images/module03/diode_allumee.svg' : 'images/module03/diode_eteinte.svg';
      statusNon.className = resNon ? 'alert alert-success py-2 mb-0 fw-bold small' : 'alert alert-secondary py-2 mb-0 fw-bold small text-muted';
      statusNon.textContent = resNon ? '💡 Diode ALLUMÉE (Vrai)' : '⚫ Diode ÉTEINTE (Faux)';
      if (valXNon) valXNon.textContent = sX ? 'True' : 'False';
      if (resNonEl) {
        resNonEl.textContent = resNon ? 'True' : 'False';
        resNonEl.className = resNon ? 'text-success fw-bold' : 'text-danger fw-bold';
      }
    }

    const resEt = sX && sY;
    const imgLedEt = getEl('sim-led-et');
    const statusEt = getEl('status-et');
    const valXEt = getEl('val-x-et');
    const valYEt = getEl('val-y-et');
    const resEtEl = getEl('res-et');

    if (imgLedEt && statusEt) {
      imgLedEt.src = resEt ? 'images/module03/diode_allumee.svg' : 'images/module03/diode_eteinte.svg';
      statusEt.className = resEt ? 'alert alert-success py-2 mb-0 fw-bold small' : 'alert alert-secondary py-2 mb-0 fw-bold small text-muted';
      statusEt.textContent = resEt ? '💡 Diode ALLUMÉE (Vrai)' : '⚫ Diode ÉTEINTE (Faux)';
      if (valXEt) valXEt.textContent = sX ? 'True' : 'False';
      if (valYEt) valYEt.textContent = sY ? 'True' : 'False';
      if (resEtEl) {
        resEtEl.textContent = resEt ? 'True' : 'False';
        resEtEl.className = resEt ? 'text-success fw-bold' : 'text-danger fw-bold';
      }
    }

    const resOu = sX || sY;
    const imgLedOu = getEl('sim-led-ou');
    const statusOu = getEl('status-ou');
    const valXOu = getEl('val-x-ou');
    const valYOu = getEl('val-y-ou');
    const resOuEl = getEl('res-ou');

    if (imgLedOu && statusOu) {
      imgLedOu.src = resOu ? 'images/module03/diode_allumee.svg' : 'images/module03/diode_eteinte.svg';
      statusOu.className = resOu ? 'alert alert-success py-2 mb-0 fw-bold small' : 'alert alert-secondary py-2 mb-0 fw-bold small text-muted';
      statusOu.textContent = resOu ? '💡 Diode ALLUMÉE (Vrai)' : '⚫ Diode ÉTEINTE (Faux)';
      if (valXOu) valXOu.textContent = sX ? 'True' : 'False';
      if (valYOu) valYOu.textContent = sY ? 'True' : 'False';
      if (resOuEl) {
        resOuEl.textContent = resOu ? 'True' : 'False';
        resOuEl.className = resOu ? 'text-success fw-bold' : 'text-danger fw-bold';
      }
    }
  };

  if (getEl('btn-toggle-x')) {
    updateLogicSim();
  }

  const initAsciiTable = () => {
    const tableBody = getEl('ascii-table-body');
    const searchInput = getEl('ascii-search');
    const resultBox = getEl('ascii-result');
    if (!tableBody) return;

    const asciiList = [];
    for (let code = 32; code <= 127; code++) {
      let charStr = String.fromCharCode(code);
      let label = charStr;
      if (code === 32) label = ' (Espace)';
      else if (code === 127) label = ' (DEL)';
      asciiList.push({ code, char: charStr, label });
    }

    const renderAscii = (filter = '') => {
      const raw = filter.trim();
      const matchedCodes = new Set();
      const matchedItems = [];

      if (raw.length > 0) {
        const isNumericList = /^[\d\s,;]+$/.test(raw);
        if (isNumericList) {
          const numbers = raw.split(/[\s,;]+/).map(n => parseInt(n, 10)).filter(n => !isNaN(n));
          numbers.forEach(code => {
            const found = asciiList.find(item => item.code === code);
            if (found && !matchedCodes.has(found.code)) {
              matchedCodes.add(found.code);
              matchedItems.push(found);
            }
          });
        } else {
          for (let char of raw) {
            const code = char.charCodeAt(0);
            const found = asciiList.find(item => item.code === code);
            if (found && !matchedCodes.has(found.code)) {
              matchedCodes.add(found.code);
              matchedItems.push(found);
            }
          }
        }
      }

      if (resultBox) {
        if (matchedItems.length > 0) {
          resultBox.classList.remove('d-none');
          if (matchedItems.length === 1) {
            const item = matchedItems[0];
            resultBox.innerHTML = `💡 Correspondance : Code ASCII <span class="badge bg-dark fs-6 px-2">${item.code}</span> ➔ Caractère <span class="badge bg-white text-primary border fs-6 px-2">'${item.label}'</span> &nbsp;|&nbsp; <code>ord('${item.char}') = ${item.code}</code> &nbsp;|&nbsp; <code>chr(${item.code}) = '${item.char}'</code>`;
          } else {
            const mappingList = matchedItems.map(item => `<span class="badge bg-white text-dark border me-1"><strong>'${item.label}'</strong> ➔ Code ${item.code}</span>`).join(' ');
            resultBox.innerHTML = `💡 Correspondance multiple (${matchedItems.length} caractères) : ${mappingList}`;
          }
        } else {
          resultBox.classList.add('d-none');
        }
      }

      let html = '';
      for (let i = 0; i < asciiList.length; i += 8) {
        let rowHtml = '';
        let isRowHL = false;

        for (let j = 0; j < 8; j++) {
          const item = asciiList[i + j];
          if (item) {
            const isHL = matchedCodes.has(item.code);
            if (isHL) isRowHL = true;
            rowHtml += `
              <td class="fw-bold ${isHL ? 'text-danger fs-6 bg-warning-subtle' : 'text-primary'}" style="font-size: 0.78rem; padding: 3px 2px;">${item.code}</td>
              <td class="${isHL ? 'bg-warning-subtle' : ''}" style="padding: 3px 2px;"><span class="badge ${isHL ? 'bg-danger text-white fs-6 shadow-sm' : 'bg-light text-dark border'} font-monospace px-1 py-0">${item.label}</span></td>
            `;
          } else {
            rowHtml += `<td></td><td></td>`;
          }
        }

        html += `<tr ${isRowHL ? 'class="table-warning"' : ''}>${rowHtml}</tr>`;
      }

      tableBody.innerHTML = html;
    };

    renderAscii();

    if (searchInput) {
      searchInput.addEventListener('input', (e) => {
        renderAscii(e.target.value);
      });
    }
  };

  initAsciiTable();

  function normAnswer(s) {
    if (s === undefined || s === null) return '';
    let v = String(s).trim().toLowerCase();
    if (v === 'vrai') v = 'true';
    if (v === 'faux') v = 'false';
    return v;
  }

  function isCorrectAns(userVal, ...accepted) {
    const u = normAnswer(userVal);
    return accepted.some(a => normAnswer(a) === u);
  }

  const btnCheckEx1 = getEl('btn-check-ex1');
  const btnShowEx1 = getEl('btn-show-ex1');
  const ex1Score = getEl('ex1-score');

  function checkExercise1(reveal = false) {
    const rows = document.querySelectorAll('#ex1-table tbody tr');
    let correct = 0, total = rows.length;

    rows.forEach(row => {
      const expPy = row.dataset.py || '';
      const expRes = row.dataset.res || '';
      const expType = row.dataset.type || '';

      const inpPy = row.querySelector('.ex1-py');
      const inpRes = row.querySelector('.ex1-res');
      const inpType = row.querySelector('.ex1-type');
      const status = row.querySelector('.ex1-status');

      if (reveal) {
        if (inpPy) { inpPy.value = expPy; inpPy.classList.add('bg-success-subtle'); }
        if (inpRes) { inpRes.value = expRes; inpRes.classList.add('bg-success-subtle'); }
        if (inpType) { inpType.value = expType; inpType.classList.add('bg-success-subtle'); }
        if (status) status.textContent = '✅';
        correct++;
        return;
      }

      const okPy = !inpPy || isCorrectAns(inpPy.value, expPy);
      const okRes = !inpRes || isCorrectAns(inpRes.value, expRes);
      const okType = !inpType || isCorrectAns(inpType.value, expType);
      const allOk = okPy && okRes && okType;

      [inpPy, inpRes, inpType].forEach(inp => {
        if (!inp) return;
        inp.classList.remove('is-valid', 'is-invalid', 'bg-success-subtle', 'bg-danger-subtle');
      });

      if (inpPy) inpPy.classList.add(okPy ? 'is-valid' : 'is-invalid');
      if (inpRes) inpRes.classList.add(okRes ? 'is-valid' : 'is-invalid');
      if (inpType) inpType.classList.add(okType ? 'is-valid' : 'is-invalid');

      if (status) status.textContent = allOk ? '✅' : '❌';
      if (allOk) correct++;
    });

    if (!reveal && ex1Score) {
      const pct = Math.round((correct / total) * 100);
      ex1Score.innerHTML = `
        <div class="alert alert-${pct >= 70 ? 'success' : pct >= 50 ? 'warning' : 'danger'} d-flex align-items-center gap-3">
          <span class="fs-4">📊</span>
          <div>
            <strong>Score : ${correct} / ${total} (${pct}%)</strong><br>
            <small>${pct === 100 ? '🎉 Parfait ! Toutes les réponses sont correctes.' : 'Vérifiez les cellules en rouge et réessayez.'}</small>
          </div>
        </div>`;
    }
  }

  if (btnCheckEx1) btnCheckEx1.addEventListener('click', () => checkExercise1(false));
  if (btnShowEx1) btnShowEx1.addEventListener('click', () => checkExercise1(true));

  const btnCheckEx2 = getEl('btn-check-ex2');
  const btnShowEx2 = getEl('btn-show-ex2');
  const ex2Score = getEl('ex2-score');

  function checkExercise2(reveal = false) {
    const rows = document.querySelectorAll('#ex2-table tbody tr');
    let correct = 0, total = rows.length;

    rows.forEach(row => {
      const expAlgo = row.dataset.algo || null;
      const expPy = row.dataset.py || null;
      const expRes = row.dataset.res || '';
      const expType = row.dataset.type || '';

      const inpAlgo = row.querySelector('.ex2-algo');
      const inpPy = row.querySelector('.ex2-py');
      const inpRes = row.querySelector('.ex2-res');
      const inpType = row.querySelector('.ex2-type');
      const status = row.querySelector('.ex2-status');

      if (reveal) {
        if (inpAlgo && expAlgo) { inpAlgo.value = expAlgo; inpAlgo.classList.add('bg-success-subtle'); }
        if (inpPy && expPy) { inpPy.value = expPy; inpPy.classList.add('bg-success-subtle'); }
        if (inpRes) { inpRes.value = expRes; inpRes.classList.add('bg-success-subtle'); }
        if (inpType) { inpType.value = expType; inpType.classList.add('bg-success-subtle'); }
        if (status) status.textContent = '✅';
        correct++;
        return;
      }

      const okAlgo = !inpAlgo || (inpAlgo.value.trim().length > 0);
      const okPy = !inpPy || (expPy && isCorrectAns(inpPy.value, expPy));
      const okRes = !inpRes || isCorrectAns(inpRes.value, expRes);
      const okType = !inpType || isCorrectAns(inpType.value, expType);
      const allOk = okAlgo && okPy && okRes && okType;

      [inpAlgo, inpPy, inpRes, inpType].forEach(inp => {
        if (!inp) return;
        inp.classList.remove('is-valid', 'is-invalid');
      });

      if (inpAlgo) inpAlgo.classList.add(okAlgo ? 'is-valid' : 'is-invalid');
      if (inpPy) inpPy.classList.add(okPy ? 'is-valid' : 'is-invalid');
      if (inpRes) inpRes.classList.add(okRes ? 'is-valid' : 'is-invalid');
      if (inpType) inpType.classList.add(okType ? 'is-valid' : 'is-invalid');

      if (status) status.textContent = allOk ? '✅' : '❌';
      if (allOk) correct++;
    });

    if (!reveal && ex2Score) {
      const pct = Math.round((correct / total) * 100);
      ex2Score.innerHTML = `
        <div class="alert alert-${pct >= 70 ? 'success' : pct >= 50 ? 'warning' : 'danger'} d-flex align-items-center gap-3">
          <span class="fs-4">📊</span>
          <div>
            <strong>Score : ${correct} / ${total} (${pct}%)</strong><br>
            <small>${pct === 100 ? '🎉 Parfait ! Toutes les réponses sont correctes.' : 'Vérifiez les cellules en rouge et réessayez.'}</small>
          </div>
        </div>`;
    }
  }

  if (btnCheckEx2) btnCheckEx2.addEventListener('click', () => checkExercise2(false));
  if (btnShowEx2) btnShowEx2.addEventListener('click', () => checkExercise2(true));

  const btnCheckEx3 = getEl('btn-check-ex3');
  const btnShowEx3 = getEl('btn-show-ex3');
  const ex3Score = getEl('ex3-score');

  function checkExercise3(reveal = false) {
    const rows = document.querySelectorAll('#ex3-table tbody tr');
    let correct = 0, total = rows.length;

    rows.forEach(row => {
      const expX = row.dataset.x || '';
      const expY = row.dataset.y || '';
      const expZ = row.dataset.z || '';

      const inpX = row.querySelector('.ex3-x');
      const inpY = row.querySelector('.ex3-y');
      const inpZ = row.querySelector('.ex3-z');
      const status = row.querySelector('.ex3-status');

      if (reveal) {
        if (inpX) { inpX.value = expX; inpX.classList.add('bg-success-subtle'); }
        if (inpY) { inpY.value = expY; inpY.classList.add('bg-success-subtle'); }
        if (inpZ) { inpZ.value = expZ; inpZ.classList.add('bg-success-subtle'); }
        if (status) status.textContent = '✅';
        correct++;
        return;
      }

      const checkVal = (userVal, expectedVal) => {
        const u = normAnswer(userVal);
        const e = normAnswer(expectedVal);
        if (e === '-' || e === '') return u === '-' || u === '';
        return u === e;
      };

      const okX = !inpX || checkVal(inpX.value, expX);
      const okY = !inpY || checkVal(inpY.value, expY);
      const okZ = !inpZ || checkVal(inpZ.value, expZ);
      const allOk = okX && okY && okZ;

      [inpX, inpY, inpZ].forEach(inp => {
        if (!inp) return;
        inp.classList.remove('is-valid', 'is-invalid', 'bg-success-subtle', 'bg-danger-subtle');
      });

      if (inpX) inpX.classList.add(okX ? 'is-valid' : 'is-invalid');
      if (inpY) inpY.classList.add(okY ? 'is-valid' : 'is-invalid');
      if (inpZ) inpZ.classList.add(okZ ? 'is-valid' : 'is-invalid');

      if (status) status.textContent = allOk ? '✅' : '❌';
      if (allOk) correct++;
    });

    if (!reveal && ex3Score) {
      const pct = Math.round((correct / total) * 100);
      ex3Score.innerHTML = `
        <div class="alert alert-${pct >= 70 ? 'success' : pct >= 50 ? 'warning' : 'danger'} d-flex align-items-center gap-3">
          <span class="fs-4">📊</span>
          <div>
            <strong>Score : ${correct} / ${total} (${pct}%)</strong><br>
            <small>${pct === 100 ? '🎉 Parfait ! Toutes les valeurs de la trace mémoire sont correctes.' : 'Vérifiez vos calculs de trace mémoire et réessayez.'}</small>
          </div>
        </div>`;
    }
  }

  if (btnCheckEx3) btnCheckEx3.addEventListener('click', () => checkExercise3(false));
  if (btnShowEx3) btnShowEx3.addEventListener('click', () => checkExercise3(true));

  const ex3Table = getEl('ex3-table');
  if (ex3Table) {
    ex3Table.addEventListener('input', (e) => {
      const target = e.target;
      let colClass = '';
      if (target.classList.contains('ex3-x')) colClass = 'ex3-x';
      else if (target.classList.contains('ex3-y')) colClass = 'ex3-y';
      else if (target.classList.contains('ex3-z')) colClass = 'ex3-z';
      if (!colClass) return;

      const rows = Array.from(ex3Table.querySelectorAll('tbody tr'));
      const currentRow = target.closest('tr');
      const currentIndex = rows.indexOf(currentRow);
      if (currentIndex === -1) return;

      const val = target.value;
      for (let i = currentIndex + 1; i < rows.length; i++) {
        const nextInp = rows[i].querySelector('.' + colClass);
        if (nextInp) nextInp.value = val;
      }
    });
  }

  const btnCheckEx4 = getEl('btn-check-ex4');
  const btnShowEx4 = getEl('btn-show-ex4');
  const ex4Score = getEl('ex4-score');

  function checkExercise4(reveal = false) {
    const rows = document.querySelectorAll('#ex4-table tbody tr');
    let correct = 0, total = rows.length;

    rows.forEach(row => {
      const expPy = row.dataset.py || '';
      const expMin = row.dataset.min || '';
      const expMax = row.dataset.max || '';

      const inpPy = row.querySelector('.ex4-py');
      const inpMin = row.querySelector('.ex4-min');
      const inpMax = row.querySelector('.ex4-max');
      const status = row.querySelector('.ex4-status');

      if (reveal) {
        if (inpPy) { inpPy.value = expPy; inpPy.classList.add('bg-success-subtle'); }
        if (inpMin) { inpMin.value = expMin; inpMin.classList.add('bg-success-subtle'); }
        if (inpMax) { inpMax.value = expMax; inpMax.classList.add('bg-success-subtle'); }
        if (status) status.textContent = '✅';
        correct++;
        return;
      }

      const normPy = (s) => String(s || '').replace(/\s+/g, '').toLowerCase();
      const okPy = !inpPy || (normPy(inpPy.value) === normPy(expPy));

      const okMin = !inpMin || isCorrectAns(inpMin.value, expMin, expMin === '1.11' ? '1' : expMin, expMin === '1.11' ? '1.1' : expMin);
      const okMax = !inpMax || isCorrectAns(inpMax.value, expMax);

      const allOk = okPy && okMin && okMax;

      [inpPy, inpMin, inpMax].forEach(inp => {
        if (!inp) return;
        inp.classList.remove('is-valid', 'is-invalid', 'bg-success-subtle', 'bg-danger-subtle');
      });

      if (inpPy) inpPy.classList.add(okPy ? 'is-valid' : 'is-invalid');
      if (inpMin) inpMin.classList.add(okMin ? 'is-valid' : 'is-invalid');
      if (inpMax) inpMax.classList.add(okMax ? 'is-valid' : 'is-invalid');

      if (status) status.textContent = allOk ? '✅' : '❌';
      if (allOk) correct++;
    });

    if (!reveal && ex4Score) {
      const pct = Math.round((correct / total) * 100);
      ex4Score.innerHTML = `
        <div class="alert alert-${pct >= 70 ? 'success' : pct >= 50 ? 'warning' : 'danger'} d-flex align-items-center gap-3">
          <span class="fs-4">📊</span>
          <div>
            <strong>Score : ${correct} / ${total} (${pct}%)</strong><br>
            <small>${pct === 100 ? '🎉 Excellent ! Vos instructions Python et bornes d\'intervalle sont toutes exactes.' : 'Vérifiez les cellules en rouge et réessayez.'}</small>
          </div>
        </div>`;
    }
  }

  if (btnCheckEx4) btnCheckEx4.addEventListener('click', () => checkExercise4(false));
  if (btnShowEx4) btnShowEx4.addEventListener('click', () => checkExercise4(true));

  const btnCheckEx5 = getEl('btn-check-ex5');
  const btnShowEx5 = getEl('btn-show-ex5');
  const ex5Score = getEl('ex5-score');

  function checkExercise5(reveal = false) {
    const rows = document.querySelectorAll('#ex5-table tbody tr');
    let correct = 0, total = rows.length;

    rows.forEach(row => {
      const expRes = row.dataset.res || '';
      const inpRes = row.querySelector('.ex5-res');
      const status = row.querySelector('.ex5-status');

      if (reveal) {
        if (inpRes) { inpRes.value = expRes; inpRes.classList.add('bg-success-subtle'); }
        if (status) status.textContent = '✅';
        correct++;
        return;
      }

      let userVal = (inpRes ? inpRes.value : '').trim();
      if ((userVal.startsWith('"') && userVal.endsWith('"')) || (userVal.startsWith("'") && userVal.endsWith("'"))) {
        userVal = userVal.slice(1, -1);
      }

      const okRes = isCorrectAns(userVal, expRes);

      if (inpRes) {
        inpRes.classList.remove('is-valid', 'is-invalid', 'bg-success-subtle', 'bg-danger-subtle');
        inpRes.classList.add(okRes ? 'is-valid' : 'is-invalid');
      }

      if (status) status.textContent = okRes ? '✅' : '❌';
      if (okRes) correct++;
    });

    if (!reveal && ex5Score) {
      const pct = Math.round((correct / total) * 100);
      ex5Score.innerHTML = `
        <div class="alert alert-${pct >= 70 ? 'success' : pct >= 50 ? 'warning' : 'danger'} d-flex align-items-center gap-3">
          <span class="fs-4">📊</span>
          <div>
            <strong>Score : ${correct} / ${total} (${pct}%)</strong><br>
            <small>${pct === 100 ? '🎉 Excellent ! Tous les résultats de concaténation sont exacts.' : 'Vérifiez l\'indexation et la casse des caractères puis réessayez.'}</small>
          </div>
        </div>`;
    }
  }

  if (btnCheckEx5) btnCheckEx5.addEventListener('click', () => checkExercise5(false));
  if (btnShowEx5) btnShowEx5.addEventListener('click', () => checkExercise5(true));

  const btnCheckEx6 = getEl('btn-check-ex6');
  const btnShowEx6 = getEl('btn-show-ex6');
  const ex6Score = getEl('ex6-score');

  function checkExercise6(reveal = false) {
    const rows = document.querySelectorAll('#ex6-table tbody tr');
    let correct = 0, total = rows.length;

    rows.forEach(row => {
      const expAlgo = row.dataset.algo || null;
      const expPy = row.dataset.py || null;
      const expRes = row.dataset.res || '';
      const expType = row.dataset.type || '';

      const inpAlgo = row.querySelector('.ex6-algo');
      const inpPy = row.querySelector('.ex6-py');
      const inpRes = row.querySelector('.ex6-res');
      const inpType = row.querySelector('.ex6-type');
      const status = row.querySelector('.ex6-status');

      if (reveal) {
        if (inpAlgo && expAlgo) { inpAlgo.value = expAlgo; inpAlgo.classList.add('bg-success-subtle'); }
        if (inpPy && expPy) { inpPy.value = expPy; inpPy.classList.add('bg-success-subtle'); }
        if (inpRes) { inpRes.value = expRes; inpRes.classList.add('bg-success-subtle'); }
        if (inpType) { inpType.value = expType; inpType.classList.add('bg-success-subtle'); }
        if (status) status.textContent = '✅';
        correct++;
        return;
      }

      const okAlgo = !inpAlgo || (inpAlgo.value.trim().length > 0);
      const normPy = s => String(s || '').replace(/\s+/g, '').toLowerCase();
      const okPy = !inpPy || (expPy && normPy(inpPy.value) === normPy(expPy));

      let userRes = (inpRes ? inpRes.value : '').trim();
      if ((userRes.startsWith('"') && userRes.endsWith('"')) || (userRes.startsWith("'") && userRes.endsWith("'"))) {
        userRes = userRes.slice(1, -1);
      }
      const okRes = !inpRes || isCorrectAns(userRes, expRes, expRes === 'A = 13, B = 6' ? '13, 6' : expRes, expRes === 'I = -1, J = 11' ? '-1, 11' : expRes);
      const okType = !inpType || isCorrectAns(inpType.value, expType);

      const allOk = okAlgo && okPy && okRes && okType;

      [inpAlgo, inpPy, inpRes, inpType].forEach(inp => {
        if (!inp) return;
        inp.classList.remove('is-valid', 'is-invalid', 'bg-success-subtle', 'bg-danger-subtle');
      });

      if (inpAlgo) inpAlgo.classList.add(okAlgo ? 'is-valid' : 'is-invalid');
      if (inpPy) inpPy.classList.add(okPy ? 'is-valid' : 'is-invalid');
      if (inpRes) inpRes.classList.add(okRes ? 'is-valid' : 'is-invalid');
      if (inpType) inpType.classList.add(okType ? 'is-valid' : 'is-invalid');

      if (status) status.textContent = allOk ? '✅' : '❌';
      if (allOk) correct++;
    });

    if (!reveal && ex6Score) {
      const pct = Math.round((correct / total) * 100);
      ex6Score.innerHTML = `
        <div class="alert alert-${pct >= 70 ? 'success' : pct >= 50 ? 'warning' : 'danger'} d-flex align-items-center gap-3">
          <span class="fs-4">📊</span>
          <div>
            <strong>Score : ${correct} / ${total} (${pct}%)</strong><br>
            <small>${pct === 100 ? '🎉 Parfait ! Toutes les manipulations de chaînes sont exactes.' : 'Vérifiez les cellules en rouge et réessayez.'}</small>
          </div>
        </div>`;
    }
  }

  if (btnCheckEx6) btnCheckEx6.addEventListener('click', () => checkExercise6(false));
  if (btnShowEx6) btnShowEx6.addEventListener('click', () => checkExercise6(true));

  const simFnSelect = getEl('ex7-sim-fn');
  const simControls = getEl('ex7-sim-controls');
  const simSvgContainer = getEl('ex7-svg-container');

  if (simFnSelect && simControls && simSvgContainer) {
    const renderControls = () => {
      const fn = simFnSelect.value;
      let html = '';
      if (fn === 'ent' || fn === 'arrondi') {
        html = `
          <label class="form-label fw-bold text-info small mb-1">Valeur du nombre réel x :</label>
          <div class="input-group input-group-sm">
            <span class="input-group-text font-monospace fw-bold">x =</span>
            <input type="number" id="ex7-val-x" class="form-control font-monospace fw-bold text-center" value="${fn === 'ent' ? '12.33' : '12.75'}" step="0.01">
          </div>
        `;
      } else if (fn === 'sous_chaine') {
        html = `
          <div class="row g-2">
            <div class="col-6">
              <label class="form-label fw-bold text-info small mb-1">Chaîne ch :</label>
              <input type="text" id="ex7-val-ch" class="form-control form-control-sm font-monospace text-center" value="informatique">
            </div>
            <div class="col-3">
              <label class="form-label fw-bold text-info small mb-1">Départ :</label>
              <input type="number" id="ex7-val-pos" class="form-control form-control-sm font-monospace text-center" value="2" min="0">
            </div>
            <div class="col-3">
              <label class="form-label fw-bold text-info small mb-1">Longueur :</label>
              <input type="number" id="ex7-val-len" class="form-control form-control-sm font-monospace text-center" value="3" min="1">
            </div>
          </div>
        `;
      } else if (fn === 'estnum') {
        html = `
          <label class="form-label fw-bold text-info small mb-1">Chaîne ch à tester :</label>
          <div class="input-group input-group-sm">
            <span class="input-group-text font-monospace fw-bold">ch =</span>
            <input type="text" id="ex7-val-numstr" class="form-control font-monospace fw-bold text-center" value="123">
          </div>
        `;
      } else if (fn === 'pos') {
        html = `
          <div class="row g-2">
            <div class="col-5">
              <label class="form-label fw-bold text-info small mb-1">Motif recherché (ch1) :</label>
              <input type="text" id="ex7-val-motif" class="form-control form-control-sm font-monospace text-center" value="2">
            </div>
            <div class="col-7">
              <label class="form-label fw-bold text-info small mb-1">Texte cible (ch2) :</label>
              <input type="text" id="ex7-val-target" class="form-control form-control-sm font-monospace text-center" value="FIFA 2022">
            </div>
          </div>
        `;
      }
      simControls.innerHTML = html;
      updateSvg();
    };

    const updateSvg = () => {
      const fn = simFnSelect.value;
      let svgD = '';

      if (fn === 'ent' || fn === 'arrondi') {
        const x = parseFloat(getEl('ex7-val-x')?.value) || 0;
        const res = fn === 'ent' ? Math.floor(x) : Math.round(x);
        const integerPart = Math.trunc(x);
        const decimalPart = (Math.abs(x) % 1).toFixed(2).replace('0.', '.');

        svgD = `
          <svg viewBox="0 0 650 190" class="w-100" style="max-height: 200px;">
            <defs>
              <marker id="ex7-arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto">
                <path d="M 0 1.5 L 10 5 L 0 8.5 z" fill="#38bdf8"/>
              </marker>
            </defs>

            <rect x="20" y="55" width="150" height="80" rx="10" fill="#1e293b" stroke="#38bdf8" stroke-width="2"/>
            <text x="95" y="80" text-anchor="middle" fill="#94a3b8" font-family="monospace" font-size="12">Réel x (Entrée)</text>
            <text x="95" y="110" text-anchor="middle" fill="#38bdf8" font-family="monospace" font-size="22" font-weight="bold">${x}</text>

            <line x1="170" y1="95" x2="230" y2="95" stroke="#38bdf8" stroke-width="3" marker-end="url(#ex7-arrow)"/>

            <rect x="230" y="45" width="180" height="100" rx="15" fill="#0f172a" stroke="#fbbf24" stroke-width="3"/>
            <text x="320" y="80" text-anchor="middle" fill="#fbbf24" font-family="sans-serif" font-size="16" font-weight="bold">${fn === 'ent' ? 'Ent(x)' : 'Arrondi(x)'}</text>
            <text x="320" y="105" text-anchor="middle" fill="#cbd5e1" font-family="sans-serif" font-size="11">${fn === 'ent' ? 'Extrait partie entière' : 'Arrondit au + proche'}</text>
            <text x="320" y="125" text-anchor="middle" fill="#94a3b8" font-family="monospace" font-size="11">Partie Ent: ${integerPart} | Déc: ${decimalPart}</text>

            <line x1="410" y1="95" x2="470" y2="95" stroke="#38bdf8" stroke-width="3" marker-end="url(#ex7-arrow)"/>

            <rect x="470" y="55" width="160" height="80" rx="10" fill="#065f46" stroke="#34d399" stroke-width="2"/>
            <text x="550" y="80" text-anchor="middle" fill="#a7f3d0" font-family="monospace" font-size="12">Résultat (Type: int)</text>
            <text x="550" y="112" text-anchor="middle" fill="#ffffff" font-family="monospace" font-size="26" font-weight="bold">${res}</text>
          </svg>
        `;
      } else if (fn === 'sous_chaine') {
        const ch = getEl('ex7-val-ch')?.value || 'informatique';
        const pos = Math.max(0, parseInt(getEl('ex7-val-pos')?.value) || 0);
        const len = Math.max(1, parseInt(getEl('ex7-val-len')?.value) || 1);
        const sub = ch.substr(pos, len);

        let charBoxes = '';
        const charW = Math.min(32, Math.max(20, Math.floor(450 / Math.max(1, ch.length))));
        const startX = Math.round((480 - ch.length * charW) / 2);

        for (let i = 0; i < ch.length; i++) {
          const isSelected = i >= pos && i < pos + len;
          const x = startX + i * charW;
          charBoxes += `
            <g transform="translate(${x}, 40)">
              <rect x="0" y="0" width="${charW - 3}" height="18" rx="3" fill="#334155"/>
              <text x="${(charW - 3) / 2}" y="13" text-anchor="middle" fill="#94a3b8" font-family="monospace" font-size="10">${i}</text>

              <rect x="0" y="22" width="${charW - 3}" height="32" rx="4" fill="${isSelected ? '#fbbf24' : '#1e293b'}" stroke="${isSelected ? '#f59e0b' : '#475569'}" stroke-width="${isSelected ? '2' : '1'}"/>
              <text x="${(charW - 3) / 2}" y="43" text-anchor="middle" fill="${isSelected ? '#000000' : '#ffffff'}" font-family="monospace" font-size="15" font-weight="bold">${ch[i]}</text>
            </g>
          `;
        }

        svgD = `
          <svg viewBox="0 0 650 190" class="w-100" style="max-height: 200px;">
            ${charBoxes}
            <rect x="180" y="120" width="290" height="50" rx="10" fill="#065f46" stroke="#34d399" stroke-width="2"/>
            <text x="325" y="140" text-anchor="middle" fill="#a7f3d0" font-family="monospace" font-size="11">sous_chaine("${ch}", ${pos}, ${len}) &rarr; Type: str</text>
            <text x="325" y="160" text-anchor="middle" fill="#ffffff" font-family="monospace" font-size="18" font-weight="bold">"${sub}"</text>
          </svg>
        `;
      } else if (fn === 'estnum') {
        const ch = getEl('ex7-val-numstr')?.value || '123';
        const isNum = /^\d+$/.test(ch);

        let charBoxes = '';
        const charW = Math.min(40, Math.max(25, Math.floor(350 / Math.max(1, ch.length))));
        const startX = Math.round((380 - ch.length * charW) / 2);

        for (let i = 0; i < ch.length; i++) {
          const isDigit = /\d/.test(ch[i]);
          const x = startX + i * charW;
          charBoxes += `
            <g transform="translate(${x}, 50)">
              <rect x="0" y="0" width="${charW - 4}" height="35" rx="5" fill="${isDigit ? '#065f46' : '#991b1b'}" stroke="${isDigit ? '#34d399' : '#f87171'}" stroke-width="1.5"/>
              <text x="${(charW - 4) / 2}" y="23" text-anchor="middle" fill="#ffffff" font-family="monospace" font-size="16" font-weight="bold">${ch[i]}</text>
              <text x="${(charW - 4) / 2}" y="48" text-anchor="middle" fill="${isDigit ? '#34d399' : '#f87171'}" font-family="sans-serif" font-size="11" font-weight="bold">${isDigit ? '✓' : '✗'}</text>
            </g>
          `;
        }

        svgD = `
          <svg viewBox="0 0 650 190" class="w-100" style="max-height: 200px;">
            ${charBoxes}
            <rect x="420" y="55" width="200" height="80" rx="12" fill="${isNum ? '#065f46' : '#7f1d1d'}" stroke="${isNum ? '#34d399' : '#ef4444'}" stroke-width="2.5"/>
            <text x="520" y="80" text-anchor="middle" fill="${isNum ? '#a7f3d0' : '#fca5a5'}" font-family="monospace" font-size="12">EstNum("${ch}") &rarr; bool</text>
            <text x="520" y="112" text-anchor="middle" fill="#ffffff" font-family="monospace" font-size="22" font-weight="bold">${isNum ? 'VRAI (True)' : 'FAUX (False)'}</text>
          </svg>
        `;
      } else if (fn === 'pos') {
        const motif = getEl('ex7-val-motif')?.value || '2';
        const target = getEl('ex7-val-target')?.value || 'FIFA 2022';
        const posIndex = target.indexOf(motif);

        let charBoxes = '';
        const charW = Math.min(35, Math.max(22, Math.floor(520 / Math.max(1, target.length))));
        const startX = Math.round((550 - target.length * charW) / 2);

        for (let i = 0; i < target.length; i++) {
          const isMatch = posIndex !== -1 && i >= posIndex && i < posIndex + motif.length;
          const x = startX + i * charW;
          const displayChar = target[i] === ' ' ? '␣' : target[i];
          charBoxes += `
            <g transform="translate(${x}, 40)">
              <rect x="0" y="0" width="${charW - 3}" height="18" rx="3" fill="#334155"/>
              <text x="${(charW - 3) / 2}" y="13" text-anchor="middle" fill="#94a3b8" font-family="monospace" font-size="10">${i}</text>

              <rect x="0" y="22" width="${charW - 3}" height="32" rx="4" fill="${isMatch ? '#38bdf8' : '#1e293b'}" stroke="${isMatch ? '#0284c7' : '#475569'}" stroke-width="${isMatch ? '2' : '1'}"/>
              <text x="${(charW - 3) / 2}" y="43" text-anchor="middle" fill="${isMatch ? '#000000' : '#ffffff'}" font-family="monospace" font-size="15" font-weight="bold">${displayChar}</text>
            </g>
          `;
        }

        svgD = `
          <svg viewBox="0 0 650 190" class="w-100" style="max-height: 200px;">
            ${charBoxes}
            <rect x="180" y="120" width="290" height="50" rx="10" fill="#0c4a6e" stroke="#38bdf8" stroke-width="2"/>
            <text x="325" y="140" text-anchor="middle" fill="#bae6fd" font-family="monospace" font-size="11">Pos("${motif}", "${target}") &rarr; Type: int</text>
            <text x="325" y="160" text-anchor="middle" fill="#ffffff" font-family="monospace" font-size="18" font-weight="bold">Position P = ${posIndex}</text>
          </svg>
        `;
      }

      simSvgContainer.innerHTML = svgD;
    };

    simFnSelect.addEventListener('change', renderControls);
    simControls.addEventListener('input', updateSvg);
    renderControls();
  }

  const btnGenPass = getEl('btn-gen-pass');
  const passResultInput = getEl('pass-result');
  const ex8SvgContainer = getEl('ex8-svg-container');

  const generateRandomPassword = () => {
    const c1 = String(Math.floor(Math.random() * 10));
    const c2 = String(Math.floor(Math.random() * 10));

    const m1 = String.fromCharCode(65 + Math.floor(Math.random() * 26));
    const m2 = String.fromCharCode(65 + Math.floor(Math.random() * 26));

    const l1 = String.fromCharCode(97 + Math.floor(Math.random() * 26));
    const l2 = String.fromCharCode(97 + Math.floor(Math.random() * 26));

    const pwd = c1 + c2 + m1 + m2 + l1 + l2;

    if (passResultInput) passResultInput.value = pwd;

    renderPassSvg(c1, c2, m1, m2, l1, l2, pwd);
  };

  const renderPassSvg = (c1, c2, m1, m2, l1, l2, pwd) => {
    if (!ex8SvgContainer) return;

    const chars = [
      { char: c1, code: c1.charCodeAt(0), type: 'Chiffre', color: '#f59e0b', bg: '#78350f' },
      { char: c2, code: c2.charCodeAt(0), type: 'Chiffre', color: '#f59e0b', bg: '#78350f' },
      { char: m1, code: m1.charCodeAt(0), type: 'Majuscule', color: '#38bdf8', bg: '#0c4a6e' },
      { char: m2, code: m2.charCodeAt(0), type: 'Majuscule', color: '#38bdf8', bg: '#0c4a6e' },
      { char: l1, code: l1.charCodeAt(0), type: 'Minuscule', color: '#4ade80', bg: '#064e3b' },
      { char: l2, code: l2.charCodeAt(0), type: 'Minuscule', color: '#4ade80', bg: '#064e3b' }
    ];

    let slotsSvg = '';
    const slotW = 85;
    const startX = 35;

    chars.forEach((c, idx) => {
      const x = startX + idx * (slotW + 12);
      slotsSvg += `
        <g transform="translate(${x}, 35)">
          <rect x="0" y="0" width="${slotW}" height="22" rx="4" fill="${c.bg}" stroke="${c.color}" stroke-width="1"/>
          <text x="${slotW / 2}" y="15" text-anchor="middle" fill="${c.color}" font-family="sans-serif" font-size="10" font-weight="bold">${c.type}</text>

          <rect x="0" y="26" width="${slotW}" height="50" rx="8" fill="#1e293b" stroke="${c.color}" stroke-width="2.5"/>
          <text x="${slotW / 2}" y="61" text-anchor="middle" fill="#ffffff" font-family="monospace" font-size="28" font-weight="bold">${c.char}</text>

          <rect x="0" y="80" width="${slotW}" height="18" rx="3" fill="#0f172a"/>
          <text x="${slotW / 2}" y="93" text-anchor="middle" fill="#94a3b8" font-family="monospace" font-size="10">ASCII: ${c.code}</text>
        </g>
      `;
    });

    const svgContent = `
      <svg viewBox="0 0 650 200" class="w-100" style="max-height: 220px;">
        <defs>
          <linearGradient id="pass-grad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stop-color="#f59e0b" stop-opacity="0.2"/>
            <stop offset="50%" stop-color="#38bdf8" stop-opacity="0.2"/>
            <stop offset="100%" stop-color="#4ade80" stop-opacity="0.2"/>
          </linearGradient>
        </defs>

        <rect x="10" y="10" width="630" height="180" rx="12" fill="url(#pass-grad)" stroke="#334155" stroke-width="1.5"/>
        ${slotsSvg}
        <text x="325" y="172" text-anchor="middle" fill="#cbd5e1" font-family="sans-serif" font-size="12" font-weight="bold">
          Composition de mp = "${pwd}" : 
          <tspan fill="#f59e0b">2 Chiffres [0-9]</tspan> + 
          <tspan fill="#38bdf8">2 Majuscules [A-Z]</tspan> + 
          <tspan fill="#4ade80">2 Minuscules [a-z]</tspan>
        </text>
      </svg>
    `;

    ex8SvgContainer.innerHTML = svgContent;
  };

  if (btnGenPass) {
    btnGenPass.addEventListener('click', generateRandomPassword);
    generateRandomPassword();
  }

  const permAInput = getEl('perm-a');
  const btnPermute = getEl('btn-permute');
  const ex9SvgContainer = getEl('ex9-svg-container');
  const permOut = getEl('perm-out');

  const processPermutation = () => {
    let rawA = parseInt(permAInput?.value) || 49;
    if (rawA < 10) rawA = 10;
    if (rawA > 99) rawA = 99;
    if (permAInput && document.activeElement !== permAInput) permAInput.value = rawA;

    const diz = Math.floor(rawA / 10);
    const uni = rawA % 10;
    const b = uni * 10 + diz;

    renderPermSvg(rawA, diz, uni, b);

    if (permOut) {
      permOut.innerHTML = `
        <div class="alert alert-info border-start border-info border-4 mb-0 py-2 px-3 small text-dark">
          <strong>Décomposition mathématique :</strong><br>
          • <code>Dizaines = a // 10</code> = <code>${rawA} // 10</code> = <strong>${diz}</strong><br>
          • <code>Unités = a % 10</code> = <code>${rawA} % 10</code> = <strong>${uni}</strong><br>
          • <code>b = Unités * 10 + Dizaines</code> = <code>${uni} * 10 + ${diz}</code> = <strong class="text-primary fs-6">${b}</strong>
        </div>`;
    }
  };

  const renderPermSvg = (a, diz, uni, b) => {
    if (!ex9SvgContainer) return;

    const svgContent = `
      <svg viewBox="0 0 650 200" class="w-100" style="max-height: 220px;">
        <defs>
          <marker id="ex9-arrow-top" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto">
            <path d="M 0 1.5 L 10 5 L 0 8.5 z" fill="#f59e0b"/>
          </marker>
          <marker id="ex9-arrow-bot" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto">
            <path d="M 0 1.5 L 10 5 L 0 8.5 z" fill="#38bdf8"/>
          </marker>
        </defs>

        <g transform="translate(30, 45)">
          <rect x="0" y="0" width="160" height="110" rx="12" fill="#1e293b" stroke="#38bdf8" stroke-width="2"/>
          <text x="80" y="25" text-anchor="middle" fill="#94a3b8" font-family="monospace" font-size="13">Nombre initial a = ${a}</text>
          
          <rect x="20" y="38" width="55" height="55" rx="8" fill="#0284c7" stroke="#38bdf8" stroke-width="2"/>
          <text x="47" y="74" text-anchor="middle" fill="#ffffff" font-family="monospace" font-size="26" font-weight="bold">${diz}</text>
          <text x="47" y="103" text-anchor="middle" fill="#38bdf8" font-family="sans-serif" font-size="10">Dizaines</text>

          <rect x="85" y="38" width="55" height="55" rx="8" fill="#d97706" stroke="#fbbf24" stroke-width="2"/>
          <text x="112" y="74" text-anchor="middle" fill="#ffffff" font-family="monospace" font-size="26" font-weight="bold">${uni}</text>
          <text x="112" y="103" text-anchor="middle" fill="#fbbf24" font-family="sans-serif" font-size="10">Unités</text>
        </g>

        <g transform="translate(225, 30)">
          <rect x="0" y="0" width="200" height="140" rx="15" fill="#0f172a" stroke="#a855f7" stroke-width="2.5"/>
          <text x="100" y="28" text-anchor="middle" fill="#c084fc" font-family="sans-serif" font-size="14" font-weight="bold">🔀 PERMUTATION</text>

          <path d="M 20 60 C 80 60, 120 110, 180 110" fill="none" stroke="#38bdf8" stroke-width="3" stroke-dasharray="4,4" marker-end="url(#ex9-arrow-bot)"/>
          <path d="M 20 110 C 80 110, 120 60, 180 60" fill="none" stroke="#f59e0b" stroke-width="3" stroke-dasharray="4,4" marker-end="url(#ex9-arrow-top)"/>

          <text x="100" y="132" text-anchor="middle" fill="#e2e8f0" font-family="monospace" font-size="11">b = (a % 10)*10 + (a // 10)</text>
        </g>

        <g transform="translate(460, 45)">
          <rect x="0" y="0" width="160" height="110" rx="12" fill="#064e3b" stroke="#34d399" stroke-width="2"/>
          <text x="80" y="25" text-anchor="middle" fill="#a7f3d0" font-family="monospace" font-size="13">Résultat b = ${b}</text>
          
          <rect x="20" y="38" width="55" height="55" rx="8" fill="#d97706" stroke="#fbbf24" stroke-width="2"/>
          <text x="47" y="74" text-anchor="middle" fill="#ffffff" font-family="monospace" font-size="26" font-weight="bold">${uni}</text>
          <text x="47" y="103" text-anchor="middle" fill="#fbbf24" font-family="sans-serif" font-size="10">Dizaines</text>

          <rect x="85" y="38" width="55" height="55" rx="8" fill="#0284c7" stroke="#38bdf8" stroke-width="2"/>
          <text x="112" y="74" text-anchor="middle" fill="#ffffff" font-family="monospace" font-size="26" font-weight="bold">${diz}</text>
          <text x="112" y="103" text-anchor="middle" fill="#38bdf8" font-family="sans-serif" font-size="10">Unités</text>
        </g>
      </svg>
    `;

    ex9SvgContainer.innerHTML = svgContent;
  };

  if (permAInput && btnPermute) {
    btnPermute.addEventListener('click', processPermutation);
    permAInput.addEventListener('input', processPermutation);
    processPermutation();
  }

  const batNibInput = getEl('bat-nib');
  const batIkdInput = getEl('bat-ikd');
  const batNfbInput = getEl('bat-nfb');
  const batIkfInput = getEl('bat-ikf');
  const btnCalcBat = getEl('btn-calc-bat');
  const ex10SvgContainer = getEl('ex10-svg-container');
  const batOut = getEl('bat-out');

  const processBatteryCalc = () => {
    const nib = parseFloat(batNibInput?.value) || 80;
    const ikd = parseFloat(batIkdInput?.value) || 25000;
    const nfb = parseFloat(batNfbInput?.value) || 60;
    const ikf = parseFloat(batIkfInput?.value) || 25100;

    const deltaD = Math.max(0.1, ikf - ikd);
    const deltaB = Math.max(0, nib - nfb);
    const conso100 = (deltaB / deltaD) * 100;
    const dm = conso100 > 0 ? (nfb / conso100) * 100 : 0;

    renderBatterySvg(nib, nfb, deltaD, deltaB, conso100, dm);

    if (batOut) {
      batOut.innerHTML = `
        <div class="alert alert-success border-start border-success border-4 mb-0 py-2 px-3 small text-dark">
          <strong>Résultats du parcours :</strong><br>
          • <strong>Distance parcourue (&Delta;D) :</strong> <code>${ikf} - ${ikd}</code> = <strong>${deltaD.toFixed(1)} km</strong><br>
          • <strong>Charge consommée (&Delta;B) :</strong> <code>${nib}% - ${nfb}%</code> = <strong>${deltaB.toFixed(1)}%</strong><br>
          • <strong>Consommation aux 100 km :</strong> <code>(${deltaB.toFixed(1)} / ${deltaD.toFixed(1)}) * 100</code> = <strong class="text-primary">${conso100.toFixed(2)}% / 100 km</strong><br>
          • <strong>Autonomie restante (dm) :</strong> <code>(${nfb}% / ${conso100.toFixed(2)}) * 100</code> = <strong class="text-success fs-6">${dm.toFixed(1)} km</strong>
        </div>`;
    }
  };

  const renderBatterySvg = (nib, nfb, deltaD, deltaB, conso100, dm) => {
    if (!ex10SvgContainer) return;

    const batColor = nfb > 50 ? '#22c55e' : nfb > 20 ? '#eab308' : '#ef4444';
    const batW = Math.min(180, Math.max(5, (nfb / 100) * 180));

    const svgContent = `
      <svg viewBox="0 0 650 200" class="w-100" style="max-height: 220px;">
        <defs>
          <linearGradient id="bat-grad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stop-color="${batColor}" stop-opacity="0.9"/>
            <stop offset="100%" stop-color="${batColor}" stop-opacity="0.4"/>
          </linearGradient>
        </defs>

        <g transform="translate(30, 35)">
          <text x="100" y="20" text-anchor="middle" fill="#cbd5e1" font-family="sans-serif" font-size="13" font-weight="bold">Batterie Restante (${nfb}%)</text>
          <rect x="0" y="32" width="190" height="90" rx="10" fill="#1e293b" stroke="#64748b" stroke-width="3"/>
          <rect x="190" y="57" width="12" height="40" rx="3" fill="#64748b"/>
          <rect x="5" y="37" width="${batW}" height="80" rx="6" fill="url(#bat-grad)"/>
          <text x="95" y="85" text-anchor="middle" fill="#ffffff" font-family="monospace" font-size="28" font-weight="bold">${Math.round(nfb)}%</text>
          <text x="95" y="110" text-anchor="middle" fill="#e2e8f0" font-family="monospace" font-size="11">Init: ${nib}% | Consommé: ${deltaB.toFixed(1)}%</text>
        </g>

        <g transform="translate(250, 45)">
          <rect x="0" y="0" width="150" height="110" rx="12" fill="#0f172a" stroke="#38bdf8" stroke-width="2"/>
          <text x="75" y="30" text-anchor="middle" fill="#38bdf8" font-family="sans-serif" font-size="12" font-weight="bold">🚘 PARCOURS TEST</text>
          <text x="75" y="60" text-anchor="middle" fill="#ffffff" font-family="monospace" font-size="20" font-weight="bold">${deltaD.toFixed(0)} km</text>
          <text x="75" y="85" text-anchor="middle" fill="#94a3b8" font-family="sans-serif" font-size="11">Consommation :</text>
          <text x="75" y="102" text-anchor="middle" fill="#fbbf24" font-family="monospace" font-size="13" font-weight="bold">${conso100.toFixed(1)}% / 100km</text>
        </g>

        <g transform="translate(430, 35)">
          <text x="95" y="20" text-anchor="middle" fill="#cbd5e1" font-family="sans-serif" font-size="13" font-weight="bold">Autonomie Max (dm)</text>
          <rect x="0" y="32" width="190" height="90" rx="12" fill="#064e3b" stroke="#34d399" stroke-width="2.5"/>
          <text x="95" y="70" text-anchor="middle" fill="#34d399" font-family="sans-serif" font-size="12">Distance Max Possibilité :</text>
          <text x="95" y="105" text-anchor="middle" fill="#ffffff" font-family="monospace" font-size="28" font-weight="bold">${dm.toFixed(0)} km</text>
        </g>
      </svg>
    `;

    ex10SvgContainer.innerHTML = svgContent;
  };

  if (btnCalcBat) {
    btnCalcBat.addEventListener('click', processBatteryCalc);
    [batNibInput, batIkdInput, batNfbInput, batIkfInput].forEach(inp => {
      if (inp) inp.addEventListener('input', processBatteryCalc);
    });
    processBatteryCalc();
  }

  const gateA = getEl('gate-a');
  const gateB = getEl('gate-b');
  const gateC = getEl('gate-c');
  const valA = getEl('val-a');
  const valB = getEl('val-b');
  const valC = getEl('val-c');
  const valL = getEl('val-L');
  const ex11SvgContainer = getEl('ex11-svg-container');

  const updateLogicGates = () => {
    const a = gateA?.checked ? 1 : 0;
    const b = gateB?.checked ? 1 : 0;
    const c = gateC?.checked ? 1 : 0;

    const notC = c ? 0 : 1;
    const t1 = (a && notC) ? 1 : 0;
    const t2 = (b && c) ? 1 : 0;
    const L = (t1 || t2) ? 1 : 0;

    if (valA) valA.innerHTML = `<span class="badge ${a ? 'bg-success' : 'bg-secondary'}">${a} (${a ? 'VRAI' : 'FAUX'})</span>`;
    if (valB) valB.innerHTML = `<span class="badge ${b ? 'bg-warning text-dark' : 'bg-secondary'}">${b} (${b ? 'VRAI' : 'FAUX'})</span>`;
    if (valC) valC.innerHTML = `<span class="badge ${c ? 'bg-info text-dark' : 'bg-secondary'}">${c} (${c ? 'VRAI' : 'FAUX'})</span>`;

    if (valL) {
      valL.className = `badge ${L ? 'bg-success' : 'bg-danger'} fs-5 px-3 py-2`;
      valL.innerHTML = L ? 'VRAI (1) — Allumée 💡' : 'FAUX (0) — Éteinte 🔴';
    }

    const truthRows = document.querySelectorAll('#ex11-truth-table tbody tr');
    truthRows.forEach(row => {
      const key = `${a},${b},${c}`;
      if (row.dataset.row === key) {
        row.style.backgroundColor = 'rgba(56, 189, 248, 0.35)';
        row.style.outline = '2px solid #38bdf8';
        row.classList.add('fw-bold');
      } else {
        row.style.backgroundColor = '';
        row.style.outline = 'none';
        row.classList.remove('fw-bold');
      }
    });

    renderLogicCircuitSvg(a, b, c, notC, t1, t2, L);
  };

  const renderLogicCircuitSvg = (a, b, c, notC, t1, t2, L) => {
    if (!ex11SvgContainer) return;

    const color = s => s ? '#22c55e' : '#475569';
    const width = s => s ? '3' : '1.5';

    const svgContent = `
      <svg viewBox="0 0 650 220" class="w-100" style="max-height: 240px;">
        <g transform="translate(30, 45)">
          <circle cx="20" cy="0" r="16" fill="${a ? '#0284c7' : '#1e293b'}" stroke="${a ? '#38bdf8' : '#475569'}" stroke-width="2"/>
          <text x="20" y="5" text-anchor="middle" fill="#ffffff" font-family="monospace" font-size="14" font-weight="bold">a=${a}</text>
        </g>

        <g transform="translate(30, 110)">
          <circle cx="20" cy="0" r="16" fill="${b ? '#d97706' : '#1e293b'}" stroke="${b ? '#fbbf24' : '#475569'}" stroke-width="2"/>
          <text x="20" y="5" text-anchor="middle" fill="#ffffff" font-family="monospace" font-size="14" font-weight="bold">b=${b}</text>
        </g>

        <g transform="translate(30, 175)">
          <circle cx="20" cy="0" r="16" fill="${c ? '#15803d' : '#1e293b'}" stroke="${c ? '#4ade80' : '#475569'}" stroke-width="2"/>
          <text x="20" y="5" text-anchor="middle" fill="#ffffff" font-family="monospace" font-size="14" font-weight="bold">c=${c}</text>
        </g>

        <line x1="50" y1="45" x2="270" y2="45" stroke="${color(a)}" stroke-width="${width(a)}"/>
        <line x1="50" y1="175" x2="140" y2="175" stroke="${color(c)}" stroke-width="${width(c)}"/>

        <g transform="translate(140, 160)">
          <polygon points="0,0 25,15 0,30" fill="${notC ? '#0369a1' : '#1e293b'}" stroke="${notC ? '#38bdf8' : '#475569'}" stroke-width="1.5"/>
          <circle cx="28" cy="15" r="3" fill="#ffffff"/>
          <text x="12" y="38" text-anchor="middle" fill="#94a3b8" font-family="sans-serif" font-size="9">NON</text>
        </g>

        <line x1="172" y1="175" x2="200" y2="175" stroke="${color(notC)}" stroke-width="${width(notC)}"/>
        <polyline points="200,175 200,65 270,65" fill="none" stroke="${color(notC)}" stroke-width="${width(notC)}"/>
        <text x="205" y="120" fill="${color(notC)}" font-family="monospace" font-size="10">c̄ = ${notC}</text>

        <line x1="50" y1="110" x2="270" y2="110" stroke="${color(b)}" stroke-width="${width(b)}"/>
        <polyline points="90,175 90,130 270,130" fill="none" stroke="${color(c)}" stroke-width="${width(c)}"/>

        <g transform="translate(270, 35)">
          <path d="M 0 0 L 25 0 C 45 0, 45 40, 25 40 L 0 40 Z" fill="${t1 ? '#065f46' : '#1e293b'}" stroke="${t1 ? '#34d399' : '#475569'}" stroke-width="2"/>
          <text x="18" y="24" text-anchor="middle" fill="#ffffff" font-family="sans-serif" font-size="11" font-weight="bold">ET (&bull;)</text>
          <text x="52" y="-5" text-anchor="middle" fill="#cbd5e1" font-family="monospace" font-size="10">T1 = ${t1}</text>
        </g>

        <g transform="translate(270, 105)">
          <path d="M 0 0 L 25 0 C 45 0, 45 40, 25 40 L 0 40 Z" fill="${t2 ? '#065f46' : '#1e293b'}" stroke="${t2 ? '#34d399' : '#475569'}" stroke-width="2"/>
          <text x="18" y="24" text-anchor="middle" fill="#ffffff" font-family="sans-serif" font-size="11" font-weight="bold">ET (&bull;)</text>
          <text x="52" y="50" text-anchor="middle" fill="#cbd5e1" font-family="monospace" font-size="10">T2 = ${t2}</text>
        </g>

        <polyline points="310,55 410,55 410,85 430,85" fill="none" stroke="${color(t1)}" stroke-width="${width(t1)}"/>
        <polyline points="310,125 410,125 410,105 430,105" fill="none" stroke="${color(t2)}" stroke-width="${width(t2)}"/>

        <g transform="translate(430, 75)">
          <path d="M 0 0 C 15 0, 30 10, 45 22 C 30 34, 15 44, 0 44 C 10 30, 10 14, 0 0 Z" fill="${L ? '#065f46' : '#1e293b'}" stroke="${L ? '#34d399' : '#475569'}" stroke-width="2"/>
          <text x="20" y="26" text-anchor="middle" fill="#ffffff" font-family="sans-serif" font-size="11" font-weight="bold">OU (+)</text>
        </g>

        <line x1="475" y1="97" x2="540" y2="97" stroke="${color(L)}" stroke-width="${width(L)}"/>

        <g transform="translate(540, 72)">
          <circle cx="25" cy="25" r="22" fill="${L ? '#f59e0b' : '#334155'}" stroke="${L ? '#fbbf24' : '#64748b'}" stroke-width="3"/>
          <text x="25" y="32" text-anchor="middle" fill="${L ? '#000000' : '#94a3b8'}" font-family="sans-serif" font-size="20">${L ? '💡' : '🔴'}</text>
          <text x="25" y="62" text-anchor="middle" fill="${L ? '#fbbf24' : '#94a3b8'}" font-family="monospace" font-size="12" font-weight="bold">L = ${L}</text>
        </g>
      </svg>
    `;

    ex11SvgContainer.innerHTML = svgContent;
  };

  if (gateA || gateB || gateC) {
    [gateA, gateB, gateC].forEach(g => {
      if (g) g.addEventListener('change', updateLogicGates);
    });
    updateLogicGates();
  }

  const oilInput = getEl('oil-litres');
  const botVolInput = getEl('oil-bot-vol');
  const boxSizeInput = getEl('oil-box-size');
  const truckCapInput = getEl('oil-truck-cap');
  const btnCalcOil = getEl('btn-calc-oil');
  const ex12SvgContainer = getEl('ex12-svg-container');
  const oilOut = getEl('oil-out');

  const processOilLogistics = () => {
    const q = Math.max(0.1, parseFloat(oilInput?.value) || 1000);
    const vol = Math.max(0.01, parseFloat(botVolInput?.value) || 1);
    const boxSize = Math.max(1, parseInt(boxSizeInput?.value) || 12);
    const truckCap = Math.max(1, parseInt(truckCapInput?.value) || 30);

    const totalBouteilles = Math.floor(q / vol);
    const resteHuile = Math.round((q - totalBouteilles * vol) * 100) / 100;

    const caisses = Math.floor(totalBouteilles / boxSize);
    const resteBouteillesHorsCaisse = totalBouteilles % boxSize;

    const voyages = Math.ceil(caisses / truckCap);
    const resteCaissesDernierVoyage = caisses > 0 ? (caisses % truckCap === 0 ? truckCap : caisses % truckCap) : 0;

    renderOilSvg(q, vol, boxSize, truckCap, totalBouteilles, resteHuile, caisses, resteBouteillesHorsCaisse, voyages, resteCaissesDernierVoyage);

    if (oilOut) {
      oilOut.innerHTML = `
        <div class="alert alert-warning border-start border-warning border-4 mb-0 py-2 px-3 small text-dark">
          <strong>Résultats détaillés du conditionnement et transport :</strong><br>
          • <strong>Nombre de bouteilles remplies (${vol}L/bouteille) :</strong> <code>${q} / ${vol}</code> = <strong class="text-primary fs-6">${totalBouteilles} bouteille(s)</strong> ${resteHuile > 0 ? `<span class="text-secondary">(reste ${resteHuile} L dans la citerne)</span>` : ''}<br>
          • <strong>Nombre de caisses complètes (${boxSize} bouteilles/caisse) :</strong> <code>${totalBouteilles} // ${boxSize}</code> = <strong class="text-success fs-6">${caisses} caisses</strong><br>
          • <strong>Bouteilles non emballées en caisse :</strong> <code>${totalBouteilles} % ${boxSize}</code> = <strong>${resteBouteillesHorsCaisse} bouteille(s)</strong><br>
          • <strong>Voyages de camion (capacité max ${truckCap} caisses) :</strong> <code>ceil(${caisses} / ${truckCap})</code> = <strong class="text-danger fs-6">${voyages} voyage(s)</strong><br>
          <span class="text-muted small">&rarr; ${voyages > 1 ? `(${voyages - 1} voyage(s) complets de ${truckCap} caisses + 1 voyage final de ${resteCaissesDernierVoyage} caisses)` : caisses > 0 ? `(1 voyage de ${caisses} caisses)` : '(0 voyage)'}</span>
        </div>`;
    }
  };

  const renderOilSvg = (q, vol, boxSize, truckCap, totalBouteilles, resteHuile, caisses, resteBouteilles, voyages, dernierVoyageCaisses) => {
    if (!ex12SvgContainer) return;

    const maxCap = Math.max(2000, Math.ceil(q / 500) * 500);
    const ratio = Math.min(1, Math.max(0, q / maxCap));
    const liquidH = Math.round(ratio * 105);
    const liquidY = 160 - liquidH;

    const svgContent = `
      <svg viewBox="0 0 650 230" class="w-100" style="max-height: 240px;">
        <defs>
          <linearGradient id="tank-metal-3d" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stop-color="#0f172a"/>
            <stop offset="25%" stop-color="#334155"/>
            <stop offset="50%" stop-color="#94a3b8"/>
            <stop offset="75%" stop-color="#475569"/>
            <stop offset="100%" stop-color="#1e293b"/>
          </linearGradient>

          <linearGradient id="glass-body" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stop-color="#38bdf8" stop-opacity="0.3"/>
            <stop offset="30%" stop-color="#ffffff" stop-opacity="0.1"/>
            <stop offset="70%" stop-color="#0284c7" stop-opacity="0.2"/>
            <stop offset="100%" stop-color="#0f172a" stop-opacity="0.4"/>
          </linearGradient>

          <linearGradient id="oil-liquid-3d" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stop-color="#78350f"/>
            <stop offset="30%" stop-color="#ca8a04"/>
            <stop offset="70%" stop-color="#eab308"/>
            <stop offset="100%" stop-color="#a16207"/>
          </linearGradient>

          <radialGradient id="oil-surface-3d" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stop-color="#fef08a"/>
            <stop offset="60%" stop-color="#eab308"/>
            <stop offset="100%" stop-color="#ca8a04"/>
          </radialGradient>

          <marker id="ex12-arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto">
            <path d="M 0 1.5 L 10 5 L 0 8.5 z" fill="#f59e0b"/>
          </marker>
        </defs>

        <g transform="translate(15, 10)">
          <rect x="95" y="0" width="10" height="35" fill="#475569" stroke="#94a3b8" stroke-width="1"/>
          ${q > 0 ? `<rect x="98" y="25" width="4" height="${Math.max(10, liquidY - 20)}" fill="#fef08a" opacity="0.85"/>` : ''}

          <ellipse cx="100" cy="165" rx="64" ry="16" fill="#000000" opacity="0.6"/>
          <ellipse cx="100" cy="160" rx="58" ry="15" fill="#0f172a"/>
          <rect x="42" y="45" width="116" height="115" fill="#0f172a"/>

          ${liquidH > 0 ? `
            <rect x="43" y="${liquidY}" width="114" height="${liquidH}" fill="url(#oil-liquid-3d)"/>
            <ellipse cx="100" cy="160" rx="57" ry="14" fill="#78350f"/>
            <ellipse cx="100" cy="${liquidY}" rx="57" ry="14" fill="url(#oil-surface-3d)" stroke="#fef08a" stroke-width="1"/>
          ` : ''}

          <rect x="40" y="45" width="120" height="115" fill="url(#glass-body)" stroke="#64748b" stroke-width="2"/>
          <line x1="40" y1="80" x2="160" y2="80" stroke="#94a3b8" stroke-width="1.5" stroke-dasharray="3,2" opacity="0.5"/>
          <line x1="40" y1="120" x2="160" y2="120" stroke="#94a3b8" stroke-width="1.5" stroke-dasharray="3,2" opacity="0.5"/>

          <ellipse cx="100" cy="45" rx="60" ry="16" fill="url(#tank-metal-3d)" stroke="#94a3b8" stroke-width="2"/>

          <line x1="32" y1="160" x2="40" y2="160" stroke="#e2e8f0" stroke-width="1.5"/>
          <text x="28" y="163" text-anchor="end" fill="#94a3b8" font-family="monospace" font-size="9">0L</text>

          <line x1="32" y1="107" x2="40" y2="107" stroke="#e2e8f0" stroke-width="1.5"/>
          <text x="28" y="110" text-anchor="end" fill="#94a3b8" font-family="monospace" font-size="9">${Math.round(maxCap / 2)}L</text>

          <line x1="32" y1="55" x2="40" y2="55" stroke="#e2e8f0" stroke-width="1.5"/>
          <text x="28" y="58" text-anchor="end" fill="#94a3b8" font-family="monospace" font-size="9">${maxCap}L</text>

          <rect x="55" y="182" width="90" height="20" rx="4" fill="#1e293b" stroke="#eab308" stroke-width="1"/>
          <text x="100" y="196" text-anchor="middle" fill="#fef08a" font-family="monospace" font-size="12" font-weight="bold">${q} Litres</text>
        </g>

        <line x1="190" y1="110" x2="235" y2="110" stroke="#f59e0b" stroke-width="3" marker-end="url(#ex12-arrow)"/>

        <g transform="translate(240, 55)">
          <rect x="0" y="0" width="170" height="110" rx="12" fill="#0f172a" stroke="#f59e0b" stroke-width="2"/>
          <text x="85" y="24" text-anchor="middle" fill="#fbbf24" font-family="sans-serif" font-size="12" font-weight="bold">📦 Conditionnement</text>
          
          <rect x="15" y="38" width="140" height="45" rx="8" fill="#78350f" stroke="#f59e0b" stroke-width="1.5"/>
          <text x="85" y="60" text-anchor="middle" fill="#ffffff" font-family="monospace" font-size="18" font-weight="bold">${caisses} Caisses</text>
          <text x="85" y="76" text-anchor="middle" fill="#fef08a" font-family="sans-serif" font-size="10">(${boxSize} bout./caisse)</text>

          <text x="85" y="98" text-anchor="middle" fill="#fca5a5" font-family="monospace" font-size="10">+ ${resteBouteilles} bout. hors caisse</text>
        </g>

        <line x1="415" y1="110" x2="465" y2="110" stroke="#f59e0b" stroke-width="3" marker-end="url(#ex12-arrow)"/>

        <g transform="translate(470, 55)">
          <rect x="0" y="0" width="160" height="110" rx="12" fill="#064e3b" stroke="#34d399" stroke-width="2.5"/>
          <text x="80" y="24" text-anchor="middle" fill="#a7f3d0" font-family="sans-serif" font-size="12" font-weight="bold">🚛 Transport Camion</text>
          
          <text x="80" y="65" text-anchor="middle" fill="#ffffff" font-family="monospace" font-size="24" font-weight="bold">${voyages} Voyage${voyages > 1 ? 's' : ''}</text>
          <text x="80" y="92" text-anchor="middle" fill="#34d399" font-family="sans-serif" font-size="10">Capacité: ${truckCap} caisses</text>
          <text x="80" y="104" text-anchor="middle" fill="#94a3b8" font-family="monospace" font-size="9">Dernier: ${dernierVoyageCaisses} caisses</text>
        </g>
      </svg>
    `;

    ex12SvgContainer.innerHTML = svgContent;
  };

  if (oilInput && btnCalcOil) {
    btnCalcOil.addEventListener('click', processOilLogistics);
    [oilInput, botVolInput, boxSizeInput, truckCapInput].forEach(inp => {
      if (inp) inp.addEventListener('input', processOilLogistics);
    });
    processOilLogistics();
  }

  const btnCheckEx13 = getEl('btn-check-ex13');
  const btnShowEx13 = getEl('btn-show-ex13');
  const ex13Score = getEl('ex13-score');
  const btnEvalCh = getEl('btn-eval-ch-func');
  const ex13SvgContainer = getEl('ex13-svg-container');

  function renderEx13StringSVG(highlightIndices = [], deleteIndices = []) {
    if (!ex13SvgContainer) return;
    const str = "programme 2025";
    const charW = 38;
    const gap = 4;
    const totalW = str.length * (charW + gap) - gap;
    const startX = Math.round((660 - totalW) / 2);

    let charBoxes = '';
    for (let i = 0; i < str.length; i++) {
      const isSelected = highlightIndices.includes(i);
      const isDeleted = deleteIndices.includes(i);
      const x = startX + i * (charW + gap);
      const charDisp = str[i] === ' ' ? '␣' : str[i];

      const indexBg = isSelected ? '#d97706' : isDeleted ? '#b91c1c' : '#334155';
      const indexColor = isSelected || isDeleted ? '#ffffff' : '#94a3b8';
      const charBg = isSelected ? '#fbbf24' : isDeleted ? '#7f1d1d' : '#1e293b';
      const charStroke = isSelected ? '#f59e0b' : isDeleted ? '#ef4444' : '#475569';
      const charColor = isSelected ? '#000000' : isDeleted ? '#fca5a5' : '#ffffff';

      charBoxes += `
        <g transform="translate(${x}, 10)">
          <rect x="0" y="0" width="${charW}" height="18" rx="3" fill="${indexBg}"/>
          <text x="${charW / 2}" y="13" text-anchor="middle" fill="${indexColor}" font-family="monospace" font-size="11" font-weight="bold">${i}</text>

          <rect x="0" y="22" width="${charW}" height="36" rx="5" fill="${charBg}" stroke="${charStroke}" stroke-width="${isSelected || isDeleted ? '2' : '1'}"/>
          <text x="${charW / 2}" y="46" text-anchor="middle" fill="${charColor}" font-family="monospace" font-size="17" font-weight="bold">${charDisp}</text>
        </g>
      `;
    }

    ex13SvgContainer.innerHTML = `
      <svg viewBox="0 0 660 80" class="w-100" style="max-height: 90px;">
        ${charBoxes}
      </svg>
    `;
  }

  renderEx13StringSVG();

  const ex13RowHighlights = {
    0: { highlight: [] },
    1: { highlight: [0, 3, 5, 8] },
    2: { highlight: [3, 4, 5, 6, 7, 8, 9] },
    3: { delete: [3, 4, 5, 6, 7, 8, 9] },
    4: { highlight: [] },
    5: { highlight: [] },
    6: { highlight: [] },
    7: { highlight: [10, 11, 12, 13] },
    8: { highlight: [2] }
  };

  const ex13TableRows = document.querySelectorAll('#ex13-table tbody tr');
  ex13TableRows.forEach((row, idx) => {
    row.addEventListener('mouseenter', () => {
      const cfg = ex13RowHighlights[idx] || {};
      renderEx13StringSVG(cfg.highlight || [], cfg.delete || []);
    });
    row.addEventListener('mouseleave', () => {
      renderEx13StringSVG();
    });
  });

  const ex13AsciiInfoEl = getEl('ex13-ascii-info');
  let currentK = 10;
  let currentEVal = 'K';

  function renderEx13AsciiInfo(k) {
    if (!ex13AsciiInfoEl) return;
    const code = 65 + k;
    const targetChar = String.fromCharCode(code);

    let stripHtml = '';
    const minCode = Math.max(0, code - 3);
    const maxCode = Math.min(255, code + 3);

    for (let c = minCode; c <= maxCode; c++) {
      const isTarget = c === code;
      const char = String.fromCharCode(c);
      stripHtml += `
        <div class="text-center p-2 rounded ${isTarget ? 'bg-warning text-dark border border-warning shadow' : 'bg-dark text-white border border-secondary'}" style="min-width: 58px;">
          <div class="small ${isTarget ? 'fw-bold opacity-75' : 'text-muted'}">${c}</div>
          <div class="${isTarget ? 'fs-3 fw-bold' : 'fs-5 text-info'}">'${char}'</div>
        </div>
      `;
    }

    ex13AsciiInfoEl.innerHTML = `
      <div class="alert alert-dark border-info shadow-sm p-3 mb-0">
        <div class="d-flex flex-wrap align-items-center justify-content-between gap-2 mb-2">
          <div>
            <span class="fs-5 me-1">🎲</span> 
            <strong>Évaluation de <code>e &larr; chr(65 + alea(0, 25))</code> :</strong>
          </div>
          <div class="font-monospace fs-6">
            <span class="badge bg-secondary">alea(0, 25) = <strong>${k}</strong></span>
            &rarr;
            <span class="badge bg-primary">65 + ${k} = <strong>${code}</strong></span>
            &rarr;
            <span class="badge bg-warning text-dark">chr(${code}) = <strong>'${targetChar}'</strong></span>
          </div>
        </div>
        <div class="small text-secondary mb-2 fw-semibold">Codes & Caractères ASCII dans l'intervalle <code>[65 + alea(0, 25) &plusmn; 3]</code> (${minCode} à ${maxCode}) :</div>
        <div class="d-flex flex-wrap justify-content-center gap-2 font-monospace">
          ${stripHtml}
        </div>
      </div>
    `;
  }

  const rollRandomE = () => {
    currentK = Math.floor(Math.random() * 26);
    currentEVal = String.fromCharCode(65 + currentK);
    const rows = document.querySelectorAll('#ex13-table tbody tr');
    if (rows && rows[4]) {
      rows[4].dataset.res = `'${currentEVal}'`;
    }
    renderEx13AsciiInfo(currentK);
  };

  renderEx13AsciiInfo(currentK);

  if (btnEvalCh) {
    btnEvalCh.addEventListener('click', rollRandomE);
  }

  function isTypeMatch(userVal, expType) {
    if (!userVal) return false;
    const uRaw = normAnswer(userVal);
    const u = uRaw.normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z]/g, '');

    if (expType === 'Caractère') return ['caractere', 'char'].includes(u);
    if (expType === 'Chaîne') return ['chaine', 'str', 'string'].includes(u);
    if (expType === 'Entier') return ['entier', 'int', 'integer'].includes(u);
    if (expType === 'Booleen') return ['booleen', 'bool', 'boolean'].includes(u);
    return isCorrectAns(userVal, expType);
  }

  function isResMatch(userVal, expRes, isRowE = false) {
    if (!userVal) return false;
    const uTrim = userVal.trim();

    if (isRowE) {
      const uBare = uTrim.replace(/^['"]|['"]$/g, '').toUpperCase();
      if (uBare.length === 1 && uBare >= 'A' && uBare <= 'Z') return true;
    }

    if (isCorrectAns(userVal, expRes)) return true;

    const uBare = uTrim.replace(/^['"]|['"]$/g, '');
    const eBare = String(expRes).trim().replace(/^['"]|['"]$/g, '');

    return normAnswer(uBare) === normAnswer(eBare);
  }

  function checkExercise13(reveal = false) {
    const rows = document.querySelectorAll('#ex13-table tbody tr');
    let correct = 0, total = rows.length;

    rows.forEach((row, idx) => {
      const expType = row.dataset.type || '';
      const expRes = row.dataset.res || '';

      const inpType = row.querySelector('.ex13-type');
      const inpRes = row.querySelector('.ex13-res');
      const status = row.querySelector('.ex13-status');

      if (reveal) {
        if (inpType) { inpType.value = expType; inpType.classList.add('bg-success-subtle', 'text-dark'); }
        if (inpRes) { inpRes.value = expRes; inpRes.classList.add('bg-success-subtle', 'text-dark'); }
        if (status) status.textContent = '✅';
        correct++;
        return;
      }

      const okType = !inpType || isTypeMatch(inpType.value, expType);
      const okRes = !inpRes || isResMatch(inpRes.value, expRes, idx === 4);
      const allOk = okType && okRes;

      [inpType, inpRes].forEach(inp => {
        if (!inp) return;
        inp.classList.remove('is-valid', 'is-invalid', 'bg-success-subtle', 'text-dark');
      });

      if (inpType) inpType.classList.add(okType ? 'is-valid' : 'is-invalid');
      if (inpRes) inpRes.classList.add(okRes ? 'is-valid' : 'is-invalid');

      if (status) status.textContent = allOk ? '✅' : '❌';
      if (allOk) correct++;
    });

    if (!reveal && ex13Score) {
      const pct = Math.round((correct / total) * 100);
      ex13Score.innerHTML = `
        <div class="alert alert-${pct >= 70 ? 'success' : pct >= 50 ? 'warning' : 'danger'} d-flex align-items-center gap-3 mb-0">
          <span class="fs-4">📊</span>
          <div>
            <strong>Score : ${correct} / ${total} (${pct}%)</strong><br>
            <small>${pct === 100 ? '🎉 Parfait ! Toutes les réponses sont correctes.' : 'Vérifiez les cellules en rouge et réessayez.'}</small>
          </div>
        </div>`;
    }
  }

  if (btnCheckEx13) btnCheckEx13.addEventListener('click', () => checkExercise13(false));
  if (btnShowEx13) btnShowEx13.addEventListener('click', () => checkExercise13(true));

  const pseudoNpInput = getEl('pseudo-np');
  const btnGenPseudo = getEl('btn-gen-pseudo');
  const pseudoStepsEl = getEl('pseudo-steps');
  const pseudoOutEl = getEl('pseudo-out');

  let currentRand2 = 31;

  function processPseudoGen() {
    const np = (pseudoNpInput?.value || '').trim();

    if (!np) {
      if (pseudoOutEl) pseudoOutEl.innerHTML = `<div class="alert alert-warning mb-0">⚠️ Veuillez saisir le Nom & Prénom.</div>`;
      return;
    }

    const spaceIdx = np.indexOf(' ');
    let prenom = '', nom = '';
    if (spaceIdx !== -1) {
      prenom = np.substring(0, spaceIdx).trim();
      nom = np.substring(spaceIdx + 1).trim();
    } else {
      prenom = np;
      nom = np;
    }

    const p1Letters = prenom.substring(0, 3).toUpperCase();
    const p1 = p1Letters + prenom.length;

    const nom3 = nom.length >= 3 ? nom.substring(nom.length - 3) : nom;
    const p2Letters = nom3.toUpperCase();
    const p2 = p2Letters + nom.length;

    currentRand2 = Math.floor(10 + Math.random() * 90);
    const p3 = String(currentRand2);

    const pseudoFinal = `${p1}_${p2}_${p3}`;

    if (pseudoStepsEl) {
      pseudoStepsEl.innerHTML = `
        <div class="row g-3 text-center align-items-center font-monospace">
          <div class="col-md-3">
            <div class="small text-secondary mb-1">Partie 1 (Prénom)</div>
            <div class="badge bg-primary fs-5 p-2 w-100">${p1}</div>
            <div class="small text-muted mt-1">"${p1Letters}" + long("${prenom}")=${prenom.length}</div>
          </div>
          <div class="col-md-3">
            <div class="small text-secondary mb-1">Partie 2 (Nom)</div>
            <div class="badge bg-primary fs-5 p-2 w-100">${p2}</div>
            <div class="small text-muted mt-1">"${p2Letters}" + long("${nom}")=${nom.length}</div>
          </div>
          <div class="col-md-3">
            <div class="small text-secondary mb-1">Partie 3 (Aléatoire)</div>
            <div class="badge bg-warning text-dark fs-5 p-2 w-100">${p3}</div>
            <div class="small text-muted mt-1">alea(10, 99)</div>
          </div>
          <div class="col-md-3">
            <div class="small text-secondary mb-1">Pseudonyme Proposé</div>
            <div class="badge bg-success text-white fs-5 p-2 w-100 fw-bold">${pseudoFinal}</div>
            <div class="small text-muted mt-1">p1 + "_" + p2 + "_" + p3</div>
          </div>
        </div>
      `;
    }

    if (pseudoOutEl) {
      pseudoOutEl.innerHTML = `
        <div class="alert alert-success d-flex align-items-center justify-content-between gap-3 mb-0 shadow-sm">
          <div class="d-flex align-items-center gap-2">
            <span class="fs-4">🎉</span>
            <div>
              <strong>Pseudonyme automatisé proposé :</strong><br>
              <span class="font-monospace fs-4 text-success fw-bold">"${pseudoFinal}"</span>
            </div>
          </div>
          <span class="badge bg-dark text-warning font-monospace fs-6 px-3 py-2 border border-warning">${p1}_${p2}_${p3}</span>
        </div>
      `;
    }
  }

  if (btnGenPseudo) {
    btnGenPseudo.addEventListener('click', processPseudoGen);
    if (pseudoNpInput) pseudoNpInput.addEventListener('input', processPseudoGen);
    processPseudoGen();
  }

  const btnCheckEx14 = getEl('btn-check-ex14');
  const btnShowEx14 = getEl('btn-show-ex14');
  const ex14Score = getEl('ex14-score');

  function checkExercise14(reveal = false) {
    const rows = document.querySelectorAll('#ex14-table tbody tr');
    let correct = 0, total = rows.length;

    rows.forEach(row => {
      const expP1 = row.dataset.p1 || '';
      const expP2 = row.dataset.p2 || '';
      const expPrefix = row.dataset.pseudoPrefix || (expP1 + '_' + expP2);

      const inpP1 = row.querySelector('.ex14-p1');
      const inpP2 = row.querySelector('.ex14-p2');
      const inpPseudo = row.querySelector('.ex14-pseudo');
      const status = row.querySelector('.ex14-status');

      if (reveal) {
        if (inpP1) { inpP1.value = expP1; inpP1.classList.add('bg-success-subtle'); }
        if (inpP2) { inpP2.value = expP2; inpP2.classList.add('bg-success-subtle'); }
        if (inpPseudo) { inpPseudo.value = `${expPrefix}_31`; inpPseudo.classList.add('bg-success-subtle'); }
        if (status) status.textContent = '✅';
        correct++;
        return;
      }

      const okP1 = !inpP1 || isCorrectAns(inpP1.value, expP1);
      const okP2 = !inpP2 || isCorrectAns(inpP2.value, expP2);

      let okPseudo = true;
      if (inpPseudo) {
        const u = normAnswer(inpPseudo.value);
        const p = normAnswer(expPrefix);
        okPseudo = u.startsWith(p) || isCorrectAns(u, expPrefix);
      }

      const allOk = okP1 && okP2 && okPseudo;

      [inpP1, inpP2, inpPseudo].forEach(inp => {
        if (!inp) return;
        inp.classList.remove('is-valid', 'is-invalid', 'bg-success-subtle');
      });

      if (inpP1) inpP1.classList.add(okP1 ? 'is-valid' : 'is-invalid');
      if (inpP2) inpP2.classList.add(okP2 ? 'is-valid' : 'is-invalid');
      if (inpPseudo) inpPseudo.classList.add(okPseudo ? 'is-valid' : 'is-invalid');

      if (status) status.textContent = allOk ? '✅' : '❌';
      if (allOk) correct++;
    });

    if (!reveal && ex14Score) {
      const pct = Math.round((correct / total) * 100);
      ex14Score.innerHTML = `
        <div class="alert alert-${pct >= 70 ? 'success' : pct >= 50 ? 'warning' : 'danger'} d-flex align-items-center gap-3 mb-0">
          <span class="fs-4">📊</span>
          <div>
            <strong>Score : ${correct} / ${total} (${pct}%)</strong><br>
            <small>${pct === 100 ? '🎉 Parfait ! Toutes les réponses sont correctes.' : 'Vérifiez les cellules en rouge et réessayez.'}</small>
          </div>
        </div>`;
    }
  }

  if (btnCheckEx14) btnCheckEx14.addEventListener('click', () => checkExercise14(false));
  if (btnShowEx14) btnShowEx14.addEventListener('click', () => checkExercise14(true));

});
