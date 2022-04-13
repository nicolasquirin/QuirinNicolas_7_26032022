const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const userRoutes = require("./routes/user.routes");
const postRoutes = require("./routes/post.routes");
const logRoutes = require("./routes/log.routes");
const commentRoutes = require("./routes/comment.routes");
const auth = require("./middleware/auth.middleware");
require("dotenv").config({ path: "./config/.env" });

// Utilisation de Mysql Database par defaut pour le projet N°7
require("./config/dbSql");

const cors = require("cors");

const app = express();

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

//Jwt

app.get("*", auth);
app.get("/jwtid", (req, res) => {
  res.status(200).send(res.locals.user._id);
  console.log(res.locals.user._id);
});

// routes
app.use("/api/user", logRoutes);
app.use("/api/user", userRoutes);
app.use("/api/post", postRoutes);
app.use("/api/comm", commentRoutes);

// server
app.listen(process.env.PORT, () => {
  console.log(`Listening on port ${process.env.PORT}`);
});
