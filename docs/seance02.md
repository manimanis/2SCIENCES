# 📝 Fiche Pédagogique – Séance 02
## Module 01 : Les étapes de résolution d’un problème
### Thème : Formalisation : Schéma d'Analyse (E/T/S), Tableau des Données et Objets (TDO) & Premier Script Python

---

## 📌 1. Fiche Signalétique de la Séance

| Champ | Description |
| :--- | :--- |
| **Matière** | Informatique |
| **Niveau & Section** | 2ème Année Secondaire – Section Sciences |
| **Durée prévisionnelle** | 1 séance (1h à 1h30) |
| **Cadre de référence** | Programme officiel du Ministère de l'Éducation (Tunisie) |
| **Enseignant** | Mohamed Anis MANI |
| **Supports & Outils** | Ordinateurs, page web `module01.html`, Playground Python (`playground.html`), tableau blanc |
| **Prérequis** | Notions de base de la Séance 01 (Définition d'un algorithme, les 4 étapes du cycle) |

---

## 🎯 2. Compétences & Objectifs Opérationnels

### Compétences visées :
* **Compétence disciplinaire** : Formaliser une démarche de résolution en exploitant rigoureusement la grille d'Analyse et le Tableau de Déclaration des Objets (TDO).
* **Compétence pratique** : Traduire un algorithme simple en script Python 3 et vérifier son comportement par l'exécution.

### Objectifs opérationnels (À l'issue de la séance, l'élève sera capable de) :
1. **Compléter sans erreur** une grille d'Analyse (Entrées, Traitements, Sorties).
2. **Déclarer les objets** dans le TDO avec leur nom (identificateur) et leur type de base (`entier`, `réel`).
3. **Rédiger un algorithme structuré** en respectant la syntaxe normalisée (`Algorithme Nom`, `Début`, `Fin`).
4. **Traduire cet algorithme en Python 3** et l'exécuter dans le Playground WebAssembly.

---

## ⏱️ 3. Scénario Pédagogique & Déroulement Minuté

```
┌──────────────────────────────────────────────────────────────────────────────┐
│  00 - 10 min : Phase 1 - Rappel des 4 étapes & Correction du travail maison   │
│  10 - 30 min : Phase 2 - Formalisation : Grille d'Analyse, TDO & Algorithme   │
│  30 - 55 min : Phase 3 - Activité guidée : Exercice 3 (Somme & Produit)       │
│  55 - 75 min : Phase 4 - Atelier autonome : Exercices 4, 6 et 7 (Géométrie)   │
│  75 - 80 min : Phase 5 - Synthèse, trace écrite & amorce du Module 02         │
└──────────────────────────────────────────────────────────────────────────────┘
```

---

## 📖 4. Contenu Didactique & Support de Cours

### 1. La Grille d'Analyse d'un Problème
L'analyse formalise la transition entre la compréhension humaine du problème et la solution algorithmique :

```
             ┌───────────────────────────────┐
             │       GRILLE D'ANALYSE        │
             ├──────────────┬────────────────┤
             │ Résultat =   │ Sorties (S)    │
             │ Traitement = │ Formules (T)   │
             │ Données =    │ Entrées (E)    │
             └──────────────┴────────────────┘
```

### 2. Le Tableau de Déclaration des Objets (TDO)
Chaque donnée manipulée dans l'algorithme est stockée dans un conteneur mémoire appelé **variable** ou **constante**. Le TDO recense l'ensemble des objets :

| Objet | Type / Nature | Rôle / Description |
| :---: | :---: | :--- |
| `a`, `b` | `entier` | Données d'entrée saisies au clavier |
| `s` | `entier` | Somme calculée |
| `p` | `entier` | Produit calculé |

### 3. Structure Générale d'un Algorithme
```algorithm
Algorithme Nom_De_L_Algorithme
Début
   // 1. Saisie des entrées
   // 2. Traitements et calculs
   // 3. Affichage des sorties
Fin
```

---

## 🧩 5. Fiche Activités & Corrigés Détaillés

### 🔴 Exercice 3 : Calcul Somme et Produit de deux entiers

#### 1. Analyse
* **Résultat =** Afficher `s`, `p`
* **Traitement =**
  * `s ← a + b`
  * `p ← a * b`
* **Données =** Saisir `a`, `b`

#### 2. Tableau de Déclaration des Objets (TDO)
| Objet | Type |
| :---: | :---: |
| `a`, `b` | `entier` |
| `s`, `p` | `entier` |

#### 3. Algorithme
```algorithm
Algorithme Somme_Produit
Début
   Ecrire("Donner le premier entier a : ")
   Lire(a)
   Ecrire("Donner le deuxième entier b : ")
   Lire(b)
   s ← a + b
   p ← a * b
   Ecrire("La somme est : ", s)
   Ecrire("Le produit est : ", p)
Fin
```

#### 4. Traduction Python (Testée sur le Playground)
```python
# Saisie des entrées avec conversion en entier (int)
a = int(input("Donner le premier entier a : "))
b = int(input("Donner le deuxième entier b : "))

# Traitements
s = a + b
p = a * b

# Affichage des sorties
print("La somme est :", s)
print("Le produit est :", p)
```

---

### 🟡 Exercice 4 : Aire de la Forme H
* **Énoncé** : Calculer l'aire d'une forme géométrique en "H" paramétrée par la dimension $a$.
* **Méthode 1** : 3 carrés de côté $a$ et 1 rectangle de largeur $a/3$ et longueur $a$.
  $$\text{Aire} = 3 \times a^2 + \frac{a}{3} \times a = 3a^2 + \frac{a^2}{3} = \frac{10}{3}a^2$$
* **Algorithme** :
```algorithm
Algorithme Aire_Forme_H
Début
   Ecrire("Donner la dimension a : ")
   Lire(a)
   aire ← (10 / 3) * a * a
   Ecrire("L'aire de la forme H est : ", aire)
Fin
```
* **TDO** : `a` : `réel`, `aire` : `réel`.

---

### 🟢 Exercice 7 : Prédécesseur et Successeur d'un nombre pair
* **Énoncé** : Saisir un nombre pair `a`, puis afficher le nombre pair précédent et le suivant. Exemple pour $a=8$ : affichage `6 – 8 – 10`.
* **Traitements** : $\text{pred} \leftarrow a - 2$, $\text{succ} \leftarrow a + 2$.
* **Algorithme** :
```algorithm
Algorithme Pred_Succ
Début
   Ecrire("Donner un nombre pair a : ")
   Lire(a)
   pred ← a - 2
   succ ← a + 2
   Ecrire(pred, " - ", a, " - ", succ)
Fin
```
* **TDO** : `a`, `pred`, `succ` : `entier`.

---

## 📝 6. Trace Écrite pour le Cahier de l'Élève

```markdown
CHAPITRE 1 (Suite) : FORMALISATION D'UN ALGORITHME

1. La Grille d'Analyse :
   - Entrées (E) : variables à saisir au clavier.
   - Traitements (T) : formules et opérations affectées aux variables.
   - Sorties (S) : résultats affichés à l'écran.

2. Le TDO (Tableau des Données et Objets) :
   Recense tous les objets manipulés avec leur type (ex: entier, réel).

3. Structure d'un Algorithme :
   Algorithme Nom
   Début
      // Instructions
   Fin
```

---

## ❓ 7. Auto-Évaluation Formative (5 Questions)

1. **Dans l'Exercice 3, quel est le type de l'objet `s` ?**  
   *Réponse* : `entier` (la somme de deux entiers est un entier).
2. **Pourquoi écrit-on `int(input())` en Python au lieu de `input()` seul ?**  
   *Réponse* : Car `input()` renvoie une chaîne de caractères (`str`). La fonction `int()` convertit cette chaîne en nombre entier pour permettre les calculs arithmétiques.
3. **Quelle est la différence entre un objet de type `entier` et un objet de type `réel` ?**  
   *Réponse* : L'`entier` ne comporte pas de virgule, tandis que le `réel` comporte une partie décimale.
4. **Dans quel ordre exécute-t-on les instructions d'un algorithme simple ?**  
   *Réponse* : De façon séquentielle, de haut en bas, de `Début` à `Fin`.
5. **Si la saisie de `a` vaut 10 dans l'Exercice 7, que doit afficher le programme ?**  
   *Réponse* : `8 - 10 - 12`.

---

## 🚀 8. Préparation de la Séance 03 (Module 02)
* **Thème** : *Les structures simples : Opérations d'Entrée/Sortie et gestion des identificateurs*.
* **À retenir** : Bien réviser les primitives d'entrée (`input`) et de sortie (`print`).
