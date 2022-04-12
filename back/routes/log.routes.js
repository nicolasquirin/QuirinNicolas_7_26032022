const router = require("express").Router();
const logController = require("../controllers/log.controller");
const multer = require("multer");
const upload = multer();


// SignUp - SignIn - Logout
router.post("/register", logController.signUp);
router.post("/login", logController.signIn);
router.get("/logout", logController.logout);


module.exports = router;