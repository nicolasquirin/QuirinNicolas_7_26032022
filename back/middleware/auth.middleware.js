const jwt = require("jsonwebtoken");
require("dotenv").config();
const mysqlconnection = require("../config/dbSql");

module.exports = (req, res, next) => {
  try {
    if (req.cookies.jwt) {
      const { jwt: token } = req.cookies;
      const decodedToken = jwt.verify(token, process.env.TOKEN_SECRET);
      const { usersid: id } = decodedToken;

      mysqlconnection.query(
        `SELECT * FROM users WHERE id = ${id}`,
        (err, result) => {
          if (err) res.status(204).json(err);
          else {
            next();
          }
        }
      );
    } else {
      res.clearCookie();
      res.status(401).json({ message: "Else > Unauthorized" });
    }
  } catch (err) {
    res.clearCookie();
    console.log(err);
    res.status(401).json({ message: "Catch > Unauthorized" });
  }
};
