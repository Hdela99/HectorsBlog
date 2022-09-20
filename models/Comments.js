const { Model, DataTypes, Sequelize } = require("sequelize");
const sequelize = requrie("../config/connection");

class Comment extends Model {}

Comment.init(
  {
    id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    content: {
      type: Sequelize.TEXT,
      allowNull: false,
    },
    user_id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      reference: {
        model: "User",
        key: "id",
      },
    },
    post_id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      reference: {
        model: "Post",
        key: "id",
      },
    },
  },
  {
    sequelize,
    timestamps: true,
    freezeTableName: true,
    modelName: "comment",
  }
);

module.exports = Comment;
