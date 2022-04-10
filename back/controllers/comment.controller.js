const mysqlconnection = require("../config/dbSql");

//
// Récupération des commentaires de l'utilisateur
//
exports.getAllComments = (req, res) => {
  const id = req.params.id;

  mysqlconnection.query(
    "SELECT * FROM `comment` WHERE `id_user` = ?",
    [id],
    (err, result) => {
      if (err) {
        res.status(404).json({ err });
        throw err;
      }
      res.status(200).json(result);
    }
  );
};

//
// Récupération commentaires du post
//
exports.getCommentById = (req, res) => {
  const id = req.params.id;

  mysqlconnection.query(
    "SELECT * FROM `comment` WHERE `comment_id` = ?",
    [id],
    (err, result) => {
      if (err) {
        res.status(404).json({ err });
        throw err;
      }
      res.status(200).json(result);
    }
  );
};

//
// Création commentaire dans un post // !!!!!!! timestamp a rajouter ainsi que likes= 0 ou 1 !!!!!!!!!!!
//

exports.createComment = (req, res, next) => {
  const { id_user, comment, profil_nom, profil_prenom } = req.body;

  mysqlconnection.query(
    `INSERT INTO comment (comment_id, id_user, comment, profil_nom, profil_prenom) VALUES 
    ( NULL, ${id_user}, "${comment}", "${profil_nom}", "${profil_prenom}")`,
    (err, result) => {
      if (err) {
        res.status(404).json({ err });
        console.log(err);
        throw err;
      }
      res.status(200).json(result);
    }
  );
};

//
// Supression commentaire du post
//

exports.deleteCommentById = (req, res) => {
  const comment_id = req.params.id;

  mysqlconnection.query(
    `DELETE FROM comment WHERE id_user = ${comment_id}`,
    (err, result) => {
      if (err) {
        res.status(404).json({ err });
        throw err;
      }
      res.status(200).json(result);
    }
  );
};
