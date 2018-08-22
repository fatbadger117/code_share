const Validator = require("validator");

//  Bringing in object from is-empty
const isEmpty = require("./is-empty");

//  Exporting an object named errors
module.exports = function validateLoginInput(data) {
  let errors = {};

  //  This code allows the check of data as a string for validator
  data.email = !isEmpty(data.email) ? data.email : "";
  data.password = !isEmpty(data.password) ? data.password : "";

  //  Checks if email field is empty
  if (Validator.isEmpty(data.email)) {
    errors.email = "A Email is required";
  }
  //  Checks if string entered in email field is
  //  a valid email address
  if (!Validator.isEmail(data.email)) {
    errors.email = "A valid Email address is required";
  }
  //  Checks if a password was entered in this field
  if (Validator.isEmpty(data.password)) {
    errors.password = "A Password is required";
  }

  //  global method - isEmpty
  return {
    errors: errors,
    isValid: isEmpty(errors)
  };
};
