// Monthly Spending

let monthlySpending = JSON.parse(localStorage.getItem('monthlySpending')) || [];
let spendingTitles = JSON.parse(localStorage.getItem('spendingTitles')) || [];
let totalSpending = parseFloat(localStorage.getItem('totalSpending')) || 0;

function addSpending() {
    const amountInput = document.getElementById('amount');
    const amount = parseFloat(amountInput.value);

    if (!isNaN(amount) && amount > 0) {
        monthlySpending.push(amount);

        totalSpending += amount;

        updateUI();
        saveDataToLocalStorage();

        amountInput.value = '';
    } else {
        alert('Please enter a valid amount greater than 0.');
    }
}

function assignTitle() {
    const titleInput = document.getElementById('item');

    if (titleInput.value !== '') {
        spendingTitles.push(titleInput.value);

        updateUI();
        saveDataToLocalStorage();

        titleInput.value = '';
    } else {
        alert('Please provide a valid entry');
    }
}

function addAndAssign() {
    addSpending();
    assignTitle();
}

function updateUI() {
    const listContainer = document.getElementById('list');
    const totalContainer = document.getElementById('total');

    listContainer.innerHTML = '';

    for (let i = 0; i < monthlySpending.length; i++) {
        const listItem = document.createElement('li');
        const titleValue = spendingTitles[i] || 'No Title';
        const amount = monthlySpending[i];
        listItem.textContent = `${titleValue}: $${amount.toFixed(2)}`;
        listContainer.appendChild(listItem);
    }

    totalContainer.textContent = totalSpending.toFixed(2);
}

function saveDataToLocalStorage() {
    localStorage.setItem('monthlySpending', JSON.stringify(monthlySpending));
    localStorage.setItem('spendingTitles', JSON.stringify(spendingTitles));
    localStorage.setItem('totalSpending', totalSpending);
}

function monthlyReset() {
    const currentDate = new Date();
    if (currentDate.getDate() === 1) {
        localStorage.clear();
        monthlySpending = [];
        spendingTitles = [];
        totalSpending = 0;
        updateUI();
    }
}

monthlyReset();
updateUI();




// Income Manager

let monthlyTotal = 0;
let pastIncomeList = [];

function addIncome() {
    const incomeSource = document.getElementById("incomeSource").value;
    const incomeAmount = parseFloat(document.getElementById("incomeAmount").value);
    const incomeFrequency = document.getElementById("incomeFrequency").value;

    if (incomeSource && !isNaN(incomeAmount)) {
        monthlyTotal += incomeAmount;

        document.getElementById("monthlyTotal").innerText = monthlyTotal.toFixed(2);

        pastIncomeList.push({
            source: incomeSource,
            amount: incomeAmount,
            frequency: incomeFrequency
        });

        displayPastIncome();

        document.getElementById("incomeSource").value = "";
        document.getElementById("incomeAmount").value = "";
    } else {
        alert("Please enter both income source and amount.");
    }
}

function displayPastIncome() {
    const pastIncomeListElement = document.getElementById("pastIncomeList");
    pastIncomeListElement.innerHTML = "";

    pastIncomeList.forEach((income) => {
        const listItem = document.createElement("li");
        listItem.textContent = `${income.source}: $${income.amount.toFixed(2)} (${income.frequency})`;
        pastIncomeListElement.appendChild(listItem);
    });
}

function resetMonthly() {
    pastIncomeList = [];
    displayPastIncome();
}

const currentDate = new Date();
if (currentDate.getDate() === 1) {
    resetMonthly();
}

function addRepeatingIncome(income) {
    if (income.frequency === 'weekly') {
        for (let i = 1; i < 4; i++) {
            const nextIncomeDate = new Date();
            nextIncomeDate.setDate(currentDate.getDate() + i * 7);
            pastIncomeList.push({
                source: income.source,
                amount: income.amount,
                frequency: income.frequency,
                date: nextIncomeDate
            });
        }
    } else if (income.frequency === 'bi-weekly') {
        for (let i = 1; i < 2; i++) {
            const nextIncomeDate = new Date();
            nextIncomeDate.setDate(currentDate.getDate() + i * 14);
            pastIncomeList.push({
                source: income.source,
                amount: income.amount,
                frequency: income.frequency,
                date: nextIncomeDate
            });
        }
    }
    displayPastIncome();
}

function processRepeatingIncome() {
    pastIncomeList.forEach((income) => {
        if (income.frequency !== 'one-time') {
            addRepeatingIncome(income);
        }
    });
}

processRepeatingIncome();



// Bill Manager