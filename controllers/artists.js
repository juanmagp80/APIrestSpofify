const { __esModule } = require("validator/lib/isFloat");
const Artist = require("../models/artist");

const prueba = (req, res) => {
  return res.status(200).send({
    mesagge: "mensaje enviado desde controllers",
    status: 200,
  });
};
const save = (req, res) => {
  //recoger datos del body
  let params = req.body;

  //crear artista
  const artist = new Artist(params);

  //guardar artista
  artist
    .save()
    .then((artistStored) => {
      return res.status(200).send({
        mesagge: "accion guardar artista",
        status: 200,
        artist: artistStored,
      });
    })
    .catch((err) => {
      if (err) {
        return res.status(500).send({
          message: "error al guardar el artista",
          status: 500,
        });
      }
    });
};
const one = (req, res) => {
  //recoger el id del artista
  let artistId = req.params.id;

  //buscar el artista
  Artist.findById(artistId)
    .then((artist) => {
      if (!artist) {
        return res.status(404).send({
          message: "el artista no existe",
          status: 404,
        });
      }
      return res.status(200).send({
        artist,
      });
    })
    .catch((err) => {
      return res.status(500).send({
        message: "error al buscar el artista",
        status: 500,
      });
    });
};
const list = (req, res) => {
  //definir numero de elementos por pagina
  const itemsPerPage = 3;
  const page = req.params.page || 1;

  Artist.find()
    .sort("name") // ordenar por nombre
    .skip((page - 1) * itemsPerPage) // saltar los documentos de las páginas anteriores
    .limit(itemsPerPage) // limitar a 'itemsPerPage' documentos
    .then((artists) => {
      if (!artists || artists.length === 0) {
        return res.status(404).send({
          message: "No se encontraron artistas",
          status: 404,
        });
      }
      return res.status(200).send({
        page: page,
        artists,
        itemsPerPage: itemsPerPage,
      });
    })
    .catch((err) => {
      return res.status(500).send({
        message: "Error al buscar los artistas",
        status: 500,
      });
    });
};
const update = async (req, res) => {
  const artistId = req.params.id;
  const updateData = req.body;

  try {
    const updatedArtist = await Artist.findByIdAndUpdate(artistId, updateData, {
      new: true,
    });

    if (!updatedArtist) {
      return res.status(404).send({
        message: "No se encontró el artista para actualizar",
        status: 404,
      });
    }

    return res.status(200).send({
      artist: updatedArtist,
    });
  } catch (err) {
    return res.status(500).send({
      message: "Error al actualizar el artista",
      status: 500,
    });
  }
};
const remove = async (req, res) => {
  const artistId = req.params.id;

  try {
    const artist = await Artist.findById(artistId);

    if (!artist) {
      return res.status(404).send({
        message: "No se encontró el artista para eliminar",
        status: 404,
      });
    }

    await artist.deleteOne();

    return res.status(200).send({
      message: "Artista eliminado correctamente",
    });
  } catch (err) {
    console.error(err);

    return res.status(500).send({
      message: "Error al eliminar el artista",
      status: 500,
    });
  }
};
module.exports = {
  prueba,
  save,
  one,
  list,
  update,
  remove,
};
