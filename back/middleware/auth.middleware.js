const jwt = require("jsonwebtoken");
require("dotenv").config();

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decodedToken = jwt.verify(token, process.env.TOKEN_SECRET);
    const userId = decodedToken.userId;
    req.auth = { userId };

    if (req.body.userId && req.body.userId !== userId) {
      res.status(403).json({ message: "requete non authorisée" });
      throw "Invalid user ID";
    } else {
      next();
      console.log(token.userId);
    }
  } catch {
    res.status(401).json({
      error: new Error("Invalid request!"),
    });
  }
};
