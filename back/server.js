const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const userRoutes = require("./routes/user.routes");
const postRoutes = require("./routes/post.routes");
const logRoutes = require("./routes/log.routes");
const commentRoutes = require("./routes/comment.routes");
const auth = require("./middleware/auth.middleware");
require("dotenv").config({ path: "./config/.env" });
const path = require("path");

// Utilisation de Mysql Database par defaut pour le projet N°7
require("./config/dbSql");

//
//SECURITY OWASP
//

// assainit les entrées contre les attaques par injection SQL
const filter = require("content-filter");
const mongoSanitize = require("express-mongo-sanitize");

// Définit quatre en-têtes, désactivant une grande partie de la mise en cache navigateur côté client
const nocache = require("nocache");

// Configure de manière appropriée les en-têtes HTTP - Helmet version 4.6.0 / Au dela = (ERR_BLOCKED_BY_RESPONSE)
const helmet = require("helmet");

const cors = require("cors");

const app = express();

app.use(helmet());
app.use(nocache());

const corsOptions = {
  origin: process.env.CLIENT_URL,
  credentials: true,
  allowedHeaders: ["sessionId", "Content-Type"],
  exposedHeaders: ["sessionId"],
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  preflightContinue: false,
};
app.use(cors(corsOptions));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(
  mongoSanitize({
    replaceWith: "_",
  })
);
let blackList = ["$", "{", "&&", "||"];
let options = {
  urlBlackList: blackList,
  bodyBlackList: blackList,
};
app.use(filter(options));

//Route authentification centralisé

app.get("/jwtid", auth, (req, res) => {
  res.status(200).send(res.locals.user._id);
});

app.use("/images", express.static(path.join(__dirname, "images")));

// Routes => Log - User - Post - Comment
app.use("/api/user", logRoutes);
app.use("/api/user", userRoutes);
app.use("/api/post", postRoutes);
app.use("/api/comm", commentRoutes);

// server
app.listen(process.env.PORT, () => {
  console.log(`Listening on port ${process.env.PORT}`);
});
