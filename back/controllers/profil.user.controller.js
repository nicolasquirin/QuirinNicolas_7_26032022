const mysqlconnection = require("../config/dbSql");

//
// Recupération des données des tous les profils utilisateurs SQL => localhost:5000/api/user
//

module.exports.profilUsers = async (req, res) => {
  try {
    const profilUsers = await mysqlconnection.query(
      "SELECT * FROM `profil_users` WHERE ?",
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
// Recupération des données profil utilisateur SQL => localhost:5000/api/user/userId(N°)
//

module.exports.profilUserById = async (req, res) => {
  try {
    const id = req.params.id;

    const profilUser = await mysqlconnection.query(
      "SELECT * FROM `profil_users` WHERE `id_user` = ?",
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

module.exports.profilCreated = async (req, res) => {
  // A REVOIR !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! SI je fait pas un login avec nom prenom et photo

  const userficheObject = JSON.parse(req.body.ficheUser);

  const { nom, prenom } = userficheObject;

  const photo = `${req.protocol}://${req.get("host")}/images/${
    req.file.filename
  }`;

  const ficheUser = new FicheUser( nom, prenom, photo);

  try {
    const querySql = `INSERT INTO profil_users( profil_nom, profil_prenom, profil_photo ) 
      VALUES (?)`;

    const valuesTable = [nom, prenom, photo];

    const ficheUser = await mysqlconnection.query(
      querySql,
      [valuesTable],
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
// Modification des données profil utilisateur SQL => localhost:5000/api/user/userId(N°)
//

module.exports.profilUpdate = (req, res) => {
  try {
    const { profil_nom, profil_prenom, profil_photo } = req.body;
    const { id: id_user } = req.params;

    mysqlconnection.query(
      `UPDATE profil_users SET profil_nom ="${profil_nom}", profil_prenom = "${profil_prenom}", profil_photo = "${profil_photo}"
     WHERE id_user = ${id_user}`,
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
// Supression du profil utilisateur de la BD SQL => localhost:5000/api/user/userId(N°) !!!!!!!!! VOIR SI SUPRESION PROFIL ENTRAINE SUPRESION USER
//

module.exports.deleteProfilById = (req, res) => {
  const { id: id_user } = req.params;

  mysqlconnection.query(
    `DELETE FROM profil_users WHERE id_user = ${id_user}`,
    (error, results) => {
      if (error) {
        res.json({ error });
      } else {
        res.status(200).json({ results });
      }
    }
  );
};
