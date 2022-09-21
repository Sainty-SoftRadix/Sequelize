const express = require("express");
const bodyParser = require("body-parser");
const commentController = require("../Controller/comments.controller");
const { checkSchema } = require("express-validator");
const commentInsertSchema = require("../validationSchema/Comment.Insert.validation");
const commentUpdateSchema = require("../validationSchema/Comment.update.validation");
const router = express.Router();
const app = express();
app.use(bodyParser.json());

router.post("/", checkSchema(commentInsertSchema), (req, res) => {
    commentController.createComment(req, res);
})
router.get("/all", (req, res) => {
    commentController.findAllComments(req, res);
})
router.get("/:id", (req, res) => {
    commentController.findCommentByPk(req, res);
})

router.put("/:id", checkSchema(commentUpdateSchema), (req, res) => {
    commentController.updateComment(req, res);
})
router.delete("/:id", (req, res) => {
    commentController.deleteComment(req, res);
})
module.exports = router;