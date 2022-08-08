const router = require('express').Router();
const sequelize = require('../../config/connection');
const withAuth = require('../../utils/auth');
//add withAuth to all non get routes when activated

const {
    Post,
    User,
    Comment
} = require('../../models');


//Create a post
router.post('/',withAuth, (req, res) => {
    //expects { title: 'Title of 1st blog post', content: 'here is what my post is about', user_id: 1}
    Post.create({
            ...req.body,
            user_id: req.session.user_id
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
                res.status(404).json({
                    message: 'No post found with this id'
                });
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