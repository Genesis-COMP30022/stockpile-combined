const { Schema, model } = require("mongoose");

const userSchema = new Schema({
  email: {
    type: String,
  },
  created_at: {
    type: String,
  },
  family_name: {
    type: String,
  },
  given_name: {
    type: String,
  },
  name: {
    type: String,
  },
  picture: {
    type: String,
  },
  updated_at: {
    type: String,
  },
  user_id: {
    type: String,
  },
  role: {
    type: String,
  },
  family: {
    type: String,
  },
  family_name: {
    type: String,
  },
});

module.exports = model("users", userSchema);
