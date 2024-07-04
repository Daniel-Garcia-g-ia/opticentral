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
                return response.json();
            })
            .then(data => {
                resolve(data);
            })
            .catch(error => {
                reject(error);
            });
    });
}
function fetchOneData(url, equipmentId, date, turn, token) {
    return new Promise((resolve, reject) => {
        fetch(`${url}/${equipmentId}/${date}/${turn}`, {
            headers: {
                "Content-Type": "application/json",
                "x-access-token": token
            }

        }).then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        }).then(data => {
            resolve(data);

        }).catch(error => {
            reject(error)
        })



    })

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


export {
    fetchData,
    fetchOneData,
    fetchSetReport

};