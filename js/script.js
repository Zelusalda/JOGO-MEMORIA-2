
const coresCards = [
    "#3B95FF",
    "#FCBEDD",
    "#8B63FF",
    "#FFC53B"
]
const imagensCards = [
    "cool-guy",
    "girl-artist",
    "girl-crown",
    "girl-hat",
    "girl-headphone",
    "guy-playing",
    "serious-girl",
    "guy-robot",
    "guy-diving"
]
const heroCards = document.getElementById("hero-cards")


function corAleatoria(){
    return Math.floor(Math.random()*coresCards.length)
}

function AdicionarCarta() {
    for(var i = 0;i < 9;i++){
        let novaCard = document.createElement("div")
        novaCard.className = "card"

        let imgCard = document.createElement("img")
        imgCard.src = "/img/"+imagensCards[i]+".png";

        let IndexCor = corAleatoria()
        let cor = coresCards[IndexCor]
        novaCard.style.backgroundColor = cor;

        novaCard.appendChild(imgCard)
        heroCards.appendChild(novaCard)
    }
    console.log("OK")
}

document.body.onload = AdicionarCarta()



