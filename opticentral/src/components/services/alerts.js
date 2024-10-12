import Swal from 'sweetalert2';

function successAlert() {
  Swal.fire({
    position: 'top-end',
    icon: 'success',
    title: title,
    showConfirmButton: false,
    timer: 1500
  })
}

function basicMessage(message) {
  Swal.fire(message)
}

function textUnderMessage(title, text, icon) {
  Swal.fire({
    title: title,
    text: text,
    icon: icon
  });
}

function eventBasic(icon, message) {

  Swal.fire({
    position: "top-end",
    icon: icon,
    title: message,
    showConfirmButton: false,
    timer: 1500
  });
}


function processingAction(title,html,activate) {
  let timerInterval;


  Swal.fire({
    title: title,
    html: html, // Mensaje sin temporizador
    allowOutsideClick: false, // Evitar que el usuario lo cierre manualmente
    timerProgressBar: true,   // Mostrar la barra de progreso sin temporizador
    didOpen: () => {
      Swal.showLoading(); // Mostrar el ícono de carga
    }
    
  });
  
/* 
  // Simula el cambio de la variable para cerrar el modal
  setTimeout(() => {
    shouldClose = true; // Cambia la variable a true para cerrar el modal
  }, 3000); // Puedes ajustar el tiempo o usar otro evento para cambiar la variable */
}

function closeSwal (){
  Swal.close();
}

export {
  successAlert,
  basicMessage,
  textUnderMessage,
  eventBasic,
  processingAction,
  closeSwal
}


