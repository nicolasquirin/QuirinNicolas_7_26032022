const router = require("express").Router();
const postController = require("../controllers/post.controller");
const auth = require("../middleware/auth.middleware");
const multer = require("multer");
const upload = multer();

// Posts
router.get("/:id", auth, postController.getOnePost);
router.get("/", auth, postController.getAllPosts);
router.post("/", auth, upload.single("post_image"), postController.createPost);
router.put("/:id", auth, postController.updatePost);
router.delete("/:id", auth, postController.deletePostById);

// Likes/Dislikes
//router.patch("/like-post/:id", postController.likePost);
//router.patch("/unlike-post/:id", postController.unlikePost);


module.exports = router;
