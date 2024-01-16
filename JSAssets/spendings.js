// Spontaneous Spending Tracker

document.addEventListener('DOMContentLoaded', function () {
    loadFromStorage();
});

function addPurchase() {
    var nameInput = document.getElementById('purchaseName');
    var amountInput = document.getElementById('purchaseAmount');

    var name = nameInput.value.trim();
    var amount = parseFloat(amountInput.value);

    if (name === '' || isNaN(amount) || amount <= 0) {
        alert('Please enter valid purchase details.');
        return;
    }

    var purchase = {
        name: name,
        amount: amount
    };

    addPurchaseToList(purchase);

    updateMonthlyTotal(amount);

    nameInput.value = '';
    amountInput.value = '';

    saveToStorage();
}

function addPurchaseToList(purchase) {
    var purchaseList = document.getElementById('purchaseList');
    var listItem = document.createElement('li');
    listItem.textContent = purchase.name + ': $' + purchase.amount.toFixed(2);
    purchaseList.appendChild(listItem);
}

function updateMonthlyTotal(amount) {
    var monthlyTotalElement = document.getElementById('monthlyTotal');
    var currentTotal = parseFloat(monthlyTotalElement.textContent);
    var newTotal = currentTotal + amount;
    monthlyTotalElement.textContent = newTotal.toFixed(2);
}

function saveToStorage() {
    var purchases = [];
    var purchaseList = document.getElementById('purchaseList');
    var listItems = purchaseList.getElementsByTagName('li');

    for (var i = 0; i < listItems.length; i++) {
        var purchaseText = listItems[i].textContent;
        var name = purchaseText.split(':')[0].trim();
        var amount = parseFloat(purchaseText.split('$')[1]);
        purchases.push({ name: name, amount: amount });
    }

    localStorage.setItem('purchases', JSON.stringify(purchases));
}

function loadFromStorage() {
    var purchases = JSON.parse(localStorage.getItem('purchases')) || [];

    var monthlyTotalElement = document.getElementById('monthlyTotal');
    var monthlyTotal = 0;

    purchases.forEach(function (purchase) {
        addPurchaseToList(purchase);
        monthlyTotal += purchase.amount;
    });

    monthlyTotalElement.textContent = monthlyTotal.toFixed(2);
}

function monthlyReset() {
    const currentDate = new Date();
    if (currentDate.getDate() === 1) {
        localStorage.clear();
        updateUI();
    }
}


//expenses and income feature

let incomeList = JSON.parse(localStorage.getItem('incomeList')) || [];
let expensesList = JSON.parse(localStorage.getItem('expensesList')) || [];
let incomeTotal = parseFloat(localStorage.getItem('incomeTotal')) || 0;
let expensesTotal = parseFloat(localStorage.getItem('expensesTotal')) || 0;

document.addEventListener('DOMContentLoaded', () => {
    updateUI();
    balanceHealth();
});

function submitTransaction() {
    const transactionType = document.getElementById('transaction-type').value;
    const transactionName = document.getElementById('transaction-name').value;
    const transactionAmount = parseFloat(document.getElementById('transaction-amount').value);

    if (transactionName && !isNaN(transactionAmount) && transactionAmount > 0) {
        const transaction = { name: transactionName, amount: transactionAmount };

        if (transactionType === 'income') {
            incomeList.push(transaction);
            incomeTotal += transactionAmount;
            localStorage.setItem('incomeList', JSON.stringify(incomeList));
            localStorage.setItem('incomeTotal', incomeTotal.toString());
        } else {
            expensesList.push(transaction);
            expensesTotal += transactionAmount;
            localStorage.setItem('expensesList', JSON.stringify(expensesList));
            localStorage.setItem('expensesTotal', expensesTotal.toString());
        }

        updateUI();
    } else {
        alert('Please enter valid transaction details.');
    }
}

function updateUI() {
    document.getElementById('income-list').innerHTML = generateListHTML(incomeList);
    document.getElementById('expenses-list').innerHTML = generateListHTML(expensesList);
    document.getElementById('income-total-value').textContent = incomeTotal.toFixed(2);
    document.getElementById('expenses-total-value').textContent = expensesTotal.toFixed(2);
    balanceHealth();
}

function generateListHTML(transactionList) {
    return transactionList.map(transaction => `<li>${transaction.name}: $${transaction.amount.toFixed(2)}</li>`).join('');
}

function monthlyReset() {
    const currentDate = new Date();
    if (currentDate.getDate() === 1) {
        localStorage.clear();
        updateUI();
    }
}


//budgeting tracker

function balanceHealth() {
    let currentBalanceElement = document.getElementById('monthly-balance');
    let monthlyTotalElement = document.getElementById('monthlyTotal');
    let monthlyTotal = parseFloat(monthlyTotalElement.textContent) || 0;

    let balance = incomeTotal - expensesTotal - monthlyTotal;
    currentBalanceElement.textContent = balance.toFixed(2);
}