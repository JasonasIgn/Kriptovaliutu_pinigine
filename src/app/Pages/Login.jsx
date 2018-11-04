import React from "react";

const Login = () => (
  <div className="login">
    <div className="container">
      <form>
        <h1 className="title"> Prisijungti</h1>
        <div class="form-group">
          <label class="col-form-label" for="email">
            El. paštas
          </label>
          <input type="email" class="form-control" id="email" />
        </div>
        <div class="form-group">
          <label class="col-form-label" for="password">
            Slaptažodis
          </label>
          <input type="password" class="form-control" id="password" />
        </div>
        <button type="submit" class="btn btn-primary">
          Prisijungti
        </button>
      </form>
    </div>
  </div>
);
export default Login;
