const database = require("../database/db")
const Sequelize = require("sequelize")

const Produto = database.define("produto", {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    nome_produto: {
        type:Sequelize.STRING,
        allowNull: false
    },
    descricao_produto: {
        type:Sequelize.STRING,
        allowNull:false
    },
    preco_produto: {
        type:Sequelize.FLOAT,
        allowNull:false
    },
    qtd_produto: {
        type: Sequelize.INTEGER,
        allowNull: false
    }
})

module.exports = Produto