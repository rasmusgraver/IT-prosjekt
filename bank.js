//Tidligere JS//

let balance = 200; 
let currentBet = 0;


function updateBalance() {
    document.querySelector('.balance h2').textContent = balance;
}


function placeBet(chipValue) {
    
    if (balance >= chipValue) {
        
        balance -= chipValue;
       
        updateBalance();
        
        const betDisplay = document.querySelector('.balance div:nth-child(2) h2');
       
        let currentBet = parseInt(betDisplay.textContent) || 0; 
        
        currentBet += chipValue;
        
        betDisplay.textContent = currentBet;
    } else {
        alert("Insufficient balance");
    }
}



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


updateBalance();