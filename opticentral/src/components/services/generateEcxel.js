import * as XLSX from "xlsx";

/**
 * Función para crear un archivo Excel con múltiples hojas y nombres de columnas personalizados.
 * @param {Object} apiDataProduction - Datos provenientes de la API reportes de produccion.
 * @param {Object} apiDataOpi - Datos provenientes de la API reportes de opiNona.
 * @param {string} fileName - Nombre del archivo Excel a generar.
 */
export function generateExcel(apiDataProduction, apiDataOpi, fileName = "multi_sheet.xlsx") {
    try {
        // Crear un libro de trabajo vacío
        const workbook = XLSX.utils.book_new();

        // Datos para cada hoja con sus respectivos nombres de columnas
        const sheetsData = {
            Production: [["EquipmentID", "EquipmentName", "Location",
                "DateProduction", "TurnProduction", "Brand",
                "BrewId", "VolumenProduction", "TurnReport",
                "StartTime", "EndTime", "TotalTime", "VolumenReport"
            ]],
            IC: [["EquipmentID", "EquipmentName", "Location",
                "Date", "Turn", "StartTime", "EndTime", "TotalTime",
                "System", "SubSystem", "Component", "FailureMode",
                "Machine", "Solution"
            ]],
            EC: [["EquipmentID", "EquipmentName", "Location",
                "Date", "Turn", "StartTime", "EndTime", "TotalTime",
                "TypeStop", "SubTypeStop", "FailureMode", "Solution"
            ]],
            DPA: [["EquipmentID", "EquipmentName", "Location",
                "Date", "Turn", "StartTime", "EndTime", "TotalTime",
                "TypeReport", "SubTypeReport", "Specification",
                "Solution"
            ]],
            NST: [["EquipmentID", "EquipmentName", "Location",
                "Date", "Turn", "StartTime", "EndTime", "TotalTime",
                "TypeStop", "SubTypeStop", "Solution"
            ]],
        };

        console.log(apiDataProduction, apiDataOpi)

        apiDataOpi.body.updateData.forEach((equipment) => {
            equipment.report.forEach((reports) => {
                reports.IC.forEach((icReport) => {
                    sheetsData.IC.push([
                        equipment.equipmentId,
                        equipment.equipmentName,
                        equipment.location,
                        icReport.date,
                        icReport.turn,
                        icReport.startTime,
                        icReport.endTime,
                        icReport.totalTime,
                        icReport.system,
                        icReport.subSystem,
                        icReport.component,
                        icReport.failureMode,
                        icReport.machine,
                        icReport.solution,
                    ]);
                })
                reports.EC.forEach((ecReport) => {
                    sheetsData.EC.push([
                        equipment.equipmentId,
                        equipment.equipmentName,
                        equipment.location,
                        ecReport.date,
                        ecReport.turn,
                        ecReport.startTime,
                        ecReport.endTime,
                        ecReport.totalTime,
                        ecReport.typeStop,
                        ecReport.subTypeStop,
                        ecReport.failureMode,
                        ecReport.solution,
                    ]);

                })
                reports.DPA.forEach((dpaReport) => {
                    sheetsData.DPA.push([
                        equipment.equipmentId,
                        equipment.equipmentName,
                        equipment.location,
                        dpaReport.date,
                        dpaReport.turn,
                        dpaReport.startTime,
                        dpaReport.endTime,
                        dpaReport.totalTime,
                        dpaReport.typeStop,
                        dpaReport.subTypeStop,
                        dpaReport.specification,
                        dpaReport.solution,
                    ]);

                })
                reports.NST.forEach((nstReport) => {
                    sheetsData.NST.push([
                        equipment.equipmentId,
                        equipment.equipmentName,
                        equipment.location,
                        nstReport.date,
                        nstReport.turn,
                        nstReport.startTime,
                        nstReport.endTime,
                        nstReport.totalTime,
                        nstReport.typeStop,
                        nstReport.subTypeStop,
                        nstReport.solution,
                    ]);

                })
            })
        })

        // Llenar la hoja `Production` con datos dinámicos
        apiDataProduction.body.updateData.forEach((equipment) => {
            equipment.processData.forEach((process) => {
                process.production.forEach((production) => {
                    production.report.forEach((report) => {
                        report.productionReportItem.forEach((item) => {
                            sheetsData.Production.push([
                                equipment.equipmentId,
                                equipment.equipmentName,
                                equipment.location,
                                process.date,
                                process.turn,
                                production.brand,
                                production.brewId,
                                production.volume,
                                item.turn,
                                item.startTime,
                                item.endTime,
                                item.totalTime,
                                item.volume,
                            ]);
                        });
                    });

                });
            });
        });

        // Crear hojas y añadirlas al libro de trabajo
        Object.entries(sheetsData).forEach(([sheetName, data]) => {
            const worksheet = XLSX.utils.aoa_to_sheet(data);
            XLSX.utils.book_append_sheet(workbook, worksheet, sheetName);
        });

        // Escribir el archivo y disparar la descarga
        XLSX.writeFile(workbook, fileName);
    } catch (error) {
        console.error("Error al generar el archivo Excel con múltiples hojas:", error);
    }
}
