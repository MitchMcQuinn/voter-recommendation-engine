"""
Voter Recommendation Engine

This script computes the adjusted allocation that best matches the voter's desired allocation
by solving a convex optimization problem.
"""

import numpy as np
import cvxpy as cp

def main():
    # Citizens' allocations (percentages converted to decimals)
    C = np.array([
        [6.97, 13.95, 9.30, 18.61, 9.30, 9.30, 13.95, 18.61],
        [7.00, 9.00, 12.00, 26.00, 9.00, 9.00, 22.00, 6.00],
        [7.00, 8.00, 15.00, 25.00, 5.00, 10.00, 20.00, 10.00],
        [5.16, 5.16, 10.32, 30.95, 8.60, 8.60, 19.35, 11.88],
        [9.30, 7.56, 9.30, 24.92, 7.98, 8.98, 19.18, 12.79],
        [6.41, 8.73, 11.18, 24.02, 8.01, 8.01, 21.62, 12.01]
    ]) / 100  # Convert percentages to decimals

    # Voter's desired allocation (example values summing to 100%)
    V = np.array([0.12, 0.10, 0.10, 0.20, 0.10, 0.10, 0.20, 0.10])

    # Number of citizens and projects
    num_citizens, num_projects = C.shape

    # Decision variables: weights for each citizen
    w = cp.Variable(num_citizens)

    # Adjusted allocation A as a weighted sum of citizens' allocations
    A = C.T @ w  # Transpose C to align dimensions

    # Objective: Minimize the squared Euclidean distance between A and V
    objective = cp.Minimize(cp.sum_squares(A - V))

    # Constraints
    constraints = [
        w >= 0,            # Non-negative weights
        cp.sum(w) == 1     # Weights sum to 1
    ]

    # Define the problem
    problem = cp.Problem(objective, constraints)

    # Solve the problem
    problem.solve()

    # Retrieve the optimal weights and adjusted allocation
    optimal_weights = w.value
    adjusted_allocation = C.T @ optimal_weights

    # Display the results
    display_allocations(optimal_weights, adjusted_allocation, V)

def display_allocations(weights, allocation, voter_allocation):
    print("Optimal Weights for Citizens:")
    for i, weight in enumerate(weights):
        print(f"C{i+1}: {weight:.4f}")

    print("\nAdjusted Allocation (as percentages):")
    for j, alloc in enumerate(allocation):
        print(f"P{j+1}: {alloc * 100:.2f}%")

    print("\nVoter's Desired Allocation (as percentages):")
    for j, alloc in enumerate(voter_allocation):
        print(f"P{j+1}: {alloc * 100:.2f}%")

if __name__ == "__main__":
    main()
