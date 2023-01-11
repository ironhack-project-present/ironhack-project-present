const mongoose = require("mongoose");
const Present = require("../models/Present.model");

const present = [
  {
    presentName: "doll",
    motivation: "birthday",
    description: "very cute",
    imageUrl:
      "https://i.etsystatic.com/15153137/r/il/643fb0/2714945531/il_fullxfull.2714945531_grej.jpg",
  },
  {
    presentName: "lego",
    motivation: "christmas",
    description: "expensive",
    imageUrl:
      "https://www.lego.com/cdn/cs/set/assets/bltb862bc546852bd71/42143.png",
  },
  {
    presentName: "dinosaur",
    motivation: "birthday",
    description: "t-rex",
    imageUrl: "https://m.media-amazon.com/images/I/61xbgod3NSL._AC_SL1500_.jpg",
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
    return Present.create(present);
  })
  .then(() => {
    console.log("Presents Seeding was successful");
    return mongoose.connection.close();
  })
  .catch((err) => {
    console.error("Error connecting to mongo: ", err);
  });
