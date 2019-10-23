// Setting up configuration directory
process.env['NODE_CONFIG_DIR'] = __dirname + "/config";

// importing legacy modules
require('isomorphic-fetch')
const config = require('config')
const apiKey = config.get('apiKey')

const getUser = async () => {
    try {
        let response = await fetch('http://api-server:3000/get-user', {
            method: 'post',
            headers: {
                'Content-Type': 'application/json; charset=utf-8'
            },
            body: JSON.stringify({
                // Validation data coming from a form usually
                apiKey: apiKey
            })
        });
        const jsonResponse = await response.json();
        console.log(jsonResponse)
    } catch(e) {
        console.log(`Request failed with message:`, e.message)
    }
}

var interval = setInterval(getUser, 3000);