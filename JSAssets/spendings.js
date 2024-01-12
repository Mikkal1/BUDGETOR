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