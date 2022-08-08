const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');
// const bcrypt = require('bcrypt');


// create User model
class User extends Model {}

// define table columns and configuration
User.init(
    {
        id: {
          type: DataTypes.INTEGER,
          allowNull: false,
          primaryKey: true,
          autoIncrement: true
        },
        username: {
          type: DataTypes.STRING,
          allowNull: false
        },
        email: {
          type: DataTypes.STRING,
          allowNull: false,
          // validate only one email per user
          unique: true,
          // validate it is an email
          validate: {
            isEmail: true
          }
        },
        // define a password column
        password: {
          type: DataTypes.STRING,
          allowNull: false,
          validate: {
            //password must be at least four characters long
            len: [4]
          }
        }
      },
      {
    // TABLe CONFIGURATION OPTIONS
    //imported sequelize connection (the direct connection to our database)
    sequelize,
    // don't automatically create createdAt/updatedAt timestamp fields
    timestamps: false,
    // don't pluralize name of database table
    freezeTableName: true,
    // use underscores instead of camel-casing (i.e. `comment_text` and not `commentText`)
    underscored: true,
    // make it so our model name stays lowercase in the database
    modelName: 'user'
  }
);

module.exports = User;