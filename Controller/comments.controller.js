const db = require("../Models");
const Comments = db.Comments;

async function createComment(req, res) {
    try {
        const { comment, post_id } = req.body;
        const commentObj = {
            comment,
            post_id
        }
        const data = await Comments.create(commentObj);
        res.status(200).json({ message: "Comment created successfully", data });
    }
    catch (e) {
        res.status(500).json({ message: e.message });
    }
}
async function findAllComments(req, res) {
    try {
        const data = await Comments.findAll();
        res.status(200).json({ message: "List of All comments : ", data });
    }
    catch (e) {
        res.status(500).json({ message: e.message });
    }
}

async function findCommentByPk(req, res) {
    try {
        const data = await Comments.findByPk(req.params.id);
        res.status(200).json({ message: data });
    }
    catch (e) {
        res.status(500).json({ message: e.message });
    }
}

async function updateComment(req, res) {
    try {
        await Comments.update(req.body, { where: { id: req.params.id } });
        res.status(200).json({ message: "Comment updated successfully" });
    }
    catch (e) {
        res.status(500).json({ message: e.message });
    }
}
async function deleteComment(req, res) {
    try {
        await Comments.destroy({ where: { id: req.params.id } });
        res.status(200).json({ message: "Comment deleted successfully" });
    }
    catch (e) {
        res.status(500).json({ message: e.message });
    }
}

module.exports = {
    createComment,
    findAllComments,
    findCommentByPk,
    updateComment,
    deleteComment
}