module.exports = (sequelize, Sequelize) => {
    const Comments = sequelize.define("Comments", {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true
        },
        comment: {
            type: Sequelize.STRING,
            allowNull: false,
        },
    })
    return Comments;
}