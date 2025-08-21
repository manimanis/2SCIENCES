import random

num_prisoners = 20
max_attempts = num_prisoners // 2
num_simulations = 10000
success_count = 0

for _ in range(num_simulations):
    # Générer une permutation aléatoire des tiroirs
    drawers = list(range(num_prisoners))
    random.shuffle(drawers)

    all_success = True
    for prisoner in range(num_prisoners):
        attempts = 0
        current_drawer = prisoner
        while attempts < max_attempts:
            found_number = drawers[current_drawer]
            if found_number == prisoner:
                break
            else:
                current_drawer = found_number
                attempts += 1
        else:
            all_success = False
            break

    if all_success:
        success_count += 1

success_rate = (success_count / num_simulations) * 100
print(f"Success rate over {num_simulations} simulations: {success_rate:.2f}%")

