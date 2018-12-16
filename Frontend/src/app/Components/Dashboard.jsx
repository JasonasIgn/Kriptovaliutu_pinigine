import React from "react";
import TransferIcon from "../../resources/images/icon-transfer.png";
import InfoIcon from "../../resources/images/icon-info.png";
import request from "superagent";
import QuestionButton from "./QuestionButton";
import { Wallet } from "../../resources/scripts/WalletService";
import { User } from "../../resources/scripts/UserService";

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      myCryptos: []
    };
  }
  componentDidMount() {
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

    request
      .get(
        `http://localhost/api/pinigine_kriptovaliuta/getById.php?${Wallet.getId()}`
      )
      .then(res => {
        res.body.kriptovaliutos.forEach(item => {
          request
            .get("https://api.coinlore.com/api/ticker/")
            .query({ id: item.fk_KriptovaliutaId })
            .then(res => {
              let divItem = (
                <div className="card text-white bg-primary mb-3">
                  <div className="card-header">
                    {res.body[0].name}
                    <div className="actions-container">
                      <img src={InfoIcon} />
                      <img src={TransferIcon} />
                    </div>
                  </div>
                  <div className="card-body">
                    <h4 className="card-title">
                      {`${item.Balansas} ${res.body[0].symbol}`}
                    </h4>
                  </div>
                </div>
              );
              this.setState({ myCryptos: [...this.state.myCryptos, divItem] });
            });
        });
      });
  }
  render() {
    return (
      <div className="dashboard">
        <div className="container">
          <div className="real-money">
            <div className="money-container">
              <h2 className="money">
                {parseFloat(Wallet.getBalanceEUR()).toFixed(2)}
              </h2>
              <h4 className="currency">EUR</h4>
            </div>
            <div className="actions-container">
              <button
                type="button"
                className="btn btn-secondary"
                onClick={() => (window.location.href = "/deposit")}
              >
                Papildyti
              </button>
              <button
                type="button"
                className="btn btn-secondary"
                onClick={() => (window.location.href = "/withdraw")}
              >
                Išgryninti
              </button>
            </div>
          </div>
          <div className="crypto-container">
            <h2 className="title">Kriptovaliutos</h2>
            {this.state.myCryptos}
          </div>
        </div>
        <QuestionButton />
      </div>
    );
  }
}
export default Dashboard;
