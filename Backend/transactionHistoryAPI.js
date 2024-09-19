<!-- Add this to the Admin Dashboard HTML -->

<h3 class="text-2xl font-bold text-white mt-8">Transaction Overview</h3>
<div id="transaction-list" class="space-y-4 mt-4">
    <!-- Transactions will be dynamically loaded here -->
</div>

<script>
    // Load transactions from Stripe
    async function loadTransactions() {
        const response = await fetch('http://localhost:5000/transactions');
        const transactions = await response.json();

        const transactionList = document.getElementById('transaction-list');
        transactionList.innerHTML = ''; // Clear any previous content

        transactions.forEach(transaction => {
            const transactionCard = document.createElement('div');
            transactionCard.classList.add('product-card');
            transactionCard.innerHTML = `
                <p class="text-lg">Transaction ID: ${transaction.id}</p>
                <p class="text-md">Amount: $${(transaction.amount / 100).toFixed(2)}</p>
                <p class="text-md">Status: ${transaction.status}</p>
                <p class="text-md">Date: ${new Date(transaction.created * 1000).toLocaleString()}</p>
            `;
            transactionList.appendChild(transactionCard);
        });
    }

    // Load transactions on page load
    loadTransactions();
</script>
  
