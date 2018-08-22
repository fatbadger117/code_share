const Validator = require("validator");

//  Bringing in object from is-empty
const isEmpty = require("./is-empty");

//  Exporting an object named errors
module.exports = function validateRegisterInput(data) {
  let errors = {};

  //  This code allows the check of data as a string for validator
  data.name = !isEmpty(data.name) ? data.name : "";
  data.email = !isEmpty(data.email) ? data.email : "";
  data.password = !isEmpty(data.password) ? data.password : "";
  //  password 2 is to check for identical passwords
  data.password2 = !isEmpty(data.password2) ? data.password2 : "";

  //  checking length of name input
  //  returning errors
  if (!Validator.isLength(data.name, { min: 2, max: 30 })) {
    errors.name =
      "ooooooo whhheeeeee cant do, name must be between 2 and 30 characters";
  }

  //  These are checks on data using validator
  //  You can think of these as cases in a switch statement
  //  Checks if name field is empty
  if (Validator.isEmpty(data.name)) {
    errors.name = "A Name is required";
  }
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
  // =========== confirming password ================
  //  password2 will confirm the password
  if (Validator.isEmpty(data.password2)) {
    errors.password2 = "Thank you, please confirm password";
  }
  if (!Validator.equals(data.password, data.password2)) {
    errors.password2 = "passwords must match to proceed";
  }
  // ============ Ending Confirm ====================

  //  Using the isLength method allows you to set
  //  a character length on the password using params
  if (!Validator.isLength(data.password, { min: 5, max: 25 })) {
    errors.password = "Password must be between 5 - 25 characters long";
  }

  //  global method - isEmpty
  return {
    errors: errors,
    isValid: isEmpty(errors)
  };
};
