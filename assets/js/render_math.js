/**
 * Antigravity LaTeX & Math Formulas Renderer (MathJax 3 + Native Fallback)
 * Enseignant: Mohamed Anis MANI - Cours Informatique 2e Sciences
 */

// 1. MathJax 3 Configuration
window.MathJax = {
  tex: {
    inlineMath: [['$', '$'], ['\\(', '\\)']],
    displayMath: [['$$', '$$'], ['\\[', '\\]']],
    processEscapes: true,
    processEnvironments: true
  },
  options: {
    ignoreHtmlClass: 'tex2jax_ignore',
    processHtmlClass: 'tex2jax_process'
  },
  svg: {
    fontCache: 'global'
  }
};

// 2. Native Fallback Math Parser for offline / instant rendering
function renderMathFallback() {
  const elements = document.querySelectorAll('p, div, span, td, th, li, strong, h3, h4, h5');
  elements.forEach(el => {
    if (el.children.length === 0 || Array.from(el.children).every(c => c.tagName === 'CODE' || c.tagName === 'STRONG')) {
      let html = el.innerHTML;
      if (html.includes('$$')) {
        html = html.replace(/\$\$(.*?)\$\$/g, (match, formula) => {
          let clean = formula
            .replace(/\\text\{([^}]+)\}/g, '<span style="font-family: sans-serif; font-style: normal;">$1</span>')
            .replace(/\\cdot/g, ' &middot; ')
            .replace(/\\pi/g, '&pi;')
            .replace(/\\bar\{([^}]+)\}/g, '<span style="text-decoration: overline;">$1</span>')
            .replace(/(\w+)\^2/g, '$1&sup2;')
            .replace(/\\times/g, '&times;');
          return `<span class="math-formula d-inline-block px-2 py-1 bg-light border rounded text-primary font-monospace fw-bold fs-5">${clean}</span>`;
        });
        el.innerHTML = html;
      }
    }
  });
}

// 3. Script Loader
document.addEventListener('DOMContentLoaded', () => {
  const script = document.createElement('script');
  script.src = 'assets/js/tex-svg.js';
  script.async = true;
  script.onerror = () => {
    console.warn('MathJax CDN indisponible, activation du rendu mathématique de secours.');
    renderMathFallback();
  };
  script.onload = () => {
    if (window.MathJax && MathJax.typesetPromise) {
      MathJax.typesetPromise();
    }
  };
  document.head.appendChild(script);

  // Sécurité de secours si le chargement prend plus de 1.5 seconde
  setTimeout(() => {
    if (!document.querySelector('.MathJax') && !document.querySelector('svg[data-mml-node]')) {
      renderMathFallback();
    }
  }, 1500);
});
