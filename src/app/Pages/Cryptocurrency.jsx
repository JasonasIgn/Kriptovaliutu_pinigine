import React from "react";
import InfoIcon from "../../resources/images/icon-info.png";
import request from "superagent";
class Cryptocurrency extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      information: null,
      cryptocurrencies: [],
      start: 0,
      limit: 20
    };
  }
  getInformation() {
    let cryptoArray = [];
    request
      .get("https://api.coinlore.com/api/tickers/")
      .query({ start: this.state.start })
      .query({ limit: this.state.limit })
      .then(res => {
        this.setState({ information: res.body });
        res.body.data.forEach((item, index) => {
          let cryptoItem = (
            <tr key={index}>
              <th scope="row">{item.rank}</th>
              <td>{item.name}</td>
              <td>{item.price_usd || "-"} $</td>
              <td className="flex-row">
                {item.market_cap_usd || "-"} $
                <a href={`/cryptocurrency?id=${item.id}`}>
                  <img src={InfoIcon} />
                </a>
              </td>
            </tr>
          );
          cryptoArray = [...cryptoArray, cryptoItem];
        });
        this.setState({ cryptocurrencies: cryptoArray });
      });
  }
  handleNextPage() {
    if (
      Number(this.state.start) + this.state.limit * 2 >
      this.state.information.info.coins_num
    ) {
      this.setState(
        {
          start:
            Number(this.state.information.info.coins_num) -
            Number(this.state.limit)
        },
        () => this.getInformation()
      );
    } else {
      this.setState(
        {
          start: Number(this.state.start) + Number(this.state.limit)
        },
        () => this.getInformation()
      );
    }
  }
  handlePreviousPage() {
    if (Number(this.state.start) - this.state.limit < 0) {
      this.setState({ start: 0 }, () => this.getInformation());
    } else {
      this.setState(
        {
          start: Number(this.state.start) - this.state.limit
        },
        () => this.getInformation()
      );
    }
  }
  componentWillMount() {
    const urlParams = new URLSearchParams(window.location.search);
    const start = Number(urlParams.get("start"));
    const limit = Number(urlParams.get("limit"));
    this.setState({ start: start || 0, limit: limit || 20 }, () =>
      this.getInformation()
    );
  }

  render() {
    if (!this.state.information) return <div />;
    return (
      <div className="cryptocurrency-list">
        <div className="container">
          <h1 className="title">Kriptovaliutos</h1>
          <table className="table table-hover">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Pavadinimas</th>
                <th scope="col">Kaina</th>
                <th scope="col">Rinkos riba</th>
              </tr>
            </thead>
            <tbody>{this.state.cryptocurrencies}</tbody>
          </table>
          <div className="navigation-container">
            <button
              type="button"
              className="btn btn-primary"
              onClick={() => this.handlePreviousPage()}
            >
              {"<"}
            </button>
            {`${
              this.state.start % 10 == 0
                ? this.state.start + 1
                : this.state.start
            } - ${Number(this.state.start) + this.state.limit} iš ${
              this.state.information.info.coins_num
            }`}
            <button
              type="button"
              className="btn btn-primary"
              onClick={() => this.handleNextPage()}
            >
              {">"}
            </button>
          </div>
        </div>
      </div>
    );
  }
}
export default Cryptocurrency;
