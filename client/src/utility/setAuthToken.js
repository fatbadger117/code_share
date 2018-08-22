import axios from "axios";

const setAuthToken = token => {
  if (token) {
    //  token must be send to request
    // axios.headers
    axios.defaults.headers.common["Authorization"] = token;
  } else {
    delete axios.defaults.headers.common["Authorization"];
  }
};

export default setAuthToken;
