import React from "react";
import request from "superagent";
import CreditCard from "../../resources/images/credit.jpg";
import Bank from "../../resources/images/bank.png";

class Deposit extends React.Component {
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
        })
        .catch(err => {
          console.dir(err);
        });
    }
  }

  render() {
    return (
      <div className="deposit">
        <div className="container">
          <h2 className="title"> Pasirinkite būdą:</h2>
          <div className="payment-container">
            <div className="credit-card">
              <img src={CreditCard} className="credit-img" />
              <div className="title-container">
                <h4 className="title"> Kreditine kortele</h4>
              </div>
            </div>
            <div className="bank">
              <img src={Bank} className="bank-img" />
              <div className="title-container">
                <h4 className="title"> Banko pavedimu</h4>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default Deposit;
