import React, { useContext, useState } from "react";

import Mainlayout from "./components/layout/mainlayout/mainlayout";
import Auth from "./components/auth/auth";

import { LoginContext } from "./context";
const App = () => {
  const [logindetails, setLogindetails] = useState(null);

  return (
    <div className="App">
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
