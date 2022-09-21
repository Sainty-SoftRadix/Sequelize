const PostInsertSchema = {

    description: {
        notEmpty: true,
        errorMessage: "Description field can not be empty"
    }

}

module.exports = PostInsertSchema;