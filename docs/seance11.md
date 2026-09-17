# 📝 Fiche Pédagogique – Séance 11
## Module 04 : Les structures conditionnelles
### Thème : Prédicats Logiques Composés, Algorithme de l'Année Bissextile & Règles de Gestion Sportive

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
| **Prérequis** | Opérateurs `and`, `or`, modulo `%`, formes conditionnelles |

---

## 🎯 2. Compétences & Objectifs Opérationnels

### Compétences visées :
* **Compétence logique & modélisation** : Traduire des règles historiques et de gestion réelles en expressions logiques condensées et fiables.
* **Compétence de rigueur** : Éviter les erreurs de parenthésage dans les prédicats combinant `and` et `or`.

### Objectifs opérationnels (À l'issue de la séance, l'élève sera capable de) :
1. **Évaluer sans erreur** un prédicat logique composé à plusieurs clauses.
2. **Formuler** la condition exacte de l'année bissextile selon la réforme grégorienne (Exercice 12).
3. **Programmer** la comptabilisation des points et de l'issue d'un match sportif (Exercice 14).
4. **Simplifier** des expressions booléennes redondantes.

---

## ⏱️ 3. Scénario Pédagogique & Déroulement Minuté (Séance de 60 min)

```
┌─────────────────────────────────────────────────────────────────────────────────────┐
│  00 - 10 min : Phase 1 - Accroche : Les règles de gestion multi-critères            │
│  10 - 25 min : Phase 2 - Cours : Priorités logiques, parenthèses & court-circuit    │
│  25 - 42 min : Phase 3 - Exercice 11 (Évaluation) & Ex 12 (Année bissextile)        │
│  42 - 55 min : Phase 4 - Atelier Playground : Exercice 14 (Scores d'un match)       │
│  55 - 60 min : Phase 5 - Synthèse, trace écrite & préparation Séance 12             │
└─────────────────────────────────────────────────────────────────────────────────────┘
```

---

## 📖 4. Contenu Didactique & Support de Cours

### 1. La Règle Grégorienne de l'Année Bissextile
Une année compte environ 365.2422 jours. Pour ajuster le calendrier civil au calendrier astronomique :
1. Une année est bissextile si elle est **divisible par 4** ($an \mathbin{\text{mod}} 4 = 0$).
2. **Exception séculaire** : Si elle est divisible par 100, elle n'est **PAS bissextile**...
3. **Exception à l'exception** : ... Sauf si elle est divisible par 400 ($an \mathbin{\text{mod}} 400 = 0$) !

*Formule booléenne universelle condensée :*
$$\mathbf{Bissextile} \iff (an \mathbin{\text{mod}} 4 = 0 \quad \mathbf{ET} \quad an \mathbin{\text{mod}} 100 \ne 0) \quad \mathbf{OU} \quad (an \mathbin{\text{mod}} 400 = 0)$$

*Exemples historiques :*
* $2024$ : Divisible par 4 et non par 100 $\implies$ **Bissextile (366 jours)**.
* $1900$ : Divisible par 4 et par 100, mais pas par 400 $\implies$ **Ordinaire (365 jours)**.
* $2000$ : Divisible par 400 $\implies$ **Bissextile (366 jours)**.

---

## 🧩 5. Fiche Activités & Corrigés Détaillés

### 🔴 Exercice 12 : Algorithme & Programme "Année Bissextile"

#### 1. Algorithme
```algorithm
Algorithme Annee_Bissextile
Début
   Ecrire("Donner une année : ")
   Lire(an)

   Si ((an mod 4 = 0 ET an mod 100 ≠ 0) OU (an mod 400 = 0)) Alors
      Ecrire(an, " est une ANNÉE BISSEXTILE (366 jours, février a 29 jours).")
   Sinon
      Ecrire(an, " est une ANNÉE ORDINAIRE (365 jours, février a 28 jours).")
   FinSi
Fin
```

#### 2. Code Python équivalent
```python
an = int(input("Donner une année : "))

if (an % 4 == 0 and an % 100 != 0) or (an % 400 == 0):
    print(f"🎉 L'année {an} est BISSEXTILE (Février a 29 jours).")
else:
    print(f"📅 L'année {an} est ORDINAIRE (Février a 28 jours).")
```

---

### 🟡 Exercice 14 : Score d'un Match de Football
* **Énoncé** : Saisir les buts marqués par l'équipe locale $B_1$ et l'équipe visiteuse $B_2$. Déterminer l'issue du match et attribuer les points du championnat :
  * Victoire locale : 3 points pour l'équipe 1, 0 pour l'équipe 2.
  * Victoire visiteuse : 0 point pour l'équipe 1, 3 pour l'équipe 2.
  * Match nul : 1 point pour chaque équipe.
* **Code Python** :
```python
b1 = int(input("Buts marqués par l'Équipe 1 : "))
b2 = int(input("Buts marqués par l'Équipe 2 : "))

if b1 > b2:
    print(f"Victoire de l'Équipe 1 ({b1} - {b2}) ! Points : Équipe 1 = 3, Équipe 2 = 0")
elif b2 > b1:
    print(f"Victoire de l'Équipe 2 ({b1} - {b2}) ! Points : Équipe 1 = 0, Équipe 2 = 3")
else:
    print(f"Match Nul ({b1} - {b2}) ! 1 point attribué à chaque équipe.")
```

---

## 📝 6. Trace Écrite pour le Cahier de l'Élève

```markdown
CHAPITRE 4 : LES STRUCTURES CONDITIONNELLES (Partie 4 : Prédicats Composés)

1. Règle de l'Année Bissextile :
   Condition = (an % 4 == 0 and an % 100 != 0) or (an % 400 == 0)

2. Gestion des Priorités Logiques :
   - Le connecteur 'and' est TOUJOURS prioritaire sur le connecteur 'or'.
   - Conseil : Toujours utiliser des parenthèses claires pour éviter toute ambiguïté !

3. Table de décision :
   Recenser tous les cas possibles (victoire, défaite, nul) pour garantir la complétude.
```

---

## ❓ 7. Auto-Évaluation Formative (5 Questions)

1. **L'année 2100 sera-t-elle bissextile ?**  
   *Réponse* : Non, car $2100$ est divisible par 100 mais pas par 400 ($2100 / 400 = 5.25$).
2. **Dans l'expression `(A and B) or C`, que se passe-t-il si `C` est Vrai ?**  
   *Réponse* : L'ensemble de l'expression devient immédiatement Vrai, indépendamment de `A` et `B`.
3. **Que produit le code de l'Exercice 14 pour un score de $2 - 2$ ?**  
   *Réponse* : La branche `else` s'exécute : `"Match Nul ! 1 point attribué à chaque équipe."`.
4. **Pourquoi teste-t-on `an % 4 == 0` et non `an / 4 == 0` ?**  
   *Réponse* : L'opérateur modulo `%` calcule le reste de la division : un reste nul indique une divisibilité parfaite.
5. **Combien de jours compte le mois de février lors d'une année bissextile ?**  
   *Réponse* : $29$ jours.

---

## 🚀 8. Préparation de la Séance 13
* **Thème** : *Modélisation mathématique : Résolution rigoureuse des équations du 1er et 2nd degré*.
* **Rappel maths** : Revoir la formule du discriminant $\Delta = b^2 - 4ac$.
