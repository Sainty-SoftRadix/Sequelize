const PostUpdateSchema = {

    image: {
        notEmpty: true,
        errorMessage: "Image field can not be empty"
    },
    description: {
        notEmpty: true,
        errorMessage: " Description field can not be empty"
    }
}
module.exports = PostUpdateSchema;