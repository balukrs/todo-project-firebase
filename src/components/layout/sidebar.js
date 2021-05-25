import React, { useContext } from "react";
import { RiInboxArchiveFill } from "react-icons/ri";
import { IoToday } from "react-icons/io5";
import { IoCalendar } from "react-icons/io5";
import { BiChevronDown } from "react-icons/bi";
import { SiTodoist } from "react-icons/si";

import { LoginContext } from "../../context";
import { useTask } from "../../hooks";

import { auth } from "../../firebase";

const Sidebar = () => {
  const check = useTask();
  const userdetails = useContext(LoginContext);

  console.log(check);
  console.log(userdetails);

  return (
    <div className="sidebar" data-testid="sidebar">
      <button onClick={() => auth.signOut()}>SignOut</button>
      <header className="sidebar__header">
        <nav>
          <div className="logo">
            <SiTodoist size="1.5em" />
          </div>
          <div className="user__details">
            <ul>
              <li>+</li>
              <li>+</li>
            </ul>
          </div>
        </nav>
      </header>
      <ul className="sidebar__generic">
        <li>
          <span>
            <RiInboxArchiveFill />
          </span>
          <span>Inbox</span>
        </li>
        <li>
          <span>
            <IoToday />
          </span>
          <span>Today</span>
        </li>
        <li>
          <span>
            <IoCalendar />
          </span>
          <span>Next 7 days</span>
        </li>
      </ul>

      <div className="sidebar__middle">
        <span>
          <BiChevronDown />
        </span>
        <h2>Projects</h2>
        <ul className="sidebar__projects">Projects will be here..!</ul>
      </div>
    </div>
  );
};

export default Sidebar;
