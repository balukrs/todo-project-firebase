import React, { useState, useEffect } from "react";
import { FirebaseDB } from "../firebase";

// Fetch tasks
export const useFetch = (id, project) => {
  const [task, setTask] = useState([]);

  useEffect(() => {
    let ref = FirebaseDB.collection("tasks")
      .where("projectid", "==", project)
      .where("userid", "==", id);
    ref = ref.onSnapshot((snapshot) => {
      const newtask = snapshot.docs.map((doc) => {
        return { docid: doc.id, ...doc.data() };
      });
      setTask(newtask);
    });
    return () => ref();
  }, [id, project]);

  return task;
};

//Get Projects
export const useProject = (id) => {
  const [project, setProject] = useState(null);

  useEffect(() => {
    let ref = FirebaseDB.collection("projects").where("userid", "==", id);

    ref = ref.onSnapshot((snapshot) => {
      const projectdata = snapshot.docs.map((doc) => {
        return doc.data();
      });
      setProject(projectdata);
    });

    return () => ref();
  }, [id]);

  return project;
};

// Add Data
export const useTask = (project) => {
  const [data, setData] = useState(null);
  const [result, setResult] = useState(null);

  useEffect(() => {
    const fethFunc = (val) => {
      const ref = FirebaseDB.collection(project)
        .add(val)
        .then(() => {
          setResult("added");
          setResult("notadded");
        })
        .catch((error) => {
          setResult("notadded");
        });
    };

    if (data) {
      fethFunc(data);
    }
  }, [data]);

  const submitData = (val) => {
    setData(val);
  };

  return [result, submitData];
};

//Modify Task
export const useChange = (docid) => {
  const [data, setData] = useState(null);
  const [result, setResult] = useState(null);

  useEffect(() => {
    const fethFunc = (val) => {
      const ref = FirebaseDB.collection("tasks").doc(docid);
      return ref
        .update({
          projectid: val,
        })
        .then(() => {
          setResult("changed");
          setResult("notchanged");
        })
        .catch((error) => {
          setResult("notchanged");
        });
    };

    if (data) {
      fethFunc(data);
    }
    return () => setData(null);
  }, [data]);

  const submitData = (val) => {
    setData(val);
  };

  return submitData;
};
