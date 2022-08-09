import React from "react";


import { Link } from "react-router-dom";



import { useNavigate } from "react-router-dom";

const COLORS = {
  background: "{projects.color}"
};
const Projresults: React.FC<{
  id: string,
  projtitle: string,
  des: string,
  color: string,
  onDelete: Function
}> = (projects) => {
  const projdeleteHandler = () => {
    projects.onDelete(projects.id);
  };
  const colorvar = {
    color: "white",
    backgroundColor: projects.color,
    borderradius: "25px"
  };

  const history = useNavigate();

  return (
    < div>
      <Link className="btn btn-info" to={`/project/${projects.id}`}>
        <div style={colorvar} className="cardproj">

            <h4 className="titleproj">
              {" "}
              {projects.projtitle}{" "}
            </h4>
            <p className="projdes">{projects.des} </p>


        </div>
      </Link>
    </ div>
  );
};

export default Projresults;
