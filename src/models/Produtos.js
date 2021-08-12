const database = require("../database/db")

const Produtos = database.define("produto", {})

module.exports = Produtos;