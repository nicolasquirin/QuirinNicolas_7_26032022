const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
require("dotenv").config();
const cryptoJS = require("crypto-js");
const { signUpErrors, signInErrors } = require("../utils/errors.utils");
const mysqlconnection = require("../config/dbSql");

const maxAge = 3 * 24 * 60 * 60 * 1000;

const createToken = (id) => {
  return jwt.sign({ id }, process.env.TOKEN_SECRET, {
    expiresIn: maxAge,
  });
};

// Insertion E-mail et mot de passe dans la base de données Mysql => //localhost:5000/api/user/register
module.exports.signUp = async (req, res) => {
  const { email, password } = req.body;

  const hashEmail = cryptoJS
    .HmacSHA512(email, `${process.env.CRYPTOJS_TOKEN_KEY}`)
    .toString();
  bcrypt
    .hash(password, 10)
    .then((hash) => {
      const user = {
        email: hashEmail,
        password: hash,
      };

      mysqlconnection.query(
        `INSERT INTO users SET ?`,
        user,
        (error, results) => {
          if (error) {
            console.log(error);
            res.status(200).json({ message: "Email deja enregistré" });
          } else {
            console.log(results);
            res.json("utilisateur enregistré");
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
  // Recherche de l'utilisateur deja present dans la base de données
  const hashEmail = cryptoJS
    .HmacSHA512(req.body, `${process.env.CRYPTOJS_TOKEN_KEY}`)
    .toString();

  const email = hashEmail;
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
          return res.status(404).json({ error: "utilisateur non trouvé" });
        }

        //Comparaison du mot de passe créer et stocké
        bcrypt
          .compare(req.body.password, results)
          .then((controlPassword) => {
            console.log(controlPassword);

            //Si mot de passe incorrect
            if (!controlPassword) {
              return res.staus(401).jsin({ error: "Mot de passe incorrect" });
            }

            const token = jwt.sign(
              { userId: results[0].id },
              `${process.env.JWT_TOKEN_SECRET}`,
              { expiresIn: "12h" }
            );

            console.log(token);

            // Renvoie du userId et le token utilisateur
            res.status(201).json({ userId: results[0].id, token });
          })
          .catch((err) => res.status(500).json({ error }));
      }
    }
  );
};

module.exports.logout = (req, res) => {
  res.cookie("jwt", "", { maxAge: 1 });
  res.redirect("/");
};
