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

    const profilUsers = await mysqlconnection.query(
      "SELECT * FROM `profil_users` WHERE `profil_user_userid` = ?",
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
// Recupération des données profil utilisateur SQL => localhost:5000/api/user/userId(N°)
//

module.exports.profilUserById = async (req, res) => {
  try {
    const id = req.params.id;

    const profilUsers = await mysqlconnection.query(
      "SELECT * FROM `profil_users` WHERE `profil_user_userid` = ?",
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



module.exports.profilCreated = async (req, res) => { // A REVOIR !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! SI je fait pas un login avec nom prenom et photo


const userficheObject = JSON.parse(req.body.ficheUser);

    const { userid, nom, prenom } = userficheObject;

    const photo = `${req.protocol}://${req.get("host")}/images/${
      req.file.filename
    }`;

    const ficheUser = new FicheUser(userid, nom, prenom, photo);



  try {


    const querySql = `INSERT INTO profil_users( profil_user_userid, profil_nom, profil_prenom, profil_photo ) 
      VALUES (?)`;

      const valuesTable = [userid, nom, prenom, photo];


    const ficheUser = await mysqlconnection.query(querySql, [valuesTable], (error, results) => {
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
    const { id: userid } = req.params;

    mysqlconnection.query(
      `UPDATE profil_users SET profil_nom ="${profil_nom}", profil_prenom = "${profil_prenom}", profil_photo = "${profil_photo}"
     WHERE profil_user_userid = ${userid}`,
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

module.exports.profilDeleted = (req, res) => {
  try {
    const id = req.params;

    const profilDeleted = mysqlconnection.query(
      "SELECT * FROM `profil_users` WHERE `profil_user_userid` = ?",
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

/*
const querySql = `INSERT INTO profil_users( profil_user_userid, profil_nom, profil_prenom, profil_photo ) 
      VALUES (21,"zarra", "maylis", "urlrrvsdzerg")`;
    mysqlconnection.query(querySql, (error, results) => {
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









module.exports.userInfo = (req, res) => {
  if (!ObjectID.isValid(req.params.id))
    return res.status(400).send("ID unknown : " + req.params.id);

  UserModel.findById(req.params.id, (err, docs) => {
    if (!err) res.send(docs);
    else console.log("ID unknown : " + err);
  }).select("-password");
};

module.exports.updateUser = async (req, res) => {
  if (!ObjectID.isValid(req.params.id))
    return res.status(400).send("ID unknown : " + req.params.id);

  try {
    await UserModel.findOneAndUpdate(
      { _id: req.params.id },
      {
        $set: {
          bio: req.body.bio,
        },
      },
      { new: true, upsert: true, setDefaultsOnInsert: true },
      (err, docs) => {
        if (!err) return res.send(docs);
        if (err) return res.status(500).send({ message: err });
      }
    );
  } catch (err) {
    return res.status(500).json({ message: err });
  }
};

module.exports.deleteUser = async (req, res) => {
  if (!ObjectID.isValid(req.params.id))
    return res.status(400).send("ID unknown : " + req.params.id);

  try {
    await UserModel.remove({ _id: req.params.id }).exec();
    res.status(200).json({ message: "Successfully deleted. " });
  } catch (err) {
    return res.status(500).json({ message: err });
  }
};

module.exports.follow = async (req, res) => {
  if (
    !ObjectID.isValid(req.params.id) ||
    !ObjectID.isValid(req.body.idToFollow)
  )
    return res.status(400).send("ID unknown : " + req.params.id);

  try {
    // add to the follower list
    await UserModel.findByIdAndUpdate(
      req.params.id,
      { $addToSet: { following: req.body.idToFollow } },
      { new: true, upsert: true },
      (err, docs) => {
        if (!err) res.status(201).json(docs);
        else return res.status(400).jsos(err);
      }
    );
    // add to following list
    await UserModel.findByIdAndUpdate(
      req.body.idToFollow,
      { $addToSet: { followers: req.params.id } },
      { new: true, upsert: true },
      (err, docs) => {
        // if (!err) res.status(201).json(docs);
        if (err) return res.status(400).jsos(err);
      }
    );
  } catch (err) {
    return res.status(500).json({ message: err });
  }
};

module.exports.unfollow = async (req, res) => {
  if (
    !ObjectID.isValid(req.params.id) ||
    !ObjectID.isValid(req.body.idToUnfollow)
  )
    return res.status(400).send("ID unknown : " + req.params.id);

  try {
    await UserModel.findByIdAndUpdate(
      req.params.id,
      { $pull: { following: req.body.idToUnfollow } },
      { new: true, upsert: true },
      (err, docs) => {
        if (!err) res.status(201).json(docs);
        else return res.status(400).jsos(err);
      }
    );
    // remove to following list
    await UserModel.findByIdAndUpdate(
      req.body.idToUnfollow,
      { $pull: { followers: req.params.id } },
      { new: true, upsert: true },
      (err, docs) => {
        // if (!err) res.status(201).json(docs);
        if (err) return res.status(400).jsos(err);
      }
    );
  } catch (err) {
    return res.status(500).json({ message: err });
  }
};
*/
