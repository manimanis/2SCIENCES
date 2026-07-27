# 🎓 Informatique 2e Année Secondaire – Section Sciences

Une plateforme d'apprentissage web **interactive, dynamique et pédagogique**, spécialement conçue pour les élèves et enseignants de **2e Année Secondaire (Section Sciences)** conformément au programme officiel du Ministère de l'Éducation en Tunisie.

---

## 📌 Présentation du Projet

Ce projet propose un cours complet et interactif illustré par des **simulateurs en direct**, des **générateurs de schémas SVG dynamiques**, des **tracés d'exécution pas-à-pas** et des **QCM d'auto-évaluation guidés avec indices**.

Il couvre l'intégralité du programme officiel d'Informatique pour la section 2e Sciences, structuré en 5 modules complémentaires.

---

## 🗂️ Sommaire des Modules

### 📘 Module 01 : Notion d'Algorithme et d'Analyse
- Décomposition d'un problème en Analyse, Algorithme et Traduction Python.
- Structure générale d'un programme informatique.

### 📗 Module 02 : Les Structures de Données Élémentaires
- Types de données scalaires : Entier (`int`), Réel (`float`), Booleen (`bool`), Caractère / Chaîne (`str`).
- Constantes, variables et opérations arithmétiques/logiques.

### 📙 Module 03 : Les Structures de Contrôle Conditionnelles
- Structure alternative simple et complète : `Si ... Alors ... Sinon` / `if ... else`.
- Structure à choix multiples : `if ... elif ... else`.
- Simulateur dynamique de portes logiques et tables de vérité.

### 📕 Module 04 : Traitement des Chaînes de Caractères
- Extraction de sous-chaînes (Slicing Python `ch[i:j]`).
- Fonctions standards sur les chaînes (`long()`, `ord()`, `chr()`, `valeur()`, etc.).
- Applications avancées : détection de palindromes, angrammes, etc.

### 📓 Module 05 : Les Structures Itératives (Boucles)
- Boucle à nombre de répétitions connu (`Pour ... de ... à` / `for i in range(début, fin, pas)`).
- **Exercice 1 – Fonction `range()`** : Simulateur interactif `range(début, fin, pas)` avec métriques de boucle $V_i, V_f, Pas$.
- **Exercice 2 – Affichage récursif "Bonjour"** : Affichage conditionnel sans listes Python (`if i % 3 == ...`).
- **Exercice 3 – Somme des nombres impairs** : Tableau de tracé itératif pas à pas avec test de parité (`i % 2 ≠ 0`).
- **Exercice 4 – Nombre de voyelles et consonnes** : Schéma réactif SVG vectoriel avec analyse de chaîne en direct.
- **Exercice 5 – Filtrage des lettres et des chiffres** : Séparation dynamique en chaînes `chl` (lettres) et `chc` (chiffres) avec bacs SVG ajustables.
- **Exercice 6 – QCM interactif (5 questions)** : Questionnaire guidé avec indices cachés repliables (`💡 Afficher un indice`).
- **Exercice 7 – Nombre Abondant, Déficient ou Parfait** : Calcul des diviseurs stricts $SD$ et classification automatique.
- **Exercice 8 – Nombre Poly-divisible (Ticket de Caisse)** : Contrôle de divisibilité par $k \in [2..10]$ sur 10 étapes.
- **Exercice 9 – Somme de la Série Numérique $S_n$** : Calcul de $S_n = \sum_{k=1}^n (-1)^{k+1} k^k$ avec tableau d'accumulation.
- **Exercice 10 – Carte de Fidélité ("Check_card")** : Vérification multi-critères (longueur, somme chiffres, parité des rangs alphabétiques $A=0 \dots Z=25$).
- **Exercice 11 – Progression Croissante / Décroissante** : Analyse des suites de chiffres adjacents.

---

## 🎯 Directives Pédagogiques & Spécificités du Programme

1. **Interdiction des Listes Python (`[...]`)** :
   - Conformément aux directives du programme officiel de 2e Sciences, les listes ne sont pas enseignées. Tout le code est écrit en utilisant des variables scalaires, des chaînes de caractères et des structures conditionnelles (`if / elif / else`).
2. **Terminologie Officielle** :
   - Emploi rigoureux des termes officiels (ex: **Test de parité** pour vérifier `i % 2 ≠ 0`).
3. **Pédagogie Active sans Solution Directe** :
   - Les exercices privilégient la recherche personnelle de l'élève via des simulateurs et des indices guidés (`💡 Afficher un indice`) au lieu de donner directement la solution.

---

## 🛠️ Stack Technique

- **Front-end** : HTML5, Vanilla JavaScript ES6+, Vanilla CSS.
- **UI Framework** : Bootstrap 5 (Design responsive et accessible).
- **Rendu Mathématique** : MathJax 3 (Formatage LaTeX des équations et formules).
- **Coloration Syntaxique** : Highlight.js avec extension personnalisée pour l'Algorithmique.
- **Schémas Dynamiques** : Générateur vectoriel SVG natif en JavaScript.

---

## 🚀 Installation & Utilisation Locale

### Option 1 : Serveur Web Local (XAMPP / WAMP / Lamp)
1. Déplacez ou clonez le dossier du projet dans votre répertoire web :
   ```bash
   c:\xampp-school\htdocs\2SCIENCES
   ```
2. Démarrer le module Apache via le panneau de contrôle XAMPP.
3. Ouvrez votre navigateur et accédez à :
   ```text
   http://localhost/2SCIENCES/
   ```

### Option 2 : Ouverture Directe
Double-cliquez simplement sur [index.html](file:///c:/xampp-school/htdocs/2SCIENCES/index.html) pour naviguer dans l'application web.

---

## 👨‍🏫 Auteur & Crédits

- **Enseignant responsable** : Mohamed Anis MANI
- **Matière** : Informatique
- **Niveau** : 2ème Année Secondaire (Section Sciences)
