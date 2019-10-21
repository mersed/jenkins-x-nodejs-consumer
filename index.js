require('isomorphic-fetch')

const getUser = async () => {
    try {
        let response = await fetch('http://localhost:3000/get-user', {
            method: 'post'
        });
        console.log(response)
    } catch(e) {
        console.log(`Request failed with message:`, e.message)
    }
}


getUser()