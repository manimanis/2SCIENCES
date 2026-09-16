# 📝 Fiche Pédagogique – Séance 18
## Module 05 : Structure itérative complète
### Thème : Arithmétique Itérative, Séries Numériques Alternées & Nombres Poly-Divisibles

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
| **Prérequis** | Accumulateurs numériques, puissance `**`, boucle `Pour` |

---

## 🎯 2. Compétences & Objectifs Opérationnels

### Compétences visées :
* **Compétence mathématique & algorithmique** : Traduire des notations mathématiques rigoureuses (symbole de sommation $\sum$, signes alternés $(-1)^{k+1}$, puissances $k^k$) en instructions algorithmiques itératives.
* **Compétence de validation globale** : Utiliser un indicateur booléen (*drapeau / flag*) pour vérifier une propriété partagée par toute une suite de diviseurs.

### Objectifs opérationnels (À l'issue de la séance, l'élève sera capable de) :
1. **Gérer les alternances de signe** dans une somme mathématique.
2. **Calculer la somme d'une série** $S_n = \sum_{k=1}^n (-1)^{k+1} k^k$ (Exercice 9).
3. **Mettre en œuvre un booléen témoin** pour vérifier la divisibilité séquentielle d'un nombre (Exercice 8).

---

## ⏱️ 3. Scénario Pédagogique & Déroulement Minuté

```
┌──────────────────────────────────────────────────────────────────────────────┐
│  00 - 15 min : Phase 1 - Accroche : Comment programmer la notation Sigma Σ ?  │
│  15 - 35 min : Phase 2 - Cours : Gestion des signes alternés (-1)^k          │
│  35 - 55 min : Phase 3 - Exercice 9 : Calcul de la série alternée Sn          │
│  55 - 75 min : Phase 4 - Exercice 8 : Nombre poly-divisible & Ticket de caisse│
│  75 - 80 min : Phase 5 - Synthèse, trace écrite & préparation Séance 19      │
└──────────────────────────────────────────────────────────────────────────────┘
```

---

## 📖 4. Contenu Didactique & Support de Cours

### 1. Traduction de la Sommation Mathématique $\sum$
Toute expression de la forme :
$$S_n = \sum_{k=1}^n \text{terme}(k)$$
se traduit en algorithme par :
1. L'initialisation : `S ← 0`
2. Une boucle : `Pour k De 1 À n Faire`
3. L'accumulation : `S ← S + terme(k)`

### 2. Gestion des Signes Alternés
Pour une suite alternant $+$, $-$, $+$, $-$ :
* **Méthode analytique** : Multiplier par $(-1)^{k+1}$ ou $(-1)^k$.
* **Méthode conditionnelle de parité** :
  * Si $k$ est impair $\implies$ signe $+$.
  * Si $k$ est pair $\implies$ signe $-$.

### 3. Le Principe du Témoin Booléen (*Flag*)
Pour vérifier qu'un nombre $N$ est divisible par TOUS les entiers de 2 à 10 :
* On pose initialement que c'est vrai : `poly = True`.
* On teste chaque diviseur $k \in [2..10]$. Dès que l'un d'eux ne divise pas $N$ ($N \mathbin{\text{mod}} k \ne 0$), on bascule le drapeau à faux : `poly = False`.

---

## 🧩 5. Fiche Activités & Corrigés Détaillés

### 🔴 Exercice 9 : Somme de la Série Numérique $S_n$
* **Formule** :
  $$S_n = \sum_{k=1}^n (-1)^{k+1} \cdot k^k = 1^1 - 2^2 + 3^3 - 4^4 + 5^5 - \dots + (-1)^{n+1} n^n$$
* **Algorithme** :
```algorithm
Algorithme Serie_Sn
Début
   Ecrire("Donner un entier n >= 1 : ")
   Lire(n)

   S ← 0
   signe ← 1
   Pour k De 1 À n Faire
      terme ← signe * (k ** k)
      S ← S + terme
      signe ← -signe   // Alterne entre +1 et -1 à chaque tour
   FinPour

   Ecrire("La somme de la série S_", n, " vaut : ", S)
Fin
```

* **Code Python équivalent** :
```python
n = int(input("Donner n (n >= 1) : "))

S = 0
signe = 1

for k in range(1, n + 1):
    terme = signe * (k ** k)
    S += terme
    signe = -signe  # Inversion de signe pour le tour suivant

print(f"Somme de la série S_{n} = {S}")
```

* **Vérification pour $n = 3$** :
  $$S_3 = 1^1 - 2^2 + 3^3 = 1 - 4 + 27 = \mathbf{24}$$

---

### 🟡 Exercice 8 : Nombre Poly-Divisible (Ticket de Caisse)
* **Énoncé** : Un code promotionnel $N$ figurant sur un ticket de caisse est dit *poly-divisible* s'il est divisible par **tous les entiers de 2 à 10**.
* **Code Python** :
```python
N = int(input("Entrez le numéro du ticket de caisse : "))

poly = True  # Hypothèse initiale : le nombre est poly-divisible

for k in range(2, 11):  # De 2 à 10 inclus
    if N % k != 0:
        poly = False    # Un diviseur a échoué

if poly:
    print(f"🎉 Le nombre {N} est POLY-DIVISIBLE (divisible par 2, 3, 4, 5, 6, 7, 8, 9 et 10) !")
else:
    print(f"❌ Le nombre {N} n'est pas poly-divisible.")
```
* **Remarque arithmétique** : Le plus petit entier poly-divisible non nul est le PPCM de $\{2, 3, 4, 5, 6, 7, 8, 9, 10\} = \mathbf{2520}$.

---

## 📝 6. Trace Écrite pour le Cahier de l'Élève

```markdown
CHAPITRE 5 : LA STRUCTURE ITÉRATIVE (Partie 4 : Séries & Validation)

1. Calcul de Série Mathématique (Sigma) :
   S = 0
   for k in range(1, n + 1):
       terme = ...
       S = S + terme

2. Gestion de l'Alternance de Signe :
   signe = 1
   for k in range(1, n + 1):
       S = S + signe * (...)
       signe = -signe       # Bascule 1 ➔ -1 ➔ 1 ➔ -1

3. Le Témoin Booléen (Flag) :
   valide = True
   for k in range(...):
       if echec: valide = False
```

---

## ❓ 7. Auto-Évaluation Formative (5 Questions)

1. **Combien vaut $S_2 = \sum_{k=1}^2 (-1)^{k+1} k^k$ ?**  
   *Réponse* : $1^1 - 2^2 = 1 - 4 = \mathbf{-3}$.
2. **Pourquoi l'instruction `signe = -signe` alterne-t-elle le signe ?**  
   *Réponse* : Si `signe = 1`, $-1 \times 1 = -1$. Au tour suivant, $-1 \times (-1) = 1$.
3. **Le nombre 5040 est-il poly-divisible par les entiers de 2 à 10 ?**  
   *Réponse* : Oui, car $5040 = 2520 \times 2$ (multiple de 2520).
4. **Quelle est la puissance calculée pour $k = 4$ dans l'Exercice 9 ?**  
   *Réponse* : $4^4 = 256$.
5. **Pourquoi la borne de boucle est-elle `range(2, 11)` dans l'Exercice 8 ?**  
   *Réponse* : Pour inclure le diviseur 10, la borne supérieure en Python doit être $10 + 1 = 11$.

---

## 🚀 8. Préparation de la Séance 19
* **Thème** : *Algorithmes de contrôle d'intégrité et analyse de monotonie*.
* **Défi d'amorce** : Comment une carte de fidélité ou un code-barres détecte-t-il une faute de frappe ?
