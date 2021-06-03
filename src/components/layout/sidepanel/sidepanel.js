import React, { useState, useEffect } from "react";
import styles from "./sidepanel.module.scss";
import "../../../style/css/sidepanel.css";

import { useTask } from "../../../hooks";

import Detailfunc from "../detailcomponent/detailfunc";
import Extrafunc from "../extracomponent/extrafunc";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import LinearProgress from "@material-ui/core/LinearProgress";

const Sidepanel = ({ id, nav }) => {
  const [res, setRes] = useTask("tasks");
  const [inputval, setInputval] = useState("");
  const [startDate, setStartDate] = useState(new Date());
  const [status, setStatus] = useState(false);

  useEffect(() => {
    if (res === "added") {
      setStatus(false);
      setInputval("");
      setStartDate(new Date());
    }
  }, [res]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!inputval) {
      return;
    }
    setStatus(true);
    const formdata = {
      date: startDate,
      projectid: nav === "NEXT_7" || nav === "TODAY" ? "INBOX" : nav,
      task: inputval,
      deleted: false,
      userid: id,
    };
    setRes(formdata);
  };

  return (
    <div className={styles.sidepanel}>
      {nav === "COMPLETED" ? null : (
        <header className={styles.header}>
          <form onSubmit={(e) => handleSubmit(e)}>
            <input
              placeholder={`Enter Task to ${nav}`}
              className={styles.header__input}
              onChange={(e) => setInputval(e.target.value)}
              value={inputval}
            />
            <DatePicker
              dateFormat="dd/MM/yyyy"
              selected={startDate}
              onChange={(date) => setStartDate(date)}
            />
            <button
              type="submit"
              className={styles.header__submit}
              disabled={status}
            >
              Submit
            </button>
          </form>
          <div
            className={styles.header__progress}
            style={status ? null : { display: "none" }}
          >
            <LinearProgress />
          </div>
        </header>
      )}

      <div className={styles.detail__cont}>
        {nav === "COMPLETED" || nav === "DELETED" ? (
          <Extrafunc nav={nav} id={id} />
        ) : (
          <Detailfunc nav={nav} id={id} />
        )}
      </div>
    </div>
  );
};

export default Sidepanel;