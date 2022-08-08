const router = require('express').Router();
const sequelize = require('../../config/connection');
// const withAuth = require('../../utils/auth');
//add withAuth to all non get routes when activated

const { Post, User, Comment } = require('../../models');

//get all posts
router.get('/', (req, res) => {
  console.log('======================');
    Post.findAll({
        attributes: [
          'id', 
          'content', 
          'title', 
          'created_at'
      ],
        include: [
          {
            model: Comment,
            attributes: [ 'id', 'comment_text', 'post_id', 'user_id', 'created_at'],
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
        .then(dbPostData => {res.json(dbPostData);
          //pass a single post object into the homepage template
        //   const posts = dbPostData.map(post => post.get({plain:true}));
        //   res.render('homepage', {posts});
        })
        .catch(err => {
          console.log(err);
          res.status(500).json(err);
        });
});

//GET A SINGLE POST
router.get('/:id', (req, res) => {
    Post.findOne({
      where: {
        id: req.params.id
      },
      attributes: [
        'id', 
        'content', 
        'title', 
        'created_at',
      ],
      include: [
        {
          model: Comment,
          attributes: [ 'id', 'comment_text', 'post_id', 'user_id', 'created_at'],
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
        if (!dbPostData) {
          res.status(404).json({ message: 'No post found with this id' });
          return;
        }
        res.json(dbPostData);
      })
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
});

//Create a post
router.post('/', (req, res) => {
    //expects { title: 'Title of 1st blog post', content: 'here is what my post is about', user_id: 1}
    Post.create({
        title: req.body.title,
        content: req.body.content,
        user_id: req.body.user_id
        // replace this when session is in place
        //req.session.user_id
    })
    .then(dbPostData => res.json(dbPostData))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});


// //Update a post's title
// router.put('/:id', withAuth, (req, res) => {
//     // expects {username: 'Lernantino', email: 'lernantino@gmail.com', password: 'password1234'}
  
//     // if req.body has exact key/value pairs to match the model, you can just use `req.body` instead
//     Post.update( 
//     {
//         title: req.body.title
//     },
//     {  
//       where: {
//         id: req.params.id
//       }
//     })
//       .then(dbPostData => {
//         if (!dbPostData[0]) {
//           res.status(404).json({ message: 'No post found with this id' });
//           return;
//         }
//         res.json(dbPostData);
//       })
//       .catch(err => {
//         console.log(err);
//         res.status(500).json(err);
//       });
//   });

//delete a post
router.delete('/:id', (req, res) => {
  console.log('id', req.params.id);
    Post.destroy({
      where: {
        id: req.params.id
      }
    })
      .then(dbPostData => {
        if (!dbPostData) {
          res.status(404).json({ message: 'No post found with this id' });
          return;
        }
        res.json(dbPostData);
      })
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
});


module.exports = router;