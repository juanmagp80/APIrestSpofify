//importar conexion
const connection = require("./database/connection");

// importar dependencias
const express = require("express");
const cors = require("cors");

//mensaje de bienvenida
console.log("API REST ARRANCADA");
//ejecutar conexion a la base de datos
connection();

//crear servidor de node
const app = express();
const port = 3000;
//configurar cors

app.use(cors());
//convertir los datos del body a objetos js
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
//cargar configuracion de rutas
const userRoutes = require("./routes/user");
const songRoutes = require("./routes/song");
const albumRoutes = require("./routes/album");
const artistRoutes = require("./routes/artist");

app.use("/api/user", userRoutes);
app.use("/api/song", songRoutes);
app.use("/api/album", albumRoutes);
app.use("/api/artist", artistRoutes);

//ruta de prueba
app.get("/", (req, res) => {
  return res.status(200).json({ message: "API REST ARRANCADA" });
});

//poner el servidor a escuchar petciones
app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});

//exportar servidor
module.exports = app;
