const express = require("express");

//  Loading User Model (the object exported in models)
const User = require("../../models/User");

//  brining in gravatar
const gravatar = require("gravatar");

// creating a router variable
const navRouter = express.Router();

//  bringing in bcrypt
const bcrypt = require("bcryptjs");

//  res.json() returns json - automatically serves a 200 status
//  this is similar to res.send()
//  Route Info - tests users route
//  GET request api/users/test
//  Public Access
navRouter.get("/test", (req, res) => {
  res.json({
    message: "The users route works"
  });
});

//  Route Info - Register user
//  GET request api/users/register
//  Public Access
//
//  Using mongoose check for user in database
//  If !user then allow
//  if user exists throw an error and display a message
navRouter.post("/register", (req, res) => {
  User.findOne({ email: req.body.email }).then(user => {
    if (user) {
      return res.status(400).json({ email: "Email already exists" });
    } else {
      //  Gravatar has a set of rules for Using the object
      //  This sets an image rated pg, with a size of 200
      //  d is for a default if the user has no image
      const avatar = gravatar.url(req.body.email, {
        s: "200", // size of image
        r: "pg", // rating
        d: "mm" // default image
      });

      //  When using mongoose to create a new resource
      //  type new <model name> then pass in the data as an object
      const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        avatar: avatar,
        password: req.body.password
      });

      //  Receives req.body.password
      bcrypt.genSalt(10, (err, salt) => {
        //  callback will return error, else returns hash
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err;
          //  sets the password to the hashed password
          newUser.password = hash;
          //  Saves the new user
          newUser
            .save()
            //  responds with user
            .then(user => res.json(user))
            .catch(err => console.log(err));
        });
      });
    }
  });
});
module.exports = navRouter;
