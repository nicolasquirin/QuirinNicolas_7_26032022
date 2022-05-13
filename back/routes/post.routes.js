const router = require("express").Router();
const postController = require("../controllers/post.controller");
const auth = require("../middleware/auth.middleware");
const multer = require("../middleware/multer");

// Posts

//router.get("/user/:id", postController.getPostUser);
//router.get("/", postController.getPostPicture);
router.get("/", postController.getAllPosts);
router.post("/", multer, postController.createPost);
router.put("/:id", postController.updatePost);
router.delete("/:id", postController.deletePostById);

// Likes/Dislikes
//router.patch("/like-post/:id", postController.likePost);
//router.patch("/unlike-post/:id", postController.unlikePost);

module.exports = router;
