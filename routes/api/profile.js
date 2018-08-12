//  profile route
const express = require("express");
const mongoose = require("mongoose");
const passport = require("passport");

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
      .then(profile => {
        if (!profile) {
          meeseeksError.missingProfile =
            "ooooo Wheeeee can't do! This profile appears to be missing.";
          return res.status(404).json(meeseeksError);
        }
        //  if profile is found
        //  Return profile
        res.json(profile);
      })
      //  Handle errors
      .catch(err => res.status(404).json(err));
  }
);

module.exports = navRouter;
