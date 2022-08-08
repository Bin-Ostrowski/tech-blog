const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');
const bcrypt = require('bcrypt');


// create User model
class User extends Model {
    //check passwords
    checkPassword(loginPw) {
        return bcrypt.compareSync(loginPw, this.password); 
    }
}

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
        hooks: {
           // set up beforeCreate lifecycle "hook" functionality
           async beforeCreate(newUserData) {
            newUserData.password = await bcrypt.hash(newUserData.password, 10);
            return newUserData;
            },
            //set upbeforeUpdate lifecycle "hook" functionality
            async beforeUpdate(updatedUserData) {
                updatedUserData.password = await bcrypt.hash(updatedUserData.password, 10);
                return updatedUserData;
            }
        },
    //imported sequelize connection 
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