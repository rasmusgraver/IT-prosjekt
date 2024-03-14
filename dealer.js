let deck; // Deklarerer en variabel "deck" som skal inneholde en kortstokk.
let playerHandValue = 0; // Deklarerer en variabel "playerHandValue" som skal holde verdien av spillerens hånd.
let dealerHandValue = 0; // Deklarerer en variabel "dealerHandValue" som skal holde verdien av dealerens hånd.

// Funksjon for å lage en kortstokk.
function createDeck() {
    const suits = ['hearts', 'diamonds', 'clubs', 'spades']; // Array som inneholder alle mulige farger.
    const ranks = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13]; // Array som inneholder alle mulige verdier.
    const deck = []; // Tom array som skal inneholde kortstokken.
    for (let suit of suits) { // Går gjennom hver farge.
        for (let rank of ranks) { // Går gjennom hver "bildeID".
            let value; // Variabel for å holde verdien til hvert kort.
            if (rank >= 11 && rank <= 13) { // Hvis kortet er en knekt, dame eller konge.
                value = 10; // Setter verdien til 10.
            } else if (rank === 1) { // Hvis kortet er et ess.
                value = 11; // Setter verdien til 11.
            } else { // Hvis kortet er et tallkort.
                value = rank; // Setter verdien til kortets tallverdi.
            }
            deck.push({ suit, rank, value }); // Legger til kortet i kortstokken med farge, verdi og beregnet verdi.
        }
    }
    return deck; // Returnerer den opprettede kortstokken.
}

// Funksjon for å stokke kortstokken.
function shuffleDeck(deck) {
    for (let i = deck.length - 1; i > 0; i--) { // Går gjennom kortstokken baklengs.
        const j = Math.floor(Math.random() * (i + 1)); // Velger en tilfeldig indeks for bytte.
        [deck[i], deck[j]] = [deck[j], deck[i]]; // Bytter plass på kortene.
    }
    return deck; // Returnerer den stokkede kortstokken.
}

// Funksjon for å dele ut et kort fra kortstokken.
function dealCard(deck) {
    return deck.pop(); // Fjerner og returnerer det siste kortet i kortstokken.
}

// Funksjon for å sjekke verdien av spillerens hånd.
function checkPlayerHandValue() {
    if (playerHandValue > 21) { // Hvis verdien av spillerens hånd er over 21.
        document.getElementById('hitButton').disabled = true; // Deaktiverer "hit" knappen.
        document.getElementById('standButton').disabled = true;
        console.log('Bust! Player hand value exceeds 21.'); // Skriver ut en melding om at spilleren har gått over 21.
        const para = document.createElement("p"); // Oppretter et nytt <p> element.
        para.innerHTML = "Bust! Du kom over 21"; // Setter teksten til meldingen.
        document.getElementById("result").appendChild(para); // Legger til meldingen i HTML-dokumentet.
    } else if (playerHandValue === 21) { // Hvis verdien av spillerens hånd er 21.
        document.getElementById('hitButton').disabled = true; // Deaktiverer "hit" knappen.
        console.log('Blackjack! Player hand value is 21.'); // Skriver ut en melding om at spilleren har blackjack.
        const para = document.createElement("p"); // Oppretter et nytt <p> element.
        para.innerHTML = "Blackjack! Du fikk 21"; // Setter teksten til meldingen.
        document.getElementById("result").appendChild(para); // Legger til meldingen i HTML-dokumentet.
    } else { 
        console.log('Player hand value:', playerHandValue); // Skriver ut verdien av spillerens hånd.
    }
}

// Funksjon for å sjekke verdien av dealerens hånd.
function checkDealerHandValue() {
    if (dealerHandValue > 21) { // Hvis verdien av dealerens hånd er over 21.
        console.log('Dealer Bust! Dealer hand value exceeds 21.'); // Skriver ut en melding om at dealeren har gått over 21.
        const para = document.createElement("p"); // Oppretter et nytt <p> element.
        para.innerHTML = "Dealer Bust! Dealer kom over 21."; // Setter teksten til meldingen.
        document.getElementById("result").appendChild(para); // Legger til meldingen i HTML-dokumentet.
    } else { // Hvis dealerens hånd ikke er over 21.
        console.log('Dealer hand value:', dealerHandValue); // Skriver ut verdien av dealerens hånd.
    }
}

function dealInitialCards() {
    const playerHand = [dealCard(deck), dealCard(deck)];
    const dealerHand = [dealCard(deck)];

    playerHand.forEach((card) => {
        const playerCardElement = document.createElement('img'); // Oppretter et <img> element for spillerens kort.
        playerCardElement.src = `kortstokk/${card.rank}_of_${card.suit.toLowerCase()}.png`; // Setter kilden til bildet basert på kortets farge og verdi.
        playerCardElement.classList.add('card'); // Legger til klassen "card" til spillerens kort.
        playerHandValue += parseInt(card.value); // Legger til verdien av kortet til spillerens håndverdi.
        document.querySelector('.player').appendChild(playerCardElement); // Legger til spillerens kort i HTML-dokumentet under "player" elementet.
    });

    // Går gjennom hvert kort i dealerens hånd.
    dealerHand.forEach((card) => {
        const dealerCardElement = document.createElement('img'); // Oppretter et <img> element for dealerens kort.
        dealerCardElement.src = `kortstokk/${card.rank}_of_${card.suit.toLowerCase()}.png`; // Setter kilden til bildet basert på kortets farge og verdi.
        dealerCardElement.classList.add('card'); // Legger til klassen "card" til dealerens kort.
        dealerHandValue += parseInt(card.value); // Legger til verdien av kortet til dealerens håndverdi.
        document.querySelector('.dealer').appendChild(dealerCardElement); // Legger til dealerens kort i HTML-dokumentet under "dealer" elementet.
    });

    // Skriver ut spillerens og dealerens hånd samt håndverdier.
    console.log('Player hand:', playerHand);
    console.log('Dealer hand:', dealerHand);
    console.log('Player hand value', playerHandValue);
    console.log('Dealer Hand Value', dealerHandValue);

    // Sjekker om spilleren eller dealeren har blackjack eller har gått over 21.
    checkPlayerHandValue();
    checkDealerHandValue();

    // Deaktiverer "hit" knappen hvis spilleren allerede har 21.
    disableHitButtonIf21();
}

// Funksjon for å trekke et nytt kort for spilleren.
function hit() {
    if (playerHandValue < 21) { // Sjekker om spillerens håndverdi er mindre enn 21.
        const newCard = dealCard(deck); // Trekker et nytt kort fra kortstokken.
        const newCardElement = document.createElement('img'); // Oppretter et <img> element for det nye kortet.
        newCardElement.src = `kortstokk/${newCard.rank}_of_${newCard.suit.toLowerCase()}.png`; // Setter kilden til bildet basert på kortets farge og verdi.
        newCardElement.classList.add('card'); // Legger til klassen "card" til det nye kortet.
        document.querySelector('.player').appendChild(newCardElement); // Legger til det nye kortet i HTML-dokumentet under "player" elementet.
        playerHandValue += parseInt(newCard.value); // Legger til verdien av det nye kortet til spillerens håndverdi.

        // Sjekker om spillerens hånd inneholder et ess og den totale verdien overstiger 21.
        

        checkPlayerHandValue(); // Sjekker om spilleren har blackjack eller har gått over 21.
    }
    disableHitButtonIf21(); // Deaktiverer "hit" knappen hvis spilleren allerede har 21.
}
// Funksjon for å "stå" eller avslutte spillerens tur og starte dealerens tur.
function stand() {
    // Deaktiverer "hit" knappen.
    document.getElementById('hitButton').disabled = true;
    // Starter dealerens tur.
    dealerPlay();
}

// Funksjon som utfører dealerens tur ved å trekke kort til dealerens håndverdi er minst 17.
function dealerPlay() {
    while (dealerHandValue < 17) { // Så lenge dealerens håndverdi er mindre enn 17.
        const newCard = dealCard(deck); // Trekker et nytt kort fra kortstokken.
        const newCardElement = document.createElement('img'); // Oppretter et <img> element for det nye kortet.
        newCardElement.src = `kortstokk/${newCard.rank}_of_${newCard.suit.toLowerCase()}.png`; // Setter kilden til bildet basert på kortets farge og verdi.
        newCardElement.classList.add('card'); // Legger til klassen "card" til det nye kortet.
        document.querySelector('.dealer').appendChild(newCardElement); // Legger til det nye kortet i HTML-dokumentet under "dealer" elementet.
        dealerHandValue += parseInt(newCard.value); // Legger til verdien av det nye kortet til dealerens håndverdi.
    }

    // Sjekker vinneren etter at dealerens tur er ferdig med å trekke kort.
    checkWinner();
}

// Funksjon for å sjekke hvem som vinner spillet og vise resultatet.
function checkWinner() {
    // Deaktiverer "stå" knappen.
    document.getElementById('standButton').disabled = true;

    // Viser dealerens håndverdi.
    console.log('Dealer hand value:', dealerHandValue);

    // Sjekker hvem som vinner.
    if (dealerHandValue > 21 || dealerHandValue < playerHandValue) { // Hvis dealerens håndverdi er over 21 eller mindre enn spillerens håndverdi.
        console.log('Player wins!'); // Skriver ut at spilleren vinner.
        const para = document.createElement("p"); // Oppretter et nytt <p> element.
        para.innerHTML = "Du vinner!"; // Setter teksten til meldingen.
        document.getElementById("result").appendChild(para); // Legger til meldingen i HTML-dokumentet.
    } else if (dealerHandValue > playerHandValue) { // Hvis dealerens håndverdi er større enn spillerens håndverdi.
        console.log('Dealer wins!'); // Skriver ut at dealeren vinner.
        const para = document.createElement("p"); // Oppretter et nytt <p> element.
        para.innerHTML = "Dealer vinner!"; // Setter teksten til meldingen.
        document.getElementById("result").appendChild(para); // Legger til meldingen i HTML-dokumentet.
    } else { // Hvis det er uavgjort.
        console.log('It\'s a tie!'); // Skriver ut at det er uavgjort.
        const para = document.createElement("p"); // Oppretter et nytt <p> element.
        para.innerHTML = "Uavgjort!"; // Setter teksten til meldingen.
        document.getElementById("result").appendChild(para); // Legger til meldingen i HTML-dokumentet.
    }
}

// Funksjon for å deaktivere "hit" knappen hvis spillerens håndverdi er 21 eller mer.
function disableHitButtonIf21() {
    if (playerHandValue >= 21) { // Sjekker om spillerens håndverdi er 21 eller mer.
        document.getElementById('hitButton').disabled = true; // Deaktiverer "hit" knappen.
    } else { // Hvis spillerens håndverdi er mindre enn 21.
        document.getElementById('hitButton').disabled = false; // Aktiverer "hit" knappen.
    }
}

// Funksjon for å skjule knappen for å starte spillet.
function hideButton() {
    let startGame = document.getElementById("startGame"); // Henter referanse til knappen for å starte spillet.
    startGame.style.display = "none"; // Skjuler knappen ved å sette display-stilen til "none".
}

// Funksjon for å starte spillet ved å initiere kortstokken, dele ut de første kortene og skjule startknappen.
function initiateGame() {
    deck = shuffleDeck(createDeck()); // Oppretter en stokket kortstokk.
    dealInitialCards(); // Deler ut de første kortene.
}

// Funksjon for å starte spillet.
function startGame() {
    initiateGame(); // Starter spillet ved å initiere spillet.
    hideButton(); // Skjuler knappen for å starte spillet.
}