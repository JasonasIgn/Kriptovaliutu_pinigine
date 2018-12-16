import React from "react";
import request from "superagent";
import { User } from "../../resources/scripts/UserService";

class EditAccount extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      account: null
    };
  }

  componentDidMount() {
    const urlParams = new URLSearchParams(window.location.search);
    request
      .get(
        `http://localhost/api/paskyra/getById.php?${Number(
          urlParams.get("id")
        )}`
      )
      .set("Content-Type", "application/json")
      .then(res => {
        this.setState({ account: res.body.user });
      })
      .catch(err => {
        console.dir(err);
      });
  }

  handleRegistration() {
    const firstNameSelector = "firstName";
    const lastNameSelector = "lastName";
    const addressSelector = "address";
    const phoneSelector = "phone";
    const genderSelector = "gender";
    const birthdaySelector = "birthday";

    const responseField = document.querySelector(".response");
    responseField.innerHTML = "";

    const firstNameField = document.getElementById(firstNameSelector);
    const lastNameField = document.getElementById(lastNameSelector);
    const addressField = document.getElementById(addressSelector);
    const phoneField = document.getElementById(phoneSelector);
    const genderField = document.getElementById(genderSelector);
    const birthdayField = document.getElementById(birthdaySelector);

    const urlParams = new URLSearchParams(window.location.search);

    request
      .post("http://localhost/api/paskyra/update.php")
      .send({
        Id: Number(urlParams.get("id")),
        Vardas: firstNameField.value,
        Pavarde: lastNameField.value,
        Adresas: addressField.value,
        Tel_numeris: phoneField.value,
        Gimimo_data: birthdayField.value,
        Lytis: genderField.value
      })
      .set("Content-Type", "application/json")
      .then(res => {
        responseField.innerHTML = res.body.message;
      })
      .catch(err => {
        console.dir(err);
      });
  }

  render() {
    if (!this.state.account) return null;
    return (
      <div className="register">
        <div className="container">
          <form>
            <h1 className="title" style={{ minWidth: 500 }}>
              Redaguoti paskyrą
            </h1>
            <div className="form-group">
              <label className="col-form-label" htmlFor="firstName">
                Vardas
              </label>
              <input
                type="text"
                className="form-control"
                id="firstName"
                defaultValue={this.state.account.Vardas}
              />
              <span className="error firstName" />
            </div>
            <div className="form-group">
              <label className="col-form-label" htmlFor="lastName">
                Pavardė
              </label>
              <input
                type="text"
                className="form-control"
                id="lastName"
                defaultValue={this.state.account.Pavarde}
              />
              <span className="error lastName" />
            </div>
            <div className="form-group">
              <label className="col-form-label" htmlFor="email">
                El. paštas
              </label>
              <input
                type="email"
                className="form-control"
                id="email"
                defaultValue={this.state.account.El_pastas}
                disabled
              />
              <span className="error email" />
            </div>
            <div className="form-group">
              <label className="col-form-label" htmlFor="address">
                Adresas
              </label>
              <input
                type="text"
                className="form-control"
                id="address"
                defaultValue={this.state.account.Adresas}
              />
              <span className="error address" />
            </div>
            <div className="form-group">
              <label className="col-form-label" htmlFor="phone">
                Tel. numeris
              </label>
              <input
                type="text"
                className="form-control"
                id="phone"
                defaultValue={this.state.account.Tel_numeris}
              />
              <span className="error phone" />
            </div>
            <div className="form-group">
              <label className="col-form-label" htmlFor="birthday">
                Gimimo data
              </label>
              <input
                type="date"
                className="form-control"
                id="birthday"
                defaultValue={this.state.account.Gimimo_data}
              />
              <span className="error birthday" />
            </div>
            <div className="form-group">
              <label className="col-form-label" htmlFor="gender">
                Lytis
              </label>
              <select
                className="form-control"
                id="gender"
                defaultValue={this.state.account.Lytis}
              >
                <option value=""> Pasirinkite</option>
                <option value="0"> Vyras</option>
                <option value="1"> Moteris</option>
              </select>
              <span className="error gender" />
            </div>
            <div className="response" />
            <button
              type="button"
              onClick={this.handleRegistration}
              className="btn btn-primary"
            >
              Keisti duomenis
            </button>
          </form>
        </div>
      </div>
    );
  }
}
export default EditAccount;
