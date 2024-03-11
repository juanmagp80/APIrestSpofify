//importar dependencias
const express = require("express");
const check = require("../middelwares/auth");

//cargar routers

const router = express.Router();

//importar controladoresç
const userController = require("../controllers/user");

//definir rutas
router.get("/prueba", userController.prueba);
router.post("/register", userController.register);
router.post("/login", userController.login);
router.get("/getprofile/:id", check, userController.getProfile);
router.put("/updateuser/:id", check, userController.updateUser);

//exportar rutas
module.exports = router;
