const session = require("express-session");
const MongoStore = require("connect-mongo");

module.exports = (app) => {
  // req.session
  app.use(
    session({
      secret: "super safe secret",
      resave: false,
      saveUninitialized: true,
      store: MongoStore.create({
        mongoUrl: process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/Gift-app", // setting the connection string to save my store
        ttl: 24 * 60 * 60, // the time to live for my session
      }),
    })
  );
};
