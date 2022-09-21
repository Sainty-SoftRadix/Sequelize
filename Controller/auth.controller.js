const db = require("../Models");
const Users = db.Users;
const { encryptedPassword, comparePassword, generateAccessToken, sendEmail } = require("../Common/helper");
const { validationResult } = require("express-validator");

async function signup(req, res) {
    try {
        const errors = await validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        } else {
            console.log("Successfully validated");
        }
        const { name, username, email, password } = req.body;
        const getUsername = await Users.findOne({ where: { username: username } });
        if (getUsername) {
            res.status(400).json({ message: "Username already taken" });
        }
        console.log("body :", req.body);
        const hash = await encryptedPassword(password);
        await Users.create({ name, username, email, password: hash });
        const data = await Users.findOne({ where: { username: username }, attributes: { exclude: ["password", "otp"] } });
        return res.status(200).json({ message: "Signup successfully", data });
    }
    catch (e) {
        return res.status(500).json({ message: e.message });
    }
}
async function login(req, res) {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        } else {
            console.log("Successfully validated");
        }
        const username = req.params.username;
        const password = req.params.password;
        const data = await Users.findOne({ where: { username: username } });
        if (data) {
            const userData = data.toJSON();
            console.log("userData :", userData);
            const match = await comparePassword(password, userData.password);
            if (match) {
                const otp = Math.floor(1000 + Math.random() * 9000);
                await data.update({ otp: otp });
                sendEmail(userData.email, otp, res);
            } else {
                return res.status(400).json({ message: "Invalid Credentials" });
            }
        } else {
            return res.status(400).json({ message: "User not found" });
        }
    }
    catch (e) {
        return res.status(500).json({ message: e.message })
    }
}
async function verifyOTP(req, res) {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        } else {
            console.log("Successfully validated");
        }
        const { username, otp } = req.body;
        const data = await Users.findOne({ where: { username: username } });
        if (data) {
            const userData = data.toJSON();
            if (otp === userData.otp) {
                const token = generateAccessToken(userData);
                const userWithoutPasswordAndOtp = await Users.findOne({
                    where: { username: username },
                    attributes: { exclude: ['password', 'otp'] }
                })
                const finalData = userWithoutPasswordAndOtp.toJSON();
                const user = {
                    ...finalData,
                    token
                }
                return res.status(200).json({ message: "Logged in successfully", user })
            } else {
                return res.status(400).json({ message: "Invalid Creadentials" })
            }
        } else {
            return res.status(400).json({ message: "User not found" });
        }
    }
    catch (e) {
        return res.status(500).json({ message: e.message })
    }
}
module.exports = {
    signup,
    login,
    verifyOTP
}