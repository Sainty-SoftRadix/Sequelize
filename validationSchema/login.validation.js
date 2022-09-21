const loginSchema = {
    username: {
        notEmpty: true,
        errorMessage: "Username can not be empty"
    },
    password: {
        notEmpty: true,
        errorMessage: "Password can not be empty"
    }
}
module.exports = loginSchema;