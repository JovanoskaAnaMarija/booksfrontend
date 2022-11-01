//  import InstanceService from "./InstanceService"
import axios from "axios";
import InstanceService from "./InstanceService";

const instance = axios.create({
  baseURL: "http://localhost:8080/",
  headers: {
    "Access-Control-Allow-Origin": "*",
  },
});

const AuthenticationService = {
  loginUser: (request) => {
    return instance.post("/rest/login", request, {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Basic " + request,
      },
    });
  },

  getUserDetails: () => {
    return InstanceService.get(`/rest/user/getUserDetails`);
  },
};
export default AuthenticationService;
