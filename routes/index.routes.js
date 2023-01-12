const express = require('express');
const router = express.Router();


const { isLoggedIn, isLoggedOut} = require('../middleware/route.guard');

/* GET home page */
router.get("/", (req, res, next) => {
  if (req.session.currentUser) {
    res.render('index', {loggedIn: true});
  }
  else {
    res.render("index");
  }
 
});

module.exports = router;
