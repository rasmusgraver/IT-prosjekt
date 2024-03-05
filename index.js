function tilfeldigkort() {

    const tall = Math.floor(Math.random() * 13) + 1


    const kortElm = document.querySelector(".card")


    kortElm.src = "kortstokk/" + tall + "_of_clubs.png"

    const suits = ["spades", "hearts", "clubs", "diamonds"]

    const suit_index = Math.floor(Math.random() * 4)

    const suit = suits[suit_index]

    kortElm.src = "kortstokk/" + tall + "_of_" + suit + ".png"

}
setInterval(tilfeldigkort, 1000)


function toggleMenu() {
    const rulesList = document.querySelector('.ruleslist');
    rulesList.style.display = (rulesList.style.display === 'none') ? 'block' : 'none';
}