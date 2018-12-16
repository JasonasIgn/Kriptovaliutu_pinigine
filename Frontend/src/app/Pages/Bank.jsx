import React from "react";
import request from "superagent";
import { Wallet } from "../../resources/scripts/WalletService";
import { User } from "../../resources/scripts/UserService";

class Bank extends React.Component {
  handleDeposit() {
    document.querySelectorAll(".error").forEach(item => {
      item.innerHTML = "";
    });
    let valid = true;
    const numberSelector = "value";

    const responseField = document.querySelector(".response");
    responseField.innerHTML = "";

    const numberField = document.getElementById(numberSelector);

    const numberErrorField = document.querySelector(`.${numberSelector}`);

    if (!numberField.value) {
      numberErrorField.innerHTML = "Laukas privalomas";
      valid = false;
    } else if (isNaN(numberField.value)) {
      numberErrorField.innerHTML = "Turi būti skaičius";
      valid = false;
    } else if (numberField.value <= 0) {
      numberErrorField.innerHTML = "Turi būti didesnis už 0";
      valid = false;
    }

    if (valid) {
      request
        .post("http://localhost/api/pinigine/add.php")
        .send({
          Id: Wallet.getId(),
          Suma: numberField.value
        })
        .set("Content-Type", "application/json")
        .then(res => {
          responseField.innerHTML = res.body.message;
          request
            .get(`http://localhost/api/pinigine/getById.php?${User.getId()}`)
            .set("Content-Type", "application/json")
            .then(res => {
              window.sessionStorage.setItem(
                "wallet",
                JSON.stringify(res.body.pinigine)
              );
            })
            .catch(err => {
              console.dir(err);
            });
        })
        .catch(err => {
          console.dir(err);
        });
    }
  }

  render() {
    return (
      <div className="bank-deposit">
        <div className="container">
          <form className="deposit-form">
            <h4 className="title"> Papildyti sąskaitą</h4>
            <div className="form-group">
              <label className="col-form-label" htmlFor="value">
                Eur
              </label>
              <input type="text" className="form-control" id="value" />
              <span className="error value" />
            </div>
            <div className="response" />
            <button
              type="button"
              onClick={this.handleDeposit}
              className="btn btn-primary"
            >
              Papildyti
            </button>
          </form>
        </div>
      </div>
    );
  }
}
export default Bank;
