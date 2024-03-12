const { __esModule } = require("validator/lib/isFloat");
const Album = require("../models/album");
const Song = require("../models/song");

const Artist = require("../models/artist");
const fs = require("fs");

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
    const artistRemoved = await Artist.findByIdAndRemove(artistId);
    const albumsRemoved = await Album.find({ artist: artistId }).remove();
    const songsRemoved = await Song.find({ album: albumsRemoved._id }).remove();

    if (!artist) {
      return res.status(404).send({
        message: "No se encontró el artista para eliminar",
        status: 404,
      });
    }

    await artist.deleteOne();

    return res.status(200).send({
      message: "Artista eliminado correctamente",
      artist: artistRemoved,
      albums: albumsRemoved,
      songs: songsRemoved,
    });
  } catch (err) {
    console.error(err);

    return res.status(500).send({
      message: "Error al eliminar el artista",
      status: 500,
    });
  }
};
const path = require("path");

// ... tus otros controladores ...

const upload = async (req, res) => {
  // Asegúrate de que se subió un archivo
  if (!req.file) {
    console.log(req.file);
    return res.status(400).send({
      message: "No se ha subido ningun archivo",
      status: 400,
    });
  }

  // Comprueba la extensión del archivo
  const validExtensions = ["png", "jpg", "jpeg"];
  const extension = path
    .extname(req.file.originalname)
    .toLowerCase()
    .substring(1);

  if (!validExtensions.includes(extension)) {
    return res.status(400).send({
      message: "Formato de archivo no soportado",
      status: 400,
    });
  }

  // Aquí puedes agregar el código para asociar la imagen con un artista en tu base de datos
  const artist = await Artist.findById(req.params.id);
  if (!artist) {
    return res.status(404).send({
      message: "Artista no encontrado",
      status: 404,
    });
  }
  artist.image = req.file.path;
  await artist.save();

  res.status(200).send({
    message: "Imagen subida correctamente",
    status: 200,
  });
};

// ... tus otros controladores ...

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
