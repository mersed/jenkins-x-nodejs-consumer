// Import custom modules
const sequelizeConnection = require('../sequelize').connection
const Sequelize = require('..//sequelize').Sequelize

const User = sequelizeConnection.define('User', {
    name: Sequelize.STRING,
    phone: Sequelize.STRING,
    city: Sequelize.STRING,
    email: Sequelize.STRING,
    country: Sequelize.STRING
})

module.exports = User