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

});
