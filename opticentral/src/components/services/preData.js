import { all } from "axios";
import { BsTypeH2 } from "react-icons/bs";
import { GiConsoleController } from "react-icons/gi";
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
                EC: [],
                DPA: [],
                NST: [],

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
        release: true,
        production: Object.keys(inputValues).map(index => ({
            brand: inputValues[index].brand,
            brewId: inputValues[index].brewId,
            volume: inputValues[index].volume,
            startTime: inputValues[index].dateInit,
            endTime: inputValues[index].dateEnd,
            release: true,

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
    console.log('aqui', dataReportEc)
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

function preDataUpdateReport(dataReport, data) {

    if (data.type === 'IC') {
        return {
            typeReport: data.type,
            processDataId: data.idReport[1],
            OPI_id: data.idReport[2],
            reportId: data.idReport[3],
            updateData: {
                startTime: dataReport.startTime,
                endTime: dataReport.endTime,
                totalTime: dataReport.totalTime,
                system: dataReport.system,
                subSystem: dataReport.subSystem,
                component: dataReport.component,
                failureMode: dataReport.failureMode,
                machine: dataReport.machine,
                solution: dataReport.solution,
                type: dataReport.type
            }
        }

    } else if (data.type === 'EC') {
        return {
            typeReport: data.type,
            processDataId: data.idReport[1],
            OPI_id: data.idReport[2],
            reportId: data.idReport[3],
            updateData: {
                startTime: dataReport.startTime,
                endTime: dataReport.endTime,
                totalTime: dataReport.totalTime,
                subTypeStop: dataReport.subTypeStop,
                typeStop: dataReport.typeStop,
                failureMode: dataReport.failureMode,
                solution: dataReport.solution,
                type: dataReport.type
            }


        }
    } else if (data.type === 'DPA') {
        return {
            typeReport: data.type,
            processDataId: data.idReport[1],
            OPI_id: data.idReport[2],
            reportId: data.idReport[3],
            updateData: {
                startTime: dataReport.startTime,
                endTime: dataReport.endTime,
                totalTime: dataReport.totalTime,
                subTypeStop: dataReport.subTypeStop,
                typeStop: dataReport.typeStop,
                specification: dataReport.specification,
                solution: dataReport.solution,
                type: dataReport.type
            }


        }
    } else if (data.type === 'NST') {
        return {
            typeReport: data.type,
            processDataId: data.idReport[1],
            OPI_id: data.idReport[2],
            reportId: data.idReport[3],
            updateData: {
                startTime: dataReport.startTime,
                endTime: dataReport.endTime,
                totalTime: dataReport.totalTime,
                subTypeStop: dataReport.subTypeStop,
                typeStop: dataReport.typeStop,
                solution: dataReport.solution,
                type: dataReport.type
            }


        }
    } else {
        return {
            typeReport: data.type,
            processDataId: data.idReport[1],
            productionId: data.idReport[2],
            reportId: data.idReport[3],
            itemReportId: data.idReport[4],            
            updateData: {
                startTime:dataReport.startTime,
                endTime:dataReport.endTime,
                totalTime:dataReport.totalTime,
                volume:dataReport.volume,
                type:dataReport.type

            }

        }
    }



}

function validateDataWhithoutNull(data) {

    return Object.values(data).some(value => value === null || value === '');



}

// Función para transformar un array de reportes en el formato deseado
function transformReportItems(reportItems, type, name, bg, ids, marca, brewId, reportId, processDataId, productionId) {
    const idsArray = [...ids, processDataId, productionId, reportId]
    return reportItems.map(item => ({

        idReport: [...idsArray, item._id],
        name,
        data: { item },
        bg: bg,
        brand: marca,
        brewId: brewId,
        type: type




    }));
};
function transformReportItemsEXT(reportItems, type, name, bg, ids, itemId, processDataId) {
    const idsArray = [...ids, processDataId, itemId]

    return reportItems.map(item => ({
        type: type,
        name,
        idReport: [...idsArray, item._id],
        bg: bg,
        data: { item }


    }));
};


function sortReportsByStartTime(reports) {
    return reports.sort((a, b) => {
        // Obtener el tiempo de inicio de 'a', verificando ambos casos
        const startTimeA = a.data?.item?.startTime || a.startTime;
        const startTimeB = b.data?.item?.startTime || b.startTime;

        // Crear objetos de fecha para cada tiempo de inicio
        const timeA = new Date(`1970-01-01T${startTimeA}:00`);
        const timeB = new Date(`1970-01-01T${startTimeB}:00`);

        // Comparar los tiempos
        return timeA - timeB;
    });
}


//funcion extraer los reportes

function extractedReportData(data, ids) {

    const production = data.production
    const OPI = data.OPI
    const processDataId = data._id
    let allTransformedData1 = [];
    let allTransformedData2 = [];



    OPI.forEach((item) => {

        const transformData = [
            ...transformReportItemsEXT(item.IC, 'IC', 'Avería', '#F68D2B', ids, item._id, processDataId),
            ...transformReportItemsEXT(item.EC, 'EC', 'Paro Externo', '#4B6DAE', ids, item._id, processDataId),
            ...transformReportItemsEXT(item.DPA, 'DPA', 'Paro Programado', '#D9DB4A', ids, item._id, processDataId),
            ...transformReportItemsEXT(item.NST, 'NST', 'No Programado', '#BB8493', ids, item._id, processDataId)

        ]
        allTransformedData1 = transformData.concat(allTransformedData1)

    })




    production.forEach(dataItem => {
        const report = dataItem.report[0];
        const reportId = report._id
        const productionId = dataItem._id


        const transformData = [
            ...transformReportItems(report.productionReportItem, 'EBT', 'Producción', '#A5DD9B', ids, dataItem.brand, dataItem.brewId, reportId, processDataId, productionId)
        ]
        allTransformedData2 = transformData.concat(allTransformedData2)

    })

    const allTransformedData = [...allTransformedData1, ...allTransformedData2];

    return sortReportsByStartTime(allTransformedData)

}

// Función separada para calcular el tiempo total
function extractedTotalTime(dataArray) {
    // Usamos reduce para sumar los tiempos totales de cada reporte
    const totalTime = dataArray.reduce((sum, report) => {
        // Verificamos si el reporte tiene 'data.item.totalTime' o 'tiempoTotal'
        const reportTime = report.data?.item?.totalTime || report.totalTime || 0;
        return sum + reportTime;
    }, 0);

    // Devolver el tiempo total con dos decimales
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
    extractedTotalTime,
    preDataUpdateReport
}