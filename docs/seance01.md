# 📝 Fiche Pédagogique – Séance 01
## Module 01 : Les étapes de résolution d’un problème
### Thème : Démarche algorithmique, cycle de résolution & énigmes logiques

---

## 📌 1. Fiche Signalétique de la Séance

| Champ | Description |
| :--- | :--- |
| **Matière** | Informatique |
| **Niveau & Section** | 2ème Année Secondaire – Section Sciences |
| **Durée prévisionnelle** | 1 séance (1h à 1h30) |
| **Cadre de référence** | Programme officiel du Ministère de l'Éducation (Tunisie) |
| **Enseignant** | Mohamed Anis MANI |
| **Supports & Outils** | Ordinateurs, page web `module01.html`, page interactive `seance01.html`, tableau |
| **Prérequis** | Notions générales sur l'ordinateur, curiosité et raisonnement logique |

---

## 🎯 2. Compétences & Objectifs Opérationnels

### Compétences visées :
* **Compétence disciplinaire** : Résoudre un problème par une approche algorithmique méthodique.
* **Compétence transversale** : Développer l'esprit d'analyse, la déduction logique et la pensée critique.

### Objectifs opérationnels (À l'issue de la séance, l'élève sera capable de) :
1. **Définir** ce qu'est un algorithme et distinguer un algorithme d'un programme informatique.
2. **Énumérer et ordonner** les 4 étapes fondamentales du cycle de résolution d'un problème :
   $$\text{Analyse} \longrightarrow \text{Algorithme} \longrightarrow \text{Programme} \longrightarrow \text{Exécution \& Tests}$$
3. **Identifier** avec précision les **Entrées**, les **Traitements** et les **Sorties** (modèle E/T/S) dans une situation-problème simple.
4. **Comprendre** le rôle crucial des phases de test et de débogage (boucle de rétroaction).

---

## ⏱️ 3. Scénario Pédagogique & Déroulement Minuté

```
┌──────────────────────────────────────────────────────────────────────────────┐
│  00 - 15 min : Phase 1 - Éveil & Défi logique (Cordes & Ampoules)             │
│  15 - 35 min : Phase 2 - Découverte & Formalisation de la démarche            │
│  35 - 55 min : Phase 3 - Institutionnalisation du cours (Les 4 étapes & E/T/S)│
│  55 - 75 min : Phase 4 - Atelier interactif & Exercice d'ordonnancement       │
│  75 - 80 min : Phase 5 - Synthèse, trace écrite & préparation de la Séance 2  │
└──────────────────────────────────────────────────────────────────────────────┘
```

---

## 📖 4. Contenu Didactique & Support de Cours

### 1. Qu'est-ce qu'un problème informatique ?
Un problème informatique consiste en une situation où l'on dispose de données initiales (les **entrées**) et où l'on cherche à obtenir des résultats précis (les **sorties**) en appliquant un ensemble de règles logiques et mathématiques (les **traitements**).

### 2. Le Cycle des 4 Étapes Fondamentales
1. **Analyse du problème** : Identifier $E$ (Entrées), $T$ (Traitements), $S$ (Sorties).
2. **Élaboration de l'algorithme** : Écrire la solution en pseudo-code universel et déclarer les objets dans le TDO.
3. **Programmation (Traduction)** : Transposer l'algorithme dans un langage compréhensible par la machine (Python 3).
4. **Exécution & Tests** : Valider sur différents jeux d'essais, détecter les erreurs (syntaxiques, sémantiques ou logiques) et réitérer si nécessaire via la boucle de rétroaction.

### 3. Schéma d'Analyse (Le modèle E / T / S)

| Composante | Rôle | Question à se poser | Exemple (Calcul d'un périmètre) |
| :--- | :--- | :--- | :--- |
| **Entrées ($E$)** | Données fournies au programme | *« De quoi ai-je besoin pour calculer ? »* | La longueur $L$ et la largeur $l$ |
| **Traitements ($T$)** | Formules et transformations logiques | *« Quelles opérations appliquer aux entrées ? »* | $P \leftarrow (L + l) \times 2$ |
| **Sorties ($S$)** | Résultats finaux affichés à l'utilisateur | *« Que doit produire le programme ? »* | La valeur de $P$ |

---

## 🧩 5. Fiche Activités & Corrigés Détaillés

### 🔴 Exercice 1 : Le problème des deux cordes
* **Protocole opératoire pour mesurer 45 minutes** :
  1. À $t = 0$ : Allumer la Corde 1 aux deux extrémités et la Corde 2 à une seule extrémité.
  2. À $t = 30\text{ min}$ : La Corde 1 est entièrement consumée. On allume alors immédiatement la deuxième extrémité de la Corde 2.
  3. Le reste de la Corde 2 brûle par ses deux bouts en 15 minutes.
  4. À $t = 30 + 15 = \mathbf{45\text{ minutes}}$ : La Corde 2 s'éteint.

---

### 🟡 Exercice 2 : Le problème des trois ampoules
* **Protocole opératoire (Effet Joule / Chaleur)** :
  1. Allumer l'Interrupteur 1 et attendre 10 minutes (l'ampoule chauffe).
  2. Éteindre l'Interrupteur 1 et allumer immédiatement l'Interrupteur 2. Laisser l'Interrupteur 3 éteint.
  3. Entrer dans la pièce :
     * Ampoule **allumée** $\rightarrow$ Interrupteur 2.
     * Ampoule **éteinte mais chaude** $\rightarrow$ Interrupteur 1.
     * Ampoule **éteinte et froide** $\rightarrow$ Interrupteur 3.

---

### 🟢 Exercice 5 : Ordonnancement du cycle de résolution
* **Ordre chronologique exact** :
  1. Étape 1 : Analyse du problème
  2. Étape 2 : Algorithme
  3. Étape 3 : Programme (Python)
  4. Étape 4 : Exécution et Test

---

## 📝 6. Trace Écrite pour le Cahier de l'Élève

```markdown
CHAPITRE 1 : LES ÉTAPES DE RÉSOLUTION D'UN PROBLÈME

1. Définition d'un algorithme :
Un algorithme est une suite ordonnée, finie et non ambiguë d'instructions permettant 
de résoudre un problème donné.

2. Les quatre étapes de résolution d'un problème :
   a. L'Analyse : Détermine les Entrées (données de départ), les Traitements 
      (opérations à effectuer) et les Sorties (résultats voulus).
   b. L'Algorithme : Description logique de la solution en pseudo-code indépendant 
      de tout ordinateur, complété par le Tableau des Données et Objets (TDO).
   c. Le Programme : Traduction de l'algorithme dans un langage de programmation 
      (ex: Python 3).
   d. Exécution et Tests : Lancement sur machine avec différents jeux d'essais 
      pour vérifier l'exactitude des résultats et corriger les erreurs éventuelles.

3. Schéma de principe :
   [ Entrées ] ───► ⚙ Traitements ───► [ Sorties ]
```

---

## ❓ 7. Évaluation Formative Express (Auto-évaluation 5 min)

1. **Un algorithme dépend-il obligatoirement du langage Python ?**  
   *Réponse* : Non. Un algorithme est universel et s'écrit en pseudo-code. Python n'est qu'un outil de traduction (étape 3).
2. **Quelle est la première chose à faire face à un problème informatique ?**  
   *Réponse* : Analyser le problème (comprendre la situation, identifier les données d'entrée et le résultat attendu).
3. **Que signifie l'acronyme E/T/S ?**  
   *Réponse* : Entrées / Traitements / Sorties.
4. **Si un programme affiche un faux résultat lors des tests, à quelle étape faut-il revenir ?**  
   *Réponse* : À l'étape d'analyse ou d'élaboration de l'algorithme pour corriger la logique du traitement.
5. **Pourquoi l'étape d'analyse est-elle indispensable avant de coder ?**  
   *Réponse* : Pour éviter les erreurs de conception, économiser du temps et s'assurer que l'on répond exactement au problème posé.

---

## 🚀 8. Préparation de la Séance Suivante (Séance 02)
* **Thème** : *Formalisation : Schéma d'Analyse, TDO et premier script Python*.
* **À faire par l'élève** : Relire la fiche et réfléchir à l'Exercice 4 (Calcul d'aire de la Forme H).
