import React, { useState, useEffect } from "react";
import { signInWithGoogle } from "../../firebase";
import { auth } from "../../firebase";

import Registeruser from "./register";

const Auth = () => {
  const [currentUser, setCurrentuser] = useState(null);

  const loginUser = () => {
    signInWithGoogle()
      .then((result) => {})
      .catch((error) => {});
  };

  const logoutUser = () => {
    auth
      .signOut()
      .then(() => {})
      .catch((error) => {});
  };

  useEffect(() => {
    auth.onAuthStateChanged(function (user) {
      if (user) {
        setCurrentuser(user);
      } else {
        setCurrentuser(user);
      }
    });
  }, []);

  return (
    <div className="firebase_auth">
      <button onClick={() => logoutUser()}>SignOut</button>
      <div className="google_auth_btn">
        <button onClick={() => loginUser()}>Signin</button>
      </div>
      <div className="register_auth_btn">
        <Registeruser />
      </div>
    </div>
  );
};

export default Auth;
