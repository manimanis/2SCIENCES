# 📝 Fiche Pédagogique – Séance 14
## Module 05 : Structure itérative complète
### Thème : Découverte de la Boucle `Pour` & Fonction `range(début, fin, pas)`

---

## 📌 1. Fiche Signalétique de la Séance

| Champ | Description |
| :--- | :--- |
| **Matière** | Informatique |
| **Niveau & Section** | 2ème Année Secondaire – Section Sciences |
| **Durée prévisionnelle** | 1 séance (1 heure) |
| **Cadre de référence** | Programme officiel du Ministère de l'Éducation (Tunisie) |
| **Enseignant** | Mohamed Anis MANI |
| **Supports & Outils** | Ordinateurs, page web `module05.html` (visualiseur range), Playground Python, tableau |
| **Prérequis** | Structures conditionnelles, variables entières |

---

## 🎯 2. Compétences & Objectifs Opérationnels

### Compétences visées :
* **Compétence algorithmique** : Répéter un traitement un nombre déterminé de fois sans dupliquer le code source.
* **Compétence technique Python** : Maîtriser le fonctionnement de l'itérateur `range()` et la borne supérieure exclue.

### Objectifs opérationnels (À l'issue de la séance, l'élève sera capable de) :
1. **Identifier** les situations nécessitant une boucle à compteur déterminé (`Pour`).
2. **Calculer** le nombre d'itérations $N = \lfloor \frac{vf - vi}{pas} \rfloor + 1$.
3. **Exploiter** les trois formes d'appel de `range()` en Python : `range(n)`, `range(d, f)`, `range(d, f, pas)`.
4. **Construire** un tableau d'itération et programmer des affichages conditionnels séquentiels (Exercice 2).

---

## ⏱️ 3. Scénario Pédagogique & Déroulement Minuté (Séance de 60 min)

```
┌─────────────────────────────────────────────────────────────────────────────────────┐
│  00 - 10 min : Phase 1 - Accroche : Répéter 100 fois une action sans copier ?       │
│  10 - 25 min : Phase 2 - Cours : Boucle Pour, variable de contrôle & range()        │
│  25 - 42 min : Phase 3 - Simulateur interactif : Exercice 1 (Visualiseur range)     │
│  42 - 55 min : Phase 4 - Atelier pratique : Exercice 2 (Bonjour séquentiel)         │
│  55 - 60 min : Phase 5 - Synthèse, trace écrite & préparation Séance 15             │
└─────────────────────────────────────────────────────────────────────────────────────┘
```

---

## 📖 4. Contenu Didactique & Support de Cours

### 1. La Boucle `Pour` (Répétition Déterminée)
On utilise la boucle `Pour` lorsque le **nombre d'exécutions est connu à l'avance** avant même d'entrer dans la boucle.

```algorithm
Pour compteur De vi À vf [Pas p] Faire
   // Instructions répétées
FinPour
```

* **`compteur`** : Variable scalaire (généralement un entier `i`, `j`, `k`).
* **`vi`** : Valeur initiale.
* **`vf`** : Valeur finale.
* **`p`** : Pas d'incrémentation (par défaut $+1$ si omis).

> [!CAUTION]
> **Règle absolue :** Il est formellement interdit de modifier la valeur de la variable de contrôle `compteur` à l'intérieur du corps de la boucle `Pour` !

### 2. La Fonction `range()` en Python
En Python, la boucle `Pour` s'écrit avec `for ... in range(...)`.

| Appel Python | Valeurs générées pour $i$ | Nombre d'itérations |
| :--- | :--- | :---: |
| `range(5)` | `0, 1, 2, 3, 4` | $5$ (de $0$ à $n-1$) |
| `range(1, 6)` | `1, 2, 3, 4, 5` | $5$ (de $d$ à $f-1$) |
| `range(2, 11, 2)` | `2, 4, 6, 8, 10` | $5$ (nombres pairs) |
| `range(10, 0, -1)`| `10, 9, 8, 7, 6, 5, 4, 3, 2, 1` | $10$ (compte à rebours) |

> [!IMPORTANT]
> **Piège classique :** En Python, la borne de fin est **TOUJOURS EXCLUE**. Pour aller de 1 à $N$ inclus, il faut obligatoirement écrire `range(1, N + 1)`.

---

## 🧩 5. Fiche Activités & Corrigés Détaillés

### 🔴 Exercice 1 : Le Visualiseur Interactif `range()`
* **Expérimentation sur la plateforme** :
  * Cas A : `range(3, 8)` $\rightarrow$ valeurs : `3, 4, 5, 6, 7` ($5$ itérations).
  * Cas B : `range(0, 20, 5)` $\rightarrow$ valeurs : `0, 5, 10, 15` ($4$ itérations).
  * Cas C : `range(5, 1)` $\rightarrow$ aucune itération (car début > fin avec un pas positif !).

---

### 🟡 Exercice 2 : Affichage Conditionnel dans une Boucle
* **Énoncé** : Parcourir les entiers de 1 à $N$. Pour chaque nombre $i$ :
  * Si $i$ est divisible par 3, afficher `"Bonjour 3"`.
  * Si $i$ est divisible par 5, afficher `"Bonjour 5"`.
  * Sinon, afficher simplement la valeur de $i$.
* **Algorithme** :
```algorithm
Algorithme Bonjour_Multiples
Début
   Ecrire("Donner N : ")
   Lire(N)

   Pour i De 1 À N Faire
      Si (i mod 3 = 0 ET i mod 5 = 0) Alors
         Ecrire(i, " : Bonjour 3 et 5 !")
      Sinon Si (i mod 3 = 0) Alors
         Ecrire(i, " : Bonjour 3 !")
      Sinon Si (i mod 5 = 0) Alors
         Ecrire(i, " : Bonjour 5 !")
      Sinon
         Ecrire(i)
      FinSi
   FinPour
Fin
```

* **Code Python équivalent** :
```python
N = int(input("Donner N : "))

for i in range(1, N + 1):
    if i % 3 == 0 and i % 5 == 0:
        print(f"{i} : Bonjour 3 et 5 !")
    elif i % 3 == 0:
        print(f"{i} : Bonjour 3 !")
    elif i % 5 == 0:
        print(f"{i} : Bonjour 5 !")
    else:
        print(i)
```

---

## 📝 6. Trace Écrite pour le Cahier de l'Élève

```markdown
CHAPITRE 5 : LA STRUCTURE ITÉRATIVE (Partie 1 : Boucle Pour)

1. En Algorithme :
   Pour i De vi À vf [Pas p] Faire
      instructions
   FinPour

2. En Python :
   for i in range(début, fin_exclue, pas):
       instructions

3. Les 3 formes de range() :
   - range(N)        ➔ 0, 1, 2, ... N - 1
   - range(D, F)     ➔ D, D + 1, ... F - 1
   - range(D, F, P)  ➔ D, D + P, D + 2P ...
   Attention : La borne de fin est TOUJOURS exclue en Python !
```

---

## ❓ 7. Auto-Évaluation Formative (5 Questions)

1. **Combien de fois tourne la boucle `for i in range(1, 10):` ?**  
   *Réponse* : $9$ fois (valeurs de 1 à 9).
2. **Quelle instruction génère les nombres impairs de 1 à 15 inclus ?**  
   *Réponse* : `range(1, 16, 2)` (ou `range(1, 17, 2)`).
3. **Que fait `for i in range(5, 0, -1):` ?**  
   *Réponse* : Décompte de 5 à 1 : affiche `5, 4, 3, 2, 1`.
4. **Peut-on modifier la valeur de `i` dans le corps de la boucle en algorithme ?**  
   *Réponse* : Non, la variable de contrôle est gérée exclusivement par la boucle.
5. **Quelle est la dernière valeur de `i` affichée par `for i in range(0, 100, 10):` ?**  
   *Réponse* : `90` (car 100 est exclu).

---

## 🚀 8. Préparation de la Séance 16
* **Thème** : *Schémas de comptage, d'accumulation et diviseurs d'un entier*.
* **À réfléchir** : Comment calculer la somme $1 + 2 + 3 + \dots + 100$ avec une boucle ?
