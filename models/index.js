const User = require('./User');
const Post = require('./Post');
const Comment = require('./Comment');


//reverse association - a post can belong to one user, but not many users
Post.belongsTo(User, { 
    foreignKey:'user_id'  
});

//are these two belongsTo duplicates?
Comment.belongsTo(User, {  
    foreignKey:'user_id' 
});

Post.hasMany(Comment, {
    foreignKey:'post_id'
});


module.exports = { User, Post, Comment };
