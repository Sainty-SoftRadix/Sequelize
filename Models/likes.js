module.exports = (sequelize, Sequelize) => {
    const Likes = sequelize.define("Likes", {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true
        },
        // user_id: {
        //     type: Sequelize.INTEGER,
        //     allowNull: false
        // }

    });
    return Likes;
}