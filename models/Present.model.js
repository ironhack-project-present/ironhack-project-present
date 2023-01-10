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
    required: false,
  },
  motivations: {
    type: String,
    required: true,
  },
  friend: { type: Schema.Types.ObjectId, ref: "Friend" },
});

const Present = model("Present", presentSchema);

module.exports = Present;
