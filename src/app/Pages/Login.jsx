import React from "react";

const Login = () => (
  <div className="login">
    <div className="container">
      <form>
        <h1 className="title"> Prisijungti</h1>
        <div class="form-group">
          <label class="col-form-label" for="inputDefault">
            El. paštas
          </label>
          <input type="text" class="form-control" id="inputDefault" />
        </div>
        <div class="form-group">
          <label class="col-form-label" for="inputDefault">
            Slaptažodis
          </label>
          <input type="text" class="form-control" id="inputDefault" />
        </div>
        <button type="button" class="btn btn-primary">
          Prisijungti
        </button>
      </form>
    </div>
  </div>
);
export default Login;
