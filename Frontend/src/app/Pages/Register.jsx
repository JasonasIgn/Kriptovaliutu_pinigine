import React from "react";
import request from "superagent";

class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  handleRegistration() {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    document.querySelectorAll(".error").forEach(item => {
      item.innerHTML = "";
    });
    let valid = true;
    const firstNameSelector = "firstName";
    const lastNameSelector = "lastName";
    const emailSelector = "email";
    const passwordSelector = "password";
    const passwordRepeatSelector = "repeatPassword";

    const responseField = document.querySelector(".response");
    responseField.innerHTML = "";

    const firstNameField = document.getElementById(firstNameSelector);
    const lastNameField = document.getElementById(lastNameSelector);
    const emailField = document.getElementById(emailSelector);
    const passwordField = document.getElementById(passwordSelector);
    const repeatPasswordField = document.getElementById(passwordRepeatSelector);

    const firstNameErrorField = document.querySelector(`.${firstNameSelector}`);
    const lastNameErrorField = document.querySelector(`.${lastNameSelector}`);
    const emailErrorField = document.querySelector(`.${emailSelector}`);
    const passwordErrorField = document.querySelector(`.${passwordSelector}`);
    const repeatPasswordErrorField = document.querySelector(
      `.${passwordRepeatSelector}`
    );

    if (!firstNameField.value) {
      firstNameErrorField.innerHTML = "Laukas privalomas";
      valid = false;
    }
    if (!lastNameField.value) {
      lastNameErrorField.innerHTML = "Laukas privalomas";
      valid = false;
    }
    if (!emailField.value) {
      emailErrorField.innerHTML = "Laukas privalomas";
      valid = false;
    } else if (!re.test(emailField.value)) {
      emailErrorField.innerHTML = "Patikrinkite duomenis";
      valid = false;
    }
    if (!passwordField.value) {
      passwordErrorField.innerHTML = "Laukas privalomas";
      valid = false;
    }
    if (!repeatPasswordField.value) {
      repeatPasswordErrorField.innerHTML = "Laukas privalomas";
      valid = false;
    } else if (passwordField.value !== repeatPasswordField.value) {
      repeatPasswordErrorField.innerHTML = "Slaptažodžiai nesutampa";
      valid = false;
    }

    if (valid) {
      request
        .post("http://localhost/api/paskyra/create.php")
        .send({
          Vardas: firstNameField.value,
          Pavarde: lastNameField.value,
          El_pastas: emailField.value,
          Slaptazodis: passwordField.value
        })
        .set("Content-Type", "application/json")
        .then(res => {
          responseField.innerHTML = res.body.message;
          console.log(res);
        })
        .catch(err => {
          console.dir(err);
          //responseField.innerHTML = err.body.message;
        });
    }
  }

  render() {
    return (
      <div className="register">
        <div className="container">
          <form>
            <h1 className="title"> Registracija</h1>
            <div className="form-group">
              <label className="col-form-label" htmlFor="firstName">
                Vardas
              </label>
              <input type="text" className="form-control" id="firstName" />
              <span className="error firstName" />
            </div>
            <div className="form-group">
              <label className="col-form-label" htmlFor="lastName">
                Pavardė
              </label>
              <input type="text" className="form-control" id="lastName" />
              <span className="error lastName" />
            </div>
            <div className="form-group">
              <label className="col-form-label" htmlFor="email">
                El. paštas
              </label>
              <input type="email" className="form-control" id="email" />
              <span className="error email" />
            </div>
            <div className="form-group">
              <label className="col-form-label" htmlFor="password">
                Slaptažodis
              </label>
              <input type="password" className="form-control" id="password" />
              <span className="error password" />
            </div>
            <div className="form-group">
              <label className="col-form-label" htmlFor="repeatPassword">
                Pakartokite slaptažodį
              </label>
              <input
                type="password"
                className="form-control"
                id="repeatPassword"
              />
              <span className="error repeatPassword" />
            </div>
            <div className="response" />
            <button
              type="button"
              onClick={this.handleRegistration}
              className="btn btn-primary"
            >
              Registruotis
            </button>
          </form>
        </div>
      </div>
    );
  }
}
export default Register;
