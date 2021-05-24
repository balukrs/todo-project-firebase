import React from "react";
import { RiInboxArchiveFill } from "react-icons/ri";
import { IoToday } from "react-icons/io5";
import { IoCalendar } from "react-icons/io5";
import { BiChevronDown } from "react-icons/bi";
import { SiTodoist } from "react-icons/si";

import { useTask } from "../../hooks";

const Sidebar = () => {
  const check = useTask();

  console.log(check);

  return (
    <div className="sidebar" data-testid="sidebar">
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
