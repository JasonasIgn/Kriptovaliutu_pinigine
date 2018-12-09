import React from "react";

const Login = () => (
  <div className="login">
    <div className="container">
      <form>
        <h1 className="title"> Prisijungti</h1>
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
        <button type="submit" className="btn btn-primary">
          Prisijungti
        </button>
      </form>
    </div>
  </div>
);
export default Login;
