//importar dependencias
const express = require("express");

//cargar routers

const router = express.Router();

//importar controladoresç
const songController = require("../controllers/user");

//definir rutas
router.get("/prueba", songController.prueba);
router.post("/register", songController.register);

//exportar rutas
module.exports = router;
