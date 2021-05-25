import React, { useContext, useState } from "react";

import Sidebar from "./components/layout/sidebar";
import Auth from "./components/auth/auth";

import { LoginContext } from "./context";
const App = () => {
  const [logindetails, setLogindetails] = useState(null);

  return (
    <div className="App">
      {logindetails ? (
        <LoginContext.Provider value={logindetails}>
          <Sidebar />
        </LoginContext.Provider>
      ) : (
        <Auth setdetails={setLogindetails} />
      )}
    </div>
  );
};

export default App;
