//importar dependencias
const express = require("express");

//cargar routers

const router = express.Router();

//importar controladoresç
const albumController = require("../controllers/user");

//definir rutas
router.get("/prueba", albumController.prueba);
router.post("/register", albumController.register);

//exportar rutas
module.exports = router;
