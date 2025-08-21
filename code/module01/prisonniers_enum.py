import itertools

n = 8
nombres = list(range(1, n + 1))
permutations = list(itertools.permutations(nombres))
max_attempts = n // 2

# Afficher les permutations
num_simulations = 0
success_count = 0
for i, p in enumerate(permutations, 1):
    # print(f"{i}: {p}")
    num_simulations += 1
    drawers = p

    all_success = True
    for prisoner in range(1, n+1):
        attempts = 0
        current_drawer = prisoner
        while attempts < max_attempts:
            found_number = drawers[current_drawer - 1]
            if found_number == prisoner:
                break
            else:
                current_drawer = found_number
                attempts += 1
        else:
            all_success = False
            break

    if all_success:
        # print(f"{i}: {p}")
        success_count += 1

success_rate = (success_count / num_simulations) * 100
print(f"Success rate over {success_count} / {num_simulations} simulations: {success_rate:.2f}%")