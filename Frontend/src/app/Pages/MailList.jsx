import React from "react";
import InfoIcon from "../../resources/images/icon-info.png";
import request from "superagent";
class MailList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      information: null,
      mails: []
    };
  }
  getInformation() {
    let cryptoArray = [];
    request.get("https://api.coinlore.com/api/tickers/").then(res => {
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
  componentWillMount() {}

  render() {
    return (
      <div className="cryptocurrency-list">
        <div className="container" style={{ justifyContent: "flex-start" }}>
          <h1 className="title">Žinutės</h1>
          <table className="table table-hover">
            <tbody>
              <tr
                onClick={() => {
                  console.log("asd");
                }}
              >
                <th scope="row">Jūs klausėte</th>
                <th scope="row">tekstas</th>
                <th scope="row">Atsakytas?</th>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}
export default MailList;
