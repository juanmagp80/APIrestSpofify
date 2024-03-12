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
const upload = async (req, res) => {
  console.log(req.file);
  if (!req.file) {
    return res.status(400).send({
      message: "No se ha subido ningun archivo",
      status: 400,
    });
  }

  // configuracion de subida (multer )

  //recoger fichero de imagen y compronbar que existe

  //conseguir el nombre de archivo
  let image = req.file.originalname;
  const imageSplit = image.split(".");
  const extension = imageSplit[1];

  if (extension !== "png" && extension !== "jpg" && extension !== "jpeg") {
    const filePath = req.file.path;

    try {
      fs.unlinkSync(filePath);
    } catch (err) {
      return res.status(500).send({
        message: "error al borrar el archivo",
        status: 500,
      });
    }
    return res.status(400).send({
      message: "extension no valida",
      status: 400,
    });
  }
  //devolver respuesta
  Artist.findOneAndUpdate(
    if (req.artist) {
      let id = req.artist.id;
    { _id: req.artist.id },
    { image: req.file.filename },
    { new: true }
    } else {
      console.error('Artist no está definido');
}
}}

  )
    .then((user) => {
      if (!user) {
        return res.status(404).send({
          message: "Usuario no encontrado",
          status: 404,
        });
      }
      res.status(200).send({
        message: "Avatar actualizado correctamente",
        status: 200,
      });
    })
    .catch((err) => {
      return res.status(500).send({
        message: "Error al actualizar el avatar",
        status: 500,
      });
    });


const avatar = (req, res) => {
  const file = req.params.file;
  const filePath = "./uploads/artists/" + file;

  fs.stat(filePath, (err, exists) => {
    if (err || !exists) {
      return res.status(404).send({
        message: "El avatar no existe",
        status: 404,
      });
    }
    return res.sendFile(path.resolve(filePath));
  });
};

module.exports = {
  prueba,
  save,
  one,
  list,
  update,
  remove,
  upload,
  avatar,
};
