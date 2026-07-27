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

        <rect x="${startX}" y="${startY}" width="${drawW}" height="${drawH}" rx="5" fill="#e0f2fe" stroke="#0284c7" stroke-width="2.5"/>

        <line x1="${startX}" y1="${startY - 8}" x2="${startX + drawW}" y2="${startY - 8}" stroke="#0284c7" stroke-width="1.5" marker-start="url(#rec-arrow-start)" marker-end="url(#rec-arrow-end)"/>
        <text x="${startX + drawW / 2}" y="${startY - 13}" text-anchor="middle" font-family="sans-serif" font-size="12" font-weight="bold" fill="#0369a1">Longueur x = ${rx}</text>

        <line x1="${startX - 8}" y1="${startY}" x2="${startX - 8}" y2="${startY + drawH}" stroke="#0284c7" stroke-width="1.5" marker-start="url(#rec-arrow-start)" marker-end="url(#rec-arrow-end)"/>
        <text x="${startX - 14}" y="${startY + drawH / 2 + 4}" text-anchor="end" font-family="sans-serif" font-size="12" font-weight="bold" fill="#0369a1">Largeur y = ${ry}</text>

        <text x="${startX + drawW / 2}" y="${startY + drawH / 2 + 4}" text-anchor="middle" font-family="sans-serif" font-size="11" font-weight="bold" fill="#0c4a6e">Aire: ${(rx * ry).toFixed(2)}</text>
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
  };
  document.addEventListener('input', (e) => {
    if (['rec-x', 'rec-y', 'ell-a', 'ell-b', 'moy-ng', 'moy-ns', 'res-m', 'res-x'].includes(e.target.id)) {
      updateModule2Calcs();
    }
  });
  updateModule2Calcs();
});
