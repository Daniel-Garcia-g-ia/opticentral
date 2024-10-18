import { all } from "axios";
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
                    productionReportItem: []

                }

                ]
            })),
            OPI: [{
                IC: [],
                EC: []

            }]


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
        productionReportItem: "productionReportItem",
        typeReport: "production",
        processDataId: dataIds.processDataId,
        productionId: dataIds.productionId,
        reportId: dataIds.reportId,
        startTime: dataReportProdcution.startTime,
        endTime: dataReportProdcution.endTime,
        totalTime: dataReportProdcution.totalTime,
        volume: dataReportProdcution.volume
    }


}

function preDataReportItemIc(dataIds, dataReportIc) {
    return {
        productionICItem: "Equipamento",
        typeReport: dataReportIc.type,
        processDataId: dataIds.processId,
        startTime: dataReportIc.startTime,
        endTime: dataReportIc.endTime,
        totalTime: dataReportIc.totalTime,
        system: dataReportIc.system,
        subSystem: dataReportIc.subSystem,
        component: dataReportIc.component,
        failureMode: dataReportIc.failureMode,
        machine: dataReportIc.machine,
        solution: dataReportIc.solution,

    }
}
function preDataReportItemEc(dataIds, dataReportEc) {
    console.log(dataReportEc)
    return {
        
        productionEcItem: "Externo",
        typeReport: dataReportEc.type,
        processDataId: dataIds.processId,        
        startTime: dataReportEc.startTime,
        endTime: dataReportEc.endTime,
        totalTime: dataReportEc.totalTime,
        typeStop: dataReportEc.typeStop,
        subTypeStop: dataReportEc.subTypeStop,
        failureMode: dataReportEc.failureMode,
        solution: dataReportEc.solution
    }
}
function preDataReportItemDPA(dataIds, dataReportDPA) {
    return {
        productionDPAItem: "Paro Programado",
        typeReport: dataReportDPA.type,
        processDataId: dataIds.processId,        
        startTime: dataReportDPA.startTime,
        endTime: dataReportDPA.endTime,
        totalTime: dataReportDPA.totalTime,
        typeStop: dataReportDPA.typeStop,
        subTypeStop: dataReportDPA.subTypeStop,
        specification: dataReportDPA.specification,
        solution: dataReportDPA.solution,


    }
}
function preDataReportItemNST(dataIds, dataReportNST) {
    return {
        productionNSTItem: "No Programado",
        typeReport: dataReportNST.type,
        processDataId: dataIds.processId,        
        startTime: dataReportNST.startTime,
        endTime: dataReportNST.endTime,
        totalTime: dataReportNST.totalTime,
        typeStop: dataReportNST.typeStop,
        subTypeStop: dataReportNST.subTypeStop,        
        solution: dataReportNST.solution,


    }
}

function validateDataWhithoutNull(data) {

    return Object.values(data).some(value => value === null || value === '');



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

    const production = data.production    
    const OPI = data.OPI
    let allTransformedData1 = [];
    let allTransformedData2= [];


    OPI.forEach((item) => {

        const transformData = [
            ...transformReportItems(item.IC, 'Averia', '#F68D2B', 'Averia Equipamento', '01'),
            ...transformReportItems(item.EC, 'Paro Externo', '#4B6DAE', 'Paro Externo', '01'),
            ...transformReportItems(item.DPA, 'Paro Programado', '#D9DB4A', 'Paro Programado', '01'),
            ...transformReportItems(item.NST, 'No Programado', '#BB8493', 'No Programado', '01')

        ]
        allTransformedData1 = transformData.concat(allTransformedData1)

    })

    production.forEach(dataItem=>{
       const report = dataItem.report[0];

       const transformData = [
        ...transformReportItems(report.productionReportItem, 'Producción', '#A5DD9B', dataItem.brand, dataItem.brewId)
       ]
       allTransformedData2 = transformData.concat(allTransformedData2)

    })
    
    const allTransformedData=[...allTransformedData1, ...allTransformedData2];    

    return sortReportsByStartTime(allTransformedData)
   
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
    preDataReportItemIc,
    preDataReportItemEc,
    preDataReportItemDPA,
    preDataReportItemNST,
    validateDataWhithoutNull,
    extractedReportData,
    extractedTotalTime
}