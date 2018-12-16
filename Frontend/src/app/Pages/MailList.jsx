import React from "react";
import InfoIcon from "../../resources/images/icon-info.png";
import request from "superagent";
import { User } from "../../resources/scripts/UserService";
class MailList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      information: null,
      questions: []
    };
  }
  getInformation() {
    let array = [];
    request
      .get(`http://localhost/api/klausimas/getById.php?${User.getId()}`)
      .then(res => {
        res.body.klausimai.forEach((item, index) => {
          console.log(item);
          let optItem = (
            <tr key={index}>
              <th scope="row">{index + 1}</th>
              <th scope="row">{item.Klausimas}</th>
              <th scope="row">{item.Atsakytas != 0 ? "jo" : "-"}</th>
            </tr>
          );
          array = [...array, optItem];
        });
        this.setState({ questions: array });
      });
  }
  componentDidMount() {
    this.getInformation();
  }

  render() {
    return (
      <div className="cryptocurrency-list">
        <div className="container" style={{ justifyContent: "flex-start" }}>
          <h1 className="title">Žinutės</h1>
          <table className="table table-hover">
            <thead>
              <tr>
                <th scope="row">#</th>
                <th scope="row">Jūs klausėte</th>
                <th scope="row">Atsakymas</th>
              </tr>
            </thead>
            <tbody>{this.state.questions}</tbody>
          </table>
        </div>
      </div>
    );
  }
}
export default MailList;
