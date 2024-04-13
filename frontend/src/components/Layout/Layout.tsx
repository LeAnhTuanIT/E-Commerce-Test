import React from "react";

import Navbar from "../NavBar/Navbar";
import Router from "../../Router/Router";
import Footer from "../Footer/Footer";

const Layout = () => {
  return (
    <>
      <Navbar />
      <Router />
      <Footer />
    </>
  );
};

export default Layout;
