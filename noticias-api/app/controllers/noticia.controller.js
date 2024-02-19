const db = require("../models");
const Noticia = db.noticias;
const Op = db.Sequelize.Op;

// Create and Save a new Noticia
exports.create = (req, res) => {
  // Validate request
  if (!req.body.titulo) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }

  // Create a Noticia
  const noticia = {
    chapeu: req.body.chapeu,
    url: req.body.url,
    titulo: req.body.titulo,
    data_hora_publicacao: req.body.data_hora_publicacao,
    imagem: req.body.imagem,
    thumbnail: req.body.thumbnail,
    conteudo: req.body.conteudo
   
  };

  // Save Noticia in the database
  Noticia.create(noticia)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Noticia."
      });
    });
};

// Retrieve all Noticias from the database.
exports.findAll = (req, res) => {
  const titulo = req.query.titulo;
  var condition = titulo ? { titulo: { [Op.like]: `%${titulo}%` } } : null;

  Noticia.findAll({ where: condition })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving noticias."
      });
    });
};

// Find a single Noticia with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Noticia.findByPk(id)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving Noticia with id=" + id
      });
    });
};

// Update a Noticia by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  Noticia.update(req.body, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Noticia was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update Noticia with id=${id}. Maybe Noticia was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Noticia with id=" + id
      });
    });
};

// Delete a Noticia with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Noticia.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Noticia was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete Noticia with id=${id}. Maybe Noticia was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Noticia with id=" + id
      });
    });
};

// Delete all Noticias from the database.
exports.deleteAll = (req, res) => {
  Noticia.destroy({
    where: {},
    truncate: false
  })
    .then(nums => {
      res.send({ message: `${nums} Noticias were deleted successfully!` });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all noticias."
      });
    });
};


