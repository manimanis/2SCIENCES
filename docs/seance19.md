# 📝 Fiche Pédagogique – Séance 19
## Module 05 : Structure itérative complète
### Thème : Algorithmes de Contrôle d'Intégrité ("Check_card") & Analyse de Monotonie

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
| **Prérequis** | Parcours de chaînes, accumulateurs, indicateurs booléens |

---

## 🎯 2. Compétences & Objectifs Opérationnels

### Compétences visées :
* **Compétence de sécurité informatique & intégrité des données** : Comprendre le principe d'une clé de contrôle (checksum) utilisée dans les cartes bancaires, cartes de fidélité et codes-barres.
* **Compétence d'analyse séquentielle** : Comparer deux éléments consécutifs d'une séquence pour statuer sur sa monotonie.

### Objectifs opérationnels (À l'issue de la séance, l'élève sera capable de) :
1. **Implémenter** un algorithme de somme de contrôle pondérée selon la parité de l'indice (Exercice 10).
2. **Détecter** si une suite de nombres ou de caractères est strictement croissante ou décroissante (Exercice 11).
3. **Structurer** une réponse claire indiquant la validité globale d'un code saisi.

---

## ⏱️ 3. Scénario Pédagogique & Déroulement Minuté

```
┌──────────────────────────────────────────────────────────────────────────────┐
│  00 - 15 min : Phase 1 - Accroche : Comment la machine sait qu'un code est faux?│
│  15 - 35 min : Phase 2 - Cours : Clé de contrôle & Formule de Luhn simplifiée │
│  35 - 55 min : Phase 3 - Exercice 10 : Algorithme de validation "Check_card"  │
│  55 - 75 min : Phase 4 - Exercice 11 : Détection de monotonie (croissante/décr)│
│  75 - 80 min : Phase 5 - Synthèse, trace écrite & préparation du Défi Final   │
└──────────────────────────────────────────────────────────────────────────────┘
```

---

## 📖 4. Contenu Didactique & Support de Cours

### 1. Le Principe de la Clé de Contrôle (*Checksum*)
Pour s'assurer qu'un numéro de carte ou de compte saisi par l'utilisateur ne comporte aucune erreur de frappe :
* On applique un calcul pondéré sur les chiffres du numéro.
* Le résultat modulo un entier (généralement 10 ou 11) doit être égal au dernier chiffre de contrôle.

### 2. L'Analyse de Monotonie d'une Suite
Une séquence de valeurs est dite :
* **Strictement croissante** : si pour tout indice $i$, $\text{élément}[i] < \text{élément}[i+1]$.
* **Strictement décroissante** : si pour tout indice $i$, $\text{élément}[i] > \text{élément}[i+1]$.

---

## 🧩 5. Fiche Activités & Corrigés Détaillés

### 🔴 Exercice 10 : Carte de Fidélité ("Check_card")
* **Énoncé** : Une carte de fidélité comporte 8 chiffres (ex: `"45127834"`). Pour être valide :
  * On calcule la somme pondérée $S$ :
    * Les chiffres d'indice pair ($0, 2, 4, 6$) sont multipliés par 1.
    * Les chiffres d'indice impair ($1, 3, 5, 7$) sont multipliés par 2.
  * La carte est **valide** si la somme totale $S$ est un **multiple de 10** ($S \mathbin{\text{mod}} 10 = 0$).
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

### 🟡 Exercice 11 : Analyse de Monotonie
* **Énoncé** : Saisir une chaîne de chiffres `seq` de longueur au moins 3. Déterminer si les chiffres progressent de manière strictement croissante, strictement décroissante, ou ni l'un ni l'autre (désordonnée).
* **Code Python** :
```python
seq = input("Donner une séquence de chiffres (au moins 3) : ")

if len(seq) < 3:
    print("Erreur : Veuillez entrer au moins 3 chiffres.")
else:
    est_croissant = True
    est_decroissant = True

    # Comparaison de chaque chiffre avec son successeur direct
    for i in range(len(seq) - 1):
        c_actuel = int(seq[i])
        c_suivant = int(seq[i + 1])

        if c_actuel >= c_suivant:
            est_croissant = False
        if c_actuel <= c_suivant:
            est_decroissant = False

    if est_croissant:
        print(f"📈 La suite '{seq}' est STRICTEMENT CROISSANTE.")
    elif est_decroissant:
        print(f"📉 La suite '{seq}' est STRICTEMENT DÉCROISSANTE.")
    else:
        print(f"🔀 La suite '{seq}' n'est NI croissante NI décroissante (monotonie quelconque).")
```

---

## 📝 6. Trace Écrite pour le Cahier de l'Élève

```markdown
CHAPITRE 5 : LA STRUCTURE ITÉRATIVE (Partie 5 : Contrôle & Monotonie)

1. Contrôle d'intégrité (Check_card) :
   Parcours des chiffres avec pondération selon l'indice :
   - Indice pair (i % 2 == 0)   ➔ somme += chiffre * 1
   - Indice impair (i % 2 != 0) ➔ somme += chiffre * 2
   - Test final : (somme % 10 == 0)

2. Test de Monotonie :
   On compare chaque élément ch[i] avec son voisin ch[i + 1].
   Attention : La boucle s'arrête impérativement à len(ch) - 2 
   pour éviter l'erreur de dépassement d'indice (IndexError) !
```

---

## ❓ 7. Auto-Évaluation Formative (5 Questions)

1. **Pourquoi la boucle de monotonie va-t-elle jusqu'à `len(seq) - 1` ?**  
   *Réponse* : Parce qu'on examine `seq[i + 1]`. Si la boucle allait jusqu'à la fin, `i + 1` dépasserait la taille de la chaîne.
2. **La séquence `"13579"` est-elle strictement croissante ?**  
   *Réponse* : Oui, chaque chiffre est strictement supérieur au précédent.
3. **La séquence `"1223"` est-elle strictement croissante ?**  
   *Réponse* : Non, à cause de la répétition des deux `2` (elle est croissante au sens large, mais pas strictement croissante).
4. **Quelle est la somme pondérée pour la carte `"12345678"` ?**  
   *Réponse* : $(1\times1 + 2\times2) + (3\times1 + 4\times2) + (5\times1 + 6\times2) + (7\times1 + 8\times2) = 5 + 11 + 17 + 23 = \mathbf{56}$. Carte invalide ($56 \mathbin{\text{mod}} 10 = 6 \ne 0$).
5. **Quelle est l'utilité pratique des sommes de contrôle ?**  
   *Réponse* : Détecter instantanément les erreurs de saisie ou de transmission de données sans interroger une base distante.

---

## 🚀 8. Préparation de la Séance 20 (Synthèse Globale)
* **Thème** : *Défi pratique de synthèse intégrant les 5 modules du programme*.
* **À réviser** : L'ensemble des notions de l'année (E/T/S, variables, types numériques, chaînes, conditions, boucles).
