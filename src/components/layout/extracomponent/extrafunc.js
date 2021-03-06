import React from "react";
import SplitButton from "../splitbutton/splitbutton.js";
import { useFetch } from "../../../hooks";

import moment from "moment";
import "../../../style/css/sidepanel.css";

const Extrafunc = ({ nav, id }) => {
  const inbdata = useFetch(id, nav);

  return inbdata.map((item, index) => (
    <div className="sidepanel__details" key={index}>
      <div className="sidepanel__details__task">
        <h4>{item.task}</h4>
      </div>
      <div className="sidepanel__details__time">
        <h5>{moment(item.date.toDate()).calendar()}</h5>
      </div>
      <div className="sidepanel__details__btn">
        <SplitButton userid={id} docid={item.docid} />
      </div>
    </div>
  ));
};

export default Extrafunc;
