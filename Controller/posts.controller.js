const { validationResult } = require("express-validator");
const db = require("../Models");
const multer = require('multer');
const expressValidator = require('express-validator');
const Posts = db.Posts;
const Users = db.Users;
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "./Public")
    },
    filename: function (req, file, cb) {
        const newName = Date.now() + '-' + file.originalname;
        cb(null, newName);
    }
});
const upload = multer({ storage: storage });

async function createPost(req, res) {
    try {
        upload.single("image");
        app.use(expressValidator({
            customValidators: {
                isImage: function (value, filename) {
                    var extension = (path.extname(filename)).toLowerCase();
                    switch (extension) {
                        case '.jpg':
                            return '.jpg';
                        case '.jpeg':
                            return '.jpeg';
                        case '.png':
                            return '.png';
                        default:
                            return false;
                    }
                }
            }
        }));
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            res.status(400).json({ message: errors.array() });
        } else {
            console.log("Validated Successfully");
        }

        const filename = req.file;
        const { description } = req.body;
        const postObj = {
            image: filename,
            description: description,
            user_id: req.user.id
        }
        const data = await Posts.create(postObj);
        res.status(200).json({ message: "Post created successfully", data });
    }
    catch (e) {
        res.status(500).json({ message: e.message });
    }
}
//find all posts of a User
async function findAllPosts(req, res) {
    try {

        const data = await Posts.findAll({ where: { user_id: req.user.id } });
        res.status(200).json({ message: "List of all posts:", data });
    }
    catch (e) {
        res.status(500).json({ message: e.message });
    }
}

async function findPostsByTokenWithCommentsAndLikes(req, res) {
    try {
        const data = await Users.findOne({
            where: { id: req.user.id }, attributes: { exclude: ['password', 'otp'] },
            include: [{
                model: Posts,
                include: [{ model: db.Comments }, { model: db.Likes }]
            }]
        });

        res.status(200).json({ message: "List of Posts of the user with their Comments & Likes", data });
    }
    catch (e) {
        res.status(500).json({ message: e.message });
    }
}

async function updatePost(req, res) {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            res.status(400).json({ message: errors.array() });
        } else {
            console.log("Validated Successfully");
        }
        await Posts.update(req.body, { where: { id: req.params.id } })
        res.status(200).json({ message: "Post updated successfully" });
    }
    catch (e) {
        res.status(500).json({ message: e.message });
    }
}
async function deletePost(req, res) {
    try {
        await Posts.destroy({ where: { id: req.params.id } })
        res.status(200).json({ message: "Post deleted successfully" });
    }
    catch (e) {
        res.status(500).json({ message: e.message });
    }
}
module.exports = {
    createPost,
    findAllPosts,
    findPostsByTokenWithCommentsAndLikes,
    updatePost,
    deletePost


}