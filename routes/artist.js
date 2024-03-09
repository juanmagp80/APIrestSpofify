//importar dependencias
const express = require("express");

//cargar routers

const router = express.Router();

//importar controladoresç
const artistController = require("../controllers/user");

//definir rutas
router.get("/prueba", artistController.prueba);
router.post("/register", artistController.register);

//exportar rutas
module.exports = router;
