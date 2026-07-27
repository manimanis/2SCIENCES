# INFORMATIQUE

## Les étapes de résolution d'un problème

### 1. Présentation

L'informatique est un outil précieux dans tous les domaines : mathématiques, physiques, économie, astronomie, énergie, médecine, enseignement, etc.

Les programmes informatiques sont développés dans le but de résoudre des problèmes de tous les genres et les tailles.

Un programme effectue le traitement des données selon un algorithme préétablit.

Ainsi, un problème peut être de petite taille (calculer la somme de deux entiers) ou de grande taille (contrôler une navette spatiale ou un réacteur nucléaire à distance).

### 2. Étapes de résolution

Le processus de résolution d'un problème comprend 4 étapes :

a) L'analyse du problème  
b) L'élaboration de l'algorithme  
c) L'implémentation de l'algorithme  
d) L'exploitation et la maintenance

#### a. Analyse du problème

Cette étape s'intéresse aux transformations (ou traitements) à effectuer sur les entrées pour produire des sorties utiles.

#### b. L'algorithme

Un algorithme est une suite finie d'étapes permettant de résoudre un problème.

Un algorithme est écrit, souvent, en pseudo-code et il doit respecter la syntaxe suivante :

```
Algorithme Nom
Début
    Traitements
Fin
```

**TDO** (Tableau des Données et Objets)

| Objet | Type |
|-------|------|
|       |      |

#### c. Le programme

L'algorithme écrit en pseudo-code n'est pas exploitable sur un ordinateur. Il doit être, par exemple, traduit en Python. Python est un langage de programmation, parmi d'autres.

#### d. Exécution et tests

Le programme est exécuté, corrigé et débogué afin d'éliminer tous les disfonctionnements possibles.

---

### 3. Exercices

#### Exercice 1 - Problème des deux cordes

Tu as 2 cordes qui brûlent en exactement 60 minutes, mais pas de façon uniforme (elles peuvent brûler plus vite à certains endroits).

**Question :** Comment mesurer exactement 45 minutes avec ces deux cordes et un briquet ?

#### Exercice 2 - Problème des trois ampoules

Tu es dans une pièce fermée avec 3 interrupteurs. Ces interrupteurs contrôlent trois lampes situées dans une autre pièce, que tu ne peux pas voir depuis ta position.

Tu peux :
- Actionner les interrupteurs autant de fois que tu veux.
- Aller une seule fois dans la pièce où se trouve les ampoules pour vérifier leurs états (allumées, éteintes).

**Question :** Comment déterminer quel interrupteur contrôle quelle ampoule, en une seule visite dans la pièce de l'ampoule ?

---

#### Exercice 3 - Calcul Somme et Produit

On veut écrire un programme Python qui calcule et affiche la somme et le produit de deux entiers `a` et `b`.

**Analyse**

| Entrées | Traitements | Sorties |
|---------|-------------|---------|
|         |             |         |

**Algorithme**

**TDO**

| Objet | Type |
|-------|------|
|       |      |

---

#### Exercice 4 - Aire d'une forme

1. Calculer l'aire de cette forme de deux façons différentes.

- 3 carrés + 1 rectangle
- 2 trapèzes + 1 rectangle

2. Écrire l'algorithme d'un programme qui permet de :
   - Saisir la valeur du côté `a`.
   - Calculer et afficher l'aire de la forme.

---

#### Exercice 5 - Démarche de résolution d'un problème

Compléter le schéma par le mot manquant :

Exécution et Test – Analyse – Programme – Algorithme

---

#### Exercice 6 - Aire d'une forme (suite)

1. Calculer l'air de la forme ci-contre.
2. Analyser le problème.
3. Écrire l'algorithme puis le traduire en Python.

---

#### Exercice 7 - Prédécesseur et Successeur

Écrire l'algorithme d'un programme qui saisit un nombre pair `a` puis calcule le nombre pair qui le précède et celui qui lui succède.

**Exemple :** `a = 8` ➔ Le programme affiche : `6 – 8 – 10`

---

## Les structures simples

### 1. La sortie

La sortie, ou l'affichage, se fait par défaut sur le périphérique de sortie standard : l'écran.

L'opération de sortie se fait en algorithme à l'aide de la procédure `Écrire(...)`.

En Python, elle se fait à l'aide de la fonction `print(...)`.

| Algorithme | Python |
|------------|--------|
| `// Affichage d'un message`<br>`Ecrire("Votre message")`<br><br>`x ← 4`<br>`y ← 7`<br>`// Affichage de la valeur d'une variable`<br>`Ecrire(x)`<br><br>`// Affichage mixte`<br>`Ecrire(x, y)`<br>`Ecrire("x = ", x)` | `# Affichage d'un message`<br>`print("Votre message")`<br><br>`x = 4`<br>`y = 7`<br>`# Affichage de la valeur d'une variable`<br>`print(x)`<br><br>`# Affichage mixte`<br>`print(x, y)`<br>`print("x = ", x)` |

---

### 2. L'entrée

L'entrée, ou la saisie, des données utilisateur est effectuée à partir du périphérique d'entrée standard : le clavier.

On utilise, en algorithme, `Lire(nom_var)` pour affecter les entrées de l'utilisateur à la variable `nom_var`.

En Python, l'entrée des données est effectuée à partir du clavier à l'aide de la fonction `input(message)`. Cette fonction retourne toujours une chaîne de caractères (type `str`).

| Algorithme | Python |
|------------|--------|
| `// Saisie d'une chaîne de caractères`<br>`Ecrire("Prénom ? "); Lire(ch)`<br><br>`// Saisie d'un nombre entier`<br>`Ecrire("Âge ? "); Lire(age)`<br><br>`// Saisie d'un nombre réel`<br>`Ecrire("Moyenne ? "); Lire(moy)` | `# Saisie d'une chaîne de caractères`<br>`ch = input("Prénom ? ")`<br><br>`# Saisie d'un nombre entier`<br>`age = int(input("Âge ? "))`<br><br>`# Saisie d'un nombre réel`<br>`moy = float(input("Moyenne ? "))` |

---

### 3. L'affectation

L'affectation permet de donner une valeur à une variable.

En algorithme, on utilise le signe d'affectation `←` comme suit :

```
variable ← valeur
```

En Python, l'affectation se fait à l'aide de l'opérateur `=` comme suit :

```
variable = valeur
```

La valeur affectée à une variable peut être :
- une constante
- la valeur d'une autre variable
- le résultat d'une expression

---

### 4. Exercices

#### Exercice 1 - QCM

Dans un contexte informatique et pour chacune des propositions suivantes, cocher les bonnes réponses :

1. Un algorithme est :
   - [ ] un programme écrit en Python
   - [ ] une suite finie d'étapes
   - [ ] construit après l'écriture du programme
   - [ ] construit avant l'écriture du programme

2. Un langage de programmation est utile pour :
   - [ ] traduire un algorithme d'une manière compréhensible par la machine
   - [ ] tester la validité d'un algorithme et opérer les modifications nécessaires

3. Le nom d'une variable :
   - [ ] doit toujours commencer par un chiffre
   - [ ] doit toujours commencer par une lettre
   - [ ] ne doit pas contenir les symboles : @, $, &...
   - [ ] peut commencer par `_`, exemple : `_var`

4. Une constante :
   - [ ] peut prendre des valeurs différentes lors de l'exécution d'un programme
   - [ ] doit être déclarée et affectée une seule fois. Elle ne pourra pas être modifiée par la suite.
   - [ ] possède un nom, un type et une valeur

5. On peut affecter à une variable :
   - [ ] le résultat d'une expression
   - [ ] la valeur d'une autre variable
   - [ ] une constante de type compatible
   - [ ] une valeur saisie par l'utilisateur

6. L'opérateur utilisé pour stocker une valeur dans une variable est :
   - [ ] ← (en algorithme)
   - [ ] = (en algorithme)
   - [ ] ← (en Python)
   - [ ] = (en Python)

7. L'instruction d'affectation incorrecte, en algorithmique, est :
   - [ ] `x + 2 → a`
   - [ ] `a ← 2 * x`
   - [ ] `5 ← a`
   - [ ] `a = 5`

---

#### Exercice 2 - Noms de variables

Parmi les mots suivants, barrer ceux qui ne sont pas des mots valides pour une variable en Python :

| Mots clés Python |
|------------------|
| `False` `await` `else` `import` `pass` `None` `break` `except` `in` `raise` `True` `class` `finally` `is` `return` `and` `continue` `for` `lambda` `try` `as` `def` `from` `nonlocal` `while` `assert` `del` `global` `not` `with` `async` `elif` `if` `or` `yield` |

| Autres mots |
|-------------|
| `bonjour` `au revoir` `def` `oui` `G` `hello6` `good_mor` `if` `and` `break` `salem` `Non` `Hi!` `for` `#Bonsoir` `good-afternoon` `_iot_` `_Py` `bye_bye` |

---

#### Exercice 3 - Aire & Périmètre d'un rectangle

On désire faire le programme qui demande à l'utilisateur la longueur (`x`) et la largeur (`y`) d'un rectangle et calcule son périmètre (`p`) et son aire (`s`) en utilisant les formules suivantes :

- Périmètre = (longueur + largeur) × 2
- Aire = longueur × largeur

1. Compléter le schéma suivant permettant d'analyser le problème posé.
2. Faire l'algorithme permettant de résoudre le problème posé.
3. Utiliser le langage de programmation Python pour traduire l'algorithme.

---

#### Exercice 4 - Aire d'une ellipse

On désire calculer l'aire d'une ellipse en appliquant la formule suivante :

**Aire = a × b × π**

Écrire l'algorithme du programme nommé « ellipse » qui, sachant la valeur de `a` et de `b`, calcule et affiche l'aire `s` de la forme ci-contre.

---

#### Exercice 5 - Moyenne d'informatique

Écrire l'algorithme du programme "Moyenne" qui calcule et affiche la moyenne d'un élève sachant sa note globale (`NG`) et sa note de synthèse (`NS`). La moyenne (`Moy`) est calculée à l'aide de la formule :

```
Moy = (NG + NS) / 2
```

---

#### Exercice 6 - Raideur d'un ressort

Pour mesurer la raideur `k` d'un ressort, on lui accroche un objet d'une masse connue `m`. Puis, on mesure l'allongement, en mètres, `x` du ressort. Comme le système est en équilibre sous l'effet de la pesanteur, on obtient :

```
m.g = k.x
```

En supposant que l'attraction gravitationnelle est constante (`g = 10 N/kg`), écrire l'algorithme d'un programme qui calcule et affiche la raideur `k` du ressort.

---

## Les structures de données

### 1. Introduction

Un programme manipule des données stockées dans la mémoire centrale de l'ordinateur.

Une structure de données définit l'ensemble des valeurs permises qu'on peut affecter à une variable ou constante, ainsi que les traitements possibles sur ces données.

Une variable possède :
- Un nom commençant par une lettre ou un caractère de soulignement (`_`) suivi par zéro ou plusieurs lettres, chiffres ou caractères de soulignement.
- Un type simple ou composé.
- Une valeur qui dépend du type de la variable et qui peut changer tout le long d'un programme.

Une constante possède :
- Un nom commençant par une lettre ou un caractère de soulignement (`_`) suivi par zéro ou plusieurs lettres, chiffres ou caractères de soulignement.
- Une valeur fixe qui ne peut pas changer tout le long d'un programme.

---

### 2. Les types numériques

Les types numériques incluent le type :
- **Entier (`int`)** représentant l'ensemble des entiers relatifs : ℤ = { ..., -3, -2, -1, 0, 1, 2, 3, ... }
- **Réel (`float`)** représentant l'ensemble des réels : ℝ = { 1.5, 3.1415, ... }

#### a. Les opérateurs arithmétiques et les opérateurs de comparaison

| Opération | Priorité | Algorithme | Python | Exemple |
|-----------|----------|------------|--------|---------|
| Parenthèses | 1 | `()` | `()` | `(1 + 5) * (3 - 5) ⇒ -12` |
| Puissance | 2 | `**` | `**` | `2 ** 3 ⇒ 8` |
| Multiplication | 3 | `*` | `*` | `2 * 3 ⇒ 6` |
| Division réelle | 3 | `/` | `/` | `2 / 3 ⇒ 0.66666` |
| Division entière | 3 | `div` | `//` | `5 // 3 ⇒ 1` |
| Reste division | 3 | `mod` | `%` | `5 % 3 ⇒ 2` |
| Addition | 4 | `+` | `+` | `5 + 3 ⇒ 8` |
| Soustraction | 4 | `-` | `-` | `3 - 5 ⇒ -2` |
| Égal à | 5 | `=` | `==` | `5 == 3 ⇒ False` |
| Différent de | 5 | `≠` | `!=` | `5 != 3 ⇒ True` |
| Inférieur à | 5 | `<` | `<` | `5 < 3 ⇒ False` |
| Inférieur ou égal à | 5 | `≤` | `<=` | `5 <= 3 ⇒ False` |
| Supérieur à | 5 | `>` | `>` | `5 > 3 ⇒ True` |
| Supérieur ou égal à | 5 | `≥` | `>=` | `5 >= 3 ⇒ True` |
| Appartient à | 6 | `∈` | `in` | `3 in {0, 1, 2} ⇒ False` |

---

#### b. Partie entière et partie décimale

*(Espace réservé dans le document original)*

---

#### c. Opérateurs de division

*(Espace réservé dans le document original)*

---

#### d. Les fonctions prédéfinies

| Algorithme | Python | Description | Exemple |
|------------|--------|-------------|---------|
| `Ent(x)` | `int(x)` | Retourne la partie entière. | `Ent(5.75) ⇒ 5` |
| `Arrondi(x)` | `round(x)` | Retourne l'entier le plus proche. | `Arrondi(3.2) ⇒ 3`<br>`Arrondi(3.6) ⇒ 4`<br>`Arrondi(3.5) ⇒ 4`<br>`Arrondi(4.5) ⇒ 5` |
| `Racine(x)` | `sqrt(x)` | Retourne la racine carrée d'un nombre positif. | `Racine(25) ⇒ 5` |
| `Abs(x)` | `abs(x)` | Retourne la valeur absolue de x. | `Arrondi(-4) ⇒ 4` |
| `Aléa(a, b)` | `randint(a, b)` | Retourne un nombre aléatoire dans l'intervalle [a, b]. | `1 ≤ Aléa(1, 6) ≤ 6` |

**Remarque :** La fonction `sqrt` en Python est importée de la bibliothèque `math`.

```python
from math import sqrt
```

La fonction `randint` en Python est importée de la bibliothèque `random`.

```python
from random import randint
```

---

### 3. Le type booléen

Une variable (ou expression) booléenne ne peut prendre que la valeur Faux ou Vrai. (En Python `False` / `True`)

#### a. Les opérateurs logiques

Table de vérité des opérateurs logiques :

| x | y | non x | x et y | x ou y |
|---|---|-------|--------|--------|
| Vrai | Vrai | Faux | Vrai | Vrai |
| Vrai | Faux | Faux | Faux | Vrai |
| Faux | Vrai | Vrai | Faux | Vrai |
| Faux | Faux | Vrai | Faux | Faux |

---

### 4. Les types textuels

Les données textuelles sont stockées, en algorithmique, dans des variables de type :
- Caractère
- Chaîne

En Python, on dispose uniquement du type `str`.

#### a. Le type caractère

##### i. Présentation

Le type caractère représente un seul caractère qui peut être :
- Une lettre : majuscule ("A", "B", ...) ou minuscule ("a", "b", ...)
- Un chiffre : "0", "1", "2", ..., "9"
- Un symbole : "|", "#", "$", "%", ...

##### ii. Table ASCII

Dans la mémoire de l'ordinateur, un caractère est représenté par son code ASCII (American Standard Code for Information Interchange). Ainsi, chaque caractère possède un code (un nombre) correspondant :

**Table des caractères ASCII (Standard)**

| Code | Car. | Code | Car. | Code | Car. | Code | Car. | Code | Car. | Code | Car. |
|------|------|------|------|------|------|------|------|------|------|------|------|
| 32 | (espace) | 48 | 0 | 64 | @ | 80 | P | 96 | ' | 112 | p |
| 33 | ! | 49 | 1 | 65 | A | 81 | Q | 97 | a | 113 | q |
| 34 | " | 50 | 2 | 66 | B | 82 | R | 98 | b | 114 | r |
| 35 | # | 51 | 3 | 67 | C | 83 | S | 99 | c | 115 | s |
| 36 | $ | 52 | 4 | 68 | D | 84 | T | 100 | d | 116 | t |
| 37 | % | 53 | 5 | 69 | E | 85 | U | 101 | e | 117 | u |
| 38 | & | 54 | 6 | 70 | F | 86 | V | 102 | f | 118 | v |
| 39 | ' | 55 | 7 | 71 | G | 87 | W | 103 | g | 119 | w |
| 40 | ( | 56 | 8 | 72 | H | 88 | X | 104 | h | 120 | x |
| 41 | ) | 57 | 9 | 73 | I | 89 | Y | 105 | i | 121 | y |
| 42 | * | 58 | : | 74 | J | 90 | Z | 106 | j | 122 | z |
| 43 | + | 59 | ; | 75 | K | 91 | [ | 107 | k | 123 | { |
| 44 | , | 60 | < | 76 | L | 92 | \ | 108 | l | 124 | \| |
| 45 | - | 61 | = | 77 | M | 93 | ] | 109 | m | 125 | } |
| 46 | . | 62 | > | 78 | N | 94 | ^ | 110 | n | 126 | ~ |
| 47 | / | 63 | ? | 79 | O | 95 | _ | 111 | o | 127 | © |

##### iii. Les fonctions prédéfinies

| Algorithme | Python | Description | Exemple |
|------------|--------|-------------|---------|
| `ord(car)` | `ord(car)` | Retourne le code ASCII du caractère `car`. | `ord("A") ⇒ 65` |
| `chr(code)` | `chr(code)` | Retourne le caractère ASCII équivalent à `code`. | `chr(65) ⇒ "A"` |
| `majus(car)` | `car.upper()` | Convertit une lettre `car` en majuscules. | `majus("b") ⇒ "B"`<br>`majus("W") ⇒ "W"`<br>`majus("!") ⇒ "!"` |

**Important :** En algorithme, il n'y a pas de fonction `minus(car)`.

Pour convertir une lettre majuscule `car` en minuscule, on peut écrire :

```
chr(ord(car) + 32)
```

---

#### b. Le type chaîne

##### i. Présentation

Une chaîne de caractères est la succession de `n` caractères ASCII (`n ≥ 0`).

- Si `n` est nulle (`n = 0`), on parle d'une chaîne vide.
- On peut accéder au `i`-ème caractère (`0 ≤ i < n`) d'une chaîne `ch` en utilisant la notation : `ch[i]`
- Pour concaténer (coller) deux chaînes, on utilise l'opérateur : `+`

---

##### ii. Les fonctions prédéfinies

| Algorithme | Python | Description | Exemple |
|------------|--------|-------------|---------|
| `long(car)` | `len(ch)` | Calcule la longueur de la chaîne `ch`. | `long("BAC26") ⇒ 5`<br>`long("") ⇒ 0` |
| `Pos(ch1, ch2)` | `ch2.find(ch1)` | Retourne la 1ère occurrence de `ch1` dans `ch2`. | `Pos("25", "BAC26") ⇒ 3`<br>`Pos("Hi", "BAC26") ⇒ -1` |
| `ConvCh(x)` | `str(x)` | Convertir une valeur numérique `x` en chaîne. | `ConvCh(10) ⇒ "10"`<br>`ConvCh(17.5) ⇒ "17.5"` |
| `Valeur(ch)` | `int(ch)`<br>`float(ch)` | Convertir une chaîne en une valeur numérique, sinon provoque une erreur. | `Valeur("10") ⇒ 10`<br>`Valeur("17.5") ⇒ 17.5` |
| `EstNum(ch)` | `ch.isdecimal()` | Vérifie si la chaîne `ch` est composée uniquement de chiffres. | `EstNum("10") ⇒ Vrai`<br>`EstNum("2k") ⇒ Faux` |
| `sous_chaîne(ch, d, f)` | `ch[d:f]` | Extrait de la chaîne `ch` les caractères situés entre la position `d` (incluse) et `f` (non incluse). | `sous_chaîne("BAC26", 3, 5) ⇒ "26"` |
| `effacer(ch, d, f)` | `ch[:d] + ch[f:]` | Efface de la chaîne `ch` les caractères situés entre la position `d` (incluse) et `f` (non incluse). | `effacer("BAC26", 3, 5) ⇒ "BAC"` |
| `majus(ch)` | `ch.upper()` | Convertit la chaîne `ch` en majuscules. | `Majus("bac 26") ⇒ "BAC 26"` |

---

### 5. Exercices

#### Exercice 1 - Opérateurs numériques

Compléter le tableau ci-dessous.

| Expression en algorithme | Expression en Python | Résultat | Type |
|--------------------------|----------------------|----------|------|
| `5 + 6` | | | |
| `4.5 - 2.5` | | | |
| `12 / 4` | | | |
| `11 mod 4` | | | |
| `11 div 5` | | | |
| `12 ≠ (10+2)` | | | |
| `4 ≤ 4` | | | |
| `5 ∈ {12, 6, -3, 5, 7}` | | | |
| `1+2 = 3-0` | | | |

---

#### Exercice 2 - Expressions numériques / logiques

Compléter le tableau ci-dessous.

| Expression en algorithme | Expression en Python | Résultat | Type |
|--------------------------|----------------------|----------|------|
| `x ← 15 + 3 * 2 + 5` | | | |
| `x ← (18 mod 5) / 2` | | | |
| `x ← (13 % 5) // 2` | | | |
| `x ← abs(-12.5)+3` | | | |
| `a = 3 ; b = 6`<br>`x = (a > b) * a + (a <= b) * b` | | | |
| `c ← 8 ; d ← 1`<br>`x ← abs(a-c) + abs(b-d)` | | | |
| `x ← ent(racine((a-c)*(a-c)+(b-d)*(b-d)))` | | | |
| `x ← 15 + 3 * 2 + Ent(5.56)` | | | |
| `x ← 15. + 3 * 2 + Ent(5.56)` | | | |
| `x ← 20 > 10 * 1.5` | | | |
| `x ← Aléa(10, 20) > 30` | | | |
| `x ← arrondi(abs(-12.9)) + racine(16)` | | | |

---

#### Exercice 3 - Exécution manuelle

Donner la trace d'exécution des instructions ci-dessous.

| Instructions | X | Y | Z |
|--------------|---|---|---|
| `X ← 10` | | | |
| `Y ← 2` | | | |
| `X ← X + Y * 2` | | | |
| `Z ← X div 2 + Y` | | | |
| `Y ← (Z + X) mod 2` | | | |
| `Z ← X * 3 + 4 mod 2` | | | |

---

#### Exercice 4 - Fonction Aléa

Compléter le tableau ci-dessous.

| Instruction Algorithme | Instruction Python | Intervalle |
|------------------------|---------------------|------------|
| `x ← Aléa(1, 6)` | | `... ≤ X ≤ ...` |
| `x ← Aléa(1, 6) * 10` | | `... ≤ X ≤ ...` |
| `x ← Aléa(1, 6) * -2` | | `... ≤ X ≤ ...` |
| `x ← Aléa(1, 6) // 2` | | `... ≤ X ≤ ...` |
| `x ← Aléa(1, 6) * Aléa(0, 2)` | | `... ≤ X ≤ ...` |
| `x ← Aléa(10, 90) / Aléa(1, 9)` | | `... ≤ X ≤ ...` |

---

#### Exercice 5 - Concaténation

Soient les variables Python `ch1`, `ch2`, `ch3` et `ch4` suivantes :

```python
ch1 = "python"
ch2 = "javascript"
ch3 = "uml"
ch4 = "perl"
```

Remplir le tableau ci-dessous par l'affichage de chacune des instructions.

| Instruction | Résultat |
|-------------|----------|
| `print(ch1[0])` | |
| `print(ch2.upper())` | |
| `print(ch1[0] + ch3[0] + ch2[5] + ch4[1])` | |
| `print(ch2[9].upper() + ch2[7] + ch2[8] + ch1[2].upper() + ch1[4] + ch1[0])` | |
| `print(str(len(ch1) - len(ch4)) + ch4[1] + " " + ch2[4] + ch2[5] + ch2[7] + chr(ord(ch1[3]) - 3) + ch1[5])` | |
| `print(ch3[len(ch3) - 1] + ch2[len(ch3)] + ch4[len(ch4) - 2] + ch3[len(ch3)] + ch4[len(ch4) - len(ch3)])` | |

---

#### Exercice 6 - Manipulation chaîne

Compléter le tableau ci-dessous.

`ch1 ← "Algorithmique"` ; `ch2 ← "Python"` ; `ch3 ← "4502"`

| Instruction Algorithme | Instruction Python | Résultat & Type |
|------------------------|---------------------|-----------------|
| `A ← Long(ch1)`<br>`B ← Long(ch2)` | | |
| `C ← ConvCh(A) + ConvCh(B)` | | |
| `D ← Valeur(ConvCh(B) + ConvCh(A))` | | |
| `E = D - float(C)` | | |
| `F ← sous_chaîne(ch1, Long(ch3), Long(ch1))` | | |
| `G ← Majus(F[0]) + Chr(Valeur(C) - 15) + Effacer(F, 0, 2)` | | |
| `H = C.isdecimal() * len(C) + G.isdecimal() * len(G)` | | |
| `I = ch1.find("go")`<br>`J = ch1.find("me")` | | |
| `K ← Valeur(ch3) - Ent(E) - Valeur(ch3[3]) * 1000` | | |
| `L ← Effacer(ch1, I+2, Long(ch1)) + ConvCh(K) + Effacer(ch1, 0, J)` | | |

---

#### Exercice 7 - Fonctions prédéfinies chaînes

Encercler les bonnes propositions.

1. Soit l'instruction : `X ← Ent(12.33)`
   - a. Elle permet d'affecter à X la valeur 12
   - b. La variable X contiendra une valeur de type entier
   - c. La variable X contiendra une valeur de type réel

2. L'instruction `R ← arrondi(12.75)` permet d'affecter à la variable R :
   - a. L'entier 12
   - b. L'entier 13
   - c. L'entier 14

3. Soit l'instruction : `C ← sous_chaîne("informatique", 2, 3)`
   - a. Elle permet d'affecter à C la valeur "for"
   - b. La variable C doit être de type caractère
   - c. La variable C doit être de type chaîne de caractères

4. L'instruction `T ← EstNum("123")` affecte à T :
   - a. 123
   - b. FAUX
   - c. VRAI

5. Soit l'instruction : `P ← Pos("2", "FIFA 2022")`
   - a. Elle permet d'affecter à P la valeur 5
   - b. Elle permet d'affecter à P la valeur 7
   - c. La variable P doit être de type entier

---

#### Exercice 8 - Password

Écrire l'algorithme d'un programme qui génère un mot de passe `mp` aléatoire composé de 2 chiffres (0 → 9), 2 lettres majuscules ("A" → "Z") et 2 lettres minuscules ("a" → "z").

**Exemple :** Mot de passe : `49RMax`

---

#### Exercice 9 - Permutation des chiffres

Écrire l'algorithme d'un programme qui saisit un entier `a` composé de deux chiffres qu'il permute pour obtenir l'entier `b`.

**Exemple :**
```
Donner a ? 49
b = 94
```

---

#### Exercice 10 - Autonomie de la batterie

Un automobiliste surveille la consommation de sa voiture électrique pour calculer l'autonomie de sa batterie.

Avant d'aller faire les courses, le niveau de la batterie est `nib` pourcents (`nib > 0`). L'indicateur kilométrique est à `ikd` km (`ikd ≥ 0`).

Au retour à la maison, le niveau de la batterie indique `nfb` pourcents (`0 ≤ nfb < nib`) et l'indicateur kilométrique affiche `ikf` kilomètres (`ikf > ikd`).

On demande d'écrire l'algorithme d'un programme qui saisit les données puis calcule l'autonomie de la batterie, c-à-d la distance maximale `dm` que le véhicule peut parcourir avec le niveau actuel de la charge de la batterie, arrondie à l'entier le plus proche.

**Exemple :**
```
Niveau initial batterie (nib) ? 80
Indicateur kilométrique (ikd) ? 25000
Niveau final batterie (nfb) ? 60
Indicateur kilométrique (ikf) ? 25100
Autonomie batterie : 300 km
```

---

#### Exercice 11 - Circuit logique

1. Écrire l'équation logique de la lampe L en fonction des entrées logiques a, b et c.

2. On donne l'algorithme incomplet suivant qui permet de simuler ce circuit :

```
Algorithme Logic_gates
Début
    // etat est une chaîne contenant trois lettres
    // "V" bouton fermé / "F" bouton ouvert
    Ecrire("Etat des boutons"); Lire(etat)
    etat ← majus(etat)
    // Vrai si le bouton est fermé
    a ← Faux
    b ← Faux
    c ← Faux
    // Equation logique de L
    L ← Faux
    Ecrire(a, " ", b, " ", c, ">", L)
Fin
```

3. Traduire l'algorithme en Python tout en le complétant.

4. Dresser la table de vérité du circuit. Puis, remplir la colonne L.

| etat | L |
|------|---|
| FFF |   |
| FFV |   |
| FVF |   |
| FVV |   |
| VFF |   |
| VFV |   |
| VVF |   |
| VVV |   |

---

#### Exercice 12 - Citerne d'huile

Une citerne d'huile contient `n` litres d'huile d'olives vierge. Le camion utilisé pour acheminer cette marchandise peut transporter 30 caisses de 12 bouteilles d'un litre.

Écrire l'algorithme d'un programme qui saisit la quantité totale d'huile, puis calcule le nombre de caisses à acheminer ainsi que le nombre de voyages nécessaires.

**Exemple :**
```
Quantité d'huile (litre) ? 1000
Nombre de bouteilles : 1000 bouteilles
Nombre de caisses : 84 caisses
Nombre de voyages : 3 voyages
```

---

#### Exercice 13 - Fonctions sur les chaînes

`ch ← "programme 2025"`  
Indices : `0 1 2 3 4 5 6 7 8 9 10 11 12 13`  
`p r o g r a m m e   2  0  2  5`

| Instruction en algorithme | Type | Résultat |
|---------------------------|------|----------|
| `a ← chr(ent(100.5))` | | |
| `b ← majus(ch[0]) + ch[5] + ch[3] + ch[8]` | | |
| `c ← sous_chaîne(ch, 3, 9)` | | |
| `d ← effacer(ch, 3, 9)` | | |
| `e ← chr(65 + alea(0, 25))` | | |
| `f ← convch(45 div 10 + 15 mod 2 + arrondi(3.2))` | | |
| `g ← "A" ≤ e ≤ "Z"` | | |
| `i ← valeur(ch[13] + sous_chaîne(ch, 10, 12))` | | |
| `j ← ord(ch[2])` | | |

---

#### Exercice 14 - Pseudonymes

Un site propose des pseudonymes automatisés lors de la création d'un compte.

Le pseudonyme est composé par les trois premières lettres du nom de l'utilisateur suivies par la longueur du nom, les trois dernières lettres du prénom suivies par la longueur du prénom, le tout est suivi par un nombre aléatoire de 2 chiffres.

Écrire l'algorithme d'un programme qui demande le nom et le prénom de l'utilisateur (une seule chaîne) pour afficher ensuite le pseudonyme de l'utilisateur.

**Exemple :**
```
Nom & Prénom ? Sami Ben Salah
Pseudonyme proposé : SAM4_LAH9_31
```

---

## Structures conditionnelles

### 1. Présentation

Souvent, l'exécution d'un traitement dépend d'une condition. Dans ce cas, on utilise les structures conditionnelles. Ces dernières se déclinent, en fonction du nombre de conditions et de traitements, en trois formes : réduite, alternative (ou complète) et généralisée.

Lorsque le traitement dépend d'une valeur de type scalaire (entier, caractère ou booléen), on peut utiliser une structure de contrôle conditionnelle à choix multiples.

---

### 2. Forme réduite

Une structure conditionnelle à forme réduite admet un seul traitement qui sera exécuté uniquement si la condition est vraie.

**Exemple :**

| Algorithme | Python |
|------------|--------|
| `// Valeur absolue d'un nombre x`<br>`absx ← x`<br>`Si x < 0 Alors`<br>&nbsp;&nbsp;&nbsp;&nbsp;`absx ← -x`<br>`Fin Si`<br>`Ecrire("abs(", x, ")=", absx)` | `# Valeur absolue d'un nombre x`<br>`absx = x`<br>`if x < 0:`<br>&nbsp;&nbsp;&nbsp;&nbsp;`absx = -x`<br>`print("abs(", x, ")=", absx)` |

---

### 3. Forme alternative

Une structure conditionnelle à forme alternative admet deux traitements différents :
- Le premier traitement est exécuté uniquement si la condition est vraie.
- Le second traitement est exécuté uniquement si la condition est fausse.

---

### 4. Forme généralisée

Une structure conditionnelle simple à forme généralisée admet trois traitements différents ou plus qui seront exécutés en fonction de plusieurs conditions.

**Exemple :**

| Algorithme | Python |
|------------|--------|
| `// Comparaison entre deux nombres`<br>`Si a > b Alors`<br>&nbsp;&nbsp;&nbsp;&nbsp;`eq ← ">"`<br>`Sinon Si a < b Alors`<br>&nbsp;&nbsp;&nbsp;&nbsp;`eq ← "<"`<br>`Sinon`<br>&nbsp;&nbsp;&nbsp;&nbsp;`eq ← "="`<br>`Fin Si`<br>`Ecrire(a, eq, b)` | `# Comparaison entre deux nombres`<br>`if a > b:`<br>&nbsp;&nbsp;&nbsp;&nbsp;`eq = ">"`<br>`elif a < b:`<br>&nbsp;&nbsp;&nbsp;&nbsp;`eq = "<"`<br>`else:`<br>&nbsp;&nbsp;&nbsp;&nbsp;`eq = "="`<br>`print(a, eq, b)` |

---

### 5. Structure à choix multiples

Une structure de contrôle conditionnelle à choix multiples est utilisée de préférence lorsque le traitement dépend uniquement d'une ou de plusieurs valeurs d'un sélecteur scalaire.

**Exemple :**

| Algorithme | Python |
|------------|--------|
| `// Calcul du nombre de jours`<br>`Selon mois`<br>&nbsp;&nbsp;&nbsp;&nbsp;`1, 3, 5, 7, 8, 10, 12: nbjours ← 31`<br>&nbsp;&nbsp;&nbsp;&nbsp;`4, 6, 9, 11: nbjours ← 30`<br>&nbsp;&nbsp;&nbsp;&nbsp;`2: nbjours ← 28`<br>&nbsp;&nbsp;&nbsp;&nbsp;`Sinon nbjours ← -1`<br>`Fin Selon`<br>`Ecrire(nbjours)` | `# Calcul du nombre de jours`<br>`match mois:`<br>&nbsp;&nbsp;&nbsp;&nbsp;`case 1|3|5|7|8|10|12: nbjours = 31`<br>&nbsp;&nbsp;&nbsp;&nbsp;`case 4|6|9|11: nbjours = 30`<br>&nbsp;&nbsp;&nbsp;&nbsp;`case 2: nbjours = 28`<br>&nbsp;&nbsp;&nbsp;&nbsp;`case _: nbjours = -1`<br>`print(nbjours)` |

---

### 6. Exercices

#### QCM 1

Cocher la ou les bonnes réponses.

1. Une personne est considérée majeure si son âge dépasse les 18 ans. La condition qui peut compléter l'algorithme ci-dessous est :

```
Si  Alors
    Ecrire("Vous êtes majeur(e)")
Sinon
    Ecrire("Vous êtes mineur(e)")
Fin Si
```

- [ ] `age ≥ 18`
- [ ] `age ≤ 18`
- [ ] `age / 18 ≥ 1`

2. La condition qu'on peut utiliser pour vérifier si la longueur d'une chaîne de caractères `ch` est multiple de 3 est :
- [ ] `long(ch) mod 3 = 0`
- [ ] `long(ch) mod 3 ≠ 0`
- [ ] `non(long(ch) mod 3 ≠ 0)`

3. Pour déterminer si un entier `n` est pair ou impair, on peut écrire :
- [ ] 
```
nat ← "Imair"
Si n mod 2 ≠ 0 Alors
    nat ← "Imair"
Fin Si
Ecrire(n, "est", nat)
```
- [ ] 
```
Si p Alors
    nat ← "Imair"
Fin Si
Ecrire(n, "est", nat)
```
- [ ] 
```
Nat ← "Imair"
Fin Si
Ecrire(n, "est", nat)
```

4. Afin de former l'entier le plus grand `n2` formé par les chiffres d'un entier `n` de deux chiffres, pour cela on écrit :
- [ ] 
```
n ← aléa(10, 99)
n2 ← (n mod 10) * 10 + n div 10
Si n > n2 Alors
    n2 ← n
Fin Si
Ecrire(n, n2)
```
- [ ] 
```
n ← aléa(10, 99)
ch ← ConvCh(n)
n2 ← Valeur(ch[1]+ch[0])
Ecrire(n, n2)
```
- [ ] 
```
n ← aléa(10, 99)
ch ← ConvCh(n)
Si ch[1] > ch[0] Alors
    ch ← ch[1] + ch[0]
Fin Si
n2 ← Valeur(ch)
Ecrire(n, n2)
```

5. Dans l'algorithme ci-dessous, pour que `res` soit égal à 13, `n` peut être égal à :

```
Si n mod 2 = 0 Alors
    n ← n div 2
Sinon
    n ← 3 * n + 1
Fin Si
```

- [ ] 4
- [ ] 13
- [ ] 26

6. À la suite de l'exécution de ce programme, on obtient le résultat 12000. La valeur de `np` est alors :

```python
np = int(input("Nombre de pages ? "))
if np < 20:
    pu = 200
elif np < 100:
    pu = 150
else:
    pu = 100
res = pu * np
print(res)
```

- [ ] `np = 60` et `pu = 200`
- [ ] `np = 80` et `pu = 150`
- [ ] `np = 120` et `pu = 100`

---

#### QCM 2

Mettre une croix ☑ devant la ou les bonnes réponses :

1. La valeur finale de `n1` en fonction de la valeur de `n` est :

```
n ← aléa(5, 15)
Si n > 10 Alors
    n1 ← n - 10
Sinon
    n1 ← -n
Fin Si
Ecrire(n, n1)
```

- [ ] `n = 7, n1 = -7`
- [ ] `n = 7, n1 = -3`
- [ ] `n = 12, n1 = -12`
- [ ] `n = 12, n1 = 2`

2. Sachant que `b > c`, que `b < a`, et que la valeur affichée est 15, les valeurs de `a`, `b` et `c` sont :

```
Si a > b et a > c Alors
    Ecrire(a)
Sinon Si b > c Alors
    Ecrire(b)
Sinon
    Ecrire(c)
Fin Si
```

- [ ] a + 5 / b + 10 / c + 15
- [ ] a + 10 / b + 15 / c + 5
- [ ] a + 15 / b + 10 / c + 5

3. L'affichage de la séquence suivante est :

```
n ← 3
g ← "F"
Si n ≠ 0 Alors
    Ecrire("Bonjour!")
    Si g = "H" Alors
        Ecrire("Messieurs")
    Sinon
        Ecrire("Mes dames")
    Fin Si
Fin Si
```

- [ ] Bonjour!
- [ ] Bonjour! Messieurs
- [ ] Bonjour! Mes dames

4. Les valeurs finales des variables `a` et `b` sont :

```
a ← 12
b ← 5
Si a mod b = 0 Alors
    a ← a / b
Sinon Si a - b > 5 Alors
    b ← b + 2
Sinon
    a ← a - 3
Fin Si
Ecrire(a, " et ", b)
```

- [ ] `a = 2.0, b = 5`
- [ ] `a = 9, b = 5`
- [ ] `a = 12, b = 5`
- [ ] `a = 12, b = 7`

5. Les valeurs finales des variables `x` et `y` sont :

```
x ← 8
y ← 3
Si x < y Alors
    x ← x + 2
Sinon Si x > y + 2 Alors
    y ← y + 5
Sinon
    x ← x - y
Fin Si
Ecrire(x, y)
```

- [ ] `x = 5, y = 3`
- [ ] `x = 8, y = 3`
- [ ] `x = 8, y = 8`
- [ ] `x = 16, y = 3`

---

#### QCM 3

Relier chacune des expressions booléennes suivantes à la proposition correcte :

1. Vérifier si un réel `a` est compris entre 0 et 1.
   - a. `test ← a mod 15 = 0`

2. Vérifier si un entier positif `a` est composé de deux chiffres.
   - b. `test ← non (b mod a = 0)`

3. Vérifier si un entier positif `a` est divisible par 3 et 5.
   - c. `test ← (a mod 2 = 0) et (a div 100 mod 2 = 0)`

4. Vérifier si un entier positif `a` est divisible par 3 ou 5.
   - d. `test ← 10 ≤ a < 100`

5. Vérifier si un entier positif `a` est divisible par 3 ou 5 et non pas les deux en même temps.
   - e. `test ← (a mod 3 = 0 ou a mod 5 = 0) et (a mod 15 ≠ 0)`

6. Vérifier si un entier positif `b` n'est pas divisible par un deuxième entier positif `a`.
   - f. `test ← 0 ≤ a ≤ 1`

7. Vérifier si le chiffre de centaines d'un entier `a` de quatre chiffres est impair et que son chiffre d'unité est pair.
   - g. `test ← a mod 3 = 0 ou a mod 5 = 0`

8. Vérifier si le chiffre des unités et le chiffre des dizaines d'un entier `a` sont inférieurs à 5.
   - h. `test ← (a mod 10 < 5) et (a mod 100 div 10 < 5)`

---

#### Exercice 1 - Exécution Manuelle

Traduire l'algorithme en Python, indiquer le nombre de conditions dans la structure conditionnelle ainsi que sa forme : réduite, complète, ou généralisée.

**Algorithme 1 :**
```
a ← aléa(1,10) ; b ← aléa(1,10)
Si a > b Alors
    t ← a ; a ← b ; b ← t
Fin Si
Ecrire(a, b)
```

| Nbre de conditions | Forme |
|--------------------|-------|
|                    |       |

**Rôle de l'Algorithme 1 :** 

---

**Algorithme 2 :**
```
n ← aléa(1, 20)
Si n mod 2 = 0 Alors
    Ecrire(n, "est pair.")
Sinon
    Ecrire(n, "est impair.")
Fin Si
```

| Nbre de conditions | Forme |
|--------------------|-------|
|                    |       |

**Rôle de l'Algorithme 2 :** 

---

**Algorithme 3 :**
```
v ← aléa(0, 2)
Si v = 0 Alors
    car ← chr(aléa(48, 57))
Sinon Si v = 1 Alors
    car ← chr(aléa(65, 90))
Sinon
    car ← chr(aléa(97, 122))
Fin Si
Ecrire(car)
```

| Nbre de conditions | Forme |
|--------------------|-------|
|                    |       |

**Rôle de l'Algorithme 3 :** 

---

#### Exercice 2 - Signe & Parité

Écrire l'algorithme d'un programme qui saisit un entier `n`, puis affiche son signe (positif ou négatif) et sa parité (pair ou impair).

---

#### Exercice 3 - Nombre cubique

On appelle nombre cubique, un nombre positif de 3 chiffres qui a la propriété d'être égal à la somme des cubes de ses chiffres.

**Exemples :**
- 153 est un nombre cubique car `1³ + 5³ + 3³ = 153`
- 206 n'est pas un nombre cubique car `2³ + 0³ + 6³ = 224 ≠ 206`

**Travail demandé :** Écrire l'algorithme d'un programme nommé « Cubique » qui permet de saisir un entier N et vérifier s'il est cubique ou non.

---

#### Exercice 4 - Formes d'une structure conditionnelle

**Question 1**

Soit l'instruction conditionnelle suivante :

```
Si (x > 1) et (x ≤ 12) alors
    y ← x + 1
Sinon
    y ← x - 1
Fin Si
```

1) Quelle est la forme utilisée dans cette instruction : réduite, complète ou généralisée.

2) Peut-on utiliser la forme réduite pour réécrire cette instruction ? Réécrire cette instruction en utilisant la forme réduite.

**Question 2**

Soit la séquence algorithmique suivante :

```
Si "a" ≤ C ≤ "z" alors
    P ← ord(C) - 96
Sinon
    P ← ord(C) - 64
Fin si
```

**Questions :**

1) Déterminer la valeur de P pour les valeurs suivantes de C :
   - a. `C = "A"` → `P = ........`
   - b. `C = "c"` → `P = ........`

2) En déduire le rôle de cette séquence.

3) Remplacer la séquence par une instruction simple : `P ← ....................`

---

#### Exercice 5 - Type d'un caractère ASCII

Écrire l'algorithme d'un programme qui permet de saisir un caractère puis détermine et affiche son type :
- Lettre Majuscule
- Lettre Minuscule
- Chiffre
- Symbole

---

#### Exercice 6 - Calculatrice

Écrire l'algorithme d'un programme qui :
- Saisit une expression de la forme `A op B` dans une chaîne nommée `ch`, avec `A` et `B` deux entiers relatifs et `op` un opérateur simple : `+`, `-`, `*` ou `/`
- Calcule et affiche le résultat de l'opération.

**NB :** Prévoir le cas de division par zéro.

**Exemples :**

| Exemple 1 | Exemple 2 | Exemple 3 |
|-----------|-----------|-----------|
| Donner une expression ? 15+7 | Donner une expression ? 18/2 | Donner une expression ? 1/0 |
| 15+7 = 22 | 18/2 = 9.0 | 1/0 = Division par zéro |

---

#### Exercice 7 - Potentiel Hydrogène (pH)

L'image ci-dessous indique le pH de quelques produits quotidiens.

**Acide fort (pH ~0–3) → Acide faible (pH ~3–6) → Neutre (pH ~7) → Base faible (pH ~8–11) → Base forte (pH ~11–14)**

En se basant sur le graphique ci-dessus, écrire l'algorithme nommé « Nature_Liquide » qui permet de saisir la valeur du pH (Potentiel Hydrogène) d'une solution pour afficher sa nature (acide fort, acide faible, neutre, base faible ou base forte).

---

#### Exercice 8 - Évaluation d'une structure conditionnelle

Quelles sont les valeurs de A et B après l'exécution de chaque bloc ?

**Bloc 1 :**
```
A ← 3
B ← 1
Si (A>2) et (B<1) Alors
    B ← 2
Fin Si
```
`A = ........ - B = ........`

**Bloc 2 :**
```
A ← 2
Si (Non (A<2) ou (A=2)) Alors
    B ← 3
Sinon
    B ← 1
Fin Si
```
`A = ........ - B = ........`

**Bloc 3 :**
```
A ← 2
A ← A div 3
Si A=2 Alors
    B ← 3
Sinon Si A=0 Alors
    B ← 2
Sinon
    B ← 1
Fin Si
```
`A = ........ - B = ........`

---

#### Exercice 9 - Année bissextile

Une année bissextile est une année qui compte 366 jours, en l'occurrence le mois de février comporte 29 jours. L'année est bissextile si l'année est divisible par 4 et non divisible par 100 **ou** si l'année est divisible par 400.

**Exemples :**
- 2024 est une année bissextile car 2024 est divisible par 4 et non divisible par 100.
- 1900 n'est pas une année bissextile car elle est divisible par 4 et par 100. De même l'année 1900 n'est pas aussi divisible par 400.
- 2000 est une année bissextile car elle est divisible par 400.

Écrire l'algorithme d'un programme qui saisit une année puis affiche si elle est bissextile.

---

#### Exercice 10 - Salutations

Soit l'algorithme ci-dessous :

1. Déterminer l'intervalle de temps qui permet d'afficher chacun des messages possibles.
2. Réécrire l'algorithme en utilisant la structure `Selon`.

---

#### Exercice 11 - Score d'un match

Écrire l'algorithme d'un programme qui saisit les noms et les scores de deux équipes de football, affiche le nom de l'équipe gagnante ou "Match nul", en cas d'égalité.

**Exemples :**
```
Equipe ? TSG Score ? 2
Equipe ? Bayer Score ? 2
Match nul.
```

```
Equipe ? Real Score ? 2
Equipe ? Barca Score ? 1
L'équipe Real a gagné.
```

---

#### Exercice 12 - Équation du 1er degré

`a.x + b = 0`

`a ∈ ℝ` et `b ∈ ℝ`

**Travail demandé :** Écrire l'algorithme d'un programme qui saisit les coefficients `a` et `b` d'une équation du 1er degré, puis calcule et affiche ses solutions.

- Si `a ≠ 0` : `x = -b/a`
- Si `a = 0` et `b = 0` : `S = ℝ`
- Si `a = 0` et `b ≠ 0` : `S = ∅`

---

#### Exercice 13 - Nature d'un triangle

D'après le théorème de l'inégalité triangulaire, la somme des longueurs de deux côtés d'un triangle doit être toujours supérieure à celle du troisième côté.

Écrire l'algorithme d'un programme qui saisit la longueur des trois côtés d'un triangle puis affiche sa nature.

**Exemples d'affichage :**

| Exemple 1 | Exemple 2 | Exemple 3 |
|-----------|-----------|-----------|
| Longueur côté a ? 1 | Longueur côté a ? 3 | Longueur côté a ? 2 |
| Longueur côté b ? 1 | Longueur côté b ? 4 | Longueur côté b ? 2 |
| Longueur côté c ? 3 | Longueur côté c ? 5 | Longueur côté c ? 3 |
| ABC n'est pas un triangle | ABC est un triangle rectangle | ABC est un triangle isocèle |

---

#### Exercice 14 - Équation du 2ème degré

On se propose de développer un programme qui permet de résoudre une équation du 2ème degré à coefficients réels : `a`, `b` et `c`.

`a.x² + b.x + c = 0`

1. Calcul du discriminant : `Δ = b² - 4ac`

2. En fonction de `Δ`, on distingue trois cas distincts :

- **Δ > 0** : Deux solutions dans ℝ  
  `x₁ = (-b - √Δ) / (2a)` et `x₂ = (-b + √Δ) / (2a)`

- **Δ = 0** : Solution double  
  `x₁ = x₂ = -b / (2a)`

- **Δ < 0** : Pas de solutions dans ℝ

**Travail demandé :** Écrire l'algorithme relatif à ce problème.

---

#### Exercice 15 - Les alcools

La formule chimique générale de la famille des alcools est :

`CnH₂n+₂O`

Où les lettres C, H et O représentent respectivement des atomes de Carbone, d'Hydrogène et d'Oxygène.

On souhaite développer l'algorithme d'un programme qui :
- Saisit une formule chimique,
- Vérifie qu'il s'agit d'un type d'alcool, le cas échéant il :
  - Calcule et affiche la masse molaire du composé chimique,
    - C = 12,01 g/mol
    - H = 1,008 g/mol
    - O = 16,00 g/mol
  - Identifie le nom de l'alcool en question.

| Formule | Nom |
|---------|-----|
| CH₄O | Méthanol |
| C₂H₆O | Éthanol |
| C₃H₈O | Propanol |
| C₄H₁₀O | Butanol |
| C₅H₁₂O | Pentanol |
| C₆H₁₄O | Hexanol |
| 7 carbones ou plus | Alcool à longue chaîne |

---

#### Exercice 16 - Intersection de deux droites

Une droite du plan peut être décrite par une équation affine de la forme : `ax + b`.

Deux droites du plan, d'équations affines `a₁.x + b₁` et `a₂.x + b₂`, peuvent être :

- **Sécantes**, si `a₁ ≠ a₂`  
  Le point d'intersection est le point de coordonnées :  
  `x = (b₁ - b₂) / (a₂ - a₁)` et `y = a₁x + b₁`

- **Orthogonales**, si `a₁ = -1/a₂`  
  Le point d'intersection est le point de coordonnées :  
  `x = (b₁ - b₂) / (a₂ - a₁)` et `y = a₁x + b₁`

- **Confondues**, si `a₁ = a₂` et `b₁ = b₂`

- **Parallèles**, si `a₁ = a₂` et `b₁ ≠ b₂`

**Exemples :**

La figure ci-après montre les équations de 4 droites affines :
- La droite F décrite par `f(x) = 2x – 1`
- La droite G décrite par `g(x) = 2x + 2`
- La droite H décrite par `h(x) = 0.5x + 1`
- La droite I décrite par `i(x) = -0.5x - 1.5`

- Les droites F et G sont parallèles.
- Les droites I et H sont sécantes au point E de coordonnées `(-2.5, -0.25)`.
- Les droites F et I sont orthogonales au point B de coordonnées `(-0.2, -1.4)`.

**Travail demandé :** Écrire l'algorithme d'un programme qui saisit les coefficients de deux droites affines, puis affiche si elles sont confondues, parallèles, sécantes ou orthogonales.

---

## Structures itératives

### 1. Présentation

Les structures de contrôle itératives ou répétitives sont indispensables lorsque le traitement doit être répété un nombre connu de fois.

### 2. Syntaxe

| Algorithme | Python |
|------------|--------|
| `// Compteur ou décompteur`<br>`Pour cpt de Vi à Vf Faire [Pas=p]`<br>&nbsp;&nbsp;&nbsp;&nbsp;`// Traitement`<br>`Fin Pour` | `# compteur, p > 0`<br>`for cpt in range(Vi, Vf+1, p):`<br>&nbsp;&nbsp;&nbsp;&nbsp;`# Traitement`<br><br>`# décompteur, p < 0`<br>`for cpt in range(Vi, Vf-1, p):`<br>&nbsp;&nbsp;&nbsp;&nbsp;`# Traitement` |

**Exemples :**

| Algorithme | Python |
|------------|--------|
| `// Compteur de 0 à 10`<br>`// 0, 1, 2, 3, ..., 10`<br>`Pour i de 0 à 10 Faire`<br>&nbsp;&nbsp;&nbsp;&nbsp;`Ecrire(i)`<br>`Fin Pour` | `# Compteur de 0 à 10`<br>`for i in range(11):`<br>&nbsp;&nbsp;&nbsp;&nbsp;`print(i)`<br>`# ou`<br>`for i in range(0, 11):`<br>&nbsp;&nbsp;&nbsp;&nbsp;`print(i)`<br>`# ou`<br>`for i in range(10, 11, 1):`<br>&nbsp;&nbsp;&nbsp;&nbsp;`print(i)` |
| `// Compteur de 0 à 10 par pas de 2`<br>`// 0, 2, 4, 6, 8, 10`<br>`Pour i de 0 à 10 Faire [Pas=2]`<br>&nbsp;&nbsp;&nbsp;&nbsp;`Ecrire(i)`<br>`Fin Pour` | `# Compteur de 0 à 10 par pas de 2`<br>`for i in range(0, 11, 2):`<br>&nbsp;&nbsp;&nbsp;&nbsp;`print(i)` |
| `// Décompteur de 10 à 0 par pas de -2`<br>`// 10, 8, 6, 4, 2, 0`<br>`Pour i de 10 à 0 Faire [Pas=-2]`<br>&nbsp;&nbsp;&nbsp;&nbsp;`Ecrire(i)`<br>`Fin Pour` | `# Décompteur de 10 à 0 par pas de -2`<br>`for i in range(10, -1, -2):`<br>&nbsp;&nbsp;&nbsp;&nbsp;`print(i)` |

---

### 3. Exercices

#### Exercice 1 - Fonction range

Indiquer la valeur du compteur dans chacun des cas suivants :

| Instruction Python | Compteur | Vi / Vf | Valeurs du compteur |
|--------------------|----------|---------|---------------------|
| `for i in range(5):` | `i` | 0 / 4 | 0, 1, 2, 3, 4 |
| `for j in range(1, 5):` | | | |
| `for k in range(5, 1):` | | | |
| `for l in range(2, 11, 3):` | | | |
| `for m in range(10, -10, -5):` | | | |
| `for n in range(len("abdou")):` | | | |

---

#### Exercice 2 - Bonjour

1. Écrire l'algorithme d'un programme qui saisit un entier `n` puis affiche "Hello" `n` fois.

**Exemples :**
```
N ? 2
Hello Hello
```
```
N ? 3
Hello Hello Hello
```

2. Modifier l'algorithme du programme pour qu'il alterne entre "Hello", "Bonjour" et "Asselema".

**Exemples :**
```
N ? 2
Hello Bonjour
```
```
N ? 3
Hello Bonjour Asselema
```
```
N ? 5
Hello Bonjour Asselema Hello Bonjour
```

---

#### Exercice 3 - Somme nombres impairs

Écrire l'algorithme d'un programme qui saisit deux entiers `a` et `b` (avec `b > a`), calcule puis affiche la somme de tous les entiers impairs de l'intervalle `[a, b]`.

---

#### Exercice 4 - Nombre de voyelles et de consonnes

Écrire l'algorithme d'un programme qui saisit une chaîne non vide `ch`, puis calcule et affiche le nombre de voyelles et le nombre de consonnes qui la composent.

**Exemples :**
```
ch ? Mariouma
Nombre de voyelles : 5
Nombre de consonnes : 3
```
```
ch ? Hammoud
Nombre de voyelles : 3
Nombre de consonnes : 4
```

---

#### Exercice 5 - Filtrage des lettres et des chiffres

Écrire l'algorithme d'un programme qui saisit une chaîne de caractères non vide `ch`, puis construit deux chaînes :
- La chaîne `chl` sera composée des lettres qui se trouvent dans la chaîne.
- La chaîne `chc` sera composée des chiffres composant la chaîne.

**Exemples :**
```
ch ? IA2DAY4TMRW
Lettres : IADYTMRW
Chiffres : 24
```
```
ch ? Sami est ne le 15/05/25
Lettres : SAMIETNL
Chiffres : 15025
```

---

#### Exercice 6 - QCM

Cocher la bonne réponse :

1. 
```python
x = 0
for i in range(1, 4):
    x = x + i
print('x=', x)
```
- [ ] x = 6
- [ ] x = 15
- [ ] x = 10

2. 
```pythony = 1
for i in range(1, 4):
    y = y * i
print('y=', y)
```
- [ ] y = 20
- [ ] y = 25
- [ ] y = 6

3. 
```
X ← 0
Pour i de 0 à long(ch)-1 faire
    Si "0" ≤ ch[i] ≤ "9" alors
        X ← X + valeur(ch[i])
    Fin Si
Fin pour
Ecrire(x)
```
Le programme affiche pour `ch = "AX3?41R0"` :
- [ ] 3410
- [ ] 8
- [ ] 4

4. 
```
X ← 0
Pour i de 0 à long(ch)-1 faire
    Si "0" ≤ ch[i] ≤ "9" alors
        X ← X + 1
    Fin Si
Fin pour
Ecrire(x)
```
Le programme affiche pour `ch = "AX3?41R0"` :
- [ ] 3410
- [ ] 8
- [ ] 4

5. 
```
X ← ""
Pour i de 0 à long(ch)-1 faire
    Si "0" ≤ ch[i] ≤ "9" alors
        X ← X + ch[i]
    Fin Si
Fin pour
Ecrire(x)
```
Le programme affiche pour `ch = "AX3?41R0"` :
- [ ] 3410
- [ ] 8
- [ ] 4

---

#### Exercice 7 - Nombre abondant / Nombre déficient

Un nombre est dit :
- **Abondant** s'il est strictement supérieur à la somme de tous ses diviseurs sauf lui-même.
- **Déficient** s'il est strictement inférieur à la somme de tous ses diviseurs sauf lui-même.
- **Parfait** s'il est égal à la somme de tous ses diviseurs sauf lui-même.

**Exemples :**
- 10 est un nombre abondant, car SD = 1+2+5 = 8 et 10 > 8
- 12 est un nombre déficient, car SD = 1+2+3+4+6 = 16 et 12 < 16
- 6 est un nombre parfait, car SD = 1+2+3 = 6 et 6 = 6

Écrire l'algorithme d'un programme qui saisit un entier N strictement positif (N > 0), puis vérifie s'il est abondant, déficient ou parfait.

---

#### Exercice 8 - Nombre Poly-divisible

Dans le cadre d'une campagne publicitaire, une grande surface organise chaque année un jeu pour ses clients. Le jeu consiste à vérifier si le numéro du ticket de caisse du client (une chaîne numérique de 10 chiffres) est gagnant.

Le numéro de caisse est gagnant s'il est poly-divisible. Un nombre est dit poly-divisible s'il possède les propriétés suivantes :
- Le nombre formé par les 2 premiers chiffres est multiple de 2.
- Le nombre formé par les 3 premiers chiffres est multiple de 3.
- Le nombre formé par les 4 premiers chiffres est multiple de 4.
- Et ainsi de suite jusqu'à 10.

Écrire l'algorithme d'un programme qui affiche si le ticket de caisse est gagnant ou non.

**Exemples :**
- NT ? 1624560840 → Ticket Gagnant
- NT ? 8460060840 → Ticket Gagnant
- NT ? 6244560000 → Ticket Gagnant

---

#### Exercice 9 - Série numérique

Écrire l'algorithme d'un programme qui saisit un entier `n`, et affiche la somme Sₙ tel que :

`Sₙ = 1¹ − 2² + 3³ − 4⁴ … + (−1)ⁿ⁺¹ nⁿ`, pour tout `n ≥ 1`

---

#### Exercice 10 - Carte de fidélité

Le numéro de la carte de fidélité d'une marque de prêt à porter est une chaîne constituée de lettres alphabétiques majuscules et de chiffres. Le numéro d'une carte est considéré valide si et seulement s'il vérifie les critères suivants :
- Le numéro de la carte est constitué d'au moins 8 caractères.
- La somme des chiffres est multiple de 3 ou de 7.
- La somme des rangs des lettres alphabétiques est paire si le nombre de lettres est pair, ou impaire sinon.

Écrire l'algorithme du programme intitulé "Check_card" qui saisit le numéro d'une carte de fidélité, puis vérifie si elle est valide ou invalide.

**Rang des lettres alphabétiques :**

| A | B | C | D | E | F | G | H | I | J | K | L | M | N | O | P | Q | R | S | T | U | V | W | X | Y | Z |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14 | 15 | 16 | 17 | 18 | 19 | 20 | 21 | 22 | 23 | 24 | 25 |

**Exemple :** Pour la carte dont le numéro est "A3B79A2T", le programme affichera "Valide" car :
- Le numéro de la carte est constitué de 8 caractères.
- La somme des chiffres (3 + 7 + 9 + 2 = 21) est multiple de 3 et aussi multiple de 7.
- La somme des rangs des lettres (0 + 1 + 0 + 19 = 20) est paire en même temps que le nombre de lettres dans la chaîne.

---

#### Exercice 11 - Progression Croissante / Décroissante

Un nombre forme une progression :
- **Croissante** si ses chiffres de gauche à droite forment une suite croissante.
- **Décroissante** si ses chiffres de gauche à droite forment une suite décroissante.

**Exemples :**
- Le nombre 1234 forme une progression croissante, car 1 ≤ 2 ≤ 3 ≤ 4
- Le nombre 4321 forme une progression décroissante, car 4 ≥ 3 ≥ 2 ≥ 1

Écrire l'algorithme d'un programme qui saisit un nombre strictement positif puis affiche s'il forme une progression croissante, décroissante ou n'est pas une progression.