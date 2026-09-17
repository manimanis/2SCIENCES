# 📝 Fiche Pédagogique – Séance 08
## Module 04 : Les structures conditionnelles
### Thème : Structure Conditionnelle Simple (`Si ... Alors`) et Alternative (`Si ... Alors ... Sinon`)

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
| **Prérequis** | Logique booléenne, opérateurs relationnels `==`, `!=`, `<`, `>` (Séance 06) |

---

## 🎯 2. Compétences & Objectifs Opérationnels

### Compétences visées :
* **Compétence algorithmique** : Rendre un algorithme adaptatif en exécutant des blocs d'instructions soumis à une condition de garde.
* **Compétence syntaxique** : Appliquer l'indentation obligatoire en Python pour délimiter les blocs de code conditionnels.

### Objectifs opérationnels (À l'issue de la séance, l'élève sera capable de) :
1. **Distinguer** la forme réduite (`Si ... Alors`) de la forme alternative (`Si ... Alors ... Sinon`).
2. **Construire** un tableau de trace d'exécution conditionnel (test de vérité $\rightarrow$ branche choisie).
3. **Programmer** le test de parité et de positivité (Exercice 5).
4. **Résoudre** le problème du nombre cubique d'Armstrong (Exercice 6).

---

## ⏱️ 3. Scénario Pédagogique & Déroulement Minuté (Séance de 60 min)

```
┌─────────────────────────────────────────────────────────────────────────────────────┐
│  00 - 10 min : Phase 1 - Accroche : Prendre une décision en algorithmique           │
│  10 - 25 min : Phase 2 - Cours : Structures Si...Alors et Si...Alors...Sinon        │
│  25 - 42 min : Phase 3 - Exercice 1 (QCM), Ex 4 (Trace) & Ex 5 (Signe/Parité)       │
│  42 - 55 min : Phase 4 - Atelier Playground : Ex 6 (Nombre cubique d'Armstrong)     │
│  55 - 60 min : Phase 5 - Synthèse, trace écrite & préparation Séance 09             │
└─────────────────────────────────────────────────────────────────────────────────────┘
```

---

## 📖 4. Contenu Didactique & Support de Cours

### 1. La Forme Réduite (Simple)
On l'utilise lorsqu'un traitement ne doit s'exécuter que si une condition donnée est **Vraie**. Si la condition est Fausse, on ne fait rien de particulier.

```algorithm
Si condition Alors
   // Bloc d'instructions exécuté uniquement si condition = Vrai
FinSi
```

*Syntaxe Python équivalente :*
```python
if condition:
    # Bloc indenté (4 espaces)
```

### 2. La Forme Alternative (Complète)
On l'utilise lorsqu'on doit choisir de façon mutuellement exclusive entre deux actions distinctes selon que la condition est Vraie ou Fausse.

```algorithm
Si condition Alors
   // Traitement A (si condition = Vrai)
Sinon
   // Traitement B (si condition = Faux)
FinSi
```

*Syntaxe Python équivalente :*
```python
if condition:
    # Traitement A
else:
    # Traitement B
```

> [!IMPORTANT]
> **Règle absolue d'indentation en Python :**  
> Les deux points `:` à la fin de la ligne de condition sont obligatoires. Toutes les lignes appartenant au bloc conditionnel doivent être décalées vers la droite (indentation standard de 4 espaces).

---

## 🧩 5. Fiche Activités & Corrigés Détaillés

### 🔴 Exercice 4 : Tableau de Trace Manuelle
Soit le code suivant :
```python
a = int(input("Donner a : "))
if a % 2 == 0:
    res = a * 2
else:
    res = a + 5
print("Résultat =", res)
```
* **Jeu d'essai 1 ($a = 6$)** : Condition `6 % 2 == 0` $\rightarrow$ `True`. Branche `if` exécutée $\implies res = 6 \times 2 = \mathbf{12}$.
* **Jeu d'essai 2 ($a = 7$)** : Condition `7 % 2 == 0` $\rightarrow$ `False`. Branche `else` exécutée $\implies res = 7 + 5 = \mathbf{12}$.

---

### 🟡 Exercice 5 : Signe et Parité d'un Entier
* **Énoncé** : Saisir un entier $n$. Déterminer s'il est pair ou impair, et s'il est strictement positif ou non.
* **Algorithme** :
```algorithm
Algorithme Signe_Parite
Début
   Ecrire("Donner un entier n : ")
   Lire(n)

   // Test de parité
   Si (n mod 2 = 0) Alors
      Ecrire(n, " est PAIR")
   Sinon
      Ecrire(n, " est IMPAIR")
   FinSi

   // Test de signe
   Si (n > 0) Alors
      Ecrire(n, " est STRICTEMENT POSITIF")
   Sinon
      Ecrire(n, " est NÉGATIF OU NUL")
   FinSi
Fin
```

---

### 🟢 Exercice 6 : Nombre Cubique d'Armstrong (3 Chiffres)
* **Définition** : Un entier $N \in [100..999]$ est dit *nombre cubique d'Armstrong* si la somme des cubes de ses chiffres est égale au nombre lui-même :
  $$N = c_1^3 + c_2^3 + c_3^3 \quad (\text{Exemple : } 153 = 1^3 + 5^3 + 3^3 = 1 + 125 + 27 = 153)$$
* **Algorithme d'extraction arithmétique** :
  * Centaines : $c_1 \leftarrow N \mathbin{\text{div}} 100$
  * Dizaines : $c_2 \leftarrow (N \mathbin{\text{mod}} 100) \mathbin{\text{div}} 10$
  * Unités : $c_3 \leftarrow N \mathbin{\text{mod}} 10$
  * Somme des cubes : $S \leftarrow c_1^3 + c_2^3 + c_3^3$
* **Traduction Python** :
```python
N = int(input("Donner un nombre de 3 chiffres : "))

c1 = N // 100
c2 = (N % 100) // 10
c3 = N % 10

somme_cubes = (c1 ** 3) + (c2 ** 3) + (c3 ** 3)

if somme_cubes == N:
    print(f"{N} est un NOMBRE CUBIQUE D'ARMSTRONG ! 🎉")
else:
    print(f"{N} n'est pas cubique (somme des cubes = {somme_cubes}).")
```

---

## 📝 6. Trace Écrite pour le Cahier de l'Élève

```markdown
CHAPITRE 4 : LES STRUCTURES CONDITIONNELLES (Partie 1)

1. Forme Réduite :
   Si condition Alors
      Traitements
   FinSi
   -> En Python : if condition:

2. Forme Alternative :
   Si condition Alors
      Traitements_A
   Sinon
      Traitements_B
   FinSi
   -> En Python : if condition: ... else: ...

3. Indentation :
   Décalage de 4 espaces obligatoire sous le 'if' et sous le 'else'.
```

---

## ❓ 7. Auto-Évaluation Formative (5 Questions)

1. **Peut-il y avoir une condition après le mot `else` ?**  
   *Réponse* : Non, jamais de condition après un `else` (qui traite tous les cas où la condition du `if` est fausse).
2. **Que se passe-t-il si on oublie les deux-points `:` après la condition `if x > 0` ?**  
   *Réponse* : Une erreur de syntaxe (`SyntaxError: expected ':'`).
3. **Les deux blocs sous `if` et `else` peuvent-ils s'exécuter en même temps lors d'un test ?**  
   *Réponse* : Non, ils sont mutuellement exclusifs (l'un OU l'autre, jamais les deux).
4. **Vérifier si 370 est un nombre d'Armstrong.**  
   *Réponse* : $3^3 + 7^3 + 0^3 = 27 + 343 + 0 = 370$. Oui, 370 est un nombre d'Armstrong !
5. **Quelle instruction conditionnelle permet de s'assurer qu'un dénominateur `d` n'est pas nul avant une division ?**  
   *Réponse* : `if d != 0: q = n / d`.

---

## 🚀 8. Préparation de la Séance 10
* **Thème** : *La structure conditionnelle généralisée (`if ... elif ... else`) et réécriture de conditions*.
* **Problème d'amorce** : Comment classifier une solution chimique à partir de son pH (acide, neutre, basique) ?
