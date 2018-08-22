const Validator = require("validator");

//  Bringing in object from is-empty
const isEmpty = require("./is-empty");

//  Exporting an object named errors
module.exports = function validateProfileInput(data) {
  let meeseeksError = {};

  //  This code allows the check of data as a string for validator
  //  it sets it to an empty string
  //  using handle for profile route
  data.handle = !isEmpty(data.handle) ? data.handle : "";
  data.status = !isEmpty(data.status) ? data.status : "";

  if (!Validator.isLength(data.handle, { min: 3, max: 35 })) {
    meeseeksError.handle =
      "Im an Mr. meeseeksError Look at me! Handle needs to be btweeen 3 - 35 characters";
  }

  if (Validator.isEmpty(data.handle)) {
    meeseeksError.handle =
      "Im an Mr. meeseeksError Look at me! Handle Profile name is required";
  }

  //  status validation
  if (Validator.isEmpty(data.status)) {
    meeseeksError.status =
      "Im an Mr. meeseeksError Look at me! A Status is required";
  }

  //  global method - isEmpty
  return {
    meeseeksError: meeseeksError,
    isValid: isEmpty(meeseeksError)
  };
};
