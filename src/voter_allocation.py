"""
Voter Recommendation Engine

This script computes the adjusted allocation that best matches the voter's desired allocation
by solving a convex optimization problem.
"""

import numpy as np
import cvxpy as cp

def compute_optimal_allocation(C, V):
    num_citizens, num_projects = C.shape

    # Decision variables: weights for each citizen
    w = cp.Variable(num_citizens)

    # Adjusted allocation A as a weighted sum of citizens' allocations
    A = C.T @ w

    # Objective: Minimize the squared Euclidean distance between A and V
    objective = cp.Minimize(cp.sum_squares(A - V))

    # Constraints
    constraints = [
        w >= 0,            # Non-negative weights
        cp.sum(w) == 1     # Weights sum to 1
    ]

    # Define and solve the problem
    problem = cp.Problem(objective, constraints)
    problem.solve()

    # Retrieve the optimal weights and adjusted allocation
    optimal_weights = w.value
    adjusted_allocation = C.T @ optimal_weights

    return optimal_weights, adjusted_allocation
