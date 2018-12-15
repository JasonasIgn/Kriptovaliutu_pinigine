export class User {
  static getName() {
    if (window.sessionStorage.getItem("user")) {
      let user = JSON.parse(window.sessionStorage.getItem("user"));
      return user.Vardas;
    } else return null;
  }
}
