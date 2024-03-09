//importar mongoose from 'mongoose';
const mongoose = require("mongoose");

//metodo de conexion
const connection = async () => {
  try {
    await mongoose.connect("mongodb://localhost:27017/app_musica", {});
    console.log("Conectado a la base de datos");
  } catch (error) {
    console.log("Error de conexion a la base de datos");
  }
};

//exportar metodo de conexion
module.exports = connection;
