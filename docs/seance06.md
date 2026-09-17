# 📝 Fiche Pédagogique – Séance 06
## Module 03 : Les structures de données
### Thème : Types Textuels (I) : Type Caractère, Code ASCII (`ord` / `chr`), Longueur (`long` / `len`) & Indexation

---

## 📌 1. Fiche Signalétique de la Séance

| Champ | Description |
| :--- | :--- |
| **Matière** | Informatique |
| **Niveau & Section** | 2ème Année Secondaire – Section Sciences |
| **Durée prévisionnelle** | 1 séance (1 heure) |
| **Cadre de référence** | Programme officiel du Ministère de l'Éducation (Tunisie) |
| **Enseignant** | Mohamed Anis MANI |
| **Supports & Outils** | Ordinateurs, page web `module03.html`, Playground Python (`playground.html`), table ASCII |
| **Prérequis** | Types numériques, affectation, chaînes simples (E/S) |

---

## 🎯 2. Compétences & Objectifs Opérationnels

### Compétences visées :
* **Compétence textuelle** : Manipuler les caractères et les chaînes comme des séquences ordonnées de symboles indexés.
* **Compétence d'encodage** : Comprendre la représentation numérique des caractères à travers le code ASCII standard.

### Objectifs opérationnels (À l'issue de la séance, l'élève sera capable de) :
1. **Distinguer** le type caractère (`caractère` / `str` de longueur 1) de la chaîne (`chaine` / `str`).
2. **Utiliser** les fonctions de conversion ASCII : `ord(c)` (caractère $\rightarrow$ code entier) et `chr(code)` (code entier $\rightarrow$ caractère).
3. **Déterminer** la longueur d'une chaîne avec `long(ch)` / `len(ch)`.
4. **Accéder** à un caractère individuel par son indice `ch[i]` (indexation à base 0).
5. **Programmer** un générateur de mot de passe et une permutation de chiffres (Exercices 8 et 9).

---

## ⏱️ 3. Scénario Pédagogique & Déroulement Minuté (Séance de 60 min)

```
┌─────────────────────────────────────────────────────────────────────────────────────┐
│  00 - 10 min : Phase 1 - Accroche : Comment la machine stocke-t-elle les lettres ?  │
│  10 - 25 min : Phase 2 - Cours : Table ASCII (ord/chr), indexation et longueur      │
│  25 - 42 min : Phase 3 - Exercice 3 (Trace mémoire) & Exercice 5 (Concaténation)    │
│  42 - 55 min : Phase 4 - Atelier Playground : Ex 8 (Password) & Ex 9 (Chiffres)     │
│  55 - 60 min : Phase 5 - Synthèse, trace écrite & préparation Séance 07             │
└─────────────────────────────────────────────────────────────────────────────────────┘
```

---

## 📖 4. Contenu Didactique & Support de Cours

### 1. La Table des Caractères ASCII Standard
L'ordinateur ne traite que des nombres binaires. La table **ASCII** (American Standard Code for Information Interchange) associe à chaque symbole usuel un code numérique entier compris entre 0 et 127 :

| Caractères | Plage des Codes ASCII | Exemples remarquables |
| :--- | :---: | :--- |
| **Chiffres textuels** `'0' .. '9'` | **48 à 57** | `'0'` $\rightarrow 48$, `'9'` $\rightarrow 57$ |
| **Lettres majuscules** `'A' .. 'Z'` | **65 à 90** | `'A'` $\rightarrow 65$, `'B'` $\rightarrow 66$, `'Z'` $\rightarrow 90$ |
| **Lettres minuscules** `'a' .. 'z'` | **97 à 122** | `'a'` $\rightarrow 97$, `'b'` $\rightarrow 98$, `'z'` $\rightarrow 122$ |
| **Espace** `' '` | **32** | Espace blanc |

> [!NOTE]
> Pour convertir une majuscule en minuscule, il suffit d'ajouter 32 à son code ASCII :
> $$\text{ord}('a') = \text{ord}('A') + 32 = 65 + 32 = 97$$

### 2. Les Fonctions Fondamentales `ord()` et `chr()`
* `ord(c)` : Prend un caractère $c$ et renvoie son **code entier ASCII**.
  * `ord('A')` $\rightarrow 65$
  * `ord('5')` $\rightarrow 53$
* `chr(code)` : Prend un code entier ASCII et renvoie le **caractère associé**.
  * `chr(65)` $\rightarrow \text{'A'}$
  * `chr(97)` $\rightarrow \text{'a'}$

### 3. Longueur & Repères d'Indices dans une Chaîne
Une chaîne de caractères est une séquence finie ordonnée de symboles.
* **Fonction Longueur** : `long(ch)` en algorithme $\rightarrow$ `len(ch)` en Python.
* **Règle d'or de l'indexation** : En Python, les indices commencent impérativement à **0** et se terminent à **$\text{len}(ch) - 1$**.

Exemple avec la chaîne `ch = "PYTHON"` :
```
Indice :      0     1     2     3     4     5     (len = 6)
Caractère :   'P'   'Y'   'T'   'H'   'O'   'N'
              │                               │
              ch[0]                           ch[5]  ou  ch[len(ch)-1]
```

---

## 🧩 5. Fiche Activités & Corrigés Détaillés

### 🔴 Exercice 3 : Tableau de Trace Mémoire
Suivre l'évolution des variables :
```python
mot = "BAC"
c1 = mot[0]          # c1 = 'B' (ord = 66)
code = ord(c1) + 1   # code = 67
c2 = chr(code)       # c2 = 'C'
res = c1 + c2        # res = "BC"
```

---

### 🟡 Exercice 5 : Concaténation de Chaînes
* L'opérateur `+` entre deux chaînes réalise la **concaténation** (fusion bout à bout) :
  `"Sciences " + "2026"` $\rightarrow$ `"Sciences 2026"`.
* L'opérateur `*` entre une chaîne et un entier réalise la **répétition** :
  `"=*=" * 4` $\rightarrow$ `"=**==*==*="`.

---

### 🟢 Exercice 8 : Générateur de Mot de Passe Sécurisé
* **Énoncé** : Saisir le nom `nom` et l'année de naissance `annee`. Construire un mot de passe composé de :
  1. La première lettre du nom en majuscule.
  2. La dernière lettre du nom.
  3. Le symbole spécial dont le code ASCII est 64 (`@`).
  4. Les deux derniers chiffres de l'année.
* **Script Python** :
```python
nom = input("Donner votre nom : ")
annee = input("Donner votre année de naissance (ex: 2009) : ")

# Extraction des composants
c_debut = nom[0].upper()
c_fin = nom[len(nom) - 1]
arobase = chr(64)          # Code ASCII 64 = '@'
annee_court = annee[2] + annee[3]

password = c_debut + c_fin + arobase + annee_court
print("Votre mot de passe généré est :", password)
```

---

### 🔵 Exercice 9 : Permutation des Chiffres d'un Entier
* **Énoncé** : Saisir un entier positif à 3 chiffres (ex: `n = 482`). Afficher le nombre inversé (`284`).
* **Méthode par manipulation textuelle** :
```python
ch = input("Donner un nombre de 3 chiffres : ")
inverse = ch[2] + ch[1] + ch[0]
print("Nombre inversé :", int(inverse))
```

---

## 📝 6. Trace Écrite pour le Cahier de l'Élève

```markdown
CHAPITRE 3 : LES STRUCTURES DE DONNÉES (Partie 3 : Caractères & ASCII)

1. Le Code ASCII :
   - '0' à '9' : codes 48 à 57
   - 'A' à 'Z' : codes 65 à 90
   - 'a' à 'z' : codes 97 à 122
   - Espace ' ' : code 32

2. Fonctions de Conversion :
   - ord(c)    : renvoie le code ASCII du caractère c (ex: ord('A') = 65)
   - chr(code) : renvoie le caractère associé au code (ex: chr(65) = 'A')

3. Chaîne de caractères :
   - Longueur : len(ch)
   - Premier caractère : ch[0]
   - Dernier caractère : ch[len(ch) - 1]
```

---

## ❓ 7. Auto-Évaluation Formative (5 Questions)

1. **Que vaut `ord('C') - ord('A')` ?**  
   *Réponse* : $67 - 65 = \mathbf{2}$.
2. **Que renvoie `chr(ord('x') - 32)` ?**  
   *Réponse* : `'X'` (la majuscule correspondante).
3. **Si `ch = "INFO"`, que renvoie l'instruction `ch[4]` ?**  
   *Réponse* : Une erreur `IndexError: string index out of range` (car les indices valides vont de 0 à 3).
4. **Quelle est la longueur de la chaîne `ch = "2e Sciences"` ?**  
   *Réponse* : $11$ caractères (l'espace est compté comme un caractère à part entière).
5. **Quelle instruction permet de récupérer le dernier caractère d'une chaîne `ch` sans connaître sa longueur à l'avance ?**  
   *Réponse* : `ch[len(ch) - 1]` ou `ch[-1]`.

---

## 🚀 8. Préparation de la Séance 08
* **Thème** : *Types textuels (II) : Découpage par tranches (Slicing), conversions et synthèse de module*.
* **À réfléchir** : Comment extraire d'un mot les trois premières lettres d'un seul coup ?
