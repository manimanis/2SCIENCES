/**
 * Antigravity Interactive Modules Engine - Modular Entry Point
 * Enseignant: Mohamed Anis MANI - Cours Informatique 2e Sciences
 */

// Global DOM helper function
if (typeof window.getEl !== 'function') {
  window.getEl = id => document.getElementById(id);
}

// Dynamically load modular JavaScript components in sequential order
(function loadModularScripts() {
  const scripts = [
    'assets/js/common.js',
    'assets/js/module01.js',
    'assets/js/module02.js',
    'assets/js/module03.js',
    'assets/js/module04.js',
    'assets/js/module05.js'
  ];

  scripts.forEach(src => {
    if (!document.querySelector(`script[src="${src}"]`)) {
      const script = document.createElement('script');
      script.src = src;
      script.async = false;
      document.head.appendChild(script);
    }
  });
})();
