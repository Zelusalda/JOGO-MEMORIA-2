const secaoCartas = document.querySelector("article")
const tempo = document.getElementById('cronometro')
const jogador = document.getElementById('jogador-vez')
let primeiraCarta = ''
let segundaCarta = ''
let numeroAcertos = 0;
let numeroErros = 0;
let jogoIniciado = false; //Variável para controlar se o jogador já apertou "start" ou não. Serve para impedir que ele possa clicar nas cartas antes de iniciar oficialmente o jogo


const imagensCarta = [
    "cool-guy",
    "girl-artist",
    "girl-crown",
    "girl-hat",
    "girl-headphone",
    "guy-playing",
    "serious-girl",
    "guy-robot",
    "guy-diving",
    "memory-icon"
];
const coresCartas = [
    "#3B95FF",
    "#FCBEDD",
    "#8B63FF",
    "#FFC53B"
]

function encontrarFim(){
    const cartasDesativadas = document.querySelectorAll('.carta-desativada');

    setTimeout(() => {
        if (localStorage.getItem('Acertos Jogador 1') > localStorage.getItem('Acertos Jogador 2') && cartasDesativadas.length === 20) {
            alert(`Parabéns ${localStorage.getItem('Nome Jogador 1')} você ganhou!
            Acertos: ${localStorage.getItem('Acertos Jogador 1')}
            Erros: ${localStorage.getItem('Erros Jogador 1')}`)

        }else if(localStorage.getItem('Acertos Jogador 2') > localStorage.getItem('Acertos Jogador 1') && cartasDesativadas.length === 20){
            alert(`Parabéns ${localStorage.getItem('Nome Jogador 2')} você ganhou!
            Acertos: ${localStorage.getItem('Acertos Jogador 2')}
            Erros: ${localStorage.getItem('Erros Jogador 2')}`)
        }
    },600);
}

function encontrarPar(jogador){
    const primeiraImagem = primeiraCarta.getAttribute('data-imagem')
    const segundaImagem = segundaCarta.getAttribute('data-imagem')

    let aux = false;

    if(primeiraImagem === segundaImagem){
        primeiraCarta.firstChild.classList.add('carta-desativada')
        segundaCarta.firstChild.classList.add('carta-desativada')
        primeiraCarta = ''
        segundaCarta = ''
        numeroAcertos++
        if(jogador === 'Nome Jogador 1'){
            
            localStorage.setItem('Acertos Jogador 1',numeroAcertos)

        }else if ( jogador === 'Nome Jogador 2'){
            // numeroAcertos--;
            localStorage.setItem('Acertos Jogador 2',numeroAcertos)
        }
        encontrarFim()
        aux = true;
    }else{
        numeroErros ++;
        if(jogador === 'Nome Jogador 1'){
            localStorage.setItem('Erros Jogador 1',numeroErros)
        }else if ( jogador === 'Nome Jogador 2'){
            numeroErros--;
            localStorage.setItem('Erros Jogador 2',numeroErros)
        }else{
            console.log("Não rolou")
        }
        setTimeout(()=>{
            primeiraCarta.classList.remove('flip')
            segundaCarta.classList.remove('flip')
            primeiraCarta = ''
            segundaCarta = ''
        },400)
        aux = false;
    }
    document.getElementById("contador-acertos").textContent = numeroAcertos;
    document.getElementById("contador-erros").textContent = numeroErros;
    vezJogada(aux)
}

let jogadorVez = 'Nome Jogador 1';

function virarCarta({ target }){

    if(jogoIniciado == true){ //As cartas não viram se a função "start" não tiver sido iniciada

        if(target.className.includes('flip')) return;

        if(primeiraCarta === ''){
            target.classList.add('flip');
            primeiraCarta = target;
        }else if(segundaCarta === ''){
            target.classList.add('flip');
            segundaCarta = target;

            encontrarPar(jogadorVez)
        }
    }
}

function vezJogada(aux){
    if(aux===true && jogador.innerHTML == localStorage.getItem('Nome Jogador 1')){
        jogador.innerHTML = localStorage.getItem('Nome Jogador 1')
        jogadorVez = 'Nome Jogador 1';
        document.getElementById("contador-acertos").textContent = localStorage.getItem('Acertos Jogador 1');
        document.getElementById("contador-erros").textContent = localStorage.getItem('Erros Jogador 1');

    }else if(aux===false && jogador.innerHTML == localStorage.getItem('Nome Jogador 1')){
        jogador.innerHTML = localStorage.getItem('Nome Jogador 2')
        jogadorVez = 'Nome Jogador 2';
        document.getElementById("contador-acertos").textContent = localStorage.getItem('Acertos Jogador 2');
        document.getElementById("contador-erros").textContent = localStorage.getItem('Erros Jogador 2');
        
    }else if(aux==true && jogador.innerHTML == localStorage.getItem('Nome Jogador 2')){
        
        jogador.innerHTML = localStorage.getItem('Nome Jogador 2')
        jogadorVez = 'Nome Jogador 2';
        document.getElementById("contador-acertos").textContent = localStorage.getItem('Acertos Jogador 2');
        document.getElementById("contador-erros").textContent = localStorage.getItem('Erros Jogador 2');
    }
    else{
        jogador.innerHTML = localStorage.getItem('Nome Jogador 1')
        jogadorVez = 'Nome Jogador 1';
        document.getElementById("contador-acertos").textContent = localStorage.getItem('Acertos Jogador 1');
        document.getElementById("contador-erros").textContent = localStorage.getItem('Erros Jogador 1');
    }

    // o jogo começa com jogador 1, se ele errar, passa pro outro jogador.
}

function criarElemento(tag, className){
    const elemento = document.createElement(tag);
    elemento.className = className;
    return elemento;
}

function criarCarta(imagem){
    const cartaNova = criarElemento('div','carta');
    const imagemCarta = criarElemento('div','frente-carta')

    imagemCarta.style.backgroundImage = `url('/img/${imagem}.png')`
    const IndexRandom = () => {return Math.floor(Math.random()*coresCartas.length)}
    imagemCarta.style.backgroundColor = coresCartas[IndexRandom()]

    cartaNova.appendChild(imagemCarta)
    cartaNova.addEventListener('click',virarCarta)
    cartaNova.setAttribute('data-imagem',imagem)

    return cartaNova;
}

var listaCartas = []; //Armazena as cartas criadas na função CarregarJogo()
function CarregarJogo() {
    const parImagens = [ ...imagensCarta,...imagensCarta]

    const parAleatorio = parImagens.sort(() => Math.random() - 0.5)

    parAleatorio.forEach((imagem)=>{
        const cartaNova = criarCarta(imagem)
        // tenta usar listaCartas. é onde estão sendo armazenadas as cartas criadas
        listaCartas.push(cartaNova) 
        secaoCartas.appendChild(cartaNova)
    })

    jogador.innerHTML = localStorage.getItem('Nome Jogador 1');
}
window.onload = CarregarJogo();


// tentativa cronometro


"use strict";

let hour = 0;
let minute = 0;
let second = 0;
let millisecond = 0;

let cron;

document.form_main.start.onclick = () => start();
document.form_main.reset.onclick = () => reset();

function start() {
    reset()
    listaCartas.forEach(card => card.classList.add('flip'))
    setTimeout(()=>{
        listaCartas.forEach(card => card.classList.remove('flip'))
    },1400)

    jogoIniciado = true; //Marca que o jogo foi iniciado
    clearInterval(cron);
    cron = setInterval(() => { timer(); }, 10);
 
}
  
 
// function pausarJogo(){
//     jogoIniciado = false;
//     clearInterval(cron);
// }

function reset() { /*A função não para realmente o jogo. Pares que foram encontrados continuam marcados, e embora o 
  timer renicie, ele não é cancelado de verdade. Apenas zerado e volta a contar pouco tempo depois, porque a função 
  start() ainda está rodando. Seria bom se "reset" realmente parasse a função start() e o jogador precisasse apertar o 
  botão de iniciar novamente para jogar */
  
    clearInterval(cron);
    hour = 0;
    minute = 0;
    second = 0;
    millisecond = 0;
    document.getElementById('hour').innerText = '00';
    document.getElementById('minute').innerText = '00';
    document.getElementById('second').innerText = '00';

    document.getElementById('contador-acertos').innerText = '';
    document.getElementById('contador-erros').innerText = '';
    jogoIniciado = false;

    listaCartas.forEach(card => card.classList.remove('flip')) //Desvira as cartas. Acessa os elementos do vetor listaCartas
    //e remove a classe 'flip' de cada elemento.
    listaCartas.forEach(card => card.firstChild.classList.remove('carta-desativada')) //Remove o efeito de carta desativada

    localStorage.setItem('Acertos Jogador 1',0)
    localStorage.setItem('Acertos Jogador 2',0)
    localStorage.setItem('Erros Jogador 1',0)
    localStorage.setItem('Erros Jogador 2',0)

}
  

  function timer() {
  if ((millisecond += 10) == 1000) {
    millisecond = 0;
    second++;
  }
  if (second == 60) {
    second = 0;
    minute++;
  }
  if (minute == 60) {
    minute = 0;
    hour++;
  }

  document.getElementById('hour').innerText = returnData(hour);
  document.getElementById('minute').innerText = returnData(minute);
  document.getElementById('second').innerText = returnData(second);
}

function returnData(input) {
  return input > 10 ? input : `0${input}`
}




