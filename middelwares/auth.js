// importar

// importar clave secreta

//crear midelware de autenticacion

//comprobar si me llega cabeceera de autenticacion

//limpiar token

//decodiicar token

//comprobar la expiracion del token

//agregar datos del usuario a la peticion

// pasar a la ejecucion de la accion

// middleware/auth.js
const moment = require("moment");

const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
  // Comprobar si me llega cabecera de autenticación
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).send({
      message: "No se proporcionó token de autenticación",
      status: 401,
    });
  }

  // Limpiar token
  const token = authHeader.replace("Bearer ", "");

  // Decodificar token
  try {
    const payload = jwt.verify(token, "solano28");

    // Comprobar la expiración del token
    if (payload.exp <= moment().unix()) {
      return res.status(401).send({
        message: "El token ha expirado",
        status: 401,
      });
    }

    // Agregar datos del usuario a la petición
    req.user = payload;

    // Pasar a la ejecución de la acción
    next();
  } catch (err) {
    return res.status(401).send({
      message: "Token inválido",
      status: 401,
    });
  }
};

module.exports = auth;
