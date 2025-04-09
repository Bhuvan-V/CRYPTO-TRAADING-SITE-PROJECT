let balance = 0.00;
let transactions = [];

function updateBalance() {
    document.getElementById('balance').innerText = `${balance.toFixed(2)} BTC`;
}

function deposit() {
    const amount = parseFloat(prompt("Enter the amount to deposit:"));
    if (!isNaN(amount) && amount > 0) {
        balance += amount;
        transactions.push(`Deposited: ${amount} BTC`);
        updateBalance();
        updateTransactions();
    } else {
        alert("Invalid amount!");
    }
}

function withdraw() {
    const amount = parseFloat(prompt("Enter the amount to withdraw:"));
    if (!isNaN(amount) && amount > 0 && amount <= balance) {
        balance -= amount;
        transactions.push(`Withdrawn: ${amount} BTC`);
        updateBalance();
        updateTransactions();
    } else {
        alert("Invalid amount or insufficient balance!");
    }
}

function send() {
    const amount = parseFloat(prompt("Enter the amount to send:"));
    const address = prompt("Enter the recipient's address:");
    if (!isNaN(amount) && amount > 0 && amount <= balance && address) {
        balance -= amount;
        transactions.push(`Sent: ${amount} BTC to ${address}`);
        updateBalance();
        updateTransactions();
    } else {
        alert("Invalid amount, insufficient balance, or invalid address!");
    }
}

function updateTransactions() {
    const transactionList = document.getElementById('transactions');
    transactionList.innerHTML = transactions.map(t => `<li>${t}</li>`).join('');
}

updateBalance();