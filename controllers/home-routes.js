//set up main homepage route
const router = require('express').Router();
const sequelize = require('../config/connection');
const { Post, User, Comment, } = require('../models');



// get all posts for homepage
router.get('/', (req, res) => {
  Post.findAll({
  
    include: [
      {
        model: Comment,
        
        include: {
          model: User,
          attributes: ['username']
        }
      },
      {
        model: User,
        attributes: ['username']
      }
    ]
  })
    .then(dbPostData => {
      // serialize the data
      const posts = dbPostData.map(post => post.get({ plain: true }));

      // pass data to template
      res.render('homepage', { 
        posts,
        //can now use loggedIn in {{#if}} statments in handlebars

        loggedIn: req.session.loggedIn
     });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});
 
//render single post page
router.get('/post/:id', (req, res) => {
  Post.findOne({
    where: {
      id: req.params.id
    },

    include: [
      {
        model: Comment,

        include: {
          model: User,
          
        }
      },
      {
        model: User,
        
      }
    ]
  })
    .then(dbPostData => {
      if (!dbPostData) {
        res.status(404).json({ message: 'No post found with this id' });
        return;
      }

      // serialize the data
      const post = dbPostData.get({ plain: true });

      // pass data to template
      res.render('single-post', { 
        post,
        //can now use loggedIn in {{#if}} statments in handlebars
        loggedIn: req.session.loggedIn });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

//render login page
router.get('/login', (req, res) => {
  if (req.session.loggedIn) {
    res.redirect('/');
    return;
  }

  res.render('login');
});

module.exports = router;