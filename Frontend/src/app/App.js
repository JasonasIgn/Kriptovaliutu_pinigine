import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Index from "./Pages/Index";
import Layout from "./Components/Layout";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import Dashboard from "./Components/Dashboard";
import CryptocurrencyList from "./Pages/CryptocurrencyList";
import Cryptocurrency from "./Pages/Cryptocurrency";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: 1
    };
  }

  render() {
    return (
      <Router>
        <Layout user={this.state.user}>
          <Route
            exact
            path="/"
            render={() =>
              this.state.user ? <Dashboard user={this.state.user} /> : <Index />
            }
          />
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
          <Route path="/cryptocurrency" component={Cryptocurrency} />
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
