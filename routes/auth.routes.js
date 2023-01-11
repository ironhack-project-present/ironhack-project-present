const bcrypt = require("bcrypt");
const router = require("express").Router();
const saltRounds = 10;

const User = require("../models/User.model");

const { isLoggedIn, isLoggedOut} = require('../middleware/route.guard');

//get signup

router.get("/signup", isLoggedOut, (req, res) => {
  res.render("auth/signup");
});

//post signup

router.post("/signup", isLoggedOut,  async (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    res.render("auth/signup", {
      errorMessage:
        "All fields are mandatory. Please provide your username, email and password.",
    });
    return;
  }

  const passwordHash = await bcrypt.hash(password, saltRounds);

  User.create({ username, email, password: passwordHash })
    .then((newUser) => {
      req.session.currentUser = { username: newUser.username };
      res.redirect(`/auth/profile`);
    })
    .catch((err) => console.log(err));
});

//get profile

router.get("/profile", isLoggedIn, (req, res) => {
  const { currentUser } = req.session;
  currentUser.loggedIn = true;
  res.render("auth/profile", currentUser);
});

//get login

router.get("/login", isLoggedOut, (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    res.render("auth/login", {
      errorMessage:
        "All fields are mandatory. Please provide your username, email and password.",
    });
    return;
  }
});

//post login

router.post("/login", isLoggedOut, (req, res) => {
  console.log("SESSION =====> ", req.session);
  const { username, password } = req.body;
  console.log("req.body", req.body);
  if (username === "" || password === "") {
    res.render("auth/login", {
      errorMessage: "Please enter username, email and password to login.",
    });
    return;
  }

  User.findOne({ username })
    .then((user) => {
      console.log("user", user);
      if (!user) {
        res.render("auth/login", {
          errorMessage: "Username is not registered. Try with other email.",
        });
        return;
      } else if (bcrypt.compareSync(password, user.password)) {
        const { username } = user;
        req.session.currentUser = { username };
        res.redirect("/auth/profile");
      } else {
        res.render("auth/login", { errorMessage: "Incorrect password." });
      }
    })
    .catch((error) => console.log(error));
});

//post logout

router.post("/logout", isLoggedIn, (req, res) => {
  req.session.destroy((err) => {
    if (err) console.log(err);
    res.redirect("/");
  });
});

module.exports = router;
