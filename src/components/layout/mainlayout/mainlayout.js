import React, { useState, useContext } from "react";
import Sidebar from "../sidebar/sidebar";
import Sidepanel from "../sidepanel/sidepanel";
import styles from "./mainlayout.module.scss";

import { LoginContext } from "../../../context";

const Mainlayout = () => {
  const logindetails = useContext(LoginContext);
  const { uid } = logindetails;
  const [nav, setNav] = useState("INBOX");

  return (
    <div className={styles.main__container}>
      <div className={styles.layout__cointainer}>
        <Sidebar toggle={setNav} id={uid} />
        <Sidepanel id={uid} nav={nav} />
      </div>
    </div>
  );
};

export default Mainlayout;
