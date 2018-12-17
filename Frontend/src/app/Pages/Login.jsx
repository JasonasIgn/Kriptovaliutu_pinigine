import React from "react";
import request from "superagent";

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  handleLogin() {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    document.querySelectorAll(".error").forEach(item => {
      item.innerHTML = "";
    });
    let valid = true;
    const emailSelector = "email";
    const passwordSelector = "password";

    const responseField = document.querySelector(".response");
    responseField.innerHTML = "";

    const emailField = document.getElementById(emailSelector);
    const passwordField = document.getElementById(passwordSelector);

    const emailErrorField = document.querySelector(`.${emailSelector}`);
    const passwordErrorField = document.querySelector(`.${passwordSelector}`);

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

    if (valid) {
      request
        .post("http://localhost/api/paskyra/login.php")
        .send({
          El_pastas: emailField.value,
          Slaptazodis: passwordField.value
        })
        .set("Content-Type", "application/json")
        .then(res => {
          if (res.body.message) responseField.innerHTML = res.body.message;
          if (res.body.user) {
            window.sessionStorage.setItem(
              "user",
              JSON.stringify(res.body.user)
            );
            window.sessionStorage.setItem("token", res.body.token);
            window.sessionStorage.setItem(
              "wallet",
              JSON.stringify(res.body.wallet)
            );
            window.location.href = "/";
          }
        })
        .catch(err => {
          responseField.innerHTML = "Blogi prisijungimo duomenys";
        });
    }
  }

  render() {
    return (
      <div className="login">
        <div className="container">
          <form>
            <h1 className="title"> Prisijungti</h1>
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
            <div className="response" />
            <button
              type="button"
              onClick={this.handleLogin}
              className="btn btn-primary"
            >
              Prisijungti
            </button>
          </form>
        </div>
      </div>
    );
  }
}

export default Login;
