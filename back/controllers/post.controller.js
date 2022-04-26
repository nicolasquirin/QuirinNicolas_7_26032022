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
exports.getPostUser = (req, res, next) => {
  const id_user = req.params.id;
  console.log();
  mysqlconnection.query(
    `SELECT * FROM post WHERE id_user = ${id_user}`,

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

exports.PicturePost = (req, res) => {
  try {
    let { file } = req.file;

    const { id: id_post } = req.params;

    file = `${req.protocol}://${req.get("host")}/images/post/${
      req.file.filename
    }`;

    console.log(req.file.filename);

    mysqlconnection.query(
      `UPDATE post SET picture = "${file}"  WHERE id_post = ${id_post}`,
      (error, results) => {
        if (error) {
          res.status(404).json({ error });
        } else {
          res.status(200).json({ results });
        }
      }
    );
  } catch {
    if (req.file == undefined) res.status(500).json(error);
  }
};

// Création de post => SI just body Ou body/photo

exports.createPost = async (req, res, next) => {
  let { body, file } = req;
  if (!file) {
    const sqlInsert = "INSERT INTO post SET ?";
    mysqlconnection.query(sqlInsert, body, (err, result) => {
      if (err) {
        res.status(404).json({ err });
        throw err;
      }
    });
    console.log(res);
    next();
  }

  if (file) {
    let { body, file } = req;

    const sqlInsert = "INSERT INTO post SET ?";
    mysqlconnection.query(sqlInsert, body, (err, result) => {
      if (err) {
        res.status(404).json({ err });
        throw err;
      }
    });

    file = `${req.protocol}://${req.get("host")}/images/${req.file.filename}`;

    const id_post = req.params.post.id_post;

    const sqlInsertImage = `UPDATE post SET picture = "${file}"  WHERE id_post = ${id_post}`;

    mysqlconnection.query(sqlInsertImage, (err, result) => {
      if (err) {
        res.status(404).json({ err });
        throw err;
      }
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
