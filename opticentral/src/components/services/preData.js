import { LiaEtsy } from "react-icons/lia";
import { SiTruenas, SiTrueup } from "react-icons/si";

function flatArray(data) {
    const newData = data.flat()
    /* console.log(newData); */
    return newData
}
function findMaxBrewId(processData) {
    let maxBrewId = 0;
    processData.forEach(item => {
        if (item.production && Array.isArray(item.production)) {
            item.production.forEach(productionItem => {
                if (productionItem.brewId > maxBrewId) {
                    maxBrewId = productionItem.brewId;
                }
            });
        }
    });
    return maxBrewId;
}

function dataNewReport(equipmentId, equipmentName, location, processData) {

    
    return {
        equipmentId: equipmentId,
        equipmentName: equipmentName,
        location: location,
        processData: [{
            date: processData.date,
            turn: processData.turn,
            release: processData.release,
            production: Object.keys(processData.production).map(index => ({
                brand: processData.production[index].brand,
                brewId: processData.production[index].brewId,
                volume: processData.production[index].volume,
                startTime: processData.production[index].dateInit,
                endTime: processData.production[index].dateEnd,
                release: processData.production[index].release
            }))
        }

        ]


    }

}

function preDatafreeProduction (date, turn, inputValues){

    

    
    const allReleased = Object.keys(inputValues).every(index => inputValues[index].release === true);
    
    const release = allReleased ? true : false;
   

    return{
        date: date,
        turn: turn,
        release: release ,
        production: Object.keys(inputValues).map(index => ({
            brand: inputValues[index].brand,
            brewId: inputValues[index].brewId,
            volume: inputValues[index].volume,
            startTime: inputValues[index].dateInit,
            endTime: inputValues[index].dateEnd,
            release: inputValues[index].release
        }))

    }
}
export {
    flatArray,
    findMaxBrewId,
    dataNewReport,
    preDatafreeProduction
}