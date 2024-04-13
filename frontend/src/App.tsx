import React, { useEffect } from "react";
import AOS from "aos";

import Layout from "./components/Layout/Layout";

const App = () => {
  useEffect(() => {
    AOS.init({
      offset: 100,
      duration: 800,
      easing: "ease-in-out-sine",
      delay: 100,
    });
    AOS.refresh();
  }, []);

  return (
    <div>
      <Layout />
    </div>
  );
};

export default App;
