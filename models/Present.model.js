const { Schema, model } = require("mongoose");

// TODO: Please make sure you edit the User model to whatever makes sense in this case
const presentSchema = new Schema({
  presentName: {
    type: String,
    trim: true,
    required: true,
    unique: true,
  },
  description: {
    type: String,
    required: true,
  },
  imageUrl: {
    type: String,
    required: true,
  },
  motivations: {
    type: String,
    required: false,
  },
  user: { type: Schema.Types.ObjectId, ref: "User" },
});

const Present = model("Present", presentSchema);

module.exports = Present;
