let hambre = 0;
let sueno = 0;
let aburrimiento = 0;
let higiene = 0;
let contador = 10;
let contadorId; // Variable para almacenar el ID del intervalo del contador

const TAMAGOTCHI_CRITICO = 10;

const tamagotchiImg = document.getElementById('tamagotchiImg');
const mensajeUI = document.getElementById('mensaje');

function mostrarMensaje(mensaje) {
  mensajeUI.innerText = mensaje;
}

function actualizarEstado() {
  let statsCriticos = 0;
  let mensajeStats = '';

  if (hambre >= TAMAGOTCHI_CRITICO) {
    mensajeStats += '¡Tu Tamagotchi está Hambriento! ';
    statsCriticos++;
  }
  if (sueno >= TAMAGOTCHI_CRITICO) {
    mensajeStats += '¡Tu Tamagotchi tiene Sueño! ';
    statsCriticos++;
  }
  if (aburrimiento >= TAMAGOTCHI_CRITICO) {
    mensajeStats += '¡Tu Tamagotchi está Aburrido! ';
    statsCriticos++;
  }
  if (higiene >= TAMAGOTCHI_CRITICO) {
    mensajeStats += '¡Tu Tamagotchi no tiene hIgiene! ';
    statsCriticos++;
  }

  if (statsCriticos === 4) {
    contador--; // Reducir el contador si los 4 stats están críticos
    if (contador <= 0) {
      clearInterval(contadorId); // Detener el contador
      cerrarPagina(); // Función para cerrar la página
    }
  } else {
    contador = 10; // Reiniciar el contador si algún stat crítico se cura
  }

  if (statsCriticos === 0) {
    tamagotchiImg.src = 'img/normal.webp';
    mensajeUI.innerText = '';
  } else if (statsCriticos === 1) {
    tamagotchiImg.src = 'img/sorprendido.webp';
    mostrarMensaje(mensajeStats);
  } else {
    tamagotchiImg.src = 'img/triste.webp';
    mostrarMensaje(mensajeStats);
  }
}

function cerrarPagina() {
  // Función para cerrar la página
  window.close(); // Cierra la página actual
}

function iniciarContador() {
    contadorId = setInterval(() => {
      actualizarEstado();
      actualizarContador();
    }, 1000); // Actualizar el contador cada segundo
  }

  function actualizarContador() {
    const valorContador = document.getElementById('valorContador');
    valorContador.textContent = contador;
  }

// Ciclo para actualizar los stats cada 5 segundos
setInterval(() => {
  hambre += Math.floor(Math.random() * 3) + 1;
  sueno += Math.floor(Math.random() * 2) + 1;
  aburrimiento += Math.floor(Math.random() * 2) + 1;
  higiene += Math.floor(Math.random() * 2) + 1;
}, 5000);

document.addEventListener('keydown', function(event) {
  const teclaPresionada = event.key.toLowerCase();
  switch (teclaPresionada) {
    case 'h':
      if (hambre > 0) hambre--;
      break;
    case 's':
      if (sueno > 0) sueno--;
      break;
    case 'a':
      if (aburrimiento > 0) aburrimiento--;
      break;
    case 'i':
      if (higiene > 0) higiene--;
      break;
    default:
      break;
  }
  actualizarEstado();
});

// Iniciar el contador cuando la página se carga
window.onload = iniciarContador;
