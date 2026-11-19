const listaImagenes = [
    ["anteater","bulldog","butterfly","cat","chameleon","clown-fish","crocodile","duck","frog","giraffe","kangaroo","lion","monkey","octopus","ostrich","pig","rabbit","racoon","ray","shark","sheep","spider","squirrel","swan","tiger","toucan","turtle"],
    ["brain.svg", "ear.svg", "eye.svg", "eyebrow.svg", "eyelashes.svg", "finger.svg", "foot.svg", "hair.svg", "hand.svg", "head.svg", "heart.svg", "kidney.svg", "leg.svg", "lips.svg", "liver.svg", "lungs.svg", "nose.svg"],
    ["badminton.svg", "basketball.svg", "bowling.svg", "boxing.svg", "diving.svg", "football.svg", "golf.svg", "gymnastics.svg", "handball.svg", "ice hockey.svg", "ping pong.svg", "running.svg", "sailing.svg", "shooting.svg", "swimming.svg", "tennis.svg", "volleyball.svg", "waterpolo.svg"],
    ["calculator.svg", "clock.svg", "computer.svg", "fridge.svg", "keyboard.svg", "laptop-svgrepo-com.svg", "laptop.svg", "microphone.svg", "mouse.svg", "printer.svg", "radio.svg", "telephone.svg", "television.svg"],
    ["apple.svg", "avocado.svg", "banana.svg", "carrot.svg", "cherry.svg", "eggplant.svg", "garlic.svg", "graps.svg", "kiwi.svg", "lemon.svg", "onion.svg", "orange.svg", "peach.svg", "pepper.svg", "pineapple.svg", "plum.svg", "pumpkin.svg", "strawberry.svg", "tomato.svg", "watermelon.svg"],
    ["chef.svg", "chemist.svg", "clown.svg", "cycling.svg", "dancer.svg", "doctor.svg", "farmer.svg", "fencing.svg", "fisherman.svg", "hairdresser.svg", "maid.svg", "nurse.svg", "painter.svg", "police.svg", "postman.svg", "sailor.svg", "skiing.svg", "stewardess.svg", "surgeon.svg", "teacher.svg", "waiter.svg"],
    ["backpack.svg", "bathrobe.svg", "boot.svg", "cap.svg", "dress.svg", "glasses.svg", "glove.svg", "handbag.svg", "jacket copy.svg", "jacket.svg", "scarf.svg", "shirt.svg", "shoe.svg", "short.svg", "skirt.svg", "sock.svg", "suit.svg", "sunglasses.svg", "swinsuit.svg", "t-shirt.svg", "tie.svg", "trousers.svg", "watch.svg"],
    ["airplane.svg", "ambulance.svg", "bicycle.svg", "bus.svg", "car.svg", "excavator.svg", "helicopter.svg", "hot air balloon.svg", "motorcycle.svg", "sailboat.svg", "ship.svg", "taxi.svg", "tram.svg", "truck.svg", "zeppelin.svg"]
];
const listaAnimalesOriginal = listaImagenes;
let listaAnimales;

let animalElegido;
let queImagenes = 0;
let aciertos = 0;
let fallos = 0;
let tiempo = 0;
let reloj = null;
const sonidoAcierto = new Audio("assets/sounds/acierto.mp3");
const sonidoFallo = new Audio("assets/sounds/fallo.mp3");


// la dirección hacia atrás no es imprescindible para "barajar" en general, pero es la forma clásica de Fisher-Yates porque permite garantizar que cada posición se fija una sola vez y que todas las permutaciones tienen la misma probabilidad
function barajar(array) { // Algoritmo Fisher–Yates
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    // Desestructuración: a la derecha se crea un nuevo array cuyos valores se guardan en los elementos array[i] y array[j] del array origial.
    // Es como si hacemos array[i] = array[j] pero con una variable temporal
    [array[i], array[j]] = [array[j], array[i]]; 
  }
  return array;
}

// array.sort(() => Math.random() - 0.5);

// pero no es una implementación correcta de Fisher-Yates y no produce una distribución uniforme de las permutaciones.
// - 0.5 sirve para conseguir un número positivo o negativo de forma aleatoria.
//Math.random() devuelve un número entre 0 y 1:

function inicializar() {
    document.getElementById("tarjetas").addEventListener("click", comprobarAnimal );
    // uso [... para crea un array nuevo]
    listaAnimales = barajar([...listaAnimalesOriginal[queImagenes]]);
    const main = document.getElementById("tarjetas");
    main.textContent = "";
    for(const animal of listaAnimales) {
        const div = document.createElement("div");
        main.appendChild(div);
        div.classList.add('tarjeta')
        div.style.backgroundImage = `url(/assets/images/animales/${animal}.svg)`;
        div.dataset.nombre = animal;
    }
    generarNombre();
    aciertos = 0;
    fallos = 0;
    tiempo = 0;
    document.getElementById("aciertos").textContent = aciertos;
    document.getElementById("tiempo").textContent = 0;
    document.getElementById("fallos").textContent = fallos;
    const buenos = document.querySelector(".bien");
    for(const e in buenos) {
        e.classList.remove("bien");
    }
    clearInterval(reloj);
    reloj = setInterval(() => { tiempo++; document.getElementById("tiempo").textContent = tiempo} , 1000);
}

function generarNombre() {
    animalElegido = listaAnimales[Math.floor(Math.random() * listaAnimales.length)];
    const elementoAnimalElegido = document.getElementById("elegido")
    elementoAnimalElegido.textContent = animalElegido; 
    elementoAnimalElegido.classList.remove("animacionAnimalElegido");
    elementoAnimalElegido.offsetWidth;
    elementoAnimalElegido.classList.add("animacionAnimalElegido");

}

function comprobarAnimal(evt) {
    const seleccionado = evt.target;
    if(seleccionado.dataset.nombre != undefined && seleccionado.classList.contains("bien") == false) {
        if(seleccionado.dataset.nombre === animalElegido) {
            seleccionado.classList.add("tarjeta--acierto");
            seleccionado.classList.remove("mal");
            listaAnimales.splice(listaAnimales.findIndex(a => a === animalElegido), 1);
            aciertos++;
            sonidoAcierto.currentTime = 0;
            sonidoAcierto.play();
            document.getElementById("aciertos").textContent = aciertos;
            comprobarVictoria();
        } else {
            fallos++;
            sonidoFallo.currentTime = 0;
            sonidoFallo.play();
            document.getElementById("fallos").textContent = fallos;
            seleccionado.classList.remove("mal");
            seleccionado.offsetWidth;
            seleccionado.classList.add("mal");
        }
        generarNombre();
    }
}

function comprobarVictoria() {
    if(listaAnimales.length == 0) {
        document.getElementById("tarjetas").removeEventListener("click", comprobarAnimal );
        // Usar html en lugar de text
        Swal.fire({
        title: "Has ganado",
        html: `<div>Enhorabuena</div><div>Aciertos: ${aciertos}</div><div>Fallos: ${fallos}</div><div>Tiempo: ${tiempo}</div>`,
        icon: "success"
        })
        .then(() =>
            Swal.fire({
                title: "¿Jugar de nuevo?",
                //text: "You won't be able to revert this!", Opcional
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Sí",
                cancelButtonText: "No",
                theme: "dark"
                }).then((result) => {
                if (result.isConfirmed) {
                   inicializar();
                }
            })
        )
    }
}

function reiniciar() {
     Swal.fire({
            title: "¿Reiniciar partida?",
            //text: "You won't be able to revert this!", Opcional
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Sí",
            cancelButtonText: "No",
            theme: "dark"
            }).then((result) => {
            if (result.isConfirmed) {
                inicializar();
            }
        })
}


Swal.fire({
  title: "Aprende inglés",
  text: "Selecciona la imagen que coincida con el nombre",
  footer: "Dispones de un máximo de 10 intentos",
  icon: "info"
}).then(() => {
    inicializar();
});


    inicializar();


    function iniciarReloj() {
  temporizador = setInterval(() => {
    segundosTotales++;

    // 1. Calcular minutos y segundos restantes
    const minutos = Math.floor(segundosTotales / 60);
    const segundos = segundosTotales % 60;

    // 2. Dar formato estético (añadir un "0" delante si es menor a 10)
    const minTexto = String(minutos).padStart(2, '0');
    const segTexto = String(segundos).padStart(2, '0');

    // 3. Pintarlo en tu HTML
    document.getElementById("tiempo").textContent = `${minTexto}:${segTexto}`;
  }, 1000);
}

document.getElementById('reiniciar').addEventListener('click', reiniciar);