import * as XLSX from "xlsx";

/**
 * Función para crear un archivo Excel con datos de producción programada y reportes.
 * @param {Object} apiData - Datos provenientes de la API.
 * @param {string} fileName - Nombre del archivo Excel a generar.
 */
export function generateExcel(apiData, fileName = "production_report.xlsx") {
  try {
    const workbook = XLSX.utils.book_new();

    // Datos de la hoja Production
    const productionData = [["Brand", "BrewID", "Volume", "Turn", "Date", "StartTime", "EndTime", "TotalTime"]];
    apiData.body.updateData.forEach((equipment) => {
      equipment.processData.forEach((process) => {
        process.production.forEach((production) => {
          production.report.forEach((report) => {
            report.productionReportItem.forEach((item) => {
              productionData.push([
                production.brand,
                production.brewId,
                production.volume,
                item.turn,
                item.date,
                item.startTime,
                item.endTime,
                item.totalTime,
              ]);
            });
          });
        });
      });
    });

    const productionSheet = XLSX.utils.aoa_to_sheet(productionData);
    XLSX.utils.book_append_sheet(workbook, productionSheet, "Production");

    // Escribir el archivo y disparar la descarga
    XLSX.writeFile(workbook, fileName);
  } catch (error) {
    console.error("Error al generar el archivo Excel:", error);
  }
}
