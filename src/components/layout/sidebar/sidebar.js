import React, { useState } from "react";

import Modalproject from "../addproject/modalproject";
import styles from "./sidebar.module.scss";

import { RiInboxArchiveFill } from "react-icons/ri";
import { IoToday } from "react-icons/io5";
import { IoCalendar } from "react-icons/io5";
import { BiChevronDown } from "react-icons/bi";
import { SiTodoist } from "react-icons/si";
import Avatar from "@material-ui/core/Avatar";
import { RiLogoutBoxRLine } from "react-icons/ri";
import { IoMdAddCircle } from "react-icons/io";

import { auth } from "../../../firebase";

import { useProject } from "../../../hooks";
import { useProjdel } from "../../../hooks";

const Sidebar = ({ toggle, id, pic, email }) => {
  const [modal, setModal] = useState(false);
  const projects = useProject(id);
  const [del, setDel] = useProjdel(id);

  const handleClick = (val) => {
    toggle(val);
  };

  const delProjects = (project) => {
    setDel(project);
  };

  const projectDetails = () => {
    if (!projects) {
      return null;
    }
    return projects.map((project, index) => (
      <li key={index} onClick={() => handleClick(project.projectid)}>
        <span>{project.projectid}</span>
        <span
          className={styles.project__close}
          onClick={() => {
            delProjects(project.projectid);
          }}
        >
          x
        </span>
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
          <div className={styles.nav__heading}>
            <span>
              <h3>ToDoApp</h3>
            </span>
          </div>
        </nav>
        <nav>
          <div className={styles.avatar}>
            <Avatar
              alt="T"
              src={pic}
              style={{
                width: "40px",
                boxShadow: "0.5px 1px 2px 0px rgba(0,0,0,0.75)",
              }}
            />
          </div>
          <div>
            <h4>{email.split("@")[0]}</h4>
          </div>
          <div className={styles.nav__logout}>
            <button onClick={() => auth.signOut()}>
              <RiLogoutBoxRLine size="1.4em" />
            </button>
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
          <h2>PROJECTS</h2>
        </span>
        <div className={styles.sidebar__middle_btncont}>
          <button onClick={(e) => setModal(!modal)}>
            <span>Add Project</span> <IoMdAddCircle size="1.2em" />
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
