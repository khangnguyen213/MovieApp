import React, { useState } from "react";
import styles from "./SearchForm.module.css";
import searchIcon from "../../../assests/searchIcon.svg";

const SearchForm = (props) => {
  const [input, setInput] = useState("");

  const inputChangeHandler = (e) => {
    setInput(e.target.value);
  };

  const searchClickHandler = () => {
    //nếu input rỗng thì không thể gửi request
    input.trim() !== "" && props.onSearch(input);
  };

  const resetClickHandler = () => {
    setInput("");
  };
  return (
    <div className={styles.form}>
      <div className={styles[`form_input`]}>
        <input
          type="text"
          value={input}
          onChange={inputChangeHandler}
          placeholder="Type 'keyword' you want to search "
        />

        <img
          src={searchIcon}
          alt="Search Icon"
          className={styles.icon}
          onClick={searchClickHandler}
        />
      </div>
      <div className={styles.actions}>
        <button className={styles.resetBtn} onClick={resetClickHandler}>
          RESET
        </button>
        <button className={styles.searchBtn} onClick={searchClickHandler}>
          SEARCH
        </button>
      </div>
    </div>
  );
};

export default SearchForm;
