import React, { useState, useEffect } from "react";
import searchIcon from "../../../assests/searchIcon.svg";
import styles from "./NavBar.module.css";

const NavBar = () => {
  // console.log("Evaluating NavBar");
  const [scrollY, setScrollY] = useState(0);
  const scrollHandler = () => {
    setScrollY(window.scrollY);
  };
  useEffect(() => {
    window.addEventListener("scroll", scrollHandler);
  });
  let backgroundColor = 0;
  if (scrollY <= 100) {
    backgroundColor = scrollY / 100;
  } else {
    backgroundColor = 1;
  }

  const homeButtonHandler = () => {
    window.location.replace("./");
  };
  const searchButtonHandler = () => {
    window.location.replace("./search");
    console.log(`search`);
  };
  return (
    <div
      className={styles[`nav_bar`]}
      backgroundcolor={backgroundColor}
      style={{ backgroundColor: `rgba(0,0,0,${backgroundColor})` }}
    >
      <p className={styles.title} onClick={homeButtonHandler}>
        Movie App
      </p>
      <img
        src={searchIcon}
        alt="Search Icon"
        className={styles.icon}
        onClick={searchButtonHandler}
      />
    </div>
  );
};

export default React.memo(NavBar);
