
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const dotenv = require("dotenv");
const nodemailer = require("nodemailer");
const saltRounds = 10;
dotenv.config();
const TOKEN_SECRET = process.env.TOKEN_SECRET;
const USER = process.env.GMAIL_USERNAME;
const PASS = process.env.GMAIL_PASSWORD;

//OTP EMAIL SENT
function sendEmail(userEmail, otp, res) {
    try {
        Transport = nodemailer.createTransport({
            service: 'gmail',
            port: 587,
            secure: true,
            auth: {
                user: USER, //"saintprsn@gmail.com",
                pass: PASS //"kuaracczsfypijhv"
            },
        });
        const sendResult = Transport.sendMail({
            from: "saintprsn@gmail.com",
            to: userEmail,
            subject: "Login verification",
            text: "Hi, this is the message from nodejs and nodemailer",
            html: `<h1>Enter the OTP : ${otp} in the app for the verification</h1>`
        })
        console.log(" SendResult: ", sendResult);
        return res.status(200).json({ message: "OTP sent on your registered email id successfully" });
    }
    catch (e) {
        res.status(500).json({ message: e.message })
    }
}
//EMAIL BEING SENT EVERY INTERVAL
function sendEmailAtInterval(userEmail, res) {
    try {
        Transport = nodemailer.createTransport({
            service: 'gmail',
            port: 586,
            secure: true,
            auth: {
                user: USER, //"saintprsn@gmail.com",
                pass: PASS //"kuaracczsfypijhv"
            },
        });
        const sendResult = Transport.sendMail({
            from: "saintprsn@gmail.com",
            to: userEmail,
            subject: "Login verification",
            text: "Hi, this is the message from nodejs and nodemailer",
            html: `<h1>Email being sent every 2 minutes</h1>`
        })
        console.log(" SendResult: ", sendResult);
        return res.status(200).json({ message: "OTP sent on your registered email id successfully" });

    }
    catch (e) {
        res.status(500).json({ message: e.message })
    }
}
// cron.schedule("*/2 * * * *", function (req, res) {
//     console.log("running a task every 2 minutes",);
//     const userEmail = "mohan@yopmail.com";
//     sendEmailAtInterval(userEmail, res);
// });
async function verifyJWTToken(req, res, next) {
    try {
        const authToken = req.headers.authorization;
        const authTokenArr = authToken.split(" ");
        const token = authTokenArr[1];
        if (token == null) {
            return res.status(401).json({ message: e.message });
        } else {
            const result = await decodeJWTToken(token, res);
            req.user = result;
            next();
        }
    }
    catch (e) {
        res.status(500).json({ message: e.message })
    }
}
async function encryptedPassword(password) {
    try {
        return await bcrypt.hash(password, saltRounds);
    }
    catch (e) {
        return res.status(500).json({ message: e.message });
    }
}

function generateAccessToken(user, res) {
    try {
        return jwt.sign(JSON.stringify(user), TOKEN_SECRET);
    }
    catch (e) {
        return res.status(500).json({ message: e.message });
    }

}
async function comparePassword(password, hash) {
    try {
        return await bcrypt.compare(password, hash);
    }
    catch (e) {
        return e.message;
    }
}
async function decodeJWTToken(token, res) {
    try {
        return jwt.verify(token, TOKEN_SECRET)

    }
    catch (e) {
        res.status(500).json({ message: e.message })
    }
}

module.exports = {
    encryptedPassword,
    comparePassword,
    generateAccessToken,
    decodeJWTToken,
    verifyJWTToken,
    sendEmail,

}