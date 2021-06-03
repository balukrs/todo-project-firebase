import React, { useState, useRef, useEffect } from "react";

import { useProject } from "../../../hooks";
import { useChange } from "../../../hooks";
import { useDelete } from "../../../hooks";

import Button from "@material-ui/core/Button";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";

import { RiArrowDropRightFill } from "react-icons/ri";
import { CgMenu } from "react-icons/cg";

import styles from "./splitbutton.module.scss";
const useStyles = makeStyles((theme) => ({
  move: {
    padding: 10,
  },
  delete: {
    color: "red",
  },
  mainmenu: {
    "& .MuiPaper-root": {
      backgroundColor: "lightblue",
      padding: 0,
    },
  },
  sub: {
    padding: "3px 15px",
  },
}));

const SplitButton = ({ userid, docid }) => {
  const classes = useStyles();
  const posEl = useRef();
  const projects = useProject(userid);
  const setRes = useChange(docid);
  // eslint-disable-next-line
  const [del, setDel] = useDelete(docid);
  const [anchorEl, setAnchorEl] = useState(null);
  const [subanchorEl, setSubanchorEl] = useState(null);

  const subhandleClick = (event) => {
    setSubanchorEl(event.currentTarget);
  };

  const deleteTask = () => {
    setDel("delete");
    handleClose();
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setSubanchorEl(null);
  };

  const changeProject = (e, val) => {
    e.preventDefault();
    setRes(val);
    handleClose();
  };

  const ListMenu = () => {
    const [proj, setProj] = useState([]);

    useEffect(() => {
      if (projects) {
        setProj(projects);
      }
      return () => {
        setProj([]);
      };
      // eslint-disable-next-line
    }, [projects]);

    return (
      <Menu
        keepMounted
        open={Boolean(subanchorEl)}
        onClose={handleClose}
        anchorEl={posEl.current}
        className={classes.mainmenu}
      >
        <List>
          {proj.length ? (
            proj.map((item, index) => (
              <ListItem
                button
                key={index}
                className={classes.sub}
                onClick={(e) => changeProject(e, item.projectid)}
              >
                {item.projectid}
              </ListItem>
            ))
          ) : (
            <ListItem button className={classes.sub}>
              No Projects Added
            </ListItem>
          )}
        </List>
      </Menu>
    );
  };

  return (
    <div>
      <div className={styles.menu__cont}>
        <Button
          aria-controls="simple-menu"
          aria-haspopup="true"
          onClick={handleClick}
        >
          <CgMenu />
        </Button>

        <Menu
          keepMounted
          open={Boolean(anchorEl)}
          onClose={handleClose}
          anchorEl={anchorEl}
        >
          <MenuItem onClick={subhandleClick} className={classes.menu}>
            Move to <RiArrowDropRightFill size="1.5em" />
          </MenuItem>
          <MenuItem className={classes.delete} onClick={() => deleteTask()}>
            Delete
          </MenuItem>
        </Menu>
        <div className={styles.reff__cont} ref={posEl}>
          <span>pony</span>
        </div>
      </div>
      <div className={styles.list__cont}>{ListMenu()}</div>
    </div>
  );
};

export default SplitButton;
