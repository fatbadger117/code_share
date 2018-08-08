const express = require("express");
// Bringing in mongoose
const mongoose = require("mongoose");
// Creating app
const app = express();
//  Bringing in route / users
const users = require("./routes/api/users");
//  Bringing in route / profile
const profile = require("./routes/api/profile");
// db config - grabbing the object from config/keys
const db = require("./config/keys").mongoURI;
//  Connect to mongodb
//  .then can hold a callback which is used as a success
//  catch errors at the end
mongoose
  .connect(
    db,
    { useNewUrlParser: true }
  )
  .then(() => console.log("MongoDB is now connected badger."))
  .catch(err => console.log(err));

//  Use Routes - Setting this up
//  lets you shorten your code in routes/api/...
//  you can omit the /api/users etc
app.use("/api/users", users);
app.use("/api/profile", profile);

//  Creating Port
//  Using process.env for heroku use
const port = process.env.PORT || 5000;

app.get("/", (req, res) => {
  res.send("welcome to the home page");
});

// App.listen is how to turn on or use the server
app.listen(port, (req, res) => {
  console.log(`Welcome back badger
  your server is listening on port: ${port}`);
});
