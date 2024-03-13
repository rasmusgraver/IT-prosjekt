let deck;
let playerHandValue = 0; // Declare playerHandValue in global scope

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
        console.log('Player hand value',playerHandValue);

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

// Initialize game
function startGame() {
    deck = shuffleDeck(createDeck());
    dealInitialCards();
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
