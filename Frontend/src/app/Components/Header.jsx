import React from "react";
import { Link } from "react-router-dom";
import { User } from "../../resources/scripts/UserService";

const Header = () => (
  <nav className="navbar navbar-expand-lg navbar-dark bg-primary header">
    <a className="navbar-brand" href="/">
      Kriptošifras
    </a>

    <div className="collapse navbar-collapse">
      <ul className="navbar-nav mr-auto">
        <li className="nav-item">
          <a className="nav-link" href="/exchange">
            Keitykla
          </a>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/cryptocurrency-list">
            Kriptovaliutos
          </Link>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="#">
            Apie
          </a>
        </li>
      </ul>
      <button
        style={{
          display: window.sessionStorage.getItem("user") ? "none" : "block"
        }}
        className="btn btn-secondary my-2 my-sm-0"
        type="submit"
      >
        <Link to={`/register`}>Registracija</Link>
      </button>
      <button
        style={{
          display: window.sessionStorage.getItem("user") ? "none" : "block"
        }}
        className="btn btn-secondary my-2 my-sm-0"
        type="submit"
      >
        <Link to={`/login`}>Prisijungti</Link>
      </button>

      {window.sessionStorage.getItem("user") ? (
        <div
          className="mail"
          onClick={() => (window.location.href = "/mail")}
        />
      ) : null}

      {window.sessionStorage.getItem("user") ? (
        <div
          className="user-select"
          style={{ color: "white" }}
          onClick={() =>
            document.querySelector(".modal-menu").classList.toggle("show")
          }
        >
          Sveiki, {User.getName()}
        </div>
      ) : null}
      <div className="modal-menu">
        <a href="/profile"> Redaguoti paskyrą</a>
        {User.isAdmin() ? <a href="/account-list"> Paskyrų sąrašas</a> : null}
        <a
          href="#"
          onClick={() => {
            User.logout();
            document.querySelector(".modal-menu").classList.toggle("show");
          }}
        >
          Atsijungti
        </a>
      </div>
    </div>
  </nav>
);
export default Header;
