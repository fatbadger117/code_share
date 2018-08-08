const mongoose = require("mongoose");

// Schema variable creation
const Schema = mongoose.Schema;

// Creating UserSchema
const UserSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  avatar: {
    type: String
  },
  date: {
    type: Date,
    default: Date.now
  }
});

//  This exports the variable User as an object so
//  that we can access it
//  The value of User is the variable named users
//  users is bound to UserSchema
module.exports = User = mongoose.model("users", UserSchema);
