const express = require("express");
const { checkSchema } = require("express-validator");

const router = express.Router();
const postController = require("../Controller/posts.controller");
const PostInsertSchema = require("../validationSchema/Posts.insert.validation");
const PostUpdateSchema = require("../validationSchema/Posts.update.validation");

router.post("/", checkSchema(PostInsertSchema), (req, res) => {
    postController.createPost(req, res);
})
router.get("/all", (req, res) => {
    postController.findAllPosts(req, res);
})
router.get("/", (req, res) => {
    postController.findPostsByTokenWithCommentsAndLikes(req, res);
})
router.put("/:id", checkSchema(PostUpdateSchema), (req, res) => {
    postController.updatePost(req, res);
})
router.delete("/:id", (req, res) => {
    postController.deletePost(req, res);
})

module.exports = router;