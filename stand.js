
const dealerCardEls = document.querySelectorAll(".card.dealer")



function toggleMenu() {
    const rulesList = document.querySelector('.ruleslist');
    const menuIcon = document.querySelector('.menu-icon');
    if (rulesList.style.display === 'none') {
        rulesList.style.display = 'block';
    } else {
        rulesList.style.display = 'none';
    }
}

