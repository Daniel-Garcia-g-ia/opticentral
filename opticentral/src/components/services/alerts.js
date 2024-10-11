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


function processingAction(activate){
  
  if (activate){
    Swal.fire({
      title: 'Cargando ...',
      html: 'Por favor espere...',
      allowOutsideClick:false,
      didOpe:()=>{
        Swa.showLoading();
      }
    })
  }else{
    Swal.close()
  }
}


export{
    successAlert,
    basicMessage,
    textUnderMessage,
    eventBasic,
    processingAction
}


