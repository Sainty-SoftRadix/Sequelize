const verifySchema = {
    username: {
        notEmpty: true,
        errorMessage: "Username field can not be empty"
    },
    otp: {
        notEmpty: true,
        errorMessage: "OTP field can not be empty"
    }
}
module.exports = verifySchema;