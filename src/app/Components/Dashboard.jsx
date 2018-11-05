import React from "react";
import TransferIcon from "../../resources/images/icon-transfer.png";
import InfoIcon from "../../resources/images/icon-info.png";

const Dashboard = () => (
  <div className="dashboard">
    <div className="container">
      <div className="real-money">
        <div className="money-container">
          <h2 className="money">10.58</h2>
          <h4 className="currency">EUR</h4>
        </div>
        <div className="actions-container">
          <button type="button" className="btn btn-secondary">
            Papildyti
          </button>
          <button type="button" className="btn btn-secondary">
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
  </div>
);
export default Dashboard;
