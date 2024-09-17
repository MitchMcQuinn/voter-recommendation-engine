# Voter Recommendation Engine

This project implements a Voter Recommendation Engine that computes an adjusted allocation that best matches a voter's desired allocation by solving a convex optimization problem.

A convex optimization problem is a type of mathematical problem where the goal is to find the best solution from a set of possible solutions, subject to certain constraints. In simple terms, it's like finding the lowest point in a smooth, bowl-shaped landscape. The "convex" part means that there are no hidden valleys or pits – just one global minimum that we're trying to find.

In our case, we're using convex optimization to find the best way to combine different citizens' allocations to match a voter's preferences as closely as possible. This approach guarantees that we find the best possible solution efficiently, making it ideal for our Voter Recommendation Engine.

## Overview

The Voter Recommendation Engine takes input from multiple citizens' allocations and a voter's desired allocation, then calculates an optimal weighted combination of the citizens' allocations to closely match the voter's preferences.

## Features

- Utilizes convex optimization to find the best match between citizens' allocations and voter's desired allocation
- Handles multiple projects and citizens
- Provides optimal weights for each citizen's allocation
- Displays the adjusted allocation alongside the voter's desired allocation

## Requirements

- Python 3.x
- NumPy
- CVXPY

## Usage

1. Ensure you have the required dependencies installed:
   ```
   pip install numpy cvxpy
   ```

2. Run the script:
   ```
   python src/voter_allocation.py
   ```

3. The script will output:
   - Optimal weights for each citizen
   The script calculates and displays the optimal weight assigned to each citizen's allocation. These weights represent the proportion of influence each citizen's preferences have on the final adjusted allocation. The weights are non-negative and sum to 1, ensuring a valid combination of citizens' allocations.

   - Adjusted allocation (as percentages)
   Based on the optimal weights, the script computes an adjusted allocation that best matches the voter's desired allocation. This adjusted allocation is displayed as percentages for each project, making it easy to compare with the original allocations. It represents the recommended distribution of resources across projects that most closely aligns with the voter's preferences while considering the input from all citizens.

   - Voter's desired allocation (as percentages)
   The script shows the voter's initial desired allocation for each project as percentages. This serves as a reference point to compare against the adjusted allocation, allowing the voter to see how closely the recommendation matches their original preferences. It helps in understanding the trade-offs made by the optimization process to find a feasible solution that considers all citizens' inputs.

## How it Works

1. The script defines citizens' allocations and a voter's desired allocation.
2. It uses CVXPY to set up and solve a convex optimization problem.
3. The objective is to minimize the squared Euclidean distance between the adjusted allocation and the voter's desired allocation.
4. Constraints ensure that weights are non-negative and sum to 1.
5. The optimal weights and adjusted allocation are computed and displayed.

## Customization

To use your own data:
1. Modify the `C` array in the `main()` function to include your citizens' allocations.
2. Update the `V` array with the voter's desired allocation.
