const router = require("express").Router();
const postController = require("../controllers/post.controller");
const auth = require("../middleware/auth.middleware");
const multer = require("multer");
const upload = multer();

// Posts

router.get("/", postController.getAllPosts);
router.get("/user/:id", postController.getPostUser);
router.get("/:id", postController.getOnePost);
router.post("/", upload.single("post_image"), postController.createPost);
router.put("/:id", postController.updatePost);
router.delete("/:id", postController.deletePostById);

// Likes/Dislikes
//router.patch("/like-post/:id", postController.likePost);
//router.patch("/unlike-post/:id", postController.unlikePost);

module.exports = router;
