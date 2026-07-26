/**
 * Antigravity Interactive Modules Engine - Vanilla JS & Vue.js Edition
 * Enseignant: Mohamed Anis MANI - Cours Informatique 2e Sciences
 */

document.addEventListener('DOMContentLoaded', () => {
  // -------------------------------------------------------------
  // Helper functions for DOM manipulation (jQuery replacements)
  // -------------------------------------------------------------
  const getEl = id => document.getElementById(id);

  // -------------------------------------------------------------
  // 1. QCM Verification Engine
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

  // -------------------------------------------------------------
  // 2. Module 1 Handlers
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

    // Verification Handler: Exercice 3 Analysis Schema
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

    // Verification Handler: Exercice 3 TDO
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

  // -------------------------------------------------------------
  // 3. Module 2 Handlers
  // -------------------------------------------------------------
  document.addEventListener('click', (e) => {
    const wordBtn = e.target.closest('.word-btn');
    if (wordBtn) {
      wordBtn.classList.toggle('active');
      wordBtn.classList.toggle('btn-danger');
      wordBtn.classList.toggle('btn-outline-secondary');
    }

    if (e.target.closest('#btn-check-vars')) {
      let correct = true;
      document.querySelectorAll('.word-btn').forEach(btn => {
        const isInvalid = btn.dataset.valid === 'false';
        const isSelected = btn.classList.contains('active');
        if (isInvalid !== isSelected) correct = false;
      });
      const feedback = getEl('vars-feedback');
      if (feedback) {
        if (correct) {
          feedback.innerHTML = '<div class="alert alert-success">🎉 Excellent ! Vous avez identifié tous les mots réservés et identificateurs invalides.</div>';
        } else {
          feedback.innerHTML = '<div class="alert alert-warning">⚠️ Certains choix sont incorrects. Rappel : Mots réservés Python et identificateurs avec symboles (#, -) sont invalides !</div>';
        }
      }
    }
  });

  const updateModule2Calcs = () => {
    const rx = Math.max(0.1, parseFloat(getEl('rec-x')?.value) || 0);
    const ry = Math.max(0.1, parseFloat(getEl('rec-y')?.value) || 0);
    const recOut = getEl('rec-out');
    if (recOut) recOut.innerHTML = `Périmètre = <strong>${((rx + ry) * 2).toFixed(2)}</strong> | Aire = <strong>${(rx * ry).toFixed(2)}</strong>`;

    // Illustration SVG dynamique réactive du rectangle
    const svgContainer = getEl('rec-svg-preview');
    if (svgContainer) {
      const maxW = 200;
      const maxH = 110;
      const scale = Math.min(maxW / Math.max(rx, ry), maxH / Math.max(rx, ry));
      const drawW = Math.max(35, Math.min(maxW, rx * scale));
      const drawH = Math.max(25, Math.min(maxH, ry * scale));
      const startX = Math.round((320 - drawW) / 2);
      const startY = Math.round((160 - drawH) / 2 + 10);

      svgContainer.innerHTML = `<svg viewBox="0 0 340 170" class="w-100" style="max-height: 190px;">
        <defs>
          <marker id="rec-arrow-end" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto">
            <path d="M 0 1.5 L 10 5 L 0 8.5 z" fill="#0284c7"/>
          </marker>
          <marker id="rec-arrow-start" viewBox="0 0 10 10" refX="2" refY="5" markerWidth="6" markerHeight="6" orient="auto">
            <path d="M 10 1.5 L 0 5 L 10 8.5 z" fill="#0284c7"/>
          </marker>
        </defs>

        <!-- Rectangle -->
        <rect x="${startX}" y="${startY}" width="${drawW}" height="${drawH}" rx="5" fill="#e0f2fe" stroke="#0284c7" stroke-width="2.5"/>

        <!-- Cotation Longueur x (Haut avec flèches aux 2 extrémités) -->
        <line x1="${startX}" y1="${startY - 8}" x2="${startX + drawW}" y2="${startY - 8}" stroke="#0284c7" stroke-width="1.5" marker-start="url(#rec-arrow-start)" marker-end="url(#rec-arrow-end)"/>
        <text x="${startX + drawW / 2}" y="${startY - 13}" text-anchor="middle" font-family="sans-serif" font-size="12" font-weight="bold" fill="#0369a1">Longueur x = ${rx}</text>

        <!-- Cotation Largeur y (Gauche avec flèches aux 2 extrémités) -->
        <line x1="${startX - 8}" y1="${startY}" x2="${startX - 8}" y2="${startY + drawH}" stroke="#0284c7" stroke-width="1.5" marker-start="url(#rec-arrow-start)" marker-end="url(#rec-arrow-end)"/>
        <text x="${startX - 14}" y="${startY + drawH / 2 + 4}" text-anchor="end" font-family="sans-serif" font-size="12" font-weight="bold" fill="#0369a1">Largeur y = ${ry}</text>

        <!-- Texte intérieur Aire -->
        <text x="${startX + drawW / 2}" y="${startY + drawH / 2 + 4}" text-anchor="middle" font-family="sans-serif" font-size="11" font-weight="bold" fill="#0c4a6e">Aire: ${(rx * ry).toFixed(2)}</text>
      </svg>`;
    }

    const ea = Math.max(0.1, parseFloat(getEl('ell-a')?.value) || 0);
    const eb = Math.max(0.1, parseFloat(getEl('ell-b')?.value) || 0);
    const ellOut = getEl('ell-out');
    if (ellOut) ellOut.innerHTML = `Aire = <strong>${(ea * eb * Math.PI).toFixed(2)}</strong>`;

    // Illustration SVG dynamique réactive de l'ellipse
    const ellSvgContainer = getEl('ell-svg-preview');
    if (ellSvgContainer) {
      const cx = 170;
      const cy = 90;
      const maxR = 125;
      const maxRVertical = 65;
      const scale = Math.min(maxR / Math.max(ea, eb), maxRVertical / Math.max(ea, eb));
      const rx = Math.max(25, Math.min(maxR, ea * scale));
      const ry = Math.max(20, Math.min(maxRVertical, eb * scale));

      ellSvgContainer.innerHTML = `<svg viewBox="0 0 340 180" class="w-100" style="max-height: 190px;">
        <defs>
          <marker id="ell-arrow-end" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto">
            <path d="M 0 1.5 L 10 5 L 0 8.5 z" fill="#059669"/>
          </marker>
          <marker id="ell-arrow-start" viewBox="0 0 10 10" refX="2" refY="5" markerWidth="6" markerHeight="6" orient="auto">
            <path d="M 10 1.5 L 0 5 L 10 8.5 z" fill="#059669"/>
          </marker>
        </defs>

        <!-- Ellipse -->
        <ellipse cx="${cx}" cy="${cy}" rx="${rx}" ry="${ry}" fill="#ecfdf5" stroke="#059669" stroke-width="2.5"/>

        <!-- Point Central -->
        <circle cx="${cx}" cy="${cy}" r="3" fill="#047857"/>

        <!-- Demi-grand axe a (Axe horizontal du centre vers le bord droit avec flèches aux 2 extrémités) -->
        <line x1="${cx}" y1="${cy}" x2="${cx + rx}" y2="${cy}" stroke="#059669" stroke-width="2" stroke-dasharray="4,3" marker-start="url(#ell-arrow-start)" marker-end="url(#ell-arrow-end)"/>
        <text x="${cx + rx / 2}" y="${cy + 18}" text-anchor="middle" font-family="sans-serif" font-size="12" font-weight="bold" fill="#047857">a = ${ea}</text>

        <!-- Demi-petit axe b (Axe vertical du centre vers le haut avec flèches aux 2 extrémités) -->
        <line x1="${cx}" y1="${cy}" x2="${cx}" y2="${cy - ry}" stroke="#059669" stroke-width="2" stroke-dasharray="4,3" marker-start="url(#ell-arrow-start)" marker-end="url(#ell-arrow-end)"/>
        <text x="${cx - 14}" y="${cy - ry / 2 + 4}" text-anchor="end" font-family="sans-serif" font-size="12" font-weight="bold" fill="#047857">b = ${eb}</text>

        <!-- Texte Aire au centre -->
        <text x="${cx}" y="${cy - 8}" text-anchor="middle" font-family="sans-serif" font-size="11" font-weight="bold" fill="#065f46">Aire: ${(ea * eb * Math.PI).toFixed(2)}</text>
      </svg>`;
    }

    const ng = parseFloat(getEl('moy-ng')?.value) || 0;
    const ns = parseFloat(getEl('moy-ns')?.value) || 0;
    const moyOut = getEl('moy-out');
    if (moyOut) moyOut.innerHTML = `Moyenne (Moy) = <strong>${((ng + ns) / 2).toFixed(2)}</strong> / 20`;

    const rm = Math.max(0.01, parseFloat(getEl('res-m')?.value) || 0);
    const rx2 = Math.max(0.001, parseFloat(getEl('res-x')?.value) || 0);
    const k = rx2 > 0 ? (rm * 10) / rx2 : 0;
    const resOut = getEl('res-out');
    if (resOut) resOut.innerHTML = `Raideur k = <strong>${k.toFixed(2)} N/m</strong>`;

    // Illustration SVG dynamique réactive du Ressort
    const resSvgContainer = getEl('res-svg-preview');
    if (resSvgContainer) {
      const topY = 25;
      const restLen = 45;
      // Allongement x visual scaling: map x [0.001..0.2] px
      const stretchPx = Math.min(85, Math.max(15, rx2 * 450));
      const springBottomY = topY + restLen + stretchPx;

      // Spires du ressort (8 spires)
      const numCoils = 8;
      const springSegmentH = (restLen + stretchPx) / numCoils;
      let pathD = `M 150,${topY}`;
      for (let i = 0; i < numCoils; i++) {
        const y1 = topY + i * springSegmentH + springSegmentH * 0.25;
        const y2 = topY + i * springSegmentH + springSegmentH * 0.75;
        const yEnd = topY + (i + 1) * springSegmentH;
        pathD += ` L 135,${y1} L 165,${y2} L 150,${yEnd}`;
      }

      const massBoxH = 45;
      const massBoxW = Math.min(85, Math.max(50, rm * 40 + 35));
      const massBoxY = springBottomY;
      const massBoxX = 150 - massBoxW / 2;

      // Force du poids P = m * g
      const weightVectorLen = Math.min(45, Math.max(20, rm * 25));

      const totalSvgH = Math.round(massBoxY + massBoxH + weightVectorLen + 20);

      resSvgContainer.innerHTML = `<svg viewBox="0 0 340 ${totalSvgH}" class="w-100" style="max-height: ${totalSvgH}px;">
        <defs>
          <marker id="res-arrow-red" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto">
            <path d="M 0 1.5 L 10 5 L 0 8.5 z" fill="#ef4444"/>
          </marker>
          <marker id="res-arrow-dim-start" viewBox="0 0 10 10" refX="2" refY="5" markerWidth="5" markerHeight="5" orient="auto">
            <path d="M 10 1.5 L 0 5 L 10 8.5 z" fill="#dc2626"/>
          </marker>
          <marker id="res-arrow-dim-end" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="5" markerHeight="5" orient="auto">
            <path d="M 0 1.5 L 10 5 L 0 8.5 z" fill="#dc2626"/>
          </marker>
        </defs>

        <!-- Support / Plafond fixe -->
        <rect x="80" y="8" width="140" height="8" fill="#475569" rx="2"/>
        <line x1="80" y1="16" x2="220" y2="16" stroke="#1e293b" stroke-width="2"/>
        <!-- Crochet de suspension -->
        <line x1="150" y1="16" x2="150" y2="${topY}" stroke="#334155" stroke-width="3"/>

        <!-- Spire Hélicoïdale du Ressort -->
        <path d="${pathD}" fill="none" stroke="#0284c7" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>

        <!-- Masse m suspendue -->
        <rect x="${massBoxX}" y="${massBoxY}" width="${massBoxW}" height="${massBoxH}" rx="6" fill="#fef2f2" stroke="#dc2626" stroke-width="2.5"/>
        <text x="150" y="${massBoxY + 18}" text-anchor="middle" font-family="sans-serif" font-size="12" font-weight="bold" fill="#991b1b">m = ${rm} kg</text>
        <text x="150" y="${massBoxY + 34}" text-anchor="middle" font-family="sans-serif" font-size="11" font-weight="bold" fill="#b91c1c">k = ${k.toFixed(1)} N/m</text>

        <!-- Vecteur Poids P = m * g -->
        <line x1="150" y1="${massBoxY + massBoxH}" x2="150" y2="${massBoxY + massBoxH + weightVectorLen}" stroke="#ef4444" stroke-width="2.5" marker-end="url(#res-arrow-red)"/>
        <text x="165" y="${massBoxY + massBoxH + weightVectorLen - 5}" font-family="sans-serif" font-size="11" font-weight="bold" fill="#dc2626">P = ${(rm * 10).toFixed(1)} N</text>

        <!-- Ligne de cotation de l'allongement x (avec flèches aux 2 extrémités) -->
        <line x1="220" y1="${topY + restLen}" x2="220" y2="${springBottomY}" stroke="#dc2626" stroke-width="1.5" stroke-dasharray="4,3" marker-start="url(#res-arrow-dim-start)" marker-end="url(#res-arrow-dim-end)"/>
        <text x="228" y="${(topY + restLen + springBottomY) / 2 + 4}" font-family="sans-serif" font-size="12" font-weight="bold" fill="#dc2626">x = ${rx2} m</text>
        <line x1="165" y1="${topY + restLen}" x2="230" y2="${topY + restLen}" stroke="#94a3b8" stroke-width="1" stroke-dasharray="3,3"/>
      </svg>`;
    }
  };
  document.addEventListener('input', (e) => {
    if (['rec-x', 'rec-y', 'ell-a', 'ell-b', 'moy-ng', 'moy-ns', 'res-m', 'res-x'].includes(e.target.id)) {
      updateModule2Calcs();
    }
  });
  updateModule2Calcs();

  // -------------------------------------------------------------
  // 4. Module 3 Handlers
  // -------------------------------------------------------------
  document.addEventListener('click', (e) => {
    if (e.target.closest('#btn-eval-expr')) {
      const expr = getEl('ex2-expr')?.value || '';
      const out = getEl('ex2-out');
      if (out) {
        try {
          const res = eval(expr);
          out.innerHTML = `<div class="alert alert-success">Résultat de <code>${expr}</code> = <strong>${res}</strong> (Type: ${typeof res})</div>`;
        } catch (err) {
          out.innerHTML = `<div class="alert alert-danger">Erreur d'évaluation : ${err.message}</div>`;
        }
      }
    }

    if (e.target.closest('#btn-eval-concat')) {
      const ch1 = "python", ch2 = "javascript", ch3 = "uml", ch4 = "perl";
      const res1 = ch1[0];
      const res2 = ch2.toUpperCase();
      const res3 = ch1[0] + ch3[0] + ch2[5] + ch4[1];
      const out = getEl('concat-out');
      if (out) {
        out.innerHTML = `
          <div class="alert alert-secondary font-monospace">
            print(ch1[0]) ➔ <strong>"${res1}"</strong><br>
            print(ch2.upper()) ➔ <strong>"${res2}"</strong><br>
            print(ch1[0] + ch3[0] + ch2[5] + ch4[1]) ➔ <strong>"${res3}"</strong>
          </div>
        `;
      }
    }

    if (e.target.closest('#btn-eval-manip')) {
      const out = getEl('manip-out');
      if (out) {
        out.innerHTML = `
          <div class="alert alert-info font-monospace">
            A = long("Algorithmique") = <strong>13</strong><br>
            B = long("Python") = <strong>6</strong><br>
            C = ConvCh(13) + ConvCh(6) = <strong>"136"</strong><br>
            E = D - float(C) = <strong>-73.0</strong>
          </div>
        `;
      }
    }

    if (e.target.closest('#btn-permute')) {
      const a = parseInt(getEl('perm-a')?.value) || 0;
      const out = getEl('perm-out');
      if (out) {
        out.classList.remove('d-none');
        if (a >= 10 && a <= 99) {
          const str = String(a);
          const b = parseInt(str[1] + str[0]);
          out.innerHTML = `Nombre saisi : <strong>${a}</strong> ➔ Permuté b = <strong>${b}</strong>`;
        } else {
          out.innerHTML = '<span class="text-danger">Veuillez saisir un entier à 2 chiffres.</span>';
        }
      }
    }

    if (e.target.closest('#btn-calc-bat')) {
      const nib = parseFloat(getEl('bat-nib')?.value) || 0;
      const ikd = parseFloat(getEl('bat-ikd')?.value) || 0;
      const nfb = parseFloat(getEl('bat-nfb')?.value) || 0;
      const ikf = parseFloat(getEl('bat-ikf')?.value) || 0;
      const dist = ikf - ikd;
      const pct = nib - nfb;
      const dm = pct > 0 ? Math.round((dist / pct) * 100) : 0;
      const out = getEl('bat-out');
      if (out) {
        out.classList.remove('d-none');
        out.innerHTML = `Distance parcourue : ${dist} km (${pct}% consommé)<br>Autonomie totale estimée : <strong>${dm} km</strong>`;
      }
    }

    if (e.target.closest('#btn-calc-oil')) {
      const n = parseFloat(getEl('oil-litres')?.value) || 0;
      const bouteilles = Math.ceil(n);
      const caisses = Math.ceil(bouteilles / 12);
      const voyages = Math.ceil(caisses / 30);
      const out = getEl('oil-out');
      if (out) {
        out.classList.remove('d-none');
        out.innerHTML = `Quantité : ${n} L ➔ <strong>${bouteilles} bouteilles</strong>, <strong>${caisses} caisses</strong>, <strong>${voyages} voyage(s)</strong> nécessaire(s)`;
      }
    }

    if (e.target.closest('#btn-eval-ch-func')) {
      const out = getEl('ch-func-out');
      if (out) {
        out.innerHTML = `
          <div class="alert alert-secondary font-monospace">
            a = chr(ent(100.5)) ➔ <strong>"d"</strong> (ASCII 100)<br>
            b = majus("p") + "r" + "g" + "m" ➔ <strong>"PRGM"</strong><br>
            c = sous_chaine("programme 2025", 3, 9) ➔ <strong>"gramme"</strong>
          </div>
        `;
      }
    }
  });

  // -------------------------------------------------------------
  // 5. Module 4 Handlers
  // -------------------------------------------------------------
  document.addEventListener('click', (e) => {
    if (e.target.closest('#btn-show-qcm3')) {
      const out = getEl('qcm3-out');
      if (out) {
        out.innerHTML = `
          <div class="alert alert-secondary">
            1. Compris entre 0 et 1 : <code>0 <= a <= 1</code><br>
            2. Composé de deux chiffres : <code>10 <= a < 100</code><br>
            3. Divisible par 3 et 5 : <code>a mod 15 = 0</code><br>
            4. Divisible par 3 ou 5 : <code>a mod 3 = 0 ou a mod 5 = 0</code>
          </div>
        `;
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

    if (e.target.closest('#btn-check-char')) {
      const c = getEl('char-val')?.value || '';
      if (!c) return;
      const code = c.charCodeAt(0);
      let type = 'Symbole';
      if (code >= 65 && code <= 90) type = 'Lettre Majuscule';
      else if (code >= 97 && code <= 122) type = 'Lettre Minuscule';
      else if (code >= 48 && code <= 57) type = 'Chiffre';
      const out = getEl('char-out');
      if (out) {
        out.classList.remove('d-none');
        out.innerHTML = `Le caractère '${c}' (ASCII ${code}) est de type : <strong>${type}</strong>`;
      }
    }

    if (e.target.closest('#btn-do-calc')) {
      const a = parseFloat(getEl('calc-a')?.value) || 0;
      const b = parseFloat(getEl('calc-b')?.value) || 0;
      const op = getEl('calc-op')?.value;
      const out = getEl('calc-out');
      if (out) {
        if (op === '/' && b === 0) {
          out.innerHTML = '<div class="alert alert-danger">⚠️ Division par zéro impossible !</div>';
          return;
        }
        let res = 0;
        if (op === '+') res = a + b;
        else if (op === '-') res = a - b;
        else if (op === '*') res = a * b;
        else if (op === '/') res = a / b;
        out.innerHTML = `<div class="alert alert-success">${a} ${op} ${b} = <strong>${res}</strong></div>`;
      }
    }

    if (e.target.closest('#btn-check-leap')) {
      const y = parseInt(getEl('leap-year')?.value) || 0;
      const isLeap = (y % 4 === 0 && y % 100 !== 0) || (y % 400 === 0);
      const out = getEl('leap-out');
      if (out) {
        out.classList.remove('d-none');
        out.innerHTML = isLeap ? `🎉 L'année <strong>${y} est BISSEXTILE</strong> (29 jours en février).` : `L'année <strong>${y} N'EST PAS bissextile</strong> (28 jours).`;
      }
    }

    if (e.target.closest('#btn-check-salut')) {
      const t = parseInt(getEl('salut-t')?.value) || 0;
      let msg = 'Bonne nuit';
      if (t < 12) msg = 'Bonjour';
      else if (t < 18) msg = 'Bon Après-midi';
      else if (t < 21) msg = 'Bonsoir';
      const out = getEl('salut-out');
      if (out) {
        out.classList.remove('d-none');
        out.innerHTML = `À ${t}h00, la salutation est : <strong>"${msg}"</strong>`;
      }
    }

    if (e.target.closest('#btn-match-result')) {
      const n1 = (getEl('eq1-name')?.value || '').trim();
      const s1 = parseInt(getEl('eq1-score')?.value) || 0;
      const n2 = (getEl('eq2-name')?.value || '').trim();
      const s2 = parseInt(getEl('eq2-score')?.value) || 0;
      let res = 'Match nul.';
      if (s1 > s2) res = `L'équipe <strong>${n1}</strong> a gagné !`;
      else if (s2 > s1) res = `L'équipe <strong>${n2}</strong> a gagné !`;
      const out = getEl('match-out');
      if (out) {
        out.classList.remove('d-none');
        out.innerHTML = `Score : ${n1} ${s1} - ${s2} ${n2} ➔ ${res}`;
      }
    }

    if (e.target.closest('#btn-calc-eq1d')) {
      const a = parseFloat(getEl('eq1d-a')?.value) || 0;
      const b = parseFloat(getEl('eq1d-b')?.value) || 0;
      const out = getEl('eq1d-out');
      if (out) {
        out.classList.remove('d-none');
        if (a !== 0) {
          const x = -b / a;
          out.innerHTML = `Solution unique : <strong>x = ${x.toFixed(2)}</strong>`;
        } else {
          if (b === 0) out.innerHTML = 'Infinité de solutions (S = ℝ)';
          else out.innerHTML = 'Pas de solution (S = ∅)';
        }
      }
    }

    if (e.target.closest('#btn-calc-tri')) {
      const a = parseFloat(getEl('tri-a')?.value) || 0;
      const b = parseFloat(getEl('tri-b')?.value) || 0;
      const c = parseFloat(getEl('tri-c')?.value) || 0;
      const out = getEl('tri-out');
      if (out) {
        out.classList.remove('d-none');
        if (a + b > c && a + c > b && b + c > a) {
          let nature = 'Quelconque';
          if (a === b && b === c) nature = 'Équilatéral';
          else if (a === b || a === c || b === c) nature = 'Isocèle';
          else if (Math.abs(a * a + b * b - c * c) < 0.01 || Math.abs(a * a + c * c - b * b) < 0.01 || Math.abs(b * b + c * c - a * a) < 0.01) nature = 'Rectangle';
          out.innerHTML = `ABC est un triangle : <strong>${nature}</strong>`;
        } else {
          out.innerHTML = '<span class="text-danger">ABC N\'EST PAS un triangle (inégalité triangulaire non vérifiée).</span>';
        }
      }
    }

    if (e.target.closest('#btn-check-alcohol')) {
      const f = (getEl('alc-formula')?.value || '').trim().toUpperCase();
      const map = { 'CH4O': 'Méthanol', 'C2H6O': 'Éthanol', 'C3H8O': 'Propanol', 'C4H10O': 'Butanol', 'C5H12O': 'Pentanol', 'C6H14O': 'Hexanol' };
      const name = map[f] || 'Alcool à longue chaîne';
      const out = getEl('alc-out');
      if (out) {
        out.classList.remove('d-none');
        out.innerHTML = `Formule : <strong>${f}</strong> ➔ Alcool identifié : <strong>${name}</strong>`;
      }
    }
  });

  // -------------------------------------------------------------
  // 6. Module 5 Handlers
  // -------------------------------------------------------------
  document.addEventListener('click', (e) => {
    if (e.target.closest('#btn-gen-bonjour')) {
      const n = parseInt(getEl('ex2-n')?.value) || 1;
      const msgs = ['Hello', 'Bonjour', 'Asselema'];
      let arr = [];
      for (let i = 0; i < n; i++) arr.push(msgs[i % 3]);
      const out = getEl('ex2-bonjour-out');
      if (out) {
        out.classList.remove('d-none');
        out.innerHTML = arr.map(m => `<div>${m}</div>`).join('');
      }
    }

    if (e.target.closest('#btn-calc-imp')) {
      const a = parseInt(getEl('imp-a')?.value) || 0;
      const b = parseInt(getEl('imp-b')?.value) || 0;
      let sum = 0;
      for (let i = Math.min(a, b); i <= Math.max(a, b); i++) {
        if (i % 2 !== 0) sum += i;
      }
      const out = getEl('imp-out');
      if (out) {
        out.classList.remove('d-none');
        out.innerHTML = `Somme des entiers impairs dans [${a}, ${b}] = <strong>${sum}</strong>`;
      }
    }

    if (e.target.closest('#btn-do-filter')) {
      const str = getEl('filter-str')?.value || '';
      let chl = '', chc = '';
      for (let char of str) {
        if (char >= '0' && char <= '9') chc += char;
        else if ((char >= 'a' && char <= 'z') || (char >= 'A' && char <= 'Z')) chl += char;
      }
      const out = getEl('filter-out');
      if (out) {
        out.classList.remove('d-none');
        out.innerHTML = `Lettres (chl) : <strong>"${chl}"</strong> | Chiffres (chc) : <strong>"${chc}"</strong>`;
      }
    }

    if (e.target.closest('#btn-calc-serie')) {
      const n = parseInt(getEl('serie-n')?.value) || 1;
      let sum = 0;
      for (let k = 1; k <= n; k++) {
        sum += Math.pow(-1, k + 1) * Math.pow(k, k);
      }
      const out = getEl('serie-out');
      if (out) {
        out.classList.remove('d-none');
        out.innerHTML = `Somme S_${n} = <strong>${sum}</strong>`;
      }
    }

    if (e.target.closest('#btn-check-card')) {
      const cd = (getEl('card-num')?.value || '').trim().toUpperCase();
      let digitsSum = 0;
      let lettersRankSum = 0;
      let letterCount = 0;
      for (let char of cd) {
        if (char >= '0' && char <= '9') digitsSum += parseInt(char);
        else if (char >= 'A' && char <= 'Z') {
          letterCount++;
          lettersRankSum += (char.charCodeAt(0) - 65);
        }
      }
      const cond1 = cd.length >= 8;
      const cond2 = (digitsSum % 3 === 0) || (digitsSum % 7 === 0);
      const cond3 = (lettersRankSum % 2) === (letterCount % 2);
      const isValid = cond1 && cond2 && cond3;
      const out = getEl('card-out');
      if (out) {
        out.classList.remove('d-none');
        out.innerHTML = isValid ? `🎉 Carte <strong>${cd} est VALIDE</strong> !` : `❌ Carte <strong>${cd} est INVALIDE</strong>.`;
      }
    }

    if (e.target.closest('#btn-check-prog')) {
      const str = String(getEl('prog-num')?.value || '').trim();
      let inc = true, dec = true;
      for (let i = 0; i < str.length - 1; i++) {
        if (parseInt(str[i]) > parseInt(str[i + 1])) inc = false;
        if (parseInt(str[i]) < parseInt(str[i + 1])) dec = false;
      }
      let res = 'Ni croissante ni décroissante';
      if (inc) res = 'Progression CROISSANTE';
      else if (dec) res = 'Progression DÉCROISSANTE';
      const out = getEl('prog-out');
      if (out) {
        out.classList.remove('d-none');
        out.innerHTML = `Le nombre ${str} forme une : <strong>${res}</strong>`;
      }
    }

    // -------------------------------------------------------------
    // Simulation Interactive des Opérateurs Logiques (NON, ET, OU)
    // -------------------------------------------------------------
    if (e.target.closest('#btn-toggle-x') || e.target.closest('#btn-toggle-y')) {
      if (e.target.closest('#btn-toggle-x')) window.stateLogicX = !window.stateLogicX;
      if (e.target.closest('#btn-toggle-y')) window.stateLogicY = !window.stateLogicY;
      updateLogicSim();
    }
  });

  // State initialization for logic simulator
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

    // NON (not x)
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

    // ET (x and y)
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

    // OU (x or y)
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

  // -------------------------------------------------------------
  // Recherche Interactive Table ASCII (Codes 32 à 127)
  // -------------------------------------------------------------
  const initAsciiTable = () => {
    const tableBody = getEl('ascii-table-body');
    const searchInput = getEl('ascii-search');
    const resultBox = getEl('ascii-result');
    if (!tableBody) return;

    // Générer la liste complète des caractères ASCII imprimables (32 à 127)
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
        // Tester si la saisie est une liste de codes numériques séparés par espaces/virgules/points-virgules
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
          // Saisie sous forme de chaîne de caractères (ex: "BAC" ou "Hello")
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

      // Affichage du résultat récapitulatif
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

      // Rendu de l'intégralité de la grille 12x8 avec surbrillance des cellules trouvées
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

  // -------------------------------------------------------------
  // Exercise 1 & 2 – Interactive fill-in-the-blank tables
  // -------------------------------------------------------------

  /**
   * Normalize a user answer for flexible comparison:
   * - strip whitespace, lowercase
   * - accept both 'true'/'false' and 'vrai'/'faux'
   */
  function normAnswer(s) {
    if (s === undefined || s === null) return '';
    let v = String(s).trim().toLowerCase();
    if (v === 'vrai') v = 'true';
    if (v === 'faux') v = 'false';
    return v;
  }

  /**
   * Check a single answer – true if user input matches any of the accepted answers.
   */
  function isCorrectAns(userVal, ...accepted) {
    const u = normAnswer(userVal);
    return accepted.some(a => normAnswer(a) === u);
  }

  // ---- Exercise 1 ----
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

  // ---- Exercise 2 ----
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

      // Algo fields accept any non-empty answer (hard to check exact notation)
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

  // ---- Exercise 3 ----
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
        if (e === '-' || e === '') {
          return u === '-' || u === '';
        }
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

  // Auto-propagation logic for Exercise 3 trace memory table:
  // When an input in a row is modified, propagate its value to all subsequent rows in the same column
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
        if (nextInp) {
          nextInp.value = val;
        }
      }
    });
  }

  // ---- Exercise 4 ----
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

      // Python formula check (ignore whitespace)
      const normPy = (s) => String(s || '').replace(/\s+/g, '').toLowerCase();
      const okPy = !inpPy || (normPy(inpPy.value) === normPy(expPy));

      // Min/Max check
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

  // ---- Exercise 5 ----
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

  // ---- Exercise 6 ----
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

      // Check Algo (non-empty entry)
      const okAlgo = !inpAlgo || (inpAlgo.value.trim().length > 0);

      // Check Python (flexible whitespace)
      const normPy = s => String(s || '').replace(/\s+/g, '').toLowerCase();
      const okPy = !inpPy || (expPy && normPy(inpPy.value) === normPy(expPy));

      // Check Result (strip quotes)
      let userRes = (inpRes ? inpRes.value : '').trim();
      if ((userRes.startsWith('"') && userRes.endsWith('"')) || (userRes.startsWith("'") && userRes.endsWith("'"))) {
        userRes = userRes.slice(1, -1);
      }
      const okRes = !inpRes || isCorrectAns(userRes, expRes, expRes === 'A = 13, B = 6' ? '13, 6' : expRes, expRes === 'I = -1, J = 11' ? '-1, 11' : expRes);

      // Check Type
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

  // -------------------------------------------------------------
  // 7. Exercice 7 Interactive SVG Function Simulator
  // -------------------------------------------------------------
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
            <!-- Entrée x -->
            <rect x="20" y="55" width="150" height="80" rx="10" fill="#1e293b" stroke="#38bdf8" stroke-width="2"/>
            <text x="95" y="80" text-anchor="middle" fill="#94a3b8" font-family="monospace" font-size="12">Réel x (Entrée)</text>
            <text x="95" y="110" text-anchor="middle" fill="#38bdf8" font-family="monospace" font-size="22" font-weight="bold">${x}</text>

            <!-- Flèche vers machine -->
            <line x1="170" y1="95" x2="230" y2="95" stroke="#38bdf8" stroke-width="3" marker-end="url(#ex7-arrow)"/>

            <!-- Machine de calcul -->
            <rect x="230" y="45" width="180" height="100" rx="15" fill="#0f172a" stroke="#fbbf24" stroke-width="3"/>
            <text x="320" y="80" text-anchor="middle" fill="#fbbf24" font-family="sans-serif" font-size="16" font-weight="bold">${fn === 'ent' ? 'Ent(x)' : 'Arrondi(x)'}</text>
            <text x="320" y="105" text-anchor="middle" fill="#cbd5e1" font-family="sans-serif" font-size="11">${fn === 'ent' ? 'Extrait partie entière' : 'Arrondit au + proche'}</text>
            <text x="320" y="125" text-anchor="middle" fill="#94a3b8" font-family="monospace" font-size="11">Partie Ent: ${integerPart} | Déc: ${decimalPart}</text>

            <!-- Flèche vers sortie -->
            <line x1="410" y1="95" x2="470" y2="95" stroke="#38bdf8" stroke-width="3" marker-end="url(#ex7-arrow)"/>

            <!-- Résultat Sortie -->
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

            <!-- Résultat sous-chaîne -->
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

            <!-- Résultat Booléen -->
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

            <!-- Résultat Position -->
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

  // -------------------------------------------------------------
  // 8. Exercice 8 Interactive Password Generator & SVG Graphic
  // -------------------------------------------------------------
  const btnGenPass = getEl('btn-gen-pass');
  const passResultInput = getEl('pass-result');
  const ex8SvgContainer = getEl('ex8-svg-container');

  const generateRandomPassword = () => {
    // 2 Chiffres (0 -> 9, ASCII 48 -> 57)
    const c1 = String(Math.floor(Math.random() * 10));
    const c2 = String(Math.floor(Math.random() * 10));

    // 2 Majuscules ('A' -> 'Z', ASCII 65 -> 90)
    const m1 = String.fromCharCode(65 + Math.floor(Math.random() * 26));
    const m2 = String.fromCharCode(65 + Math.floor(Math.random() * 26));

    // 2 Minuscules ('a' -> 'z', ASCII 97 -> 122)
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
          <!-- En-tête type de caractère -->
          <rect x="0" y="0" width="${slotW}" height="22" rx="4" fill="${c.bg}" stroke="${c.color}" stroke-width="1"/>
          <text x="${slotW / 2}" y="15" text-anchor="middle" fill="${c.color}" font-family="sans-serif" font-size="10" font-weight="bold">${c.type}</text>

          <!-- Boîte du Caractère -->
          <rect x="0" y="26" width="${slotW}" height="50" rx="8" fill="#1e293b" stroke="${c.color}" stroke-width="2.5"/>
          <text x="${slotW / 2}" y="61" text-anchor="middle" fill="#ffffff" font-family="monospace" font-size="28" font-weight="bold">${c.char}</text>

          <!-- Indice & Code ASCII -->
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

        <!-- Fond visuel -->
        <rect x="10" y="10" width="630" height="180" rx="12" fill="url(#pass-grad)" stroke="#334155" stroke-width="1.5"/>

        <!-- Slots des 6 caractères -->
        ${slotsSvg}

        <!-- Légende sous-jacente -->
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

  // -------------------------------------------------------------
  // 9. Exercice 9 Interactive Digit Permutation & SVG Graphic
  // -------------------------------------------------------------
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

        <!-- Bloc Entrée a -->
        <g transform="translate(30, 45)">
          <rect x="0" y="0" width="160" height="110" rx="12" fill="#1e293b" stroke="#38bdf8" stroke-width="2"/>
          <text x="80" y="25" text-anchor="middle" fill="#94a3b8" font-family="monospace" font-size="13">Nombre initial a = ${a}</text>
          
          <!-- Dizaines -->
          <rect x="20" y="38" width="55" height="55" rx="8" fill="#0284c7" stroke="#38bdf8" stroke-width="2"/>
          <text x="47" y="74" text-anchor="middle" fill="#ffffff" font-family="monospace" font-size="26" font-weight="bold">${diz}</text>
          <text x="47" y="103" text-anchor="middle" fill="#38bdf8" font-family="sans-serif" font-size="10">Dizaines</text>

          <!-- Unités -->
          <rect x="85" y="38" width="55" height="55" rx="8" fill="#d97706" stroke="#fbbf24" stroke-width="2"/>
          <text x="112" y="74" text-anchor="middle" fill="#ffffff" font-family="monospace" font-size="26" font-weight="bold">${uni}</text>
          <text x="112" y="103" text-anchor="middle" fill="#fbbf24" font-family="sans-serif" font-size="10">Unités</text>
        </g>

        <!-- Machine de croisement / Permutation -->
        <g transform="translate(225, 30)">
          <rect x="0" y="0" width="200" height="140" rx="15" fill="#0f172a" stroke="#a855f7" stroke-width="2.5"/>
          <text x="100" y="28" text-anchor="middle" fill="#c084fc" font-family="sans-serif" font-size="14" font-weight="bold">🔀 PERMUTATION</text>

          <!-- Trajectoire Dizaines -> Unités -->
          <path d="M 20 60 C 80 60, 120 110, 180 110" fill="none" stroke="#38bdf8" stroke-width="3" stroke-dasharray="4,4" marker-end="url(#ex9-arrow-bot)"/>

          <!-- Trajectoire Unités -> Dizaines -->
          <path d="M 20 110 C 80 110, 120 60, 180 60" fill="none" stroke="#f59e0b" stroke-width="3" stroke-dasharray="4,4" marker-end="url(#ex9-arrow-top)"/>

          <text x="100" y="132" text-anchor="middle" fill="#e2e8f0" font-family="monospace" font-size="11">b = (a % 10)*10 + (a // 10)</text>
        </g>

        <!-- Bloc Sortie b -->
        <g transform="translate(460, 45)">
          <rect x="0" y="0" width="160" height="110" rx="12" fill="#064e3b" stroke="#34d399" stroke-width="2"/>
          <text x="80" y="25" text-anchor="middle" fill="#a7f3d0" font-family="monospace" font-size="13">Résultat b = ${b}</text>
          
          <!-- Nouvelle Dizaine (Ancienne Unité) -->
          <rect x="20" y="38" width="55" height="55" rx="8" fill="#d97706" stroke="#fbbf24" stroke-width="2"/>
          <text x="47" y="74" text-anchor="middle" fill="#ffffff" font-family="monospace" font-size="26" font-weight="bold">${uni}</text>
          <text x="47" y="103" text-anchor="middle" fill="#fbbf24" font-family="sans-serif" font-size="10">Dizaines</text>

          <!-- Nouvelle Unité (Ancienne Dizaine) -->
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

  // -------------------------------------------------------------
  // 10. Exercice 10 Interactive Battery & Autonomie SVG Simulator
  // -------------------------------------------------------------
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

    const deltaD = Math.max(0.1, ikf - ikd); // Distance parcourue
    const deltaB = Math.max(0, nib - nfb);   // Batterie consommée %

    // Consommation par 100 km (% / 100km)
    const conso100 = (deltaB / deltaD) * 100;

    // Autonomie restante dm (km)
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

        <!-- Gauche : Jauge de Batterie SVG -->
        <g transform="translate(30, 35)">
          <text x="100" y="20" text-anchor="middle" fill="#cbd5e1" font-family="sans-serif" font-size="13" font-weight="bold">Batterie Restante (${nfb}%)</text>
          
          <!-- Contour batterie -->
          <rect x="0" y="32" width="190" height="90" rx="10" fill="#1e293b" stroke="#64748b" stroke-width="3"/>
          <!-- Borne + -->
          <rect x="190" y="57" width="12" height="40" rx="3" fill="#64748b"/>
          
          <!-- Niveau de charge -->
          <rect x="5" y="37" width="${batW}" height="80" rx="6" fill="url(#bat-grad)"/>
          
          <!-- Texte niveau % -->
          <text x="95" y="85" text-anchor="middle" fill="#ffffff" font-family="monospace" font-size="28" font-weight="bold">${Math.round(nfb)}%</text>
          <text x="95" y="110" text-anchor="middle" fill="#e2e8f0" font-family="monospace" font-size="11">Init: ${nib}% | Consommé: ${deltaB.toFixed(1)}%</text>
        </g>

        <!-- Centre : Icône Voiture / Parcours -->
        <g transform="translate(250, 45)">
          <rect x="0" y="0" width="150" height="110" rx="12" fill="#0f172a" stroke="#38bdf8" stroke-width="2"/>
          <text x="75" y="30" text-anchor="middle" fill="#38bdf8" font-family="sans-serif" font-size="12" font-weight="bold">🚘 PARCOURS TEST</text>
          <text x="75" y="60" text-anchor="middle" fill="#ffffff" font-family="monospace" font-size="20" font-weight="bold">${deltaD.toFixed(0)} km</text>
          <text x="75" y="85" text-anchor="middle" fill="#94a3b8" font-family="sans-serif" font-size="11">Consommation :</text>
          <text x="75" y="102" text-anchor="middle" fill="#fbbf24" font-family="monospace" font-size="13" font-weight="bold">${conso100.toFixed(1)}% / 100km</text>
        </g>

        <!-- Droite : Autonomie Restante (dm) -->
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

  // -------------------------------------------------------------
  // 11. Exercice 11 Interactive Logic Gate Circuit SVG Renderer
  // -------------------------------------------------------------
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
    const t1 = (a && notC) ? 1 : 0; // a . NOT(c)
    const t2 = (b && c) ? 1 : 0;    // b . c
    const L = (t1 || t2) ? 1 : 0;   // L = t1 + t2

    if (valA) valA.innerHTML = `<span class="badge ${a ? 'bg-success' : 'bg-secondary'}">${a} (${a ? 'VRAI' : 'FAUX'})</span>`;
    if (valB) valB.innerHTML = `<span class="badge ${b ? 'bg-warning text-dark' : 'bg-secondary'}">${b} (${b ? 'VRAI' : 'FAUX'})</span>`;
    if (valC) valC.innerHTML = `<span class="badge ${c ? 'bg-info text-dark' : 'bg-secondary'}">${c} (${c ? 'VRAI' : 'FAUX'})</span>`;
    
    if (valL) {
      valL.className = `badge ${L ? 'bg-success' : 'bg-danger'} fs-5 px-3 py-2`;
      valL.innerHTML = L ? 'VRAI (1) — Allumée 💡' : 'FAUX (0) — Éteinte 🔴';
    }

    // Highlight active row in Truth Table
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
        <!-- Entrées a, b, c -->
        <!-- Signal a -->
        <g transform="translate(30, 45)">
          <circle cx="20" cy="0" r="16" fill="${a ? '#0284c7' : '#1e293b'}" stroke="${a ? '#38bdf8' : '#475569'}" stroke-width="2"/>
          <text x="20" y="5" text-anchor="middle" fill="#ffffff" font-family="monospace" font-size="14" font-weight="bold">a=${a}</text>
        </g>

        <!-- Signal b -->
        <g transform="translate(30, 110)">
          <circle cx="20" cy="0" r="16" fill="${b ? '#d97706' : '#1e293b'}" stroke="${b ? '#fbbf24' : '#475569'}" stroke-width="2"/>
          <text x="20" y="5" text-anchor="middle" fill="#ffffff" font-family="monospace" font-size="14" font-weight="bold">b=${b}</text>
        </g>

        <!-- Signal c -->
        <g transform="translate(30, 175)">
          <circle cx="20" cy="0" r="16" fill="${c ? '#15803d' : '#1e293b'}" stroke="${c ? '#4ade80' : '#475569'}" stroke-width="2"/>
          <text x="20" y="5" text-anchor="middle" fill="#ffffff" font-family="monospace" font-size="14" font-weight="bold">c=${c}</text>
        </g>

        <!-- Fil a vers AND 1 -->
        <line x1="50" y1="45" x2="270" y2="45" stroke="${color(a)}" stroke-width="${width(a)}"/>

        <!-- Fil c vers NOT -->
        <line x1="50" y1="175" x2="140" y2="175" stroke="${color(c)}" stroke-width="${width(c)}"/>

        <!-- Porte NON (Inverter NOT gate) -->
        <g transform="translate(140, 160)">
          <polygon points="0,0 25,15 0,30" fill="${notC ? '#0369a1' : '#1e293b'}" stroke="${notC ? '#38bdf8' : '#475569'}" stroke-width="1.5"/>
          <circle cx="28" cy="15" r="3" fill="#ffffff"/>
          <text x="12" y="38" text-anchor="middle" fill="#94a3b8" font-family="sans-serif" font-size="9">NON</text>
        </g>

        <!-- Fil non(c) vers AND 1 -->
        <line x1="172" y1="175" x2="200" y2="175" stroke="${color(notC)}" stroke-width="${width(notC)}"/>
        <polyline points="200,175 200,65 270,65" fill="none" stroke="${color(notC)}" stroke-width="${width(notC)}"/>
        <text x="205" y="120" fill="${color(notC)}" font-family="monospace" font-size="10">c̄ = ${notC}</text>

        <!-- Fil b vers AND 2 -->
        <line x1="50" y1="110" x2="270" y2="110" stroke="${color(b)}" stroke-width="${width(b)}"/>

        <!-- Fil c direct vers AND 2 -->
        <polyline points="90,175 90,130 270,130" fill="none" stroke="${color(c)}" stroke-width="${width(c)}"/>

        <!-- Porte ET 1 (AND Gate 1 : a . non(c)) -->
        <g transform="translate(270, 35)">
          <path d="M 0 0 L 25 0 C 45 0, 45 40, 25 40 L 0 40 Z" fill="${t1 ? '#065f46' : '#1e293b'}" stroke="${t1 ? '#34d399' : '#475569'}" stroke-width="2"/>
          <text x="18" y="24" text-anchor="middle" fill="#ffffff" font-family="sans-serif" font-size="11" font-weight="bold">ET (&bull;)</text>
          <text x="52" y="-5" text-anchor="middle" fill="#cbd5e1" font-family="monospace" font-size="10">T1 = ${t1}</text>
        </g>

        <!-- Porte ET 2 (AND Gate 2 : b . c) -->
        <g transform="translate(270, 105)">
          <path d="M 0 0 L 25 0 C 45 0, 45 40, 25 40 L 0 40 Z" fill="${t2 ? '#065f46' : '#1e293b'}" stroke="${t2 ? '#34d399' : '#475569'}" stroke-width="2"/>
          <text x="18" y="24" text-anchor="middle" fill="#ffffff" font-family="sans-serif" font-size="11" font-weight="bold">ET (&bull;)</text>
          <text x="52" y="50" text-anchor="middle" fill="#cbd5e1" font-family="monospace" font-size="10">T2 = ${t2}</text>
        </g>

        <!-- Fil T1 vers OR -->
        <polyline points="310,55 410,55 410,85 430,85" fill="none" stroke="${color(t1)}" stroke-width="${width(t1)}"/>

        <!-- Fil T2 vers OR -->
        <polyline points="310,125 410,125 410,105 430,105" fill="none" stroke="${color(t2)}" stroke-width="${width(t2)}"/>

        <!-- Porte OU (OR Gate : T1 + T2) -->
        <g transform="translate(430, 75)">
          <path d="M 0 0 C 15 0, 30 10, 45 22 C 30 34, 15 44, 0 44 C 10 30, 10 14, 0 0 Z" fill="${L ? '#065f46' : '#1e293b'}" stroke="${L ? '#34d399' : '#475569'}" stroke-width="2"/>
          <text x="20" y="26" text-anchor="middle" fill="#ffffff" font-family="sans-serif" font-size="11" font-weight="bold">OU (+)</text>
        </g>

        <!-- Fil Sortie L vers Lampe -->
        <line x1="475" y1="97" x2="540" y2="97" stroke="${color(L)}" stroke-width="${width(L)}"/>

        <!-- Lampe L -->
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

  // -------------------------------------------------------------
  // 12. Exercice 12 Interactive Oil Logistics & Truck SVG Visualizer
  // -------------------------------------------------------------
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

    // Capacity & Filling ratio
    const maxCap = Math.max(2000, Math.ceil(q / 500) * 500);
    const ratio = Math.min(1, Math.max(0, q / maxCap));
    const liquidH = Math.round(ratio * 105);
    const liquidY = 160 - liquidH;

    const svgContent = `
      <svg viewBox="0 0 650 230" class="w-100" style="max-height: 240px;">
        <defs>
          <!-- Degradé Métallique 3D pour le corps du réservoir -->
          <linearGradient id="tank-metal-3d" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stop-color="#0f172a"/>
            <stop offset="25%" stop-color="#334155"/>
            <stop offset="50%" stop-color="#94a3b8"/>
            <stop offset="75%" stop-color="#475569"/>
            <stop offset="100%" stop-color="#1e293b"/>
          </linearGradient>

          <!-- Degradé Verre / Transparence 3D -->
          <linearGradient id="glass-body" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stop-color="#38bdf8" stop-opacity="0.3"/>
            <stop offset="30%" stop-color="#ffffff" stop-opacity="0.1"/>
            <stop offset="70%" stop-color="#0284c7" stop-opacity="0.2"/>
            <stop offset="100%" stop-color="#0f172a" stop-opacity="0.4"/>
          </linearGradient>

          <!-- Degradé Liquide d'Huile Doré 3D -->
          <linearGradient id="oil-liquid-3d" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stop-color="#78350f"/>
            <stop offset="30%" stop-color="#ca8a04"/>
            <stop offset="70%" stop-color="#eab308"/>
            <stop offset="100%" stop-color="#a16207"/>
          </linearGradient>

          <!-- Surface supérieure du liquide en 3D -->
          <radialGradient id="oil-surface-3d" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stop-color="#fef08a"/>
            <stop offset="60%" stop-color="#eab308"/>
            <stop offset="100%" stop-color="#ca8a04"/>
          </radialGradient>

          <marker id="ex12-arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto">
            <path d="M 0 1.5 L 10 5 L 0 8.5 z" fill="#f59e0b"/>
          </marker>
        </defs>

        <!-- ==================== 1. CITERNE 3D (Remplissage Liquide) ==================== -->
        <g transform="translate(15, 10)">
          <!-- Tuyau d'arrivée en haut -->
          <rect x="95" y="0" width="10" height="35" fill="#475569" stroke="#94a3b8" stroke-width="1"/>
          
          <!-- Jet d'huile en écoulement -->
          ${q > 0 ? `<rect x="98" y="25" width="4" height="${Math.max(10, liquidY - 20)}" fill="#fef08a" opacity="0.85"/>` : ''}

          <!-- Socle Ombre 3D au sol -->
          <ellipse cx="100" cy="165" rx="64" ry="16" fill="#000000" opacity="0.6"/>

          <!-- Fond arrière de la Citerne (Ombre interne) -->
          <ellipse cx="100" cy="160" rx="58" ry="15" fill="#0f172a"/>
          <rect x="42" y="45" width="116" height="115" fill="#0f172a"/>

          <!-- ================= LIQUIDE D'HUILE 3D ================= -->
          ${liquidH > 0 ? `
            <!-- Corps du liquide -->
            <rect x="43" y="${liquidY}" width="114" height="${liquidH}" fill="url(#oil-liquid-3d)"/>
            
            <!-- Ellipse de base du liquide -->
            <ellipse cx="100" cy="160" rx="57" ry="14" fill="#78350f"/>
            
            <!-- Ellipse de surface supérieure du liquide 3D -->
            <ellipse cx="100" cy="${liquidY}" rx="57" ry="14" fill="url(#oil-surface-3d)" stroke="#fef08a" stroke-width="1"/>
          ` : ''}

          <!-- ================= PAROI DU RÉSERVOIR 3D ================= -->
          <!-- Paroi en verre / corps transparent -->
          <rect x="40" y="45" width="120" height="115" fill="url(#glass-body)" stroke="#64748b" stroke-width="2"/>
          
          <!-- Cerclages métalliques 3D de renfort -->
          <line x1="40" y1="80" x2="160" y2="80" stroke="#94a3b8" stroke-width="1.5" stroke-dasharray="3,2" opacity="0.5"/>
          <line x1="40" y1="120" x2="160" y2="120" stroke="#94a3b8" stroke-width="1.5" stroke-dasharray="3,2" opacity="0.5"/>

          <!-- Couvercle métallique 3D supérieur -->
          <ellipse cx="100" cy="45" rx="60" ry="16" fill="url(#tank-metal-3d)" stroke="#94a3b8" stroke-width="2"/>

          <!-- Graduations sur le côté du réservoir -->
          <line x1="32" y1="160" x2="40" y2="160" stroke="#e2e8f0" stroke-width="1.5"/>
          <text x="28" y="163" text-anchor="end" fill="#94a3b8" font-family="monospace" font-size="9">0L</text>

          <line x1="32" y1="107" x2="40" y2="107" stroke="#e2e8f0" stroke-width="1.5"/>
          <text x="28" y="110" text-anchor="end" fill="#94a3b8" font-family="monospace" font-size="9">${Math.round(maxCap / 2)}L</text>

          <line x1="32" y1="55" x2="40" y2="55" stroke="#e2e8f0" stroke-width="1.5"/>
          <text x="28" y="58" text-anchor="end" fill="#94a3b8" font-family="monospace" font-size="9">${maxCap}L</text>

          <!-- Étiquette Citerne 3D -->
          <rect x="55" y="182" width="90" height="20" rx="4" fill="#1e293b" stroke="#eab308" stroke-width="1"/>
          <text x="100" y="196" text-anchor="middle" fill="#fef08a" font-family="monospace" font-size="12" font-weight="bold">${q} Litres</text>
        </g>

        <!-- Flèche de transfert 1 -->
        <line x1="190" y1="110" x2="235" y2="110" stroke="#f59e0b" stroke-width="3" marker-end="url(#ex12-arrow)"/>

        <!-- ==================== 2. CONDITIONNEMENT EN CAISSES ==================== -->
        <g transform="translate(240, 55)">
          <rect x="0" y="0" width="170" height="110" rx="12" fill="#0f172a" stroke="#f59e0b" stroke-width="2"/>
          <text x="85" y="24" text-anchor="middle" fill="#fbbf24" font-family="sans-serif" font-size="12" font-weight="bold">📦 Conditionnement</text>
          
          <rect x="15" y="38" width="140" height="45" rx="8" fill="#78350f" stroke="#f59e0b" stroke-width="1.5"/>
          <text x="85" y="60" text-anchor="middle" fill="#ffffff" font-family="monospace" font-size="18" font-weight="bold">${caisses} Caisses</text>
          <text x="85" y="76" text-anchor="middle" fill="#fef08a" font-family="sans-serif" font-size="10">(${boxSize} bout./caisse)</text>

          <text x="85" y="98" text-anchor="middle" fill="#fca5a5" font-family="monospace" font-size="10">+ ${resteBouteilles} bout. hors caisse</text>
        </g>

        <!-- Flèche de transfert 2 -->
        <line x1="415" y1="110" x2="465" y2="110" stroke="#f59e0b" stroke-width="3" marker-end="url(#ex12-arrow)"/>

        <!-- ==================== 3. TRANSPORT CAMION ==================== -->
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

  // -------------------------------------------------------------
  // 13. Exercice 13 Interactive String Functions Evaluation
  // -------------------------------------------------------------
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
          <!-- Index Box -->
          <rect x="0" y="0" width="${charW}" height="18" rx="3" fill="${indexBg}"/>
          <text x="${charW / 2}" y="13" text-anchor="middle" fill="${indexColor}" font-family="monospace" font-size="11" font-weight="bold">${i}</text>

          <!-- Char Box -->
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

  // Initial SVG render
  renderEx13StringSVG();

  // Interactive row hover highlight
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
  let currentK = 10; // Default k = 10 -> 'K' (65 + 10 = 75)
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

  // Initial ASCII display
  renderEx13AsciiInfo(currentK);

  if (btnEvalCh) {
    btnEvalCh.addEventListener('click', rollRandomE);
  }

  function isTypeMatch(userVal, expType) {
    if (!userVal) return false;
    const uRaw = normAnswer(userVal);
    const u = uRaw.normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z]/g, '');
    
    if (expType === 'Caractère') {
      return ['caractere', 'char'].includes(u);
    }
    if (expType === 'Chaîne') {
      return ['chaine', 'str', 'string'].includes(u);
    }
    if (expType === 'Entier') {
      return ['entier', 'int', 'integer'].includes(u);
    }
    if (expType === 'Booleen') {
      return ['booleen', 'bool', 'boolean'].includes(u);
    }
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

  // -------------------------------------------------------------
  // 14. Exercice 14 Pseudonym Generator Simulator & Exercise
  // -------------------------------------------------------------
  const pseudoNpInput = getEl('pseudo-np');
  const btnGenPseudo = getEl('btn-gen-pseudo');
  const pseudoStepsEl = getEl('pseudo-steps');
  const pseudoOutEl = getEl('pseudo-out');

  let currentRand2 = 31;

  function processPseudoGen() {
    const np = (pseudoNpInput?.value || '').trim();

    if (!np) {
      if (pseudoOutEl) {
        pseudoOutEl.innerHTML = `<div class="alert alert-warning mb-0">⚠️ Veuillez saisir le Nom & Prénom.</div>`;
      }
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

    // Generate 2-digit random number between 10 and 99
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

  // Exercice 14 Table Fill Check
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
        // Accept SAM4_LAH9_31, SAM4_LAH9_XX, SAM4_LAH9 or SAM4_LAH9_
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
