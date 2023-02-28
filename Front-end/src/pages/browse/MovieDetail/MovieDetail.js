import React, { useEffect, useState } from "react";
import styles from "./MovieDetail.module.css";
import YouTube from "react-youtube";
import backdropError from "../../../assests/imageNotFound.png";

const MovieDetail = (props) => {
  console.log("Evaluating MovieDetail");
  //data được fetch có key của tên phim có thể là name hoặc title
  const movieName = props.data.name ? props.data.name : props.data.title;
  const [key, setKey] = useState();
  const API_KEY = `30f606cb5a3271b8e8a30c36c7ca5179`;
  const url = `https://api.themoviedb.org/3//movie/${props.data.id}/videos?api_key=${API_KEY}`;
  const opts = {
    height: "400",
    width: "100%",
    playerVars: {
      autoplay: 0,
    },
  };
  const backdropURL = props.data.backdrop_path
    ? `https://image.tmdb.org/t/p/original` + props.data.backdrop_path
    : backdropError;

  const fetchData = async (url) => {
    const response = await fetch(url);
    if (!response.ok) {
      console.log("Error");
      setKey();
      return;
    }
    const data = await response.json();
    console.log(data);
    if (data.results.length === 0) {
      console.log("No data");
      setKey();
      return;
    }
    //cho vòng lặp quét qua data fetch được để tìm object có site là Youtube, type Trailer hoặc Tease
    for (let i = 0; i < data.results.length; i++) {
      console.log(data.results[i], data.results[i].site, data.results[i].type);
      if (
        data.results[i].site === "YouTube" &&
        data.results[i].type === "Trailer"
      ) {
        setKey(data.results[i].key);
      } else if (
        data.results[i].site === "YouTube" &&
        data.results[i].type === "Teaser"
      ) {
        setKey(data.results[i].key);
      } else {
        console.log("No url");
        setKey();
      }
    }
  };
  useEffect(() => {
    fetchData(url);
  }, [url]);

  return (
    <div className={styles.container}>
      <div className={styles.detail}>
        <h1>{movieName}</h1>
        {props.data.first_air_date ? (
          <h2>Release Date: {props.data.first_air_date}</h2>
        ) : (
          <h2>Release Date: N/A</h2>
        )}
        {props.data.vote_average ? (
          <h2>Vote: {props.data.vote_average}/10</h2>
        ) : (
          <h2>Vote: N/A</h2>
        )}
        {props.data.overview ? (
          <p>{props.data.overview}</p>
        ) : (
          <p>Sorry..Overview hasn't been updated yet</p>
        )}
      </div>

      {key && (
        <div className={styles.video}>
          <YouTube videoId={key} opts={opts} />
        </div>
      )}

      {!key && (
        <img
          src={backdropURL}
          onError={({ currentTarget }) => {
            currentTarget.onerror = null; // prevents looping
            currentTarget.src = "../../../assests/imageNotFound.png";
          }}
          alt=""
          className={styles.image}
        />
      )}
    </div>
  );
};

export default MovieDetail;
