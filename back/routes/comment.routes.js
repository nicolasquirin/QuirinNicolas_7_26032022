const router = require("express").Router();
const commController = require("../controllers/comment.controller");
const auth = require("../middleware/auth.middleware");

// comments
router.get("/", commController.getAllComments);
router.get("/:id", commController.getCommentById);
router.post("/:id", commController.createComment);
router.put("/:id", commController.updateComment);
router.delete("/:id", commController.deleteCommentById);

module.exports = router;
