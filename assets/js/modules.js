/**
 * Antigravity Interactive Modules Engine - Vanilla JS & Vue.js Edition
 * Enseignant: Mohamed Anis MANI - Cours Informatique 2e Sciences
 */

// -------------------------------------------------------------
// Helper functions for DOM manipulation (Global scope)
// -------------------------------------------------------------
const getEl = id => document.getElementById(id);

document.addEventListener('DOMContentLoaded', () => {

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
        out.innerHTML = `⚠️ Veuillez saisir des longueurs strictement positives pour a, b et c.`;
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

    // 1. Carbon Backbone (C_1 to C_n)
    for (let i = 0; i < n; i++) {
      const x = (i - (n - 1) / 2) * spacing;
      const y = (i % 2 === 0 ? 0.45 : -0.45);
      const z = (i % 2 === 0 ? -0.25 : 0.25);
      atoms.push({ type: 'C', label: `C${i + 1}`, x, y, z, r: 0.55, color: '#334155' });

      if (i > 0) {
        bonds.push({ from: i - 1, to: i });
      }
    }

    // 2. Oxygen Atom (O) on C_1
    const oIdx = atoms.length;
    const c1 = atoms[0];
    const ox = c1.x - 1.2;
    const oy = c1.y - 0.8;
    const oz = c1.z + 0.6;
    atoms.push({ type: 'O', label: 'O', x: ox, y: oy, z: oz, r: 0.52, color: '#ef4444' });
    bonds.push({ from: 0, to: oIdx });

    // 3. Hydrogen on Oxygen (OH)
    const hoIdx = atoms.length;
    atoms.push({ type: 'H', label: 'H', x: ox - 0.6, y: oy - 0.5, z: oz + 0.5, r: 0.38, color: '#f8fafc' });
    bonds.push({ from: oIdx, to: hoIdx });

    // 4. Hydrogens on Carbon atoms
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
      
      // Parse formula regex (C_n H_h O)
      const match = f.match(/^C(\d*)H(\d+)O$/);
      if (!match) {
        out.className = 'alert alert-danger border-danger shadow-sm p-3 rounded d-block';
        out.innerHTML = `❌ Formule <strong>"${f}"</strong> invalide ! La formule brute d'un alcool doit être de la forme <code>CnH₂n+₂O</code> (ex: <code>CH4O</code>, <code>C2H6O</code>, <code>C3H8O</code>).`;
        return;
      }

      const n = match[1] === '' ? 1 : parseInt(match[1]);
      const h = parseInt(match[2]);

      // Check Alcohol Formula condition: H = 2*n + 2
      const expectedH = 2 * n + 2;
      if (h !== expectedH) {
        out.className = 'alert alert-warning border-warning shadow-sm p-3 rounded d-block';
        out.innerHTML = `⚠️ La formule <strong>"${f}"</strong> N'EST PAS un alcool ! Pour ${n} Carbone(s), le nombre d'atomes d'Hydrogène devrait être <code>2*${n} + 2 = ${expectedH}</code> (obtenu: ${h}).`;
        return;
      }

      // Calculate Molar Mass: C=12.01, H=1.008, O=16.00
      const massC = n * 12.01;
      const massH = h * 1.008;
      const massO = 16.00;
      const molarMass = massC + massH + massO;

      // Identify Name
      const namesMap = {
        1: 'Méthanol',
        2: 'Éthanol',
        3: 'Propanol',
        4: 'Butanol',
        5: 'Pentanol',
        6: 'Hexanol'
      };
      const name = namesMap[n] || 'Alcool à longue chaîne';

      // Semi-developed structural formula
      let structFormula = '';
      if (n === 1) structFormula = 'CH₃ - OH';
      else if (n === 2) structFormula = 'CH₃ - CH₂ - OH';
      else {
        structFormula = 'CH₃ - ' + 'CH₂ - '.repeat(n - 2) + 'CH₂ - OH';
      }

      if (titleBadge) {
        titleBadge.innerHTML = `${name} (${f})`;
      }

      // Update 3D Molecular Model
      init3DMoleculeEvents();
      buildAlcohol3DModel(n);
      if (!alc3DState.animId) {
        renderAlcohol3DFraming();
      }

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
    const scale = 30; // 30px = 1 unit

    ctx.clearRect(0, 0, w, h);

    // 1. Grid lines
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

    // 2. Axes (O, x, y) & Graduations
    ctx.strokeStyle = '#64748b';
    ctx.lineWidth = 2;
    // X Axis
    ctx.beginPath();
    ctx.moveTo(0, cy);
    ctx.lineTo(w, cy);
    ctx.stroke();
    // Y Axis
    ctx.beginPath();
    ctx.moveTo(cx, 0);
    ctx.lineTo(cx, h);
    ctx.stroke();

    // Origin & Axis names
    ctx.fillStyle = '#334155';
    ctx.font = '11px Consolas, monospace';
    ctx.textAlign = 'right';
    ctx.textBaseline = 'top';
    ctx.fillText('O', cx - 6, cy + 6);
    ctx.font = 'bold 12px system-ui, sans-serif';
    ctx.textAlign = 'left';
    ctx.fillText('x', w - 15, cy - 16);
    ctx.fillText('y', cx + 10, 10);

    // X-Axis Graduations (-10 to 10)
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

    // Y-Axis Graduations (-5 to 5)
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

    // Function to map math coords (x,y) to canvas coords (px, py)
    const toPx = x => cx + x * scale;
    const toPy = y => cy - y * scale;

    // Range for plotting lines [-15, 15]
    const minX = -15;
    const maxX = 15;

    // 3. Draw Line D1 (Blue)
    ctx.beginPath();
    ctx.moveTo(toPx(minX), toPy(a1 * minX + b1));
    ctx.lineTo(toPx(maxX), toPy(a1 * maxX + b1));
    ctx.strokeStyle = '#2563eb';
    ctx.lineWidth = 3;
    ctx.stroke();

    // 4. Draw Line D2 (Red)
    ctx.beginPath();
    ctx.moveTo(toPx(minX), toPy(a2 * minX + b2));
    ctx.lineTo(toPx(maxX), toPy(a2 * maxX + b2));
    ctx.strokeStyle = '#ef4444';
    ctx.lineWidth = 3;
    ctx.stroke();

    // 5. Draw Intersection Point I if secant/orthogonal
    if (interPt) {
      const ipx = toPx(interPt.x);
      const ipy = toPy(interPt.y);

      // Pulse glow circle
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

      // Label Badge
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

  // Auto-init 3D Molecule & 2D Affine Canvas on DOM Load
  function startInitial3DAlcohol() {
    const canvas = getEl('molecule-3d-canvas');
    if (canvas) {
      init3DMoleculeEvents();
      buildAlcohol3DModel(2);
      if (!alc3DState.animId) {
        renderAlcohol3DFraming();
      }
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
