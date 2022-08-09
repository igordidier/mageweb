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
import Card from "@mui/material/Card";
import React, { useState, useEffect, useRef } from "react";
import Results from "./note";
import "./notes.css";

// Argon Dashboard 2 MUI components
import ArgonBox from "components/ArgonBox";
import ArgonTypography from "components/ArgonTypography";
import Icon from "@mui/material/Icon";
import ArgonButton from "components/ArgonButton";

// Argon Dashboard 2 MUI examples
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import Table from "examples/Tables/Table";

// Data
import authorsTableData from "layouts/tables/data/authorsTableData";
import projectsTableData from "layouts/tables/data/projectsTableData";

import { db } from "../../firebase.js";
import {
  onSnapshot,
  collection,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  orderBy,
  doc,
  Timestamp
} from "firebase/firestore";

const deleteChangeHandler = async (id: any) => {
  const docRef = doc(db, "notes", id);
  await deleteDoc(docRef);
  // INITIAL_TODO = INITIAL_TODO.filter((item) => item.task !== deleteTask);
  // setNewTodo(INITIAL_TODO);
};

function Tables() {

  const [notes, setNote] = useState([]);
  const [title, settitle] = useState([]);
  const [note, setnote] = useState([]);
  const [link, setlink] = useState([]);
  const noteCollectionRef = collection(db, "notes");


  const pushnote = async () => {
    console.log(title, note);



    await addDoc(noteCollectionRef, {
      title: title,
      note: note,
      link: link
    });
  };

  const titleInputRef = useRef(null);
  const noteInputRef = useRef(null);
  const linkInputRef = useRef(null);


  useEffect(
    () =>
      onSnapshot(collection(db, "notes"),orderBy('date', "asc"), (snapshot) =>
        setNote(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
      ),
    []
  );

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <ArgonBox py={3}>
        <ArgonBox mb={3}>
          <Card>
            <ArgonBox display="flex" justifyContent="space-between" alignItems="center" p={3}>
              <ArgonTypography variant="h6">My Notes</ArgonTypography>
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
            <div className="allnotes">

            {notes.map((notes: any) => (
          <div classename="note" key={notes.id}>
            <Results
              id={notes.id}
              title={notes.title}
              note={notes.note}
              link={notes.link}
              date={notes.date}
              onDelete={deleteChangeHandler}
            />
          </div>
        ))}

            </div>

            </ArgonBox>
          </Card>
        </ArgonBox>
        <Card>
          <ArgonBox display="flex" justifyContent="space-between" alignItems="center" p={3}>
            <ArgonTypography variant="h6">Add note</ArgonTypography>
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

          <form className="addnote">

          <label className="titleaddnote" position="floating">Title</label>
          <input className="intitleaddnote"
            ref={titleInputRef}
            onChange={(e: any) => settitle(e.target.value)}
          />

          <label >Note</label>
          <textarea className="innoteaddnote"
            ref={noteInputRef}
            rows={6}
            cols={20}

            onChange={(e: any) => setnote(e.target.value)}
          />


          <label position="floating">Link</label>
          <input className="inlinkaddnote"
            ref={linkInputRef}
            onChange={(e: any) => setlink(e.target.value)}
          />



      <ArgonButton onClick={pushnote} variant="gradient" color="dark">
          <Icon sx={{ fontWeight: "bold" }}>add</Icon>
          &nbsp;Add New Card
        </ArgonButton>
        <br />

      </form>

          </ArgonBox>
        </Card>
      </ArgonBox>
      <Footer />
    </DashboardLayout>
  );
}

export default Tables;
