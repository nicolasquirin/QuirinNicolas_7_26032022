const mysqlconnection = require("../config/dbSql");

//
// Récupération de tous les posts Utilisateurs
//
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
// Recupération de tous les Posts d'un utilisateur => localhost:5000/api/post/(n°)
//

/*
exports.getPostPicture = (req, res, next) => {
  //const id_user = req.params.id;
  const { id: id_post } = req.params;

  console.log();
  mysqlconnection.query(
    `SELECT * FROM picture WHERE id_post = ${id_post}`,

    (err, result) => {
      if (err) {
        res.status(404).json({ err });
        throw err;
      }
      res.status(200).json(result);
    }
  );
};

*/

//
// Recupération d'un post utilisateur => localhost:5000/api/post/(n°)
//
exports.getOnePost = (req, res, next) => {
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

exports.createPost = async (req, res, next) => {
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
// Modification des données Post de la BD SQL => localhost:5000/api/user/userId(N°)
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
// Supression du post de l'utilisateur de la BD SQL => localhost:5000/api/user/userId(N°)
//
exports.deletePostById = (req, res, next) => {
  const { id: id_post } = req.params;

  mysqlconnection.query(
    `DELETE FROM post WHERE id_post = ${id_post}`,
    (err, result) => {
      if (err) {
        res.status(404).json({ err });
        throw err;
      }
      res.status(200).json(result);
    }
  );
};

// Likers a derterminé !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
