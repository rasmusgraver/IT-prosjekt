
const suits = ['hearts', 'diamonds', 'clubs', 'spades'];
const ranks = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11','12','13'];
const values = ['1','2','3','4','5','6','7','8','9','10','10','10','10','11']; // Modified values array to assign 10 to Jack, Queen, and King

function createDeck() {
    const deck = [];
    for (let suit of suits) {
        for (let rank of ranks) {
            let value;
            if (rank === '11' || rank === '12' || rank === '13') {
                value = 10; // Assign 10 to Jack, Queen, and King
            } else if (rank === '1') {
                value = 11; // Assign initial value 11 to Ace
            } else {
                value = parseInt(rank); // Other cards have their respective value
            }
            deck.push({ suit, rank, value });
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

    // Calculate and check player's hand value to disable hit button if necessary

}

// Shuffle and create deck
let deck = shuffleDeck(createDeck());

// Call dealInitialCards function to deal cards when needed, such as when the game starts
dealInitialCards();

function hit() {
    const playerCards = document.querySelectorAll('.player .card');
    let playerHandValue = 0; // Initialize player hand value
    playerCards.forEach(card => {
        const cardValue = parseInt(card.dataset.value); // Use dataset.value if set
        playerHandValue += cardValue;
    });
    if (playerHandValue >= 21) {
        document.getElementById('hit').disabled = true;
        return;
    }
    const newCard = dealCard(deck);
    const newCardElement = document.createElement('img');
    newCardElement.src = `kortstokk/${newCard.rank}_of_${newCard.suit.toLowerCase()}.png`;
    newCardElement.classList.add('card');
    newCardElement.dataset.value = newCard.value; // Set dataset.value to the card's value
    document.querySelector('.player').appendChild(newCardElement);
    console.log('New card:', newCard);
    playerHandValue += parseInt(newCard.value); // Update player hand value with the card's value
    checkPlayerHandValue(playerHandValue);
    if (playerHandValue >= 21) {
        document.getElementById('hit').disabled = true;
    }
}