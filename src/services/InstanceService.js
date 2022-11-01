import axios from "axios";

const AUTH_TOKEN = "auth_token";
const InstanceService = axios.create({
  baseURL: "http://localhost:8080/",
  headers: {
    "Access-Control-Allow-Origin": "*",
    // 'Access-Control-Allow-Methods': 'GET,POST,OPTIONS,DELETE,PUT',
  },
});
// const InstanceService = axios.create({
//     baseURL: process.env.REACT_APP_HOST_ENV,
//     headers: {
//         'Access-Control-Allow-Origin': '*'
//     },
// });

InstanceService.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("Token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    } else {
      console.log("Unauthorized");
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default InstanceService;
