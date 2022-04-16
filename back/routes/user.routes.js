const router = require("express").Router();
const userController = require("../controllers/profil.user.controller");
const uploadController = require("../controllers/upload.controller");
const auth = require("../middleware/auth.middleware");
const multer = require("multer");
const upload = multer();

// users SQL DB
router.get("/", auth, userController.profilUsers); //localhost:5000/api/user/
router.get("/:id", userController.profilUserById);
router.post("/", auth, userController.profilCreated); //A voir si modification de User et profilUser
router.put("/:id", auth, userController.profilUpdate);
router.delete("/:id", auth, userController.deleteProfilById);

// upload
router.post("/upload", upload.single("file"), uploadController.uploadProfil);

module.exports = router;
