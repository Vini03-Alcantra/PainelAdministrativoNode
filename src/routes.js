const express = require("express")
const router = express.Router()
const Usuario = require("./controllers/UsuariosController")

router.get("/api/usuarios", Usuario.index)
router.get("/api/usuarios/:id", Usuario.fundUser)
router.post("/api/usuarios", Usuario.create)

module.exports = router