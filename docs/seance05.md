# 📝 Fiche Pédagogique – Séance 05
## Module 03 : Les structures de données
### Thème : Le Type Booléen, Opérateurs Logiques, Tables de Vérité, Portes Logiques & Priorités

---

## 📌 1. Fiche Signalétique de la Séance

| Champ | Description |
| :--- | :--- |
| **Matière** | Informatique |
| **Niveau & Section** | 2ème Année Secondaire – Section Sciences |
| **Durée prévisionnelle** | 1 séance (1 heure) |
| **Cadre de référence** | Programme officiel du Ministère de l'Éducation (Tunisie) |
| **Enseignant** | Mohamed Anis MANI |
| **Supports & Outils** | Ordinateurs, page web `module03.html` (simulateur portes logiques), Playground Python, tableau |
| **Prérequis** | Notions de base sur les expressions numériques (Séance 05) |

---

## 🎯 2. Compétences & Objectifs Opérationnels

### Compétences visées :
* **Compétence logique** : Modéliser des conditions décisionnelles par des expressions booléennes formelles.
* **Compétence interdisciplinaire (Technologie / Électronique)** : Relier les opérateurs logiques aux circuits et portes électroniques de base.

### Objectifs opérationnels (À l'issue de la séance, l'élève sera capable de) :
1. **Manipuler** les deux valeurs scalaires du type booléen : `Vrai` (`True`) et `Faux` (`False`).
2. **Utiliser** les opérateurs de comparaison (`==`, `!=`, `<`, `<=`, `>`, `>=`).
3. **Construire** la table de vérité des opérateurs logiques fondamentaux : `NON` (`not`), `ET` (`and`), `OU` (`or`).
4. **Évaluer sans erreur** une expression logique complexe en respectant la hiérarchie stricte des priorités.
5. **Résoudre** un problème combinatoire de logistique (Exercice 12).

---

## ⏱️ 3. Scénario Pédagogique & Déroulement Minuté (Séance de 60 min)

```
┌─────────────────────────────────────────────────────────────────────────────────────┐
│  00 - 10 min : Phase 1 - Accroche : Vrai ou Faux ? La logique binaire               │
│  10 - 25 min : Phase 2 - Cours : Opérateurs booléens (NON, ET, OU) & priorités      │
│  25 - 42 min : Phase 3 - Simulateur interactif : Ex 11 (Circuit logique SVG)        │
│  42 - 55 min : Phase 4 - Problème d'optimisation : Ex 12 (Citerne d'huile)          │
│  55 - 60 min : Phase 5 - Synthèse, trace écrite & amorce des types textuels         │
└─────────────────────────────────────────────────────────────────────────────────────┘
```

---

## 📖 4. Contenu Didactique & Support de Cours

### 1. Le Type Booléen (`bool`)
Un booléen ne peut prendre que deux valeurs exclusives : `Vrai` (`True`) ou `Faux` (`False`). Il est le résultat direct de l'évaluation d'une condition ou d'un prédicat.

### 2. Les Opérateurs de Comparaison (Relationnels)

| Algorithme | Python | Signification | Exemple | Résultat |
| :---: | :---: | :--- | :---: | :---: |
| `=` | `==` | Égalité stricte | `5 == 5` | `True` |
| `≠` | `!=` | Différent de | `5 != 3` | `True` |
| `<` | `<` | Strictement inférieur | `4 < 2` | `False` |
| `≤` | `<=` | Inférieur ou égal | `6 <= 6` | `True` |
| `>` | `>` | Strictement supérieur | `8 > 3` | `True` |
| `≥` | `>=` | Supérieur ou égal | `7 >= 10` | `False` |

> [!CAUTION]
> Attention au piège classique : en Python, le test d'égalité s'écrit obligatoirement avec un **double égal** `==`. L'opérateur simple `=` est réservé à l'affectation !

### 3. Les Trois Opérateurs Logiques Fondamentaux

#### a) L'Opérateur NON (`not`) : L'Inverseur
Inverse la valeur de vérité :
* `NON(Vrai)` = `Faux`  (`not True` $\rightarrow$ `False`)
* `NON(Faux)` = `Vrai`  (`not False` $\rightarrow$ `True`)

#### b) L'Opérateur ET (`and`) : La Conjonction
Le résultat n'est `Vrai` **que si les deux opérandes sont Vrais à la fois** :
| $A$ | $B$ | $A \text{ ET } B$ (`A and B`) |
| :---: | :---: | :---: |
| Faux | Faux | **Faux** |
| Faux | Vrai | **Faux** |
| Vrai | Faux | **Faux** |
| Vrai | Vrai | **Vrai** |

#### c) L'Opérateur OU (`or`) : La Disjonction Inclusive
Le résultat est `Vrai` **dès lors qu'au moins l'un des opérandes est Vrai** :
| $A$ | $B$ | $A \text{ OU } B$ (`A or B`) |
| :---: | :---: | :---: |
| Faux | Faux | **Faux** |
| Faux | Vrai | **Vrai** |
| Vrai | Faux | **Vrai** |
| Vrai | Vrai | **Vrai** |

### 4. Hiérarchie des Priorités Opératoires
En l'absence de parenthèses, l'évaluation suit l'ordre strict suivant :
1. **Parenthèses** `( )` (priorité maximale).
2. **Opérateurs arithmétiques** (`**`, puis `*`, `/`, `//`, `%`, puis `+`, `-`).
3. **Opérateurs relationnels** (`==`, `!=`, `<`, `<=`, `>`, `>=`).
4. **Opérateur logique `NON` (`not`)**.
5. **Opérateur logique `ET` (`and`)**.
6. **Opérateur logique `OU` (`or`)** (priorité minimale).

---

## 🧩 5. Fiche Activités & Corrigés Détaillés

### 🔴 Exercice 11 : Circuit Logique et Portes Logiques
* **Schéma interactif** : Visualisation en direct d'un circuit combinatoire avec deux entrées $A, B$ et une porte AND/OR suivie d'un inverseur NOT.
* **Expression booléenne équivalente** :
  $$S = \text{NON}(A \text{ ET } B) \quad \text{(Porte NAND)}$$
* **Table de vérité complète** :
  * Si $A=0, B=0 \implies S = \text{not}(0) = \mathbf{1}$
  * Si $A=0, B=1 \implies S = \text{not}(0) = \mathbf{1}$
  * Si $A=1, B=0 \implies S = \text{not}(0) = \mathbf{1}$
  * Si $A=1, B=1 \implies S = \text{not}(1) = \mathbf{0}$

---

### 🟡 Exercice 12 : Citerne d'Huile et Logistique de Transport
* **Énoncé** : Un agriculteur produit $Q$ litres d'huile d'olive. Il dispose de fûts de contenance $C_1 = 50\text{ litres}$ et de bouteilles de contenance $C_2 = 5\text{ litres}$.
* **Objectif** : Remplir le maximum de fûts de 50L, puis avec le reste remplir le maximum de bouteilles de 5L, et enfin déterminer les litres restants non conditionnés.
* **Analyse & Traitements** :
  1. Nombre de fûts de 50L : $N_1 \leftarrow Q \mathbin{\text{div}} 50$
  2. Reste d'huile après les fûts : $R_1 \leftarrow Q \mathbin{\text{mod}} 50$
  3. Nombre de bouteilles de 5L : $N_2 \leftarrow R_1 \mathbin{\text{div}} 5$
  4. Reste final non emballé : $R_2 \leftarrow R_1 \mathbin{\text{mod}} 5$
  5. Condition d'emballage parfait (sans perte) : $R_2 == 0$

* **Traduction Python** :
```python
Q = int(input("Quantité totale d'huile récoltée (en litres) : "))

N1 = Q // 50
R1 = Q % 50

N2 = R1 // 5
R2 = R1 % 5

parfait = (R2 == 0)

print(f"Fûts de 50L : {N1}")
print(f"Bouteilles de 5L : {N2}")
print(f"Reste non conditionné : {R2} litre(s)")
print("Conditionnement sans perte :", parfait)
```

---

## 📝 6. Trace Écrite pour le Cahier de l'Élève

```markdown
CHAPITRE 3 : LES STRUCTURES DE DONNÉES (Partie 2 : Booléen)

1. Le Type Booléen :
   Prend seulement deux valeurs : Vrai (True) ou Faux (False).

2. Opérateurs Logiques :
   - NON / not : Inverseur (not True = False)
   - ET  / and : Vrai SEULEMENT si les deux conditions sont Vraies.
   - OU  / or  : Vrai si AU MOINS l'une des conditions est Vraie.

3. Ordre de Priorité (du plus prioritaire au moins prioritaire) :
   Parenthèses ( )  ➔  Arithmétique  ➔  Comparaisons (==, !=, <...)  ➔  not  ➔  and  ➔  or
```

---

## ❓ 7. Auto-Évaluation Formative (5 Questions)

1. **Que vaut l'expression `(5 > 2) and (3 == 4)` ?**  
   *Réponse* : `False` (car `True and False` donne `False`).
2. **Que vaut l'expression `not (10 < 3) or (4 >= 4)` ?**  
   *Réponse* : `True` (car `not False` donne `True`, et `True or ...` donne immédiatement `True`).
3. **Dans l'expression `a or b and c`, quel opérateur est évalué en premier ?**  
   *Réponse* : Le `and` est prioritaire sur le `or`. L'expression est équivalente à `a or (b and c)`.
4. **Quelle condition permet de vérifier qu'une note `n` est comprise entre 10 et 20 inclus ?**  
   *Réponse* : `(n >= 10) and (n <= 20)` ou en Python `10 <= n <= 20`.
5. **Quelle est la différence fondamentale entre `=` et `==` ?**  
   *Réponse* : `=` est une affectation (action de stockage), tandis que `==` est une comparaison d'égalité (test logique qui renvoie un booléen).

---

## 🚀 8. Préparation de la Séance 07
* **Thème** : *Les types textuels (I) : Type caractère, code ASCII (`ord`/`chr`), indexation et longueur*.
* **Curiosité** : Quel est le code ASCII du chiffre `'0'` et de la lettre `'A'` ?
