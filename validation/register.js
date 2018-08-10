const Validator = require("validator");

//  Bringing in object from is-empty
const isEmpty = require("./is-empty");

//  Exporting an object named errors
module.exports = function validateRegisterInput(data) {
  let errors = {};
  //  checking length of name input
  //  returning errors
  if (!Validator.isLength(data.name, { min: 2, max: 30 })) {
    errors.name =
      "ooooooo whhheeeeee cant do, name must be between 2 and 30 characters";
  }

  //  global method - isEmpty
  return {
    errors: errors,
    isValid: isEmpty(errors)
  };
};
