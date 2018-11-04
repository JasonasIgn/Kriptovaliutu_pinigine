import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Index from "./Components/Pages/Index";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <Router>
        <Route path="/" exact component={Index} />
        {/* <Route path="/kelias" component={componentas} /> */}
      </Router>
    );
  }
}

export default App;
