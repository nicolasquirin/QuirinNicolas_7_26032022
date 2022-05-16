const mysqlconnection = require("../config/dbSql");
const fs = require("fs");

//
// Récupération de tous les posts en ordre chronologique (id_post => DESC)
//
exports.getAllPosts = (req, res) => {
  mysqlconnection.query(
    "SELECT * FROM `post` ORDER BY id_post DESC ",
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
// Recupération d'un post utilisateur => localhost:5000/api/post/(n°)
//
exports.getOnePost = (req, res) => {
  const id = req.params.id;
  console.log();
  mysqlconnection.query(
    "SELECT * FROM `post` WHERE `id_post` = ?",
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
// Création de post => SI just body Ou body/photo
//

exports.createPost = async (req, res) => {
  let { body, file } = req;

  if (file === undefined) {
    const sqlInsert = "INSERT INTO post SET ?";
    mysqlconnection.query(sqlInsert, body, (err, result) => {
      if (err) {
        res.status(404).json({ err });
        throw err;
      }
      res.status(200).json(result);
    });
  } else {
    let { body } = req;

    let { file } = req.file;

    file = `${req.protocol}://${req.get("host")}/images/${req.file.filename}`;

    const sqlInsertImage = `INSERT INTO post SET picture = "${file}", ?`;

    mysqlconnection.query(sqlInsertImage, body, (err, result) => {
      console.log(result);
      if (err) {
        res.status(404).json({ err });
        throw err;
      }
      res.status(200).json(result);
      console.log(result);
    });
  }
};

//
// Modification des données Post de la BD SQL => localhost:5000/api/post/userId(N°)
//

module.exports.updatePost = (req, res) => {
  try {
    const { message } = req.body;
    const { id: id_post } = req.params;

    mysqlconnection.query(
      `UPDATE post SET message ="${message}" WHERE id_post = ${id_post}`,
      (error, results) => {
        if (error) {
          res.status(404).json({ error });
        } else {
          res.status(200).json({ results });
        }
      }
    );
  } catch (err) {
    res.status(500).json({ error: err });
  }
};

//
// Supression du post de l'utilisateur de la BD SQL => localhost:5000/api/post/userId(N°)
//
exports.deletePostById = (req, res) => {
  const { id: id_post } = req.params;

  const post = mysqlconnection.query(
    `DELETE FROM post WHERE id_post = ${id_post}`,
    (err, result) => {
      if (err) {
        res.status(404).json({ err });
        throw err;
      } else {
        const filename = post.imageUrl.split("/images/")[1];
        fs.unlink(`images/${filename}`);
        res.status(200).json(result);
      }
    }
  );
};

// Likers a derterminé !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
