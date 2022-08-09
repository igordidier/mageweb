import React from "react";


const Tasks: React.FC<{
  id: string,
  task: string,
 projcolor: string,
 projid: string,
  onDelete: Function
}> = (tasks) => {
  const deleteHandler = () => {
    tasks.onDelete(tasks.id);
  };
  const colorvar2 = {
    color: "black",
    backgroundColor: tasks.projcolor,
    borderradius: "25px"
  };
  return (
    <div style={colorvar2}>
      <div>
        <div >
        <button style={{float:"right"}}
          horizontal="center"
          color="success"
          onClick={deleteHandler}
        >
          Done
        </button>
            <h5 style={{color:"white"}}> {tasks.task}  </h5>


            {/* <h2>{props.task}</h2> */}
            {/* <h3></h3> */}

        </div>
      </div>
    </div>
  );
};

export default Tasks;
