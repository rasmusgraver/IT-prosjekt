
const dealerCardEls = document.querySelectorAll(".card.dealer")

console.log(dealerCardEl)

function stand(){
    
    const dealerCardEl = dealerCardEls[1]
    

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