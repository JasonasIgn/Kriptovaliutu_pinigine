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
    this.state = {};
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
            <div className="card text-white bg-primary mb-3">
              <div className="card-header">
                Bitcoin
                <div className="actions-container">
                  <img src={InfoIcon} />
                  <img src={TransferIcon} />
                </div>
              </div>
              <div className="card-body">
                <h4 className="card-title">0.0001512 BTC</h4>
              </div>
            </div>
            <div className="card text-white bg-primary mb-3">
              <div className="card-header">
                Bitcoin
                <div className="actions-container">
                  <img src={InfoIcon} />
                  <img src={TransferIcon} />
                </div>
              </div>
              <div className="card-body">
                <h4 className="card-title">0.0001512 BTC</h4>
              </div>
            </div>
            <div className="card text-white bg-primary mb-3">
              <div className="card-header">
                Bitcoin
                <div className="actions-container">
                  <img src={InfoIcon} />
                  <img src={TransferIcon} />
                </div>
              </div>
              <div className="card-body">
                <h4 className="card-title">0.0001512 BTC</h4>
              </div>
            </div>
            <div className="card text-white bg-primary mb-3">
              <div className="card-header">
                Bitcoin
                <div className="actions-container">
                  <img src={InfoIcon} />
                  <img src={TransferIcon} />
                </div>
              </div>
              <div className="card-body">
                <h4 className="card-title">0.0001512 BTC</h4>
              </div>
            </div>
          </div>
        </div>
        <QuestionButton />
      </div>
    );
  }
}
export default Dashboard;
