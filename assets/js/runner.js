/**
 * Antigravity Interactive Code & Algorithm Runner - Vue / Vanilla JS
 * Enseignant: Mohamed Anis MANI - Cours Informatique 2e Sciences
 */

class AlgoPythonRunner {
  static runCode(codeText, inputValues = [], lang = 'python') {
    let logs = [];
    let errors = [];
    let inputsCopy = [...inputValues];
    
    // Custom print capturing
    const customPrint = (...args) => {
      logs.push(args.map(a => typeof a === 'object' ? JSON.stringify(a) : String(a)).join(' '));
    };

    // Custom input capturing
    const customInput = (promptMsg = '') => {
      if (promptMsg) logs.push(promptMsg);
      if (inputsCopy.length > 0) {
        let val = inputsCopy.shift();
        logs.push(`> Input: ${val}`);
        return val;
      }
      return '0';
    };

    // Built-in Python/Algo helpers in JS sandbox
    const ent = (x) => Math.trunc(Number(x));
    const int = (x) => Math.trunc(Number(x));
    const float = (x) => Number(x);
    const str = (x) => String(x);
    const len = (x) => x.length;
    const abs = (x) => Math.abs(Number(x));
    const round = (x) => Math.round(Number(x));
    const sqrt = (x) => Math.sqrt(Number(x));
    const randint = (a, b) => Math.floor(Math.random() * (b - a + 1)) + a;
    const ord = (c) => String(c).charCodeAt(0);
    const chr = (code) => String.fromCharCode(Number(code));
    const majus = (s) => String(s).toUpperCase();

    try {
      if (lang === 'algorithm' || codeText.includes('Algorithme') || codeText.includes('Début')) {
        // Simple transpile algorithm pseudo-code to JS
        let jsCode = codeText
          .replace(/\/\/.*/g, '')
          .replace(/Algorithme\s+\w+/gi, '')
          .replace(/Début/gi, '{')
          .replace(/Fin/gi, '}')
          .replace(/Ecrire\s*\((.*?)\)/gi, 'print($1)')
          .replace(/Lire\s*\((.*?)\)/gi, '$1 = input()')
          .replace(/←/g, '=')
          .replace(/\bdiv\b/gi, '/')
          .replace(/\bmod\b/gi, '%')
          .replace(/Si\s+(.*?)\s+Alors/gi, 'if ($1) {')
          .replace(/Sinon\s+Si\s+(.*?)\s+Alors/gi, '} else if ($1) {')
          .replace(/Sinon/gi, '} else {')
          .replace(/Fin\s+Si/gi, '}')
          .replace(/Pour\s+(\w+)\s+de\s+(.*?)\s+à\s+(.*?)\s+Faire/gi, 'for (let $1 = $2; $1 <= $3; $1++) {')
          .replace(/Fin\s+Pour/gi, '}');
        
        let runnerFunc = new Function(
          'print', 'input', 'ent', 'int', 'float', 'str', 'len', 'abs', 'round', 'sqrt', 'randint', 'ord', 'chr', 'majus',
          jsCode
        );
        runnerFunc(customPrint, customInput, ent, int, float, str, len, abs, round, sqrt, randint, ord, chr, majus);
      } else {
        // Python transpile to JS for basic expressions
        let jsPy = codeText
          .replace(/#.*/g, '')
          .replace(/print\s*\((.*?)\)/g, 'print($1)')
          .replace(/(\w+)\s*=\s*input\((.*?)\)/g, '$1 = input($2)')
          .replace(/int\(input\((.*?)\)\)/g, 'int(input($1))')
          .replace(/float\(input\((.*?)\)\)/g, 'float(input($1))')
          .replace(/and/g, '&&')
          .replace(/or/g, '||')
          .replace(/not/g, '!')
          .replace(/for\s+(\w+)\s+in\s+range\((.*?)\):/g, (match, v, rangeArgs) => {
            let parts = rangeArgs.split(',').map(s => s.trim());
            if (parts.length === 1) return `for (let ${v} = 0; ${v} < ${parts[0]}; ${v}++) {`;
            if (parts.length === 2) return `for (let ${v} = ${parts[0]}; ${v} < ${parts[1]}; ${v}++) {`;
            if (parts.length === 3) return `for (let ${v} = ${parts[0]}; ${parts[2]} > 0 ? ${v} < ${parts[1]} : ${v} > ${parts[1]}; ${v} += ${parts[2]}) {`;
            return match;
          });
        
        let runnerFunc = new Function(
          'print', 'input', 'ent', 'int', 'float', 'str', 'len', 'abs', 'round', 'sqrt', 'randint', 'ord', 'chr', 'majus',
          jsPy
        );
        runnerFunc(customPrint, customInput, ent, int, float, str, len, abs, round, sqrt, randint, ord, chr, majus);
      }
    } catch (err) {
      errors.push(err.message);
    }

    return {
      output: logs.join('\n'),
      error: errors.join('\n')
    };
  }
}

// Global hook for execution buttons (Vanilla JS + Vue support)
document.addEventListener('DOMContentLoaded', () => {
  document.addEventListener('click', (e) => {
    const btn = e.target.closest('.btn-run-code');
    if (!btn) return;
    
    const targetId = btn.dataset.target;
    const inputId = btn.dataset.input;
    const outputId = btn.dataset.output;
    const lang = btn.dataset.lang || 'python';
    
    const targetEl = document.getElementById(targetId);
    if (!targetEl) return;
    
    const code = targetEl.value || targetEl.textContent || '';
    
    let rawInputs = [];
    if (inputId) {
      const inputParts = inputId.split(',').map(id => id.trim());
      inputParts.forEach(id => {
        const el = document.getElementById(id);
        if (el) {
          const val = el.value || el.textContent || '';
          if (val) rawInputs.push(val);
        }
      });
    }
    
    const result = AlgoPythonRunner.runCode(code, rawInputs, lang);
    const outEl = document.getElementById(outputId);
    if (outEl) {
      outEl.classList.remove('d-none');
      if (result.error) {
        outEl.innerHTML = `<div class="alert alert-danger mb-0"><strong>⚠️ Erreur :</strong> ${result.error}</div>`;
      } else {
        outEl.innerHTML = `<div class="alert alert-success mb-0"><strong>Console :</strong><pre class="mb-0 text-dark">${result.output || '(Aucun affichage)'}</pre></div>`;
      }
    }
  });
});
