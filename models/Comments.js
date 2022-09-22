const { Model, DataTypes, Sequelize } = require("sequelize");
const sequelize = require("../config/connection");

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
    date_created: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: DataTypes.NOW,
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
