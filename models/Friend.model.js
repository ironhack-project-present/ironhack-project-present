const { Schema, model } = require("mongoose");

// TODO: Please make sure you edit the User model to whatever makes sense in this case
const friendSchema = new Schema({
  friendName: {
    type: String,
    trim: true,
    required: true,
    unique: true,
  },
  friendSurname: {
    type: String,
    required: false,
  },
  birthday: {
    type: Date,
    required: false,
  },
  city: {
    type: String,
    required: false,
  },
  avatar: {
    type: String,
    required: false,
  },
  present: [{ type: Schema.Types.ObjectId, ref: "Present" }],
});

const Friend = model("Friend", friendSchema);

module.exports = Friend;
