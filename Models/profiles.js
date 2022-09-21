module.exports = (sequelize, Sequelize) => {
    const Profiles = sequelize.define("Profile", {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true,
        },
        fullName: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        email: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        phone: {
            type: Sequelize.INTEGER,
            allowNull: false,
        }
    })
    return Profiles;
}