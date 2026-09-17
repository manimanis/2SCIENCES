/**
 * Antigravity Interactive Modules Engine - Module 2 (Éléments d'un algorithme)
 * Enseignant: Mohamed Anis MANI - Cours Informatique 2e Sciences
 */

if (typeof window.getEl !== 'function') {
  window.getEl = id => document.getElementById(id);
}

document.addEventListener('DOMContentLoaded', () => {

  // -------------------------------------------------------------
  // Module 2 Handlers
  // -------------------------------------------------------------
  const updateWordCount = () => {
    const words = document.querySelectorAll('.word-btn');
    if (!words.length) return;
    let totalInvalid = 0;
    let selectedCount = 0;
    words.forEach(btn => {
      if (btn.dataset.valid === 'false') totalInvalid++;
      if (btn.classList.contains('active')) selectedCount++;
    });
    const totalEl = getEl('total-invalid-count');
    if (totalEl) totalEl.textContent = totalInvalid;
    const selectedEl = getEl('selected-invalid-count');
    if (selectedEl) {
      selectedEl.textContent = `${selectedCount} / ${totalInvalid}`;
      if (selectedCount === totalInvalid) {
        selectedEl.className = 'badge bg-success fs-6 ms-1';
      } else if (selectedCount > totalInvalid) {
        selectedEl.className = 'badge bg-warning text-dark fs-6 ms-1';
      } else {
        selectedEl.className = 'badge bg-primary fs-6 ms-1';
      }
    }
  };

  document.addEventListener('click', (e) => {
    const wordBtn = e.target.closest('.word-btn');
    if (wordBtn) {
      wordBtn.classList.toggle('active');
      wordBtn.classList.toggle('btn-danger');
      wordBtn.classList.toggle('btn-outline-secondary');
      updateWordCount();
    }

    if (e.target.closest('#btn-check-vars')) {
      let correct = true;
      let selectedInvalid = 0;
      let totalInvalid = 0;
      let selectedValid = 0;

      document.querySelectorAll('.word-btn').forEach(btn => {
        const isInvalid = btn.dataset.valid === 'false';
        const isSelected = btn.classList.contains('active');
        if (isInvalid) totalInvalid++;
        if (isSelected && isInvalid) selectedInvalid++;
        if (isSelected && !isInvalid) selectedValid++;
        if (isInvalid !== isSelected) correct = false;
      });
      const feedback = getEl('vars-feedback');
      if (feedback) {
        if (correct) {
          feedback.innerHTML = `<div class="alert alert-success">🎉 Excellent ! Vous avez identifié la totalité des <strong>${totalInvalid}</strong> noms invalides sans erreur.</div>`;
        } else {
          feedback.innerHTML = `<div class="alert alert-warning">⚠️ Vos choix : <strong>${selectedInvalid} / ${totalInvalid}</strong> nom(s) invalide(s) identifié(s)${selectedValid > 0 ? ` (dont ${selectedValid} nom(s) valide(s) sélectionné(s) par erreur)` : ''}. Rappel : Les mots réservés Python et les identificateurs avec symboles (#, -, !) ou espaces sont invalides !</div>`;
        }
      }
    }
  });

  updateWordCount();

  const updateModule2Calcs = () => {
    // Exercice 3 : Distance euclidienne entre deux points
    const xa = parseFloat(getEl('dist-xa')?.value) || 0;
    const ya = parseFloat(getEl('dist-ya')?.value) || 0;
    const xb = parseFloat(getEl('dist-xb')?.value) || 0;
    const yb = parseFloat(getEl('dist-yb')?.value) || 0;

    const dx = xb - xa;
    const dy = yb - ya;
    const dist = Math.sqrt(dx * dx + dy * dy);

    const distOut = getEl('dist-out');
    if (distOut) {
      distOut.innerHTML = `&Delta;x = (${xb} &minus; ${xa}) = <strong>${dx.toFixed(2)}</strong> &nbsp;|&nbsp; &Delta;y = (${yb} &minus; ${ya}) = <strong>${dy.toFixed(2)}</strong><br>Distance d(A, B) = &radic;[(${dx.toFixed(2)})&sup2; + (${dy.toFixed(2)})&sup2;] = <strong>${dist.toFixed(3)}</strong>`;
    }

    const distSvg = getEl('dist-svg-preview');
    if (distSvg) {
      const svgW = 380;
      const svgH = 220;
      const padX = 45;
      const padY = 35;

      const minX = Math.min(0, xa, xb) - 1;
      const maxX = Math.max(xa, xb) + 1.5;
      const minY = Math.min(0, ya, yb) - 1;
      const maxY = Math.max(ya, yb) + 1.5;

      const spanX = Math.max(2, maxX - minX);
      const spanY = Math.max(2, maxY - minY);

      const toSvgX = (x) => padX + ((x - minX) / spanX) * (svgW - 2 * padX);
      const toSvgY = (y) => svgH - padY - ((y - minY) / spanY) * (svgH - 2 * padY);

      const ax = toSvgX(xa);
      const ay = toSvgY(ya);
      const bx = toSvgX(xb);
      const by = toSvgY(yb);
      const cx = toSvgX(xb); // Coin projeté (xb, ya)
      const cy = toSvgY(ya);

      const ox = toSvgX(0);
      const oy = toSvgY(0);

      distSvg.innerHTML = `<svg viewBox="0 0 ${svgW} ${svgH}" class="w-100" style="max-height: 230px;">
        <defs>
          <marker id="axis-arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto">
            <path d="M 0 2 L 10 5 L 0 8 z" fill="#64748b"/>
          </marker>
        </defs>

        <!-- Fond grille -->
        <rect x="0" y="0" width="${svgW}" height="${svgH}" fill="#f8fafc" rx="8" stroke="#e2e8f0"/>

        <!-- Axes de coordonnées -->
        <line x1="15" y1="${oy}" x2="${svgW - 15}" y2="${oy}" stroke="#94a3b8" stroke-width="1.5" marker-end="url(#axis-arrow)"/>
        <line x1="${ox}" y1="${svgH - 12}" x2="${ox}" y2="15" stroke="#94a3b8" stroke-width="1.5" marker-end="url(#axis-arrow)"/>
        <text x="${svgW - 18}" y="${oy - 6}" font-size="11" font-weight="bold" fill="#64748b">x</text>
        <text x="${ox + 8}" y="18" font-size="11" font-weight="bold" fill="#64748b">y</text>
        <text x="${ox - 10}" y="${oy + 14}" font-size="10" font-weight="bold" fill="#94a3b8">O</text>

        <!-- Projections en pointillés (Triangle rectangle de Pythagore) -->
        <line x1="${ax}" y1="${ay}" x2="${cx}" y2="${cy}" stroke="#0284c7" stroke-width="1.5" stroke-dasharray="4,4"/>
        <line x1="${cx}" y1="${cy}" x2="${bx}" y2="${by}" stroke="#0284c7" stroke-width="1.5" stroke-dasharray="4,4"/>

        <!-- Angle droit en C si non aligné -->
        ${Math.abs(dx) > 0.1 && Math.abs(dy) > 0.1 ? `
          <rect x="${cx - (dx >= 0 ? 10 : -2)}" y="${cy - (dy >= 0 ? 10 : -2)}" width="8" height="8" fill="none" stroke="#0284c7" stroke-width="1.2"/>
        ` : ''}

        <!-- Segment hypoténuse [AB] -->
        <line x1="${ax}" y1="${ay}" x2="${bx}" y2="${by}" stroke="#0284c7" stroke-width="3"/>

        <!-- Sommet A -->
        <circle cx="${ax}" cy="${ay}" r="5.5" fill="#0284c7" stroke="#ffffff" stroke-width="2"/>
        <text x="${ax + (ax > bx ? 8 : -8)}" y="${ay + (ay > by ? 16 : -8)}" font-size="11" font-weight="bold" fill="#0369a1" text-anchor="${ax > bx ? 'start' : 'end'}">A(${xa}, ${ya})</text>

        <!-- Sommet B -->
        <circle cx="${bx}" cy="${by}" r="5.5" fill="#0369a1" stroke="#ffffff" stroke-width="2"/>
        <text x="${bx + (bx >= ax ? 8 : -8)}" y="${by + (by >= ay ? 16 : -8)}" font-size="11" font-weight="bold" fill="#0369a1" text-anchor="${bx >= ax ? 'start' : 'end'}">B(${xb}, ${yb})</text>

        <!-- Badge de distance au milieu de l'hypoténuse -->
        <g transform="translate(${(ax + bx) / 2}, ${(ay + by) / 2 - 12})">
          <rect x="-35" y="-11" width="70" height="20" rx="10" fill="#0284c7" fill-opacity="0.95"/>
          <text x="0" y="3" font-size="10.5" font-weight="bold" fill="#ffffff" text-anchor="middle">d = ${dist.toFixed(2)}</text>
        </g>
      </svg>`;
    }

    const pa = Math.max(0.1, parseFloat(getEl('par-a')?.value) || 0);
    const pb = Math.max(0.1, parseFloat(getEl('par-b')?.value) || 0);
    let pdeg = parseFloat(getEl('par-deg')?.value);
    if (isNaN(pdeg) || pdeg <= 0) pdeg = 1;
    if (pdeg >= 180) pdeg = 179;

    const prad = (pdeg * Math.PI) / 180;
    const ph = pb * Math.sin(prad);
    const parea = pa * ph;

    const parOut = getEl('par-out');
    if (parOut) {
      parOut.innerHTML = `Hauteur h = b &times; sin(&theta;) = <strong>${ph.toFixed(2)}</strong> | Aire = a &times; h = <strong>${parea.toFixed(2)}</strong>`;
    }

    const parSvgContainer = getEl('par-svg-preview');
    if (parSvgContainer) {
      const maxW = 240;
      const maxH = 115;
      const rawDx = pb * Math.cos(prad);
      const rawW = pa + Math.abs(rawDx);
      const rawH = ph;

      const scale = Math.min(maxW / Math.max(0.1, rawW), maxH / Math.max(0.1, rawH));
      const aPx = Math.max(25, pa * scale);
      const bPx = Math.max(20, pb * scale);
      const hPx = Math.max(15, ph * scale);
      const dxPx = bPx * Math.cos(prad);

      const startX = Math.round((360 - (aPx + dxPx)) / 2);
      const startY = Math.round((200 + hPx) / 2 + 5);

      const p1 = { x: startX, y: startY };
      const p2 = { x: startX + aPx, y: startY };
      const p3 = { x: startX + aPx + dxPx, y: startY - hPx };
      const p4 = { x: startX + dxPx, y: startY - hPx };

      // Arc d'angle
      const arcR = Math.min(26, Math.max(12, Math.min(aPx * 0.35, bPx * 0.35)));
      const arcStartX = p1.x + arcR;
      const arcStartY = p1.y;
      const arcEndX = p1.x + arcR * Math.cos(prad);
      const arcEndY = p1.y - arcR * Math.sin(prad);
      const arcPath = `M ${arcStartX},${arcStartY} A ${arcR} ${arcR} 0 0 0 ${arcEndX.toFixed(1)},${arcEndY.toFixed(1)}`;

      // Position texte angle
      const textAngleDist = arcR + 14;
      const angleTextX = p1.x + textAngleDist * Math.cos(prad / 2);
      const angleTextY = p1.y - textAngleDist * Math.sin(prad / 2);

      // Hauteur h et projection
      const footX = p4.x;
      const footY = p1.y;
      let extraBaseline = '';
      if (footX < p1.x) {
        extraBaseline = `<line x1="${footX.toFixed(1)}" y1="${footY}" x2="${p1.x}" y2="${footY}" stroke="#dc2626" stroke-width="1.5" stroke-dasharray="3,3"/>`;
      } else if (footX > p2.x) {
        extraBaseline = `<line x1="${p2.x}" y1="${footY}" x2="${footX.toFixed(1)}" y2="${footY}" stroke="#dc2626" stroke-width="1.5" stroke-dasharray="3,3"/>`;
      }

      // Symbole d'angle droit
      const sq = 8;
      const rightAngleSymbol = footX >= p1.x && footX <= p2.x
        ? `<path d="M ${footX},${footY - sq} L ${footX + sq},${footY - sq} L ${footX + sq},${footY}" fill="none" stroke="#dc2626" stroke-width="1.2"/>`
        : `<path d="M ${footX},${footY - sq} L ${footX + (footX < p1.x ? sq : -sq)},${footY - sq} L ${footX + (footX < p1.x ? sq : -sq)},${footY}" fill="none" stroke="#dc2626" stroke-width="1.2"/>`;

      // Position de l'étiquette centrale de l'aire
      const centerX = Math.round((p1.x + p2.x + p3.x + p4.x) / 4);
      const centerY = Math.round((p1.y + p2.y + p3.y + p4.y) / 4);

      // Libellé du côté b
      const bMidX = (p1.x + p4.x) / 2;
      const bMidY = (p1.y + p4.y) / 2;

      parSvgContainer.innerHTML = `<svg viewBox="0 0 360 220" class="w-100" style="max-height: 220px;">
        <defs>
          <marker id="par-arrow-end" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto">
            <path d="M 0 1.5 L 10 5 L 0 8.5 z" fill="#7c3aed"/>
          </marker>
          <marker id="par-arrow-start" viewBox="0 0 10 10" refX="2" refY="5" markerWidth="6" markerHeight="6" orient="auto">
            <path d="M 10 1.5 L 0 5 L 10 8.5 z" fill="#7c3aed"/>
          </marker>
        </defs>

        <!-- Tracé du parallélogramme -->
        <polygon points="${p1.x.toFixed(1)},${p1.y.toFixed(1)} ${p2.x.toFixed(1)},${p2.y.toFixed(1)} ${p3.x.toFixed(1)},${p3.y.toFixed(1)} ${p4.x.toFixed(1)},${p4.y.toFixed(1)}" 
          fill="#ede9fe" stroke="#7c3aed" stroke-width="2.5" stroke-linejoin="round"/>

        <!-- Extension de la base si projection extérieure -->
        ${extraBaseline}

        <!-- Hauteur h (pointillés rouges) -->
        <line x1="${p4.x.toFixed(1)}" y1="${p4.y.toFixed(1)}" x2="${footX.toFixed(1)}" y2="${footY.toFixed(1)}" 
          stroke="#dc2626" stroke-width="2" stroke-dasharray="4,3"/>
        ${rightAngleSymbol}
        <text x="${(footX + (dxPx >= 0 ? 6 : -6)).toFixed(1)}" y="${((p4.y + footY) / 2).toFixed(1)}" 
          font-family="sans-serif" font-size="11" font-weight="bold" fill="#dc2626" text-anchor="${dxPx >= 0 ? 'start' : 'end'}">h = ${ph.toFixed(2)}</text>

        <!-- Arc d'angle et libellé de l'angle -->
        <path d="${arcPath}" fill="none" stroke="#6d28d9" stroke-width="2"/>
        <text x="${angleTextX.toFixed(1)}" y="${angleTextY.toFixed(1)}" 
          font-family="sans-serif" font-size="11" font-weight="bold" fill="#6d28d9" text-anchor="middle">&theta; = ${pdeg}&deg;</text>

        <!-- Cotation base a -->
        <line x1="${p1.x.toFixed(1)}" y1="${(p1.y + 16).toFixed(1)}" x2="${p2.x.toFixed(1)}" y2="${(p2.y + 16).toFixed(1)}" 
          stroke="#7c3aed" stroke-width="1.5" marker-start="url(#par-arrow-start)" marker-end="url(#par-arrow-end)"/>
        <text x="${((p1.x + p2.x) / 2).toFixed(1)}" y="${(p1.y + 30).toFixed(1)}" 
          font-family="sans-serif" font-size="12" font-weight="bold" fill="#5b21b6" text-anchor="middle">Base a = ${pa}</text>

        <!-- Libellé côté b -->
        <text x="${(bMidX - 10).toFixed(1)}" y="${bMidY.toFixed(1)}" 
          font-family="sans-serif" font-size="12" font-weight="bold" fill="#5b21b6" text-anchor="end">b = ${pb}</text>

        <!-- Badge central Aire -->
        <rect x="${centerX - 60}" y="${centerY - 13}" width="120" height="24" rx="6" fill="#ffffff" fill-opacity="0.9" stroke="#7c3aed" stroke-width="1"/>
        <text x="${centerX}" y="${centerY + 4}" 
          font-family="sans-serif" font-size="11" font-weight="bold" fill="#4c1d95" text-anchor="middle">Aire = ${parea.toFixed(2)}</text>
      </svg>`;
    }

    const ea = Math.max(0.1, parseFloat(getEl('ell-a')?.value) || 0);
    const eb = Math.max(0.1, parseFloat(getEl('ell-b')?.value) || 0);
    const ellOut = getEl('ell-out');
    if (ellOut) ellOut.innerHTML = `Aire = <strong>${(ea * eb * Math.PI).toFixed(2)}</strong>`;

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

        <ellipse cx="${cx}" cy="${cy}" rx="${rx}" ry="${ry}" fill="#ecfdf5" stroke="#059669" stroke-width="2.5"/>

        <circle cx="${cx}" cy="${cy}" r="3" fill="#047857"/>

        <line x1="${cx}" y1="${cy}" x2="${cx + rx}" y2="${cy}" stroke="#059669" stroke-width="2" stroke-dasharray="4,3" marker-start="url(#ell-arrow-start)" marker-end="url(#ell-arrow-end)"/>
        <text x="${cx + rx / 2}" y="${cy + 18}" text-anchor="middle" font-family="sans-serif" font-size="12" font-weight="bold" fill="#047857">a = ${ea}</text>

        <line x1="${cx}" y1="${cy}" x2="${cx}" y2="${cy - ry}" stroke="#059669" stroke-width="2" stroke-dasharray="4,3" marker-start="url(#ell-arrow-start)" marker-end="url(#ell-arrow-end)"/>
        <text x="${cx - 14}" y="${cy - ry / 2 + 4}" text-anchor="end" font-family="sans-serif" font-size="12" font-weight="bold" fill="#047857">b = ${eb}</text>

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

    const resSvgContainer = getEl('res-svg-preview');
    if (resSvgContainer) {
      const topY = 25;
      const restLen = 45;
      const stretchPx = Math.min(85, Math.max(15, rx2 * 450));
      const springBottomY = topY + restLen + stretchPx;

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

        <rect x="80" y="8" width="140" height="8" fill="#475569" rx="2"/>
        <line x1="80" y1="16" x2="220" y2="16" stroke="#1e293b" stroke-width="2"/>
        <line x1="150" y1="16" x2="150" y2="${topY}" stroke="#334155" stroke-width="3"/>

        <path d="${pathD}" fill="none" stroke="#0284c7" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>

        <rect x="${massBoxX}" y="${massBoxY}" width="${massBoxW}" height="${massBoxH}" rx="6" fill="#fef2f2" stroke="#dc2626" stroke-width="2.5"/>
        <text x="150" y="${massBoxY + 18}" text-anchor="middle" font-family="sans-serif" font-size="12" font-weight="bold" fill="#991b1b">m = ${rm} kg</text>
        <text x="150" y="${massBoxY + 34}" text-anchor="middle" font-family="sans-serif" font-size="11" font-weight="bold" fill="#b91c1c">k = ${k.toFixed(1)} N/m</text>

        <line x1="150" y1="${massBoxY + massBoxH}" x2="150" y2="${massBoxY + massBoxH + weightVectorLen}" stroke="#ef4444" stroke-width="2.5" marker-end="url(#res-arrow-red)"/>
        <text x="165" y="${massBoxY + massBoxH + weightVectorLen - 5}" font-family="sans-serif" font-size="11" font-weight="bold" fill="#dc2626">P = ${(rm * 10).toFixed(1)} N</text>

        <line x1="220" y1="${topY + restLen}" x2="220" y2="${springBottomY}" stroke="#dc2626" stroke-width="1.5" stroke-dasharray="4,3" marker-start="url(#res-arrow-dim-start)" marker-end="url(#res-arrow-dim-end)"/>
        <text x="228" y="${(topY + restLen + springBottomY) / 2 + 4}" font-family="sans-serif" font-size="12" font-weight="bold" fill="#dc2626">x = ${rx2} m</text>
        <line x1="165" y1="${topY + restLen}" x2="230" y2="${topY + restLen}" stroke="#94a3b8" stroke-width="1" stroke-dasharray="3,3"/>
      </svg>`;
    }

    // Exercice 8 : Formule de Héron (Triangle quelconque)
    const ha = Math.max(0.01, parseFloat(getEl('her-a')?.value) || 0);
    const hb = Math.max(0.01, parseFloat(getEl('her-b')?.value) || 0);
    const hc = Math.max(0.01, parseFloat(getEl('her-c')?.value) || 0);

    const herOut = getEl('her-out');
    const herSvg = getEl('her-svg-preview');

    const isTriangle = (ha + hb > hc) && (ha + hc > hb) && (hb + hc > ha);

    if (!isTriangle) {
      if (herOut) {
        herOut.className = 'alert alert-danger mb-0 fs-6 text-center';
        herOut.style.backgroundColor = '';
        herOut.style.borderColor = '';
        herOut.style.color = '';
        herOut.innerHTML = `⚠️ <strong>Inégalité triangulaire non respectée !</strong> La somme de deux côtés doit toujours être strictement supérieure au troisième (ex: ${ha} + ${hb} > ${hc}). Ce triangle ne peut exister dans le plan.`;
      }
      if (herSvg) {
        herSvg.innerHTML = `<div class="p-4 text-center text-muted"><p class="mb-0">⚠️ Impossible de tracer un triangle avec ces longueurs.<br>Veuillez modifier les côtés pour respecter l'inégalité triangulaire.</p></div>`;
      }
    } else {
      const hp = (ha + hb + hc) / 2;
      const product = hp * (hp - ha) * (hp - hb) * (hp - hc);
      const harea = Math.sqrt(Math.max(0, product));

      if (herOut) {
        herOut.className = 'alert alert-light border mb-0 fs-5 text-center';
        herOut.style.backgroundColor = '#eef2ff';
        herOut.style.borderColor = '#c7d2fe';
        herOut.style.color = '#3730a3';
        herOut.innerHTML = `Demi-périmètre p = (${ha} + ${hb} + ${hc}) / 2 = <strong>${hp.toFixed(2)}</strong><br>Aire S = &radic;[${hp.toFixed(2)} &times; ${(hp - ha).toFixed(2)} &times; ${(hp - hb).toFixed(2)} &times; ${(hp - hc).toFixed(2)}] = <strong>${harea.toFixed(3)}</strong>`;
      }

      if (herSvg) {
        // Formule d'Al-Kashi pour l'angle en A : a² = b² + c² - 2bc*cos(A)
        const cosA = (hb * hb + hc * hc - ha * ha) / (2 * hb * hc);
        const clampedCosA = Math.max(-1, Math.min(1, cosA));
        const angleA = Math.acos(clampedCosA);

        const ax0 = 0;
        const ay0 = 0;
        const bx0 = hc;
        const by0 = 0;
        const cx0 = hb * Math.cos(angleA);
        const cy0 = hb * Math.sin(angleA);

        const minX = Math.min(ax0, bx0, cx0);
        const maxX = Math.max(ax0, bx0, cx0);
        const minY = 0;
        const maxY = cy0;

        const w = Math.max(0.1, maxX - minX);
        const h = Math.max(0.1, maxY - minY);

        const svgW = 380;
        const svgH = 200;
        const padX = 45;
        const padY = 32;

        const scale = Math.min((svgW - 2 * padX) / w, (svgH - 2 * padY) / h);

        const offsetX = (svgW - w * scale) / 2 - minX * scale;
        const offsetY = svgH - padY;

        const ptAx = ax0 * scale + offsetX;
        const ptAy = offsetY - ay0 * scale;
        const ptBx = bx0 * scale + offsetX;
        const ptBy = offsetY - by0 * scale;
        const ptCx = cx0 * scale + offsetX;
        const ptCy = offsetY - cy0 * scale;

        herSvg.innerHTML = `<svg viewBox="0 0 ${svgW} ${svgH}" class="w-100" style="max-height: 210px;">
          <defs>
            <linearGradient id="heron-grad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stop-color="#4f46e5" stop-opacity="0.18"/>
              <stop offset="100%" stop-color="#818cf8" stop-opacity="0.08"/>
            </linearGradient>
            <filter id="heron-glow" x="-10%" y="-10%" width="120%" height="120%">
              <feDropShadow dx="0" dy="1" stdDeviation="2" flood-color="#4f46e5" flood-opacity="0.2"/>
            </filter>
          </defs>

          <!-- Surface du triangle -->
          <polygon points="${ptAx},${ptAy} ${ptBx},${ptBy} ${ptCx},${ptCy}" fill="url(#heron-grad)" stroke="#4f46e5" stroke-width="2.5" stroke-linejoin="round" filter="url(#heron-glow)"/>

          <!-- Sommets A, B, C -->
          <circle cx="${ptAx}" cy="${ptAy}" r="5" fill="#4f46e5" stroke="#ffffff" stroke-width="2"/>
          <text x="${ptAx - 12}" y="${ptAy + 16}" font-size="12" font-weight="bold" fill="#3730a3">A</text>

          <circle cx="${ptBx}" cy="${ptBy}" r="5" fill="#4f46e5" stroke="#ffffff" stroke-width="2"/>
          <text x="${ptBx + 8}" y="${ptBy + 16}" font-size="12" font-weight="bold" fill="#3730a3">B</text>

          <circle cx="${ptCx}" cy="${ptCy}" r="5" fill="#4f46e5" stroke="#ffffff" stroke-width="2"/>
          <text x="${ptCx}" y="${ptCy - 10}" font-size="12" font-weight="bold" fill="#3730a3" text-anchor="middle">C</text>

          <!-- Longueurs des côtés c, b, a -->
          <text x="${(ptAx + ptBx) / 2}" y="${ptAy + 18}" font-size="11" font-weight="bold" fill="#4338ca" text-anchor="middle">c = ${hc}</text>
          <text x="${(ptAx + ptCx) / 2 - 12}" y="${(ptAy + ptCy) / 2}" font-size="11" font-weight="bold" fill="#4338ca" text-anchor="end">b = ${hb}</text>
          <text x="${(ptBx + ptCx) / 2 + 12}" y="${(ptBy + ptCy) / 2}" font-size="11" font-weight="bold" fill="#4338ca" text-anchor="start">a = ${ha}</text>

          <!-- Badge d'aire au centre de gravité -->
          <g transform="translate(${(ptAx + ptBx + ptCx) / 3}, ${(ptAy + ptBy + ptCy) / 3})">
            <rect x="-42" y="-11" width="84" height="22" rx="11" fill="#4f46e5" fill-opacity="0.92"/>
            <text x="0" y="3" font-size="10" font-weight="bold" fill="#ffffff" text-anchor="middle">Aire: ${harea.toFixed(2)}</text>
          </g>
        </svg>`;
      }
    }
  };
  document.addEventListener('input', (e) => {
    if (e.target.id === 'par-deg') {
      const slider = getEl('par-deg-range');
      if (slider) slider.value = e.target.value;
    } else if (e.target.id === 'par-deg-range') {
      const numInput = getEl('par-deg');
      if (numInput) numInput.value = e.target.value;
    }
    if (['dist-xa', 'dist-ya', 'dist-xb', 'dist-yb', 'par-a', 'par-b', 'par-deg', 'par-deg-range', 'ell-a', 'ell-b', 'moy-ng', 'moy-ns', 'res-m', 'res-x', 'her-a', 'her-b', 'her-c'].includes(e.target.id)) {
      updateModule2Calcs();
    }
  });
  updateModule2Calcs();
});
