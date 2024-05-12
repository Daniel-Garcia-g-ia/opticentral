

async function fetchLogin(link, email, password) {


    try {
        const response = await fetch(link, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",

            },
            body: JSON.stringify({ email, password }),
        });
        const data = await response.json()
        return data

    } catch (error) {
        return error

    }

}

export {
    fetchLogin
}