const express = require("express");

// creating a router variable
const navRouter = express.Router();

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
module.exports = navRouter;
