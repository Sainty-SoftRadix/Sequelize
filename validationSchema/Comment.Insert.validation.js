const commentInsertSchema = {
    Comment: {
        notEmpty: true,
        errorMessage: "Comment field can not be empty"
    }
}
module.exports = commentInsertSchema;