function tilfeldigkort() {

    const tall = Math.floor(Math.random()* 13) + 1
    
    
    const kortElm = document.querySelector(".container img")
    
    
    kortElm.src = "kortstokk/" + tall + "_of_clubs.png"
    
    const suits = ["spades", "hearts", "clubs", "diamonds"]
    
    const suit_index = Math.floor(Math.random()*4 )
    
    const suit = suits[suit_index]
    
    kortElm.src = "kortstokk/" + tall + "_of_" + suit + ".png"
    
    }
    setInterval(tilfeldigkort, 1000)
    