
const db = require("../Models");
const Users = db.Users;



async function findAllUsers(req, res) {
    try {
        const data = await Users.findAll();
        res.status(200).json({ message: "List of All users", data });
    }
    catch (e) {
        res.status(500).json({ message: e.message });
    }
}

async function findUserByPk(req, res) {
    try {
        const data = await Users.findByPk(req.params.id);
        res.status(200).json({ message: data });
    }
    catch (e) {
        res.status(500).json({ message: e.message });
    }
}

function updateUser(req, res) {
    try {
        Users.update(req.body, { where: { id: req.user.id } });
        res.status(200).json({ message: "User updated successfully" });
    }
    catch (e) {
        res.status(500).json({ message: e.message });
    }
}
async function deleteUser(req, res) {
    try {
        const getUser = await Users.findAll({ where: { id: req.params.id } });

        if (getUser && getUser.length) {
            Users.destroy({ where: { id: req.params.id } });
            res.status(200).json({ message: "User deleted successfully" });

        } else {
            res.status(400).json({ message: "User does not exist" });

        }

    }
    catch (e) {
        res.status(500).json({ message: e.message });
    }
}
module.exports = {
    findAllUsers,
    findUserByPk,
    updateUser,
    deleteUser,
}

