import React from "react";
import request from "superagent";
class Cryptocurrency extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cryptocurrency: null,
      id: null
    };
  }
  getInformation() {
    request
      .get("https://api.coinlore.com/api/ticker/")
      .query({ id: this.state.id })
      .then(res => {
        this.setState({ cryptocurrency: res.body[0] });
      });
  }
  componentWillMount() {
    const urlParams = new URLSearchParams(window.location.search);
    const id = Number(urlParams.get("id"));
    this.setState({ id: id || null }, () => this.getInformation());
  }

  render() {
    if (!this.state.cryptocurrency) return <div />;
    return (
      <div className="cryptocurrency">
        <div className="container">
          <h1 className="title">
            <img
              src={`https://c1.coinlore.com/img/25x25/${
                this.state.cryptocurrency.nameid
              }.png`}
              style={{ width: 40, height: 40, marginRight: 5 }}
            />
            {this.state.cryptocurrency.name}
          </h1>

          <div style={{ fontSize: 24 }}>Bendra informacija</div>
          <table className="table table-hover">
            <tbody>
              <tr>
                <th>Vieta</th>
                <td>{this.state.cryptocurrency.rank}</td>
              </tr>
              <tr>
                <th>Pavadinimas</th>
                <td>{this.state.cryptocurrency.name}</td>
              </tr>
              <tr>
                <th>Trumpinys</th>
                <td>{this.state.cryptocurrency.symbol}</td>
              </tr>
              <tr>
                <th>Dabartinis kiekis</th>
                <td>
                  {this.state.cryptocurrency.tsupply}{" "}
                  {this.state.cryptocurrency.symbol}
                </td>
              </tr>
              <tr>
                <th>Didžiausias kiekis</th>
                <td>
                  {this.state.cryptocurrency.msupply}{" "}
                  {this.state.cryptocurrency.symbol}
                </td>
              </tr>
            </tbody>
          </table>
          <div style={{ fontSize: 24 }}>Kainos informacija</div>
          <table className="table table-hover">
            <tbody>
              <tr>
                <th>Kaina USD</th>
                <td> {this.state.cryptocurrency.price_usd} $</td>
              </tr>
              <tr>
                <th>Kaina BTC</th>
                <td> {this.state.cryptocurrency.price_btc} BTC</td>
              </tr>
              <tr>
                <th>Kainos keitimasis</th>
                <th />
              </tr>
              <tr>
                <th>Valandos bėgyje</th>
                <th
                  style={{
                    color:
                      this.state.cryptocurrency.percent_change_1h > 0
                        ? "green"
                        : "red"
                  }}
                >
                  {" "}
                  {this.state.cryptocurrency.percent_change_1h} %{" "}
                </th>
              </tr>
              <tr>
                <th>Paros bėgyje</th>
                <th
                  style={{
                    color:
                      this.state.cryptocurrency.percent_change_24h > 0
                        ? "green"
                        : "red"
                  }}
                >
                  {" "}
                  {this.state.cryptocurrency.percent_change_24h} %{" "}
                </th>
              </tr>
              <tr>
                <th>Savaitės bėgyje</th>
                <th
                  style={{
                    color:
                      this.state.cryptocurrency.percent_change_7d > 0
                        ? "green"
                        : "red"
                  }}
                >
                  {" "}
                  {this.state.cryptocurrency.percent_change_7d} %{" "}
                </th>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}
export default Cryptocurrency;
