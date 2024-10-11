import Swal from 'sweetalert2';

function successAlert (){
    Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: title,
        showConfirmButton: false,
        timer: 1500
      })
}

function basicMessage(message){
    Swal.fire(message)
}

function textUnderMessage(title, text, icon){
    Swal.fire({
        title: title,
        text: text,
        icon: icon
      });
}

function eventBasic(icon,message){

    Swal.fire({
        position: "top-end",
        icon: icon,
        title: message,
        showConfirmButton: false,
        timer: 1500
      });
}


function processingAction(){
  let timerInterval;
  Swal.fire({
    title: "Auto close alert!",
    html: "I will close in <b></b> milliseconds.",
    timer: 2000,
    timerProgressBar: true,
    didOpen: () => {
      Swal.showLoading();
      const timer = Swal.getPopup().querySelector("b");
      timerInterval = setInterval(() => {
        timer.textContent = `${Swal.getTimerLeft()}`;
      }, 100);
    },
    willClose: () => {
      clearInterval(timerInterval);
    }
  }).then((result) => {
    /* Read more about handling dismissals below */
    if (result.dismiss === Swal.DismissReason.timer) {
      console.log("I was closed by the timer");
    }
  });


export{
    successAlert,
    basicMessage,
    textUnderMessage,
    eventBasic,
    processingAction
}


