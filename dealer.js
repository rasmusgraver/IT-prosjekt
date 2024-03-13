let deck;
let playerHandValue = 0;
let dealerHandValue = 0;

// Declare functions and variables for deck creation, shuffling, dealing, etc.

function createDeck() {
    const suits = ['hearts', 'diamonds', 'clubs', 'spades'];
    const ranks = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13];
    const deck = [];
    for (let suit of suits) {
        for (let rank of ranks) {
            let value;
            if (rank >= 11 && rank <= 13) {
                value = 10;
            } else if (rank === 1) {
                value = 11;
            } else {
                value = rank;
            }
            deck.push({ suit, rank, value });
        }
    }
    return deck;
}

function shuffleDeck(deck) {
    for (let i = deck.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [deck[i], deck[j]] = [deck[j], deck[i]];
    }
    return deck;
}

function dealCard(deck) {
    return deck.pop();
}

function checkPlayerHandValue(playerHandValue) {
    if (playerHandValue > 21) {
        document.getElementById('hitButton').disabled = true;
        console.log('Bust! Player hand value exceeds 21.');
        const para = document.createElement("p");
        para.innerHTML = "Bust! Du kom over 21";
        document.getElementById("result").appendChild(para);


    } else if (playerHandValue === 21) {
        document.getElementById('hitButton').disabled = true;
        console.log('Blackjack! Player hand value is 21.');
        const para = document.createElement("p");
        para.innerHTML = "Blackjack! Du fikk 21";
        document.getElementById("result").appendChild(para);
        
    } else {
        console.log('Player hand value:', playerHandValue);
    }
}

function dealInitialCards() {
    const playerHand = [dealCard(deck), dealCard(deck)];
    const dealerHand = [dealCard(deck)];

    dealerHand.forEach((card, index) => {
        const dealerCardElement = document.createElement('img');
        dealerCardElement.src = index === 1 ? 'kortstokk/backside.png' : `kortstokk/${card.rank}_of_${card.suit.toLowerCase()}.png`;
        dealerCardElement.classList.add('card', 'dealer');
        document.querySelector('.dealer').appendChild(dealerCardElement);
    });

    playerHand.forEach((card, index) => {
        const playerCardElement = document.createElement('img');
        playerCardElement.src = `kortstokk/${card.rank}_of_${card.suit.toLowerCase()}.png`;
        playerCardElement.classList.add('card');
        playerHandValue += parseInt(card.value);
        document.querySelector('.player').appendChild(playerCardElement);
    });

    console.log('Player hand:', playerHand);
    console.log('Dealer hand:', dealerHand);
    console.log('Player hand value', playerHandValue);
    checkPlayerHandValue(playerHandValue);
}


function hit() {
    const newCard = dealCard(deck);
    const newCardElement = document.createElement('img');
    newCardElement.src = `kortstokk/${newCard.rank}_of_${newCard.suit.toLowerCase()}.png`;
    newCardElement.classList.add('card');
    document.querySelector('.player').appendChild(newCardElement);
    playerHandValue += parseInt(newCard.value);

    // Check if the player's hand contains an ace and the total value exceeds 21

    if (playerHandValue > 21) {
        playerHandValue -= 10;
    }

    checkPlayerHandValue(playerHandValue);
}

function stand() {
    // Disable hit button
    document.getElementById('hitButton').disabled = true;

    // Execute dealer's turn
    dealerPlay();
}

function dealerPlay() {

    while (dealerHandValue < 17) {
        const newCard = dealCard(deck);
        const newCardElement = document.createElement('img');
        newCardElement.src = `kortstokk/${newCard.rank}_of_${newCard.suit.toLowerCase()}.png`;
        newCardElement.classList.add('card');
        document.querySelector('.dealer').appendChild(newCardElement);
        dealerHandValue += parseInt(newCard.value);
    }

    // Check the winner after the dealer has finished drawing cards
    checkWinner();
}

function checkWinner(dealerHandValue) {
    // Enable stand button
    document.getElementById('standButton').disabled = true;

    // Show dealer's hand value
    console.log('Dealer hand value:', dealerHandValue);

    // Check who wins
    if (dealerHandValue > 21 || dealerHandValue < playerHandValue) {
        console.log('Player wins!');
        const para = document.createElement("p");
        para.innerHTML = "Du vinner!";
        document.getElementById("result").appendChild(para);
    } else if (dealerHandValue > playerHandValue) {
        console.log('Dealer wins!');
        const para = document.createElement("p");
        para.innerHTML = "Dealer vinner!";
        document.getElementById("result").appendChild(para);
    } else {
        console.log('It\'s a tie!');
        const para = document.createElement("p");
        para.innerHTML = "Uavgjort!";
        document.getElementById("result").appendChild(para);
    }
}

// function checkdealerHandValue(dealerHandValue) {
//     // let aceCount = 0;

//     // // Loop through each card in the hand
//     // for (let i = 0; i < hand.children.length; i++) {
//     //     const card = hand.children[i];
//     //     const cardValue = parseInt(card.getAttribute('data-value'));

//     //     handValue += cardValue;

//     //     // Check for Aces
//     //     if (cardValue === 11) {
//     //         aceCount++;
//     //     }

//     //     // Adjust Ace value from 11 to 1 if necessary
//     //     while (handValue > 21 && aceCount > 0) {
//     //         handValue -= 10;
//     //         aceCount--;
//     //     }
//     // }

//     // return handValue;
//     if (dealerHandValue > playerHandValue && dealerHandValue <=21 ) {
//         console.log("Dealer won");
//         const para = document.createElement("p");
//         para.innerHTML = "Dealeren vant;
//         document.getElementById("result").appendChild(para);

//     } else if (dealerHandValue < playerHandValue) {
//         console.log('Blackjack! Player hand value is 21.');
//         const para = document.createElement("p");
//         para.innerHTML = "Blackjack! Du fikk 21";
//         document.getElementById("result").appendChild(para);
        
//     } else {
//         console.log('Player hand value:', playerHandValue);
//     }
// }


function hideButton() {
    let startGame = document.getElementById("startGame");
    startGame.style.display = "none";
}

function initiateGame() {
    deck = shuffleDeck(createDeck());
    dealInitialCards();
}

function startGame() {
    initiateGame(); 
    hideButton(); 
}
