const router = require("express").Router();
const logController = require("../controllers/log.controller");
const emailCheck = require("../middleware/emailCheck");
const passwordCheck = require("../middleware/passwordCheck");

// SignUp - SignIn - Logout
//Route Authentification centralisé => server.js
router.post("/register", emailCheck, passwordCheck, logController.signUp);
router.post("/login", emailCheck, logController.signIn);
router.get("/logout", logController.logout);

module.exports = router;
