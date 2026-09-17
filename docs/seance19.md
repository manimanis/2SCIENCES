# 📝 Fiche Pédagogique – Séance 19
## Module 05 : Structure itérative complète
### Thème : Analyse de Monotonie & Comparaisons Itératives Avancées via la boucle `Pour`

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
| **Prérequis** | Boucle `Pour`, indexation de chaînes, opérateurs relationnels, booléens |

---

## 🎯 2. Compétences & Objectifs Opérationnels

### Compétences visées :
* **Compétence d'analyse séquentielle** : Comparer deux éléments consécutifs d'une séquence pour statuer sur sa monotonie globale.
* **Compétence de gestion des bornes d'indices** : Éviter les dépassements d'index (`IndexError`) lors de la consultation de l'élément suivant `seq[i+1]`.

### Objectifs opérationnels (À l'issue de la séance, l'élève sera capable de) :
1. **Formaliser** la condition de monotonie stricte croissante ($c_i < c_{i+1}$) et décroissante ($c_i > c_{i+1}$).
2. **Paramétrer correctement** la borne de fin de la boucle `Pour` (`range(len(seq) - 1)`).
3. **Utiliser des variables drapeaux** (`est_croissant`, `est_decroissant`) initialisées à `Vrai`.
4. **Construire un tableau de trace** pas-à-pas pour suivre les comparaisons successives.

---

## ⏱️ 3. Scénario Pédagogique & Déroulement Minuté (Séance de 60 min)

```
┌─────────────────────────────────────────────────────────────────────────────────────┐
│  00 - 10 min : Phase 1 - Défi : Comment savoir si une suite progresse toujours ?    │
│  10 - 25 min : Phase 2 - Cours : Comparaison de voisins seq[i]/seq[i+1] & indices   │
│  25 - 42 min : Phase 3 - Exercice 11 : Algorithme complet de monotonie              │
│  42 - 55 min : Phase 4 - Atelier Playground : Tableaux de trace & cas limites       │
│  55 - 60 min : Phase 5 - Synthèse, trace écrite & préparation du Défi Final         │
└─────────────────────────────────────────────────────────────────────────────────────┘
```

---

## 📖 4. Contenu Didactique & Support de Cours

### 1. Définition de la Monotonie d'une Suite
Une suite de valeurs est dite :
* **Strictement croissante** : si pour tout indice $i$, $\text{élément}[i] < \text{élément}[i+1]$.
* **Strictement décroissante** : si pour tout indice $i$, $\text{élément}[i] > \text{élément}[i+1]$.
* **Quelconque** : dès qu'il existe à la fois des montées et des descentes ou des éléments consécutifs égaux.

### 2. La Règle d'Or des Indices Voisins
Lorsqu'on compare `seq[i]` avec `seq[i+1]` :
* Si la chaîne compte $N$ éléments, le dernier indice valide est $N - 1$.
* Par conséquent, pour que `i + 1` ne dépasse jamais $N - 1$, l'indice $i$ doit s'arrêter à :
  $$i_{\max} = N - 2 \implies \text{en Python : } \text{range}(\text{len}(seq) - 1)$$

---

## 🧩 5. Fiche Activités & Corrigés Détaillés

### 🔴 Exercice 11 : Analyse de Monotonie
* **Énoncé** : Saisir une chaîne de chiffres `seq` de longueur au moins 3. Déterminer si les chiffres progressent de manière strictement croissante, strictement décroissante, ou ni l'un ni l'autre.

* **Algorithme en pseudo-code** :
```algorithm
Algorithme Monotonie_Sequence
Début
   Ecrire("Donner une séquence de chiffres (au moins 3) : ")
   Lire(seq)
   n ← long(seq)

   Si n < 3 Alors
      Ecrire("Erreur : La séquence doit comporter au moins 3 chiffres !")
   Sinon
      croissant ← Vrai
      decroissant ← Vrai

      Pour i De 0 À n - 2 Faire
         c_actuel ← Valeur(seq[i])
         c_suivant ← Valeur(seq[i + 1])

         Si c_actuel >= c_suivant Alors
            croissant ← Faux
         FinSi
         Si c_actuel <= c_suivant Alors
            decroissant ← Faux
         FinSi
      FinPour

      Si croissant Alors
         Ecrire("📈 La suite est STRICTEMENT CROISSANTE.")
      SinonSi decroissant Alors
         Ecrire("📉 La suite est STRICTEMENT DÉCROISSANTE.")
      Sinon
         Ecrire("🔀 La suite n'est NI croissante NI décroissante.")
      FinSi
   FinSi
Fin
```

* **Code Python validé pour le Playground** :
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
CHAPITRE 5 : LA STRUCTURE ITÉRATIVE (Partie 6 : Analyse de Monotonie)

1. Test de Monotonie par comparaison de voisins :
   On compare chaque élément ch[i] avec son successeur direct ch[i + 1].
   Attention : La boucle s'arrête impérativement à len(ch) - 1 en Python
   (c'est-à-dire jusqu'à l'indice len(ch) - 2 inclus).

2. Les drapeaux (flags) :
   - On suppose au départ que la propriété est vraie (flag = True).
   - Dès qu'un contre-exemple est rencontré, le drapeau bascule à False.
```

---

## ❓ 7. Auto-Évaluation Formative (5 Questions)

1. **Pourquoi la boucle s'arrête-t-elle à `len(seq) - 1` ?**  
   *Réponse* : Pour éviter l'erreur `IndexError` lors de l'accès à `seq[i + 1]`.
2. **La séquence `"13579"` est-elle strictement croissante ?**  
   *Réponse* : Oui, chaque chiffre est strictement supérieur au précédent.
3. **La séquence `"1223"` est-elle strictement croissante ?**  
   *Réponse* : Non, à cause des deux `2` consécutifs (elle est croissante large, non stricte).
4. **Si l'utilisateur saisit `"97531"`, quel sera le résultat ?**  
   *Réponse* : Strictement décroissante.
5. **Si l'utilisateur saisit `"1537"`, quel sera le résultat ?**  
   *Réponse* : Ni croissante ni décroissante.

---

## 🚀 8. Préparation de la Séance Suivante (Séance 20)
* **Thème** : *Module 05 – Séance 20 : Structure Itérative « Pour » & Intégration des Modules Précédents (Défi BioPass)*.
* **À réviser** : Boucles `Pour`, conditions, chaînes, codes ASCII (`ord`/`chr`) et analyse E/T/S.
