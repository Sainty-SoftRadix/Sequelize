const express = require("express");
const { checkSchema } = require("express-validator");
const authController = require("../Controller/auth.controller");
const signupSchema = require("../validationSchema/signup.validation");
const loginSchema = require("../validationSchema/login.validation");
const verifySchema = require("../validationSchema/verify.validation")
const router = express.Router();

router.post("/signup", checkSchema(signupSchema), (req, res) => {
    authController.signup(req, res);
})

router.get("/login/:username/:password", checkSchema(loginSchema), (req, res) => {
    authController.login(req, res);
})
router.get("/verify", checkSchema(verifySchema), (req, res) => {
    authController.verifyOTP(req, res);
})
module.exports = router;