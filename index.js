function tilfeldigKort() {

    const tall = Math.floor(Math.random() * 13) + 1
    const kortElm = document.querySelector(".container img")
    kortElm.src = "kortstokk/" + tall + "_of_clubs.png"

}




setInterval(tilfeldigKort, 1000)