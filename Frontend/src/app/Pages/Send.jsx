import React from "react";
import request from "superagent";
import { Wallet } from "../../resources/scripts/WalletService";
import { User } from "../../resources/scripts/UserService";

class Send extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      crypto: null,
      userCrypto: null
    };
  }

  componentDidMount() {
    if (!this.props.sendId) window.location.href = "/";
    request
      .get("https://api.coinlore.com/api/ticker/")
      .query({ id: this.props.sendId })
      .then(res => {
        this.setState({ crypto: res.body[0] });
      });

    request
      .post(`http://localhost/api/pinigine_kriptovaliuta/getByTwoIds.php`)
      .send({
        walletId: Wallet.getId(),
        cryptoId: this.props.sendId
      })
      .set("Content-Type", "application/json")
      .then(res => {
        this.setState({ userCrypto: res.body.data });
      });
  }

  handleSend() {
    document.querySelectorAll(".error").forEach(item => {
      item.innerHTML = "";
    });
    let valid = true;
    const addressSelector = "address";
    const valueSelector = "value";

    const responseField = document.querySelector(".response");
    responseField.innerHTML = "";

    const addressField = document.getElementById(addressSelector);
    const valueField = document.getElementById(valueSelector);

    const addressErrorField = document.querySelector(`.${addressSelector}`);
    const valueErrorField = document.querySelector(`.${valueSelector}`);

    if (!addressField.value) {
      addressErrorField.innerHTML = "Laukas privalomas";
      valid = false;
    }

    if (!valueField.value) {
      valueErrorField.innerHTML = "Laukas privalomas";
      valid = false;
    } else if (isNaN(valueField.value)) {
      valueErrorField.innerHTML = "Turi būti skaičius";
      valid = false;
    } else if (valueField.value <= 0) {
      valueErrorField.innerHTML = "Turi būti didesnis už 0";
      valid = false;
    }

    if (valid) {
      request
        .post("http://localhost/api/pinigine_kriptovaliuta/send.php")
        .send({
          sendValue: valueField.value,
          sendId: this.props.sendId,
          receiverAddress: addressField.value,
          ownerWalletId: Wallet.getId()
        })
        .set("Content-Type", "application/json")
        .then(res => {
          responseField.innerHTML = res.body.message;
          request
            .post(`http://localhost/api/pinigine_kriptovaliuta/getByTwoIds.php`)
            .send({
              walletId: Wallet.getId(),
              cryptoId: this.props.sendId
            })
            .set("Content-Type", "application/json")
            .then(res => {
              this.setState({ userCrypto: res.body.data });
            });
        })
        .catch(err => {
          console.dir(err);
        });
    }
  }

  render() {
    if (!this.state.crypto) return <div />;
    return (
      <div className="send">
        <div className="container">
          <h4 style={{ textAlign: "center", marginTop: 20 }}> Siuntimas </h4>
          <div className="send-container">
            <div className="crypto-info">
              <div className="upper">
                <img
                  src={`https://c1.coinlore.com/img/25x25/${
                    this.state.crypto.nameid
                  }.png`}
                  style={{
                    width: 80,
                    height: 80,
                    marginRight: 7,
                    marginBottom: 20
                  }}
                />
                {this.state.crypto.name}
              </div>
              <div className="lower">
                Balansas: <br />
                <b>{`${this.state.userCrypto.Balansas} ${
                  this.state.crypto.symbol
                }`}</b>
              </div>
            </div>

            <form>
              <div className="form-group">
                <label className="col-form-label" htmlFor="address">
                  Gavėjo adresas:
                </label>
                <input type="address" className="form-control" id="address" />
                <span className="error address" />
              </div>
              <div className="form-group">
                <label className="col-form-label" htmlFor="value">
                  Siunčiama suma:
                </label>
                <input type="value" className="form-control" id="value" />
                <span className="error value" />
              </div>
              <div className="response" />
            </form>
          </div>
          <button
            type="button"
            onClick={() => this.handleSend()}
            className="btn btn-primary"
          >
            Siųsti
          </button>
        </div>
      </div>
    );
  }
}
export default Send;
