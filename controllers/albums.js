const { __esModule } = require("validator/lib/isFloat");
const Album = require("../models/album");

const prueba = (req, res) => {
  return res.status(200).send({
    mesagge: "mensaje enviado desde controllers",
    status: 200,
  });
};

const save = (req, res) => {
  // Recoger datos del body
  let params = req.body;

  // Crear álbum
  const album = new Album(params);

  // Guardar álbum
  album
    .save()
    .then((albumStored) => {
      return res.status(200).send({
        message: "Álbum guardado correctamente",
        status: 200,
        album: albumStored,
      });
    })
    .catch((err) => {
      console.log(err);
      if (err) {
        return res.status(500).send({
          message: "Error al guardar el álbum",
          status: 500,
          params,
        });
      }
    });
};
const one = (req, res) => {
  // Recoger el id del álbum de la ruta
  let albumId = req.params.id;

  // Buscar el álbum en la base de datos
  Album.findById(albumId)
    .populate({ path: "artist" })
    .then((album) => {
      if (!album) {
        return res.status(404).send({
          message: "Álbum no encontrado",
          status: 404,
        });
      }

      return res.status(200).send({
        message: "Álbum encontrado",
        status: 200,
        album,
      });
    })
    .catch((err) => {
      console.log(err);
      return res.status(500).send({
        message: "Error al buscar el álbum",
        status: 500,
      });
    });
};
const all = (req, res) => {
  // Recoger el id del artista de la ruta
  let artistId = req.params.artistId;
  console.log("Artist ID:", artistId);
  // Buscar todos los álbumes del artista en la base de datos
  Album.find({ artist: artistId })
    .populate({ path: "artist" })
    .then((albums) => {
      if (!albums || albums.length === 0) {
        console.log(albums);
        return res.status(404).send({
          message: "No se encontraron álbumes para este artista",
          status: 404,
        });
      }

      return res.status(200).send({
        message: "Álbumes encontrados",
        status: 200,
        albums,
      });
    })
    .catch((err) => {
      console.log(err);
      return res.status(500).send({
        message: "Error al buscar los álbumes",
        status: 500,
      });
    });
};

module.exports = {
  prueba,
  save,
  one,
  all,
};
