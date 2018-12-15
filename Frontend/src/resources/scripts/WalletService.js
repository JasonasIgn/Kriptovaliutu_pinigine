export class Wallet {
  static getBalanceEUR() {
    if (window.sessionStorage.getItem("wallet")) {
      let user = JSON.parse(window.sessionStorage.getItem("user"));
      return user.Vardas;
    } else return null;
  }
}
