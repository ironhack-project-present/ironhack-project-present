const express = require("express");
const { response } = require("../app");
const router = express.Router();

const { isLoggedIn } = require('../middleware/route.guard');

//require the present model
const Present = require("../models/Present.model");

//list of presents
router.get("/list", isLoggedIn, (req, res, next) => {
  const { currentUser } = req.session;
  currentUser.loggedIn = true;
  Present.find()
    .then((presents) => res.render("presents/list", { presents, currentUser, loggedIn: true  }))
    .catch((err) => console.log(err));
});

//create present
router.get("/create", isLoggedIn, (req, res, next) => {
  const { currentUser } = req.session;
  currentUser.loggedIn = true;
  res.render("presents/create", currentUser);
});

router.post("/create", isLoggedIn,  (req, res, next) => {
  const { currentUser } = req.session;
  currentUser.loggedIn = true;
  // if (req.body.imageUrl === "") {
  //   const imgUrl =
  //     "https://cdn.pixabay.com/photo/2013/07/12/13/43/present-147168_1280.png";
  //   const { presentName, description, motivations } = req.body;
  // } else {
  //   const { presentName, description, imageUrl, motivations } = req.body;
  // }

  const { presentName, description, imageUrl, motivations } = req.body;

  Present.create({
    presentName,
    description,
    motivations,
    imageUrl,
  })
    .then(() => res.redirect("/presents/list"))
    .catch((err) => console.log(err));
});

//edit present
router.get("/:id/edit", isLoggedIn, (req, res, next) => {
  const { currentUser } = req.session;
  currentUser.loggedIn = true;
  const { id } = req.params;

  Present.findById(id)
    .then((foundPresent) => res.render("presents/update", foundPresent))
    .catch((err) => console.log(err));
});

router.post("/:id/edit", isLoggedIn, (req, res, next) => {
  const { currentUser } = req.session;
  currentUser.loggedIn = true;
  const { presentName, description, imageUrl, motivations } = req.body;
  const { id } = req.params;

  Present.findByIdAndUpdate(id, {
    presentName,
    description,
    imageUrl,
    motivations,
  })
    .then(() => res.redirect("/presents/list"))
    .catch((err) => console.log(err));
});

//delete present
router.post("/:id/delete", isLoggedIn, (req, res, next) => {
  const { currentUser } = req.session;
  currentUser.loggedIn = true;
  const { id } = req.params;

  Present.findByIdAndDelete(id)
    .then(() => res.redirect("/presents/list"))
    .catch((err) => console.log(err));
});

module.exports = router;
