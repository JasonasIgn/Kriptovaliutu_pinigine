export class User {
  static getName() {
    if (window.sessionStorage.getItem("user")) {
      let user = JSON.parse(window.sessionStorage.getItem("user"));
      return user.Vardas;
    } else return null;
  }

  static getSurname() {
    if (window.sessionStorage.getItem("user")) {
      let user = JSON.parse(window.sessionStorage.getItem("user"));
      return user.Pavarde;
    } else return null;
  }

  static getEmail() {
    if (window.sessionStorage.getItem("user")) {
      let user = JSON.parse(window.sessionStorage.getItem("user"));
      return user.El_pastas;
    } else return null;
  }

  static getGender() {
    if (window.sessionStorage.getItem("user")) {
      let user = JSON.parse(window.sessionStorage.getItem("user"));
      return user.Lytis;
    } else return null;
  }

  static getAddress() {
    if (window.sessionStorage.getItem("user")) {
      let user = JSON.parse(window.sessionStorage.getItem("user"));
      return user.Adresas;
    } else return null;
  }

  static getPhone() {
    if (window.sessionStorage.getItem("user")) {
      let user = JSON.parse(window.sessionStorage.getItem("user"));
      return user.Tel_numeris;
    } else return null;
  }

  static getBirthday() {
    if (window.sessionStorage.getItem("user")) {
      let user = JSON.parse(window.sessionStorage.getItem("user"));
      return user.Gimimo_data;
    } else return null;
  }

  static getId() {
    if (window.sessionStorage.getItem("user")) {
      let user = JSON.parse(window.sessionStorage.getItem("user"));
      return user.Id;
    } else return null;
  }

  static logout() {
    window.location.href = "/";
    window.sessionStorage.removeItem("user");
    window.sessionStorage.removeItem("wallet");
    window.sessionStorage.removeItem("token");
  }

  static isLoggedIn() {
    return window.sessionStorage.getItem("user");
  }
}
