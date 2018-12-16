import React from "react";
import InfoIcon from "../../resources/images/icon-info.png";
import request from "superagent";
class Exchange extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      information: null
    };
  }
  getInformation() {
    request
      .get("https://api.coinlore.com/api/tickers/")
      .query({ start: 0 })
      .query({ limit: 30 })
      .then(res => {
        this.setState({ information: res.body });
      });
  }
  componentDidMount() {
    this.getInformation();
  }

  render() {
    if (!this.state.information) return <div />;
    return (
      <div className="exchange">
        <div className="container">
          <h1 className="title">Keitykla</h1>
        </div>
      </div>
    );
  }
}
export default Exchange;
