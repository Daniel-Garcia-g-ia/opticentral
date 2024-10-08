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
                release: processData.production[index].release,
                report: [{
                    productionReportItem: [],
                    productionFaultItem: [],
                    productionExternalStopItmem: [],
                    productionUnscheduled: [],

                }

                ]
            }))
        }

        ]


    }

}

function preDatafreeProduction(date, turn, inputValues) {


    const allReleased = Object.keys(inputValues).every(index => inputValues[index].release === true);

    const release = allReleased ? true : false;


    return {
        date: date,
        turn: turn,
        release: release,
        production: Object.keys(inputValues).map(index => ({
            brand: inputValues[index].brand,
            brewId: inputValues[index].brewId,
            volume: inputValues[index].volume,
            startTime: inputValues[index].dateInit,
            endTime: inputValues[index].dateEnd,
            release: inputValues[index].release,

        }))

    }
}

function preDataReportItemProduction(dataIds, dataReportProdcution) {
    return {
        productionReportItem:"productionReportItem",
        typeReport:"production",
        processDataId: dataIds.processDataId,
        productionId: dataIds.productionId,
        reportId: dataIds.reportId,
        startTime: dataReportProdcution.startTime,
        endTime: dataReportProdcution.endTime,
        totalTime: dataReportProdcution.totalTime,
        volume: dataReportProdcution.volume
    }


}

function preDataReportItemfault(dataIds,dataReportFault){
    return{
        productionFaultItem:"productionFaultItem",
        typeReport:"fault",
        processDataId: dataIds.processDataId,
        productionId: dataIds.productionId,
        reportId: dataIds.reportId,
        startTime: dataReportFault.startTime,
        endTime: dataReportFault.endTime,
        totalTime: dataReportFault.totalTime,
        system: dataReportFault.system,
        subSystem: dataReportFault.subSystem,
        component: dataReportFault.component,
        failureMode: dataReportFault.failureMode,
        solution: dataReportFault.solution,
        
    }
}
function preDataReportItemExternalStop(dataIds,dataReportExternalStop){
    return{
        productionExternalStopItem:"productionExternalStopItem",
        typeReport:"external",
        processDataId: dataIds.processDataId,
        productionId: dataIds.productionId,
        reportId: dataIds.reportId,
        startTime:dataReportExternalStop.startTime,
        endTime:dataReportExternalStop.endTime,
        totalTime:dataReportExternalStop.totalTime,
        typeStop: dataReportExternalStop.typeStop,
        detailStop: dataReportExternalStop.detailStop,
        descriptionStop: dataReportExternalStop.descriptionStop,
        solution: dataReportExternalStop.solution
    }
}
function preDataReportItemUnscheduled(dataIds,dataReportUnschedule){
    return{
        productionUnscheduledItem:"productionUnscheduledItem",
        typeReport:"Unscheduled",
        processDataId: dataIds.processDataId,
        productionId: dataIds.productionId,
        reportId: dataIds.reportId,
        startTime:dataReportUnschedule.startTime,
        endTime:dataReportUnschedule.endTime,
        totalTime:dataReportUnschedule.totalTime,        
        
    }
}

function validateDataWhithoutNull(data) {

    return Object.values(data).some(value => value === null || value ==='');



}





// Función para transformar un array de reportes en el formato deseado
function transformReportItems(reportItems, name, bg, marca, brewId) {
    return reportItems.map(item => ({
        name,
        tiempoTotal: item.totalTime,
        inicio: item.startTime,
        fin: item.endTime,
        bg: bg,  
        marca: marca,
        brewId: brewId

       
    }));
}

function sortReportsByStartTime(reports) {
    return reports.sort((a, b) => {
        const timeA = new Date(`1970-01-01T${a.inicio}:00`);
        const timeB = new Date(`1970-01-01T${b.inicio}:00`);
        return timeA - timeB;
    });
}

//funcion extraer los reportes

function extractedReportData(data) {
    let allTransformedData = [];

    data.forEach(dataItem => {
        const report = dataItem.report[0]; // Acceder al reporte en el dataItem actual
        
        // Transformar cada tipo de reporte (producción, avería, etc.) y agregarlo al array
        const transformedData = [            
            ...transformReportItems(report.productionReportItem, 'Producción', '#A5DD9B', dataItem.brand, dataItem.brewId),
            ...transformReportItems(report.productionFaultItem, 'Avería', '#F68D2B', dataItem.brand, dataItem.brewId),
            ...transformReportItems(report.productionExternalStopItem, 'Paro Externo', '#4B6DAE', dataItem.brand, dataItem.brewId),
            ...transformReportItems(report.productionUnscheduledItem, 'No Programado', '#BB8493', dataItem.brand, dataItem.brewId)
        ];

        allTransformedData = allTransformedData.concat(transformedData); // Agregar los datos transformados al array total
    });

    // Ordenar todos los reportes transformados por la hora de inicio
    return sortReportsByStartTime(allTransformedData);
}

// Función separada para calcular el tiempo total
function extractedTotalTime(dataArray) {
    // Usamos reduce para sumar los tiempos totales de cada reporte
    const totalTime = dataArray.reduce((sum, report) => sum + report.tiempoTotal, 0);
    return totalTime.toFixed(2);
}



export {
    flatArray,
    findMaxBrewId,
    dataNewReport,
    preDatafreeProduction,
    preDataReportItemProduction,
    preDataReportItemfault,
    preDataReportItemExternalStop,
    preDataReportItemUnscheduled,
    validateDataWhithoutNull,
    extractedReportData,
    extractedTotalTime
}