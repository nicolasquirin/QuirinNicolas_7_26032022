const router = require("express").Router();
const postController = require("../controllers/post.controller");
const auth = require("../middleware/auth.middleware");
const multer = require("../middleware/multer");

//Route Authentification centralisé => server.js

//
// Posts
//

router.get("/", postController.getAllPosts);
router.post("/", multer, postController.createPost);
router.put("/:id", postController.updatePost);
router.delete("/:id", postController.deletePostById);

//
// Urgent/notUrgent
//
router.patch("/urgent-post/:id", postController.urgentPost);
router.patch("/noturgent-post/:id", postController.notUrgentPost);

module.exports = router;
