//saving goals

let goals = [];

document.addEventListener('DOMContentLoaded', () => {
    const savedGoals = localStorage.getItem('goals');
    if (savedGoals) {
        goals = JSON.parse(savedGoals);
        updateGoalList();
    }
});

function saveGoalsToLocalStorage() {
    localStorage.setItem('goals', JSON.stringify(goals));
}

function createGoal() {
    const goalName = document.getElementById('goal-name').value;
    const goalValue = parseInt(document.getElementById('goal-value').value);

    if (!goalName || isNaN(goalValue) || goalValue <= 0) {
        alert('Please enter valid goal name and value.');
        return;
    }

    goals.push({ name: goalName, value: goalValue, progress: 0 });

    updateGoalList();
    resetGoalForm();

    saveGoalsToLocalStorage();
}

function trackInvestment() {
    const investmentAmount = parseInt(document.getElementById('investment-amount').value);
    const selectedGoalIndex = document.getElementById('goal-list').selectedIndex;

    if (isNaN(investmentAmount) || investmentAmount <= 0 || selectedGoalIndex === -1) {
        alert('Please enter a valid investment amount and select a goal.');
        return;
    }

    const selectedGoal = goals[selectedGoalIndex];
    selectedGoal.progress += (investmentAmount / selectedGoal.value) * 100;

    if (selectedGoal.progress > 100) {
        selectedGoal.progress = 100;
    }

    updateGoalList();
    resetInvestmentForm();

    saveGoalsToLocalStorage();
}

function updateGoalList() {
    const goalListSelect = document.getElementById('goal-list');
    goalListSelect.innerHTML = "";

    goals.forEach((goal, index) => {
        const option = document.createElement('option');
        option.value = index;
        option.text = goal.name;
        goalListSelect.add(option);
    });

    goals.forEach((goal, index) => {
        const goalContainer = document.getElementById(`goal-${index}`);
        if (!goalContainer) {
            createGoalContainer(index);
        }
        updateProgressBar(index);
    });

    saveGoalsToLocalStorage();
}

function createGoalContainer(index) {
    const goalContainer = document.createElement('div');
    goalContainer.classList.add('goal-container');
    goalContainer.id = `goal-${index}`;

    const goalTitle = document.createElement('h3');
    goalTitle.innerText = goals[index].name;

    const progressBar = document.createElement('progress');
    progressBar.value = goals[index].progress;
    progressBar.max = 100;

    const progressText = document.createElement('p');
    goalContainer.appendChild(goalTitle);
    goalContainer.appendChild(progressBar);
    goalContainer.appendChild(progressText);

    document.body.appendChild(goalContainer);
}

function updateProgressBar(index) {
    const progressBar = document.querySelector(`#goal-${index} progress`);
    const progressText = document.querySelector(`#goal-${index} p`);

    progressBar.value = goals[index].progress;
    progressText.innerHTML = `${goals[index].progress.toFixed(2)}% Complete<br>(${(goals[index].progress / 100 * goals[index].value).toFixed(2)} / ${goals[index].value})`;
}

function resetGoalForm() {
    document.getElementById('goal-name').value = "";
    document.getElementById('goal-value').value = "";
}

function resetInvestmentForm() {
    document.getElementById('investment-amount').value = "";
}


