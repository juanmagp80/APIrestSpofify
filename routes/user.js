//importar dependencias
const express = require("express");
const check = require("../middelwares/auth");

//cargar routers

const router = express.Router();

//importar controladoresç
const userController = require("../controllers/user");

//configuracion de subida

const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads/avatars/");
  },
  filename: function (req, file, cb) {
    cb(null, "avatar-" + Date.now() + file.originalname);
  },
});
const upload = multer({ storage });

//definir rutas
router.get("/prueba", userController.prueba);
router.post("/register", userController.register);
router.post("/login", userController.login);
router.get("/getprofile/:id", check, userController.getProfile);
router.put("/updateuser/:id", check, userController.updateUser);
router.post("/upload", check, upload.single("archivo"), userController.upload);
router.get("/avatar/:file", userController.avatar);

//exportar rutas
module.exports = router;
