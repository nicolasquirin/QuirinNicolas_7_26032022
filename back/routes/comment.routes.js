const router = require("express").Router();
const commController = require("../controllers/comment.controller");
const auth = require("../middleware/auth.middleware");
const multer = require("multer");

// comments
router.get("/:id/user", auth, commController.getAllComments);
router.get("/:id", auth, commController.getCommentById);
//router.post("/:id", auth, commController.createComment);
//router.delete("/:id", auth, commController.deleteCommentById);

module.exports = router;
