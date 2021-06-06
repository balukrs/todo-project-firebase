import React, { useState, useEffect, useRef } from "react";
import "../../../style/css/sidepanel.css";
import SplitButton from "../splitbutton/splitbutton.js";

import { useFetch } from "../../../hooks";
import { useChange } from "../../../hooks";
import { filterDays } from "../../../helpers";
import { filterToday } from "../../../helpers";

import Snackbar from "@material-ui/core/Snackbar";
import Checkbox from "@material-ui/core/Checkbox";
import styles from "./detailfunc.module.scss";
import moment from "moment";

const Detailfunc = ({ nav, id }) => {
  const [open, setOpen] = useState(false);
  const [doc, setDoc] = useState(null);
  const [data, setData] = useState([]);
  let inbdata = useFetch(id, nav);
  const taskRef = useRef([]);
  const [result, submit] = useChange(doc);

  useEffect(() => {
    if (result === "modified") {
      setOpen(false);
    }
  }, [result]);

  const handleClose = (val) => {
    setOpen(false);
  };

  const addStyle = async (docid, index) => {
    // await taskRef.current[index].classList.add("sidepanel__animate");
    setOpen(true);
    setTimeout(function () {
      setDoc(docid);
    }, 800);
  };

  useEffect(() => {
    if (doc) {
      submit("COMPLETED");
    }
    // eslint-disable-next-line
  }, [doc]);

  useEffect(() => {
    setData(inbdata);
    return () => setData([]);
  }, [inbdata]);

  useEffect(() => {
    if (nav === "NEXT_7" && inbdata.length) {
      setData(filterDays(inbdata));
    }
  }, [nav, inbdata]);

  useEffect(() => {
    if (nav === "TODAY" && inbdata.length) {
      setData(filterToday(inbdata));
    }
  }, [nav, inbdata]);

  return data.map((item, index) => (
    <div
      className="sidepanel__details"
      key={item.docid}
      ref={(e) => taskRef.current.push(e)}
    >
      <div className={styles.sidepanel__details__checkbox}>
        <Checkbox
          onChange={() => addStyle(item.docid, index)}
          color="default"
        />
      </div>
      <div className="sidepanel__details__task">
        <h4>{item.task}</h4>
      </div>
      <div className="sidepanel__details__time">
        <h5>{moment(item.date.toDate()).calendar()}</h5>
      </div>
      <div className="sidepanel__details__btn">
        {<SplitButton userid={id} docid={item.docid} />}
      </div>
      <div>
        <Snackbar open={open} autoHideDuration={1000} onClose={handleClose}>
          <span className={styles.completed__span}>
            Task completed successfully....
          </span>
        </Snackbar>
      </div>
    </div>
  ));
};

export default Detailfunc;
