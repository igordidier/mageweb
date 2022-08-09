/* eslint-disable no-unused-vars */
/**
=========================================================
* Argon Dashboard 2 MUI - v3.0.0
=========================================================

* Product Page: https://www.creative-tim.com/product/argon-dashboard-material-ui
* Copyright 2022 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

// @mui material components
import Grid from "@mui/material/Grid";
import Icon from "@mui/material/Icon";
import Card from "@mui/material/Card";


// Argon Dashboard 2 MUI components
import ArgonBox from "components/ArgonBox";
import ArgonTypography from "components/ArgonTypography";

// Argon Dashboard 2 MUI example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import DetailedStatisticsCard from "examples/Cards/StatisticsCards/DetailedStatisticsCard";
import SalesTable from "examples/Tables/SalesTable";
import CategoriesList from "examples/Lists/CategoriesList";
import GradientLineChart from "examples/Charts/LineCharts/GradientLineChart";
import ArgonButton from "components/ArgonButton";


import  { useState, useEffect, useRef } from "react";



import { Redirect, Route } from "react-router-dom";
// Argon Dashboard 2 MUI base styles
import typography from "assets/theme/base/typography";

// Dashboard layout components
import Slider from "layouts/dashboard/components/Slider";
import {
  onSnapshot,
  collection,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  doc
} from "firebase/firestore";
import Projresults from "./projectsslide";
import Tasks from "./task";
import "./dash.css";

import { db } from "../../firebase.js";

// Data
import gradientLineChartData from "layouts/dashboard/data/gradientLineChartData";
import salesTableData from "layouts/dashboard/data/salesTableData";
import categoriesListData from "layouts/dashboard/data/categoriesListData";

const projdeleteChangeHandler = async (id: any) => {
  const docRef = doc(db, "projects", id);
  await deleteDoc(docRef);
  // INITIAL_TODO = INITIAL_TODO.filter((item) => item.task !== deleteTask);
  // setNewTodo(INITIAL_TODO);
};
const deleteChangeHandler = async (id: any) => {
  const docRef = doc(db, "tasks", id);
  await deleteDoc(docRef);
  // INITIAL_TODO = INITIAL_TODO.filter((item) => item.task !== deleteTask);
  // setNewTodo(INITIAL_TODO);
};

function Default() {
  const [projtitle, setprojtitle] = useState("");
  const [des, setdes] = useState("");
 const [color, setcolor] = useState("");
 const projectCollectionRef = collection(db, "projects");

 const pushproject = async () => {

   await addDoc(projectCollectionRef, {
     projtitle: projtitle,
     des: des,
     color: color
   });
 };

 const projtitleInputRef = useRef(null);
 const desInputRef = useRef(null);
 const colorInputRef = useRef(null);

  const { size } = typography;

  const [tasks, settasks] = useState([]);

 useEffect(
   () =>
     onSnapshot(collection(db, "tasks"), (snapshot) =>
       settasks(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
     ),
   []
 );

  const [newTodo, setNewTodo] = useState([]);
  const [projects, setProject] = useState([]);

  useEffect(
    () =>
      onSnapshot(collection(db, "projects"), (snapshot) =>
        setProject(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
      ),
    []
  );
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <ArgonBox py={3}>




        <Grid style={{margin: "15px"}}container spacing={3} mb={3}>
        <ArgonBox className="projall" mb={3}>
          <Card>
            <ArgonBox   display="flex" justifyContent="space-between" alignItems="center" p={3}>
              <ArgonTypography variant="h6">My Projects</ArgonTypography>
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
            <div >
                        {projects.map((projects: any) => (
                          <div key={projects.id}>
                            <Projresults
                              id={projects.id}
                              projtitle={projects.projtitle}
                              des={projects.des}
                              color={projects.color}
                              onDelete={projdeleteChangeHandler}
                            />
                          </div>
                        ))}
                      </div>
            </ArgonBox>
          </Card>
        </ArgonBox>
        <ArgonBox className="taskall" mb={3}>
          <Card>
            <ArgonBox display="flex" justifyContent="space-between" alignItems="center" p={3}>
              <ArgonTypography variant="h6">My Tasks</ArgonTypography>
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
            {tasks.map((tasks: any) => (
<div className="taskin" key={tasks.id}>
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
            </ArgonBox>
          </Card>
        </ArgonBox>


        </Grid>
        <Grid container spacing={3}>
        <ArgonBox className="taskall" mb={3}>
          <Card>
            <ArgonBox display="flex" justifyContent="space-between" alignItems="center" p={3}>
              <ArgonTypography variant="h6">Add project</ArgonTypography>
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

            <form position="center" className="addnote">

            <label position="floating">Title</label>
            <input className="intitleaddnote"
              ref={projtitleInputRef}
              onChange={(e: any) => setprojtitle(e.target.value)}
            />

            <label position="floating">Objectif</label>
            <textarea className="inlinkaddnote"
              ref={desInputRef}
              rows={6}
              cols={20}
              type="<textarea>"
              onChange={(e: any) => setdes(e.target.value)}
            />

            <label>Color Reference</label>
            <select className="inlinkaddnote"
              ref={colorInputRef}
              placeholder="Select Color"
            
            >
              <option value="#2D728F">Blue</option>
              <option value="#4FB286">Green</option>
              <option value="#E96FAE">pink</option>
              <option value="#E63946">red</option>
              <option value="#D8973C">orange</option>
            </select>


        <br/>

          <ArgonButton onClick={pushproject} variant="gradient" color="dark">
              <Icon sx={{ fontWeight: "bold" }}>add</Icon>
              &nbsp;Add New project
            </ArgonButton>
            <br />
          <br />
        </form>

            </ArgonBox>
          </Card>
        </ArgonBox>

        </Grid>
      </ArgonBox>
      <Footer />
    </DashboardLayout>
  );
}

export default Default;
