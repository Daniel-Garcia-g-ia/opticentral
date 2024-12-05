import axios from 'axios';




function dataBrands(url, token) {
    return new Promise((resolve, reject) => {
        fetch(url, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "x-access-token": token
            }
        }).then(response => {
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
    })

}





export default {
    dataBrands

}