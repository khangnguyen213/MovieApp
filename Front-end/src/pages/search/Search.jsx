import React, { useCallback, useState } from "react";
import NavBar from "../browse/NavBar/NavBar";
import SearchForm from "./SearchForm/SearchForm";
import SearchResult from "./SearchResult/SearchResult";
import styles from "./Search.module.css";

const Search = () => {
  const [data, setData] = useState();
  console.log("Evaluating Search");

  const fetchSearchData = useCallback(
    async (keyword, genre, mediaType, language, year) => {
      const url =
        `http://localhost:5000/api/movies/search/${keyword}?token=8qlOkxz4wq` +
        `&genre=${genre}` +
        `&mediaType=${mediaType}` +
        `&language=${language}` +
        `&year=${year}`;

      const request = await fetch(url);
      const data = await request.json();
      setData(data);
    },
    []
  );

  return (
    <div className="app">
      <NavBar />
      <div className={styles.body}>
        <SearchForm onSearch={fetchSearchData} />
        <SearchResult data={data} />
      </div>
    </div>
  );
};

export default Search;
