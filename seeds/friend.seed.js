const mongoose = require("mongoose");
const Friend = require("../models/Friend.model");

const friend = [
  {
    friendName: "Franco",
    friendSurname: "Ciccio",
    birthday: "01/03/1852",
    city: "city of angels",
    avatar: "https://ionicframework.com/docs/img/demos/avatar.svg",
  },
  {
    friendName: "Peppe",
    friendSurname: "Smith",
    birthday: "01/03/1052",
    city: "city of demons",
    avatar: "https://ionicframework.com/docs/img/demos/avatar.svg",
  },
];

const MONGO_URI =
  process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/Gift-app";

mongoose
  .connect(MONGO_URI)
  .then((x) => {
    console.log(
      `Connected to Mongo! Database name: "${x.connections[0].name}"`
    );
  })
  .then(() => {
    return Friend.create(friend);
  })
  .then(() => {
    console.log("Presents Seeding was successful");
    return mongoose.connection.close();
  })
  .catch((err) => {
    console.error("Error connecting to mongo: ", err);
  });
