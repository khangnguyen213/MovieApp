import React, { useCallback, useState } from "react";
import MovieDetail from "../../browse/MovieDetail/MovieDetail";
import styles from "./SearchResult.module.css";
import posterError from "../../../assests/posterError.png";

const SearchResult = (props) => {
  const [displayDetail, setDisplayDetail] = useState(false);
  const [movieDetail, setMovieDetail] = useState([]);

  //function khi người dùng click vào từng bộ phim
  const movieClickHandler = useCallback(
    (movieData) => {
      //nếu detail đang hiển thị và người dùng click vào bộ phim đang được hiển thị => tắt detail
      //nếu detail đang hiển thì và người dùng click vào bộ phim khác => thay đổi detail sang bộ phim đc click
      //vì data được fetch có key cho tên phim khác nhau là name hoặc title, nên chia hai trường hợp
      if (props.movieName === "name") {
        if (movieDetail !== []) {
          if (movieDetail.name === movieData.name && displayDetail) {
            setDisplayDetail(false);
            return;
          }
        }
      } else {
        if (movieDetail !== []) {
          if (movieDetail.title === movieData.title && displayDetail) {
            setDisplayDetail(false);
            return;
          }
        }
      }
      //nếu detail chưa được hiển thị thì hiển thị
      setDisplayDetail(true);
      setMovieDetail(movieData);
      window.scrollTo({
        left: 0,
        top: 250,
        behavior: "smooth",
      });
    },
    [displayDetail, movieDetail, props.movieName]
  );

  if (!props.data) {
    return <h1>Search Result</h1>;
  }
  console.log(props.data.results);

  return (
    <React.Fragment>
      <h1>Search Result</h1>
      <div className={styles.movieList}>
        {displayDetail && (
          <div className={styles[`detail_container`]}>
            <MovieDetail data={movieDetail} />
          </div>
        )}
        {props.data.results.map((movieData) => {
          const url = movieData.poster_path
            ? `https://image.tmdb.org/t/p/original` + movieData.poster_path
            : posterError;
          return (
            <img
              className={styles.poster}
              src={url}
              alt={movieData.title}
              key={movieData.id}
              onClick={() => {
                movieClickHandler(movieData);
              }}
            />
          );
        })}
      </div>
    </React.Fragment>
  );
};

export default SearchResult;
