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
    // const userNotAllowedMethods = [
    //     "DELETE",
    // ];
    // // const method = req.method;
    // const match = userNotAllowedMethods.find(obj => obj = req.method);
    // if (match) {
    //     const userRole = req.user.role;
    //     if (userRole == "admin") {
    //         userController.deleteUser(req, res);
    //         // next();
    //     } else {
    //         return res.status(401).json("You don't have the permission!")
    //     }
    // }
    userController.deleteUser(req, res);

})

module.exports = router;