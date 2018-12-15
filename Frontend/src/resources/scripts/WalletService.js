export class Wallet {
  static getBalanceEUR() {
    if (window.sessionStorage.getItem("wallet")) {
      let wallet = JSON.parse(window.sessionStorage.getItem("wallet"));
      return wallet.Balansas_EUR;
    } else return null;
  }
}
