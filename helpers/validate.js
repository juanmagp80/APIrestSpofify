const validator = require("validator");

const validate = (params) => {
  let resultado = false;
  let name =
    !validator.isEmpty(params.name) &&
    validator.isLength(params.name, { min: 3, max: undefined }) &&
    validator.isAlpha(params.name, "es-ES");

  let nick =
    !validator.isEmpty(params.nick) &&
    validator.isLength(params.nick, { min: 3, max: undefined });

  let email =
    !validator.isEmpty(params.email) && validator.isEmail(params.email);

  let password = !validator.isEmpty(params.password);

  if (params.surname) {
    let surname = !validator.isAlpha(params.surname);
    validator.isLength(params.surname, { min: 3, max: undefined }) &&
      validator.isAlpha(params.surname, "es-ES");

    if (!surname) {
      throw new Error("El apellido no es valido");
      resultado = false;
    } else {
      console.log("El apellido es valido");
    }
  }

  if (!name || !nick || !email || !password) {
    throw new Error("No se ha superado la validacion de datos");
    resultado = false;
  } else {
    console.log("Datos validos");
    resultado = true;
  }
};
module.exports = validate;
