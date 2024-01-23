import React, { useState, useEffect } from "react";
import "../../style.css";
import NavBar from "./NavBar";
import {
  BiChevronRightCircle,
  BiSearch,
  BiHome,
  BiBarChartSquare,
  BiBell,
  BiPieChart,
  BiHeart,
  BiLogOut,
  BiWallet,
  BiMoon,
  BiSun,
} from "react-icons/bi";

function SideBar({ handleLeftRightBodayClassName, handleLightMode }) {
  const [isClicked, setIsClicked] = useState(false);
  const [navParent, setNavParent] = useState("sidebar close");
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [modeText, setModeText] = useState("Light mode");
  const [enableToggleSwitch, setEnableToggleSwitch] = useState("switch hidden");
  const [logoSectionClassName, setLogoSectionClassName] =
    useState("text logo-text");
  const [profileClassName, setProfileClassName] = useState("name hidden");
  const [professionClassName, setProfessionClassName] =
    useState("profession hidden");

  const handleModeText = () => {
    console.log("isDarkMode", isDarkMode);
    setIsDarkMode(!isDarkMode);
    if (!isDarkMode) {
      setModeText("Light mode");
    } else {
      setModeText("Dark mode");
    }
    handleLightMode(!isDarkMode);
  };

  useEffect(() => {
    if (isDarkMode) {
      document.body.classList.toggle("dark");
    } else {
      document.body.classList.toggle("dark");
    }
  }, [isDarkMode]);

  const handleClick = () => {
    if (!isClicked) {
      setNavParent("sidebar");
      setEnableToggleSwitch("switch visible");
      setLogoSectionClassName("text logo-text visible");
      setProfessionClassName("profession visible");
      setProfileClassName("name visible");
    } else {
      setNavParent("sidebar close");
      setEnableToggleSwitch("switch hidden");
      setLogoSectionClassName("text logo-text hidden");
      setProfessionClassName("profession hidden");
      setProfileClassName("name hidden");
    }
    handleLeftRightBodayClassName(isClicked);
    setIsClicked(!isClicked);
  };

  const returnDarkAndLightModeComponent = () => {
    return isDarkMode ? (
      <BiMoon className="icon moon"></BiMoon>
    ) : (
      <BiSun className="icon sun"></BiSun>
    );
  };

  return (
    <div>
      <nav className={navParent}>
        <header>
          <div className="image-text">
            <span className="image">
              <img src="/assets/logo.png" alt="logo"></img>
            </span>

            <div className={logoSectionClassName}>
              <span className={profileClassName}>Dave Deng</span>
              <span className={professionClassName}>Full Stack Developer</span>
            </div>
          </div>

          <BiChevronRightCircle
            className="toggle"
            onClick={handleClick}
          ></BiChevronRightCircle>
        </header>

        <div className="menu-bar">
          <div className="menu">
            <li className="search-box">
              <BiSearch className="icon"></BiSearch>
              <input type="text" placeholder="Search..."></input>
            </li>

            <ul className="menu-links">
              <li className="nav-link">
                <a href="#">
                  <BiHome className="icon"></BiHome>
                  <span className="text nav-text">Dashboard</span>
                </a>
              </li>

              <li className="nav-link">
                <a href="#">
                  <BiBarChartSquare className="icon"></BiBarChartSquare>
                  <span className="text nav-text">Revenue</span>
                </a>
              </li>

              <li className="nav-link">
                <a href="#">
                  <BiBell className="icon"></BiBell>
                  <span className="text nav-text">Notifications</span>
                </a>
              </li>

              <li className="nav-link">
                <a href="#">
                  <BiPieChart className="icon"></BiPieChart>
                  <span className="text nav-text">Analytics</span>
                </a>
              </li>

              <li className="nav-link">
                <a href="#">
                  <BiHeart className="icon"></BiHeart>
                  <span className="text nav-text">Likes</span>
                </a>
              </li>

              <li className="nav-link">
                <a href="#">
                  <BiWallet className="icon"></BiWallet>
                  <span className="text nav-text">Wallets</span>
                </a>
              </li>
            </ul>
          </div>

          <div className="bottom-content">
            <li className="">
              <a href="#">
                <BiLogOut className="icon"></BiLogOut>
                <span className="text nav-text">Logout</span>
              </a>
            </li>

            <li className="mode">
              <div className="sun-moon">
                {returnDarkAndLightModeComponent()}
              </div>
              <span className="mode-text text">{modeText}</span>

              <div className="toggle-switch" onClick={handleModeText}>
                <span className={enableToggleSwitch}></span>
              </div>
            </li>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default SideBar;
