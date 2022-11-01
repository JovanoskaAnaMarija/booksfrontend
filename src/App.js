import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Books from "./components/Books/Books";
import NavBar from "./components/NavBar/NavBar";
import Book from "./components/Book/Book";
import SakamKnigi from "./components/SakamKnigi/SakamKnigi";
import React from "react";
import KupiKniga from "./components/KupiKniga/KupiKniga";
import Matica from "./components/Matica/Matica";
import Tri from "./components/Tri/Tri";
import WishList from "./components/WishList/WishList";
import Antolog from "./components/Antolog/Antolog";
import Gjurgja from "./components/Gjurgja/Gjurgja";
import Martina from "./components/Martina/Martina";
import Toper from "./components/Toper/Toper";
import Login from "./components/Login/Login";
import Register from "./components/Register/Register";
import Dashboard from "./components/Dashboard/Dashboard";
import AccConfirmation from "./components/AccConfirmation/AccConfirmation";
function App() {
  let routes = (
    <Router>
      <NavBar />
      <Routes>
        <Route>
          <Route path="/" exact element={<Books />} />
          <Route path="/book" exact element={<Book />} />
          <Route path="/sakamknigi" exact element={<SakamKnigi />} />
          <Route path="/kupikniga" exact element={<KupiKniga />} />
          <Route path="/matica" exact element={<Matica />} />
          <Route path="/tri" exact element={<Tri />} />
          <Route path="/antolog" exact element={<Antolog />} />
          <Route path="/gjurgja" exact element={<Gjurgja />} />
          <Route path="/martina" exact element={<Martina />} />
          <Route path="/toper" exact element={<Toper />} />
          <Route path="/wishlist" exact element={<WishList />} />
          <Route path="/confirm-account" exact element={<AccConfirmation />} />
          {localStorage.getItem("Token") !== null ? (
            <Route path="/dashboard" exact element={<Dashboard />} />
          ) : null}

          {localStorage.getItem("Token") !== null ? null : (
            <>
              <Route path="/najava" exact element={<Login />} />
              <Route path="/registracija" exact element={<Register />} />
            </>
          )}
        </Route>
      </Routes>
    </Router>
  );
  return <div className="App">{routes}</div>;
}

export default App;
