const router = require("express").Router();
const userController = require("../controllers/profil.user.controller");
const auth = require("../middleware/auth.middleware");

const multer = require("../middleware/multer");

// users SQL DB
router.get("/", userController.profilUsers); //localhost:5000/api/user/
router.get("/:id", userController.profilUserById);
router.post("/upload", multer, userController.profilUser);
router.delete("/:id", userController.deleteProfilById);

module.exports = router;
