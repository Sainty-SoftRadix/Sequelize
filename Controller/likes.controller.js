const db = require("../Models");
const Likes = db.Likes;
const Posts = db.Posts;
const Users = db.Users;

async function createLike(req, res) {
    try {
        const post_id = req.params.post_id;

        const data = await Likes.create({ post_id: post_id, user_id: req.user.id });
        return res.status(200).json({ message: "Post Liked successfully", data })
    }
    catch (e) {
        return res.status(500).json({ message: e.message });
    }
}

async function getLikesWithPostId(req, res) {
    try {
        const data = await Users.findOne({
            where: { id: req.user.id },
            include: [{
                model: Posts,
                include: [{ model: Likes }]
            }]
        });
        return res.status(200).json({ message: "All Likes", data })
    }
    catch (e) {
        res.status(500).json({ message: e.message });
    }
}

module.exports = {
    createLike,
    getLikesWithPostId

}