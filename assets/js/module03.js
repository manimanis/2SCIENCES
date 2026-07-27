/**
 * Antigravity Interactive Modules Engine - Module 3 (Opérations & Expressions, Table ASCII, Portes Logiques)
 * Enseignant: Mohamed Anis MANI - Cours Informatique 2e Sciences
 */

if (typeof window.getEl !== 'function') {
  window.getEl = id => document.getElementById(id);
}

document.addEventListener('DOMContentLoaded', () => {

  // -------------------------------------------------------------
  // Module 3 Handlers
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
  // Recherche Interactive Table ASCII (Codes 32 à 127)
  // -------------------------------------------------------------
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
});
