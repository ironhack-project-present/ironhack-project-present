const express = require("express");
const router = express.Router();
const User = require("../models/User.model");
const Present = require("../models/Present.model");

const { isLoggedIn } = require("../middleware/route.guard");

//require friend model
const Friend = require("../models/Friend.model");
const { find } = require("../models/User.model");

//list of friends
router.get("/friends-list", isLoggedIn,  (req, res, next) => {
    const { currentUser } = req.session;
    currentUser.loggedIn = true;
    Friend.find()
      .then((friends) => {
        return User.findById(req.session.currentUser.id)
    .populate("friends")
    .then((foundUser) => {
        res.render("friends/friends-list",  { friends, foundUser, currentUser, loggedIn: true })})
      .catch((err) => console.log(err));
  })
  .catch((err) => console.log(err));
    
    
});

// ADD friend
router.get('/add-friend', isLoggedIn, (req, res) => {
    const { currentUser } = req.session;
    currentUser.loggedIn = true;
    res.render('friends/add-friend', currentUser );
  });

router.post("/add-friend", isLoggedIn, (req, res) => {
  const { currentUser } = req.session;
  currentUser.loggedIn = true;
  const { friendName, friendSurname, birthday, city, avatar } = req.body;
  const avatarImg = avatar === "" ? "/images/avatar2.png": avatar;
  if (!friendName) {
    res.render("friends/add-friend", {
      errorMessage: "Please provide your friend Name",
    });
    return;
  }

  Friend.create({ friendName, friendSurname, birthday, city, avatar: avatarImg })
    .then(newFriend => {        
        return User.findById(currentUser.id)
        .then((user) => {
            user.friends.push(newFriend._id);
            return user.save();
        })
    .then(() => res.redirect("/friends/friends-list"))
    .catch((err) => console.log(err));
    });
})
//friend profile

router.get("/:id", isLoggedIn, (req, res) => {
    const { currentUser } = req.session;
    currentUser.loggedIn = true;
    const { id } = req.params;
    Friend.findById(id)
     .populate('presentId')
    .then((foundFriend) => {
       console.log(foundFriend);
        res.render("friends/friend-profile", {foundFriend, currentUser, loggedIn: true})
        })
        .catch((err) => {
            console.log(err);})
          });



//edit friend profile
router.get("/:id/edit", isLoggedIn, (req, res, next) => {
  const { currentUser } = req.session;
  currentUser.loggedIn = true;
  const { id } = req.params;

  Friend.findById(id)
    .then((foundFriend) => res.render("friends/update", {foundFriend, currentUser, loggedIn: true}))
    .catch((err) => console.log(err));
});

router.post("/:id/edit", isLoggedIn, (req, res, next) => {
  const { currentUser } = req.session;
  currentUser.loggedIn = true;
  
const { friendName, friendSurname, birthday, city, avatar } = req.body;
const avatarImg = avatar === "" ? "/images/avatar2.png": avatar;
  const { id } = req.params;
console.log(id);
  Friend.findByIdAndUpdate(id, {
    friendName,
    friendSurname,
    birthday,
    city,
    avatar: avatarImg,
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
