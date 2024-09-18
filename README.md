# Voter Recommendation Engine

This project implements a Voter Recommendation Engine that computes an adjusted allocation that best matches a voter's desired allocation by solving a convex optimization problem.

A convex optimization problem is a type of mathematical problem where the goal is to find the best solution from a set of possible solutions, subject to certain constraints. In simple terms, it's like finding the lowest point in a smooth, bowl-shaped landscape. The "convex" part means that there are no hidden valleys or pits – just one global minimum that we're trying to find.

In our case, we're using convex optimization to find the best way to combine different citizens' allocations to match a voter's preferences as closely as possible. This approach guarantees that we find the best possible solution efficiently, making it ideal for our Voter Recommendation Engine.

## Overview

The Voter Recommendation Engine takes input from multiple citizens' allocations and a voter's desired allocation, then calculates an optimal weighted combination of the citizens' allocations to closely match the voter's preferences. The project now includes a web interface for easy interaction with the engine.

## Features

- Utilizes convex optimization to find the best match between citizens' allocations and voter's desired allocation
- Handles multiple projects and citizens
- Provides optimal weights for each citizen's allocation
- Displays the adjusted allocation alongside the voter's desired allocation
- Web interface for inputting data and visualizing results

## Requirements

- Python 3.x
- NumPy
- CVXPY
- Flask

## Installation

1. Clone the repository:
   ```
   git clone https://github.com/yourusername/voter-recommendation-engine.git
   cd voter-recommendation-engine
   ```

2. Install the required dependencies:
   ```
   pip install numpy cvxpy flask
   ```

## Usage

1. Start the Flask server:
   ```
   python src/app.py
   ```

2. Open a web browser and navigate to `http://localhost:5001` (or the port specified in the console output).

3. Use the web interface to:
   - Input citizens' allocations
   - Enter the voter's desired allocation
   - Compute and view the optimal weights and adjusted allocation

## How it Works

1. The script defines citizens' allocations and a voter's desired allocation.
2. It uses CVXPY to set up and solve a convex optimization problem.
3. The objective is to minimize the squared Euclidean distance between the adjusted allocation and the voter's desired allocation.
4. Constraints ensure that weights are non-negative and sum to 1.
5. The optimal weights and adjusted allocation are computed and displayed.

## Customization

To use your own data in the web interface:
1. Enter the citizens' allocations in the provided input fields.
2. Enter the voter's desired allocation.
3. Click the "Compute" button to see the results.

## Project Structure

- `src/voter_allocation.py`: Contains the core logic for computing optimal allocations.
- `src/app.py`: Flask application serving the web interface.
- `templates/index.html`: HTML template for the web interface.
- `static/`: Directory for static files (CSS, JavaScript, etc.)

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the LICENSE file for details.
