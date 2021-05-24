import React, { useState, useEffect } from "react";
import { FirebaseDB } from "../firebase";

import moment from "moment";

export const useTask = () => {
  const [task, setTask] = useState([]);
  const [test, setTest] = useState(null);

  const getTask = () => {
    const data = [];
    const ref = FirebaseDB.collection("tasks");
    ref.onSnapshot((snapshot) => {
      snapshot.forEach((doc) => data.push(doc.data()));
    });
    return data;
  };

  useEffect(() => {
    const currenttasks = getTask();
    setTest(currenttasks);
  }, []);

  return test;
};
