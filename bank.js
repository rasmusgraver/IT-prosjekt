let balance = 200; // Set initial balance
let currentBet

// Function to update balance display
function updateBalance() {
    document.querySelector('.balance h2').textContent = balance;
}

// Function to handle chip selection and placing bet
function placeBet(chipValue) {
    // Check if the balance is sufficient for the bet
    if (balance >= chipValue) {
        // Subtract the bet from the balance
        balance -= chipValue;
        // Update balance display
        updateBalance();
        // Update bet display
        const betDisplay = document.querySelector('.balance div:nth-child(2) h2');
        // Get the current bet value
        let currentBet = parseInt(betDisplay.textContent) || 0; // Set default value to 0 if betDisplay is not a number
        // Add the chip value to the current bet
        currentBet += chipValue;
        // Update bet display
        betDisplay.textContent = currentBet;
    } else {
        alert("Insufficient balance");
    }
}


// Event listeners for chip icons
document.getElementById('chip10').addEventListener('click', function() {
    placeBet(10);
});

document.getElementById('chip50').addEventListener('click', function() {
    placeBet(50);
});

document.getElementById('chip100').addEventListener('click', function() {
    placeBet(100);
});

document.getElementById('chip500').addEventListener('click', function() {
    placeBet(500);
});

// Call updateBalance initially
updateBalance();



//Gir ut penger, ut i fra hvordan runden gikk
//Hvis spiller vinner
function gameOutcome(gameWon) {
    if (gameWon) {
        balance += currentBet*2
        currentBet = currentBet*0
    }
}

//Hvis spiller taper 
function gameOutcome(gameLoss){
    if (gameLoss) {
        balance += currentBet*0
        currentBet = currentBet*0
    }
}

//Hvis spiller og dealer har likt
function gameOutcome(gamePush){
    if (gamePush) {
        balance += currentBet*1
        currentBet = currentBet*0
    }
}

//Hvis spiller får BlackJack, gis det ut 1.5 ganger hva man la inn
function gameOutcome(gameBlackJack){
    if (gameBlackJack) {
        balance += currentBet*1.5
        currentBet = currentBet*0
    }
}