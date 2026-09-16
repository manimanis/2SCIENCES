# 📝 Fiche Pédagogique – Séance 05
## Module 03 : Les structures de données
### Thème : Types Numériques (`int`, `float`), Division Euclidienne (`div` / `//`, `mod` / `%) & Bibliothèque Mathématique

---

## 📌 1. Fiche Signalétique de la Séance

| Champ | Description |
| :--- | :--- |
| **Matière** | Informatique |
| **Niveau & Section** | 2ème Année Secondaire – Section Sciences |
| **Durée prévisionnelle** | 1 séance (1h à 1h30) |
| **Cadre de référence** | Programme officiel du Ministère de l'Éducation (Tunisie) |
| **Enseignant** | Mohamed Anis MANI |
| **Supports & Outils** | Ordinateurs, page web `module03.html`, Playground Python (`playground.html`), tableau |
| **Prérequis** | Affectation, variables, E/S (Module 02) |

---

## 🎯 2. Compétences & Objectifs Opérationnels

### Compétences visées :
* **Compétence arithmétique** : Exploiter la division euclidienne et les fonctions arithmétiques pour résoudre des problèmes de décomposition numérique.
* **Compétence syntaxique** : Utiliser sans ambiguïté les opérateurs `//`, `%`, `/`, `**` et importer le module `math`.

### Objectifs opérationnels (À l'issue de la séance, l'élève sera capable de) :
1. **Distinguer** la division réelle `/` de la division entière `div` (`//`) et du reste `mod` (`%`).
2. **Évaluer manuellement** des expressions arithmétiques combinées en respectant les priorités.
3. **Générer des nombres aléatoires** avec `random.randint()` / fonction `Aléa`.
4. **Décomposer une durée** (secondes $\rightarrow$ heures, minutes, secondes) grâce à la division euclidienne (Exercice 10).

---

## ⏱️ 3. Scénario Pédagogique & Déroulement Minuté

```
┌──────────────────────────────────────────────────────────────────────────────┐
│  00 - 15 min : Phase 1 - Découverte : La division euclidienne en informatique │
│  15 - 35 min : Phase 2 - Cours : Opérateurs arithmétiques & module math       │
│  35 - 55 min : Phase 3 - Exercices d'application : Ex 1, Ex 2 & Ex 4 (Aléa)   │
│  55 - 75 min : Phase 4 - Atelier problème réel : Ex 10 (Autonomie batterie)   │
│  75 - 80 min : Phase 5 - Synthèse, trace écrite & préparation Séance 06       │
└──────────────────────────────────────────────────────────────────────────────┘
```

---

## 📖 4. Contenu Didactique & Support de Cours

### 1. Les Deux Types Numériques Scalaires
* **Entier (`int`)** : Ensemble $\mathbb{Z}$ (nombres sans virgule, positifs ou négatifs : `-15`, `0`, `42`).
* **Réel (`float`)** : Ensemble $\mathbb{R}$ (nombres à virgule flottante notée avec un point : `3.14`, `-0.5`).

### 2. Le Triptyque de la Division

| Opération | Notation Algorithmique | Opérateur Python | Type du résultat | Exemple ($17$ et $5$) |
| :--- | :---: | :---: | :---: | :--- |
| **Division réelle** | `/` | `/` | Toujours `float` | `17 / 5` $\rightarrow$ `3.4` |
| **Division entière (Quotient)** | `div` | `//` | `int` si opérandes entiers | `17 // 5` $\rightarrow$ `3` |
| **Reste de la division (Modulo)** | `mod` | `%` | `int` si opérandes entiers | `17 % 5` $\rightarrow$ `2` |

> [!IMPORTANT]
> **Formule fondamentale de la division euclidienne :**
> $$a = b \times (a \mathbin{\text{div}} b) + (a \mathbin{\text{mod}} b) \quad \text{avec} \quad 0 \le (a \mathbin{\text{mod}} b) < |b|$$

### 3. Fonctions Prédéfinies Utiles
* `abs(x)` : Valeur absolue $|x|$.
* `pow(x, y)` ou `x ** y` : Puissance $x^y$.
* `round(x, n)` : Arrondi à $n$ décimales.
* Module `math` : `math.sqrt(x)` (racine carrée $\sqrt{x}$), `math.floor(x)`, `math.ceil(x)`.
* Tirage aléatoire : `alea(min, max)` en algorithme $\rightarrow$ `random.randint(min, max)` en Python.

---

## 🧩 5. Fiche Activités & Corrigés Détaillés

### 🔴 Exercice 1 & 2 : Évaluation d'Expressions Numériques
Calculer le résultat des expressions suivantes :
1. `14 // 4` $\rightarrow$ `3`
2. `14 % 4` $\rightarrow$ `2` (car $14 = 4 \times 3 + 2$)
3. `19 % 2` $\rightarrow$ `1` (test de parité : tout nombre impair donne 1 modulo 2)
4. `2 ** 3 + 10 // 3` $\rightarrow$ $8 + 3 = \mathbf{11}$
5. `round(15.678, 2)` $\rightarrow$ `15.68`

---

### 🟡 Exercice 4 : Fonction Aléa / Nombres Aléatoires
* **Objectif** : Simuler le lancer d'un dé à 6 faces.
* **Algorithme** :
```algorithm
Algorithme Lancer_De
Début
   de ← alea(1, 6)
   Ecrire("Résultat du dé : ", de)
Fin
```
* **Traduction Python** :
```python
import random

de = random.randint(1, 6)
print("Résultat du dé :", de)
```

---

### 🟢 Exercice 10 : Autonomie de la Batterie (Conversion $s \rightarrow h:m:s$)
* **Énoncé** : Une batterie offre une autonomie de $T$ secondes. Calculer le nombre d'heures $H$, minutes $M$ et secondes restantes $S$.
* **Méthode de conversion arithmétique** :
  1. $1\text{ heure} = 3600\text{ secondes}$. Donc : $H = T \mathbin{\text{div}} 3600$.
  2. Reste en secondes après extraction des heures : $R = T \mathbin{\text{mod}} 3600$.
  3. $1\text{ minute} = 60\text{ secondes}$. Donc : $M = R \mathbin{\text{div}} 60$.
  4. Secondes restantes : $S = R \mathbin{\text{mod}} 60$.

* **Algorithme** :
```algorithm
Algorithme Conversion_Duree
Début
   Ecrire("Donner la durée totale en secondes : ")
   Lire(T)
   H ← T div 3600
   R ← T mod 3600
   M ← R div 60
   S ← R mod 60
   Ecrire("Autonomie : ", H, "h ", M, "min ", S, "s")
Fin
```

* **Script Python** :
```python
T = int(input("Donner la durée totale en secondes : "))

H = T // 3600
R = T % 3600
M = R // 60
S = R % 60

print(f"Autonomie : {H}h {M}min {S}s")
```

---

## 📝 6. Trace Écrite pour le Cahier de l'Élève

```markdown
CHAPITRE 3 : LES STRUCTURES DE DONNÉES (Partie 1 : Numérique)

1. Types Numériques :
   - Entier (int) : nombres entiers relatifs (... -2, -1, 0, 1, 2 ...)
   - Réel (float) : nombres à virgule (... 3.14, -0.75 ...)

2. Opérateurs de Division :
   - /  : Division réelle (ex: 7 / 2 = 3.5)
   - // : Division entière (quotient) (ex: 7 // 2 = 3)
   - %  : Modulo (reste de la division) (ex: 7 % 2 = 1)

3. Décomposition d'une durée T en secondes :
   H = T // 3600
   M = (T % 3600) // 60
   S = (T % 3600) % 60
```

---

## ❓ 7. Auto-Évaluation Formative (5 Questions)

1. **Que vaut `25 % 5` ? Que peut-on en déduire sur 25 et 5 ?**  
   *Réponse* : `0`. On en déduit que 25 est divisible par 5 (ou 5 est un diviseur de 25).
2. **Comment vérifier en Python qu'un nombre `n` est pair ?**  
   *Réponse* : La condition est `n % 2 == 0`.
3. **Que produit `10 / 2` en Python ? Quel est son type ?**  
   *Réponse* : `5.0` (de type `float`, car la division `/` renvoie toujours un réel).
4. **Pour calculer $\sqrt{49}$, quelle fonction utilise-t-on ?**  
   *Réponse* : `math.sqrt(49)` (après `import math`), ou `49 ** 0.5`.
5. **Si $T = 3665$ secondes, quelles sont les valeurs de $H$, $M$, $S$ ?**  
   *Réponse* : $1\text{h } 1\text{min } 5\text{s}$ ($3600 + 60 + 5$).

---

## 🚀 8. Préparation de la Séance 06
* **Thème** : *Le type booléen, tables de vérité, portes logiques et priorités*.
* **À revoir** : Les valeurs `Vrai` et `Faux`, et la signification logique de "ET" et "OU".
