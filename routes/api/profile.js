//  profile route
const express = require("express");
const mongoose = require("mongoose");
const passport = require("passport");

//  Brining in validaion
const validateProfileInput = require("../../validation/profile");

//======= Bringing in models for use=========
const Profile = require("../../models/Profile");
const User = require("../../models/User");
//======== models end =========

// creating a router variable
const navRouter = express.Router();

//  res.json() returns json - automatically serves a 200 status
//  this is similar to res.send()
//  Route Info - tests profile route
//  GET request api/profile/test
//  Public Access
navRouter.get("/test", (req, res) => {
  res.json({
    message: "The profile route works"
  });
});

//  Route Info - Profile route using token access
//  GET request api/profile
//  Private Access
//  passport will use the JWT strategy that
//  was created in config/passport.js
navRouter.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const meeseeksError = {};
    //  user includes users id because of the profile model
    Profile.findOne({ user: req.user.id })
      //  representing user and profile into one repsonse
      .populate("user", ["name", "avatar"])
      .then(profile => {
        if (!profile) {
          meeseeksError.missingProfile =
            "ooooo Wheeeee can't do! This profile appears to be missing.";
          return res.status(404).json({ user: "user not found" });
        }
        //  if profile is found
        //  Return profile
        res.json(profile);
      })
      //  Handle errors
      .catch(err =>
        res.status(404).json({
          meeseeksError: "ooooo wheeeee cant do! Profile doesnt exist"
        })
      );
  }
);

//  Router Info - getting all profiles
//  GET Request   route =  api/profile/all
//  Public Access
navRouter.get("/all", (req, res) => {
  const meeseeksError = {};
  Profile.find()
    .then(profiles => {
      if (!profiles) {
        meeseeksError.noProfile;
        return res.status(404).json(meeseeksError);
      }
      res.json(profiles);
    })
    .catch(err => {
      res.status(404).res.json(meeseeksError);
    });
});

//  Route Info - searching by handle name
//  GET Request   route =  api/profile/handle/:handle
//  Public Access
navRouter.get("/handle/:handle", (req, res) => {
  const meeseeksError = {};
  Profile.findOne({ handle: req.params.handle })
    .then(profile => {
      if (!profile) {
        meeseeksError.noProfile =
          "Look at me! Sorry can't do, there is no profile with that handle!";
        res.status(404).json(meeseeksError);
      }
      res.json(profile);
    })
    .catch(err => res.status(404).json(err));
});

//  Route Info - searching by user id
//  GET Request   route =  api/profile/user/:user_id
//  Public Access
//  Remember to add error catching to avoid errors
navRouter.get("/user/:user_id", (req, res) => {
  const meeseeksError = {};
  Profile.findOne({ user: req.params.user_id })
    .then(profile => {
      if (!profile) {
        meeseeksError.noUser =
          "Look at me! Sorry can't do, there is no user with that ID!";
        res.status(404).json(meeseeksError);
      }
      res.json(profile);
    })
    .catch(meeseeksError => res.status(404).res.json(meeseeksError));
});

//  Route Info - Create user profile
//  POST request api/profile
//  Private Access
//  passport will use the JWT strategy that
//  was created in config/passport.js
navRouter.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { meeseeksError, isValid } = validateProfileInput(req.body);

    //  A validation check
    if (!isValid) {
      //  return errors
      return res.status(400).json(meeseeksError);
    }

    //  Using req.body to import and use input fields
    const profileInputs = {};
    profileInputs.user = req.user.id;
    //  includes name and email
    //  check for input
    //  status = student/ developer/  junior dev / etc
    //
    if (req.body.status) profileInputs.status = req.body.status;
    if (req.body.handle) profileInputs.handle = req.body.handle;
    // if (req.body.bio) profileInputs.bio = req.body.bio;
    //  use handle to create / identify profiles
    Profile.findOne({ user: req.user.id }).then(profile => {
      if (profile) {
        //  put / not post
        Profile.findOneAndUpdate(
          { user: req.user.id },
          { $set: profileInputs },
          { new: true }
        ).then(profile => res.json(profile));
      } else {
        //  this will do a post request

        //  Using handle compare name
        Profile.findOne({ handle: profileInputs.handle }).then(profile => {
          if (profile) {
            err.handle = "Oooo wheee can't do! That handle name already exists";
            res.status(400).json(err);
          }

          //  Saving new profile with mongoose
          new Profile(profileInputs).save().then(profile => res.json(profile));
        });
      }
    });
  }
);

module.exports = navRouter;
