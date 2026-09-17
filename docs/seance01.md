# 📝 Fiche Pédagogique – Séance 01
## Module 01 : Les étapes de résolution d’un problème
### Thème : Démarche algorithmique, cycle de résolution (4 étapes), E/T/S, TDO et premiers scripts Python

---

## 📌 1. Fiche Signalétique de la Séance

| Champ | Description |
| :--- | :--- |
| **Matière** | Informatique |
| **Niveau & Section** | 2ème Année Secondaire – Section Sciences |
| **Durée prévisionnelle** | 1 séance (1 heure) – 70% des exercices traités |
| **Cadre de référence** | Programme officiel du Ministère de l'Éducation (Tunisie) |
| **Enseignant** | Mohamed Anis MANI |
| **Supports & Outils** | Ordinateurs, page web `module01.html`, Playground Python (`playground.html`), tableau |
| **Prérequis** | Notions générales sur l'ordinateur, curiosité et raisonnement logique |

---

## 🎯 2. Compétences & Objectifs Opérationnels

### Compétences visées :
* **Compétence disciplinaire** : Résoudre un problème informatique par une démarche algorithmique rigoureuse (modèle E/T/S, TDO, pseudo-code).
* **Compétence pratique** : Traduire un premier algorithme en Python 3 et l'exécuter dans l'environnement WebAssembly.

### Objectifs opérationnels (À l'issue de la séance, l'élève sera capable de) :
1. **Définir** ce qu'est un algorithme et identifier les 4 étapes fondamentales :
   $$\text{Analyse} \longrightarrow \text{Algorithme} \longrightarrow \text{Programme} \longrightarrow \text{Exécution \& Tests}$$
2. **Identifier** avec précision les **Entrées**, les **Traitements** et les **Sorties** (modèle E/T/S) dans un problème concret.
3. **Renseigner** le Tableau de Déclaration des Objets (TDO) avec les types de base (`entier`, `réel`).
4. **Rédiger** la structure minimale d'un algorithme (`Algorithme`, `Début`, `Fin`) et son équivalent en Python 3.
5. **Tester et déboguer** un script dans le Playground interactif.

---

## ⏱️ 3. Scénario Pédagogique & Déroulement Minuté (Séance de 60 min)

```
┌─────────────────────────────────────────────────────────────────────────────────────┐
│  00 - 12 min : Phase 1 - Éveil logique : Énigmes des Cordes & Ampoules (Ex 1, 2)    │
│  12 - 25 min : Phase 2 - Institutionnalisation : Les 4 étapes, E/T/S & TDO          │
│  25 - 45 min : Phase 3 - Activité guidée : Somme & Produit d'entiers (Ex 3)         │
│  45 - 55 min : Phase 4 - Application géométrique : Aire Forme H & Ordonnancement    │
│  55 - 60 min : Phase 5 - Synthèse, trace écrite & amorce du Module 02               │
└─────────────────────────────────────────────────────────────────────────────────────┘
```

---

## 📖 4. Contenu Didactique & Support de Cours

### 1. Le Cycle des 4 Étapes Fondamentales
1. **Analyse du problème** : Identifier $E$ (Entrées), $T$ (Traitements), $S$ (Sorties).
2. **Élaboration de l'algorithme** : Écrire la solution en pseudo-code et dresser le TDO.
3. **Programmation (Traduction)** : Transposer l'algorithme en Python 3.
4. **Exécution & Tests** : Valider sur plusieurs jeux d'essais et déboguer via la boucle de rétroaction.

### 2. Grille d'Analyse (Modèle E / T / S) et TDO
* **Entrées ($E$)** : Données nécessaires au calcul saisies au clavier.
* **Traitements ($T$)** : Formules et calculs algorithmiques.
* **Sorties ($S$)** : Résultats affichés à l'écran.
* **TDO** : Tableau associant chaque objet (variable/constante) à son type informatique.

---

## 🧩 5. Fiche Activités & Corrigés Détaillés (70% du Module Traités)

### 🔴 Exercice 1 : Le problème des deux cordes
* **Protocole pour mesurer 45 min** :
  1. À $t = 0$ : Allumer Corde 1 aux 2 bouts et Corde 2 à 1 bout.
  2. À $t = 30\text{ min}$ : Corde 1 finie. Allumer le 2ème bout de Corde 2.
  3. À $t = 30 + 15 = \mathbf{45\text{ min}}$ : Corde 2 s'éteint.

### 🟡 Exercice 2 : Le problème des trois ampoules
* **Protocole (Chaleur / Effet Joule)** :
  1. Allumer Interrupteur 1 pendant 10 min, puis l'éteindre.
  2. Allumer Interrupteur 2. Laisser le 3 éteint.
  3. Dans la pièce : allumée $\rightarrow$ Int 2 ; éteinte et chaude $\rightarrow$ Int 1 ; éteinte et froide $\rightarrow$ Int 3.

### 🟢 Exercice 3 : Calcul Somme et Produit de deux entiers (Analyse, TDO, Algorithme, Python)
* **Analyse** :
  * Résultat = Afficher `s`, `p`
  * Traitement = `s ← a + b`, `p ← a * b`
  * Données = Saisir `a`, `b`
* **TDO** : `a`, `b`, `s`, `p` : `entier`.
* **Algorithme** :
```algorithm
Algorithme Somme_Produit
Début
   Ecrire("Donner a : ") ; Lire(a)
   Ecrire("Donner b : ") ; Lire(b)
   s ← a + b
   p ← a * b
   Ecrire("La somme est : ", s)
   Ecrire("Le produit est : ", p)
Fin
```
* **Script Python (Playground)** :
```python
a = int(input("Donner a : "))
b = int(input("Donner b : "))
s = a + b
p = a * b
print("La somme est :", s)
print("Le produit est :", p)
```

### 🔵 Exercice 4 : Aire de la Forme H
* **Formule** : $\text{Aire} = \frac{10}{3} \times a^2$
* **TDO** : `a`, `aire` : `réel`.
* **Algorithme** :
```algorithm
Algorithme Aire_Forme_H
Début
   Ecrire("Donner la dimension a : ") ; Lire(a)
   aire ← (10 / 3) * a * a
   Ecrire("L'aire de la forme H est : ", aire)
Fin
```

### 🟣 Exercice 5 : Ordonnancement du cycle de résolution
* Ordre chronologique : 1. Analyse $\rightarrow$ 2. Algorithme $\rightarrow$ 3. Programme $\rightarrow$ 4. Exécution & Tests.

---

## 📝 6. Trace Écrite pour le Cahier de l'Élève

```markdown
CHAPITRE 1 : LES ÉTAPES DE RÉSOLUTION D'UN PROBLÈME

1. Définition :
   Un algorithme est une suite finie et ordonnée d'instructions résolvant un problème.
2. Les 4 étapes :
   [ Analyse (E/T/S) ] ──► [ Algorithme & TDO ] ──► [ Programme Python ] ──► [ Tests & Débogage ]
3. Grille E/T/S :
   - Entrées (Données)
   - Traitements (Formules)
   - Sorties (Résultats)
```

---

## 🚀 7. Préparation de la Séance Suivante (Séance 02)
* **Thème** : *Module 02 – Les Structures Simples : Entrées/Sorties (`input` / `print`), Cast, Règles de Nommage et Affectation (`←` / `=`)*.
* **À faire** : Réfléchir au dialogue homme-machine et au besoin de stocker des résultats de calculs en mémoire.
