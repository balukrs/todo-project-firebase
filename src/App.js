import React, { useState, useEffect } from "react";

import Mainlayout from "./components/layout/mainlayout/mainlayout";
import Auth from "./components/auth/auth";
import "./style/css/variable.css";
import Switch from "@material-ui/core/Switch";

import { LoginContext } from "./context";
const App = () => {
  const [logindetails, setLogindetails] = useState(null);
  const [Theme, setTheme] = useState("Default");

  useEffect(() => {
    const root = document.documentElement;
    switch (Theme) {
      case "Dark":
        root?.style.setProperty("--color-primary", "38, 40, 51");
        root?.style.setProperty("--color-secondary", "43, 43, 43");
        root?.style.setProperty("--color-tertiary", "89, 89, 89");
        root?.style.setProperty("--color-light", "217, 217, 217");
        root?.style.setProperty("--color-dark", "13, 13, 13");
        root?.style.setProperty("--color-extra", "173, 173, 173");
        break;

      case "Default":
        root?.style.setProperty("--color-primary", "61, 63, 128");
        root?.style.setProperty("--color-secondary", "38, 46, 97");
        root?.style.setProperty("--color-tertiary", "152, 175, 219");
        root?.style.setProperty("--color-light", "208, 220, 243");
        root?.style.setProperty("--color-dark", "0, 13, 37");
        root?.style.setProperty("--color-extra", "231, 230, 255");
        break;

      default:
        return null;
    }
  }, [Theme]);

  const handleChange = () => {
    Theme === "Default" ? setTheme("Dark") : setTheme("Default");
  };

  return (
    <div className="App">
      <div style={{ position: "absolute", right: "25px", top: "25px" }}>
        <h4 style={{ margin: "0", color: "Lavender" }}>{`${Theme} Mode`}</h4>
        <Switch onChange={handleChange} />
      </div>
      {logindetails ? (
        <LoginContext.Provider value={logindetails}>
          <Mainlayout />
        </LoginContext.Provider>
      ) : (
        <Auth setdetails={setLogindetails} />
      )}
    </div>
  );
};

export default App;
