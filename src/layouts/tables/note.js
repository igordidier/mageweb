import React from "react";
import "./notes.css";



const Results: React.FC<{
  id: string,
  title: string,
  note: string,
  link: string,
  date: string,
  onDelete: Function
}> = (notes) => {
  const deleteHandler = () => {
    notes.onDelete(notes.id);
  };

  return (
<>

            <span style={{color: "grey", fontSize: "10px"}}>{notes.date}</span>
            <h4 classename="titlenote" > {notes.title} </h4>
            <p classename="notenote">{notes.note}</p>

              <a target="_blank" rel="noreferrer" classename="lincnote" href={notes.link}>{notes.link}</a>
                <br/>
            <a style={{backgroundColor: "#0CCDEF", color: "white", padding: "5px", marginbottom: "5px"  }} color="success" onClick={deleteHandler}>
              Delete
            </a>
            {/* <h2>{props.task}</h2> */}
            {/* <h3></h3> */}
            <br/>
            <hr/>
</>
  );
};

export default Results;
