# 📝 Fiche Pédagogique – Séance 16
## Module 05 : Structure itérative complète
### Thème : Parcours Séquentiel de Chaînes de Caractères (Sans Listes) & Filtrage de Données

---

## 📌 1. Fiche Signalétique de la Séance

| Champ | Description |
| :--- | :--- |
| **Matière** | Informatique |
| **Niveau & Section** | 2ème Année Secondaire – Section Sciences |
| **Durée prévisionnelle** | 1 séance (1 heure) |
| **Cadre de référence** | Programme officiel du Ministère de l'Éducation (Tunisie) |
| **Enseignant** | Mohamed Anis MANI |
| **Supports & Outils** | Ordinateurs, page web `module05.html` (bacs SVG de tri), Playground Python, tableau |
| **Prérequis** | Longueur `len()`, indexation `ch[i]`, boucle `Pour` |

---

## 🎯 2. Compétences & Objectifs Opérationnels

### Compétences visées :
* **Compétence algorithmique** : Visiter systématiquement chaque caractère d'un texte pour effectuer des opérations de test, de comptage ou d'extraction.
* **Compétence de rigueur pédagogique** : Manipuler les chaînes de caractères sans recourir aux structures de listes (`[...]`), strictement hors programme en 2e Sciences.

### Objectifs opérationnels (À l'issue de la séance, l'élève sera capable de) :
1. **Écrire** la structure canonique de parcours séquentiel : `for i in range(len(ch)):`.
2. **Accéder** au caractère courant via `car = ch[i]`.
3. **Dénombrer** les voyelles et les consonnes d'un texte (Exercice 4).
4. **Construire par accumulation textuelle** deux nouvelles chaînes séparées `chl` (lettres) et `chc` (chiffres) (Exercice 5).

---

## ⏱️ 3. Scénario Pédagogique & Déroulement Minuté (Séance de 60 min)

```
┌─────────────────────────────────────────────────────────────────────────────────────┐
│  00 - 10 min : Phase 1 - Accroche : Inspecter un texte lettre par lettre            │
│  10 - 25 min : Phase 2 - Cours : Schéma canonique for i in range(len(ch))           │
│  25 - 42 min : Phase 3 - Exercice 4 : Compteur de voyelles et de consonnes          │
│  42 - 55 min : Phase 4 - Exercice 5 : Filtrage dynamique (Bacs SVG lettres/chiffres)│
│  55 - 60 min : Phase 5 - Synthèse, trace écrite & préparation Séance 17             │
└─────────────────────────────────────────────────────────────────────────────────────┘
```

---

## 📖 4. Contenu Didactique & Support de Cours

### 1. Le Schéma Canonique de Parcours
Pour inspecter chaque symbole d'une chaîne `ch` de longueur $L$ :
* Les indices valides vont de **0** à **$L - 1$**.
* La fonction `range(len(ch))` génère exactement cette suite d'indices.

```algorithm
Pour i De 0 À long(ch) - 1 Faire
   car ← ch[i]
   // Traitements sur le caractère courant
FinPour
```

*Équivalent Python :*
```python
for i in range(len(ch)):
    car = ch[i]
    # Traitements sur car
```

### 2. Le Schéma d'Accumulation Textuelle (Concaténation Progressive)
Pour filtrer des caractères sans utiliser de listes ou de tableaux :
1. On initialise une chaîne vide **AVANT** la boucle : `res = ""`.
2. À chaque tour, si le caractère courant satisfait le critère, on l'ajoute à la fin : `res = res + car`.

---

## 🧩 5. Fiche Activités & Corrigés Détaillés

### 🔴 Exercice 4 : Dénombrement des Voyelles et Consonnes
* **Énoncé** : Saisir une chaîne alphabétique `ch`. Compter et afficher le nombre de voyelles et le nombre de consonnes qu'elle contient.
* **Algorithme** :
```algorithm
Algorithme Compteur_Voyelles_Consonnes
Début
   Ecrire("Donner une chaîne alphabétique : ")
   Lire(ch)

   voyelles ← "AEIOUYaeiouy"
   nb_v ← 0
   nb_c ← 0

   Pour i De 0 À long(ch) - 1 Faire
      car ← ch[i]
      Si (car >= 'A' ET car <= 'Z') OU (car >= 'a' ET car <= 'z') Alors
         Si Pos(car, voyelles) ≠ -1 Alors
            nb_v ← nb_v + 1
         Sinon
            nb_c ← nb_c + 1
         FinSi
      FinSi
   FinPour

   Ecrire("Nombre de voyelles : ", nb_v)
   Ecrire("Nombre de consonnes : ", nb_c)
Fin
```

* **Code Python équivalent** :
```python
ch = input("Donner une chaîne de caractères : ")

voyelles = "AEIOUYaeiouy"
nb_v = 0
nb_c = 0

for i in range(len(ch)):
    car = ch[i]
    # Vérifier s'il s'agit bien d'une lettre de l'alphabet
    if ('A' <= car <= 'Z') or ('a' <= car <= 'z'):
        if car in voyelles:
            nb_v += 1
        else:
            nb_c += 1

print(f"Nombre de voyelles  : {nb_v}")
print(f"Nombre de consonnes : {nb_c}")
```

---

### 🟡 Exercice 5 : Filtrage de Lettres et Chiffres (Les Bacs SVG)
* **Énoncé** : Saisir une chaîne mixte `ch` contenant des lettres, des chiffres et des symboles divers (ex: `"Bac2026-Sciences!"`).
* **Objectif** : Extraire dans `chl` toutes les lettres et dans `chc` tous les chiffres. Ignorer les symboles de ponctuation.
* **Code Python sans aucune liste** :
```python
ch = input("Saisir un texte mixte : ")

chl = ""  # Bac accumulateur des lettres
chc = ""  # Bac accumulateur des chiffres

for i in range(len(ch)):
    car = ch[i]
    if ('A' <= car <= 'Z') or ('a' <= car <= 'z'):
        chl = chl + car  # Concaténation dans le bac lettres
    elif '0' <= car <= '9':
        chc = chc + car  # Concaténation dans le bac chiffres

print("Chaîne des lettres extraites (chl)  :", chl)
print("Chaîne des chiffres extraits (chc)  :", chc)
```

---

## 📝 6. Trace Écrite pour le Cahier de l'Élève

```markdown
CHAPITRE 5 : LA STRUCTURE ITÉRATIVE (Partie 3 : Parcours de Chaînes)

1. Schéma canonique de parcours d'une chaîne :
   for i in range(len(ch)):
       car = ch[i]
       # Analyse de chaque caractère

2. Accumulateur textuel (Sans listes) :
   resultat = ""           # Chaîne vide avant la boucle
   for i in range(len(ch)):
       if condition:
           resultat = resultat + ch[i]

3. Détection de catégorie :
   - Lettre majuscule : 'A' <= car <= 'Z'
   - Lettre minuscule : 'a' <= car <= 'z'
   - Chiffre          : '0' <= car <= '9'
```

---

## ❓ 7. Auto-Évaluation Formative (5 Questions)

1. **Pourquoi la boucle s'arrête-t-elle à `len(ch) - 1` ?**  
   *Réponse* : Car les indices en Python débutent à $0$. Le dernier caractère se trouve à l'indice $L - 1$.
2. **Combien de voyelles contient le mot `"ALGORITHME"` ?**  
   *Réponse* : $4$ voyelles (`A`, `O`, `I`, `E`).
3. **Que vaut `res` après l'exécution suivante sur `ch = "S2C"` ?**
   ```python
   res = ""
   for i in range(len(ch)):
       if 'A' <= ch[i] <= 'Z': res += ch[i]
   ```
   *Réponse* : `"SC"` (le chiffre `'2'` est filtré et exclu).
4. **Peut-on utiliser `for car in ch:` en Python ?**  
   *Réponse* : Oui, c'est le parcours direct par élément en Python, mais le parcours par indices `range(len(ch))` reste la norme officielle enseignée au niveau 2e Sciences en Tunisie pour manipuler les positions.
5. **Quelle est la sortie de l'Exercice 5 pour `ch = "Covid-19"` ?**  
   *Réponse* : `chl = "Covid"` et `chc = "19"`.

---

## 🚀 8. Préparation de la Séance 18
* **Thème** : *Arithmétique itérative avancée : Nombres poly-divisibles et séries alternées*.
* **Défi mathématique** : Comment calculer la somme alternée $S = 1^1 - 2^2 + 3^3 - 4^4 + \dots \pm n^n$ ?
