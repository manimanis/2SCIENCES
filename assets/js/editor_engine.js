/**
 * Antigravity Code Editor Engine - Monaco Editor + Skulpt Python Execution Engine
 * Enseignant: Mohamed Anis MANI - Cours Informatique 2e Sciences
 */

class MonacoPythonEngine {
  constructor() {
    this.editors = new Map();
    this.wrappers = new Map();
    this.monacoLoaded = false;
    this.skulptLoaded = false;
    this.init();
  }

  async init() {
    // 1. Enhance playgrounds immediately so UI renders with 0ms delay
    this.enhancePlaygrounds();
    
    // 2. Load dependencies in background
    await this.loadDependencies();

    // 3. Upgrade to Monaco if loaded
    if (this.monacoLoaded && window.monaco) {
      this.upgradeAllToMonaco();
    }
  }

  loadDependencies() {
    return new Promise((resolve) => {
      let pending = 2;
      const checkDone = () => {
        pending--;
        if (pending <= 0) resolve();
      };

      // 1. Load Skulpt for Python execution
      if (window.Sk) {
        this.skulptLoaded = true;
        checkDone();
      } else {
        const scriptSk = document.createElement('script');
        scriptSk.src = 'https://cdn.jsdelivr.net/npm/skulpt@1.2.0/dist/skulpt.min.js';
        scriptSk.onload = () => {
          const scriptSkStd = document.createElement('script');
          scriptSkStd.src = 'https://cdn.jsdelivr.net/npm/skulpt@1.2.0/dist/skulpt-stdlib.js';
          scriptSkStd.onload = () => {
            this.skulptLoaded = true;
            checkDone();
          };
          scriptSkStd.onerror = () => checkDone();
          document.head.appendChild(scriptSkStd);
        };
        scriptSk.onerror = () => checkDone();
        document.head.appendChild(scriptSk);
      }

      // 2. Load Monaco Editor
      if (window.monaco) {
        this.monacoLoaded = true;
        this.registerPythonCompletions();
        checkDone();
      } else {
        const scriptMonaco = document.createElement('script');
        scriptMonaco.src = 'https://cdn.jsdelivr.net/npm/monaco-editor@0.45.0/min/vs/loader.js';
        scriptMonaco.onload = () => {
          if (window.require) {
            window.require.config({ paths: { 'vs': 'https://cdn.jsdelivr.net/npm/monaco-editor@0.45.0/min/vs' } });
            window.require(['vs/editor/editor.main'], () => {
              this.monacoLoaded = true;
              this.registerPythonCompletions();
              checkDone();
            });
          } else {
            checkDone();
          }
        };
        scriptMonaco.onerror = () => checkDone();
        document.head.appendChild(scriptMonaco);
      }
    });
  }

  registerPythonCompletions() {
    if (!window.monaco || this.completionsRegistered) return;
    this.completionsRegistered = true;

    window.monaco.languages.registerCompletionItemProvider('python', {
      triggerCharacters: ['.', ' ', 'i', 'f', 'p', 'n', 'm'],
      provideCompletionItems: (model, position) => {
        const word = model.getWordUntilPosition(position);
        const range = {
          startLineNumber: position.lineNumber,
          endLineNumber: position.lineNumber,
          startColumn: word.startColumn,
          endColumn: word.endColumn
        };

        const suggestions = [
          // --- SNIPPETS VS CODE ---
          {
            label: 'for ... in range()',
            kind: window.monaco.languages.CompletionItemKind.Snippet,
            insertText: 'for ${1:i} in range(${2:10}):\n\t${0:# Traitement}',
            insertTextRules: window.monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
            documentation: 'Boucle itérative avec range(n)',
            detail: 'Snippet: Boucle for simple',
            range: range
          },
          {
            label: 'for ... in range(start, stop, step)',
            kind: window.monaco.languages.CompletionItemKind.Snippet,
            insertText: 'for ${1:i} in range(${2:start}, ${3:stop}, ${4:step}):\n\t${0:# Traitement}',
            insertTextRules: window.monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
            documentation: 'Boucle itérative avec valeur initiale, finale et pas',
            detail: 'Snippet: Boucle for avec pas',
            range: range
          },
          {
            label: 'if ... else',
            kind: window.monaco.languages.CompletionItemKind.Snippet,
            insertText: 'if ${1:condition}:\n\t${2:pass}\nelse:\n\t${0:pass}',
            insertTextRules: window.monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
            documentation: 'Structure conditionnelle alternative (Si / Sinon)',
            detail: 'Snippet: Condition if / else',
            range: range
          },
          {
            label: 'if ... elif ... else',
            kind: window.monaco.languages.CompletionItemKind.Snippet,
            insertText: 'if ${1:condition1}:\n\t${2:pass}\nelif ${3:condition2}:\n\t${4:pass}\nelse:\n\t${0:pass}',
            insertTextRules: window.monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
            documentation: 'Structure conditionnelle généralisée',
            detail: 'Snippet: Condition if / elif / else',
            range: range
          },
          {
            label: 'def fonction()',
            kind: window.monaco.languages.CompletionItemKind.Snippet,
            insertText: 'def ${1:nom_fonction}(${2:params}):\n\t"""${3:Description de la fonction}"""\n\t${0:return None}',
            insertTextRules: window.monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
            documentation: 'Définition d\'une fonction Python',
            detail: 'Snippet: Définition de fonction',
            range: range
          },
          {
            label: 'try ... except',
            kind: window.monaco.languages.CompletionItemKind.Snippet,
            insertText: 'try:\n\t${1:pass}\nexcept ${2:Exception} as ${3:e}:\n\t${0:print(e)}',
            insertTextRules: window.monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
            documentation: 'Gestion des exceptions et des erreurs',
            detail: 'Snippet: Bloc try / except',
            range: range
          },
          {
            label: 'import numpy as np',
            kind: window.monaco.languages.CompletionItemKind.Snippet,
            insertText: 'import numpy as np\n',
            insertTextRules: window.monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
            documentation: 'Importation de la bibliothèque NumPy',
            detail: 'Snippet: Import NumPy',
            range: range
          },
          {
            label: 'import pandas as pd',
            kind: window.monaco.languages.CompletionItemKind.Snippet,
            insertText: 'import pandas as pd\n',
            insertTextRules: window.monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
            documentation: 'Importation de la bibliothèque Pandas',
            detail: 'Snippet: Import Pandas',
            range: range
          },
          {
            label: 'import matplotlib.pyplot as plt',
            kind: window.monaco.languages.CompletionItemKind.Snippet,
            insertText: 'import matplotlib.pyplot as plt\n',
            insertTextRules: window.monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
            documentation: 'Importation de la bibliothèque Matplotlib',
            detail: 'Snippet: Import Matplotlib',
            range: range
          },

          // --- PYTHON BUILT-INS AUTOCOMPLETE ---
          {
            label: 'print',
            kind: window.monaco.languages.CompletionItemKind.Function,
            insertText: 'print(${1:valeur})',
            insertTextRules: window.monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
            documentation: 'Affiche un message ou une valeur à l\'écran',
            detail: 'print(value, ...)',
            range: range
          },
          {
            label: 'input',
            kind: window.monaco.languages.CompletionItemKind.Function,
            insertText: 'input("${1:Saisir une valeur : }")',
            insertTextRules: window.monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
            documentation: 'Demande une saisie utilisateur (renvoie une chaîne)',
            detail: 'input(prompt)',
            range: range
          },
          {
            label: 'int',
            kind: window.monaco.languages.CompletionItemKind.Function,
            insertText: 'int(${1:x})',
            insertTextRules: window.monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
            documentation: 'Convertit une valeur en nombre entier',
            detail: 'int(x)',
            range: range
          },
          {
            label: 'float',
            kind: window.monaco.languages.CompletionItemKind.Function,
            insertText: 'float(${1:x})',
            insertTextRules: window.monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
            documentation: 'Convertit une valeur en nombre réel (flottant)',
            detail: 'float(x)',
            range: range
          },
          {
            label: 'str',
            kind: window.monaco.languages.CompletionItemKind.Function,
            insertText: 'str(${1:x})',
            insertTextRules: window.monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
            documentation: 'Convertit une valeur en chaîne de caractères',
            detail: 'str(x)',
            range: range
          },
          {
            label: 'len',
            kind: window.monaco.languages.CompletionItemKind.Function,
            insertText: 'len(${1:objet})',
            insertTextRules: window.monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
            documentation: 'Renvoie le nombre d\'éléments (longueur)',
            detail: 'len(s)',
            range: range
          },
          {
            label: 'range',
            kind: window.monaco.languages.CompletionItemKind.Function,
            insertText: 'range(${1:stop})',
            insertTextRules: window.monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
            documentation: 'Génère une séquence de nombres entiers',
            detail: 'range(start, stop, step)',
            range: range
          },
          {
            label: 'type',
            kind: window.monaco.languages.CompletionItemKind.Function,
            insertText: 'type(${1:objet})',
            insertTextRules: window.monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
            documentation: 'Renvoie le type d\'un objet',
            detail: 'type(object)',
            range: range
          },

          // --- NUMPY AUTOCOMPLETE ---
          {
            label: 'np.array',
            kind: window.monaco.languages.CompletionItemKind.Method,
            insertText: 'np.array([${1:1, 2, 3}])',
            insertTextRules: window.monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
            documentation: 'Création d\'un tableau N-dimensionnel NumPy',
            detail: 'np.array(object)',
            range: range
          },
          {
            label: 'np.zeros',
            kind: window.monaco.languages.CompletionItemKind.Method,
            insertText: 'np.zeros(${1:shape})',
            insertTextRules: window.monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
            documentation: 'Tableau rempli de 0',
            detail: 'np.zeros(shape)',
            range: range
          },
          {
            label: 'np.ones',
            kind: window.monaco.languages.CompletionItemKind.Method,
            insertText: 'np.ones(${1:shape})',
            insertTextRules: window.monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
            documentation: 'Tableau rempli de 1',
            detail: 'np.ones(shape)',
            range: range
          },
          {
            label: 'np.mean',
            kind: window.monaco.languages.CompletionItemKind.Method,
            insertText: 'np.mean(${1:a})',
            insertTextRules: window.monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
            documentation: 'Calcul de la moyenne arithmétique',
            detail: 'np.mean(a)',
            range: range
          },
          {
            label: 'np.linspace',
            kind: window.monaco.languages.CompletionItemKind.Method,
            insertText: 'np.linspace(${1:start}, ${2:stop}, ${3:num})',
            insertTextRules: window.monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
            documentation: 'Nombres espacés de manière égale sur un intervalle',
            detail: 'np.linspace(start, stop, num)',
            range: range
          },

          // --- PANDAS AUTOCOMPLETE ---
          {
            label: 'pd.DataFrame',
            kind: window.monaco.languages.CompletionItemKind.Method,
            insertText: 'pd.DataFrame(${1:data})',
            insertTextRules: window.monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
            documentation: 'Création d\'un tableau de données 2D Pandas',
            detail: 'pd.DataFrame(data)',
            range: range
          },
          {
            label: 'df.describe',
            kind: window.monaco.languages.CompletionItemKind.Method,
            insertText: 'describe()',
            documentation: 'Résumé des statistiques descriptives',
            detail: 'df.describe()',
            range: range
          },

          // --- MATPLOTLIB AUTOCOMPLETE ---
          {
            label: 'plt.plot',
            kind: window.monaco.languages.CompletionItemKind.Method,
            insertText: 'plt.plot(${1:x}, ${2:y}, label="${3:label}", color="${4:#0284c7}")',
            insertTextRules: window.monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
            documentation: 'Tracer des lignes ou des marqueurs 2D',
            detail: 'plt.plot(x, y, ...)',
            range: range
          },
          {
            label: 'plt.show',
            kind: window.monaco.languages.CompletionItemKind.Method,
            insertText: 'plt.show()',
            documentation: 'Afficher les figures matplotlib dans le terminal',
            detail: 'plt.show()',
            range: range
          },
          {
            label: 'plt.title',
            kind: window.monaco.languages.CompletionItemKind.Method,
            insertText: 'plt.title("${1:Titre du graphique}")',
            insertTextRules: window.monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
            documentation: 'Définir le titre du graphique',
            detail: 'plt.title(label)',
            range: range
          },
          {
            label: 'plt.grid',
            kind: window.monaco.languages.CompletionItemKind.Method,
            insertText: 'plt.grid(True)',
            documentation: 'Activer la grille du graphique',
            detail: 'plt.grid(visible)',
            range: range
          }
        ];

        return { suggestions: suggestions };
      }
    });
  }


  enhancePlaygrounds() {
    const targets = document.querySelectorAll('textarea[data-monaco="true"], #playground-code, .monaco-target');
    targets.forEach(ta => this.convertTextareaToMonaco(ta));
  }

  convertTextareaToMonaco(textarea) {
    if (textarea.dataset.monacoInitialized) return;
    textarea.dataset.monacoInitialized = "true";

    const initialCode = textarea.value || textarea.placeholder || '# Code Python\nprint("Bonjour 2e Sciences !")';
    const containerId = 'monaco_container_' + Math.random().toString(36).substring(2, 9);
    
    const isFullHeight = textarea.dataset.fullHeight === "true" || textarea.id === "main-playground";

    // Create wrapper box
    const wrapper = document.createElement('div');
    if (isFullHeight) {
      wrapper.className = 'monaco-editor-wrapper flex-grow-1 d-flex flex-column shadow-sm border border-secondary rounded overflow-hidden m-0 w-100 h-100';
    } else {
      wrapper.className = 'monaco-editor-wrapper shadow-sm border rounded overflow-hidden my-3';
    }

    const codeAreaStyle = isFullHeight
      ? 'flex: 1 1 auto; min-height: 350px; height: 100%; width: 100%;'
      : 'height: 220px; min-height: 180px; width: 100%;';

    wrapper.innerHTML = `
      <div class="monaco-toolbar bg-dark text-white p-2 d-flex justify-content-between align-items-center border-bottom border-secondary flex-shrink-0" style="height: 44px; max-height: 44px; flex-shrink: 0;">

        <div class="d-flex align-items-center gap-2">
          <span class="badge bg-primary font-monospace">⚡ Monaco Editor</span>
          <span class="badge bg-success font-monospace">Python 3</span>
        </div>
        <div class="d-flex gap-2">
          <button class="btn btn-sm btn-success btn-run-monaco fw-bold px-3">
            ▶ Exécuter (Ctrl+Enter)
          </button>
          <button class="btn btn-sm btn-outline-light btn-clear-monaco">
            🗑️ Effacer
          </button>
        </div>
      </div>
      <div id="${containerId}" class="monaco-code-area" style="${codeAreaStyle}">
        <textarea class="form-control bg-dark text-warning font-monospace p-3 border-0 w-100 h-100" style="resize: none; font-size: 14px;">${this.escapeHtml(initialCode)}</textarea>
      </div>
      <div class="monaco-console-output bg-dark text-info font-monospace p-3 d-none border-top border-secondary flex-shrink-0" style="max-height: 200px; overflow-y: auto; font-size: 13px;">
        <div class="text-secondary small border-bottom border-secondary pb-1 mb-2">💻 Console d'exécution :</div>
        <pre class="console-text m-0" style="white-space: pre-wrap;"></pre>
      </div>
    `;

    textarea.parentNode.insertBefore(wrapper, textarea);
    textarea.style.display = 'none';

    const editorDiv = wrapper.querySelector(`#${containerId}`);
    const consoleOutput = wrapper.querySelector('.monaco-console-output');
    const consoleText = wrapper.querySelector('.console-text');
    const runBtn = wrapper.querySelector('.btn-run-monaco');
    const clearBtn = wrapper.querySelector('.btn-clear-monaco');

    this.wrappers.set(containerId, {
      textarea,
      editorDiv,
      initialCode,
      consoleOutput,
      consoleText,
      runBtn,
      clearBtn
    });

    const getCode = () => {
      const monacoInstance = this.editors.get(containerId);
      if (monacoInstance) return monacoInstance.getValue();
      const fb = editorDiv.querySelector('textarea');
      return fb ? fb.value : textarea.value;
    };

    runBtn.addEventListener('click', () => {
      this.runPythonCode(getCode(), consoleOutput, consoleText);
    });

    clearBtn.addEventListener('click', () => {
      consoleText.innerHTML = '';
      consoleOutput.classList.add('d-none');
    });

    // Try upgrading to Monaco right away if already loaded
    if (this.monacoLoaded && window.monaco) {
      this.attachMonaco(containerId);
    }
  }

  upgradeAllToMonaco() {
    this.wrappers.forEach((item, containerId) => {
      if (!this.editors.has(containerId)) {
        this.attachMonaco(containerId);
      }
    });
  }

  attachMonaco(containerId) {
    const item = this.wrappers.get(containerId);
    if (!item || !window.monaco) return;

    const { textarea, editorDiv, initialCode, consoleOutput, consoleText } = item;
    const currentVal = editorDiv.querySelector('textarea')?.value || initialCode;

    editorDiv.innerHTML = ''; // Clear fallback textarea

    const monacoInstance = window.monaco.editor.create(editorDiv, {
      value: currentVal,
      language: 'python',
      theme: 'vs-dark',
      automaticLayout: true,
      fontSize: 14,
      minimap: { enabled: false },
      scrollBeyondLastLine: false,
      lineNumbers: 'on',
      roundedSelection: true,
      scrollbar: { vertical: 'visible', horizontal: 'visible' }
    });

    monacoInstance.onDidChangeModelContent(() => {
      textarea.value = monacoInstance.getValue();
    });

    monacoInstance.addCommand(window.monaco.KeyMod.CtrlCmd | window.monaco.KeyCode.Enter, () => {
      this.runPythonCode(monacoInstance.getValue(), consoleOutput, consoleText);
    });

    this.editors.set(containerId, monacoInstance);

    // Trigger explicit layout calls on creation & container resize
    setTimeout(() => {
      if (monacoInstance) monacoInstance.layout();
    }, 50);

    if (window.ResizeObserver) {
      const ro = new ResizeObserver(() => {
        if (monacoInstance) monacoInstance.layout();
      });
      ro.observe(editorDiv);
    }
  }


  runPythonCode(code, outputContainer, outputText) {
    // Detect if code uses external scientific libraries (numpy, pandas, matplotlib, etc.)
    const scientificKeywords = ['numpy', 'np.', 'pandas', 'pd.', 'matplotlib', 'plt.', 'scipy', 'sympy', 'sklearn'];
    const needsPyodide = scientificKeywords.some(kw => code.includes(kw));

    if (needsPyodide) {
      this.runPyodideCode(code, outputContainer, outputText);
      return;
    }

    outputContainer.classList.remove('d-none');
    outputText.innerHTML = '<span class="text-warning">⏳ Exécution du code Python en cours...</span>\n';

    let logs = [];

    const outHandler = (text) => {
      logs.push(text);
    };

    const builtinRead = (x) => {
      if (window.Sk.builtinFiles === undefined || window.Sk.builtinFiles["files"][x] === undefined) {
        throw "Fichier introuvable: '" + x + "'";
      }
      return window.Sk.builtinFiles["files"][x];
    };

    if (this.skulptLoaded && window.Sk) {
      window.Sk.configure({
        output: outHandler,
        read: builtinRead,
        inputfun: (promptMsg) => {
          return window.prompt(promptMsg || "Entrée de données Python :");
        },
        inputfunTakesPrompt: true
      });

      window.Sk.misceval.asyncToPromise(() => {
        return window.Sk.importMainWithBody("<stdin>", false, code, true);
      }).then(() => {
        const resText = logs.join('');
        outputText.innerHTML = resText 
          ? `<span class="text-success fw-bold">--- Exécution réussie ---</span>\n${this.escapeHtml(resText)}` 
          : `<span class="text-muted">(Aucune sortie d'affichage)</span>`;
      }).catch((err) => {
        outputText.innerHTML = `<span class="text-danger fw-bold">⚠️ Erreur Python :</span>\n<span class="text-danger">${this.escapeHtml(err.toString())}</span>`;
      });
    } else {
      this.runPyodideCode(code, outputContainer, outputText);
    }
  }

  async runPyodideCode(code, outputContainer, outputText) {
    outputContainer.classList.remove('d-none');
    outputText.innerHTML = '<span class="text-warning">⏳ Initialisation du moteur Pyodide (Python WebAssembly)...</span>\n';

    try {
      if (!window.pyodideLoadingPromise) {
        // Temporarily unbind Monaco RequireJS AMD loader to avoid conflict with Pyodide dependencies
        const savedDefine = window.define;
        if (window.define && window.define.amd) {
          window.define = undefined;
        }

        if (!window.loadPyodide) {
          await new Promise((resolve, reject) => {
            const s = document.createElement('script');
            s.src = 'https://cdn.jsdelivr.net/pyodide/v0.25.0/full/pyodide.js';
            s.onload = () => resolve();
            s.onerror = () => {
              if (savedDefine) window.define = savedDefine;
              reject(new Error("Impossible de charger Pyodide CDN"));
            };
            document.head.appendChild(s);
          });
        }

        window.pyodideLoadingPromise = window.loadPyodide({
          indexURL: "https://cdn.jsdelivr.net/pyodide/v0.25.0/full/"
        }).finally(() => {
          if (savedDefine) window.define = savedDefine; // Restore Monaco AMD define loader
        });
      }

      const pyodide = await window.pyodideLoadingPromise;

      outputText.innerHTML = '<span class="text-warning">⏳ Analyse & chargement à la demande des bibliothèques nécessaires (NumPy, Pandas, Matplotlib...)...</span>\n';
      
      // Automatically detect and download imports in user's code on demand!
      await pyodide.loadPackagesFromImports(code);

      let logs = [];
      pyodide.setStdout({
        batched: (str) => logs.push(str)
      });
      pyodide.setStderr({
        batched: (str) => logs.push('⚠️ ' + str)
      });

      // Prepare Matplotlib graph capture code if matplotlib is used
      let pythonExecutionCode = code;
      const isMatplotlibUsed = code.includes('matplotlib') || code.includes('plt.');
      if (isMatplotlibUsed) {
        pythonExecutionCode = `
import io, base64
import matplotlib
matplotlib.use('Agg') # Use non-interactive Agg backend to prevent HTML DOM canvas injection

# Execute user code
${code}

# Guarantee automatic Matplotlib figure capture inside playground console window
try:
    import matplotlib.pyplot as plt
    fignums = plt.get_fignums()
    if fignums:
        for num in fignums:
            fig = plt.figure(num)
            buf = io.BytesIO()
            fig.savefig(buf, format='png', bbox_inches='tight', dpi=130)
            buf.seek(0)
            img_b64 = base64.b64encode(buf.read()).decode('utf-8')
            print(f"__MATPLOTLIB_IMG__data:image/png;base64,{img_b64}")
        plt.close('all')
except Exception:
    pass
`;
      }

      await pyodide.runPythonAsync(pythonExecutionCode);

      // Clean up any stray Pyodide Matplotlib DOM elements
      document.querySelectorAll('div[id^="matplotlib_"]').forEach(el => el.remove());


      const rawLogs = logs.join('\n');
      
      // Render text output and Matplotlib inline plot image if generated
      let renderedOutput = '';
      const lines = rawLogs.split('\n');
      lines.forEach(line => {
        if (line.includes('__MATPLOTLIB_IMG__')) {
          const imgSrc = line.replace('__MATPLOTLIB_IMG__', '').trim();
          renderedOutput += `\n<div class="my-3 text-center"><div class="badge bg-primary font-monospace mb-2">📈 Graphique Matplotlib</div><br><img src="${imgSrc}" class="img-fluid rounded border bg-white p-2 shadow" style="max-height: 380px;" alt="Graphique Matplotlib"></div>\n`;
        } else {
          renderedOutput += this.escapeHtml(line) + '\n';
        }
      });

      outputText.innerHTML = renderedOutput.trim() 
        ? `<span class="text-success fw-bold">--- Exécution Pyodide réussie ---</span>\n${renderedOutput}` 
        : `<span class="text-muted">(Aucune sortie d'affichage)</span>`;

    } catch (err) {
      outputText.innerHTML = `<span class="text-danger fw-bold">⚠️ Erreur d'exécution Python :</span>\n<span class="text-danger">${this.escapeHtml(err.toString())}</span>`;
    }
  }



  escapeHtml(str) {
    return String(str)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;");
  }
}

// Global initialization hook
document.addEventListener('DOMContentLoaded', () => {
  window.monacoEngine = new MonacoPythonEngine();
});
