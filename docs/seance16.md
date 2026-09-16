# 📝 Fiche Pédagogique – Séance 16
## Module 05 : Structure itérative complète
### Thème : Schémas d'Accumulation, de Comptage & Classification des Nombres (Parfaits, Abondants, Déficients)

---

## 📌 1. Fiche Signalétique de la Séance

| Champ | Description |
| :--- | :--- |
| **Matière** | Informatique |
| **Niveau & Section** | 2ème Année Secondaire – Section Sciences |
| **Durée prévisionnelle** | 1 séance (1h à 1h30) |
| **Cadre de référence** | Programme officiel du Ministère de l'Éducation (Tunisie) |
| **Enseignant** | Mohamed Anis MANI |
| **Supports & Outils** | Ordinateurs, page web `module05.html`, Playground Python (`playground.html`), tableau |
| **Prérequis** | Boucle `Pour`, fonction `range()`, modulo `%` (Séance 15) |

---

## 🎯 2. Compétences & Objectifs Opérationnels

### Compétences visées :
* **Compétence algorithmique** : Maîtriser les deux schémas itératifs fondamentaux : le **compteur** ($C \leftarrow C + 1$) et l'**accumulateur** ($S \leftarrow S + \text{terme}$).
* **Compétence arithmétique** : Extraire et additionner les diviseurs stricts d'un entier naturel.

### Objectifs opérationnels (À l'issue de la séance, l'élève sera capable de) :
1. **Initialiser obligatoirement** les variables de cumul avant d'entrer dans la boucle.
2. **Construire** un tableau de trace d'exécution pas-à-pas consignant les états successifs de la mémoire.
3. **Calculer la somme** des nombres impairs d'un intervalle donné (Exercice 3).
4. **Classifier** un nombre comme Parfait, Abondant ou Déficient selon la somme de ses diviseurs stricts (Exercice 7).

---

## ⏱️ 3. Scénario Pédagogique & Déroulement Minuté

```
┌──────────────────────────────────────────────────────────────────────────────┐
│  00 - 15 min : Phase 1 - Accroche : Comment la machine calcule-t-elle Σ ?    │
│  15 - 35 min : Phase 2 - Cours : Schémas Compteur / Accumulateur & Tracé     │
│  35 - 55 min : Phase 3 - Exercice 3 (Somme impairs avec tableau de trace)    │
│  55 - 75 min : Phase 4 - Exercice 7 : Nombres Parfaits & Diviseurs stricts   │
│  75 - 80 min : Phase 5 - Synthèse, trace écrite & préparation Séance 17      │
└──────────────────────────────────────────────────────────────────────────────┘
```

---

## 📖 4. Contenu Didactique & Support de Cours

### 1. Le Schéma du Compteur
Sert à dénombrer des événements ou des éléments satisfaisant un critère :
```algorithm
compteur ← 0                // 1. Initialisation à zéro AVANT la boucle
Pour i De 1 À N Faire
   Si condition Alors
      compteur ← compteur + 1   // 2. Incrémentation
   FinSi
FinPour
```

### 2. Le Schéma de l'Accumulateur (Somme Cumulée)
Sert à additionner une série de valeurs au fur et à mesure :
```algorithm
somme ← 0                   // 1. Élément neutre de l'addition AVANT la boucle
Pour i De 1 À N Faire
   somme ← somme + terme    // 2. Accumulation progressive
FinPour
```

> [!CAUTION]
> Si l'on oublie d'initialiser `somme = 0` avant la boucle, Python lève une erreur `NameError: name 'somme' is not defined`. Si on l'initialise *à l'intérieur* de la boucle, la somme est réinitialisée à chaque tour et seul le dernier terme est conservé !

---

## 🧩 5. Fiche Activités & Corrigés Détaillés

### 🔴 Exercice 3 : Somme des Nombres Impairs dans $[A..B]$
* **Algorithme** :
```algorithm
Algorithme Somme_Impairs
Début
   Ecrire("Borne début A : ") ; Lire(A)
   Ecrire("Borne fin B : ")   ; Lire(B)

   somme ← 0
   Pour i De A À B Faire
      Si (i mod 2 ≠ 0) Alors
         somme ← somme + i
      FinSi
   FinPour

   Ecrire("La somme des impairs vaut : ", somme)
Fin
```

* **Tableau de Trace pour $A = 3$ et $B = 7$** :
| Tour de boucle | Valeur de `i` | Test `i % 2 != 0` | Calcul `somme` | Valeur finale de `somme` |
| :---: | :---: | :---: | :---: | :---: |
| *Avant boucle* | – | – | Initialisation | **0** |
| Itération 1 | `3` | Vrai | $0 + 3$ | **3** |
| Itération 2 | `4` | Faux | Inchangé | **3** |
| Itération 3 | `5` | Vrai | $3 + 5$ | **8** |
| Itération 4 | `6` | Faux | Inchangé | **8** |
| Itération 5 | `7` | Vrai | $8 + 7$ | **15** |

---

### 🟡 Exercice 7 : Nombres Parfaits, Abondants ou Déficients
* **Définitions mathématiques** : Soit $SD$ la somme des diviseurs stricts d'un entier $N$ (diviseurs de 1 à $N-1$ inclus).
  * Si $SD = N$ : $N$ est un **Nombre Parfait** (ex: $6 = 1 + 2 + 3$).
  * Si $SD > N$ : $N$ est un **Nombre Abondant** (ex: $12 \implies SD = 1+2+3+4+6 = 16 > 12$).
  * Si $SD < N$ : $N$ est un **Nombre Déficient** (ex: $8 \implies SD = 1+2+4 = 7 < 8$).

* **Script Python** :
```python
N = int(input("Donner un entier positif N : "))

if N <= 0:
    print("Veuillez saisir un entier strictement positif.")
else:
    SD = 0  # Somme des diviseurs stricts

    # Parcours des diviseurs stricts possibles de 1 à N - 1
    for i in range(1, N):
        if N % i == 0:
            SD += i  # i est un diviseur strict de N

    print(f"Somme des diviseurs stricts de {N} : SD = {SD}")

    if SD == N:
        print(f"✨ {N} est un NOMBRE PARFAIT !")
    elif SD > N:
        print(f"📈 {N} est un NOMBRE ABONDANT (SD > N).")
    else:
        print(f"📉 {N} est un NOMBRE DÉFICIENT (SD < N).")
```

---

## 📝 6. Trace Écrite pour le Cahier de l'Élève

```markdown
CHAPITRE 5 : LA STRUCTURE ITÉRATIVE (Partie 2 : Accumulateurs)

1. Schéma de l'Accumulateur :
   S = 0            # Toujours initialiser AVANT la boucle !
   for i in range(...):
       S = S + valeur

2. Schéma du Compteur :
   C = 0            # Initialiser à zéro AVANT la boucle !
   for i in range(...):
       if condition:
           C = C + 1

3. Diviseurs stricts d'un nombre N :
   Boucle de 1 à N - 1 avec le test (N % i == 0).
   - Nombres parfaits : Somme des diviseurs = N (ex: 6, 28, 496).
```

---

## ❓ 7. Auto-Évaluation Formative (5 Questions)

1. **Vérifier si 28 est un nombre parfait.**  
   *Réponse* : Diviseurs stricts de 28 : $1, 2, 4, 7, 14$. Somme : $1 + 2 + 4 + 7 + 14 = \mathbf{28}$. Oui, 28 est parfait !
2. **Quel est le produit neutre pour un accumulateur de produit (ex: factorielle $P$) ?**  
   *Réponse* : Initialiser à $P \leftarrow 1$ (car $0 \times \dots = 0$).
3. **Dans quel intervalle cherche-t-on les diviseurs stricts d'un nombre $N$ ?**  
   *Réponse* : De $1$ à $N-1$ (soit `range(1, N)` en Python).
4. **Que se passe-t-il si on place l'instruction `somme = 0` à l'intérieur de la boucle ?**  
   *Réponse* : La somme est remise à zéro à chaque itération, faussant complètement le cumul global.
5. **Combien d'itérations sont effectuées pour tester les diviseurs de $N = 100$ ?**  
   *Réponse* : $99$ itérations (de 1 à 99).

---

## 🚀 8. Préparation de la Séance 17
* **Thème** : *Parcours séquentiel de chaînes de caractères (sans listes Python)*.
* **Défi d'amorce** : Comment compter le nombre de voyelles dans une phrase ?
