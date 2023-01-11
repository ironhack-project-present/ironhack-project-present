const express = require("express");
const router = express.Router();
const User = require("../models/User.model");
const Present = require("../models/Present.model");

const { isLoggedIn } = require("../middleware/route.guard");

//require friend model
const Friend = require("../models/Friend.model");

//list of friends
router.get("/friends-list", isLoggedIn, (req, res, next) => {
  const { currentUser } = req.session;
  currentUser.loggedIn = true;
  Friend.find()
    .then((friends) => res.render("friends/friends-list", { friends }))
    .catch((err) => console.log(err));
});

// ADD friend
router.get("/add-friend", isLoggedIn, (req, res) => {
  const { currentUser } = req.session;
  currentUser.loggedIn = true;
  res.render("friends/add-friend", req.session.currentUser);
});

router.post("/add-friend", isLoggedIn, (req, res) => {
  const { currentUser } = req.session;
  currentUser.loggedIn = true;
  const { friendName, friendSurname, birthday, city, avatar } = req.body;

  if (!friendName) {
    res.render("friends/add-friend", {
      errorMessage: "Please provide your friend Name",
    });
    return;
  }

  Friend.create({ friendName, friendSurname, birthday, city, avatar })
    .then(() => res.redirect("/friends/friends-list"))
    .catch((err) => console.log(err));
});
//friend profile

router.get("/:id", isLoggedIn, (req, res) => {
  const { currentUser } = req.session;
  currentUser.loggedIn = true;
  const { id } = req.params;
  Friend.findById(id)
    .then((foundFriend) => res.render("friends/friend-profile", foundFriend))
    .catch((err) => console.log(err));
});

router.get("/:id", (req, res) => {
  // const { id } = req.params;
  Present.find()
    .then((presents) => res.render("friends/friend-profile", presents))
    .catch((err) => console.log(err));
});

//edit friend profile
router.get("/:id/edit", isLoggedIn, (req, res, next) => {
  const { currentUser } = req.session;
  currentUser.loggedIn = true;
  const { id } = req.params;

  Friend.findById(id)
    .then((foundFriend) => res.render("friends/update", foundFriend))
    .catch((err) => console.log(err));
});

router.post("/:id/edit", isLoggedIn, (req, res, next) => {
  const { currentUser } = req.session;
  currentUser.loggedIn = true;
  //   if (req.body.imageUrl === "") {

  //   }
  const { friendName, friendSurname, birthday, city, avatar } = req.body;
  const { id } = req.params;

  Friend.findByIdAndUpdate(id, {
    friendName,
    friendSurname,
    birthday,
    city,
    avatar,
  })
    .then(() => res.redirect(`/friends/${id}`))
    .catch((err) => console.log(err));
});

//remove friend
router.post("/:id/delete", isLoggedIn, (req, res, next) => {
  const { currentUser } = req.session;
  currentUser.loggedIn = true;
  const { id } = req.params;

  Friend.findByIdAndDelete(id)
    .then(() => res.redirect("/friends/friends-list"))
    .catch((err) => console.log(err));
});

module.exports = router;
