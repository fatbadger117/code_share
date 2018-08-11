const express = require("express");

//  Passport brought in
const passport = require("passport");

//  Keys is brought in to use mongoURI and to sign jwt
const keys = require("../../config/keys");

//  using jwt
const jwt = require("jsonwebtoken");

//  Loading User Model (the object exported in models)
const User = require("../../models/User");

//  Input validation import
const validateRegisterInput = require("../../validation/register");
const validateLoginInput = require("../../validation/login");

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
  //  provide a check for errors
  const { errors, isValid } = validateRegisterInput(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
  }

  User.findOne({ email: req.body.email }).then(user => {
    if (user) {
      return res.status(400).json({ email: "Email already exists" });
    } else {
      //  When using mongoose to create a new resource
      //  type new <model name> then pass in the data as an object
      const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
      });

      //  Receives req.body.password
      bcrypt.genSalt(10, (err, salt) => {
        if (err) throw err;
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

//  Route Info - user login / return JWT
//  GET request - api/users/login
//  Public Access
navRouter.post("/login", (req, res) => {
  const { errors, isValid } = validateLoginInput(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
  }
  // create variables to hold data for eaiser use
  const email = req.body.email;
  const password = req.body.password;

  //  find user by email
  User.findOne({ email: email }).then(user => {
    // Check for user
    if (!user) {
      return res
        .status(404)
        .json({ email: "oooo wheeee cant do, user is not found" });
    }
    //  Now if the user is correct
    //  Check for the password / The password coming =>
    //  in will be hashed - an extra step is required
    //  bcrypt has a method that lets you solve this problem
    bcrypt.compare(password, user.password).then(matchPassword => {
      if (matchPassword) {
        //  using tokens - match user
        //  using access to user
        //  JWT uses payload object to sign
        const payload = {
          id: user.id,
          name: user.name
        };
        //  sign token and return
        //  14400 means token will expire in 4 hours
        jwt.sign(
          payload,
          keys.secretOrKey,
          { expiresIn: 14400 },
          (err, token) => {
            if (err) throw err;
            res.json({
              success: true,
              token: "Bearer " + token
            });
          }
        );
      } else {
        return res.status(400).json({
          passwordErrorResponse:
            "Sorry, the password is incorrect. Please try again."
        });
      }
    });
  });
});

//  Route Info - This route will return current user
//  Based off of jwt
//  GET request - api/users/current
//  Private Access
//  Be sure to call session false to avoid errors
navRouter.get(
  "/current",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    //  creating an object with our own paras protects password data
    res.json({
      id: req.user.id,
      name: req.user.name,
      email: req.user.email
    });
  }
);
module.exports = navRouter;
