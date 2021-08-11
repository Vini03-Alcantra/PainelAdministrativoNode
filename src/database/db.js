const Sequelize = require('sequelize')

const sequelize = new Sequelize('users_login', 'root', 'Admin@123456', {
    dialect: "mysql",
    host: "localhost"
})

module.exports = sequelize