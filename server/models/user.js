const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema({
  name: { type: String, required: true },
  surname: { type: String, required: true },
  username: { type: String, required: true },
  Password: { type: String, required: true },
  status: { type: String, required: true },
});

const User = mongoose.model("User", userSchema);

module.exports = User;
