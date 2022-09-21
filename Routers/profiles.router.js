const express = require("express");
const profileController = require("../Controller/profiles.controller");
const router = express.Router();
router.post("/", (req, res) => {
    profileController.createProfile(req, res);
})

router.get("/all", (req, res) => {
    profileController.getProfile(req, res);
})
module.exports = router;