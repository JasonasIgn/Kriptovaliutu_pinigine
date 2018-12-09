import React from "react";
import Header from "../Components/Header";

const Layout = ({ children, user }) => (
  <div className="main">
    <Header user={user} />
    {children}
  </div>
);
export default Layout;
