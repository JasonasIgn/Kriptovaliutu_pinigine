import React from "react";

const Register = () => (
  <div className="register">
    <div className="container">
      <form>
        <h1 className="title"> Registracija</h1>
        <div className="form-group">
          <label className="col-form-label" htmlFor="firstName">
            Vardas
          </label>
          <input type="text" className="form-control" id="firstName" />
        </div>
        <div className="form-group">
          <label className="col-form-label" htmlFor="lastName">
            Pavardė
          </label>
          <input type="text" className="form-control" id="lastName" />
        </div>
        <div className="form-group">
          <label className="col-form-label" htmlFor="email">
            El. paštas
          </label>
          <input type="email" className="form-control" id="email" />
        </div>
        <div className="form-group">
          <label className="col-form-label" htmlFor="password">
            Slaptažodis
          </label>
          <input type="password" className="form-control" id="password" />
        </div>
        <div className="form-group">
          <label className="col-form-label" htmlFor="repeatPassword">
            Pakartokite slaptažodį
          </label>
          <input type="password" className="form-control" id="repeatPassword" />
        </div>
        <button type="submit" className="btn btn-primary">
          Registruotis
        </button>
      </form>
    </div>
  </div>
);
export default Register;
