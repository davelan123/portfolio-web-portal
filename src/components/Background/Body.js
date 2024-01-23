import React from "react";
import DashBoard from "../Dashboard/DashBoard";
import "../../style.css";

const Body = () => {
  return (
    <div className="contentBody">
      <DashBoard className="dashboard"></DashBoard>
      {/* <div>body</div> */}
    </div>
  );
};

export default Body;
