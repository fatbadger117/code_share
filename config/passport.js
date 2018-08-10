//  jwt strategy is outlined in passport docs
//  click here for more detailed info
//  https://www.npmjs.com/package/passport-jwt
const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const mongoose = require("mongoose");

//  User is in reference to the object that was exported
//  object location is models/User
const User = mongoose.model("users");

const keys = require("../config/keys");

//  Create a variable to hold our object to export
//  Docs example hows to use opts.
const opts = {};
//  Using dot notation - add a request to options
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();

//  This is assigning the keys valuse to our options object
//  Now the request is tied to JWT
opts.secretOrKey = keys.secretOrKey;

//  passport is being used a parameter

module.exports = passport => {
  passport.use(
    new JwtStrategy(opts, (jwt_payload, done) => {
      User.findById(jwt_payload.id)
        .then(user => {
          //  if user is found
          if (user) {
            return done(null, user);
          }
          return done(null, false);
        })
        .catch(err => console.log(err));
    })
  );
};
