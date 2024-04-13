import React, { useState , useEffect} from "react";

import LightButton from "../../assets/website/light-mode-button.png";
import DarkButton from "../../assets/website/dark-mode-button.png";

const Darkmode = () => {

  // switch mode
  const [theme, setTheme] = useState(localStorage.getItem("theme") ? localStorage.getItem("theme") : "light");

  const element = document.documentElement;

  useEffect(() => {
    if (theme === "dark") {
      element.classList.add("dark");
      localStorage.setItem("theme", "dark");
    }
    else {
      element.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [theme])

  return (
    <div className="relative">
      <img
        src={LightButton}
        alt=""
        onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
        className= {`w-12 h-6 cursor-pointer drop-shadow-[1px_1px_1px_rgba(0,0,0,0.1)] transition-all duration-300 absolute right-0 z-10 ${theme === "dark" ? "opacity-0" : "opacity-100"}`} 
      />
      
      <img
        src={DarkButton}
        alt=""
        onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
        className="w-12 h-6 cursor-pointer drop-shadow-[1px_1px_1px_rgba(0,0,0,0.1)] transition-all duration-300"
      />
    </div>
  );
};

export default Darkmode;
