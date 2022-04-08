const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
require("dotenv").config();
const cryptoJS = require("crypto-js");
const { signUpErrors, signInErrors } = require("../utils/errors.utils");
const mysqlconnection = require("../config/dbSql");

//
//Insertion E-mail et mot de passe dans la base de données Mysql => //localhost:5000/api/user/register
//
module.exports.signUp = (req, res) => {
  const { email, password } = req.body;

  bcrypt
    .hash(password, 10)
    .then((hash) => {
      const user = {
        email: email,
        password: hash,
      };

      mysqlconnection.query(
        `INSERT INTO users SET ?`,
        user,
        (error, results) => {
          if (error) {
            console.log(error);
            res.json({ message: "Email deja enregistré" });
          } else {
            console.log(results);
            res.json({ message: "Nouvel utilisateur enregistré" });
          }
        }
      );
    })
    .catch((error) => res.status(500).json({ error }).send(console.log(error)));
};
//
//// Selection E-mail dans la base de données Mysql => //localhost:5000/api/user/login
//

module.exports.signIn = (req, res) => {
  // Recherche de l'utilisateur deja present dans la base de données
  const { email, password } = req.body;

  mysqlconnection.query(
    `SELECT * FROM users WHERE email = ? `,
    email,
    (error, results) => {
      if (error) {
        console.log(error);
        res.json({ error });
      } else {


        // Si e-mail inexistant =>
        if (results == 0) {
          return res.status(404).json({ error: "Email inexistant" });
        }

        //Comparaison du mot de passe créer et stocké
        bcrypt
          .compare(req.body.password, results[0].password)
          .then((controlPassword) => {

            //Si mot de passe incorrect
            if (!controlPassword) {
              return res.status(401).json({ message: "Mot de passe incorrect" });
            }

            const token = jwt.sign(
              { userId: results[0].id },
              `${process.env.TOKEN_SECRET}`,
              { expiresIn: "12h" }
            );


            // Renvoie du userId et token utilisateur
            res.status(201).json({ userId: results[0].id, token });
          })
          .catch((err) => res.status(500).json({ error }));
      }
    }
  );
};


//
//// Supression du jeton => //localhost:5000/api/user/logout
//

module.exports.logout = (req, res) => {
  res.clearCookie("jwt");
  res.status(200).json("OUT");
};
