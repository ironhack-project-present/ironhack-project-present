const express = require("express");
const { response } = require("../app");
const router = express.Router();
const User = require("../models/User.model");
const Friend = require("../models/Friend.model");
const { isLoggedIn } = require("../middleware/route.guard");
const Present = require("../models/Present.model");

//list of presents
router.get("/presents/list", isLoggedIn, (req, res, next) => {
  const { currentUser } = req.session;
  currentUser.loggedIn = true;
  console.log("currentUser", currentUser);
  Present.find()
    .then((presents) => {
      return User.findById(req.session.currentUser.id)
        .populate("friends")
        .then((foundUser) => {
          console.log("foundUser", foundUser);
          res.render("presents/list", {
            presents,
            foundUser,
            currentUser,
            loggedIn: true,
          });
        })
        .catch((err) => {
          console.log(err);
        });
    })
    .catch((err) => console.log(err));
});

//create present
router.get("/presents/create", isLoggedIn, (req, res, next) => {
  const { currentUser } = req.session;
  currentUser.loggedIn = true;
  res.render("presents/create", currentUser);
});

router.post("/presents/create", isLoggedIn, (req, res, next) => {
  const { currentUser } = req.session;
  currentUser.loggedIn = true;

  const { presentName, description, imageUrl, motivations } = req.body;
  const presentImg = imageUrl === "" ? "/images/present-icon.png": imageUrl;
  Present.create({
    presentName,
    description,
    motivations,
    imageUrl: presentImg
  })
    .then(() => res.redirect("/presents/list"))
    .catch((err) => console.log(err));
});
router.get("/presents/:id", (req, res, next) => {
  res.render("auth/profile");
});

// Send present route
router.post("/presents/:id", isLoggedIn, (req, res, next) => {
  const { currentUser } = req.session;
  currentUser.loggedIn = true;
  console.log("currentUser", currentUser);
  const { id } = req.params; // Id of the present
  const { friend } = req.body;
  console.log("friend id", friend);

  Present.findById(id)
    .then((foundPresent) => {
      return Friend.findById(friend).then((foundFriend) => {
        foundFriend.presentId.push(foundPresent);

        foundFriend.save();

        res.redirect(`/friends/${friend}`);
      });
    })
    .catch((err) => console.log(err));
});

//edit present
router.get("/presents/:id/edit", isLoggedIn, (req, res, next) => {
  const { currentUser } = req.session;
  currentUser.loggedIn = true;
  const { id } = req.params;
  Present.findById(id)
    .then((foundPresent) => res.render("presents/update", {foundPresent, currentUser, loggedIn: true}))
    .catch((err) => console.log(err));
});

router.post("/presents/:id/edit", isLoggedIn, (req, res, next) => {
  const { currentUser } = req.session;
  currentUser.loggedIn = true;
  
  const { presentName, description, imageUrl, motivations } = req.body;
  const presentImg = imageUrl === "" ? "/images/present-icon.png": imageUrl;
  const { id } = req.params;
  Present.findByIdAndUpdate(id, {
    presentName,
    description,
    imageUrl: presentImg,
    motivations,
  })
    .then(() => res.redirect("/presents/list"))
    .catch((err) => console.log(err));
});

//delete present
router.post("/presents/:id/delete", isLoggedIn, (req, res, next) => {
  const { currentUser } = req.session;
  currentUser.loggedIn = true;
  const { id } = req.params;

  Present.findByIdAndDelete(id)
    .then(() => res.redirect("/presents/list"))
    .catch((err) => console.log(err));
});

module.exports = router;
