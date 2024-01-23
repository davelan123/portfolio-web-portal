import React, { useState } from "react";
import SideBar from "./SideBar";
import NavBar from "./NavBar";
import Header from "./Header";
import Body from "./Body";
import Footer from "./Footer";
import "../../style.css";
import CollapsibleTable from "../Table/CollapsibleTable";
import { Button } from "@mui/material";

const BackgroundTemplate = () => {
  const [leftBodyClassName, setLeftBodyClassName] = useState("left-body");
  const [rightBodyClassName, setRightBodyClassName] = useState("right-body");
  const [isEnableLightMode, setIsEnableLightMode] = useState(false);
  const handleLeftRightBodayClassName = (isClickedSideBar) => {
    if (!isClickedSideBar) {
      setLeftBodyClassName("left-body openLeftBody");
      setRightBodyClassName("right-body closeRightBody");
    } else {
      setLeftBodyClassName("left-body closeLeftBody");
      setRightBodyClassName("right-body openRightBody");
    }
  };
  const handleLightMode = (isEnableLightMode) => {
    console.log("isEnableLightMode", isEnableLightMode);
    setIsEnableLightMode(!isEnableLightMode);
  };
  return (
    <div className="backgroud-template">
      <div className={leftBodyClassName}>
        <SideBar
          handleLeftRightBodayClassName={handleLeftRightBodayClassName}
          handleLightMode={handleLightMode}
        ></SideBar>
      </div>
      <div className={rightBodyClassName}>
        <Header isEnableLightMode={isEnableLightMode}></Header>
        <Body></Body>
        <Footer></Footer>
      </div>
    </div>
  );
};

export default BackgroundTemplate;
