# 📝 Fiche Pédagogique – Séance 08
## Module 03 : Les structures de données
### Thème : Types Textuels (II) : Découpage par Tranches (Slicing), Conversions, Fonctions Avancées & Synthèse du Module 03

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
| **Prérequis** | Code ASCII, indexation à base 0, longueur `len()` (Séance 07) |

---

## 🎯 2. Compétences & Objectifs Opérationnels

### Compétences visées :
* **Compétence algorithmique** : Extraire des sous-chaînes ciblées grâce au découpage par tranches (*slicing*).
* **Compétence de synthèse** : Mobiliser l'ensemble des types de données de base (numérique, booléen, textuel) dans une application concrète.

### Objectifs opérationnels (À l'issue de la séance, l'élève sera capable de) :
1. **Maîtriser** la notation du découpage : `ch[début : fin]` avec l'exclusion stricte de la borne supérieure.
2. **Utiliser** les méthodes standard de transformation : `.upper()`, `.lower()`, `.find()`, `.count()`.
3. **Convertir** les chaînes numériques en entiers/réels et réciproquement (`str()`, `int()`, `float()`).
4. **Réaliser** le projet de synthèse : Générateur de Pseudonymes (Exercice 14).

---

## ⏱️ 3. Scénario Pédagogique & Déroulement Minuté

```
┌──────────────────────────────────────────────────────────────────────────────┐
│  00 - 15 min : Phase 1 - Découverte : L'extraction par tranches (Slicing)     │
│  15 - 35 min : Phase 2 - Cours : Syntaxe ch[d:f], méthodes & conversions     │
│  35 - 55 min : Phase 3 - Entraînement : Exercice 6 & Exercice 7 (QCM)         │
│  55 - 75 min : Phase 4 - Projet de synthèse Module 03 : Exercice 14 (Pseudo)  │
│  75 - 80 min : Phase 5 - Bilan global du Module 03 & annonce du Module 04    │
└──────────────────────────────────────────────────────────────────────────────┘
```

---

## 📖 4. Contenu Didactique & Support de Cours

### 1. Le Découpage par Tranches (*Slicing*)
Le découpage permet d'extraire une portion contiguë (sous-chaîne) à partir d'une chaîne existante.

$$\mathbf{ch[d : f]}$$

* **$d$ (début)** : Indice du premier caractère inclus.
* **$f$ (fin)** : Indice de fin **EXCLU**.
* **Propriété mathématique** : Le nombre de caractères extraits est exactement égal à **$f - d$**.

*Exemples avec `ch = "INFORMATIQUE"` (longueur 12) :*
* `ch[0 : 4]` $\rightarrow$ `"INFO"` (indices 0, 1, 2, 3 $\implies 4 - 0 = 4$ caractères)
* `ch[2 : 7]` $\rightarrow$ `"FORMA"` (indices 2, 3, 4, 5, 6 $\implies 7 - 2 = 5$ caractères)
* `ch[ : 4]`  $\rightarrow$ `"INFO"` (départ implicite à 0)
* `ch[7 : ]`  $\rightarrow$ `"TIQUE"` (va jusqu'à la fin de la chaîne)

### 2. Méthodes et Fonctions Prédéfinies sur les Chaînes

| Méthode Python | Équivalent Algorithme | Rôle | Exemple (`ch = "Sciences"`) |
| :--- | :--- | :--- | :--- |
| `ch.upper()` | `Majus(ch)` | Convertit tout en majuscules | `"SCIENCES"` |
| `ch.lower()` | `Minus(ch)` | Convertit tout en minuscules | `"sciences"` |
| `ch.find(sous_ch)` | `Pos(sous_ch, ch)` | Renvoie l'indice de la 1ère occurrence (-1 si absent) | `ch.find("en")` $\rightarrow 3$ |
| `ch.count(sous_ch)`| – | Compte le nombre d'occurrences | `ch.count("e")` $\rightarrow 2$ |
| `str(nombre)` | `Convch(nombre)` | Convertit un nombre en chaîne | `str(2026)` $\rightarrow \text{"2026"}$ |
| `int(ch)` | `Valeur(ch)` | Convertit une chaîne en entier | `int("45")` $\rightarrow 45$ |

---

## 🧩 5. Fiche Activités & Corrigés Détaillés

### 🔴 Exercice 6 & 7 : Manipulation de Chaînes & QCM
Soit la chaîne : `titre = "TUNISIE 2026"`
1. `titre[0:7]` $\rightarrow$ `"TUNISIE"`
2. `titre[8:]`  $\rightarrow$ `"2026"`
3. `int(titre[8:]) + 1` $\rightarrow$ $2026 + 1 = \mathbf{2027}$
4. `titre.find("2")` $\rightarrow$ `8` (indice du caractère `'2'`)
5. `titre.count("I")` $\rightarrow$ `2`

---

### 🟡 Exercice 14 : Générateur de Pseudonymes (Synthèse Module 03)
* **Énoncé** : Un site éducatif demande de générer automatiquement un pseudonyme d'élève à partir de son `prenom`, son `nom` et sa `classe` (ex: `"2SC"`).
* **Règle de construction du pseudonyme** :
  1. Les 3 premières lettres du prénom en majuscules.
  2. Le caractère séparateur `_`.
  3. Les 2 premières lettres du nom en minuscules.
  4. La somme des codes ASCII des deux premières lettres du prénom.
* **Exemple** :
  * `prenom = "Yassine"`, `nom = "Ben Ali"`
  * 3 premières lettres du prénom : `"YAS"`
  * 2 premières lettres du nom : `"be"`
  * Codes ASCII de `'Y'` (89) et `'a'` (97) : $89 + 97 = 186$
  * Résultat attendu : `"YAS_be186"`

* **Algorithme & Code Python** :
```python
prenom = input("Donner votre prénom : ")
nom = input("Donner votre nom : ")

# 1. Extraction et transformation des lettres
p_debut = prenom[0:3].upper()
n_debut = nom[0:2].lower()

# 2. Calcul arithmétique sur les codes ASCII
cle_ascii = ord(prenom[0]) + ord(prenom[1])

# 3. Assemblage du pseudonyme final
pseudo = p_debut + "_" + n_debut + str(cle_ascii)

print("Votre pseudonyme officiel est :", pseudo)
```

---

## 📝 6. Trace Écrite pour le Cahier de l'Élève

```markdown
CHAPITRE 3 : LES STRUCTURES DE DONNÉES (Partie 4 : Slicing & Synthèse)

1. Découpage par tranches (Slicing) :
   ch[début : fin]
   - 'début' est inclus, 'fin' est EXCLU.
   - Nombre de caractères extraits = fin - début.

2. Fonctions utiles sur les chaînes :
   - ch.upper() : passage en majuscules
   - ch.lower() : passage en minuscules
   - ch.find(x) : cherche l'indice de x (ou -1)
   - ch.count(x): compte les apparitions de x

3. Conversions :
   - str(x) : transforme un nombre en texte "x"
   - int(ch) / float(ch) : transforme un texte en nombre calculable
```

---

## ❓ 7. Auto-Évaluation Formative (5 Questions)

1. **Si `texte = "SCIENCES"`, que vaut `texte[1:5]` ?**  
   *Réponse* : `"CIEN"` (indices 1, 2, 3, 4 $\implies$ 4 caractères).
2. **Comment obtenir les 3 derniers caractères d'une chaîne `ch` avec le slicing ?**  
   *Réponse* : `ch[len(ch) - 3 : len(ch)]` ou en abrégé `ch[-3:]`.
3. **Que renvoie `"informatique".find("z")` ?**  
   *Réponse* : `-1` (convention Python pour indiquer que la sous-chaîne n'existe pas).
4. **Pourquoi `str(12) + str(34)` donne-t-il `"1234"` et non `46` ?**  
   *Réponse* : Parce que ce sont des chaînes de caractères : l'opérateur `+` réalise une concaténation et non une addition arithmétique.
5. **Quelle est la taille de la tranche `ch[4:4]` ?**  
   *Réponse* : $0$ caractère (chaîne vide `""`, car $4 - 4 = 0$).

---

## 🚀 8. Préparation de la Séance 09 (Module 04)
* **Thème** : *Les structures conditionnelles : Choix algorithmiques, formes simple (`Si`) et alternative (`Si ... Sinon`)*.
* **Problème d'amorce** : Comment programmer un test pour savoir si un nombre est positif, négatif ou nul ?
