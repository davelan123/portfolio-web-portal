import { Button } from "@mui/material";
import React from "react";

const Header = (isEnableLightMode) => {
  return (
    <div
      className={
        !isEnableLightMode
          ? "contentHeader lightMode"
          : "contentHeader darkMode"
      }
    >
      <h1>DashBoard</h1>
    </div>
  );
};

export default Header;
