import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Index from "./Pages/Index";
import Layout from "./Components/Layout";
import Login from "./Pages/Login";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <Router>
        <Layout>
          <Route path="/" exact component={Index} />
          <Route path="/login" component={Login} />
        </Layout>
      </Router>
    );
  }
}

export default App;
