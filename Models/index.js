const Sequelize = require("sequelize");
const sequelize = new Sequelize("SequelizeTest", "root", "", {
    host: "localhost",
    dialect: "mysql",
})
const db = {};
db.sequelize = sequelize;
db.Sequelize = Sequelize;
db.Users = require("./users")(sequelize, Sequelize);
db.Posts = require("./posts")(sequelize, Sequelize);
db.Comments = require("./comments")(sequelize, Sequelize);
db.Profiles = require("./profiles")(sequelize, Sequelize);
db.Likes = require("./likes")(sequelize, Sequelize);
db.Post_media = require("./post_media")(sequelize, Sequelize);
module.exports = db;

db.Users.hasOne(db.Profiles);
db.Profiles.belongsTo(db.Users);
db.Likes.belongsTo(db.Users, { foreignKey: "user_id" });
db.Post_media.belongsTo(db.Posts, { foreignKey: "post_id" });

db.Users.hasMany(db.Posts, { foreignKey: "user_id" });
db.Posts.hasMany(db.Comments, { foreignKey: "post_id" });
db.Posts.hasMany(db.Likes, { foreignKey: "post_id" });

db.sequelize.sync({ force: false })
    .then(() => {
        console.log("Synced db");
    })
    .catch((e) => {
        console.log("Failed to Sync db :" + e.message);
    })