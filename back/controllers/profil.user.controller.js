const mysqlconnection = require("../config/dbSql");
const fs = require("fs");

//
// Recupération des données des tous les profils utilisateurs SQL => localhost:5000/api/user
//

module.exports.GetAllUsers = async (req, res) => {
  try {
    const profilUsers = await mysqlconnection.query(
      "SELECT * FROM `users` WHERE ?",
      [1],
      (error, results) => {
        if (error) {
          res.json({ error });
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
// Recupération d'un profil utilisateur SQL => localhost:5000/api/user/(N°)
//

module.exports.GetUserById = async (req, res) => {
  try {
    const id = req.params.id;

    const profilUser = await mysqlconnection.query(
      "SELECT * FROM `users` WHERE `id_user` = ?",
      [id],
      (error, results) => {
        if (error) {
          res.json({ error });
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
// Modification des données profil utilisateur SQL => localhost:5000/api/user/userId(N°)
//

module.exports.PictureUserById = (req, res) => {
  try {
    let { file } = req.file;
    const id = req.params.id;
    file = `${req.protocol}://${req.get("host")}/images/${req.file.filename}`;

    console.log(req.file.filename);

    mysqlconnection.query(
      `UPDATE users SET photo = "${file}" WHERE id_user = ?`,
      [id],
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

//
// Supression du profil utilisateur de la BD SQL => localhost:5000/api/user/userId(N°) !!!!!
//

module.exports.deleteProfilById = (req, res) => {
  const { id: id_user } = req.params;

  let sqlSelectImage = `SELECT photo FROM users WHERE id_user = ${id_user}`;
  let sqlDeletePost = `DELETE FROM users WHERE id_user = ${id_user}`;

  mysqlconnection.query(
    sqlSelectImage,

    (error, image) => {
      if (!error) {
        if (image[0].photo !== "") {
          const filename = image[0].photo.split("/images/")[1];
          fs.unlink(`images/${filename}`, () => {});
        }
        const deletePost = mysqlconnection.query(
          sqlDeletePost,
          (error, result) => {
            if (!error) {
              res
                .status(200)
                .json({ message: "La publication a été supprimée !" });
            } else {
              res.status(400).json({
                message:
                  "Une erreur est survenue, la publication n'a pas été supprimée",
              });
            }
          }
        );
      } else {
        res.status(400).json({
          message:
            "Une erreur est survenue, la publication n'a pas été trouvée",
        });
      }
    }
  );
};
