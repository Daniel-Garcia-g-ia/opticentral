

const transformData = (apiResponse) => {
    const transformed = [];

    apiResponse.body.data.forEach((equipment) => {
        equipment.processData.forEach((process) => {
            process.production.forEach((prod) => {
                transformed.push({
                    equipmentId: equipment._id,
                    equipmentName: equipment.equipmentName,
                    location: equipment.location,
                    processDataId: process._id,
                    date: process.date,
                    turn: process.turn,
                    brand: prod.brand,
                    brewId: prod.brewId,
                    volume: prod.volume,
                    productionId: prod._id,
                    reportId: prod.report[0]?._id || null, // Maneja posibles reportes vacíos
                    reports: prod.report.map((r) => r._id), // Lista de todos los reportes
                    productionReportItems: prod.report.flatMap((r) => r.productionReportItem),
                });
            });
        });
    });

    return transformed;
};

export {
    transformData
}
