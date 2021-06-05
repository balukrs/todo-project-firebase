import React, { useState, useContext } from "react";
import Sidebar from "../sidebar/sidebar";
import Sidepanel from "../sidepanel/sidepanel";
import styles from "./mainlayout.module.scss";

import { LoginContext } from "../../../context";

const Mainlayout = () => {
  const logindetails = useContext(LoginContext);
  const { uid, photoURL, email } = logindetails;
  const [nav, setNav] = useState("INBOX");
  const [animate, setAnimate] = useState(null);

  return (
    <div className={styles.main__container}>
      <div className={styles.layout__cointainer}>
        <Sidebar
          toggle={setNav}
          id={uid}
          pic={photoURL}
          email={email}
          animate={animate}
        />
        <Sidepanel
          id={uid}
          nav={nav}
          animate={animate}
          setanimate={setAnimate}
        />
      </div>
    </div>
  );
};

export default Mainlayout;
