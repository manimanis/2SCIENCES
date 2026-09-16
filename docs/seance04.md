# 📝 Fiche Pédagogique – Séance 04
## Module 02 : Les structures simples
### Thème : L'Opération d'Affectation (`←` / `=`), Constantes & Applications Scientifiques (Physique, Géométrie)

---

## 📌 1. Fiche Signalétique de la Séance

| Champ | Description |
| :--- | :--- |
| **Matière** | Informatique |
| **Niveau & Section** | 2ème Année Secondaire – Section Sciences |
| **Durée prévisionnelle** | 1 séance (1h à 1h30) |
| **Cadre de référence** | Programme officiel du Ministère de l'Éducation (Tunisie) |
| **Enseignant** | Mohamed Anis MANI |
| **Supports & Outils** | Ordinateurs, page web `module02.html`, Playground Python (`playground.html`), tableau |
| **Prérequis** | E/S standard, Cast (`int`, `float`), règles de nommage (Séance 03) |

---

## 🎯 2. Compétences & Objectifs Opérationnels

### Compétences visées :
* **Compétence disciplinaire** : Manipuler l'opération fondamentale d'affectation pour stocker et mettre à jour des valeurs en mémoire.
* **Compétence interdisciplinaire** : Modéliser et résoudre des calculs issus de la physique et des mathématiques.

### Objectifs opérationnels (À l'issue de la séance, l'élève sera capable de) :
1. **Expliquer** le mécanisme temporel et sémantique de l'affectation ($A \leftarrow B$).
2. **Distinguer** l'opérateur d'affectation (`=`) de l'opérateur d'égalité mathématique (`==`).
3. **Déclarer et utiliser des constantes** (ex: $\pi = 3.14$).
4. **Programmer** la résolution de problèmes réels : Rectangle, Ellipse, Moyenne et Raideur d'un ressort.

---

## ⏱️ 3. Scénario Pédagogique & Déroulement Minuté

```
┌──────────────────────────────────────────────────────────────────────────────┐
│  00 - 15 min : Phase 1 - Découverte : Le paradoxe de x ← x + 1 en maths vs info│
│  15 - 35 min : Phase 2 - Cours : Mécanisme de l'affectation & constantes     │
│  35 - 55 min : Phase 3 - Applications géométriques (Rectangle & Ellipse)      │
│  55 - 75 min : Phase 4 - Applications interdisciplinaires (Moyenne & Ressort) │
│  75 - 80 min : Phase 5 - Synthèse, trace écrite & amorce du Module 03         │
└──────────────────────────────────────────────────────────────────────────────┘
```

---

## 📖 4. Contenu Didactique & Support de Cours

### 1. L'Opération d'Affectation
L'affectation permet d'attribuer une valeur ou le résultat d'une expression à une variable.
* **Notation Algorithmique** : `Variable ← Expression`
* **Syntaxe Python** : `variable = expression`

> [!CAUTION]
> **Le conteneur est TOUJOURS à gauche !**  
> Une écriture comme `4 + 5 = x` est strictement **interdite** et déclenche une erreur de syntaxe (`SyntaxError: cannot assign to operator`).

### 2. Le Mécanisme Temporel d'Exécution
L'affectation s'effectue en deux temps strictement ordonnés :
1. **Évaluation** de l'expression située à droite de la flèche / du signe `=`.
2. **Rangement** de la valeur obtenue dans l'emplacement mémoire de la variable située à gauche (écrasant son ancien contenu).

*Exemple illustratif :*
```python
x = 5
x = x + 1   # 1. Calcule 5 + 1 = 6.  2. Met 6 dans la case x.
print(x)    # Affiche 6
```

### 3. Variables vs Constantes
* **Variable** : Objet dont la valeur peut changer au cours de l'exécution du programme.
* **Constante** : Objet dont la valeur reste figée dès sa déclaration (ex: `PI = 3.14159`, `G = 9.81`). En Python, par convention, les constantes s'écrivent en lettres MAJUSCULES.

---

## 🧩 5. Fiche Activités & Corrigés Détaillés

### 🔴 Exercice 3 : Aire & Périmètre d'un Rectangle
* **Formules** : $\text{Périmètre} = 2 \times (L + l)$, $\text{Aire} = L \times l$.
* **Algorithme** :
```algorithm
Algorithme Rectangle
Début
   Ecrire("Longueur L : ")
   Lire(L)
   Ecrire("Largeur l : ")
   Lire(l)
   perimetre ← 2 * (L + l)
   aire ← L * l
   Ecrire("Périmètre = ", perimetre)
   Ecrire("Aire = ", aire)
Fin
```
* **Script Python équivalent** :
```python
L = float(input("Longueur L : "))
l = float(input("Largeur l : "))

perimetre = 2 * (L + l)
aire = L * l

print(f"Périmètre = {perimetre:.2f}")
print(f"Aire = {aire:.2f}")
```

---

### 🟡 Exercice 4 : Aire d'une Ellipse
* **Formule mathématique** : $S = \pi \times a \times b$ ($a$ : demi-grand axe, $b$ : demi-petit axe).
* **TDO** :
  * Constante : `PI = 3.14` : `réel`
  * Variables : `a`, `b`, `surf` : `réel`
* **Script Python** :
```python
PI = 3.14159
a = float(input("Demi-grand axe a : "))
b = float(input("Demi-petit axe b : "))

surf = PI * a * b
print(f"L'aire de l'ellipse est : {surf:.3f}")
```

---

### 🟢 Exercice 5 : Moyenne Trimestrielle d'Informatique
* **Énoncé** : Calculer la moyenne d'un élève sachant que le contrôle continu (DC) a un coefficient de 1 et le devoir de synthèse (DS) a un coefficient de 2.
  $$\text{Moyenne} = \frac{\text{DC} + 2 \times \text{DS}}{3}$$
* **Algorithme & Code Python** :
```python
dc = float(input("Note du contrôle continu (DC) : "))
ds = float(input("Note de synthèse (DS) : "))

moy = (dc + 2 * ds) / 3
print(f"Moyenne trimestrielle = {moy:.2f} / 20")
```

---

### 🔵 Exercice 6 : Raideur d'un Ressort (Physique Appliquée)
* **Contexte physique** : Loi de Hooke pour un ressort élastique en élongation : $F = k \cdot \Delta L \iff k = \frac{F}{\Delta L}$.
  * $F$ : Force appliquée en Newtons ($N$).
  * $\Delta L$ : Allongement en mètres ($m$).
  * $k$ : Constante de raideur en $N/m$.
* **Script Python** :
```python
F = float(input("Force appliquée F (en Newtons) : "))
delta_L = float(input("Allongement delta_L (en mètres) : "))

k = F / delta_L
print(f"La raideur du ressort est k = {k:.2f} N/m")
```

---

## 📝 6. Trace Écrite pour le Cahier de l'Élève

```markdown
CHAPITRE 2 : LES STRUCTURES SIMPLES (Partie 2)

1. L'Affectation :
   - Notation : variable ← expression (Algorithme)  |  variable = expression (Python)
   - Règle : Évaluation de la droite PUIS affectation à gauche.
   - Attention : L'opérateur = n'est pas une égalité mathématique symétrique !

2. Les Constantes :
   Objets dont la valeur ne varie jamais (ex: PI = 3.14). 
   Convention Python : noms écrits en MAJUSCULES.

3. Calculs scientifiques :
   Toujours vérifier la cohérence des unités et l'emploi des parenthèses dans les fractions !
```

---

## ❓ 7. Auto-Évaluation Formative (5 Questions)

1. **Si `a = 3` et `b = 7`, que valent `a` et `b` après : `a = b ; b = a` ?**  
   *Réponse* : `a = 7` et `b = 7` (la valeur initiale de `a` a été écrasée lors de la première affectation ! Pour permuter, il faut une variable temporaire `aux`).
2. **Comment s'écrit l'échange correct des deux variables `a` et `b` en algorithme ?**  
   *Réponse* : `aux ← a ; a ← b ; b ← aux`.
3. **Que fait l'instruction `c = c + 1` ?**  
   *Réponse* : Elle incrémente la valeur de la variable `c` de 1 (comportement de compteur).
4. **Pourquoi met-on des parenthèses dans `(dc + 2 * ds) / 3` ?**  
   *Réponse* : Sans parenthèses, la division `/ 3` ne s'appliquerait qu'au terme `2 * ds` en raison de la priorité opératoire.
5. **Quelle est l'unité de la raideur $k$ calculée à l'Exercice 6 ?**  
   *Réponse* : En Newtons par mètre ($N/m$).

---

## 🚀 8. Préparation de la Séance 05 (Module 03)
* **Thème** : *Les structures de données : Types numériques, division entière (`//`), reste modulo (`%`) et fonctions de la bibliothèque standard*.
* **À revoir** : La division euclidienne vue au collège (dividende, diviseur, quotient entier, reste).
