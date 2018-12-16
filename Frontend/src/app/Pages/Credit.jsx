import React from "react";
import request from "superagent";
import { Wallet } from "../../resources/scripts/WalletService";
import { User } from "../../resources/scripts/UserService";

class Credit extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cards: []
    };
  }

  componentDidMount() {
    let array = [];
    request
      .get(`http://localhost/api/kortele/get.php?${Wallet.getId()}`)
      .set("Content-Type", "application/json")
      .then(res => {
        if (res.body.korteles) {
          res.body.korteles.forEach((item, index) => {
            let arrayItem = (
              <tr
                key={index}
                onClick={e => {
                  document.querySelectorAll("tr").forEach(item => {
                    item.classList.remove("active");
                  });
                  e.currentTarget.classList.toggle("active");
                  if (
                    !document
                      .querySelector(".deposit-form")
                      .classList.contains("show")
                  ) {
                    document
                      .querySelector(".deposit-form")
                      .classList.add("show");
                  }
                }}
              >
                <th scope="row">{index + 1}</th>
                <td>{item.Numeris}</td>
                <td>{item.Galioja_iki}</td>
              </tr>
            );
            array = [...array, arrayItem];
          });
          this.setState({ cards: array });
        }
      })
      .catch(err => {
        console.dir(err);
      });
  }

  handleAddCreditCard() {
    document.querySelectorAll(".error").forEach(item => {
      item.innerHTML = "";
    });
    let valid = true;
    const numberSelector = "Numeris";
    const codeSelector = "Kodas";
    const validitySelector = "Galioja_iki";

    const responseField = document.querySelector(".response");
    responseField.innerHTML = "";

    const numberField = document.getElementById(numberSelector);
    const codeField = document.getElementById(codeSelector);
    const validityField = document.getElementById(validitySelector);

    const numberErrorField = document.querySelector(`.${numberSelector}`);
    const codeErrorField = document.querySelector(`.${codeSelector}`);
    const validityErrorField = document.querySelector(`.${validitySelector}`);

    if (!numberField.value) {
      numberErrorField.innerHTML = "Laukas privalomas";
      valid = false;
    }
    if (!codeField.value) {
      codeErrorField.innerHTML = "Laukas privalomas";
      valid = false;
    } else if (codeField.value.length !== 3) {
      codeErrorField.innerHTML = "Kodas turi buti 3 skaitmenu";
      valid = false;
    }
    if (!validityField.value) {
      validityErrorField.innerHTML = "Laukas privalomas";
      valid = false;
    }

    if (valid) {
      request
        .post("http://localhost/api/kortele/create.php")
        .send({
          Numeris: numberField.value,
          Kodas: codeField.value,
          Galioja_iki: validityField.value,
          fk_pinigineId: Wallet.getId()
        })
        .set("Content-Type", "application/json")
        .then(res => {
          responseField.innerHTML = res.body.message;
          window.location.reload();
        })
        .catch(err => {
          console.dir(err);
        });
    }
  }

  handleDeposit() {
    document.querySelectorAll(".error").forEach(item => {
      item.innerHTML = "";
    });
    let valid = true;
    const numberSelector = "value";

    const responseField = document.querySelector(".response2");
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
      <div className="credit">
        <div className="container">
          <h4> Jūsų kortelės: </h4>
          <div className="content">
            <table className="table table-hover">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Numeris</th>
                  <th scope="col">Galioja iki</th>
                </tr>
              </thead>
              <tbody>{this.state.cards}</tbody>
            </table>

            <form className="deposit-form">
              <h4 className="title"> Papildyti sąskaitą</h4>
              <div className="form-group">
                <label className="col-form-label" htmlFor="value">
                  Eur
                </label>
                <input type="text" className="form-control" id="value" />
                <span className="error value" />
              </div>
              <div className="response2" />
              <button
                type="button"
                onClick={this.handleDeposit}
                className="btn btn-primary"
              >
                Papildyti
              </button>
            </form>
          </div>
          <a
            href="javascript:void(0)"
            onClick={() =>
              document.querySelector(".add").classList.toggle("show")
            }
          >
            Pridėti kortelę
          </a>
          <form className="add">
            <h1 className="title"> Pridėti kortelę</h1>
            <div className="form-group">
              <label className="col-form-label" htmlFor="Numeris">
                Numeris
              </label>
              <input type="text" className="form-control" id="Numeris" />
              <span className="error Numeris" />
            </div>
            <div className="form-group">
              <label className="col-form-label" htmlFor="Kodas">
                Kodas
              </label>
              <input type="text" className="form-control" id="Kodas" />
              <span className="error Kodas" />
            </div>
            <div className="form-group">
              <label className="col-form-label" htmlFor="Galioja_iki">
                Galioja iki
              </label>
              <input type="date" className="form-control" id="Galioja_iki" />
              <span className="error Galioja_iki" />
            </div>
            <div className="response" />
            <button
              type="button"
              onClick={this.handleAddCreditCard}
              className="btn btn-primary"
            >
              Pridėti
            </button>
          </form>
        </div>
      </div>
    );
  }
}
export default Credit;
