import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Index from "./Pages/Index";
import Layout from "./Components/Layout";
import Header from "./Components/Header";

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
          {/* <Route path="/kelias" component={componentas} /> */}
        </Layout>
      </Router>
    );
  }
}

export default App;
