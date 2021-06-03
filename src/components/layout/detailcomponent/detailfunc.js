import React, { useState, useEffect } from "react";
import "../../../style/css/sidepanel.css";
import SplitButton from "../splitbutton/splitbutton.js";

import { useFetch } from "../../../hooks";
import { useChange } from "../../../hooks";
import { filterDays } from "../../../helpers";
import { filterToday } from "../../../helpers";

import styles from "./detailfunc.module.scss";
import moment from "moment";

const Detailfunc = ({ nav, id }) => {
  const [doc, setDoc] = useState(null);
  const [data, setData] = useState([]);
  let inbdata = useFetch(id, nav);

  const submit = useChange(doc);

  const addStyle = (e, docid) => {
    e.target.parentNode.parentNode.classList.add("sidepanel__animate");
    setDoc(docid);
  };

  useEffect(() => {
    if (doc) {
      submit("COMPLETED");
    }
  }, [doc]);

  useEffect(() => {
    setData(inbdata);
  }, [inbdata]);

  useEffect(() => {
    if (nav === "NEXT_7" && inbdata.length) {
      setData(filterDays(inbdata));
    }
  }, [inbdata]);

  useEffect(() => {
    if (nav === "TODAY" && inbdata.length) {
      setData(filterToday(inbdata));
    }
  }, [inbdata]);

  return data.map((item, index) => (
    <div className="sidepanel__details" key={index}>
      <div className={styles.sidepanel__details__checkbox}>
        <input
          type="checkbox"
          onChange={(e) => addStyle(e, item.docid)}
          value="ok"
        />
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

export default Detailfunc;
