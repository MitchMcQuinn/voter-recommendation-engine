from flask import Flask, render_template, request, jsonify
import numpy as np
from voter_allocation import compute_optimal_allocation

app = Flask(__name__, 
            template_folder='//Users/mitchie/Documents/Voter Recommendation Engine/voter-recommendation-engine/templates', 
            static_folder='/Users/mitchie/Documents/Voter Recommendation Engine/voter-recommendation-engine/static')

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/compute', methods=['POST'])
def compute():
    data = request.get_json()
    C = np.array(data['citizens'])
    V = np.array(data['voter'])

    # Normalize allocations to ensure they sum to 1
    C = C / np.sum(C, axis=1, keepdims=True)
    V = V / np.sum(V)

    optimal_weights, adjusted_allocation = compute_optimal_allocation(C, V)

    # Check if allocations sum to 1
    issues = {
        'citizen_sums': np.sum(C, axis=1).tolist(),
        'voter_sum': np.sum(V)
    }

    response = {
        'optimal_weights': optimal_weights.tolist(),
        'adjusted_allocation': adjusted_allocation.tolist(),
        'issues': issues
    }

    return jsonify(response)

if __name__ == '__main__':
    app.run(debug=True, port=5001)  # or any other available port


