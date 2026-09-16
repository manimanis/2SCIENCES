# 📝 Fiche Pédagogique – Séance 10
## Module 04 : Les structures conditionnelles
### Thème : Structure Conditionnelle Généralisée (`Si ... Sinon Si ... Sinon` / `if ... elif ... else`) & Équivalences

---

## 📌 1. Fiche Signalétique de la Séance

| Champ | Description |
| :--- | :--- |
| **Matière** | Informatique |
| **Niveau & Section** | 2ème Année Secondaire – Section Sciences |
| **Durée prévisionnelle** | 1 séance (1h à 1h30) |
| **Cadre de référence** | Programme officiel du Ministère de l'Éducation (Tunisie) |
| **Enseignant** | Mohamed Anis MANI |
| **Supports & Outils** | Ordinateurs, page web `module04.html`, Playground Python (`playground.html`), tableau |
| **Prérequis** | Formes simple et alternative (Séance 09) |

---

## 🎯 2. Compétences & Objectifs Opérationnels

### Compétences visées :
* **Compétence d'optimisation** : Éviter l'imbrication désordonnée de conditions en utilisant la cascade structurée `elif`.
* **Compétence d'abstraction** : Réécrire un algorithme d'une forme conditionnelle à une autre équivalente.

### Objectifs opérationnels (À l'issue de la séance, l'élève sera capable de) :
1. **Comprendre** le mécanisme d'évaluation séquentielle et court-circuitée des clauses `elif`.
2. **Classifier** un élément selon plusieurs catégories mutuellement exclusives.
3. **Identifier le type d'un caractère** (majuscule, minuscule, chiffre, symbole) via son code ASCII (Exercice 8).
4. **Programmer la classification chimique** d'une solution selon son pH (Exercice 10).

---

## ⏱️ 3. Scénario Pédagogique & Déroulement Minuté

```
┌──────────────────────────────────────────────────────────────────────────────┐
│  00 - 15 min : Phase 1 - Problème déclencheur : Plus de 2 issues possibles ?  │
│  15 - 35 min : Phase 2 - Cours : Syntaxe de la forme généralisée (elif)       │
│  35 - 55 min : Phase 3 - Atelier d'équivalences de formes : Exercice 7        │
│  55 - 75 min : Phase 4 - Applications concrètes : Ex 8 (ASCII) & Ex 10 (pH)   │
│  75 - 80 min : Phase 5 - Synthèse, trace écrite & préparation Séance 11       │
└──────────────────────────────────────────────────────────────────────────────┘
```

---

## 📖 4. Contenu Didactique & Support de Cours

### 1. La Forme Généralisée
Lorsque le problème présente **au moins 3 cas mutuellement exclusifs**, imbriquer des `Si...Sinon` devient lourd et illisible. La forme généralisée offre une solution élégante et fluide.

```algorithm
Si condition_1 Alors
   Traitements_1
Sinon Si condition_2 Alors
   Traitements_2
Sinon Si condition_3 Alors
   Traitements_3
Sinon
   Traitements_Par_Defaut
FinSi
```

*Syntaxe Python équivalente (`elif` = contraction de `else if`) :*
```python
if condition_1:
    # Traitements 1
elif condition_2:
    # Traitements 2
elif condition_3:
    # Traitements 3
else:
    # Traitements par défaut
```

### 2. Le Mécanisme Court-Circuité d'Évaluation
* Les conditions sont évaluées **de haut en bas**.
* Dès qu'une condition est **Vraie**, son bloc s'exécute et **toutes les autres branches suivantes sont automatiquement ignorées**.
* La clause `else` finale ne s'exécute que si **aucune des conditions précédentes n'a été vérifiée**.

---

## 🧩 5. Fiche Activités & Corrigés Détaillés

### 🔴 Exercice 7 : Réécriture & Équivalences entre Formes
Soit la classification d'un entier $x$ :
* *Version avec 3 formes réduites (inoptimale)* :
  ```python
  if x > 0: print("Positif")
  if x < 0: print("Négatif")
  if x == 0: print("Nul")
  ```
  *(Inconvénient : la machine effectue obligatoirement les 3 tests même si $x > 0$ !)*
* *Version optimisée avec forme généralisée (`elif`)* :
  ```python
  if x > 0:
      print("Positif")
  elif x < 0:
      print("Négatif")
  else:
      print("Nul")
  ```

---

### 🟡 Exercice 8 : Détermination du Type d'un Caractère ASCII
* **Énoncé** : Saisir un caractère $c$ et déterminer s'il s'agit d'une lettre majuscule, d'une lettre minuscule, d'un chiffre ou d'un symbole spécial.
* **Algorithme & Code Python** :
```python
c = input("Saisir un seul caractère : ")
code = ord(c)

if 65 <= code <= 90:       # 'A'..'Z'
    print(f"'{c}' est une LETTRE MAJUSCULE.")
elif 97 <= code <= 122:    # 'a'..'z'
    print(f"'{c}' est une LETTRE MINUSCULE.")
elif 48 <= code <= 57:     # '0'..'9'
    print(f"'{c}' est un CHIFFRE.")
else:
    print(f"'{c}' est un SYMBOLE SPÉCIAL ou de PONCTUATION.")
```

---

### 🟢 Exercice 10 : Échelle du Potentiel Hydrogène (pH en Chimie)
* **Contexte scientifique** : Le pH mesure l'acidité d'une solution aqueuse ($0 \le \text{pH} \le 14$).
  * $\text{pH} < 7$ : Solution **Acide**.
  * $\text{pH} = 7$ : Solution **Neutre**.
  * $\text{pH} > 7$ : Solution **Basique**.
* **Contrôle d'intégrité** : Rejeter les valeurs hors de l'intervalle $[0..14]$.

```python
ph = float(input("Donner la valeur du pH de la solution : "))

if ph < 0 or ph > 14:
    print("Erreur : La valeur du pH doit être comprise entre 0 et 14.")
elif ph < 7:
    print(f"pH = {ph} : Solution ACIDE.")
elif ph == 7:
    print(f"pH = {ph} : Solution NEUTRE.")
else:
    print(f"pH = {ph} : Solution BASIQUE.")
```

---

## 📝 6. Trace Écrite pour le Cahier de l'Élève

```markdown
CHAPITRE 4 : LES STRUCTURES CONDITIONNELLES (Partie 2 : Forme Généralisée)

1. Syntaxe en Algorithme :
   Si condition_1 Alors
      Bloc_1
   Sinon Si condition_2 Alors
      Bloc_2
   Sinon
      Bloc_Par_Defaut
   FinSi

2. Traduction en Python :
   if condition_1:
       bloc_1
   elif condition_2:
       bloc_2
   else:
       bloc_defaut

3. Avantage pédagogique :
   L'évaluation s'arrête dès que la première condition Vraie est rencontrée.
```

---

## ❓ 7. Auto-Évaluation Formative (5 Questions)

1. **Combien de clauses `elif` peut-on écrire dans une même structure conditionnelle ?**  
   *Réponse* : Autant que nécessaire (aucune limite, selon le nombre de cas à traiter).
2. **La clause finale `else` est-elle obligatoire ?**  
   *Réponse* : Non, elle est facultative si aucun traitement par défaut n'est requis.
3. **Si $x = 10$, quel bloc est exécuté dans :**
   ```python
   if x > 5: print("A")
   elif x > 8: print("B")
   ```
   *Réponse* : Seul `"A"` est affiché, car la première condition est vraie ; le `elif` suivant est ignoré.
4. **Dans quel ordre range-t-on les conditions de seuil (ex: notes d'examen) ?**  
   *Réponse* : Toujours par ordre strictement croissant ou strictement décroissant pour éviter de masquer des branches.
5. **Quelle est la sortie pour un pH de 7.0 dans l'Exercice 10 ?**  
   *Réponse* : `Solution NEUTRE`.

---

## 🚀 8. Préparation de la Séance 11
* **Thème** : *Structure à choix multiples (`Selon ... Faire` / `match ... case`)*.
* **Réflexion** : Comment écrire une calculatrice simple qui applique une opération choisie par l'utilisateur parmi `+`, `-`, `*`, `/` ?
