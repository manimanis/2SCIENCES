# 📝 Fiche Pédagogique – Séance 02
## Module 02 : Les structures simples
### Thème : Les Structures Simples (Cours Complet) : Entrées/Sorties, Transtypage, Règles de Nommage & Opération d'Affectation (`←` / `=`)

---

## 📌 1. Fiche Signalétique de la Séance

| Champ | Description |
| :--- | :--- |
| **Matière** | Informatique |
| **Niveau & Section** | 2ème Année Secondaire – Section Sciences |
| **Durée prévisionnelle** | 1 séance (1 heure) |
| **Cadre de référence** | Programme officiel du Ministère de l'Éducation (Tunisie) |
| **Enseignant** | Mohamed Anis MANI |
| **Supports & Outils** | Ordinateurs, page web `module02.html`, Playground Python (`playground.html`), tableau |
| **Prérequis** | Notions du Module 01 (Démarche E/T/S, TDO, structure minimale d'un algorithme) |

---

## 🎯 2. Compétences & Objectifs Opérationnels

### Compétences visées :
* **Compétence disciplinaire** : Maîtriser l'ensemble des structures simples (Entrées, Sorties et Affectation) pour concevoir un algorithme séquentiel autonome.
* **Compétence syntaxique & logique** : Nommer rigoureusement les variables, convertir les types de données et mémoriser les résultats de calcul par affectation.

### Objectifs opérationnels (À l'issue de la séance, l'élève sera capable de) :
1. **Écrire** des instructions d'affichage simples et mixtes (`Ecrire` / `print`).
2. **Réaliser** la saisie de données au clavier (`Lire` / `input`) avec transtypage explicite (`int()`, `float()`).
3. **Appliquer** les règles formelles de nommage des identificateurs (variables et constantes).
4. **Comprendre et appliquer** l'opération d'affectation (`←` / `=`) et son mécanisme d'évaluation droite $\rightarrow$ rangement gauche.
5. **Résoudre** un problème géométrique avancé (Exercice 3 : Distance euclidienne dans le plan orthonormé) articulant Entrées, Affectations, puissances et fonction racine carrée.

---

## ⏱️ 3. Scénario Pédagogique & Déroulement Minuté (Séance de 60 min)

```
┌─────────────────────────────────────────────────────────────────────────────────────┐
│  00 - 10 min : Phase 1 - Accroche : Pourquoi communiquer et mémoriser en machine ?  │
│  10 - 25 min : Phase 2 - Cours (I) : Sortie (print), Entrée (input) & Transtypage   │
│  25 - 40 min : Phase 3 - Cours (II) : Règles de nommage & L'Affectation (← / =)     │
│  40 - 55 min : Phase 4 - Atelier pratique : Ex 1 (QCM), Ex 2 (Tri) & Ex 3 (Distance)│
│  55 - 60 min : Phase 5 - Synthèse, trace écrite & préparation Séance 03             │
└─────────────────────────────────────────────────────────────────────────────────────┘
```

---

## 📖 4. Contenu Didactique & Support de Cours

### 1. L'Opération de Sortie (L'Affichage)
Permet d'envoyer des informations vers le périphérique de sortie standard (l'écran).
* **En Algorithme** : `Ecrire(...)`
* **En Python** : `print(...)`

| Type d'affichage | Syntaxe Algorithmique | Équivalent Python |
| :--- | :--- | :--- |
| **Message textuel** | `Ecrire("Bienvenue en 2e Sciences")` | `print("Bienvenue en 2e Sciences")` |
| **Valeur d'une variable** | `Ecrire(x)` | `print(x)` |
| **Affichage combiné** | `Ecrire("Le résultat est : ", r)` | `print("Le résultat est :", r)` |

### 2. L'Opération d'Entrée (La Lecture) et le Transtypage
Permet de récupérer des données saisies par l'utilisateur au clavier.
* **En Algorithme** : `Lire(nom_variable)`
* **En Python** : `nom_variable = input("Invite : ")`

> [!IMPORTANT]
> En Python, `input()` retourne TOUJOURS une chaîne de caractères (`str`). Pour effectuer des calculs arithmétiques, la conversion (le **cast**) est indispensable :
> * Entier : `n = int(input("Donner n : "))`
> * Réel : `x = float(input("Donner x : "))`

### 3. Les Règles de Nommage des Identificateurs
Un identificateur (nom de variable ou constante) doit respecter 4 règles impératives :
1. Composé uniquement de **lettres non accentuées**, de **chiffres** et du tiret bas `_` (*underscore*).
2. Doit obligatoirement **commencer par une lettre** (ou un `_`). Jamais par un chiffre.
3. Ne doit contenir **aucun espace**, tiret `-` ou symbole spécial (`@`, `#`, `$`, `%`, etc.).
4. Ne doit pas être un **mot réservé** du langage Python (`for`, `if`, `while`, `class`, `def`, `import`, etc.).

### 4. L'Opération d'Affectation (`←` / `=`)
L'affectation est l'opération centrale permettant d'attribuer une valeur ou le résultat d'un calcul à une case mémoire.
* **Notation Algorithmique** : `Variable ← Expression`
* **Syntaxe Python** : `variable = expression`

> [!CAUTION]
> **Le conteneur est TOUJOURS à gauche !**  
> Une écriture comme `L * l = aire` ou `x + 1 = x` est strictement **interdite**.  
> Le membre droit est d'abord évalué, puis le résultat est rangé dans la variable à gauche.

* **Constante** : Valeur fixée dès le départ ne changeant jamais (ex: `PI = 3.14159`, conventionnellement en majuscules).

---

## 🧩 5. Fiche Activités & Corrigés Détaillés

### 🔴 Exercice 1 : QCM d'Auto-Évaluation
1. **L'instruction `print("5 + 3 =", 5 + 3)` affiche :**
   * *Réponse exacte* : `5 + 3 = 8` (le texte entre guillemets est affiché littéralement, l'expression sans guillemets est évaluée).
2. **Si l'utilisateur tape 12 à l'instruction `x = input()`, quel est le type de `x` ?**
   * *Réponse exacte* : `str` (chaîne de caractères).
3. **Pour convertir la variable `x` en nombre décimal, on utilise :**
   * *Réponse exacte* : `float(x)`.

---

### 🟡 Exercice 2 : Validité des Noms de Variables
Classer les identificateurs suivants et justifier les erreurs :

| Identificateur | Validité | Justification pédagogique |
| :--- | :---: | :--- |
| `moyenne_info` | ✅ Valide | Lettres et underscore, commence par une lettre. |
| `2eme_note` | ❌ Invalide | Commence par un chiffre (`2`). Correction : `note_2eme`. |
| `taux-tva` | ❌ Invalide | Contient un tiret `-` (opérateur de soustraction). Correction : `taux_tva`. |
| `note élève` | ❌ Invalide | Contient un espace et une lettre accentuée `è`. Correction : `note_eleve`. |
| `while` | ❌ Invalide | Mot-clé réservé de Python (boucle TantQue). Correction : `mon_while` ou `duree`. |
| `PI` | ✅ Valide | Conventionnellement utilisé pour désigner une constante. |
| `_compteur` | ✅ Valide | L'underscore est autorisé en début d'identificateur. |
| `prix$` | ❌ Invalide | Contient le caractère spécial interdit `$`. Correction : `prix_dollar`. |

---

### 🟢 Exercice 3 : Distance Euclidienne entre Deux Points (Application Intégrée Avancée)
* **Formule mathématique** :
  $$d(A, B) = \sqrt{(x_B - x_A)^2 + (y_B - y_A)^2}$$
* **Analyse** :
  * Résultat = Afficher `d`
  * Traitement = `d ← RacineCarre((xb - xa)^2 + (yb - ya)^2)`
  * Données = Saisir `xa`, `ya`, `xb`, `yb`
* **TDO** :
  * Variables : `xa`, `ya`, `xb`, `yb`, `d` : `réel`
* **Algorithme** :
```algorithm
Algorithme Distance_Points
Début
   Ecrire("Abscisse de A (xa) : ") ; Lire(xa)
   Ecrire("Ordonnée de A (ya) : ") ; Lire(ya)
   Ecrire("Abscisse de B (xb) : ") ; Lire(xb)
   Ecrire("Ordonnée de B (yb) : ") ; Lire(yb)
   d ← RacineCarre((xb - xa) * (xb - xa) + (yb - ya) * (yb - ya))
   Ecrire("La distance euclidienne AB est : ", d)
Fin
```
* **Traduction Python (Playground)** :
```python
import math

xa = float(input("Abscisse de A (xa) : "))
ya = float(input("Ordonnée de A (ya) : "))
xb = float(input("Abscisse de B (xb) : "))
yb = float(input("Ordonnée de B (yb) : "))

d = math.sqrt((xb - xa)**2 + (yb - ya)**2)

print(f"La distance euclidienne AB est : {d:.3f}")
```

---

## 📝 6. Trace Écrite pour le Cahier de l'Élève

```markdown
CHAPITRE 2 : LES STRUCTURES SIMPLES

1. Affichage : 
   - Algorithme : Ecrire("Message", variable)
   - Python : print("Message", variable)

2. Lecture & Transtypage :
   - var = int(input("Invite : "))    # Pour un entier
   - var = float(input("Invite : "))  # Pour un réel

3. Affectation (Rangement en mémoire) :
   - Algorithme : Variable ← Expression
   - Python : variable = expression
   - Règle d'or : Conteneur toujours à gauche ! (A = B ≠ B = A)

4. Règles de nommage :
   - Lettres, chiffres, underscore (_).
   - Commence par une lettre. Aucun espace ni symbole spécial.
```

---

## ❓ 7. Auto-Évaluation Formative (5 Questions)

1. **Pourquoi l'affectation est-elle obligatoire pour calculer une aire ?**  
   *Réponse* : Pour évaluer la formule mathématique ($L \times l$) et stocker le résultat dans une variable dédiée avant de l'afficher.
2. **Que produit l'instruction Python `print(4 * "Ab")` ?**  
   *Réponse* : `AbAbAbAb` (répétition de la chaîne).
3. **Pourquoi `L * l = aire` provoque une erreur `SyntaxError` ?**  
   *Réponse* : En informatique, la variable réceptrice doit toujours se trouver à gauche de l'opérateur `=`.
4. **Quelle est la différence entre `x = 5` et `x == 5` ?**  
   *Réponse* : `=` est l'affectation (action de stockage), tandis que `==` est le test d'égalité logique (comparaison).
5. **Que vaut `x` après `x = 10` puis `x = x + 3` ?**  
   *Réponse* : `x` vaut `13` (l'ancienne valeur 10 est écrasée par la nouvelle).

---

## 🚀 8. Préparation de la Séance Suivante (Séance 03)
* **Thème** : *Atelier d'Applications Pratiques & Modélisation Scientifique (Parallélogramme, Ellipse, Moyenne pondérée, Ressort)*.
* **À faire par l'élève** : Réviser la formule de l'aire du parallélogramme ($S = a \cdot b \cdot \sin(\theta)$) et la loi de Hooke ($F = k \cdot \Delta L$).
