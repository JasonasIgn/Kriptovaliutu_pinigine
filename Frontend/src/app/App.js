import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Index from "./Pages/Index";
import Layout from "./Components/Layout";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import Dashboard from "./Components/Dashboard";
import CryptocurrencyList from "./Pages/CryptocurrencyList";
import Cryptocurrency from "./Pages/Cryptocurrency";
import MailList from "./Pages/MailList";
import Deposit from "./Pages/Deposit";
import Credit from "./Pages/Credit";
import { User } from "../resources/scripts/UserService";
import Bank from "./Pages/Bank";
import Withdraw from "./Pages/Withdraw";
import Exchange from "./Pages/Exchange";
import Send from "./Pages/Send";
import Profile from "./Pages/Profile";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: window.sessionStorage.getItem("user") || null,
      token: window.sessionStorage.getItem("token") || null,
      sendCryptoId: null
    };
    this.setSendId = id => {
      this.setState({ sendCryptoId: id }, () => {});
    };
  }

  componentDidMount() {}
  render() {
    return (
      <Router>
        <Layout>
          <Route
            exact
            path="/"
            render={() =>
              User.isLoggedIn() ? (
                <Dashboard setSendId={this.setSendId} />
              ) : (
                <Index />
              )
            }
          />
          <Route
            exact
            path="/send"
            render={() => <Send sendId={this.state.sendCryptoId} />}
          />
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
          <Route path="/cryptocurrency" component={Cryptocurrency} />
          <Route path="/deposit" component={Deposit} />
          <Route path="/deposit/credit-card" component={Credit} />
          <Route path="/deposit/bank" component={Bank} />
          <Route path="/withdraw" component={Withdraw} />
          <Route path="/exchange" component={Exchange} />
          <Route path="/mail" component={MailList} />
          <Route path="/profile" component={Profile} />
          <Route
            exact
            path="/cryptocurrency-list"
            component={CryptocurrencyList}
          />
        </Layout>
      </Router>
    );
  }
}

export default App;
