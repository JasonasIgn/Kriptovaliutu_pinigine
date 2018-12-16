import React from "react";
import request from "superagent";
import { Wallet } from "../../resources/scripts/WalletService";
import { User } from "../../resources/scripts/UserService";
class Exchange extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      information: null,
      eurBalance: Wallet.getBalanceEUR(),
      myOptions: [],
      exchangeOptions: [],
      exchangeValue: 0,
      getValue: 0,
      pickedTo: null,
      pickedFrom: null
    };
  }
  getInformation() {
    let exchangeOpt = [];
    exchangeOpt = [
      ...exchangeOpt,
      <option value="0" key={0}>
        Eurai (EUR) 1 Eur/Vnt
      </option>
    ];
    request
      .get("https://api.coinlore.com/api/tickers/")
      .query({ start: 0 })
      .query({ limit: 30 })
      .then(res => {
        this.setState({ information: res.body });
        res.body.data.forEach(item => {
          console.log(item);
          let itemOpt = (
            <option value={item.id} key={item.id}>{`${item.name} (${
              item.symbol
            }) ${parseFloat(item.price_usd * 1.13).toFixed(
              4
            )} Eur/Vnt`}</option>
          );
          exchangeOpt = [...exchangeOpt, itemOpt];
        });
        this.setState({ exchangeOptions: exchangeOpt });
      });
  }

  calculate() {
    let exchangeValue = document.getElementById("value1").value;
    this.setState({
      exchangeValue: document.getElementById("value1").value
    });
    let eurValue1 = 0;
    let eurValue2 = 0;
    if (this.state.pickedFrom == 0) {
      eurValue1 = 1;
    } else {
      this.state.information.data.forEach(item => {
        if (item.id === this.state.pickedFrom) {
          eurValue1 = item.price_usd * 1.13;
        }
      });
    }

    if (this.state.pickedTo == 0) {
      eurValue2 = 1;
    } else {
      this.state.information.data.forEach(item => {
        if (item.id === this.state.pickedTo) {
          eurValue2 = item.price_usd * 1.13;
        }
      });
    }
    document.getElementById("value2").value =
      (eurValue1 * exchangeValue) / eurValue2;
    this.setState({
      getValue: (eurValue1 * this.state.exchangeValue) / eurValue2
    });
  }
  componentDidMount() {
    this.getInformation();
    if (this.state.eurBalance)
      this.setState({
        myOptions: [
          ...this.state.myOptions,
          <option value="0" key={0}>
            {" "}
            {this.state.eurBalance} Eur{" "}
          </option>
        ]
      });
  }
  handleExchange() {
    document.querySelector(".exchange1").innerHTML = "";
    document.querySelector(".echange2").innerHTML = "";
    document.querySelector(".value1").innerHTML = "";

    let pickedFrom = document.getElementById("exchange1").value;
    let pickedTo = document.getElementById("echange2").value;
    let valueFrom = document.getElementById("value1").value;
    let valueTo = document.getElementById("value2").value;
    let valid = true;
    if (!pickedFrom) {
      document.querySelector(".exchange1").innerHTML = "Privalomas laukas";
      valid = false;
    }
    if (!pickedTo) {
      document.querySelector(".echange2").innerHTML = "Privalomas laukas";
      valid = false;
    }
    if (!valueFrom) {
      document.querySelector(".value1").innerHTML = "Privalomas laukas";
      valid = false;
    } else if (isNaN(valueFrom)) {
      document.querySelector(".value1").innerHTML = "Turi buti skaicius";
      valid = false;
    }
  }

  render() {
    if (!this.state.information) return <div />;
    return (
      <div className="exchange">
        <div className="container">
          <h1 className="title">Keitykla</h1>
          <div className="content">
            <div className="form-group">
              <label className="col-form-label" htmlFor="exchange1">
                Keičiama iš
              </label>
              <select
                className="form-control"
                id="exchange1"
                onChange={() => {
                  this.setState(
                    {
                      pickedFrom: document.getElementById("exchange1").value
                    },
                    () => {
                      this.calculate();
                    }
                  );
                }}
              >
                <option value=""> Pasirinkite </option> {this.state.myOptions}
              </select>
              <span className="error exchange1" />
            </div>
            <div className="form-group">
              <label className="col-form-label" htmlFor="echange2">
                Keičiama į
              </label>
              <select
                className="form-control"
                id="echange2"
                onChange={() => {
                  this.setState(
                    {
                      pickedTo: document.getElementById("echange2").value
                    },
                    () => {
                      this.calculate();
                    }
                  );
                }}
              >
                <option value=""> Pasirinkite </option>
                {this.state.exchangeOptions}
              </select>
              <span className="error echange2" />
            </div>
            <div className="horizontal">
              <div className="form-group half">
                <label className="col-form-label" htmlFor="value1">
                  Kiek keičiate
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="value1"
                  onChange={() => {
                    this.calculate();
                  }}
                />
                <span className="error value1" />
              </div>
              <div className="form-group half">
                <label className="col-form-label" htmlFor="value2">
                  Kiek gausite
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="value2"
                  disabled
                />
                <span className="error value2" />
              </div>
            </div>
            <button
              type="button"
              className="btn btn-primary"
              onClick={() => {
                this.handleExchange();
              }}
            >
              Keisti
            </button>
          </div>
        </div>
      </div>
    );
  }
}
export default Exchange;
