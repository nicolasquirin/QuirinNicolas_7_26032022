const mysqlconnection = require("../config/dbSql");

exports.getAllPosts = (req, res, next) => {
  mysqlconnection.query("SELECT * FROM `post` WHERE ?", [1], (err, result) => {
    if (err) {
      res.status(404).json({ err });
      throw err;
    }
    res.status(200).json(result);
  });
};
//
// Recupération de tous les postes avec => localhost:5000/api/post/(n°)
//
exports.getOnePost = (req, res, next) => {
  const id = req.params.id;
  console.log();
  mysqlconnection.query(
    "SELECT * FROM `post` WHERE `id_user` = ?",
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

exports.createPost = (req, res, next) => {
  let { body, file } = req;
  if (!file) delete req.body.post_picture;
  body = {
    ...body,
    likers: "",
  };

  const sqlInsert = "INSERT INTO post SET ?";
  mysqlconnection.query(sqlInsert, body, (err, result) => {
    if (err) {
      res.status(404).json({ err });
      throw err;
    }
    //
    const id_post = result.insertId;
    if (file) {
      const sqlInsertImage = `INSERT INTO picture (picture, id_post) VALUES ("${file.filename}", ${id_post})`;
      mysqlconnection.query(sqlInsertImage, (err, result) => {
        if (err) {
          res.status(404).json({ err });
          throw err;
        }
        res.status(200).json(result);
      });
    } else {
      res.status(200).json(result);
    }
  });
};

//
// Modification des données Post de la BD SQL => localhost:5000/api/user/userId(N°)
//

module.exports.updatePost = (req, res) => {
  try {
    const { message, picture, likers } = req.body;
    const { id: userid } = req.params;

    mysqlconnection.query(
      `UPDATE post SET message ="${message}", picture = "${picture}", likers = "${likers}"
     WHERE id_user = ${userid}`,
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
// Supression du post de l'utilisateur de la BD SQL => localhost:5000/api/user/userId(N°)
//
exports.deletePostById = (req, res, next) => {
  const { id: id_post } = req.params;

  mysqlconnection.query(`DELETE FROM post WHERE id_user = ${id_post}`, (err, result) => {
    if (err) {
      res.status(404).json({ err });
      throw err;
    }
    res.status(200).json(result);
  });
};

// Likers a derterminé !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!