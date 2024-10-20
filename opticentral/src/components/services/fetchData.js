import axios from 'axios';


function fetchData(url, token) {
    return new Promise((resolve, reject) => {
        fetch(url, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "x-access-token": token
            }
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                console.log(response)
                return response.json();
            })
            .then(data => {
                console.log(data)
                resolve(data);
            })
            .catch(error => {
                reject(error);
            });
    });
}


async function fetchOneData(url, equipmentId, date, turn, token) {
    try {
        const response = await axios.get(`${url}/${equipmentId}/${date}/${turn}`, {
            headers: {
                "Content-Type": "application/json",
                "x-access-token": token
            }
        });

        // Axios automáticamente lanza un error si la respuesta no tiene éxito
        return response.data;

    } catch (error) {
        // Aquí puedes manejar el error adecuadamente
        console.error('Error fetching data:', error);
        throw error;
    }
}

function fetchSetReport(url, token, data) {
    return new Promise((resolve, reject) => {


        fetch(url, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "x-access-token": token
            },
            body: JSON.stringify(data)
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => resolve(data))
            .catch(error => reject(error));
    });
}

async function fetchUpdateReportProduction(url, reportId, token, data) {
    try {
        const response = await axios.put(`${url}/${reportId}`, data, {
            headers: {
                "Content-Type": "application/json",
                "x-access-token": token
            }
        });

        return response.data; // Axios maneja la conversión JSON automáticamente
    } catch (error) {
        console.error('Axios error:', error);
        throw error; // Para que la llamada pueda manejar el error
    }
}





export {
    fetchData,
    fetchOneData,
    fetchSetReport,
    fetchUpdateReportProduction

};