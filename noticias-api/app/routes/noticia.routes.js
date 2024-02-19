module.exports = app => {
  const noticias = require("../controllers/noticia.controller.js");

  var router = require("express").Router();

  // Create a new Noticia
  router.post("/", noticias.create);

  // Retrieve all Noticias
  router.get("/", noticias.findAll);

  // Retrieve a single Noticia with id
  router.get("/:id", noticias.findOne);

  // Update a Noticia with id
  router.put("/:id", noticias.update);

  // Delete a Noticia with id
  router.delete("/:id", noticias.delete);

  // Delete all Noticias
  router.delete("/", noticias.deleteAll);

  app.use('/api/noticias', router);
};
