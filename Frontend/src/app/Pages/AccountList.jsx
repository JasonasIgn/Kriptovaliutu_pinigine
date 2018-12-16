import React from "react";
import EditIcon from "../../resources/images/icon-edit.png";
import request from "superagent";
import { User } from "../../resources/scripts/UserService";
class AccountList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      information: null,
      accounts: []
    };
  }
  getInformation() {
    let array = [];
    request.get(`http://localhost/api/paskyra/getAll.php`).then(res => {
      console.log(res);
      res.body.forEach((item, index) => {
        let optItem = (
          <tr key={index}>
            <th scope="row">{item.Id}</th>
            <th scope="row">{item.Vardas}</th>
            <th scope="row">{item.Pavarde}</th>
            <th scope="row">{item.El_pastas}</th>
            <th scope="row">
              <img
                src={EditIcon}
                style={{ width: 20, height: 20 }}
                onClick={() =>
                  (window.location.href = `/edit-account?id=${item.Id}`)
                }
              />
            </th>
          </tr>
        );
        array = [...array, optItem];
      });
      this.setState({ accounts: array });
    });
  }
  componentDidMount() {
    this.getInformation();
  }

  render() {
    return (
      <div className="cryptocurrency-list">
        <div className="container" style={{ justifyContent: "flex-start" }}>
          <h1 className="title">Paskyrų sąrašas</h1>
          <table className="table table-hover">
            <thead>
              <tr>
                <th scope="row">Id</th>
                <th scope="row">Vardas</th>
                <th scope="row">Pavardė</th>
                <th scope="row">El. paštas</th>
                <th scope="row" />
              </tr>
            </thead>
            <tbody>{this.state.accounts}</tbody>
          </table>
        </div>
      </div>
    );
  }
}
export default AccountList;
