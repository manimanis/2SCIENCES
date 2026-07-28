# 🎓 Informatique 2e Année Secondaire – Section Sciences

Une plateforme d'apprentissage web **interactive, dynamique et pédagogique**, spécialement conçue pour les élèves et enseignants de **2e Année Secondaire (Section Sciences)** conformément au programme officiel du Ministère de l'Éducation en Tunisie.

![Statut](https://img.shields.io/badge/Programme-Officiel_Tunisien-blue.svg)
![Technologie](https://img.shields.io/badge/Python_3-Pyodide_WebAssembly-success.svg)
![UI](https://img.shields.io/badge/UI-Bootstrap_5_%2B_SVG-purple.svg)

---

## 📌 Présentation du Projet

Ce projet propose un cours complet et interactif d'informatique et d'algorithmique, enrichi par :
- **Un IDE Python 3 intégré (Playground)** fonctionnant 100% en local dans le navigateur via WebAssembly (**Pyodide**), incluant **NumPy**, **Pandas** et **Matplotlib**.
- **Des simulateurs interactifs** en direct et traceurs d'exécution pas-à-pas.
- **Des générateurs de schémas vectoriels SVG dynamiques** et rendus Canvas 2D (ex: droites affines, bacs de filtrage, portes logiques).
- **Des QCM d'auto-évaluation guidés** avec indices dépliables (`💡 Afficher un indice`).
- **Une intégration rigoureuse** des concepts d'analyse, d'algorithme et de traduction Python.

Il couvre l'intégralité du programme officiel d'Informatique pour la section **2e Sciences**, structuré en 5 modules complémentaires.

---

## 🗂️ Sommaire des Modules

### 📘 Module 01 : Étapes de Résolution d'un Problème (7 Exercices)
- Décomposition méthodique d'un problème : **Analyse** (Entrées, Traitements, Sorties), **Algorithme** et **Traduction Python**.
- Structure générale d'un programme informatique.
- Applications pratiques : Problème logique (2 cordes & 3 ampoules), calculs arithmétiques, de sommes, de produits et géométriques.

### 📗 Module 02 : Les Structures Simples (6 Exercices)
- Les objets informatiques : **Constantes** et **Variables**.
- Les opérations de base : Sortie (`print`), Entrée (`input`) et Affectation (`=`).
- Distinction entre types de données et mots-clés réservés.
- QCM d'auto-évaluation pour consolider les notions de base.

### 📙 Module 03 : Les Structures de Données (14 Exercices)
- Types de données scalaires : Entier (`int`), Réel (`float`), Booléen (`bool`), Caractère / Chaîne (`str`).
- Table des caractères ASCII et fonctions prédéfinies sur les caractères et chaînes (`long()`, `ord()`, `chr()`, `valeur()`).
- Simulateur dynamique de portes logiques (ET, OU, NON) et tables de vérité.
- Applications : Masquage de mots de passe, création de pseudonymes, validation de chaînes.

### 📕 Module 04 : Les Structures Conditionnelles (19 Exercices)
- Structure alternative simple et complète : `Si ... Alors ... Sinon` / `if ... else`.
- Structure généralisée et choix multiples : `if ... elif ... else` / `match ... case`.
- Applications mathématiques et scientifiques :
  - Résolution d'équations du 1er degré ($ax + b = 0$) et du 2nd degré ($\Delta = b^2 - 4ac$).
  - Représentation graphique dynamique de droites affines via Canvas 2D HTML5.
  - Détection de propriétés numériques et géométriques.

### 📓 Module 05 : Structure Itérative Complète (11 Exercices)
- Boucle à nombre de répétitions connu : `Pour i de début à fin [pas]` / `for i in range(début, fin, pas)`.
- **Exercice 1 – Visualiseur `range()`** : Simulateur interactif `range(début, fin, pas)` avec métriques de boucle $V_i, V_f, Pas$.
- **Exercice 2 – Affichage conditionnel** : Traitement pas-à-pas sans listes Python (`if i % 3 == ...`).
- **Exercice 3 – Somme des nombres impairs** : Tableau de tracé itératif avec test de parité (`i % 2 ≠ 0`).
- **Exercice 4 – Compteur voyelles / consonnes** : Schéma SVG réactif avec analyse de chaîne en temps réel.
- **Exercice 5 – Filtrage de lettres et chiffres** : Séparation dynamique en chaînes `chl` (lettres) et `chc` (chiffres) avec bacs SVG animés.
- **Exercice 6 – QCM interactif** : Auto-évaluation guidée avec indices masqués.
- **Exercice 7 – Classification de nombres** : Identification des nombres Abondants, Déficients ou Parfaits via la somme des diviseurs stricts $SD$.
- **Exercice 8 – Nombre Poly-divisible** : Contrôle de divisibilité par $k \in [2..10]$.
- **Exercice 9 – Somme de la série $S_n$** : Calcul de $S_n = \sum_{k=1}^n (-1)^{k+1} k^k$ avec tableau d'accumulation.
- **Exercice 10 – Validation "Check_card"** : Carte de fidélité avec contrôle multi-critères.
- **Exercice 11 – Analyse de monotonie** : Progression croissante / décroissante dans les nombres.

---

## ⚡ IDE Python 3 WebAssembly (Playground)

Accessible directement via [playground.html](file:///c:/xampp-school/htdocs/2SCIENCES/playground.html) ou le menu de navigation :
- **Exécution 100% Client** : Moteur **Pyodide** basé sur WebAssembly, exécutant le code Python directement dans le navigateur sans nécessiter de serveur distant.
- **Bibliothèques Scientifiques** : Intégration native de **NumPy**, **Pandas** et **Matplotlib** avec rendu de graphiques et figures directement dans l'interface.
- **Modèles & Presets de Code** : Exemples pré-chargés d'un clic (Somme 2 entiers, Parité, Boucle `range()`, Graphiques Matplotlib, Analyse ADN en SVT, etc.).
- **Éditeur Avancé** : Prise en charge des raccourcis clavier, coloration syntaxique et console de sortie d'exécution.

---

## 🎯 Directives Pédagogiques & Spécificités du Programme

1. **Interdiction des Listes Python (`[...]`)** :
   - Conformément au programme officiel de 2e Sciences, les structures de données avancées comme les listes ne sont pas enseignées à ce niveau. Tout le code est écrit en utilisant exclusivement des variables scalaires, des chaînes de caractères et des structures de contrôle (`if / elif / else` et `for`).
2. **Terminologie Officielle** :
   - Emploi rigoureux de la nomenclature officielle tunisienne (ex: **Test de parité** pour vérifier `i % 2 ≠ 0`, décomposition **Analyse / Algorithme / Traduction**).
3. **Pédagogie Active & Guidée** :
   - Les exercices incitent l'élève à la réflexion personnelle grâce à des simulateurs interactifs et des indices masqués (`💡 Afficher un indice`).

---

## 📂 Architecture du Projet

```text
2SCIENCES/
├── index.html               # Page d'accueil & Hub d'accès aux modules
├── module01.html            # Module 01 : Étapes de résolution d'un problème
├── module02.html            # Module 02 : Les structures simples
├── module03.html            # Module 03 : Les structures de données
├── module04.html            # Module 04 : Les structures conditionnelles
├── module05.html            # Module 05 : Structure itérative complète
├── playground.html          # ⚡ IDE Python 3 WebAssembly (Pyodide, Matplotlib, Pandas...)
├── README.md                # Documentation du projet
├── assets/
│   ├── css/                 # Styles CSS (Bootstrap 5, styles personnalisés, thèmes)
│   └── js/                  # Scripts JavaScript (runner.js, editor_engine.js, modules, MathJax...)
├── code/                    # Exemples et scripts Python d'illustration
├── docs/                    # Documents et ressources pédagogiques
└── images/                  # Illustrations et bannières SVG des modules
```

---

## 🛠️ Stack Technique

- **Front-end UI** : HTML5, Vanilla JavaScript (ES6+), Vanilla CSS, Bootstrap 5.
- **Moteur Python WebAssembly** : Pyodide (Python 3.11+ dans le navigateur).
- **Bibliothèques Python incluses** : `numpy`, `pandas`, `matplotlib`.
- **Moteur d'Édition** : Intégration sur mesure avec coloration syntaxique et gestionnaire d'exécution (`assets/js/editor_engine.js`).
- **Rendu Mathématique** : MathJax 3 (Formules et équations au format LaTeX).
- **Coloration Algorithmique** : Highlight.js avec grammaire personnalisée (`hljs.algorithm.js`).
- **Schémas Dynamiques** : Moteur vectoriel SVG natif et HTML5 Canvas 2D.

---

## 🚀 Installation & Utilisation Locale

### Option 1 : Serveur Web Local (XAMPP / WAMP / LAMP)
1. Placez le répertoire du projet dans le dossier web de votre serveur :
   ```bash
   c:\xampp-school\htdocs\2SCIENCES
   ```
2. Démarrez le service Apache depuis votre panneau de contrôle XAMPP.
3. Ouvrez votre navigateur web et accédez à :
   ```text
   http://localhost/2SCIENCES/
   ```

### Option 2 : Ouverture Directe sans Serveur
Double-cliquez simplement sur le fichier [index.html](file:///c:/xampp-school/htdocs/2SCIENCES/index.html) pour lancer l'application directement dans n'importe quel navigateur moderne (Chrome, Firefox, Edge, Safari).

---

## 👨‍🏫 Auteur & Crédits

- **Enseignant responsable** : Mohamed Anis MANI
- **Matière** : Informatique
- **Niveau** : 2ème Année Secondaire (Section Sciences)
- **Année Scolaire** : 2026 / 2027

