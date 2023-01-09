const express = require('express');
const router = express.Router();
const User = require('../models/User.model');
const Present = require('../models/Present.model')
const Friend = require('../models/Friend.model')

// const { route } = require('./auth.routes');

// GET route create
router.get('/add-friend', (req, res) => {
    res.render('friends/add-friend');
  });

// POST route create
router.post("/add-friend", (req, res) => {
    const { friendName, friendSurname, birthday, city, avatar } = req.body
    console.log(req.body)
    // const user = req.session.currentUser._id
    
    if (!friendName) {
        res.render('friends/add-friend', { errorMessage: 'Please provide your friend Name' });
        return;
      }

      Friend.create({friendName, friendSurname, birthday, city, avatar})
      .then(()=> res.redirect('/friends/friend-profile'))
      .catch(err => console.log(err))
})
//get friend profile

router.get("/friend-profile", (req, res) => {
    res.render("friends/friend-profile");
  });

module.exports = router;