const { Schema, model } = require("mongoose");

// TODO: Please make sure you edit the User model to whatever makes sense in this case
const friendSchema = new Schema({
  friendName: {
    type: String,
    required: true,
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
    default:
      "https://media.istockphoto.com/id/1337144146/vector/default-avatar-profile-icon-vector.jpg?b=1&s=612x612&w=0&k=20&c=IJ1HiV33jl9wTVpneAcU2CEPdGRwuZJsBs_92uk_xNs=",
  },
  presentId: [{ type: Schema.Types.ObjectId, ref: "Present" }],
});

const Friend = model("Friend", friendSchema);

module.exports = Friend;
