const express = require("express")
const router = express.Router()
const Usuario = require("./controllers/UsuariosController")

router.get("/api/usuarios", Usuario.index)
router.get("/api/usuarios/:id", Usuario.findUser)
router.post("/api/usuarios", Usuario.create)
router.delete("/api/usuarios/:id", Usuario.delete)

module.exports = router