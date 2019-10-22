require('isomorphic-fetch')

const getUser = async () => {
    try {
        let response = await fetch('http://localhost:3000/get-user', {
            method: 'post',
            headers: {
                'Content-Type': 'application/json; charset=utf-8'
            }
        });
        const jsonResponse = await response.json();
        console.log(jsonResponse)
    } catch(e) {
        console.log(`Request failed with message:`, e.message)
    }
}

var interval = setInterval(getUser, 3000);