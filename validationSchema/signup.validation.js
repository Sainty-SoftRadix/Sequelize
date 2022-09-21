const signupSchema = {
    name: {
        notEmpty: true,
        errorMessage: "Name field cannot be empty"
    },
    username: {
        notEmpty: true,
        errorMessage: "Username field cannot be empty"
    },
    password: {
        isStrongPassword: {
            minLength: 8,
            minLowercase: 1,
            minUppercase: 1,
            minNumbers: 1
        },
        errorMessage: "Password must be greater than 8 and contain at least one uppercase letter, one lowercase letter, and one number",
    },
    email: {
        isEmail: true,
        notEmpty: true,
        errorMessage: "Email field cannot be empty"
    }
}
module.exports = signupSchema