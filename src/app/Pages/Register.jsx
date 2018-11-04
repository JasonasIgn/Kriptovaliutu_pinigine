import React from "react";

const Register = () => (
  <div className="register">
    <div className="container">
      <form>
        <h1 className="title"> Registracija</h1>
        <div class="form-group">
          <label class="col-form-label" for="firstName">
            Vardas
          </label>
          <input type="text" class="form-control" id="firstName" />
        </div>
        <div class="form-group">
          <label class="col-form-label" for="lastName">
            Pavardė
          </label>
          <input type="text" class="form-control" id="lastName" />
        </div>
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
        <div class="form-group">
          <label class="col-form-label" for="repeatPassword">
            Pakartokite slaptažodį
          </label>
          <input type="password" class="form-control" id="repeatPassword" />
        </div>
        <button type="submit" class="btn btn-primary">
          Registruotis
        </button>
      </form>
    </div>
  </div>
);
export default Register;
