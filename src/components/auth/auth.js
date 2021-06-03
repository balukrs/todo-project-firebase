import React, { useState, useEffect } from "react";
import styles from "./auth.module.scss";
import { SiTodoist } from "react-icons/si";
import { FcGoogle } from "react-icons/fc";
import { MdArrowDropDown } from "react-icons/md";
import { MdArrowDropUp } from "react-icons/md";

import { signInWithGoogle } from "../../firebase";
import { auth } from "../../firebase";

import Registeruser from "./register";
import Loginuser from "./login";

const Auth = ({ setdetails }) => {
  const [err, setErr] = useState(null);
  const [logswitch, setLogswitch] = useState(false);
  const [regswitch, setRegswitch] = useState(false);

  const loginUser = () => {
    signInWithGoogle()
      .then((result) => {})
      .catch((error) => {
        if (error) {
          const { message } = error;
          setErr(message);
        }
      });
  };

  const registerUser = (email, password) => {
    auth
      .createUserWithEmailAndPassword(email, password)
      .then((userCredential) => {})
      .catch((error) => {
        if (error) {
          const { message } = error;
          setErr(message);
        }
      });
  };

  const loginValidation = (email, password) => {
    auth
      .signInWithEmailAndPassword(email, password)
      .then((userCredential) => {})
      .catch((error) => {
        if (error) {
          const { message } = error;
          setErr(message);
        }
      });
  };

  useEffect(() => {
    auth.onAuthStateChanged(function (user) {
      if (user) {
        setdetails(user);
      } else {
        setdetails(user);
      }
    });
    // eslint-disable-next-line
  }, []);

  return (
    <div className={styles.firebase__auth}>
      <div className={styles.auth__container}>
        <div className={styles.auth_logo_cont}>
          <SiTodoist color="#e83a0e" size="2em" />
          <h2>To Do App</h2>
        </div>
        <div className={styles.google_auth_btn} onClick={() => loginUser()}>
          <button className={styles.google___btn}>
            <FcGoogle size="1.7em" />
            <span>Google Log In</span>
          </button>
        </div>
        <div className={styles.login_auth_btn}>
          <button
            className={styles.login___btn}
            onClick={() => setLogswitch(!logswitch)}
          >
            Login with Email ID
            {logswitch ? (
              <MdArrowDropUp size="1.5em" />
            ) : (
              <MdArrowDropDown size="1.5em" />
            )}
          </button>
          <Loginuser log={loginValidation} stats={logswitch} />
        </div>
        <div className={styles.register_auth_btn}>
          <button
            className={styles.register___btn}
            onClick={() => setRegswitch(!regswitch)}
          >
            Sign Up
            {regswitch ? (
              <MdArrowDropUp size="1.5em" />
            ) : (
              <MdArrowDropDown size="1.5em" />
            )}
          </button>
          <Registeruser reg={registerUser} stats={regswitch} />
        </div>
        <span className={styles.login__error}>{err}</span>
      </div>
    </div>
  );
};

export default Auth;
