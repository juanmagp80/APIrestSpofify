//importar dependencias
const express = require("express");
const check = require("../middelwares/auth");

//cargar routers

const router = express.Router();

//importar controladoresç
const artistController = require("../controllers/artists");

//definir rutas
router.get("/prueba", artistController.prueba);
router.post("/save", check, artistController.save);
router.get("/one/:id", check, artistController.one);
router.get("/list/:page?", check, artistController.list);
router.put("/update/:id", check, artistController.update);
router.delete("/remove/:id", check, artistController.remove);

//exportar rutas
module.exports = router;
