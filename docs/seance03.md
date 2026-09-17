# 📝 Fiche Pédagogique – Séance 03
## Module 02 : Les structures simples
### Thème : Atelier d'Applications Pratiques & Modélisation Scientifique (Géométrie, Physique & Statistiques)

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
| **Prérequis** | E/S standard, Cast (`int`, `float`), règles de nommage, affectation et constantes (Séance 02) |

---

## 🎯 2. Compétences & Objectifs Opérationnels

### Compétences visées :
* **Compétence interdisciplinaire** : Modéliser et résoudre des problèmes concrets issus des sciences (géométrie, physique, calcul de moyennes).
* **Compétence pratique** : Traduire des formules complexes en expressions de calcul informatique valides avec manipulation de constantes et bibliothèques standards (`math`).

### Objectifs opérationnels (À l'issue de la séance, l'élève sera capable de) :
1. **Manipuler** des constantes mathématiques (ex: $\pi = 3.14159$) et des fonctions de la bibliothèque `math` (`math.sin()`, `math.pi`).
2. **Convertir** un angle de degrés en radians pour appliquer correctement les formules trigonométriques.
3. **Traduire** des formules avec coefficients et pondérations (moyenne trimestrielle).
4. **Modéliser** une loi physique en algorithme (loi de Hooke $k = \frac{F}{\Delta L}$).
5. **Vérifier** la cohérence des résultats sur le Playground Python via des jeux d'essais variés.
6. **Décomposer** un calcul géométrique complexe à étapes multiples en mémorisant une variable intermédiaire (Exercice 8 : Formule de Héron).

---

## ⏱️ 3. Scénario Pédagogique & Déroulement Minuté (Séance de 60 min)

```
┌─────────────────────────────────────────────────────────────────────────────────────┐
│  00 - 08 min : Phase 1 - Rappel : Syntaxe de l'affectation, constantes et pièges    │
│  08 - 24 min : Phase 2 - Atelier Géométrie : Ex 4 (Parallélogramme) & Ex 5 (Ellipse)│
│  24 - 38 min : Phase 3 - Atelier Stats & Physique : Ex 6 (Moyenne) & Ex 7 (Ressort) │
│  38 - 54 min : Phase 4 - Défi Avancé : Ex 8 (Formule de Héron d'Alexandrie)         │
│  54 - 60 min : Phase 5 - Bilan du Module 02 & amorce du Module 03 (Types de données)│
└─────────────────────────────────────────────────────────────────────────────────────┘
```

---

## 📖 4. Rappels Méthodologiques & Outils Scientifiques

### 1. La Conversion Trigonométrique (Degrés $\rightarrow$ Radians)
En mathématiques et en informatique, les fonctions trigonométriques (`sin`, `cos`, `tan`) attendent impérativement des angles exprimés en **radians** :
$$\theta_{\text{rad}} = \theta_{\text{deg}} \times \frac{\pi}{180}$$

*En Python :*
```python
import math
angle_rad = angle_deg * math.pi / 180
# ou directement : angle_rad = math.radians(angle_deg)
```

### 2. Formules Pondérées
Pour une moyenne pondérée de deux notes $N_1$ (coef $c_1$) et $N_2$ (coef $c_2$) :
$$\text{Moyenne} = \frac{c_1 \times N_1 + c_2 \times N_2}{c_1 + c_2}$$

### 3. Modélisation de Lois Physiques
Pour une relation physique $F = k \cdot \Delta L$, la détermination de la raideur s'écrit informatiquement :
```python
k = F / delta_L
```

---

## 🧩 5. Fiche Activités & Corrigés Détaillés

### 🔴 Exercice 4 : Aire d'un Parallélogramme
* **Énoncé** : Calculer l'aire d'un parallélogramme connaissant les côtés adjacents $a$ et $b$ ainsi que l'angle $\theta$ formé entre eux (en degrés).
* **Formule** : $S = a \times b \times \sin(\theta)$
* **TDO** :
  * Variables : `a`, `b`, `angle`, `angle_rad`, `surf` : `réel`
* **Algorithme** :
```algorithm
Algorithme Aire_Parallelogramme
Début
   Ecrire("Longueur du côté a : ") ; Lire(a)
   Ecrire("Longueur du côté b : ") ; Lire(b)
   Ecrire("Angle en degrés theta : ") ; Lire(angle)
   angle_rad ← angle * 3.14159 / 180
   surf ← a * b * Sin(angle_rad)
   Ecrire("L'aire du parallélogramme est : ", surf)
Fin
```
* **Script Python (Playground)** :
```python
import math

a = float(input("Longueur du côté a : "))
b = float(input("Longueur du côté b : "))
angle = float(input("Angle en degrés : "))

angle_rad = angle * math.pi / 180
surf = a * b * math.sin(angle_rad)

print(f"L'aire du parallélogramme est : {surf:.2f}")
```

---

### 🟡 Exercice 5 : Aire d'une Ellipse
* **Énoncé** : Calculer l'aire d'une ellipse définie par ses demi-axes $a$ et $b$.
* **Formule** : $S = \pi \times a \times b$
* **TDO** :
  * Constante : `PI = 3.14159` : `réel`
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

### 🟢 Exercice 6 : Moyenne Trimestrielle Pondérée d'Informatique
* **Énoncé** : Calculer la moyenne trimestrielle sachant que le devoir de contrôle continu (DC) compte pour coefficient 1 et le devoir de synthèse (DS) compte pour coefficient 2.
* **Formule** : $\text{Moyenne} = \frac{\text{DC} + 2 \times \text{DS}}{3}$
* **TDO** : `dc`, `ds`, `moy` : `réel`
* **Script Python** :
```python
dc = float(input("Note du contrôle continu (DC) : "))
ds = float(input("Note de synthèse (DS) : "))

moy = (dc + 2 * ds) / 3
print(f"Moyenne trimestrielle = {moy:.2f} / 20")
```

---

### 🔵 Exercice 7 : Raideur d'un Ressort (Loi de Hooke)
* **Contexte physique** : Loi d'élasticité d'un ressort : $F = k \cdot \Delta L \iff k = \frac{F}{\Delta L}$.
* **TDO** : `F`, `delta_L`, `k` : `réel`
* **Script Python** :
```python
F = float(input("Force appliquée F (en Newtons) : "))
delta_L = float(input("Allongement delta_L (en mètres) : "))

k = F / delta_L
print(f"La constante de raideur du ressort est k = {k:.2f} N/m")
```

---

### 🟣 Exercice 8 : Formule de Héron d'Alexandrie (Défi Avancé)
* **Énoncé** : Calculer l'aire d'un triangle quelconque à partir des longueurs de ses trois côtés $a$, $b$ et $c$.
* **Formules** :
  * Demi-périmètre : $p = \frac{a + b + c}{2}$
  * Aire : $S = \sqrt{p \times (p - a) \times (p - b) \times (p - c)}$
* **TDO** :
  * Variables d'entrée : `a`, `b`, `c` : `réel`
  * Variable intermédiaire : `p` : `réel`
  * Variable de sortie : `surf` : `réel`
* **Algorithme** :
```algorithm
Algorithme Aire_Heron
Début
   Ecrire("Longueur du côté a : ") ; Lire(a)
   Ecrire("Longueur du côté b : ") ; Lire(b)
   Ecrire("Longueur du côté c : ") ; Lire(c)
   p ← (a + b + c) / 2
   surf ← RacineCarre(p * (p - a) * (p - b) * (p - c))
   Ecrire("Demi-périmètre p = ", p)
   Ecrire("L'aire du triangle est : ", surf)
Fin
```
* **Script Python (Playground)** :
```python
import math

a = float(input("Côté a : "))
b = float(input("Côté b : "))
c = float(input("Côté c : "))

p = (a + b + c) / 2
surf = math.sqrt(p * (p - a) * (p - b) * (p - c))

print(f"Demi-périmètre p = {p:.2f}")
print(f"Aire du triangle = {surf:.3f}")
```

---

## 📝 6. Trace Écrite pour le Cahier de l'Élève

```markdown
CHAPITRE 2 : MODÉLISATION SCIENTIFIQUE AVEC LES STRUCTURES SIMPLES

1. Utilisation de la bibliothèque math en Python :
   import math
   - math.pi        ➔ Constante Pi (3.14159265...)
   - math.sin(rad)  ➔ Sinus d'un angle en RADIANS
   - math.sqrt(x)   ➔ Racine carrée de x

2. Conversion d'angle en radians :
   angle_rad = angle_deg * math.pi / 180

3. Traduction rigoureuse des formules :
   - Moyenne pondérée : moy = (c1 * n1 + c2 * n2) / (c1 + c2)
   - Loi de Hooke : k = F / delta_L
```

---

## ❓ 7. Auto-Évaluation Formative (5 Questions)

1. **Pourquoi ne peut-on pas passer directement un angle en degrés à `math.sin()` ?**  
   *Réponse* : Parce que les fonctions trigonométriques informatiques sont standardisées en radians.
2. **Pour un rectangle de longueur $8$ et largeur $5$, que vaut l'aire du parallélogramme pour $\theta = 90^\circ$ ?**  
   *Réponse* : $\sin(90^\circ) = 1 \implies S = 8 \times 5 \times 1 = 40$ (le rectangle est un parallélogramme particulier).
3. **Que se passe-t-il dans le calcul de la moyenne si l'on oublie les parenthèses : `dc + 2 * ds / 3` ?**  
   *Réponse* : Par priorité de calcul, seul `2 * ds` est divisé par 3, ce qui fausse totalement le résultat.
4. **Quelle est l'unité de la constante de raideur $k$ ?**  
   *Réponse* : Le Newton par mètre ($N/m$).
5. **Quelle est la syntaxe pour afficher un nombre réel avec 2 décimales en Python ?**  
   *Réponse* : `print(f"{valeur:.2f}")` ou `round(valeur, 2)`.

---

## 🚀 8. Préparation de la Séance Suivante (Séance 04)
* **Thème** : *Module 03 – Les Structures de Données : Types numériques (`int`, `float`), division euclidienne (`//`, `%`) et fonctions arithmétiques*.
* **À préparer** : Revoir la notion de quotient et reste dans la division euclidienne.
