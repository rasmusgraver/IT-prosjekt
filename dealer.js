
const suits = ['hearts', 'diamonds', 'clubs', 'spades'];
const ranks = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13];
const values = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 10, 10, 10, 11]; // Verdiene til kortene er normale, utenom 11-13

let playerHandValue = 0; // bestemme verdien til spillerens kort

// const values = ranks.map(rank => (rank >= 11 && rank <= 13) ? 10 : rank === 1 ? [1, 11] : rank);

function createDeck() {
    const deck = [];
    for (let suit of suits) {
        for (let rank of ranks) {
            let value;
            if (rank == 11 || rank == 12 || rank == 13) {
                value = 10; // Gjør om verdien til knekt(11), dronning(12) og konge(13) til 10
            } else if (rank == 1) {
                value = 11; // Gjør verdien til ess(1,11) om til (11) som en standar
            } else {
                value = parseInt(rank); //Resten av kortene har sin egen verdi
            }
            deck.push({ suit, rank, value });
        }
    }
    return deck;
}

// funksjon som stokker kortene og får fram tilfeldige kort
function shuffleDeck(deck) {
    for (let i = deck.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [deck[i], deck[j]] = [deck[j], deck[i]];
    }
    return deck;
}

// funksjon som gjør det mulig å dele ut kort fra bakerst i bunken
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


        // Here you can add any additional actions you want to take if the player busts.
    }
    else if (playerHandValue == 21) {
        document.getElementById('hitButton').disabled = true;
        console.log('Blackjack! Player hand value is 21.');
        const para = document.createElement("p");
        para.innerHTML = "Blackjack! Du fikk 21";
        document.getElementById("result").appendChild(para);
        // Here you can add any additional actions you want to take if the player gets a blackjack.
    }
    else {
        console.log('Player hand value:', playerHandValue);
        // Here you can add any additional actions you want to take if the player's hand value is within acceptable range.
    }
}

// funksjon som deler ut 2 kort til spiller og 2 kort til dealer
function dealInitialCards() {
    const playerHand = [dealCard(deck), dealCard(deck)];
    const dealerHand = [dealCard(deck)];

    // Deler ut kort til dealer
    dealerHand.forEach((card, index) => {
        const dealerCardElement = document.createElement('img');
        dealerCardElement.src = index === 1 ? 'kortstokk/backside.png' : `kortstokk/${card.rank}_of_${card.suit.toLowerCase()}.png`;
        dealerCardElement.classList.add('card', 'dealer');
        document.querySelector('.dealer').appendChild(dealerCardElement);
    });

    // Dele ut kort til spiller
    playerHand.forEach((card, index) => {
        const playerCardElement = document.createElement('img');
        playerCardElement.src = `kortstokk/${card.rank}_of_${card.suit.toLowerCase()}.png`;
        playerCardElement.classList.add('card');
        playerHandValue += parseInt(card.value);
        document.querySelector('.player').appendChild(playerCardElement);
        checkPlayerHandValue(playerHandValue);
    });

    console.log('Player hand:', playerHand);
    console.log('Dealer hand:', dealerHand);
    console.log('Player Hand Value', playerHandValue);


    // Kalkulerer spillerns hånd, for å se om man skal skru av "hit" knappen

}

// Stokker og lager dekk
let deck = shuffleDeck(createDeck());

// Kaller dealInitialCards function så man kan dele kort når det er nødvendig, for eksempel: når man starter spillet
dealInitialCards();

function hit() {
    const playerCards = document.querySelectorAll('.player .card');
    playerCards.forEach(card => {
        const Value = card.dataset.value; // Use dataset.value if set
    });

    const newCard = dealCard(deck);
    const newCardElement = document.createElement('img');
    newCardElement.src = `kortstokk/${newCard.rank}_of_${newCard.suit.toLowerCase()}.png`;
    newCardElement.classList.add('card');
    newCardElement.dataset.value = newCard.value; // Setter dataset.value til kort verdi
    document.querySelector('.player').appendChild(newCardElement);
    console.log('New card:', newCard);
    playerHandValue += parseInt(newCard.value); // oppdaterer spillerns kort til kortverdi

    checkPlayerHandValue(playerHandValue);

}

function stand() {
    // Disable the hit and stand buttons after the player stands
    document.getElementById('hitButton').disabled = true;
    document.getElementById('stand').disabled = true;

    // Dealer draws cards until the hand value is between 17 and 21
    while (calculateHandValue(dealerHand) < 17) {
        const newCard = dealCard(deck);
        const newCardElement = document.createElement('img');
        newCardElement.src = `kortstokk/${newCard.rank}_of_${newCard.suit.toLowerCase()}.png`;
        newCardElement.classList.add('card');
        document.querySelector('.dealer').appendChild(newCardElement);

        // Add the value of the new card to the dealer's hand
        dealerHand.push(newCard);
    }

    // Calculate the dealer's hand value
    const dealerHandValue = calculateHandValue(dealerHand);

    // Check if the dealer busts or reaches a value between 17 and 21
    if (dealerHandValue > 21) {
        console.log('Dealer busts!');
        // Handle the situation where the dealer busts
    } else {
        console.log('Dealer stands with hand value:', dealerHandValue);
        // Handle the situation where the dealer stands
    }

    // Compare the player's and dealer's hands to determine the winner
    determineWinner(playerHandValue, dealerHandValue);
}
