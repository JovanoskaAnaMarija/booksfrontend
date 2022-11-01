import "./NavBar.css";
import { Link } from "react-router-dom";
import { BiHeart } from "react-icons/bi";
import SakamKnigi from "../SakamKnigi/SakamKnigi";
import { useEffect, useState } from "react";
import Wrapper from "react";
import { useNavigate } from "react-router-dom";
import React, { Component } from "react";
import {
  Navbar,
  Nav,
  NavDropdown,
  Form,
  FormControl,
  Button,
  Container,
} from "react-bootstrap";
import { Routes, Route } from "react-router-dom";
import { BrowserRouter as Router } from "react-router-dom";
import Books from "../Books/Books";
import { Dropdown } from "react-bootstrap";
import AuthenticationService from "../../services/AuthenticationService";
const NavBar = () => {
  const [user, setUser] = useState({});
  const [link, setLink] = useState("");
  const navigate = useNavigate();
  //   document.getElementById('my_selection').onchange = function() {
  //     window.location.href = this.children[this.selectedIndex].getAttribute('href');
  // }
  // const handleChange = (e) => {
  // setLink(e.target.value)
  // }

  const getUserDetails = () => {
    AuthenticationService.getUserDetails().then((res) => {
      setUser(res.data);
    });
  };
  useEffect(() => {
    // getUserDetails();
  }, []);

  const logout = () => {
    localStorage.clear();
    window.location.href = "/";
  };
  function handleChange(value) {
    navigate(`/${value}`);
  }
  return (
    <div>
      {/* <nav classNameName="navbar navbar-expand-lg navbar-light bg-light">
  <a classNameName="navbar-brand" href="#"></a>
  <button classNameName="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
    <span classNameName="navbar-toggler-icon"></span>
  </button>
  <div classNameName="collapse navbar-collapse" id="navbarNav">
    <ul classNameName="navbar-nav">

      <li classNameName="nav-item active">
        <a classNameName="nav-link" href="/sakamknigi">Сакам книги </a>
      </li>
      <li classNameName="nav-item">
        <a classNameName="nav-link" href="/kupikniga">Купи книга</a>
      </li>
      <li classNameName="nav-item">
        <a classNameName="nav-link" href="/matica">Матица</a>
      </li>
      <li classNameName="nav-item">
        <a classNameName="nav-link" href="/tri">Три</a>
      </li>
      <li classNameName="nav-item">
        <a classNameName="nav-link" href="/antolog">Антолог</a>
      </li>
      <li classNameName="nav-item">
        <a classNameName="nav-link" href="/gjurgja">Ѓурѓа</a>
      </li>
      <li classNameName="nav-item">
        <a classNameName="nav-link" href="/martina">Мартина</a>
      </li>
      <li classNameName="nav-item">
        <a classNameName="nav-link" href="/toper">Топер</a>
      </li>
      <li classNameName="nav-item">
        <a classNameName="nav-link" href="/">Сите книги</a>
      </li>
      <li classNameName="nav-item" >
        <a classNameName="nav-link" href="/wishlist"><BiHeart style={{fontSize:"1.5rem"}} id="heart"/></a>
      </li>
       
    </ul>
    <ul className="nav navbar-nav">
    <a classNameName="nav-link" href="/wishlist" style={{marginLeft:"1020px"}}><BiHeart id="heart" style={{fontSize:"1.5rem"}}/></a>
    </ul>

  </div>
</nav> */}

      <nav className="navbar navbar-expand-lg navbar-light bg-white">
        <a className="navbar-brand" href="#"></a>
        {/* <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
    <span className="navbar-toggler-icon"></span>
  </button> */}

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav ml-auto">
            <li className="nav-item">
              <a className="nav-link" href="/" style={{ color: "black" }}>
                СИТЕ КНИГИ
              </a>
            </li>
            <li className="nav-item dropdown">
              <Dropdown>
                <Dropdown.Toggle
                  className="bg-white"
                  style={{ color: "black", border: "none" }}
                  id="dropdown-basic"
                >
                  Одберете книжара
                </Dropdown.Toggle>

                <Dropdown.Menu>
                  <Dropdown.Item href="/sakamknigi">Сакам книги</Dropdown.Item>
                  <Dropdown.Item href="/matica">Матица</Dropdown.Item>
                  <Dropdown.Item href="/tri">Три</Dropdown.Item>
                  <Dropdown.Item href="/kupikniga">Купи Книга</Dropdown.Item>
                  <Dropdown.Item href="/gjurgja">Ѓурѓа</Dropdown.Item>
                  <Dropdown.Item href="/martina">Мартина</Dropdown.Item>
                  <Dropdown.Item href="/antolog">Антолог</Dropdown.Item>
                  <Dropdown.Item href="/toper">Топер</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </li>
            {localStorage.getItem("Token") !== null ? (
              <li className="nav-item">
                {/* <a classNameName="nav-link" href="/wishlist" style={{color:"black"}}><BiHeart id="heart" style={{fontSize:"1.5rem"}}/></a> */}
                <a
                  className="nav-link"
                  href="/wishlist"
                  style={{ color: "black" }}
                >
                  <i id="heart">
                    WishList <BiHeart style={{ fontSize: "1.5rem" }} />
                  </i>{" "}
                </a>
              </li>
            ) : null}
            {/* {localStorage.getItem("Token")!==null ?
<li className='nav-item'>
<a className='nav-link' href='/dashboard' style={{color:"black"}}>Види Профил</a>
</li>
:
null
} */}

            {localStorage.getItem("Token") !== null ? null : (
              <>
                <li className="nav-item">
                  <a
                    className="nav-link"
                    href="/najava"
                    style={{ color: "black" }}
                  >
                    Најави се
                  </a>
                </li>
                <li className="nav-item">
                  <a
                    className="nav-link"
                    href="/registracija"
                    style={{ color: "black" }}
                  >
                    Регистрирај се
                  </a>
                </li>
              </>
            )}
            {localStorage.getItem("Token") !== null ? (
              <li className="nav-item">
                <button className="btn" onClick={logout}>
                  Одјави се
                </button>
              </li>
            ) : null}
          </ul>
          {/* <form className="form-inline my-2 my-lg-0">
      <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search"/>
      <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
    </form> */}
          <form className="form-inline my-2 my-lg-0">
            {/* <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search"/>
      <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button> */}
          </form>
          <form className="form-group row"></form>
        </div>
      </nav>
    </div>
  );
};
export default NavBar;
