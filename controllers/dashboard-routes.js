const router = require('express').Router();
const sequelize = require('../config/connection');
const withAuth = require('../utils/auth');
//add with login session - add withAuth
const { Post, User, Comment } = require('../models');

//add middleware withAuth, to authgaurd the route
//get all posts for dashboard
router.get('/',withAuth, (req, res) => {
    //only display posts created by the logged in user
    //add a where object to findAll() query that uses id saved on the session.
    Post.findAll({
      where: {
        // use the ID from the session
        user_id: req.session.user_id
      },

     
    })
      .then(dbPostData => {
        // serialize data before passing to template
        const posts = dbPostData.map(post => post.get({ plain: true }));
        console.log(posts)
        res.render('dashboard', { posts, loggedIn: req.session.loggedIn });
      })
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
});

//new post route
router.get('/new', withAuth, (req, res) => {
    res.render('newPost', {
        loggedIn: req.session.loggedIn
    })
})



// //get edit posts
// router.get('/edit/:id', withAuth, (req, res) => {
//   Post.findByPk(req.params.id, {
//     attributes: [
//       'id',
//       'content',
//       'title',
//       'created_at',
//     ],
//     include: [
//       {
//         model: Comment,
//         attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'],
//         include: {
//           model: User,
//           attributes: ['username']
//         }
//       },
//       {
//         model: User,
//         attributes: ['username']
//       }
//     ]
//   })
//     .then(dbPostData => {
//       if (dbPostData) {
//         const post = dbPostData.get({ plain: true });
        
//         res.render('edit-post', {
//           post,
//           loggedIn: true
//         });
//       } else {
//         res.status(404).end();
//       }
//     })
//     .catch(err => {
//       res.status(500).json(err);
//     });
// });



module.exports = router;
