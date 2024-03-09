//importaciones

const validate = require("../helpers/validate");

//recoger parametros de la peticion

const prueba = (req, res) => {
  return res.status(200).send({
    mesagge: "mensaje enviado desde controllers",
    status: 200,
  });
};

//registro
const register = (req, res) => {
  //recoger parametros de la peticion
  let params = req.body;

  //validar datos
  if (!params.name || !params.nick || !params.email || !params.password) {
    return res.status(400).send({
      message: "faltan datos",
      status: 400,
    });
  }

  try {
    validate(params);
  } catch (error) {
    return res.status(400).send({
      message: "validacion incorrecta",
      status: 400,
    });
  }

  //crear usuario

  //control usuario duplicado

  //cifrar contraseña

  //crear objeto de usuario

  //guardar usuario en la base de datos

  //limpiar objeto a devolver

  //devolver respuesta

  return res.status(200).send({
    mesagge: "registro",
    status: 200,
  });
};
//login

module.exports = {
  prueba,
  register,
};
