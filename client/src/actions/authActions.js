import axios from "axios";
import setAuthToken from "../utility/setAuthToken";
import jwt_decode from "jwt-decode";
import { GET_ERRORS, SET_CURRENT_USER } from "./types";

//  Registering User
export const registerUser = (userData, history) => dispatch => {
  axios
    .post("/api/users/register", userData)
    .then(res => history.push("/login"))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

//  Login Route for user token
export const loginUser = userData => dispatch => {
  axios
    .post("/api/users/login", userData)
    .then(res => {
      //  local storage - token
      const { token } = res.data;
      //  setting token to storage
      localStorage.setItem("jwtToken", token);
      //  token must be matched with user
      setAuthToken(token);
      //  token must be decoded
      const decoded = jwt_decode(token);
      dispatch(setCurrentUser(decoded));
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

//    Setting logged in user
export const setCurrentUser = decoded => {
  return {
    type: SET_CURRENT_USER,
    payload: decoded
  };
};

//  loggin user out
export const logoutUser = () => dispatch => {
  //  remove localstorage token
  localStorage.removeItem("jwtToken");
  //  Remove Auth Header
  setAuthToken(false);
  //  Set currentUser to blank {}
  dispatch(setCurrentUser({}));
};
