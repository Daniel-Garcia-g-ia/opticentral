import { all } from "axios";
import { BsTypeH2 } from "react-icons/bs";
import { GiConsoleController } from "react-icons/gi";
import { LiaEtsy } from "react-icons/lia";
import { SiTruenas, SiTrueup } from "react-icons/si";
import TurnoNoProgramado from "../dashBoard/TurnoNoProgramado";
import { basicMessage } from "./alerts";

function flatArray(data) {
    const newData = data.flat()

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

function preDataReportItemProduction(dataIds, dataReportProdcution, date, turn) {
    return {
        productionReportItem: "productionReportItem",
        typeReport: "production",
        date: date,
        turn: turn,
        processDataId: dataIds.processDataId,
        productionId: dataIds.productionId,
        reportId: dataIds.reportId,
        startTime: dataReportProdcution.startTime,
        endTime: dataReportProdcution.endTime,
        totalTime: dataReportProdcution.totalTime,
        volume: dataReportProdcution.volume
    }


}

function preDataReportItemIc(dataIds, dataReportIc, date, turn) {
    return {
        productionICItem: "Equipamento",
        typeReport: dataReportIc.type,
        processDataId: dataIds.processId,
        date: date,
        turn: turn,
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
function preDataReportItemEc(dataIds, dataReportEc, date, turn) {

    return {

        productionEcItem: "Externo",
        typeReport: dataReportEc.type,
        processDataId: dataIds.processId,
        date: date,
        turn: turn,
        startTime: dataReportEc.startTime,
        endTime: dataReportEc.endTime,
        totalTime: dataReportEc.totalTime,
        typeStop: dataReportEc.typeStop,
        subTypeStop: dataReportEc.subTypeStop,
        failureMode: dataReportEc.failureMode,
        solution: dataReportEc.solution
    }
}
function preDataReportItemDPA(dataIds, dataReportDPA, date, turn) {
    return {
        productionDPAItem: "Paro Programado",
        typeReport: dataReportDPA.type,
        processDataId: dataIds.processId,
        date: date,
        turn: turn,
        startTime: dataReportDPA.startTime,
        endTime: dataReportDPA.endTime,
        totalTime: dataReportDPA.totalTime,
        typeStop: dataReportDPA.typeStop,
        subTypeStop: dataReportDPA.subTypeStop,
        specification: dataReportDPA.specification,
        solution: dataReportDPA.solution,


    }
}
function preDataReportItemNST(dataIds, dataReportNST, date, turn) {
    return {
        productionNSTItem: "No Programado",
        typeReport: dataReportNST.type,
        processDataId: dataIds.processId,
        date: date,
        turn: turn,
        startTime: dataReportNST.startTime,
        endTime: dataReportNST.endTime,
        totalTime: dataReportNST.totalTime,
        typeStop: dataReportNST.typeStop,
        subTypeStop: dataReportNST.subTypeStop,
        solution: dataReportNST.solution,


    }
}

function preDataSetReportOpi(data, date, turn) {
    console.log(data)
    if (data.typeReport === 'IC') {
        return {
            equipmentId: data.equipmentId,
            equipmentName: data.equipmentName,
            location: data.location,
            date: date,
            turn: turn,
            typeReport: data.typeReport,
            startTime: data.startTime,
            endTime: data.endTime,
            totalTime: data.totalTime,
            system: data.system,
            subSystem: data.subSystem,
            component: data.component,
            failureMode: data.failureMode,
            solution: data.solution
        }
    } else if (data.typeReport === 'EC') {
        return {
            equipmentId: data.equipmentId,
            equipmentNam: data.equipmentName,
            location: data.location,
            date: date,
            turn: turn,
            typeReport: data.typeReport,
            startTime: data.startTime,
            endTime: data.endTime,
            totalTime: data.totalTime,
            typeStop: data.typeStop,
            subTypeStop: data.subTypeStop,
            failureMode: data.failureMode,
            solution: data.solution
        }
    } else if (data.typeReport === 'DPA') {
        return {
            equipmentId: data.equipmentId,
            equipmentNam: data.equipmentName,
            location: data.location,
            date: date,
            turn: turn,
            typeReport: data.typeReport,
            startTime: data.startTime,
            endTime: data.endTime,
            totalTime: data.totalTime,
            typeReports: data.typeStop,
            subTypeReport: data.subTypeStop,
            specification: data.specification,
            solution: data.solution
        }
    } else if (data.typeReport === 'NST') {
        return {
            equipmentId: data.equipmentId,
            equipmentNam: data.equipmentName,
            location: data.location,
            date: date,
            turn: turn,
            typeReport: data.typeReport,
            startTime: data.startTime,
            endTime: data.endTime,
            totalTime: data.totalTime,
            typeStop: data.typeStop,
            subTypeStop: data.subTypeStop,
            solution: data.solution


        }
    }

}

function preDataUpdateReport(dataReport, data, date, turn) {

    if (data.type === 'IC') {
        return {
            typeReport: data.type,
            processDataId: data.idReport[1],
            OPI_id: data.idReport[1],
            reportId: data.idReport[1],
            updateData: {
                date: date,
                turn: turn,
                startTime: dataReport.startTime,
                endTime: dataReport.endTime,
                totalTime: dataReport.totalTime,
                system: dataReport.system,
                subSystem: dataReport.subSystem,
                component: dataReport.component,
                failureMode: dataReport.failureMode,
                machine: dataReport.machine,
                solution: dataReport.solution,
                typess: dataReport.type
            }
        }

    } else if (data.type === 'EC') {
        return {
            typeReport: data.type,
            processDataId: data.idReport[1],
            OPI_id: data.idReport[1],
            reportId: data.idReport[1],
            updateData: {
                turn: turn,
                date: date,
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
            OPI_id: data.idReport[1],
            reportId: data.idReport[1],
            updateData: {
                turn: turn,
                date: date,
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
            OPI_id: data.idReport[1],
            reportId: data.idReport[1],
            updateData: {
                turn: turn,
                date: date,
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
                turn: turn,
                date: date,
                startTime: dataReport.startTime,
                endTime: dataReport.endTime,
                totalTime: dataReport.totalTime,
                volume: dataReport.volume,
                type: dataReport.type

            }

        }
    }



}

function validateDataWhithoutNull(data) {

    return Object.values(data).some(value => value === null || value === '');



}

// Función para transformar un array de reportes en el formato deseado
function transformReportItems(reportItems, type, name, bg, ids, marca, brewId, reportId, processDataId, productionId) {

    const idsArray = [ids, processDataId, productionId, reportId]
    return reportItems.map(report => ({
        idReport: [...idsArray, report._id],
        name,
        data: { report },
        bg: bg,
        brand: marca,
        brewId: brewId,
        type: type




    }));
};
function transformReportItemsEXT(reportItems, type, name, bg, ids, itemId, processDataId) {
    const idsArray = [ids, processDataId, itemId]

    return reportItems.map(item => ({
        type: type,
        name,
        idReport: [...idsArray, item._id],
        bg: bg,
        data: { item }


    }));
};

function transforOPiItems(report, name, bg, _id) {
    return {
        type: report.typeReport,
        name: name,
        idReport: [_id, report._id],
        bg: bg,
        data: { report }

    }
}


function sortReportsByStartTime(reports) {
    return reports.sort((a, b) => {
        // Extraemos el startTime de cada reporte desde data.report.startTime
        const startTimeA = a.data?.report?.startTime;
        const startTimeB = b.data?.report?.startTime;

        // Ajustamos la hora si es turno nocturno
        const adjustedTimeA = adjustTimeForNightShift(startTimeA);
        const adjustedTimeB = adjustTimeForNightShift(startTimeB);

        // Comparamos las horas ajustadas
        return adjustedTimeA - adjustedTimeB;
    });
}

// Ajusta el tiempo si pertenece a un turno nocturno
function adjustTimeForNightShift(startTime) {
    const time = new Date(`1970-01-01T${startTime}:00`);
    // Si el tiempo es entre las 00:00 y las 06:00, lo trasladamos al día siguiente
    if (time.getHours() < 6) {
        time.setDate(time.getDate() + 1);
    }
    return time;
}


//funcion extraer los reportes

function extracteOpiReport(data) {
    let allTransformedData1 = [];
    let allTransformedData2 = [];
    let _id = data._id
    data.report.forEach((report, index) => {


        report.IC.map((report) => {
            const transformDataOPI = [
                transforOPiItems(report, 'Averia', '#F68D2B', _id),
            ]
            allTransformedData1 = transformDataOPI.concat(allTransformedData1);
        })
        report.EC.map((report) => {
            const transformDataOPI = [
                transforOPiItems(report, 'Paro Externo', '#4B6DAE', _id),
            ]
            allTransformedData1 = transformDataOPI.concat(allTransformedData1);
        })
        report.DPA.map((report) => {
            const transformDataOPI = [
                transforOPiItems(report, 'Paro Programado', '#D9DB4A', _id),
            ]
            allTransformedData1 = transformDataOPI.concat(allTransformedData1);
        })
        report.NST.map((report) => {
            const transformDataOPI = [
                transforOPiItems(report, 'No Programado', '#BB8493', _id),
            ]
            allTransformedData1 = transformDataOPI.concat(allTransformedData1);

        })

    })
    const allTransformedData = [...allTransformedData1, ...allTransformedData2];
    return sortReportsByStartTime(allTransformedData);
}

function extractedReportData(data, ids, date, turn) {
    let allTransformedData1 = [];
    let allTransformedData2 = [];

    // Recorrer todos los equipos
    data.forEach((equipment, index) => {
        // Recorrer los datos de proceso
        equipment.processData.forEach((processData) => {
            const processDataId = processData._id;

            // Procesar datos de producción
            processData.production.forEach((productionItem) => {
                const productionId = productionItem._id;

                // Recorrer los reportes
                productionItem.report.forEach((report) => {
                    const reportId = report._id;

                    // Recorrer cada productionReportItem
                    const productionReportItems = report.productionReportItem || []; // Asegúrate de que sea un arreglo
                    productionReportItems.forEach((reportItem) => {
                        // Comparar con la fecha y el turno proporcionados
                        if (reportItem.date === date && reportItem.turn === turn) {
                            const transformDataProduction = [
                                ...transformReportItems(
                                    Array.isArray(reportItem) ? reportItem : [reportItem], // Asegúrate de pasar un arreglo
                                    'EBT',
                                    'Producción',
                                    '#A5DD9B',
                                    ids[index],
                                    productionItem.brand,
                                    productionItem.brewId,
                                    reportId,
                                    processDataId,
                                    productionId
                                )
                            ];
                            allTransformedData2 = transformDataProduction.concat(allTransformedData2);
                        }
                    });
                });
            });

            // Procesar datos OPI
            processData.OPI.forEach((opiItem) => {
                const transformDataOPI = [
                    ...transformReportItemsEXT(
                        Array.isArray(opiItem.IC) ? opiItem.IC.filter(item => item.date === date && item.turn === turn) : [],
                        'IC',
                        'Avería',
                        '#F68D2B',
                        ids[index],
                        opiItem._id,
                        processDataId
                    ),
                    ...transformReportItemsEXT(
                        Array.isArray(opiItem.EC) ? opiItem.EC.filter(item => item.date === date && item.turn === turn) : [],
                        'EC',
                        'Paro Externo',
                        '#4B6DAE',
                        ids[index],
                        opiItem._id,
                        processDataId
                    ),
                    ...transformReportItemsEXT(
                        Array.isArray(opiItem.DPA) ? opiItem.DPA.filter(item => item.date === date && item.turn === turn) : [],
                        'DPA',
                        'Paro Programado',
                        '#D9DB4A',
                        ids[index],
                        opiItem._id,
                        processDataId
                    ),
                    ...transformReportItemsEXT(
                        Array.isArray(opiItem.NST) ? opiItem.NST.filter(item => item.date === date && item.turn === turn) : [],
                        'NST',
                        'No Programado',
                        '#BB8493',
                        ids[index],
                        opiItem._id,
                        processDataId
                    )
                ];
                allTransformedData1 = transformDataOPI.concat(allTransformedData1);
            });
        });
    });

    const allTransformedData = [...allTransformedData1, ...allTransformedData2];
    return sortReportsByStartTime(allTransformedData);
}


// Función separada para calcular el tiempo total
function extractedTotalTime(dataArray) {

    // Usamos reduce para sumar los tiempos totales de cada reporte
    const totalTime = dataArray.reduce((sum, report) => {
        // Verificamos si el reporte tiene 'data.item.totalTime' o 'tiempoTotal'
        const reportTime = report.data?.report?.totalTime || report.totalTime || 0;
        return sum + reportTime;
    }, 0);

    // Devolver el tiempo total con dos decimales
    return totalTime.toFixed(2);
}
function transformDataMain(data) {
    return data.flatMap((equipment) =>
        equipment.processData.flatMap((process) =>
            process.production.map((prod) => ({
                _id: equipment._id, // ID del equipo
                processDataId: process._id, // ID del proceso
                productionId: prod._id, // ID de la producción
                reportId: prod.report[0]?._id || null, // Manejo de reportes vacíos
                brand: prod.brand, // Marca
                volume: prod.volume, // Volumen de producción
                brewId: prod.brewId, // ID del lote
            }))
        )
    );
}

function dataBrand(data) {
    // Procesar las marcas del primer elemento del array
    const processedBrands = Object.entries(data[0].brands).map(
        ([brandName, brandInfo]) => ({
            name: brandName,
            theorecalTime: brandInfo.theorecalTime,
            brandId: brandInfo.brandId,
        })
    );

    return processedBrands;
}


function preDataDownLoad(date1, date2) {
    const data = {
        date1: date1,
        date2: date2
    }
    return data

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
    preDataUpdateReport,
    transformDataMain,
    dataBrand,
    preDataDownLoad,
    preDataSetReportOpi,
    extracteOpiReport,
    transforOPiItems, 
    sortReportsByStartTime
}