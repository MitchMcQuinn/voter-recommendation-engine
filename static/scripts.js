let projects = [];
let citizens = [];
let voterAllocation = [];

// Function to add a new project
function addProject() {
    const projectName = prompt('Enter Project Name:');
    if (projectName) {
        projects.push(projectName);
        updateProjectsTable();
        updateCitizensTableHeaders();
        updateVoterTable();
    }
}

// Function to update the projects table
function updateProjectsTable() {
    const tableBody = document.querySelector('#projects-table tbody');
    tableBody.innerHTML = '';
    projects.forEach((project, index) => {
        const row = document.createElement('tr');

        // Project Name Cell
        const nameCell = document.createElement('td');
        nameCell.textContent = project;
        row.appendChild(nameCell);

        // Action Cell
        const actionCell = document.createElement('td');
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.onclick = () => deleteProject(index);
        actionCell.appendChild(deleteButton);
        row.appendChild(actionCell);

        tableBody.appendChild(row);
    });
}

// Function to delete a project
function deleteProject(index) {
    projects.splice(index, 1);
    updateProjectsTable();
    updateCitizensTableHeaders();
    updateCitizensAllocations();
    updateVoterTable();
}

// Function to add a new citizen
function addCitizen() {
    const citizenName = prompt('Enter Citizen Name:');
    if (citizenName) {
        const allocations = projects.map(() => 0);
        citizens.push({ name: citizenName, allocations });
        updateCitizensTable();
    }
}

// Function to update the citizens table headers
function updateCitizensTableHeaders() {
    const headerRow = document.querySelector('#citizens-table thead tr');
    headerRow.innerHTML = '<th>Citizen Name</th>';
    projects.forEach((project) => {
        const th = document.createElement('th');
        th.textContent = project;
        headerRow.appendChild(th);
    });
}

// Function to update the citizens table
function updateCitizensTable() {
    updateCitizensTableHeaders();
    const tableBody = document.querySelector('#citizens-table tbody');
    tableBody.innerHTML = '';
    citizens.forEach((citizen, citizenIndex) => {
        const row = document.createElement('tr');

        // Citizen Name Cell
        const nameCell = document.createElement('td');
        nameCell.textContent = citizen.name;
        row.appendChild(nameCell);

        // Allocation Cells
        projects.forEach((project, projectIndex) => {
            const allocationCell = document.createElement('td');
            allocationCell.innerHTML = `<input type="number" min="0" max="100" value="${citizen.allocations[projectIndex]}"
                onchange="updateCitizenAllocation(${citizenIndex}, ${projectIndex}, this.value)">`;
            row.appendChild(allocationCell);
        });

        tableBody.appendChild(row);
    });
}

// Function to update citizen allocation
function updateCitizenAllocation(citizenIndex, projectIndex, value) {
    citizens[citizenIndex].allocations[projectIndex] = parseFloat(value) || 0;
}

// Function to update citizens allocations when projects change
function updateCitizensAllocations() {
    citizens.forEach((citizen) => {
        citizen.allocations = projects.map(() => 0);
    });
    updateCitizensTable();
}

// Function to update the voter table
function updateVoterTable() {
    const tableBody = document.querySelector('#voter-table tbody');
    tableBody.innerHTML = '';
    voterAllocation = projects.map(() => 0);
    projects.forEach((project, index) => {
        const row = document.createElement('tr');

        // Project Name Cell
        const projectCell = document.createElement('td');
        projectCell.textContent = project;
        row.appendChild(projectCell);

        // Allocation Cell
        const allocationCell = document.createElement('td');
        allocationCell.innerHTML = `<input type="number" min="0" max="100" value="0"
            onchange="updateVoterAllocation(${index}, this.value)">`;
        row.appendChild(allocationCell);

        tableBody.appendChild(row);
    });
}

// Function to update voter allocation
function updateVoterAllocation(projectIndex, value) {
    voterAllocation[projectIndex] = parseFloat(value) || 0;
}

// Function to compute the allocation
function computeAllocation() {
    // Prepare the data
    const citizenAllocations = citizens.map((citizen) => {
        return citizen.allocations.map((alloc) => alloc / 100);
    });
    const voterAlloc = voterAllocation.map((alloc) => alloc / 100);

    // Send data to the backend
    fetch('/compute', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            citizens: citizenAllocations,
            voter: voterAlloc
        })
    })
    .then(response => response.json())
    .then(data => displayResults(data))
    .catch(error => console.error('Error:', error));
}

// Function to display results
function displayResults(data) {
    const resultsDiv = document.getElementById('results');
    resultsDiv.innerHTML = '';

    // Check for issues
    let issuesHTML = '';
    data.issues.citizen_sums.forEach((sum, index) => {
        if (Math.abs(sum - 1) > 0.01) {
            issuesHTML += `<p style="color:red;">Citizen ${citizens[index].name}'s allocations do not sum up to 100%</p>`;
        }
    });
    if (Math.abs(data.issues.voter_sum - 1) > 0.01) {
        issuesHTML += `<p style="color:red;">Voter's allocations do not sum up to 100%</p>`;
    }
    resultsDiv.innerHTML += issuesHTML;

    // Optimal Weights
    let weightsHTML = '<h3>Optimal Weights for Citizens</h3><ul>';
    data.optimal_weights.forEach((weight, index) => {
        weightsHTML += `<li>${citizens[index].name}: ${(weight * 100).toFixed(2)}%</li>`;
    });
    weightsHTML += '</ul>';
    resultsDiv.innerHTML += weightsHTML;

    // Adjusted Allocation
    let allocationHTML = '<h3>Adjusted Allocation (as percentages)</h3><ul>';
    data.adjusted_allocation.forEach((alloc, index) => {
        allocationHTML += `<li>${projects[index]}: ${(alloc * 100).toFixed(2)}%</li>`;
    });
    allocationHTML += '</ul>';
    resultsDiv.innerHTML += allocationHTML;
}