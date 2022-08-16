//Inicializacion de variables
let cardsUnboxin = 0;
let card1 = null;
let card2 = null;
let firsResult = null;
let secResult = null;
let movimientos = 0;
let aciertos = 0;
let tempo = false;
let timer = 30;
let tiempoReg = null;
let timerInit = 30;
let p = document.getElementById("p");

//documents html
let moves = document.getElementById('movimientos');
let acierto = document.getElementById('aciertos');
let mostrarTiempo = document.getElementById('tiempo');
//Generacion de nros aleatorios
let numbers = [1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8];
numbers = numbers.sort(()=>{return Math.random()-0.5});
p.innerHTML = numbers
console.log(numbers)
//Funciones sec
function contarTiempo(){
    tiempoReg = setInterval(()=>{
        timer--;
        mostrarTiempo.innerHTML = `Tiempo: ${timer} segundos`;
        if(timer === 0){
            clearInterval(tiempoReg);
            bloqCard();
            mostrarTiempo.innerHTML = `Perdiste perdiste no hay nadie peor que vos 🤣`;
        }
    },1000);
}

function bloqCard(){
    for(let i = 0; i<=15;i++){
        let cardBloq = document.getElementById(i);
        cardBloq.innerHTML = `<img src="img/${numbers[i]}.png" alt="" srcset="">`;
        cardBloq.disabled = true;
    }
}
//Funcion principal
function unbox(id){

    if(tempo === false){
        contarTiempo();
        tempo = true;
    }

    cardsUnboxin++;
    if(cardsUnboxin == 1){
        //mostrar primer nro
        card1 = document.getElementById(id);
        firsResult = numbers[id];
        card1.innerHTML = `<img src="img/${firsResult}.png" alt="" srcset="">`;
        card1.style.transform = "rotateY(180deg)";
        //Deshabilitar primer boton
        card1.disabled = true;
    }else if(cardsUnboxin == 2){
        //mostrar segundo nro
        card2 = document.getElementById(id);
        secResult = numbers[id];
        card2.innerHTML = `<img src="img/${secResult}.png" alt="" srcset="">`;
        card2.style.transform = "rotateY(180deg)";
        //Deshabilitar segundo boton
        card2.disabled = true;
        //incrementar movimientos
        movimientos++;
        moves.innerHTML = `Movimientos: ${movimientos}`;

        if(firsResult == secResult){
            //Encerrar contador tarjetas
            cardsUnboxin = 0;

            //Aumentar aciertos
            aciertos++;
            acierto.innerHTML = `Aciertos: ${aciertos}`;

            if(aciertos == 8){
                clearInterval(tiempoReg);
                acierto.innerHTML = `Aciertos: ${aciertos}😱`;
                mostrarTiempo.innerHTML = `Fantastico! 🥳️ Solo tardaste ${timerInit - timer} segundos`;
                moves.innerHTML = `Movimientos: ${movimientos}😸`;
                
            }
        }else{
            //mostrar momentaneamente valores y volver a tapar
            setTimeout(()=>{
                card1.innerHTML = " ";
                card1.style.transform = "rotateY(360deg)";
                card2.innerHTML = " ";
                card2.style.transform = "rotateY(360deg)";
                card1.disabled = false;
                card2.disabled = false;
                cardsUnboxin = 0;
            },900);
        }
    }
}