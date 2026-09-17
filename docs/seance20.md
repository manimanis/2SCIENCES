# 📝 Fiche Pédagogique – Séance 20
## Module 05 : Structure itérative complète & Intégration
### Thème : Structure Itérative « Pour » & Intégration des Notions des Modules Précédents (Défi Transversal « BioPass »)

---

## 📌 1. Fiche Signalétique de la Séance

| Champ | Description |
| :--- | :--- |
| **Matière** | Informatique |
| **Niveau & Section** | 2ème Année Secondaire – Section Sciences |
| **Durée prévisionnelle** | 1 séance (1 heure) |
| **Cadre de référence** | Programme officiel du Ministère de l'Éducation (Tunisie) |
| **Enseignant** | Mohamed Anis MANI |
| **Supports & Outils** | Ordinateurs, IDE Python WebAssembly Playground (`playground.html`), tableau |
| **Prérequis** | Ensemble des Modules 01, 02, 03, 04 et 05 |

---

## 🎯 2. Compétences & Objectifs Opérationnels

### Compétences visées :
* **Compétence intégrative** : Résoudre un problème informatique complet et complexe en articulant harmonieusement toutes les étapes de la démarche algorithmique.
* **Compétence d'autonomie et de débogage** : Traduire, exécuter et tester sur machine en corrigeant de manière autonome les erreurs de logique ou de syntaxe.

### Objectifs opérationnels (À l'issue de la séance, l'élève sera capable de) :
1. **Élaborer** l'analyse E/T/S complète et dresser le Tableau de Déclaration des Objets (TDO).
2. **Manipuler** simultanément des variables scalaires (entiers, réels, booléens) et des chaînes de caractères.
3. **Combiner** des structures conditionnelles (`if...elif...else`) et des boucles `Pour` (`range`).
4. **Implémenter et valider** un mini-projet concret de cryptographie et de contrôle d'intégrité.

---

## ⏱️ 3. Scénario Pédagogique & Déroulement Minuté (Séance de 60 min)

```
┌─────────────────────────────────────────────────────────────────────────────────────┐
│  00 - 08 min : Phase 1 - Présentation du Défi de Synthèse & Cahier des charges      │
│  08 - 22 min : Phase 2 - Travail d'analyse : Grille E/T/S et TDO complet            │
│  22 - 38 min : Phase 3 - Rédaction de l'Algorithme structuré (Boucle Pour)          │
│  38 - 54 min : Phase 4 - Implémentation & Tests sur le Playground Python            │
│  54 - 60 min : Phase 5 - Bilan d'apprentissage annuel & auto-évaluation             │
└─────────────────────────────────────────────────────────────────────────────────────┘
```

---

## 🚀 4. Le Grand Défi de Synthèse : Système de Badge Sécurisé "BioPass"

### Énoncé du Problème :
Le laboratoire de sciences du lycée souhaite automatiser la génération d'un badge sécurisé pour chaque élève.

Le programme demande de saisir :
1. Le `nom` de l'élève (lettres alphabétiques).
2. L'`identifiant` numérique (une chaîne de 4 chiffres, ex: `"4271"`).
3. La `cle_decalage` (un entier compris entre 1 et 5).

Le programme doit effectuer les traitements suivants :
1. **Vérification d'intégrité de l'identifiant** :
   * L'identifiant doit comporter exactement 4 chiffres.
   * La somme de ses chiffres doit être supérieure ou égale à 10.
2. **Chiffrement par Décalage (Code de César)** :
   * Chaque lettre du nom de l'élève est décalée de `cle_decalage` rangs dans la table ASCII (ex: avec décalage 2, `'A'` devient `'C'`, `'B'` devient `'D'`).
3. **Génération du Code Badge** :
   * Le code est formé de : `NomChiffre` + `"-"` + `Identifiant` + `"-"` + `Niveau` (`"2SC"`).

---

## 🧩 5. Solution Intégrale : Analyse, TDO, Algorithme & Code Python

### 1. Analyse du Problème
* **Résultat =** Afficher le badge généré ou un message d'erreur d'intégrité.
* **Traitements =**
  * Contrôle de longueur : `long(identifiant) = 4`
  * Calcul de la somme des chiffres :
    $$\text{somme} \leftarrow \sum_{i=0}^3 \text{valeur}(\text{identifiant}[i])$$
  * Si $\text{somme} < 10 \implies$ Refus.
  * Chiffrement du nom :
    * Initialiser `nom_chiffre ← ""`
    * Pour $i$ de $0$ à $\text{long}(nom) - 1$ :
      * $\text{code} \leftarrow \text{ord}(nom[i]) + cle$
      * $\text{nom\_chiffre} \leftarrow \text{nom\_chiffre} + \text{chr}(\text{code})$
  * Assemblage : `badge ← nom_chiffre + "-" + identifiant + "-2SC"`
* **Données =** Saisir `nom`, `identifiant`, `cle`

### 2. Tableau de Déclaration des Objets (TDO)

| Objet | Type | Rôle |
| :---: | :---: | :--- |
| `nom`, `identifiant` | `chaine` | Données saisies de l'élève |
| `cle` | `entier` | Clé de décalage César ($1 \le cle \le 5$) |
| `somme`, `i`, `code` | `entier` | Compteurs et variables de calcul |
| `nom_chiffre`, `badge`| `chaine` | Chaînes de sortie et résultat final |
| `valide` | `booléen` | Témoin d'intégrité |

### 3. Algorithme Complet
```algorithm
Algorithme Badge_BioPass
Début
   Ecrire("Nom de l'élève : ") ; Lire(nom)
   Ecrire("Identifiant à 4 chiffres : ") ; Lire(identifiant)
   Ecrire("Clé de décalage (1 à 5) : ") ; Lire(cle)

   // 1. Contrôle d'intégrité
   Si long(identifiant) ≠ 4 Alors
      Ecrire("Erreur : L'identifiant doit comporter exactement 4 chiffres !")
   Sinon
      somme ← 0
      Pour i De 0 À 3 Faire
         somme ← somme + Valeur(identifiant[i])
      FinPour

      Si somme < 10 Alors
         Ecrire("Sécurité : Somme des chiffres insuffisante (< 10). Accès refusé !")
      Sinon
         // 2. Chiffrement du nom
         nom_chiffre ← ""
         Pour i De 0 À long(nom) - 1 Faire
            code ← ord(nom[i]) + cle
            nom_chiffre ← nom_chiffre + chr(code)
         FinPour

         // 3. Fabrication du badge
         badge ← nom_chiffre + "-" + identifiant + "-2SC"
         Ecrire("===============================")
         Ecrire("✅ BADGE SÉCURISÉ GÉNÉRÉ AVEC SUCCÈS")
         Ecrire("Code officiel : ", badge)
         Ecrire("Somme de contrôle : ", somme)
         Ecrire("===============================")
      FinSi
   FinSi
Fin
```

### 4. Traduction Python Complète (Prête pour le Playground)
```python
# =========================================================
# PROJET DE SYNTHÈSE : SYSTÈME DE BADGE SÉCURISÉ BIOPASS
# Mobilisation des Modules 01 à 05 - 2e Sciences
# =========================================================

# 1. Saisie des entrées (Module 02)
nom = input("Nom de l'élève (ex: AMINE) : ").strip().upper()
identifiant = input("Identifiant (4 chiffres, ex: 4271) : ").strip()
cle = int(input("Clé de décalage (1 à 5) : "))

# 2. Contrôle de longueur et intégrité (Module 03 et 04)
if len(identifiant) != 4:
    print("❌ Erreur : L'identifiant doit comporter exactement 4 chiffres !")
elif not (1 <= cle <= 5):
    print("❌ Erreur : La clé de décalage doit être comprise entre 1 et 5.")
else:
    # 3. Calcul itératif de la somme des chiffres (Module 05)
    somme = 0
    for i in range(4):
        somme += int(identifiant[i])

    if somme < 10:
        print(f"❌ Sécurité : Somme des chiffres ({somme}) insuffisante. Accès refusé !")
    else:
        # 4. Parcours séquentiel et chiffrement de César (Module 03 et 05)
        nom_chiffre = ""
        for i in range(len(nom)):
            code = ord(nom[i]) + cle
            nom_chiffre += chr(code)

        # 5. Formatage final du badge (Module 02 et 03)
        badge = f"{nom_chiffre}-{identifiant}-2SC"

        print("\n" + "=" * 42)
        print("  🎉 BADGE OFFICIEL GÉNÉRÉ AVEC SUCCÈS")
        print("=" * 42)
        print(f"  Titulaire crypté : {nom_chiffre} (Décalage +{cle})")
        print(f"  Code Badge       : {badge}")
        print(f"  Contrôle somme   : {somme} / 36 (Conforme)")
        print("=" * 42)
```

---

## 📝 6. Trace Écrite Récapitulative du Programme 2e Sciences

```markdown
RÉCAPITULATIF ANNUEL : LES 5 PILIERS DE L'ALGORITHMIQUE EN 2e SCIENCES

1. Module 01 : Démarche rigoureuse (Analyse E/T/S ➔ TDO ➔ Algorithme ➔ Python).
2. Module 02 : Structures simples (Affectation '=', entrées 'input', sorties 'print').
3. Module 03 : Données (Entier, Réel, Booléen, Caractère, ASCII, Tranches ch[d:f]).
4. Module 04 : Conditions (Si ... Alors ... Sinon, if ... elif ... else, Selon / match).
5. Module 05 : Répétition (Pour i in range(...) avec compteurs et accumulateurs).

Règle pédagogique permanente : Pas de listes Python en 2e Sciences ! 
Toutes les séquences sont traitées par des chaînes ou des scalaires.
```

---

## ❓ 7. Grille d'Évaluation de la Maîtrise Globale (Barème sur 20)

| Critère d'évaluation | Points attribués | Degré d'acquisition |
| :--- | :---: | :---: |
| **Compréhension & Analyse E/T/S** | **4 pts** | Saisie correcte, extraction et sorties clairement identifiées |
| **Rigueur du TDO & Déclaration des types** | **3 pts** | Types scalaires et chaînes déclarés sans omission |
| **Contrôles conditionnels imbriqués** | **4 pts** | Validation de la longueur, de la somme et de la clé |
| **Boucle itérative & Accumulateurs** | **5 pts** | Calcul de la somme des chiffres et chiffrement lettre par lettre |
| **Syntaxe Python & Exécution sur Playground** | **4 pts** | Indentation stricte, exécution sans bug, restitution soignée |
| **Total Général** | **20 / 20** | **Maîtrise Complète du Programme 2e Sciences** |
