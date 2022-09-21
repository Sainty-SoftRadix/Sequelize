const express = require("express");
const bodyParser = require("body-parser");
const userController = require("../Controller/users.controller");
const { checkSchema } = require("express-validator");
const UsersPrimaryKey = require("../validationSchema/UsersPK.validation");

const app = express();
app.use(bodyParser.json());
const router = express.Router();

router.get("/all", (req, res) => {
    userController.findAllUsers(req, res);
})
router.get("/:id", checkSchema(UsersPrimaryKey), (req, res) => {
    userController.findUserByPk(req, res);
})

router.put("/", (req, res) => {
    userController.updateUser(req, res);
})
router.delete("/:id", (req, res) => {
    userController.deleteUser(req, res);
})


module.exports = router;