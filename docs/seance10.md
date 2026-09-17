# 📝 Fiche Pédagogique – Séance 10
## Module 04 : Les structures conditionnelles
### Thème : Structure à Choix Multiples (`Selon ... Faire` / `match ... case`) & Mini-Calculatrice

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
| **Prérequis** | Forme généralisée `elif` (Séance 10), types caractère et entier |

---

## 🎯 2. Compétences & Objectifs Opérationnels

### Compétences visées :
* **Compétence algorithmique** : Structurer des branchements conditionnels basés sur la valeur discrète d'un sélecteur unique.
* **Compétence syntaxique** : Manipuler la structure moderne `match ... case` en Python 3.10+.

### Objectifs opérationnels (À l'issue de la séance, l'élève sera capable de) :
1. **Identifier** les situations où la structure `Selon` est plus lisible que `Si...SinonSi`.
2. **Respecter** les contraintes sur le sélecteur (valeur de type scalaire discret : entier ou caractère).
3. **Programmer** une mini-calculatrice arithmétique $A \text{ op } B$ avec gestion de la division par zéro (Exercice 9).
4. **Réécrire** un algorithme de salutations horaires avec la structure à choix multiples (Exercice 13).

---

## ⏱️ 3. Scénario Pédagogique & Déroulement Minuté (Séance de 60 min)

```
┌─────────────────────────────────────────────────────────────────────────────────────┐
│  00 - 10 min : Phase 1 - Accroche : Peut-on simplifier les tests d'égalité ?        │
│  10 - 25 min : Phase 2 - Cours : Structure Selon & match...case en Python 3.10+     │
│  25 - 42 min : Phase 3 - Exercices 2 & 3 (QCM) & Exercice 9 (Calculatrice)          │
│  42 - 55 min : Phase 4 - Atelier Playground : Exercice 13 (Salutations selon heure) │
│  55 - 60 min : Phase 5 - Synthèse, trace écrite & préparation Séance 11             │
└─────────────────────────────────────────────────────────────────────────────────────┘
```

---

## 📖 4. Contenu Didactique & Support de Cours

### 1. La Structure `Selon ... Faire`
On l'utilise lorsqu'une même variable (le **sélecteur**) est comparée à une liste de valeurs constantes discrètes possibles.

```algorithm
Selon sélecteur Faire
   valeur_1 : Traitements_1
   valeur_2 : Traitements_2
   valeur_3, valeur_4 : Traitements_3_4
   Autre : Traitements_Par_Défaut
FinSelon
```

### 2. Équivalent Python Moderne : `match ... case` (Python 3.10+)

```python
match selecteur:
    case valeur_1:
        # Traitements 1
    case valeur_2:
        # Traitements 2
    case valeur_3 | valeur_4:
        # Traitements si 3 ou 4
    case _:
        # Branche par défaut (équivalent de Autre)
```

> [!NOTE]
> *Le tiret du bas `case _:` représente le cas par défaut (wildcard) qui attrape toutes les valeurs non prévues précédemment.*

---

## 🧩 5. Fiche Activités & Corrigés Détaillés

### 🔴 Exercice 9 : Calculatrice d'Expressions ($A \text{ op } B$)
* **Énoncé** : Saisir deux nombres réels $A$ et $B$ et un opérateur arithmétique `op` parmi `+`, `-`, `*`, `/`. Calculer et afficher le résultat. Prévoir un message d'alerte en cas de division par zéro ou d'opérateur inconnu.
* **Algorithme** :
```algorithm
Algorithme Calculatrice
Début
   Ecrire("Donner A : ") ; Lire(A)
   Ecrire("Donner l'opérateur (+, -, *, /) : ") ; Lire(op)
   Ecrire("Donner B : ") ; Lire(B)

   Selon op Faire
      '+' : res ← A + B ; Ecrire("Résultat = ", res)
      '-' : res ← A - B ; Ecrire("Résultat = ", res)
      '*' : res ← A * B ; Ecrire("Résultat = ", res)
      '/' : 
         Si B ≠ 0 Alors
            res ← A / B
            Ecrire("Résultat = ", res)
         Sinon
            Ecrire("Erreur : Division par zéro impossible !")
         FinSi
      Autre : Ecrire("Erreur : Opérateur non reconnu !")
   FinSelon
Fin
```

* **Code Python avec `match ... case`** :
```python
A = float(input("Donner A : "))
op = input("Opérateur (+, -, *, /) : ")
B = float(input("Donner B : "))

match op:
    case '+':
        print(f"{A} + {B} = {A + B}")
    case '-':
        print(f"{A} - {B} = {A - B}")
    case '*':
        print(f"{A} * {B} = {A * B}")
    case '/':
        if B != 0:
            print(f"{A} / {B} = {A / B:.2f}")
        else:
            print("Erreur : Division par zéro impossible !")
    case _:
        print("Erreur : Opérateur arithmétique invalide !")
```

---

### 🟡 Exercice 13 : Salutations selon le Créneau Horaire
* **Énoncé** : En fonction du code de créneau horaire `code` ($1$ : Matin, $2$ : Après-midi, $3$ : Soir, $4$ : Nuit), afficher la salutation appropriée.
* **Script Python** :
```python
code = int(input("Entrez le code créneau (1=Matin, 2=Après-midi, 3=Soir, 4=Nuit) : "))

match code:
    case 1:
        print("🌅 Bonjour ! Bonne journée.")
    case 2:
        print("☀️ Bon après-midi !")
    case 3:
        print("🌆 Bonsoir !")
    case 4:
        print("🌙 Bonne nuit et doux rêves.")
    case _:
        print("Code invalide (choisir entre 1 et 4).")
```

---

## 📝 6. Trace Écrite pour le Cahier de l'Élève

```markdown
CHAPITRE 4 : LES STRUCTURES CONDITIONNELLES (Partie 3 : Choix Multiples)

1. En Algorithme :
   Selon sélecteur Faire
      valeur_1 : actions
      valeur_2 : actions
      Autre    : actions_par_défaut
   FinSelon

2. En Python (3.10+) :
   match selecteur:
       case val1:
           actions
       case val2:
           actions
       case _:
           actions_defaut

3. Règle clé :
   Le sélecteur doit être une variable discrète (entier ou caractère).
```

---

## ❓ 7. Auto-Évaluation Formative (5 Questions)

1. **Peut-on utiliser une condition comme `case x > 10:` dans un `match` simple ?**  
   *Réponse* : Non, le `case` compare directement une égalité de valeur avec le sélecteur. Pour des intervalles, on privilégie `if...elif`.
2. **Que représente le symbole `_` dans `case _:` ?**  
   *Réponse* : La valeur par défaut (joker), exécutée si aucun autre cas ne correspond.
3. **Que se passe-t-il si l'utilisateur entre `/` et $B=0$ dans l'Exercice 9 ?**  
   *Réponse* : La condition imbriquée `if B != 0` empêche l'exécution de la division et affiche un message d'erreur explicite.
4. **Le sélecteur peut-il être un nombre réel (`float`) ?**  
   *Réponse* : Non recommandé, en raison des imprécisions d'arrondi sur les nombres réels flottants.
5. **Comment regrouper plusieurs valeurs dans un même `case` ?**  
   *Réponse* : En les séparant par une barre verticale : `case 1 | 2 | 3:`.

---

## 🚀 8. Préparation de la Séance 12
* **Thème** : *Conditions composées, calendrier grégorien et contrôle d'intégrité*.
* **Énigme d'amorce** : Pourquoi l'année 2000 était-elle bissextile alors que 1900 ne l'était pas ?
