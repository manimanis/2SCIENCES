# 📝 Fiche Pédagogique – Séance 13
## Module 04 : Les structures conditionnelles
### Thème : Géométrie Analytique & Chimie Organique : Nature d'un Triangle, Alcools & Droites Affines

---

## 📌 1. Fiche Signalétique de la Séance

| Champ | Description |
| :--- | :--- |
| **Matière** | Informatique |
| **Niveau & Section** | 2ème Année Secondaire – Section Sciences |
| **Durée prévisionnelle** | 1 séance (1 heure) |
| **Cadre de référence** | Programme officiel du Ministère de l'Éducation (Tunisie) |
| **Enseignant** | Mohamed Anis MANI |
| **Supports & Outils** | Ordinateurs, page web `module04.html` (Canvas 2D et 3D), Playground Python, tableau |
| **Prérequis** | Conditions imbriquées, théorème de Pythagore, équations de droites |

---

## 🎯 2. Compétences & Objectifs Opérationnels

### Compétences visées :
* **Compétence interdisciplinaire (Maths & Sciences Physiques)** : Mobiliser l'algorithmique pour vérifier des propriétés géométriques et calculer des grandeurs molaires chimiques.
* **Compétence graphique** : Visualiser graphiquement l'intersection de deux courbes affines via le Canvas HTML5.

### Objectifs opérationnels (À l'issue de la séance, l'élève sera capable de) :
1. **Contrôler** l'inégalité triangulaire et classifier un triangle (Équilatéral, Isocèle, Rectangle, Scalène) (Exercice 16).
2. **Déterminer** la formule brute et la masse molaire d'un alcool primaire selon le nombre de carbones $n$ (Exercice 18).
3. **Résoudre** le système d'intersection de deux droites affines et identifier les cas de parallélisme (Exercice 19).

---

## ⏱️ 3. Scénario Pédagogique & Déroulement Minuté (Séance de 60 min)

```
┌─────────────────────────────────────────────────────────────────────────────────────┐
│  00 - 10 min : Phase 1 - Accroche : La classification géométrique en machine        │
│  10 - 25 min : Phase 2 - Exercice 16 : Inégalité triangulaire & Pythagore           │
│  25 - 40 min : Phase 3 - Exercice 18 : Chimie des alcools & Masse molaire           │
│  40 - 55 min : Phase 4 - Exercice 19 : Intersection de droites affines (Canvas)     │
│  55 - 60 min : Phase 5 - Bilan global du Module 04 & introduction Module 05         │
└─────────────────────────────────────────────────────────────────────────────────────┘
```

---

## 📖 4. Contenu Didactique & Support de Cours

### 1. Classification Géométrique d'un Triangle
Soient $a, b, c$ les longueurs des trois côtés d'un triangle, avec $c$ le côté le plus long :
1. **Condition d'existence (Inégalité triangulaire)** :
   $$a + b > c \quad \text{et} \quad a + c > b \quad \text{et} \quad b + c > a$$
2. **Équilatéral** : $a = b \quad \text{et} \quad b = c$.
3. **Rectangle (Réciproque de Pythagore)** : $a^2 + b^2 = c^2$ (ou permutations selon l'hypoténuse).
4. **Isocèle** : $a = b \quad \text{ou} \quad b = c \quad \text{ou} \quad a = c$.
5. **Isocèle Rectangle** : cumule les deux propriétés précédentes.

### 2. Intersection de Deux Droites Affines
Soient $(D_1) : y = m_1 x + p_1$ et $(D_2) : y = m_2 x + p_2$ :
* Si $m_1 = m_2$ :
  * Si $p_1 = p_2$ : Droites **confondues** (infinité de points communs).
  * Si $p_1 \ne p_2$ : Droites **strictement parallèles** (aucun point commun).
* Si $m_1 \ne m_2$ : Droites **sécantes** en un point unique d'abscisse $x = \frac{p_2 - p_1}{m_1 - m_2}$ et d'ordonnée $y = m_1 x + p_1$.

---

## 🧩 5. Fiche Activités & Corrigés Détaillés

### 🔴 Exercice 16 : Nature d'un Triangle
```python
a = float(input("Côté a : "))
b = float(input("Côté b : "))
c = float(input("Côté c : "))

# 1. Vérification de l'existence du triangle
if (a + b <= c) or (a + c <= b) or (b + c <= a) or (a <= 0 or b <= 0 or c <= 0):
    print("Impossible : Ces longueurs ne forment pas un triangle valide !")
else:
    # 2. Analyse des propriétés
    equilateral = (a == b == c)
    isocele = (a == b or b == c or a == c)
    
    # Réciproque de Pythagore (avec tolérance d'arrondi)
    rect_a = abs((b**2 + c**2) - a**2) < 1e-6
    rect_b = abs((a**2 + c**2) - b**2) < 1e-6
    rect_c = abs((a**2 + b**2) - c**2) < 1e-6
    rectangle = (rect_a or rect_b or rect_c)

    if equilateral:
        print("Le triangle est ÉQUILATÉRAL.")
    elif isocele and rectangle:
        print("Le triangle est ISOCÈLE RECTANGLE.")
    elif isocele:
        print("Le triangle est ISOCÈLE.")
    elif rectangle:
        print("Le triangle est RECTANGLE.")
    else:
        print("Le triangle est SCALÈNE (Quelconque).")
```

---

### 🟡 Exercice 18 : Chimie des Alcools ($C_n H_{2n+1}OH$)
* **Formule générale** : $C_n H_{2n+2}O$.
* **Masses molaires atomiques** : $M(C) = 12\text{ g/mol}$, $M(H) = 1\text{ g/mol}$, $M(O) = 16\text{ g/mol}$.
* **Masse molaire totale** :
  $$M = 12n + (2n + 1) \times 1 + 16 + 1 = 14n + 18\text{ g/mol}$$
* **Code Python** :
```python
n = int(input("Nombre d'atomes de carbone n (ex: 1, 2, 3...) : "))

if n <= 0:
    print("Erreur : n doit être un entier strictement positif.")
else:
    h = 2 * n + 1
    masse_molaire = 14 * n + 18
    
    # Noms usuels des premiers alcools
    noms = {1: "Méthanol", 2: "Éthanol", 3: "Propanol", 4: "Butanol"}
    nom_alcool = noms.get(n, f"Alcool à {n} carbones")

    print(f"Formule brute : C{n}H{h}OH")
    print(f"Nom : {nom_alcool}")
    print(f"Masse molaire M = {masse_molaire} g/mol")
```

---

### 🟢 Exercice 19 : Intersection de Deux Droites Affines
```python
print("Droite 1 : y = m1 * x + p1")
m1 = float(input("Pente m1 : "))
p1 = float(input("Ordonnée à l'origine p1 : "))

print("Droite 2 : y = m2 * x + p2")
m2 = float(input("Pente m2 : "))
p2 = float(input("Ordonnée à l'origine p2 : "))

if m1 == m2:
    if p1 == p2:
        print("Les droites sont CONFONDUES (infinité de points communs).")
    else:
        print("Les droites sont STRICTEMENT PARALLÈLES (aucun point d'intersection).")
else:
    x_inter = (p2 - p1) / (m1 - m2)
    y_inter = m1 * x_inter + p1
    print(f"Les droites sont SÉCANTES au point I({x_inter:.2f}, {y_inter:.2f}).")
```

---

## 📝 6. Trace Écrite pour le Cahier de l'Élève

```markdown
CHAPITRE 4 : SYNTHÈSE DES APPLICATIONS SCIENTIFIQUES

1. Nature d'un Triangle :
   - Tester l'inégalité triangulaire en premier lieu.
   - Équilatéral ➔ 3 côtés égaux.
   - Rectangle ➔ Réciproque de Pythagore (a² + b² = c²).
   - Isocèle ➔ 2 côtés égaux.

2. Intersection de Droites Affines :
   - Si m1 == m2 et p1 == p2 ➔ Confondues
   - Si m1 == m2 et p1 != p2 ➔ Parallèles
   - Si m1 != m2            ➔ Sécantes en I((p2-p1)/(m1-m2), m1*x+p1)
```

---

## ❓ 7. Auto-Évaluation Formative (5 Questions)

1. **Les côtés $3, 4, 5$ forment-ils un triangle rectangle ?**  
   *Réponse* : Oui, car $3^2 + 4^2 = 9 + 16 = 25 = 5^2$ (triangle rectangle classique).
2. **Quelle est la masse molaire de l'éthanol ($C_2 H_5 OH$) ?**  
   *Réponse* : $14 \times 2 + 18 = 28 + 18 = \mathbf{46\text{ g/mol}}$.
3. **Que dire de deux droites ayant $m_1 = 3, p_1 = 4$ et $m_2 = 3, p_2 = -2$ ?**  
   *Réponse* : Elles ont la même pente ($3$) mais des ordonnées différentes : elles sont strictement parallèles.
4. **Pourquoi teste-t-on `a + b <= c` pour rejeter un triangle ?**  
   *Réponse* : Si la somme de deux côtés est inférieure ou égale au troisième, les segments ne peuvent pas se refermer pour former un triangle.
5. **Combien de carbones possède le méthanol ?**  
   *Réponse* : $1$ seul atome de carbone ($n=1$).

---

## 🚀 8. Préparation de la Séance 15 (Module 05)
* **Thème** : *Structure itérative complète : Découverte de la boucle `Pour` & fonction `range(début, fin, pas)`*.
* **Problème d'amorce** : Comment afficher 100 fois le mot "Bonjour" sans écrire 100 fois l'instruction `print` ?
