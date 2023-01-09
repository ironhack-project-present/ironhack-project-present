const express = require("express");
const { response } = require("../app");
const router = express.Router();

//require the present model
const Present = require("../models/Present.model");

//list of presents
router.get("/list", (req, res, next) => {
  Present.find()
    .then((presents) => res.render("presents/list", { presents }))
    .catch((err) => console.log(err));
});

//create present
router.get("/create", (req, res, next) => {
  res.render("presents/create");
});

router.post("/create", (req, res, next) => {
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
router.get("/:id/edit", (req, res, next) => {
  const { id } = req.params;

  Present.findById(id)
    .then((foundPresent) => res.render("presents/update", foundPresent))
    .catch((err) => console.log(err));
});

router.post("/:id/edit", (req, res, next) => {
  //   if (req.body.imageUrl === "") {

  //   }
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
router.post("/:id/delete", (req, res, next) => {
  const { id } = req.params;

  Present.findByIdAndDelete(id)
    .then(() => res.redirect("/presents/list"))
    .catch((err) => console.log(err));
});

module.exports = router;
