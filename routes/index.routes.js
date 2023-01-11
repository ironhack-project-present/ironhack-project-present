const express = require('express');
const router = express.Router();


const { isLoggedIn, isLoggedOut} = require('../middleware/route.guard');

/* GET home page */
router.get("/", (req, res, next) => {
  const { currentUser } = req.session;
  currentUser.loggedIn = true;
  res.render("index", currentUser);
});

module.exports = router;
