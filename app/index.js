// Setting up configuration directory
process.env['NODE_CONFIG_DIR'] = __dirname + "/config";

// importing legacy modules
require('isomorphic-fetch')
const config = require('config')

// import custom modules
const sequelizeConnection = require('./sequelize/sequelize').connection
const Sequelize = require('./sequelize/sequelize').Sequelize

// import models
const User = require('./sequelize/models/User')

// initializing global variables
const apiKey = config.get('apiKey')

sequelizeConnection.sync({ force: true })
    .then(() => {
        setInterval(getUser, 3000);
    })
    .catch(error => {
        console.log(error)
    })

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
        
        if(jsonResponse.success) {
            insertUserIntoDb(jsonResponse.user)
        }
    } catch(e) {
        console.log(`Request failed with message:`, e.message)
    }
}

const insertUserIntoDb = (user) => {
    User.create(user)
}