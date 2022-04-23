const router = require("express").Router();
const commController = require("../controllers/comment.controller");
const auth = require("../middleware/auth.middleware");
const multer = require("multer");

// comments
router.get("/", commController.getAllComments);
router.get("/:id", commController.getCommentById);
router.post("/:id", commController.createComment);
router.delete("/:id", commController.deleteCommentById);

module.exports = router;
