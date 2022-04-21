const router = require("express").Router();
const userController = require("../controllers/profil.user.controller");
const auth = require("../middleware/auth.middleware");

const multer = require("../middleware/multer");

// users SQL DB
router.get("/", userController.GetAllUsers); //localhost:5000/api/user/
router.get("/:id", userController.GetUserById);
router.post("/upload/:id/", multer, userController.PictureUserById);
router.delete("/:id", userController.deleteProfilById);

module.exports = router;
