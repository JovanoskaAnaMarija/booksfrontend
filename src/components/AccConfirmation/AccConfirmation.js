import React, { Component, useEffect, useState } from "react";
import { Card } from "react-bootstrap";
import UserService from "../../repository/userRepository";
import { BsFillCheckCircleFill } from "react-icons/bs";
import "./AccConfirmation.css";
const AccConfirmation = () => {
  const [result, setResult] = useState("");

  const confirmAcount = () => {
    UserService.confirmAccount(localStorage.getItem("Token")).then((res) => {
      console.log(res.data);
    });
  };
  useEffect(() => {}, []);

  return (
    <div>
      <Card
        className="rounded  shadow-sm p-3 mb-5"
        style={{
          width: "30rem",
          height: "20rem",
          position: "relative",
          marginLeft: "auto",
          marginRight: "auto",
          marginTop: "55px",
          border: "1px solid #42f542",
        }}
      >
        <BsFillCheckCircleFill
          style={{
            fontSize: "7rem",
            marginLeft: "auto",
            marginRight: "auto",
            color: "#42f542",
          }}
        />
        <Card.Title style={{ marginTop: "7px", fontSize: "30px" }}>
          Успешна регистрација
        </Card.Title>
        <Card.Body style={{ fontSize: "20px" }}>
          Вашата регистрација е успешна!
        </Card.Body>
      </Card>
      <button
        className="btn"
        id="loginBtn"
        style={{ border: "1px solid #42f542", width: "32%" }}
        onClick={() => {
          window.location.href = "/najava";
        }}
      >
        {" "}
        Најави се
      </button>
    </div>
  );
};

export default AccConfirmation;
