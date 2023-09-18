//adicionar um input
const divForm = document.getElementById('form-jogador')
const btnAdicionarInput = document.getElementById("btn-adicionar-jogador")
const btnStart = document.getElementById("btn-comecar-jogo")
var numeroInputs = 1;


function adicionarInput(){

    numeroInputs++

    if(numeroInputs > 2) return;

    var novoInput = document.createElement("input")
    novoInput.id = "nome-jogador2"
    novoInput.type = "text"
    novoInput.placeholder = "Insira um nome..."

    var novoBtnIcone = document.createElement("button")
    novoBtnIcone.id = "btn-remover-jogador"
    novoBtnIcone.style.background = "none"
    novoBtnIcone.style.border = "none"
    novoBtnIcone.type = "button"
    novoBtnIcone.onclick = function (){
        removerInput(novoInput, novoBtnIcone)
    }

    var novoIconeBtn = document.createElement("i")
    novoIconeBtn.className = "fa-solid fa-xmark"
    novoIconeBtn.style.color = "red"

    novoBtnIcone.appendChild(novoIconeBtn)
    
    divForm.appendChild(novoInput)
    divForm.appendChild(novoBtnIcone)

    
    btnStart.addEventListener('click', function(){

        if(novoInput.value == "" || novoInput.value === null) return;
        localStorage.setItem("Nome Jogador 2", novoInput.value);
        alert("Jogador salvo 2: " + novoInput.value);
        
        
        setTimeout(window.location.href="game.html",1300)

    }) 
}

function removerInput(input,icone){
    divForm.removeChild(input)
    divForm.removeChild(icone)
    numeroInputs--
}

btnStart.addEventListener('click', function(){
    var nomeInput1 = document.getElementById("nome-jogador1")
    localStorage.setItem("Nome Jogador 1", nomeInput1.value);
    
    alert("Jogador salvo 1: " + nomeInput1.value);

    setTimeout(window.location.href= "game.html" ,1300)
})
