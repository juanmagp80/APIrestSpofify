// helpers/jwt.js

const jwt = require("jsonwebtoken");

const generateJWT = (user) => {
  // Crear el payload del token
  const payload = {
    id: user._id,
    name: user.name,
    email: user.email,
    nick: user.nick,
    // Puedes añadir más campos del usuario si lo deseas
  };
  // Firmar el token
  const token = jwt.sign(payload, "solano28", { expiresIn: "1h" });

  return token;
};

module.exports = generateJWT;
