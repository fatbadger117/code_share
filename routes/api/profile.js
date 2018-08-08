const express = require("express");

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
module.exports = navRouter;
