const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

//create Post Model
class Post extends Model {};

// create fields/columns for Post model
//post title, contents, post creator’s username, 
//and date created for that post and have the option to leave a comment
Post.init(
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false
      },
      content: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            //content must be at least one characters long
            len: [1]
          }
      },
      user_id: {
        type: DataTypes.INTEGER,
        references: {
          model: 'user',
          key: 'id'
        }
      }
    },
    {
      sequelize,

    }
  );

  module.exports = Post;