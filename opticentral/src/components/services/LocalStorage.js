

function setLocalStorage (key,data) {
    try{
        localStorage.setItem(key, JSON.stringify(data));
        
    }catch(error){
        console.log("Error al guardar AUTH", error)
    }
}

function getLocalStorage (key){
    try{
        const data = localStorage.getItem(key)
        if (data){
            return JSON.parse(data);

        }else{
            return null ;
        }
    } catch (error){
        console.log('Error al obtener del local Storage', error)
    }
}

export {
    setLocalStorage,
    getLocalStorage
}