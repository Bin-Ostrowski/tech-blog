const router = require('express').Router();

const { User, Post, Comment }  = require('../../models');
  
  // create user
  router.post('/', (req, res) => {
    // expects {username: 'robin', email: 'robin@gmail.com', password: 'robin'}
    User.create({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password
      })
      //This gives our server easy access to the user's user_id, username, 
      //and a Boolean describing whether or not the user is logged in.
      .then(dbUserData => {
        req.session.save(() => {
          req.session.user_id = dbUserData.id;
          req.session.username = dbUserData.username;
          req.session.loggedIn = true;
  
          res.json(dbUserData);
        });
      })
  });
  
  //create login 
  router.post('/login', (req, res) => {
    // expects {email: 'lernantino@gmail.com', password: 'password1234'}
    User.findOne({
      where: {
        email: req.body.email
      }
    }).then(dbUserData => {
      if (!dbUserData) {
        res.status(400).json({ message: 'No user with that email address!' });
        return;
      }
  
      const validPassword = dbUserData.checkPassword(req.body.password);
  
      if (!validPassword) {
        res.status(400).json({ message: 'Incorrect password!' });
        return;
      }
  
      req.session.save(() => {
        // declare session variables
        req.session.user_id = dbUserData.id;
        req.session.username = dbUserData.username;
        req.session.loggedIn = true;
  
        res.json({ user: dbUserData, message: 'You are now logged in!' });
      });
    });
  });

//logout of session
router.post('/logout', (req, res) => {
    if (req.session.loggedIn) {
      req.session.destroy(() => {
        res.status(204).end();
      });
    } else {
      res.status(404).end();
    }
});

  module.exports = router;