import React, { useState, useEffect } from "react";

import Mainlayout from "./components/layout/mainlayout/mainlayout";
import Auth from "./components/auth/auth";
import "./style/css/variable.css";

import { LoginContext } from "./context";
const App = () => {
  const [logindetails, setLogindetails] = useState(null);
  const [Theme, setTheme] = useState("normal");

  useEffect(() => {
    const root = document.documentElement;
    switch (Theme) {
      case "dark":
        root?.style.setProperty("--color-primary", "38, 40, 51");
        root?.style.setProperty("--color-secondary", "43, 43, 43");
        root?.style.setProperty("--color-tertiary", "89, 89, 89");
        root?.style.setProperty("--color-light", "217, 217, 217");
        root?.style.setProperty("--color-dark", "13, 13, 13");
        break;

      case "normal":
        root?.style.setProperty("--color-primary", "61, 63, 128");
        root?.style.setProperty("--color-secondary", "38, 46, 97");
        root?.style.setProperty("--color-tertiary", "152, 175, 219");
        root?.style.setProperty("--color-light", "208, 220, 243");
        root?.style.setProperty("--color-dark", "0, 13, 37");
        root?.style.setProperty("--color-extra", "51, 48, 105");
        break;
    }
  }, [Theme]);

  return (
    <div className="App">
      {logindetails ? (
        <LoginContext.Provider value={logindetails}>
          <Mainlayout theme={setTheme} />
        </LoginContext.Provider>
      ) : (
        <Auth setdetails={setLogindetails} theme={setTheme} />
      )}
    </div>
  );
};

export default App;
