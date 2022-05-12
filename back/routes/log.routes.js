const router = require("express").Router();
const logController = require("../controllers/log.controller");
const emailCheck = require("../middleware/emailCheck");
const passwordCheck = require("../middleware/passwordCheck");

// SignUp - SignIn - Logout
router.post("/register", passwordCheck, logController.signUp);
router.post("/login", logController.signIn);
router.get("/logout", logController.logout);

module.exports = router;
