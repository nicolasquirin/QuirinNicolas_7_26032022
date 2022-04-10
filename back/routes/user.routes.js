const router = require("express").Router();
const authController = require("../controllers/auth.controller");
const userController = require("../controllers/profil.user.controller");
const uploadController = require("../controllers/upload.controller");
const auth = require("../middleware/auth.middleware");
const multer = require("multer");
const upload = multer();

// auth
router.post("/register", authController.signUp);
router.post("/login", authController.signIn);
router.get("/logout", authController.logout);

// users SQL DB
router.get("/", auth, userController.profilUsers); //localhost:5000/api/user/
router.get("/:id", auth, userController.profilUserById);
router.post("/:id", auth, userController.profilCreated);
router.put("/:id", auth, userController.profilUpdate);
router.delete("/:id", userController.deleteProfilById);

// upload
router.post("/upload", upload.single("file"), uploadController.uploadProfil);

module.exports = router;
