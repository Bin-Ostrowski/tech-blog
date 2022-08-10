const router = require('express').Router();
// const withAuth = require('../../utils/auth');
//add withAuth to all non get routes when activated

const { Comment } = require('../../models');

//delete when done
//get all comments
router.get('/', (req, res) => {
  Comment.findAll()
    .then(dbCommentData => res.json(dbCommentData))
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});


//create new comment
router.post('/', (req, res) => {

    // expects => {comment_text: "This is the comment", user_id: 1, post_id: 1}
    Comment.create({
      comment_text: req.body.comment_text,
      post_id: req.body.post_id,
      //use the id from the session
      user_id: req.session.user_id
    })
    .then(dbCommentData => res.json(dbCommentData))
    .catch(err => {
      console.log(err);
      res.status(400).json(err);
    });
 
});

router.delete('/:id', (req, res) => {
  Comment.destroy({
      where: {
        id: req.params.id
      }
    })
    .then(dbCommentData => {
      if (!dbCommentData) {
        res.status(404).json({
          message: 'No comment found with this id'
        });
        return;
      }
      res.json(dbCommentData);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router;