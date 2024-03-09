const { __esModule } = require("validator/lib/isFloat");

const prueba = (req, res) => {
  return res.status(200).send({
    mesagge: "mensaje enviado desde controllers",
    status: 200,
  });
};

module.exports = {
  prueba,
};
