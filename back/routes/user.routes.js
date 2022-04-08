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
router.get("/", auth, userController.profilUsers);
router.get("/userId:id", auth, userController.profilUserById);
router.post("/userId:id",auth, userController.profilCreated);
router.put("/userId:id",auth, userController.profilUpdate);
//router.delete("/:id", userController.deleteUser);


// upload
router.post("/upload", upload.single("file"), uploadController.uploadProfil);

module.exports = router;
