//declaring all

const balance = document.getElementById('balance')
const money_plus = document.getElementById('plus')
const money_minus = document.getElementById('minus')
const list = document.getElementById('list')
const list1 = document.getElementById('list1')
const form = document.getElementById('form')
const text = document.getElementById('text')
const amount = document.getElementById('amount')


// getting current month and year

const month_list = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
let current = new Date();

let month = current.getMonth();
let year = current.getFullYear();


document.getElementById("month").innerHTML = month_list[month];
document.getElementById('year').innerHTML = year;






//getting local storage transactions
const localStorageTransactions = JSON.parse(localStorage.getItem('transactions'));

let transactions = localStorage.getItem('transactions') !== null ? localStorageTransactions : [];

// Adding transaction to local storage

function addTransaction(e) {


    // gives an alert when amount is less than balnce
    if (text.value.trim() === '' || amount.value.trim() === '') {
        alert('Please add a text and amount');


    } else if (-(amount.value) > balance.innerHTML) {
        alert("Low Balance")
    } else {
        const transaction = {
            id: generateID(),
            text: text.value,
            amount: +amount.value
        };

        transactions.push(transaction);

        addTransactionDOM(transaction);

        updateValues()

        updateLocalStorage()

        text.value = ''
        amount.value = ''
    }
}

//generate random ID
function generateID() {
    return Math.floor(Math.random() * 100000000);
}


//Add transactions to DOM list
function addTransactionDOM(transaction) {
    //get sign
    const sign = transaction.amount < 0 ? '-' : '+';

    const item = document.createElement('li');

    // Add class based on value
    item.classList.add(transaction.amount < 0 ? 'minus' : 'plus');
    item.innerHTML = `
        
       <span style="color: black;margin-right:20px;display:flex;flex-direction:column;"> ${transaction.text} </span> <span style="margin-left:auto;"> ${sign} ${Math.abs(transaction.amount)}</span>
        <button class="delete-btn" onclick="removeTransaction(${transaction.id})"><span >x</span></button> `;
    if (sign == '+') {
        item.style.color = "green";
        list.appendChild(item);
    } else {
        item.style.color = "red";
        list1.appendChild(item);
    }
}

//update the balance, income and expense
function updateValues() {
    const amounts = transactions.map(transaction => transaction.amount);

    const total = amounts.reduce((acc, item) => (acc += item), 0).toFixed(2);

    const income = amounts
        .filter(item => item > 0)
        .reduce((acc, item) => (acc += item), 0)
        .toFixed(2);

    const expense = (
        amounts.filter(item => item < 0).reduce((acc, item) => (acc += item), 0) * -1).toFixed(2);

    balance.innerText = `${total}`;
    money_plus.innerText = `${income}`;
    money_minus.innerText = `${expense}`;
}

//Remove transaction by ID
function removeTransaction(id) {
    transactions = transactions.filter(transaction => transaction.id !== id);

    updateLocalStorage();

    init();
}

//update local storage transactions
function updateLocalStorage() {
    localStorage.setItem('transactions', JSON.stringify(transactions));
}

//Initialise
function init() {
    list.innerHTML = '';
    list1.innerHTML = '';
    transactions.forEach(addTransactionDOM);
    updateValues()
}

init();


//function to clear local storage
function cle() {
    localStorage.clear();
    init();
    location.reload();
}




//Log In for admin

function log_in() {
    const email = document.getElementById("emailAddress").value;
    const password = document.getElementById("passWord").value;

    if (email === "sanjaygouda136@gmail.com" && password === "ssss") {

        window.open("index.html")

    } else {
        alert("Invalid User");
    }
}