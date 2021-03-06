const mysqlconnection = require("../config/dbSql");

//
// Récupération de tous les commentaires utilisateurs
//

exports.getAllComments = (req, res) => {
  mysqlconnection.query(
    "SELECT * FROM `comment` WHERE ?",
    [1],
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
  const id_post = req.params.id;

  mysqlconnection.query(
    `SELECT * FROM comment WHERE id_post = ${id_post}`,

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
// Création commentaire dans un post
//

exports.createComment = (req, res, next) => {
  let { body } = req;
  const id_post = req.params.id;
  console.log(body, id_post);

  const sqlInsert = `INSERT INTO comment SET ?`;
  mysqlconnection.query(sqlInsert, { ...body, id_post }, (err, result) => {
    if (err) {
      res.status(404).json({ err });
      throw err;
    }
    res.status(200).json(result);
    console.log(result);
  });
};

//
// Modification du commentaire de la BDD SQL => localhost:5000/api/comm/comment_id(N°)
//

module.exports.updateComment = (req, res) => {
  try {
    const { text } = req.body;
    const { id: comment_id } = req.params;

    mysqlconnection.query(
      `UPDATE comment SET text ="${text}" WHERE comment_id = ${comment_id}`,
      (error, results) => {
        if (error) {
          res.status(404).json({ error });
        } else {
          res.status(200).json({ results });
        }
      }
    );
    //console.log(text);
  } catch (err) {
    res.status(500).json({ error: err });
  }
};

//
// Supression commentaire du post
//

exports.deleteCommentById = (req, res) => {
  const { id: comment_id } = req.params;
  console.log(comment_id);

  mysqlconnection.query(
    `DELETE FROM comment WHERE comment_id = ${comment_id}`,
    (err, result) => {
      if (err) {
        res.status(404).json({ err });
        throw err;
      }
      res.status(200).json(result);
    }
  );
};
