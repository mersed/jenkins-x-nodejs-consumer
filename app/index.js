// Setting up configuration directory
process.env['NODE_CONFIG_DIR'] = __dirname + "/config";

// importing legacy modules
require('isomorphic-fetch')
const express = require('express')
const config = require('config')

// import custom modules
const sequelizeConnection = require('./sequelize/sequelize').connection
const Sequelize = require('./sequelize/sequelize').Sequelize

// import models
const User = require('./sequelize/models/User')

// initializing global variables
const apiKey = config.get('apiKey')
const app = express()
const port = 3001

sequelizeConnection.sync({ force: true })
    .then(() => {
        app.listen(port, () => {
            console.log(`Server is listening on port ${port}!`)
        })
    })
    .catch(error => {
        console.log(error)
    })

app.get('/get-user', async (req, res) => {

    let user = await getUser();
    if(user) {
        insertUserIntoDb(user)
    }

    res.send(user)
});

const getUser = async () => {
    let user = null;
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
            user = jsonResponse.user
        }
    } catch(e) {
        console.log(`Request failed with message:`, e.message)
    }

    return user;
}

const insertUserIntoDb = async (user) => {
    return await User.create(user)
}