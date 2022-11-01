import axios from "axios";
const instance = axios.create({
  baseURL: "http://localhost:8080/",
  headers: {
    "Access-Control-Allow-Origin": "*",
  },
});
const UserService = {
  registerUser: (userHelper, email, password) => {
    return instance.post("/rest/user/signup", userHelper, {
      headers: {
        "Content-Type": "application/json",
        email: email,
        password: password,
      },
    });
  },

  confirmAccount: (token) => {
    return instance.get("/rest/user/confirm-account", {
      params: {
        token: token,
      },
    });
  },
};
export default UserService;
