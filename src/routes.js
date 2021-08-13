const express = require("express")
const router = express.Router()
const Usuario = require("./controllers/UsuariosController")
const Produto = require("./controllers/ProdutosController")

router.get("/api/usuarios", Usuario.index)
router.get("/api/usuarios/:id", Usuario.findUser)
router.post("/api/usuarios", Usuario.create)
router.delete("/api/usuarios/:id", Usuario.delete)
router.put("/api/usuarios/:id", Usuario.update)
router.post("/api/usuarios/login", Usuario.login)

router.get("/api/produtos", Produto.index)
router.get("/api/produtos/:id", Produto.findUser)
router.post("/api/produtos", Produto.create)
router.delete("/api/produtos/:id", Produto.delete)
router.put("/api/produtos/:id", Produto.update)

module.exports = router