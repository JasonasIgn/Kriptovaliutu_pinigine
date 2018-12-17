import React from "react";
import request from "superagent";
class SystemInfo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      info: null
    };
  }
  getInformation() {
    request
      .get("http://localhost/api/sistemos_informacija/get.php")
      .then(res => {
        console.log(res.body.data);
        this.setState({ info: res.body.data });
      });
  }

  componentDidMount() {
    this.getInformation();
  }

  render() {
    if (!this.state.info) return <div />;
    return (
      <div className="cryptocurrency">
        <div className="container">
          <h1 className="title">Sistemos informacija</h1>

          <table className="table table-hover">
            <tbody>
              <tr>
                <th>Vartotoju skaicius</th>
                <td>{this.state.info.Vartotoju_kiekis}</td>
              </tr>
              <tr>
                <th>Transakciju skaicius</th>
                <td>{this.state.info.Transakciju_kiekis}</td>
              </tr>
            </tbody>
          </table>
          <div className="form-group">
            <label className="col-form-label" htmlFor="on">
              Sistema ijungta
            </label>
            <select
              className="form-control"
              id="on"
              defaultValue={this.state.info.Isjungta}
            >
              <option value="0"> Taip</option>
              <option value="1"> Ne</option>
            </select>
            <span className="error on" />
          </div>
          <div className="form-group">
            <label className="col-form-label" htmlFor="message">
              Sistemos pranesimas
            </label>
            <input
              type="text"
              className="form-control"
              id="message"
              defaultValue={this.state.info.Pranesimas}
            />
            <span className="error message" />
          </div>
        </div>
      </div>
    );
  }
}
export default SystemInfo;
