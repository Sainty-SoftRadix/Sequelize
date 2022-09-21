const express = require("express");
const router = express.Router();
const likesController = require("../Controller/likes.controller");
router.post("/:post_id", (req, res) => {
    likesController.createLike(req, res);
});
router.get("/", (req, res) => {
    likesController.getLikesWithPostId(req, res);
})

module.exports = router;