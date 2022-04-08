const mysqlconnection = require("../config/dbSql");


//
// Récupération des commentaires de l'utilisateur
//
exports.getAllComments = (req, res) => {
    const id = req.params.id;

    mysqlconnection.query("SELECT * FROM `comment` WHERE `user_id` = ?",
    [id], (err, result) => {
      if (err) {
        res.status(404).json({ err });
        throw err;
      }
      res.status(200).json(result);
    });
  };


//
// Récupération du commentaires du post
//
  exports.getCommentById = (req, res) => {
  const id = req.params.id;

  mysqlconnection.query("SELECT * FROM `comment` WHERE `comment_id` = ?",
    [id], (err, result) => {
      if (err) {
        res.status(404).json({ err });
        throw err;
      }
      res.status(200).json(result);
    });
  };