const db = require("../Models");
const Profiles = db.Profiles;
const Users = db.Users

async function createProfile(req, res) {
    try {
        const { fullName, email, phone } = req.body;
        if (!fullName || !email || !phone) {
            res.status(400).json({ message: "Context can not be empty" });
        }
        const profileObj = {
            fullName,
            email,
            phone,
            user_id: req.user.id
        }
        const data = await Profiles.create(profileObj);
        res.status(200).json({ message: "Profile created successfully", data });

    }
    catch (e) {
        res.status(500).json({ message: e.message });
    }
}

async function getProfile(req, res) {
    try {
        const data = await Users.findOne({
            where: { id: req.user.id },
            include: [{ model: Profiles }]
        });
        res.status(200).json({ message: data });
    }
    catch {

    }
}

module.exports = {
    createProfile,
    getProfile
}