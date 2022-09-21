const User = require("./User.js");
const Post = require("./Posts.js");
const Comment = require("./Comments.js");

console.log(`ran Models: `, Post);

User.hasMany(Post, {
  foreignKey: "user_id",
  onDelete: "CASCADE",
});

User.hasMany(Comment, {
  foreignKey: "user_id",
  onDelete: "CASCADE",
});

Post.belongsTo(User, {
  foreignKey: "user_id",
  onDelete: "CASCADE",
});

Post.hasMany(Comment, {
  foreignKey: "post_id",
  onDelete: "CASCADE",
});

Comment.belongsTo(User, {
  foreignKey: "user_id",
  onDelete: "CASCADE",
});

Comment.belongsTo(Post, {
  through: "post_id",
  onDelete: "CASCADE",
});

module.exports = {
  User,
  Comment,
  Post,
};
