import React from "react";
import request from "superagent";
import { User } from "../../resources/scripts/UserService";

class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
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

    request
      .post("http://localhost/api/paskyra/update.php")
      .send({
        Id: User.getId(),
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

        request
          .get(`http://localhost/api/paskyra/getById.php?${User.getId()}`)
          .set("Content-Type", "application/json")
          .then(res => {
            window.sessionStorage.setItem(
              "user",
              JSON.stringify(res.body.user)
            );
          })
          .catch(err => {
            console.dir(err);
          });
      })
      .catch(err => {
        console.dir(err);
      });
  }

  render() {
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
                defaultValue={User.getName()}
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
                defaultValue={User.getSurname()}
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
                defaultValue={User.getEmail()}
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
                defaultValue={User.getAddress()}
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
                defaultValue={User.getPhone()}
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
                defaultValue={User.getBirthday()}
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
                defaultValue={User.getGender()}
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
export default Profile;
