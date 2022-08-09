import  { useState, useEffect, useRef } from "react";

import {
  onSnapshot,
  collection,
  getDoc,
  addDoc,
  updateDoc,
  deleteDoc,
  where,
  doc,
  query,
  getDocs
} from "firebase/firestore";
import Tasks from "./task";
import "./dash.css";

import { db } from "../../firebase.js";
import { useHistory, useParams } from "react-router";


import Grid from "@mui/material/Grid";
import Icon from "@mui/material/Icon";
import Card from "@mui/material/Card";


// Argon Dashboard 2 MUI components
import ArgonBox from "components/ArgonBox";
import ArgonTypography from "components/ArgonTypography";

// Argon Dashboard 2 MUI example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";




const deleteChangeHandler = async (id: any) => {
  const docRef = doc(db, "tasks", id);
  await deleteDoc(docRef);
  // INITIAL_TODO = INITIAL_TODO.filter((item) => item.task !== deleteTask);
  // setNewTodo(INITIAL_TODO);
};
const projdeleteChangeHandler = async (id: any) => {
  const docRef = doc(db, "projects", id);
  await deleteDoc(docRef);
  // INITIAL_TODO = INITIAL_TODO.filter((item) => item.task !== deleteTask);
  // setNewTodo(INITIAL_TODO);
};

const Project: React.FC<{
  onDelete: Function;
}> = () => {
  const projdeleteHandler = () => {
    projects.onDelete(projects.id);
  };

  // const [task, settask] = useState("");
  const [projcolor, setprojcolor] = useState("");

  const [tasks, settasks] = useState([]);
  const [task, settask] = useState([]);


  const taskInputRef = useRef(null);
  const taskCollectionRef = collection(db, "tasks");

  // useEffect(
  //   () =>
  //     onSnapshot(collection(db, "tasks"), where("projid", "==", id), function (
  //       snapshot
  //     ): void {
  //       return settasks(
  //         snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
  //       );
  //     }),
  //   []
  // );
  const [showActionSheet, setShowActionSheet] = useState(false);
  const pushtask = async () => {


    const msg = project?.color;
    // console.log(msg);
    await addDoc(taskCollectionRef, {
      task: task,
      projid: id,
      projcolor: msg
    });
  };

  const [isOpen, setIsOpen] = useState(false);
  const [projects, setProjects] = useState([] );
  const params = useParams();
  const id = params?.id;

  const [project, setProject] = useState();
  const myfun = async () => {
    const docRef = await doc(db, "projects", id);
    const docSnap = await getDoc(docRef);
    setProject(docSnap.data());
    console.log(id);
    const q = query(collection(db, "tasks"), where("projid", "==", id));
    const querySnapshot = await getDocs(q);
    console.log("mee", tasks);
    var myTasks = [];
    querySnapshot.forEach((doc) => {
      // console.log(doc.id, " => ", doc.data());
      myTasks.push(doc.data());
    });
    settasks(myTasks);
  };
  console.log(tasks);
  const deleteproj = async () => {
    const docRef = doc(db, "projects", id);
    await deleteDoc(docRef);
    setProject(docSnap.data());
  };

  useEffect(() => {
    myfun();
  }, [id]);
  // console.log(project);
  // console.log("id:", id);

  return (
  <DashboardLayout>
    <div>
      <div>
        <br />
        <Card>
          <ArgonBox display="flex" justifyContent="space-between" alignItems="center" p={3}>
            <ArgonTypography variant="h6">{project?.projtitle}</ArgonTypography>
          </ArgonBox>
          <ArgonBox
            sx={{
              "& .MuiTableRow-root:not(:last-child)": {
                "& td": {
                  borderBottom: ({ borders: { borderWidth, borderColor } }) =>
                    `${borderWidth[1]} solid ${borderColor}`,
                },
              },
            }}
          >
          <div>
          <label>Objectif :</label>
          <br />
          <br />
          <p> {project?.des} </p>

      </div>



          </ArgonBox>
        </Card>
        <div className="ion-padding">
          <h3 className="iontitle">{project?.projtitle}</h3>
          <br />
          <label>Objectif :</label>
          <br />
          <br />
          <p> {project?.des} </p>
          <br />
          <h4>Task To Do</h4>

          <div>
            {tasks.map((tasks: any) => (
              <div key={tasks.id}>
                <Tasks
                  id={tasks.id}
                  task={tasks.task}
                  projid={tasks.projid}
                  projcolor={tasks.projcolor}
                  onDelete={deleteChangeHandler}
                />
              </div>
            ))}
          </div>
        </div>



          <div className="ion-padding">
            <h4>Add task {project?.color}</h4>
            <div>
              <label position="floating">Task</label>
              <input
                ref={taskInputRef}
                onChange={(e: any) => settask(e.target.value)}
              />
            </div>
            <button
              onClick={pushtask}
              className="ion-margin-top"
              expand="block"
            >
              Add
            </button>
          </div>

      </div>
    </div>
  </DashboardLayout>
  );
};

export default Project;
