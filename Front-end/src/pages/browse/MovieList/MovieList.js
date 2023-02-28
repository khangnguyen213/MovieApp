import React, { useCallback, useState } from "react";
import MovieDetail from "../MovieDetail/MovieDetail";
import styles from "./MovieList.module.css";
import backdropError from "../../../assests/imageNotFound.png";
import posterError from "../../../assests/posterError.png";

const MovieList = (props) => {
  console.log(`Evaluating MovieList`, `${props.name}`);
  //displayDetail : component MovieDetail có được hiện thị hay không
  //movieDetail: nội dung được truyền vào component MovieDetail
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
    }
    // [displayDetail, movieDetail, props.movieName]
  );

  //Nếu chưa nhận được dữ liệu thì hiển thị "Loading..."
  if (!props.data) {
    return <p>Loading...</p>;
  }
  return (
    <div className={styles[`movie-list`]}>
      <h1>{props.name}</h1>
      <div className={styles[`movie-container`]}>
        {/* map qua movieData để lấy url của từng poster và render poster */}
        {props.data.results.map((movieData) => {
          //nếu type là poster thì lấy url poster, không thì lấy url backdrop
          //nếu url lỗi thì dùng posterError hoặc backdropError đẻ thay thế
          const url =
            (props.type === "poster"
              ? `https://image.tmdb.org/t/p/original` + movieData.poster_path
              : `https://image.tmdb.org/t/p/original` +
                movieData.backdrop_path) ||
            (props.type === "poster" ? posterError : backdropError);

          return (
            <div
              className={styles.movie}
              key={movieData.id}
              onClick={() => {
                movieClickHandler(movieData);
              }}
            >
              <img
                src={url}
                alt={movieData.id}
                className={
                  props.type === "poster"
                    ? styles["poster"]
                    : styles[`back-drop`]
                }
              />
            </div>
          );
        })}
      </div>
      {displayDetail && <MovieDetail data={movieDetail} />}
    </div>
  );
};

export default React.memo(MovieList);
