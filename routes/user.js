//importar dependencias
const express = require("express");

//cargar routers

const router = express.Router();

//importar controladoresç
const userController = require("../controllers/user");

//definir rutas
router.get("/prueba", userController.prueba);
router.post("/register", userController.register);

//exportar rutas
module.exports = router;
