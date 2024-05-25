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

export{
    successAlert,
    basicMessage,
    textUnderMessage
}


