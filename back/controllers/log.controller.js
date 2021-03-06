const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
require("dotenv").config();
const mysqlconnection = require("../config/dbSql");

//
//Insertion E-mail et mot de passe dans la base de données Mysql => //localhost:5000/api/user/register
//
module.exports.signUp = (req, res) => {
  const { profil_nom, profil_prenom, email, password } = req.body;

  bcrypt
    .hash(password, 10)
    .then((hash) => {
      const user = {
        profil_nom: profil_nom,
        profil_prenom: profil_prenom,
        email: email,
        password: hash,
      };

      mysqlconnection.query(
        `INSERT INTO users SET ?`,
        user,
        (error, results) => {
          if (error) {
            res.json({ message1: "Email deja enregistré" });
          } else {
            res.json({
              message: "",
            });
          }
        }
      );
    })
    .catch((error) => res.status(500).json({ error }));
};
//
//// Selection E-mail dans la base de données Mysql => //localhost:5000/api/user/login
//

module.exports.signIn = (req, res) => {
  // Vérifictaion info de l'utilisateur dans la base de donnée
  const { email, password: clearPassword } = req.body;

  mysqlconnection.query(
    `SELECT * FROM users WHERE email = ?`,
    [email],
    async (err, results) => {
      if (err) {
        return res.status(404).json({ err });
      }

      // Comparaison du mot de passe hashé dans la base de donnée
      if (results[0]) {
        try {
          const { password: hashedPassword, user_id } = results[0];
          const match = await bcrypt.compare(clearPassword, hashedPassword);
          if (match) {
            // If match, generate JWT token
            const maxAge = 1 * (24 * 60 * 60 * 1000);
            const token = jwt.sign({ user_id }, process.env.TOKEN_SECRET, {
              expiresIn: maxAge,
            });

            results[0].password;

            res.cookie("jwt", token, { httpOnly: true, maxAge });
            res.status(200).json({
              user: results[0],
              token: jwt.sign({ user_id }, process.env.TOKEN_SECRET, {
                expiresIn: maxAge,
              }),
            });
          }
        } catch (err) {
          console.log(err);
          return res.status(400).json({message: "sdfvezrg" });
        }
      } else if (results[0]) {
        res.status(200).json({
          error: true,
          message: "Votre compte a été suprimé",
        });
      } else if (!results[0]) {
        res.status(200).json({
          error: true,
          message: " Email / mot de passe incorrect",
        });
      }
    }
  );
};

//
//// Supression du jeton => //localhost:5000/api/user/logout
//

module.exports.logout = (req, res) => {
  res.clearCookie("jwt");
  res.status(200).json("token suprimé");
};
