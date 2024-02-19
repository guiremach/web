module.exports = (sequelize, Sequelize) => {
  const Noticia = sequelize.define("noticia", {
    chapeu: {
      type: Sequelize.STRING
    },
    url: {
      type: Sequelize.STRING
    },
    titulo: {
      type: Sequelize.STRING
    },
    data_hora_publicacao: {
      type: Sequelize.DATE
    },
    imagem: {
      type: Sequelize.STRING
    },
    thumbnail: {
      type: Sequelize.STRING
    },
    conteudo: {
      type: Sequelize.TEXT
    }
  });

  return Noticia;
};
