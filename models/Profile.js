//  Profile Model
const mongoose = require("mongoose");

// Schema Profile variable creation
const Schema = mongoose.Schema;

//  Creating Profile Schema
const ProfileSchema = new Schema({
  user: {
    //  Associates User by its id
    type: Schema.Types.ObjectId,
    ref: "users"
  },
  handle: {
    type: String,
    required: true,
    max: 40
  },
  status: {
    type: String,
    required: true
  },
  skills: {
    //  must be split from comma seperated values
    //  into an array, then insert into db
    type: [String],
    required: true
  },
  bio: {
    type: String,
    required: false
  },
  date: {
    type: Date,
    default: Date.now
  }
});
//  Export Profile object as profile
module.exports = Profile = mongoose.model("profile", ProfileSchema);
