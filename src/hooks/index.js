import { useState, useEffect } from "react";
import { FirebaseDB } from "../firebase";

// Fetch tasks
export const useFetch = (id, project) => {
  const [task, setTask] = useState([]);

  useEffect(() => {
    if (project === "TODAY" || project === "NEXT_7") {
      project = "INBOX";
    }

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
      FirebaseDB.collection(project)
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
  }, [data, project]);

  const submitData = (val) => {
    setData(val);
  };

  return [result, submitData];
};

//Modify Task
export const useChange = (docid) => {
  const [data, setData] = useState(null);
  // eslint-disable-next-line
  const [result, setResult] = useState(null);

  useEffect(() => {
    const fethFunc = (val) => {
      FirebaseDB.collection("tasks")
        .doc(docid)
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
  }, [data, docid]);

  const submitData = (val) => {
    setData(val);
  };

  return submitData;
};

//Remove Task
export const useDelete = (docid) => {
  const [data, setData] = useState(null);
  const [result, setResult] = useState(null);

  useEffect(() => {
    const fethFunc = () => {
      FirebaseDB.collection("tasks")
        .doc(docid)
        .delete()
        .then(() => {
          setResult("deleted");
        })
        .catch((error) => {
          setResult("notdeleted");
        });
    };

    if (data === "delete") {
      fethFunc();
    }
    return () => setData(null);
  }, [data, docid]);

  const submitData = (val) => {
    setData(val);
  };

  return [result, submitData];
};

//Delete batched projects

export const useProjdel = (id) => {
  const [data, setData] = useState(null);
  const [result, setResult] = useState(null);

  useEffect(() => {
    const fethFunc = async () => {
      var projDel = await FirebaseDB.collection("projects")
        .where("userid", "==", id)
        .where("projectid", "==", data)
        .get();

      var taskDel = await FirebaseDB.collection("tasks")
        .where("userid", "==", id)
        .where("projectid", "==", data)
        .get();

      var batch = FirebaseDB.batch();

      projDel.forEach((doc) => {
        batch.delete(doc.ref);
      });

      taskDel.forEach((doc) => {
        batch.delete(doc.ref);
      });

      await batch
        .commit()
        .then(() => {
          setResult("removed");
          setResult("notremoved");
        })
        .catch((error) => {
          setResult("notremoved");
        });
    };

    if (data) {
      fethFunc();
    }

    return () => setData(null);
  }, [data]);

  const submitData = (val) => {
    setData(val);
  };

  return [result, submitData];
};
