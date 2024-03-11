

const suits = ['hearts', 'diamonds', 'clubs', 'spades'];
const ranks = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11'];

// Function to create a standard deck of cards
function createDeck() {
    const deck = [];
    for (let suit of suits) {
        for (let rank of ranks) {
            deck.push({ suit, rank });
        }
    }
    return deck;
}

// Function to shuffle the deck of cards
function shuffleDeck(deck) {
    for (let i = deck.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [deck[i], deck[j]] = [deck[j], deck[i]];
    }
    return deck;
}

// Function to deal a card from the deck
function dealCard(deck) {
    return deck.pop();
}

// Function to deal cards to player and dealer
function dealInitialCards() {
    const playerHand = [dealCard(deck), dealCard(deck)];
    const dealerHand = [dealCard(deck), dealCard(deck)];

    // Deal cards to dealer
    dealerHand.forEach((card, index) => {
        const dealerCardElement = document.createElement('img');
        dealerCardElement.src = index === 1 ? 'kortstokk/backside.png' : `kortstokk/${card.rank}_of_${card.suit.toLowerCase()}.png`;
        dealerCardElement.classList.add('card', 'dealer');
        document.querySelector('.dealer').appendChild(dealerCardElement);
    });

    // Deal cards to player
    playerHand.forEach((card, index) => {
        const playerCardElement = document.createElement('img');
        playerCardElement.src = `kortstokk/${card.rank}_of_${card.suit.toLowerCase()}.png`;
        playerCardElement.classList.add('card');
        document.querySelector('.player').appendChild(playerCardElement);
    });

    console.log('Player hand:', playerHand);
    console.log('Dealer hand:', dealerHand);
}

// Shuffle and create deck
let deck = shuffleDeck(createDeck());

// Call dealInitialCards function to deal cards when needed, such as when the game starts
dealInitialCards();

function hit() {
    // Deal a new card from the deck
    const newCard = dealCard(deck);

    // Create HTML element for the new card
    const newCardElement = document.createElement('img');
    newCardElement.src = `kortstokk/${newCard.rank}_of_${newCard.suit.toLowerCase()}.png`;
    newCardElement.classList.add('card');
    newCardElement.dataset.value = newCard.rank;
    document.querySelector('.player').appendChild(newCardElement); // Append the new card to the player's hand

    // Calculate the total sum of player's cards
    const playerCards = document.querySelectorAll('.player .card');
    let playerHandValue = playerHand;
    playerCards.forEach(card => {
        const cardValue = parseInt(card.dataset.value);
        playerHandValue += cardValue;
    });

    // If player's hand value is 21 or above, disable the hit button
    if (playerHandValue >= 21) {
        document.getElementById('hit').disabled = true;
    }

    // Log the new card to console (optional)
    console.log('New card:', newCard);
}

function toggleMenu() {
    const rulesList = document.querySelector('.ruleslist');
    const menuIcon = document.querySelector('.menu-icon');
    if (rulesList.style.display === 'none') {
        rulesList.style.display = 'block';
    } else {
        rulesList.style.display = 'none';
    }
}