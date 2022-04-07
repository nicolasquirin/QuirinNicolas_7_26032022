const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const userRoutes = require("./routes/user.routes");
const postRoutes = require("./routes/post.routes");
const auth = require("./middleware/auth.middleware")
require("dotenv").config({ path: "./config/.env" });

// Utilisation de Mysql Database par defaut pour le projet N°7
require("./config/dbSql");

const cors = require("cors");

const app = express();

app.use(
  cors({
    origin: (origin, callback) => callback(null, true),
    credentials: true,
  })
);

// MAJ (body-parser) fait parti integrante de Express/ plus besoin de l'appellé
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

//Jwt

app.get("*", auth);
app.get("/jwtid", auth, (req, res) => {
  res.status(200).send(res.locals.user._id);
});

// routes
app.use("/api/user", userRoutes);
app.use("/api/post", postRoutes);

// server
app.listen(process.env.PORT, () => {
  console.log(`Listening on port ${process.env.PORT}`);
});
