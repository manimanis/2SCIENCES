# 📝 Fiche Pédagogique – Séance 12
## Module 04 : Les structures conditionnelles
### Thème : Modélisation Mathématique : Résolution Algorithmique des Équations du 1er et 2ème Degré

---

## 📌 1. Fiche Signalétique de la Séance

| Champ | Description |
| :--- | :--- |
| **Matière** | Informatique |
| **Niveau & Section** | 2ème Année Secondaire – Section Sciences |
| **Durée prévisionnelle** | 1 séance (1 heure) |
| **Cadre de référence** | Programme officiel du Ministère de l'Éducation (Tunisie) |
| **Enseignant** | Mohamed Anis MANI |
| **Supports & Outils** | Ordinateurs, page web `module04.html`, Playground Python (`playground.html`), tableau |
| **Prérequis** | Module `math` (`math.sqrt`), conditions imbriquées `if...elif...else` |

---

## 🎯 2. Compétences & Objectifs Opérationnels

### Compétences visées :
* **Compétence mathématique & rigueur** : Analyser l'exhaustivité de l'ensemble des solutions d'une équation sans omettre les cas dégénérés ($a=0$).
* **Compétence de programmation défensive** : Sécuriser les calculs (interdiction de calculer la racine d'un nombre strictement négatif sous peine de plantage).

### Objectifs opérationnels (À l'issue de la séance, l'élève sera capable de) :
1. **Disséquer** l'arbre de décision complet de l'équation $ax + b = 0$ ($S = \mathbb{R}$, $S = \emptyset$, ou $S = \{-b/a\}$).
2. **Calculer** le discriminant $\Delta = b^2 - 4ac$.
3. **Programmer** la discussion complète du second degré selon le signe de $\Delta$.
4. **Mettre en œuvre** `math.sqrt()` de manière sécurisée uniquement lorsque $\Delta \ge 0$.

---

## ⏱️ 3. Scénario Pédagogique & Déroulement Minuté (Séance de 60 min)

```
┌─────────────────────────────────────────────────────────────────────────────────────┐
│  00 - 10 min : Phase 1 - Accroche : L'arbre de décision de la résolution d'équation │
│  10 - 25 min : Phase 2 - Cours : Discussion rigoureuse des cas & discriminant Δ     │
│  25 - 42 min : Phase 3 - Exercice 15 : Équation du 1er degré (ax + b = 0)           │
│  42 - 55 min : Phase 4 - Exercice 17 : Équation du 2nd degré (ax² + bx + c = 0)     │
│  55 - 60 min : Phase 5 - Synthèse, trace écrite & préparation Séance 13             │
└─────────────────────────────────────────────────────────────────────────────────────┘
```

---

## 📖 4. Contenu Didactique & Support de Cours

### 1. Arbre de Décision de l'Équation du 1er Degré ($ax + b = 0$)
Pour résoudre $ax + b = 0$, la division par $a$ n'est licite que si $a \ne 0$ :

```
                        Est-ce que a = 0 ?
                           /          \
                      OUI /            \ NON
                         /              \
                 Est-ce que b = 0 ?      Solution unique :
                    /          \           x = -b / a
               OUI /            \ NON
                  /              \
           Infinité de        Impossible !
           solutions (R)       S = Ensemble vide (∅)
```

### 2. Résolution du 2ème Degré ($ax^2 + bx + c = 0$ avec $a \ne 0$)
On calcule le discriminant : $\mathbf{\Delta = b^2 - 4ac}$.

| Condition sur $\Delta$ | Nombre de solutions réelles | Expression des racines |
| :---: | :---: | :--- |
| $\mathbf{\Delta > 0}$ | **Deux solutions réelles distinctes** | $x_1 = \frac{-b - \sqrt{\Delta}}{2a} \quad \text{et} \quad x_2 = \frac{-b + \sqrt{\Delta}}{2a}$ |
| $\mathbf{\Delta = 0}$ | **Une solution double** | $x_0 = \frac{-b}{2a}$ |
| $\mathbf{\Delta < 0}$ | **Aucune solution réelle** | $S = \emptyset$ (pas de racine dans $\mathbb{R}$) |

---

## 🧩 5. Fiche Activités & Corrigés Détaillés

### 🔴 Exercice 15 : Équation du 1er Degré ($ax + b = 0$)
```python
a = float(input("Coefficient a : "))
b = float(input("Coefficient b : "))

if a == 0:
    if b == 0:
        print("L'équation admet une infinité de solutions (S = ℝ).")
    else:
        print("L'équation est impossible (S = ∅).")
else:
    x = -b / a
    print(f"L'équation admet une solution unique : x = {x:.3f}")
```

---

### 🟡 Exercice 17 : Équation du 2ème Degré ($ax^2 + bx + c = 0$)
```python
import math

print("Résolution de ax² + bx + c = 0")
a = float(input("Coefficient a (a ≠ 0) : "))
b = float(input("Coefficient b : "))
c = float(input("Coefficient c : "))

if a == 0:
    print("Attention : Ce n'est pas une équation du 2nd degré (a = 0) !")
    if b != 0:
        print(f"Solution du 1er degré : x = {-c / b:.3f}")
    else:
        print("Équation dégénérée.")
else:
    delta = (b ** 2) - (4 * a * c)
    print(f"Discriminant Δ = {delta:.3f}")

    if delta > 0:
        racine_delta = math.sqrt(delta)
        x1 = (-b - racine_delta) / (2 * a)
        x2 = (-b + racine_delta) / (2 * a)
        print(f"Deux solutions distinctes dans ℝ :")
        print(f"  x1 = {x1:.3f}")
        print(f"  x2 = {x2:.3f}")
    elif delta == 0:
        x0 = -b / (2 * a)
        print(f"Une solution double dans ℝ : x0 = {x0:.3f}")
    else:
        print("Le discriminant est strictement négatif (Δ < 0).")
        print("L'équation n'admet aucune solution réelle (S = ∅).")
```

---

## 📝 6. Trace Écrite pour le Cahier de l'Élève

```markdown
CHAPITRE 4 : LES STRUCTURES CONDITIONNELLES (Partie 5 : Modélisation Maths)

1. Équation du 1er degré (ax + b = 0) :
   - Si a = 0 et b = 0 ➔ Infinité de solutions (ℝ)
   - Si a = 0 et b ≠ 0 ➔ Impossible (∅)
   - Si a ≠ 0          ➔ Solution x = -b / a

2. Équation du 2nd degré (ax² + bx + c = 0) :
   - Calcul de Δ = b² - 4ac
   - Si Δ > 0 ➔ Deux racines réelles : x1, x2 = (-b ± √Δ) / (2a)
   - Si Δ = 0 ➔ Une racine double : x0 = -b / (2a)
   - Si Δ < 0 ➔ Pas de racine dans ℝ (S = ∅)
```

---

## ❓ 7. Auto-Évaluation Formative (5 Questions)

1. **Que se passe-t-il si on appelle `math.sqrt(-9)` en Python ?**  
   *Réponse* : Une exception critique est levée : `ValueError: math domain error`.
2. **Quelles sont les solutions de l'équation $x^2 - 5x + 6 = 0$ ?**  
   *Réponse* : $\Delta = 25 - 24 = 1 > 0 \implies x_1 = \frac{5 - 1}{2} = \mathbf{2}$ et $x_2 = \frac{5 + 1}{2} = \mathbf{3}$.
3. **Combien de solutions réelles admet l'équation $x^2 + 4 = 0$ ?**  
   *Réponse* : Aucune solution réelle ($a=1, b=0, c=4 \implies \Delta = -16 < 0$).
4. **Pourquoi teste-t-on `a == 0` avant de calculer $\Delta$ ?**  
   *Réponse* : Pour s'assurer qu'il s'agit bien d'une parabole du second degré et éviter une division par zéro dans la formule des racines $\frac{\dots}{2a}$.
5. **Quelle est la solution de $0x + 5 = 0$ ?**  
   *Réponse* : $S = \emptyset$ (impossible).

---

## 🚀 8. Préparation de la Séance 14
* **Thème** : *Géométrie analytique & Chimie appliquée : Nature d'un triangle, alcools et droites affines*.
* **À revoir** : Le théorème de Pythagore et les formules des droites affines sécantes.
