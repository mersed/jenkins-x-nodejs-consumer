// importing legacy modules
const config = require('config')
const Sequelize = require('sequelize')

// Initialize global variables
const dbCreds = config.get('database')

const connection = new Sequelize(dbCreds.db, dbCreds.username, dbCreds.password, {
    host: dbCreds.host,
    dialect: 'postgres',
    storage: 'db.sqlite'
})

module.exports = { 
    connection,
    Sequelize
}