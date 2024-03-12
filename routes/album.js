//importar dependencias
const express = require("express");
const check = require("../middelwares/auth");

//cargar routers

const router = express.Router();

//importar controladoresç
const albumController = require("../controllers/albums");

//definir rutas
router.get("/prueba", albumController.prueba);
router.post("/save", check, albumController.save);
router.get("/one/:id", check, albumController.one);
router.get("/all/:artistId", check, albumController.all);

//exportar rutas
module.exports = router;
