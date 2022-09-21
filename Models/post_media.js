module.exports = (sequelize, Sequelize) => {
    const PostImages = sequelize.define("PostImages", {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true
        },
        media: {
            type: Sequelize.STRING,
            allowNull: false
        }
    });
    return PostImages;
}