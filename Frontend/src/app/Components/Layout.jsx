import React from "react";
import Header from "../Components/Header";

const Layout = ({ children }) => (
  <div className="main">
    <Header />
    {children}
  </div>
);
export default Layout;
