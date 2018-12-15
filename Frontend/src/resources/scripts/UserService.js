export class User {
  static getName() {
    if (window.sessionStorage.getItem("user")) {
      let user = JSON.parse(window.sessionStorage.getItem("user"));
      return user.Vardas;
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
