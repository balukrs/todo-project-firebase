import React, { useState, useEffect } from "react";
import styles from "./sidepanel.module.scss";
import "../../../style/css/sidepanel.css";

import { useTask } from "../../../hooks";
import { useFetch } from "../../../hooks";

import moment from "moment";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import LinearProgress from "@material-ui/core/LinearProgress";

import SplitButton from "../splitbutton/splitbutton.js";

const Sidepanel = ({ id, nav }) => {
  const [res, setRes] = useTask("tasks");
  const [inputval, setInputval] = useState("");
  const [startDate, setStartDate] = useState(new Date());
  const [status, setStatus] = useState(false);

  useEffect(() => {
    if (res == "added") {
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
      projectid: nav,
      task: inputval,
      deleted: false,
      userid: id,
    };
    setRes(formdata);
  };

  const Detailfunc = () => {
    const inbdata = useFetch(id, nav);
    const addStyle = (e) => {
      e.target.parentNode.parentNode.classList.add("sidepanel__animate");
    };

    return inbdata.map((item, index) => (
      <div className="sidepanel__details" key={index}>
        <div className={styles.sidepanel__details__checkbox}>
          <input type="checkbox" onChange={(e) => addStyle(e)} value="ok" />
        </div>
        <div>
          <h4>{item.task}</h4>
        </div>
        <div>
          <h5>{moment(item.date.toDate()).calendar()}</h5>
        </div>
        <div>{<SplitButton userid={id} docid={item.docid} />}</div>
      </div>
    ));
  };

  return (
    <div className={styles.sidepanel}>
      <header className={styles.header}>
        <form onSubmit={(e) => handleSubmit(e)}>
          <input
            placeholder={`Enter Task for ${nav}`}
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

      <div className={styles.detail__cont}>
        <Detailfunc />
      </div>
    </div>
  );
};

export default Sidepanel;
