import React, { useState } from "react";

import Modalproject from "../addproject/modalproject";
import styles from "./sidebar.module.scss";

import { RiInboxArchiveFill } from "react-icons/ri";
import { IoToday } from "react-icons/io5";
import { IoCalendar } from "react-icons/io5";
import { BiChevronDown } from "react-icons/bi";
import { SiTodoist } from "react-icons/si";
import { MdNotificationsNone } from "react-icons/md";
import { RiLogoutBoxRLine } from "react-icons/ri";
import { IoMdAddCircle } from "react-icons/io";

import { auth } from "../../../firebase";

import { useProject } from "../../../hooks";

const Sidebar = ({ toggle, id }) => {
  const [modal, setModal] = useState(false);
  const projects = useProject(id);

  const handleClick = (val) => {
    toggle(val);
  };

  const projectDetails = () => {
    if (!projects) {
      return null;
    }
    return projects.map((project, index) => (
      <li key={index} onClick={() => handleClick(project.projectid)}>
        {project.projectid}
      </li>
    ));
  };

  return (
    <div className={styles.sidebar} data-testid="sidebar">
      <header className={styles.sidebar__header}>
        <nav>
          <div className={styles.logo}>
            <SiTodoist size="1.5em" />
          </div>
          <div className={styles.nav__details}>
            <span>
              <MdNotificationsNone size="1.5em" />
            </span>
            <span onClick={() => auth.signOut()}>
              <RiLogoutBoxRLine size="1.4em" />
            </span>
          </div>
        </nav>
      </header>
      <ul className={styles.sidebar__generic}>
        <li onClick={() => handleClick("INBOX")}>
          <span>
            <RiInboxArchiveFill />
          </span>
          <span>Inbox</span>
        </li>
        <li onClick={() => handleClick("TODAY")}>
          <span>
            <IoToday />
          </span>
          <span>Today</span>
        </li>
        <li onClick={() => handleClick("NEXT_7")}>
          <span>
            <IoCalendar />
          </span>
          <span>Next 7 days</span>
        </li>
      </ul>

      <div className={styles.sidebar__middle}>
        <span className={styles.sidebar__middle_header}>
          <h2>Projects</h2>
          <BiChevronDown />
        </span>
        <div className={styles.sidebar__middle_btncont}>
          <button onClick={(e) => setModal(!modal)}>
            <span>Add Project</span> <IoMdAddCircle />
          </button>
          <div>
            <Modalproject status={modal} close={setModal} />
          </div>
        </div>
        <ul className={styles.sidebar__projects}>{projectDetails()}</ul>
      </div>

      <div className={styles.sidebar__lower}>
        <div onClick={() => handleClick("COMPLETED")}>Completed</div>
      </div>
    </div>
  );
};

export default Sidebar;
