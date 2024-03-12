//importar dependencias
const express = require("express");
const check = require("../middelwares/auth");

//cargar routers

const router = express.Router();

//importar controladoresç
const artistController = require("../controllers/artists");
const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads/artists/");
  },
  filename: function (req, file, cb) {
    cb(null, "artist-" + Date.now() + file.originalname);
  },
});
const upload = multer({ storage });

//definir rutas
router.get("/prueba", artistController.prueba);
router.post("/save", check, artistController.save);
router.get("/one/:id", check, artistController.one);
router.get("/list/:page?", check, artistController.list);
router.put("/update/:id", check, artistController.update);
router.delete("/remove/:id", check, artistController.remove);
router.post(
  "/upload/:id",
  check,
  upload.single("archivo"),
  artistController.upload
);
router.get("/avatar/:file", artistController.avatar);

//exportar rutas
module.exports = router;
