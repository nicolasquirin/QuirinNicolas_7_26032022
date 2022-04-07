const jwt = require("jsonwebtoken");
require("dotenv").config();

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1]; // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    const decodedToken = jwt.verify(token, process.env.TOKEN_SECRET);
    const userId = decodedToken.userId;

    if (req.body.userId && req.body.userId !== userId) {
      res.status(401).json({ message: "Mauvais identifiant" });
    } else {
      next();
    }
    console.log(token);
  } catch (error) {
    res
      .status(401)
      .json({ message: "Jeton utilisateur non autentifié", error });
  }
};
