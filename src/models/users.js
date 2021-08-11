const database = require("../database/db")
const Sequelize = require("sequelize")

const Users = database.define("users", {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    nome_usuario: {
        type:Sequelize.STRING,
        allowNull: false
    },
    email_usuario: {
        type:Sequelize.STRING,
        allowNull:false
    },
    tipo_usuario: {
        type:Sequelize.STRING,
        allowNull:false
    },
    senha_usuario: {
        type: Sequelize.STRING,
        allowNull: false
    }
})

module.exports = Users