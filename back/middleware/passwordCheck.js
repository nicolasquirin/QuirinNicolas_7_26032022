const passwordShema = require("../models/passwordValidator");

module.exports = (req, res, next) => {
  if (!passwordShema.validate(req.body.password)) {
    res.status(400).json({
      message:
        "Pour votre sécurité le mot de passe doit contenir 8 caractères minimums accompagné d'une majuscule et d'un chiffre",
    });
  } else {
    next();
  }
};
