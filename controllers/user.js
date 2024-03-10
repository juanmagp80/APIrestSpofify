//importaciones
const bcrypt = require("bcrypt");
const validate = require("../helpers/validate");
const User = require("../models/user");
const generateJWT = require("../helpers/jwt");

//recoger parametros de la peticion

const prueba = (req, res) => {
  return res.status(200).send({
    mesagge: "mensaje enviado desde controllers",
    status: 200,
  });
};

//registro
const register = async (req, res) => {
  //recoger parametros de la peticion
  let params = req.body;
  console.log(params);
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
  try {
    const users = await User.find({
      $or: [
        { email: params.email.toLowerCase() },
        { nick: params.nick.toLowerCase() },
      ],
    });

    if (users && users.length >= 1) {
      return res.status(200).send({
        message: "usuario duplicado",
        status: 200,
      });
    } else {
      // Continúa con el resto de tu lógica de registro
    }
  } catch (err) {
    return res.status(500).send({
      message: "error en la peticion",
      status: 500,
    });
  }

  //cifrar contraseña
  let pwd = bcrypt.hashSync(params.password, 10);
  params.password = pwd;
  //crear objeto de usuario
  let usertoSave = new User(params);
  //guardar usuario en la base de datos
  try {
    const userStored = await usertoSave.save();

    if (!userStored) {
      return res.status(400).send({
        message: "el usuario no se ha guardado",
        status: 400,
      });
    }

    return res.status(200).send({
      message: "usuario guardado",
      status: 200,
      user: userStored,
    });
  } catch (err) {
    return res.status(500).send({
      message: "error al guardar el usuario",
      status: 500,
    });
  }

  //limpiar objeto a devolver
  let userCreated = userStored.toObject();
  delete userCreated.password;
  delete userCreated.role;
  //devolver respuesta

  return res.status(200).send({
    mesagge: "registro",
    status: 200,
    user: userCreated,
  });
};

//login
const login = async (req, res) => {
  // Recoger parámetros de la petición
  let params = req.body;
  console.log(params);
  // Buscar el usuario
  try {
    const user = await User.findOne({ email: params.email.toLowerCase() });
    console.log(user); // Añade esta línea

    if (!user) {
      return res.status(404).send({
        message: "usuario no encontrado",
        status: 404,
      });
    }

    // Verificar que se proporcionó una contraseña
    if (!params.password || !user.password) {
      return res.status(400).send({
        message: "contraseña no proporcionada",
        status: 400,
      });
    }

    // Verificar la contraseña
    const isMatch = bcrypt.compareSync(params.password, user.password);
    if (!isMatch) {
      return res.status(400).send({
        message: "contraseña incorrecta",
        status: 400,
      });
    }

    // Limpiar el objeto a devolver
    let userObj = user.toObject();
    delete userObj.password;
    //generar token
    const token = generateJWT(user);
    // Devolver respuesta
    return res.status(200).send({
      message: "login exitoso",
      status: 200,
      user: userObj,
      token,
    });
  } catch (err) {
    return res.status(500).send({
      message: "error en la petición",
      status: 500,
      error: err.message,
    });
  }
};

//metodo para devolver perfil de usario

const getProfile = async (req, res) => {
  // Obtener el ID del usuario de la solicitud
  const userId = req.params.id;

  try {
    // Buscar el usuario en la base de datos
    const user = await User.findById(userId).select("-password");

    if (!user) {
      return res.status(404).send({
        message: "Usuario no encontrado",
        status: 404,
      });
    }

    // Devolver el usuario
    return res.status(200).send({
      message: "Perfil de usuario",
      status: 200,
      user: user,
    });
  } catch (err) {
    return res.status(500).send({
      message: "Error en la petición",
      status: 500,
      error: err.message,
    });
  }
};

module.exports = {
  prueba,
  register,
  login,
  getProfile,
};
