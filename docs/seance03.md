# 📝 Fiche Pédagogique – Séance 03
## Module 02 : Les structures simples
### Thème : Opérations d'Entrée / Sortie (`Lire` / `Ecrire`, `input` / `print`), Cast et Règles de Nommage

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
| **Prérequis** | Notions du Module 01 (Cycle E/T/S, TDO) |

---

## 🎯 2. Compétences & Objectifs Opérationnels

### Compétences visées :
* **Compétence disciplinaire** : Dialoguer avec l'utilisateur via les opérations d'entrée et de sortie standard.
* **Compétence syntaxique** : Choisir des noms d'identificateurs valides selon les normes algorithmiques et le standard Python (PEP 8).

### Objectifs opérationnels (À l'issue de la séance, l'élève sera capable de) :
1. **Écrire** des instructions d'affichage simples et composées (`Ecrire` / `print`).
2. **Réaliser** la saisie de données au clavier (`Lire` / `input`).
3. **Appliquer** le transtypage (cast) en Python selon la nature des données (`int()`, `float()`).
4. **Distinguer** un identificateur valide d'un identificateur invalide et justifier la non-validité.

---

## ⏱️ 3. Scénario Pédagogique & Déroulement Minuté

```
┌──────────────────────────────────────────────────────────────────────────────┐
│  00 - 15 min : Phase 1 - Accroche : Pourquoi l'ordinateur doit-il communiquer?│
│  15 - 35 min : Phase 2 - Cours : Sortie (print), Entrée (input) et Cast      │
│  35 - 55 min : Phase 3 - Cours : Règles lexicales des noms de variables      │
│  55 - 75 min : Phase 4 - Atelier interactif : Exercice 1 (QCM) & Exercice 2  │
│  75 - 80 min : Phase 5 - Synthèse, trace écrite & préparation Séance 04      │
└──────────────────────────────────────────────────────────────────────────────┘
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

### 2. L'Opération d'Entrée (La Lecture)
Permet de récupérer des données saisies par l'utilisateur au clavier.
* **En Algorithme** : `Lire(nom_variable)`
* **En Python** : `nom_variable = input("Invite : ")`

> [!IMPORTANT]
> En Python, `input()` retourne TOUJOURS une chaîne de caractères (`str`). Pour effectuer des calculs arithmétiques, la conversion (le **cast**) est indispensable :
> * Entier : `n = int(input("Donner n : "))`
> * Réel : `x = float(input("Donner x : "))`

### 3. Les Règles de Nommage des Identificateurs (Variables / Constantes)
Un nom de variable doit respecter les 4 règles d'or :
1. Composé uniquement de **lettres non accentuées**, de **chiffres** et du caractère de soulignement `_` (underscore).
2. Doit obligatoirement **commencer par une lettre** (ou exceptionnellement `_`). Jamais par un chiffre.
3. Ne doit contenir **aucun espace**, tiret `-`, point ou symbole spécial (`@`, `#`, `$`, `%`, etc.).
4. Ne doit pas être un **mot réservé** (mot-clé du langage Python : `for`, `if`, `while`, `class`, `def`, `import`, etc.).

---

## 🧩 5. Fiche Activités & Corrigés Détaillés

### 🔴 Exercice 1 : QCM d'Auto-Évaluation (Extrait de `module02.html`)
1. **L'instruction `print("5 + 3 =", 5 + 3)` affiche :**
   * *Réponse exacte* : `5 + 3 = 8` (le texte entre guillemets est affiché littéralement, l'expression sans guillemets est calculée).
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

## 📝 6. Trace Écrite pour le Cahier de l'Élève

```markdown
CHAPITRE 2 : LES STRUCTURES SIMPLES (Partie 1)

1. Affichage :
   Algorithme : Ecrire("Message", variable)
   Python : print("Message", variable)

2. Lecture / Saisie :
   Algorithme : Lire(variable)
   Python : 
      Pour un entier : var = int(input("Invite : "))
      Pour un réel   : var = float(input("Invite : "))

3. Règles pour nommer une variable :
   - Lettres, chiffres, underscore (_) uniquement.
   - Commence TOUJOURS par une lettre.
   - Jamais d'espaces ni de ponctuation.
   - Ne pas utiliser les mots réservés (if, for, else, etc.).
```

---

## ❓ 7. Auto-Évaluation Formative (5 Questions)

1. **Que produit l'instruction Python `print(4 * "Ab")` ?**  
   *Réponse* : `AbAbAbAb` (répétition de la chaîne de caractères).
2. **Pourquoi l'instruction `age = input("Age : ") ; print(age + 5)` déclenche-t-elle une erreur `TypeError` ?**  
   *Réponse* : On tente d'additionner une chaîne (`str`) et un entier (`int`). Il faut transtyper : `age = int(input("Age : "))`.
3. **Le nom de variable `total_2026` est-il légal ?**  
   *Réponse* : Oui, il commence par une lettre et ne contient que des lettres, chiffres et underscore.
4. **Quelle est la différence entre `print(x)` et `print("x")` ?**  
   *Réponse* : `print(x)` affiche la valeur contenue dans la variable `x`, tandis que `print("x")` affiche la lettre `x` elle-même.
5. **Citer 3 mots-clés réservés en Python.**  
   *Réponse* : `if`, `else`, `for` (ou `while`, `def`, `return`, `class`, `import`).

---

## 🚀 8. Préparation de la Séance 04
* **Thème** : *L'affectation (`=`), les constantes et la modélisation scientifique (physique, géométrie)*.
* **Exercices à préparer** : Réviser les formules de l'aire d'un rectangle et de la loi de Hooke d'un ressort ($F = k \cdot \Delta L$).
