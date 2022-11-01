import { useEffect, useState } from "react";
import React from "react";
import AuthenticationService from "../../services/AuthenticationService";
const Dashboard = () => {
  const [user, setUser] = useState({});
  const getUserDetails = () => {
    AuthenticationService.getUserDetails().then((res) => {
      console.log(res.data);
      setUser(res.data);
    });
  };
  useEffect(() => {
    getUserDetails();
  }, []);
  return (
    <div>
      <h1>Добредојдовте</h1>
    </div>
  );
};
export default Dashboard;
