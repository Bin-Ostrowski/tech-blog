const User = require('./User');
const Post = require('./Post');
const Comment = require('./Comment');

// //a one-to-many relationship
// User.hasMany(Post, {
//     foreignKey: 'user_id'
// });

// //reverse association - a post can belong to one user, but not many users
// Post.belongsTo(User, {
//     foreignKey: 'user_id',
// });

// //many-to-many relastionship
// User.belongsToMany(Post, {
//     foreignKey: 'user_id'
// });
  
// Post.belongsToMany(User, {
//     foreignKey: 'post_id'
// });



// Comment.belongsTo(User, {
//     foreignKey: 'user_id'
// });

// Comment.belongsTo(Post, {
//     foreignKey: 'post_id'
// });

// User.hasMany(Comment, {
//     foreignKey: 'user_id'
// });

// Post.hasMany(Comment, {
//     foreignKey: 'post_id'
// });


module.exports = { User, Post, Comment };
