# 🎓 Progression Pédagogique en 20 Séances
## Informatique – 2ème Année Secondaire (Section Sciences)
### Conforme au Programme Officiel du Ministère de l'Éducation (Tunisie)

* **Enseignant responsable** : Mohamed Anis MANI  
* **Matière** : Informatique  
* **Niveau** : 2ème Année Secondaire (Section Sciences)  
* **Volume prévisionnel** : 20 séances d'une heure (20 heures au total – Cours & Travaux Pratiques)  
* **Support interactif** : Plateforme Web 2SCIENCES & IDE Python 3 WebAssembly (Pyodide)

---

## 📌 1. Répartition Globale des Volumes Horaires

| Module | Intitulé | Nombre de séances | Durée totale | Séances | Poids relatif |
| :--- | :--- | :---: | :---: | :---: | :---: |
| **Module 01** | Étapes de résolution d’un problème | **1 séance** | 1 heure | Séance 1 | 5 % |
| **Module 02** | Les structures simples (E/S & Affectation) | **2 séances** | 2 heures | Séances 2 et 3 | 10 % |
| **Module 03** | Les structures de données (Numérique, Booléen, Chaînes) | **4 séances** | 4 heures | Séances 4 à 7 | 20 % |
| **Module 04** | Les structures conditionnelles (Simple, Alternative, Généralisée, Choix multiple) | **6 séances** | 6 heures | Séances 8 à 13 | 30 % |
| **Module 05** | La structure itérative complète (Boucle `Pour` / `range`, Parcours, Accumulateurs, Intégration) | **7 séances** | 7 heures | Séances 14 à 20 | 35 % |
| **Total** | **Programme complet 2e Sciences** | **20 séances** | **20 heures** | **1 à 20** | **100 %** |

---

## 📋 2. Tableau Synoptique des 20 Séances

| Séance | Module | Intitulé & Notions Clés | Exercices & Simulateurs Associés |
| :---: | :---: | :--- | :--- |
| [**S01**](seance01.md) | M01 | Démarche de résolution (4 étapes), E/T/S, TDO, énigmes & premiers scripts | Ex 1 (Cordes), Ex 2 (Ampoules), Ex 3 (Somme/Produit), Ex 4 (Forme H), Ex 5 (Schéma) |
| [**S02**](seance02.md) | M02 | Structures simples (Cours complet) : E/S, Transtypage, Nommage & Affectation (`←` / `=`) | Ex 1 (QCM), Ex 2 (Tri validité identificateurs), Ex 3 (Distance euclidienne : repère & racine carrée) |
| [**S03**](seance03.md) | M02 | Atelier d'applications pratiques & modélisation scientifique (TP / TD) | Ex 4 (Parallélogramme), Ex 5 (Ellipse), Ex 6 (Moyenne), Ex 7 (Ressort), Ex 8 (Formule de Héron) |
| [**S04**](seance04.md) | M03 | Types numériques, opérateurs arithmétiques `//`, `%`, `**` et fonctions `math` | Ex 1 (Opérateurs), Ex 2 (Expressions), Ex 4 (Aléa), Ex 10 (Batterie) |
| [**S05**](seance05.md) | M03 | Logique booléenne, tables de vérité et portes logiques (NOT, AND, OR) | Ex 11 (Circuit logique interactif), Ex 12 (Logistique citerne) |
| [**S06**](seance06.md) | M03 | Types textuels (I) : code ASCII (`ord`/`chr`), indices, longueur `len()` | Ex 3 (Trace mémoire), Ex 5 (Concaténation), Ex 8 (Password), Ex 9 (Chiffres) |
| [**S07**](seance07.md) | M03 | Types textuels (II) : Découpage (Slicing), conversions et fonctions chaînes | Ex 6 (Découpage), Ex 7 (QCM), Ex 13 (Fonctions chaînes SVG), Ex 14 (Pseudo) |
| [**S08**](seance08.md) | M04 | Structure conditionnelle simple et alternative (`if ... else`) | Ex 1 (QCM 1), Ex 4 (Trace), Ex 5 (Signe/Parité), Ex 6 (Armstrong) |
| [**S09**](seance09.md) | M04 | Forme généralisée (`elif`) et réécriture de conditions | Ex 7 (Formes), Ex 8 (Type caractère ASCII), Ex 10 (pH chimique) |
| [**S10**](seance10.md) | M04 | Structure à choix multiples (`Selon` / `match...case`) | Ex 2 & 3 (QCM), Ex 9 (Calculatrice $A \text{ op } B$), Ex 13 (Salutations) |
| [**S11**](seance11.md) | M04 | Conditions composées, imbriquées et applications de contrôle | Ex 11 (Évaluation conditionnelle), Ex 12 (Bissextile), Ex 14 (Score match) |
| [**S12**](seance12.md) | M04 | Modélisation scientifique : Équations 1er et 2nd degré ($\Delta$) | Ex 15 ($ax+b=0$), Ex 17 ($ax^2+bx+c=0$ avec discriminant $\Delta$) |
| [**S13**](seance13.md) | M04 | Géométrie analytique & Chimie organique appliquée | Ex 16 (Nature du triangle), Ex 18 (Alcools 3D), Ex 19 (Droites affines Canvas) |
| [**S14**](seance14.md) | M05 | Découverte de la boucle `Pour` et syntaxe de `range(vi, vf, pas)` | Ex 1 (Visualiseur interactif range), Ex 2 (Bonjour & divisibilité) |
| [**S15**](seance15.md) | M05 | Schémas de comptage, d'accumulation et diviseurs stricts | Ex 3 (Somme impairs), Ex 6 (QCM boucles), Ex 7 (Nombres Parfaits) |
| [**S16**](seance16.md) | M05 | Parcours séquentiel de chaînes de caractères (sans listes) | Ex 4 (Voyelles/Consonnes), Ex 5 (Filtrage lettres/chiffres SVG) |
| [**S17**](seance17.md) | M05 | Arithmétique itérative et séries numériques alternées | Ex 8 (Poly-divisible), Ex 9 (Série $S_n = \sum (-1)^{k+1} k^k$) |
| [**S18**](seance18.md) | M05 | Algorithmes de contrôle et validation par drapeaux (`flag`) | Ex 10 (Carte Check_card avec accumulation pondérée) |
| [**S19**](seance19.md) | M05 | Analyse de monotonie et comparaisons itératives avancées | Ex 11 (Monotonie croissante/décroissante et tableaux de trace) |
| [**S20**](seance20.md) | M05 | **Structure itérative `Pour` & Intégration des modules précédents** | Mobilisation de `Pour` avec conditions, chaînes et calculs (Défi BioPass) |

---

## 📖 3. Fiches Détaillées Séance par Séance

```
================================================================================
MODULE 01 : ÉTAPES DE RÉSOLUTION D'UN PROBLÈME (1 SÉANCE)
================================================================================
```

### 🔹 Séance 01 : Démarche de résolution d'un problème, formalisation (E/T/S, TDO) et premiers scripts
> 📄 **Fiche pédagogique complète & guide de séance** : [seance01.md](seance01.md)

* **Module** : 01 – Résolution d'un problème (Séance unique intensive de 1h – 70% des exercices traités)
* **Objectifs opérationnels** :
  * Découvrir le rôle d'un algorithme et d'un programme informatique.
  * Maîtriser le cycle fondamental en 4 étapes : **Analyse $\rightarrow$ Algorithme $\rightarrow$ Programme $\rightarrow$ Exécution & Tests**.
  * Formaliser le schéma **Entrées / Traitements / Sorties (E/T/S)** et renseigner le **Tableau de Déclaration des Objets (TDO)**.
  * Écrire la structure algorithmique minimale (`Algorithme Nom`, `Début`, `Fin`) et traduire en premier script Python 3.
  * Tester et valider les scripts dans le Playground WebAssembly.
* **Notions de cours** :
  * Qu'est-ce qu'un problème informatique et un algorithme ?
  * Notion d'entrées (données brutes), traitements (transformations) et sorties (résultats utiles).
  * Modèle E/T/S et formalisation de la grille d'analyse.
  * TDO : objets, noms d'identificateurs et types de données de base (`entier`, `réel`).
  * Squelette d'un programme Python et cycle d'exécution/débogage.
* **Activités pratiques & Exercices traités (70% du module en 1h)** :
  * **Exercice 1** : Problème des deux cordes (énigme logique avec simulateur temporel dynamique).
  * **Exercice 2** : Problème des trois ampoules (déduction logique & température).
  * **Exercice 3** : Calcul de la somme et du produit de deux entiers (Analyse, TDO, Algorithme et script Python).
  * **Exercice 4** : Calcul d'aire de la Forme H (décomposition géométrique).
  * **Exercice 5** : Ordonnancement interactif des 4 étapes du cycle de résolution.
* **Trace écrite** : Définition de l'algorithme, schéma des 4 étapes, modèle E/T/S et TDO de référence.

---

```
================================================================================
MODULE 02 : LES STRUCTURES SIMPLES (2 SÉANCES)
================================================================================
```

### 🔹 Séance 02 : Les structures simples (Cours complet) – E/S, Transtypage, Nommage & Affectation
> 📄 **Fiche pédagogique complète & guide de séance** : [seance02.md](seance02.md)

* **Module** : 02 – Les structures simples
* **Objectifs opérationnels** :
  * Exploiter la primitive d'affichage `Ecrire(...)` / `print(...)`.
  * Exploiter la primitive de lecture `Lire(...)` / `input(...)`.
  * Maîtriser le cast explicite de types en Python (`int()`, `float()`).
  * Appliquer les règles formelles de nommage des variables (identificateurs).
  * Comprendre et appliquer le mécanisme de l'affectation (`←` / `=`), l'évaluation du membre droit et le rangement à gauche.
  * Mettre en œuvre un algorithme séquentiel complet articulant Entrées, Affectations et Sorties.
* **Notions de cours** :
  * Affichage de texte, de variables et mixte.
  * Lecture de données et transtypage numérique explicite.
  * Règles de nommage : caractères autorisés, début par une lettre, rejet des espaces et mots réservés.
  * Sémantique de l'affectation, écriture interdite `A + B = C`, constantes et mise à jour de variables.
* **Activités pratiques & Exercices** :
  * **Exercice 1** : QCM interactif sur les entrées/sorties, transtypage et types de données.
  * **Exercice 2** : Atelier de tri interactif de validité de noms de variables.
  * **Exercice 3** : Distance euclidienne entre deux points dans le plan orthonormé (Analyse, TDO, $d = \sqrt{(x_B - x_A)^2 + (y_B - y_A)^2}$, affectations et script Python avec `math.sqrt`).

---

### 🔹 Séance 03 : Atelier d'applications pratiques & modélisation scientifique (TP / TD)
> 📄 **Fiche pédagogique complète & guide de séance** : [seance03.md](seance03.md)

* **Objectifs opérationnels** :
  * Modéliser des problèmes issus des sciences (géométrie, physique, calcul de moyennes).
  * Manipuler des constantes ($\pi$) et des fonctions de la bibliothèque standard (`math.sin`, `math.pi`, `math.sqrt`).
  * Convertir des angles degrés/radians pour l'évaluation trigonométrique informatique.
  * Traduire des formules pondérées, des lois physiques et des relations géométriques complexes en expressions algorithmiques.
* **Notions de cours** :
  * Rôle de la bibliothèque `math` et importation de modules (`math.sin`, `math.pi`, `math.sqrt`).
  * Fonctions trigonométriques et impératif des radians.
  * Décomposition d'un calcul complexe : variables intermédiaires mémorisées par affectation.
  * Modélisation de formules pondérées et gestion de priorités d'évaluation.
* **Activités pratiques & Exercices** :
  * **Exercice 4** : Aire d'un parallélogramme ($S = a \times b \times \sin(\theta)$ avec conversion degrés/radians).
  * **Exercice 5** : Aire d'une ellipse ($S = \pi \times a \times b$).
  * **Exercice 6** : Calcul de la moyenne trimestrielle pondérée d'informatique.
  * **Exercice 7** : Raideur d'un ressort (application physique : $k = \frac{F}{\Delta L}$ avec widget interactif).
  * **Exercice 8** : Formule de Héron d'Alexandrie (Aire d'un triangle quelconque à partir de ses 3 côtés $a, b, c$, demi-périmètre intermédiaire $p$ et $S = \sqrt{p(p-a)(p-b)(p-c)}$).

---

```
================================================================================
MODULE 03 : LES STRUCTURES DE DONNÉES (4 SÉANCES)
================================================================================
```

### 🔹 Séance 04 : Types numériques & Fonctions arithmétiques prédéfinies
> 📄 **Fiche pédagogique complète & guide de séance** : [seance04.md](seance04.md)

* **Module** : 03 – Les structures de données
* **Objectifs opérationnels** :
  * Distinguer entiers (`int`) et réels (`float`).
  * Utiliser la division entière (`div` / `//`), le reste modulo (`mod` / `%`) et les puissances (`**`).
  * Utiliser les fonctions arithmétiques usuelles (`abs()`, `sqrt()`, `round()`, `alea()`).
* **Notions de cours** :
  * Division euclidienne : relation $a = b \times q + r$ avec $0 \le r < |b|$.
  * Fonctions de la bibliothèque standard et du module `math`.
  * Priorités de calcul des opérateurs arithmétiques.
* **Activités pratiques & Exercices** :
  * **Exercice 1** : Opérateurs numériques et divisions euclidiennes.
  * **Exercice 2** : Évaluation d'expressions arithmétiques composées.
  * **Exercice 4** : Génération de nombres aléatoires (`Aléa`).
  * **Exercice 10** : Autonomie de batterie (conversion de secondes en $h:min:s$ via `div` et `mod`).

---

### 🔹 Séance 05 : Le type booléen, portes logiques et tables de vérité
> 📄 **Fiche pédagogique complète & guide de séance** : [seance05.md](seance05.md)

* **Objectifs opérationnels** :
  * Évaluer la valeur de vérité (`Vrai`/`Faux` - `True`/`False`) d'une expression.
  * Manipuler les opérateurs relationnels (`=`, `≠`, `<`, `<=`, `>`, `>=`).
  * Manipuler les opérateurs logiques `NON`, `ET`, `OU` (`not`, `and`, `or`).
  * Établir des tables de vérité et schématiser des circuits logiques.
* **Notions de cours** :
  * Tables de vérité de base.
  * Symboles et comportement des portes logiques NOT, AND, OR.
  * Hiérarchie des priorités d'évaluation (Parenthèses $\rightarrow$ Relationnels $\rightarrow$ `NON` $\rightarrow$ `ET` $\rightarrow$ `OU`).
* **Activités pratiques & Exercices** :
  * **Exercice 11** : Circuit logique interactif (simulateur de portes logiques en direct).
  * **Exercice 12** : Citerne d'huile et logistique de transport (optimisation et contraintes logiques).

---

### 🔹 Séance 06 : Types textuels (I) – Caractère, code ASCII et indexation
> 📄 **Fiche pédagogique complète & guide de séance** : [seance06.md](seance06.md)

* **Objectifs opérationnels** :
  * Différencier le type caractère du type chaîne.
  * Exploiter le code ASCII avec les fonctions prédéfinies `ord()` et `chr()`.
  * Accéder à un caractère par son indice `ch[i]` et déterminer la longueur `long()` / `len()`.
* **Notions de cours** :
  * La table des codes ASCII (plages `'0'..'9'`, `'A'..'Z'`, `'a'..'z'`).
  * Indexation à base 0 : premier caractère à l'indice `0`, dernier à `len(ch) - 1`.
  * Opérations simples : concaténation (`+`), répétition (`*`).
* **Activités pratiques & Exercices** :
  * **Exercice 3** : Exécution manuelle et tableau de trace mémoire.
  * **Exercice 5** : Concaténation de chaînes et mise en page de messages.
  * **Exercice 8** : Générateur de mot de passe (extraction de lettres et chiffres).
  * **Exercice 9** : Permutation des chiffres d'un nombre (approche numérique vs textuelle).

---

### 🔹 Séance 07 : Types textuels (II) – Découpage (Slicing) et fonctions avancées
> 📄 **Fiche pédagogique complète & guide de séance** : [seance07.md](seance07.md)

* **Objectifs opérationnels** :
  * Extraire une sous-chaîne via le slicing (`ch[d:f]`).
  * Convertir des nombres en chaînes et inversement (`str()`, `valeur()` / `int()`, `float()`).
  * Exploiter les fonctions prédéfinies sur les chaînes de caractères.
* **Notions de cours** :
  * Propriétés du découpage par tranche : exclusion de l'indice de fin.
  * Détection d'erreurs d'indexation (`IndexError`).
* **Activités pratiques & Exercices** :
  * **Exercice 6** : Manipulation avancée et découpage de chaînes.
  * **Exercice 7** : QCM interactif sur les fonctions prédéfinies des chaînes.
  * **Exercice 13** : Fonctions sur les chaînes avec schéma SVG de repères d'indices.
  * **Exercice 14** : Générateur de pseudonymes (combinaison identité et codes ASCII).

---

```
================================================================================
MODULE 04 : LES STRUCTURES CONDITIONNELLES (6 SÉANCES)
================================================================================
```

### 🔹 Séance 08 : Formes conditionnelles simple et alternative
> 📄 **Fiche pédagogique complète & guide de séance** : [seance08.md](seance08.md)

* **Module** : 04 – Les structures conditionnelles
* **Objectifs opérationnels** :
  * Exprimer un choix algorithmique avec la forme réduite (`Si ... Alors`) et alternative (`Si ... Alors ... Sinon`).
  * Respecter l'indentation stricte en Python (`if condition: ... else:`).
  * Construire un tableau de trace conditionnel.
* **Notions de cours** :
  * Principe d'exclusion mutuelle des blocs `if` et `else`.
  * Condition booléenne de garde.
* **Activités pratiques & Exercices** :
  * **Exercice 1** : QCM interactif sur la syntaxe conditionnelle.
  * **Exercice 4** : Exécution manuelle et analyse des formes conditionnelles.
  * **Exercice 5** : Détermination du signe et de la parité d'un entier.
  * **Exercice 6** : Nombre cubique (nombre d'Armstrong à 3 chiffres : $n = c_1^3 + c_2^3 + c_3^3$).

---

### 🔹 Séance 09 : Forme généralisée (`elif`) & Passage entre formes
> 📄 **Fiche pédagogique complète & guide de séance** : [seance09.md](seance09.md)

* **Objectifs opérationnels** :
  * Imbriquer plusieurs conditions avec la forme généralisée (`Si ... Sinon Si ... Sinon` / `elif`).
  * Transformer une cascade de structures simples en une forme généralisée optimisée.
* **Notions de cours** :
  * Évaluation séquentielle court-circuitée des clauses `elif`.
  * Règle de complétude et clause par défaut `else`.
* **Activités pratiques & Exercices** :
  * **Exercice 7** : Atelier d'équivalences et réécriture entre formes conditionnelles.
  * **Exercice 8** : Détermination du type d'un caractère ASCII (majuscule, minuscule, chiffre, symbole spécial).
  * **Exercice 10** : Classification du potentiel hydrogène (pH acide, neutre ou basique).

---

### 🔹 Séance 10 : Structure à choix multiples (`Selon` / `match...case`)
> 📄 **Fiche pédagogique complète & guide de séance** : [seance10.md](seance10.md)

* **Objectifs opérationnels** :
  * Simplifier les tests d'égalité multiple via la structure `Selon sélecteur Faire`.
  * Utiliser `match ... case` en Python moderne (Python 3.10+).
* **Notions de cours** :
  * Restrictions sur le sélecteur : type discret (entier, caractère).
  * Branche par défaut (`Autre` / `case _:`).
* **Activités pratiques & Exercices** :
  * **Exercices 2 & 3** : QCMs sur les conditions imbriquées et expressions logiques équivalentes.
  * **Exercice 9** : Calculatrice d'expressions ($A \text{ op } B$ avec `op` parmi `+`, `-`, `*`, `/`).
  * **Exercice 13** : Salutations selon l'heure (réécriture élégante avec `Selon`).

---

### 🔹 Séance 11 : Conditions composées et applications de contrôle
> 📄 **Fiche pédagogique complète & guide de séance** : [seance11.md](seance11.md)

* **Objectifs opérationnels** :
  * Structurer des prédicats complexes combinant parenthèses, comparaisons et opérateurs `ET`/`OU`.
  * Résoudre des problèmes réels de calendrier et de gestion de scores.
* **Notions de cours** :
  * Modélisation de règles de gestion multi-critères.
* **Activités pratiques & Exercices** :
  * **Exercice 11** : Évaluation rigoureuse d'une structure conditionnelle complexe.
  * **Exercice 12** : Année bissextile (divisible par 4 et non par 100, ou divisible par 400).
  * **Exercice 14** : Score d'un match (victoire, défaite, match nul avec attribution de points).

---

### 🔹 Séance 12 : Modélisation mathématique : Résolution d'équations
> 📄 **Fiche pédagogique complète & guide de séance** : [seance12.md](seance12.md)

* **Objectifs opérationnels** :
  * Traduire l'arbre de décision complet d'un problème mathématique.
  * Calculer et interpréter le discriminant $\Delta = b^2 - 4ac$.
* **Notions de cours** :
  * Discussion rigoureuse des cas dégénérés ($a=0$).
  * Utilisation de `math.sqrt()` conditionnée par $\Delta \ge 0$.
* **Activités pratiques & Exercices** :
  * **Exercice 15** : Résolution de l'équation du 1er degré $ax + b = 0$ ($a=0 \land b=0 \Rightarrow \mathbb{R}$, $a=0 \land b \ne 0 \Rightarrow \emptyset$, sinon $x = -b/a$).
  * **Exercice 17** : Résolution de l'équation du 2ème degré $ax^2 + bx + c = 0$ ($\Delta > 0$, $\Delta = 0$, $\Delta < 0$).

---

### 🔹 Séance 13 : Géométrie analytique & Chimie organique appliquée
> 📄 **Fiche pédagogique complète & guide de séance** : [seance13.md](seance13.md)

* **Objectifs opérationnels** :
  * Mobiliser les structures conditionnelles sur des problèmes interdisciplinaires (maths, physique, chimie).
  * Visualiser graphiquement les résultats via le Canvas HTML5.
* **Activités pratiques & Exercices** :
  * **Exercice 16** : Nature d'un triangle (test d'existence, équilatéral, isocèle, rectangle via réciproque de Pythagore, scalène).
  * **Exercice 18** : Chimie organique des alcools (formule $C_n H_{2n+1}OH$, masse molaire et visualiseur 3D).
  * **Exercice 19** : Intersection de deux droites affines ($y = m_1 x + p_1$ et $y = m_2 x + p_2$, droites confondues, strictement parallèles ou sécantes avec tracé dynamique Canvas).

---

```
================================================================================
MODULE 05 : STRUCTURE ITÉRATIVE COMPLÈTE & INTÉGRATION (7 SÉANCES)
================================================================================
```

> **Directives officielles 2e Sciences** :  
> L'utilisation des listes Python (`[...]`) est strictement hors programme. Tout le travail itératif s'effectue avec des variables scalaires et le parcours caractère par caractère des chaînes de caractères.

---

### 🔹 Séance 14 : Découverte de la boucle `Pour` & Fonction `range()`
> 📄 **Fiche pédagogique complète & guide de séance** : [seance14.md](seance14.md)

* **Module** : 05 – Structure itérative complète
* **Objectifs opérationnels** :
  * Identifier les situations nécessitant une répétition à nombre d'itérations connu à l'avance.
  * Maîtriser la syntaxe algorithmique `Pour compteur De vi À vf [Pas p] Faire ... FinPour`.
  * Maîtriser la fonction `range(début, fin, pas)` en Python et l'exclusion de la borne supérieure.
* **Notions de cours** :
  * Variable de contrôle de boucle.
  * Calcul du nombre total d'itérations : $N = \lfloor \frac{vf - vi}{pas} \rfloor + 1$.
  * Règle d'or : ne jamais modifier manuellement la variable de contrôle à l'intérieur de la boucle.
* **Activités pratiques & Exercices** :
  * **Exercice 1** : Simulateur interactif de la fonction `range()` (métriques $V_i$, $V_f$, $Pas$, affichage pas-à-pas des itérations).
  * **Exercice 2** : "Bonjour" / Affichage conditionnel séquentiel (test de parité/divisibilité à chaque tour).

---

### 🔹 Séance 15 : Compteurs, accumulateurs et diviseurs stricts
> 📄 **Fiche pédagogique complète & guide de séance** : [seance15.md](seance15.md)

* **Objectifs opérationnels** :
  * Implémenter le schéma classique du compteur ($C \leftarrow C + 1$).
  * Implémenter le schéma classique de l'accumulateur de somme ($S \leftarrow S + \text{terme}$).
  * Établir un tableau de tracé pas-à-pas des variables.
* **Notions de cours** :
  * Nécessité impérative de l'initialisation avant la boucle ($S \leftarrow 0$, $C \leftarrow 0$).
  * Recherche systématique des diviseurs d'un entier $n$ sur $[1..n-1]$.
* **Activités pratiques & Exercices** :
  * **Exercice 3** : Somme des entiers impairs dans un intervalle $[a, b]$ avec tableau de tracé d'itération.
  * **Exercice 6** : QCM interactif sur les boucles et parcours.
  * **Exercice 7** : Nombres Parfaits, Abondants ou Déficients (calcul de la somme des diviseurs stricts $SD$ et comparaison avec $n$).

---

### 🔹 Séance 16 : Parcours séquentiel de chaînes de caractères
> 📄 **Fiche pédagogique complète & guide de séance** : [seance16.md](seance16.md)

* **Objectifs opérationnels** :
  * Parcourir une chaîne de caractères indice par indice (`for i in range(len(ch))`).
  * Extraire chaque caractère `ch[i]` pour analyse, comptage ou filtrage.
* **Notions de cours** :
  * Schéma d'itération sur la longueur d'une chaîne.
  * Concaténation progressive dans une nouvelle chaîne résultat.
* **Activités pratiques & Exercices** :
  * **Exercice 4** : Compteur de voyelles et de consonnes dans une chaîne (schéma SVG réactif).
  * **Exercice 5** : Filtrage et séparation dynamique : extraction des lettres vers `chl` et des chiffres vers `chc` (animation SVG des bacs collecteurs).

---

### 🔹 Séance 17 : Arithmétique itérative et séries numériques alternées
> 📄 **Fiche pédagogique complète & guide de séance** : [seance17.md](seance17.md)

* **Objectifs opérationnels** :
  * Traduire une formule de sommation mathématique indexée $\sum$ en algorithme itératif.
  * Gérer les alternances de signe $(-1)^k$ et les puissances dépendantes de l'indice.
* **Notions de cours** :
  * Accumulation avec terme général dépendant de la variable de contrôle.
  * Contrôle successif de divisibilité.
* **Activités pratiques & Exercices** :
  * **Exercice 8** : Nombre Poly-divisible / Ticket de caisse (vérification itérative de la divisibilité par $k \in [2..10]$).
  * **Exercice 9** : Somme de la série numérique alternée $S_n = \sum_{k=1}^n (-1)^{k+1} k^k$ avec tableau d'accumulation.

---

### 🔹 Séance 18 : Algorithmes de contrôle & Validation par drapeaux (`flag`)
> 📄 **Fiche pédagogique complète & guide de séance** : [seance18.md](seance18.md)

* **Objectifs opérationnels** :
  * Concevoir un algorithme de vérification d'intégrité (clé de contrôle, somme pondérée).
  * Exploiter les drapeaux booléens pour valider des conditions sur l'ensemble des itérations.
* **Notions de cours** :
  * Utilisation d'un indicateur booléen / drapeau (`flag`) pour valider une propriété globale.
  * Schéma d'accumulation pondérée selon la parité de l'indice de boucle.
* **Activités pratiques & Exercices** :
  * **Exercice 10** : Carte de fidélité ("Check_card" avec accumulation pondérée selon la parité des rangs).

---

### 🔹 Séance 19 : Analyse de monotonie et comparaisons itératives avancées
> 📄 **Fiche pédagogique complète & guide de séance** : [seance19.md](seance19.md)

* **Objectifs opérationnels** :
  * Comparer deux éléments successifs d'une séquence pour statuer sur sa monotonie.
  * Construire un tableau de trace complet lors de comparaisons itératives.
* **Notions de cours** :
  * Algorithme de détection de monotonie stricte (croissante / décroissante).
  * Gestion des conditions de rupture de monotonie.
* **Activités pratiques & Exercices** :
  * **Exercice 11** : Analyse de monotonie (détection d'une progression strictement croissante ou décroissante avec tableaux de trace).

---

### 🔹 Séance 20 : Structure itérative `Pour` & Intégration des modules précédents
> 📄 **Fiche pédagogique complète & guide de séance** : [seance20.md](seance20.md)

* **Module** : 05 – Structure itérative `Pour` & Intégration globale (Modules 01 à 05)
* **Objectifs opérationnels** :
  * Mobiliser la structure itérative `Pour` en synergie avec l'ensemble des notions antérieures :
    1. **Démarche algorithmique (M01)** : Analyse formelle E/T/S et TDO complet.
    2. **Structures simples (M02)** : Entrées sécurisées, sorties formatées et calculs arithmétiques.
    3. **Structures de données (M03)** : Types numériques, booléens, codes ASCII (`ord`/`chr`) et manipulation de chaînes (sans listes).
    4. **Structures conditionnelles (M04)** : Contrôles d'intégrité et embranchements logiques imbriqués.
    5. **Structure itérative `Pour` (M05)** : Parcours de chaîne caractère par caractère, accumulation et chiffrement itératif.
* **Activités pratiques & Projet de synthèse** :
  * **Grand Défi d'intégration : Système de Badge Sécurisé "BioPass"** :
    * Contrôle de longueur et somme de contrôle d'un identifiant numérique via boucle `Pour`.
    * Chiffrement par décalage (Code de César) du nom de l'élève par itération `Pour` et arithmétique ASCII.
    * Décisions conditionnelles de validation et assemblage du badge final.
* **Validation & Bilan** : Implémentation, exécution sur le Playground WebAssembly et synthèse méthodologique en vue des devoirs de synthèse.

---

## 🎯 4. Recommandations Pédagogiques pour l'Enseignant

1. **Priorité à l'Analyse E/T/S** :  
   Exiger systématiquement la grille d'Analyse et le TDO avant toute saisie de code sur machine. L'analyse structure la pensée algorithmique de l'élève.
2. **Respect Strict du Programme Officiel** :  
   Rappeler aux élèves que les tableaux/listes (`list`, `[...]`) ne sont pas admis en 2e Sciences. Tous les algorithmes de stockage temporaire utilisent les chaînes de caractères.
3. **Pédagogie de l'Erreur & Tracé Mémoire** :  
   Utiliser abondamment les tableaux de trace manuelle (colonnes pour chaque variable et l'indice de boucle) avant de tester les programmes sur le Playground.
4. **Valorisation de l'Interactivité** :  
   Exploiter les simulateurs intégrés à la plateforme (Canvas 2D, SVG animés, visualiseur `range()`, circuit logique) pour donner une représentation concrète et visuelle aux concepts abstraits.
