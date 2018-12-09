import React from "react";
import { Link } from "react-router-dom";

const Index = ({ user }) => (
  <nav className="navbar navbar-expand-lg navbar-dark bg-primary header">
    <a className="navbar-brand" href="/">
      Kriptošifras
    </a>
    <button
      className="navbar-toggler"
      type="button"
      data-toggle="collapse"
      data-target="#navbarColor01"
      aria-controls="navbarColor01"
      aria-expanded="false"
      aria-label="Toggle navigation"
    >
      <span className="navbar-toggler-icon" />
    </button>

    <div className="collapse navbar-collapse" id="navbarColor01">
      <ul className="navbar-nav mr-auto">
        <li className="nav-item">
          <a className="nav-link" href="#">
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
        style={{ display: user ? "none" : "block" }}
        className="btn btn-secondary my-2 my-sm-0"
        type="submit"
      >
        <Link to={`/register`}>Registracija</Link>
      </button>
      <button
        style={{ display: user ? "none" : "block" }}
        className="btn btn-secondary my-2 my-sm-0"
        type="submit"
      >
        <Link to={`/login`}>Prisijungti</Link>
      </button>
      {user ? <div style={{ color: "white" }}> Sveiki, vartotojau </div> : null}
    </div>
  </nav>
);
export default Index;
