# 📝 Fiche Pédagogique – Séance 18
## Module 05 : Structure itérative complète
### Thème : Algorithmes de Contrôle d'Intégrité ("Check_card") & Sommes Pondérées via la boucle `Pour`

---

## 📌 1. Fiche Signalétique de la Séance

| Champ | Description |
| :--- | :--- |
| **Matière** | Informatique |
| **Niveau & Section** | 2ème Année Secondaire – Section Sciences |
| **Durée prévisionnelle** | 1 séance (1 heure) |
| **Cadre de référence** | Programme officiel du Ministère de l'Éducation (Tunisie) |
| **Enseignant** | Mohamed Anis MANI |
| **Supports & Outils** | Ordinateurs, page web `module05.html`, Playground Python (`playground.html`), tableau |
| **Prérequis** | Parcours de chaînes caractère par caractère, accumulateurs, boucle `Pour` |

---

## 🎯 2. Compétences & Objectifs Opérationnels

### Compétences visées :
* **Compétence de sécurité informatique & intégrité des données** : Comprendre le principe d'une clé de contrôle (checksum) utilisée dans les cartes bancaires, cartes de fidélité et codes-barres.
* **Compétence algorithmique** : Manipuler des sommes pondérées et des indicateurs booléens (*drapeaux / flags*) à l'intérieur d'une boucle `Pour`.

### Objectifs opérationnels (À l'issue de la séance, l'élève sera capable de) :
1. **Comprendre** le rôle d'une clé de contrôle (*checksum*) pour fiabiliser la saisie utilisateur.
2. **Implémenter** un algorithme d'accumulation pondérée alternée selon la parité de l'indice de boucle (`i % 2 == 0`).
3. **Exploiter** la boucle `Pour` pour parcourir les chiffres d'un code sans recourir aux listes.
4. **Valider** la conformité d'une carte via le test de divisibilité modulo 10 ($S \mathbin{\text{mod}} 10 = 0$).

---

## ⏱️ 3. Scénario Pédagogique & Déroulement Minuté (Séance de 60 min)

```
┌─────────────────────────────────────────────────────────────────────────────────────┐
│  00 - 10 min : Phase 1 - Accroche : Comment la machine détecte un faux numéro ?     │
│  10 - 25 min : Phase 2 - Cours : Clé de contrôle & Accumulation pondérée            │
│  25 - 42 min : Phase 3 - Exercice 10 : Algorithme complet "Check_card"              │
│  42 - 55 min : Phase 4 - Atelier Playground : Tests avec différents numéros         │
│  55 - 60 min : Phase 5 - Synthèse, trace écrite & préparation Séance 19             │
└─────────────────────────────────────────────────────────────────────────────────────┘
```

---

## 📖 4. Contenu Didactique & Support de Cours

### 1. Le Principe de la Clé de Contrôle (*Checksum*)
Pour s'assurer qu'un numéro de carte ou de compte saisi par l'utilisateur ne comporte aucune erreur de frappe :
* On applique un calcul pondéré sur les chiffres du numéro.
* Le résultat modulo un entier (généralement 10 ou 11) doit satisfaire une règle stricte (ex: multiple de 10).

### 2. Le Schéma d'Accumulation Pondérée
Dans une boucle `Pour i De 0 À N - 1 Faire` :
* Si $i$ est pair : $\text{somme} \leftarrow \text{somme} + \text{valeur} \times c_1$
* Sinon ($i$ est impair) : $\text{somme} \leftarrow \text{somme} + \text{valeur} \times c_2$

---

## 🧩 5. Fiche Activités & Corrigés Détaillés

### 🔴 Exercice 10 : Carte de Fidélité ("Check_card")
* **Énoncé** : Une carte de fidélité comporte 8 chiffres (ex: `"45127834"`). Pour être valide :
  * On calcule la somme pondérée $S$ :
    * Les chiffres d'indice pair ($0, 2, 4, 6$) sont multipliés par 1.
    * Les chiffres d'indice impair ($1, 3, 5, 7$) sont multipliés par 2.
  * La carte est **valide** si la somme totale $S$ est un **multiple de 10** ($S \mathbin{\text{mod}} 10 = 0$).

* **Analyse** :
  * Résultat = Afficher "Carte Valide" ou "Carte Invalide".
  * Données = Saisir `carte` (chaîne de 8 caractères).
  * Traitement =
    * Si `long(carte) ≠ 8` $\implies$ Erreur de longueur.
    * Sinon, pour $i$ de 0 à 7 :
      * `chiffre ← Valeur(carte[i])`
      * Si $i \mathbin{\text{mod}} 2 = 0$ Alors `somme ← somme + chiffre * 1`
      * Sinon `somme ← somme + chiffre * 2`
    * Si `somme mod 10 = 0` $\implies$ Valide, sinon Invalide.

* **Code Python sans aucune liste** :
```python
carte = input("Entrez le numéro de la carte (8 chiffres) : ")

if len(carte) != 8:
    print("Erreur : Le numéro de carte doit comporter exactement 8 chiffres.")
else:
    somme = 0
    for i in range(8):
        chiffre = int(carte[i])
        if i % 2 == 0:
            somme += chiffre * 1
        else:
            somme += chiffre * 2

    print(f"Somme pondérée calculée : S = {somme}")

    if somme % 10 == 0:
        print("✅ CARTE DE FIDÉLITÉ VALIDE ! Félicitations.")
    else:
        print("❌ CARTE INVALIDE (Somme non divisible par 10).")
```

---

## 📝 6. Trace Écrite pour le Cahier de l'Élève

```markdown
CHAPITRE 5 : LA STRUCTURE ITÉRATIVE (Partie 5 : Contrôle d'Intégrité)

1. Contrôle d'intégrité (Check_card) :
   Parcours des chiffres avec pondération selon la parité de l'indice :
   - Indice pair (i % 2 == 0)   ➔ somme += chiffre * 1
   - Indice impair (i % 2 != 0) ➔ somme += chiffre * 2
   - Test de validité final : (somme % 10 == 0)

2. Intérêt :
   Détecter automatiquement les erreurs de saisie de l'utilisateur sans 
   connexion réseau.
```

---

## ❓ 7. Auto-Évaluation Formative (5 Questions)

1. **Pourquoi utilise-t-on `int(carte[i])` au lieu de `carte[i]` directement ?**  
   *Réponse* : Car `carte[i]` est un caractère textuel ; il faut le convertir en entier pour effectuer une multiplication arithmétique.
2. **Quelle est la somme pondérée pour `"12345678"` ?**  
   *Réponse* : $(1\times1 + 2\times2) + (3\times1 + 4\times2) + (5\times1 + 6\times2) + (7\times1 + 8\times2) = 5 + 11 + 17 + 23 = \mathbf{56}$. Invalide car $56 \% 10 = 6 \ne 0$.
3. **Trouver un dernier chiffre pour que `"1234567x"` soit valide.**  
   *Réponse* : Somme des 7 premiers : $1+4+3+8+5+12+7 = 40$. Il faut que $40 + 2x$ soit multiple de 10 $\implies x = 0$ ou $x = 5$.
4. **Peut-on modifier la variable `i` dans la boucle `for i in range(8)` ?**  
   *Réponse* : Non, en Python la variable de contrôle est gérée automatiquement par `range()`.
5. **Combien d'itérations effectue la boucle `for i in range(8)` ?**  
   *Réponse* : Exactement 8 itérations (pour $i = 0, 1, 2, 3, 4, 5, 6, 7$).

---

## 🚀 8. Préparation de la Séance Suivante (Séance 19)
* **Thème** : *Module 05 – Analyse de Monotonie et Comparaisons Itératives Avancées*.
* **À réviser** : L'accès aux caractères voisins `ch[i]` et `ch[i+1]`.
