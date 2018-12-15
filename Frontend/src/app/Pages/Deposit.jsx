import React from "react";
import request from "superagent";
import CreditCard from "../../resources/images/credit.jpg";
import Bank from "../../resources/images/bank.png";

class Deposit extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="deposit">
        <div className="container">
          <h2 className="title"> Pasirinkite būdą:</h2>
          <div className="payment-container">
            <div className="credit-card">
              <img
                src={CreditCard}
                className="credit-img"
                onClick={() => {
                  window.location.href = "/deposit/credit-card";
                }}
              />
              <div className="title-container">
                <h4 className="title"> Kreditine kortele</h4>
              </div>
            </div>
            <div
              className="bank"
              onClick={() => {
                window.location.href = "/deposit/bank";
              }}
            >
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
