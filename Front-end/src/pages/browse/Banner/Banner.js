import React from "react";
import styles from "./Banner.module.css";
import errorImage from "../../../assests/imageNotFound.png";

const Banner = (props) => {
  console.log("Evaluating Banner");
  if (!props.data) {
    return <p>...Loading...</p>;
  }

  const movieData =
    props.data.results[
      Math.floor(Math.random() * props.data.results.length - 1)
    ];

  const backdropURL = movieData.backdrop_path
    ? `https://image.tmdb.org/t/p/original` + movieData.backdrop_path
    : errorImage;
  return (
    <div
      className={styles.banner}
      style={{ backgroundImage: `url(${backdropURL})` }}
    >
      <div className={styles[`movie_infor`]}>
        <h1>{movieData.name}</h1>
        <div className={styles.actions}>
          <button>Play</button>
          <button>My list</button>
        </div>

        {movieData.overview ? (
          <p>{movieData.overview}</p>
        ) : (
          <p>So sorry !! Description hasn't been updated ...</p>
        )}
      </div>
    </div>
  );
};

export default React.memo(Banner);
