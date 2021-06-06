import React, { useEffect, useState } from "react";

import Modalproject from "../addproject/modalproject";
import styles from "./sidebar.module.scss";

import { RiInboxArchiveFill } from "react-icons/ri";
import { IoToday } from "react-icons/io5";
import { IoCalendar } from "react-icons/io5";
import { SiTodoist } from "react-icons/si";
import { RiLogoutBoxRLine } from "react-icons/ri";
import { IoMdAddCircle } from "react-icons/io";

import Snackbar from "@material-ui/core/Snackbar";
import Avatar from "@material-ui/core/Avatar";

import { auth } from "../../../firebase";

import { useProject } from "../../../hooks";
import { useProjdel } from "../../../hooks";

const Sidebar = ({ toggle, id, pic, email, animate }) => {
  const [modal, setModal] = useState(false);
  const [open, setOpen] = useState(false);
  const projects = useProject(id);
  const [del, setDel] = useProjdel(id);
  const [anime, setAnime] = useState(null);

  useEffect(() => {
    if (animate === "forwards") {
      setAnime(styles.animate);
    } else if (animate === "backwards") {
      setAnime(styles.revanime);
    }
  }, [animate]);

  useEffect(() => {
    if (del === "removed") {
      setOpen(true);
      handleClick("INBOX");
    }
    // eslint-disable-next-line
  }, [del]);

  const handleClick = (val) => {
    toggle(val);
  };
  const handleClose = (val) => {
    setOpen(false);
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
    <div className={`${styles.sidebar} ${anime}`} data-testid="sidebar">
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
      <div>
        <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
          <span>Project deleted successfully....</span>
        </Snackbar>
      </div>
    </div>
  );
};

export default Sidebar;
