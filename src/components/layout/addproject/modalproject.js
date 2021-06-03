import React, { useState, useEffect, useContext } from "react";
import styles from "./modalproject.module.scss";
import { createPortal } from "react-dom";
import { useTask } from "../../../hooks";
import { LoginContext } from "../../../context";
import LinearProgress from "@material-ui/core/LinearProgress";

const modalEl = document.getElementById("modal-root");

const Modalproject = ({ status, close }) => {
  const [open, setOpen] = useState(true);
  const [inputval, setInputval] = useState("");
  const [res, setRes] = useTask("projects");
  const { uid } = useContext(LoginContext);
  const [stats, setStats] = useState(false);

  useEffect(() => {
    if (res === "added") {
      setStats(false);
      setInputval("");
      handleClose();
    }
    // eslint-disable-next-line
  }, [res]);

  useEffect(() => {
    if (status === true) {
      handleOpen();
    }
    if (status === false) {
      handleClose();
    }
    // eslint-disable-next-line
  }, [status]);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    close(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!inputval) {
      return;
    }
    setStats(true);
    const formData = {
      projectid: inputval,
      userid: uid,
    };
    setRes(formData);
  };

  const modalDetails = () => {
    return (
      <form>
        <header>Add Project</header>
        <div className={styles.input__cont}>
          <input
            placeholder="Enter project name"
            value={inputval}
            onChange={(e) => setInputval(e.target.value)}
          ></input>
        </div>
        <div className={styles.button__cont}>
          <button
            className="button_sm"
            onClick={(e) => handleSubmit(e)}
            disabled={stats}
          >
            Add Project
          </button>
          <button className="button_sm" onClick={() => handleClose()}>
            Close
          </button>
        </div>
        <div
          className={styles.modal__progress}
          style={stats ? null : { display: "none" }}
        >
          <LinearProgress />
        </div>
      </form>
    );
  };

  return createPortal(
    open ? (
      <div className={styles.modal__conatiner}>{modalDetails()}</div>
    ) : null,
    modalEl
  );
};

export default Modalproject;
