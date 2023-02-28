const path = require("path");
const fs = require("fs");
const p = path.join(
  path.dirname(process.mainModule.filename),
  "data",
  "movieList.json"
);
const genreModel = require("./genreList");

const Movies = {
  all: function () {
    return JSON.parse(fs.readFileSync(p, "utf8"));
  },
  getTrendingMovie: function (page) {
    const movieList = JSON.parse(fs.readFileSync(p, "utf8"));
    movieList.sort((a, b) => b.popularity - a.popularity);
    const responseData = {
      page: page,
      total_pages: Math.ceil(movieList.length / 20),
      results: [],
    };
    for (
      let i = (+page - 1) * 20;
      i >= (+page - 1) * 20 && i <= (+page - 1) * 20 + 19;
      i++
    ) {
      responseData.results.push(movieList[i]);
    }
    return responseData;
  },
  getRatingMovie: function (page) {
    const movieList = JSON.parse(fs.readFileSync(p, "utf8"));
    movieList.sort((a, b) => b.vote_average - a.vote_average);
    const responseData = {
      page: page,
      total_pages: Math.ceil(movieList.length / 20),
      results: [],
    };
    for (
      let i = (+page - 1) * 20;
      i >= (+page - 1) * 20 && i <= (+page - 1) * 20 + 19;
      i++
    ) {
      if (movieList[i]) {
        responseData.results.push(movieList[i]);
      }
    }
    return responseData;
  },
  getMovieByGenre: function (genreId, page) {
    const genreList = genreModel.all();
    const genre = genreList.filter((genre) => genre.id === +genreId);
    if (genre.length === 0) {
      return { err: "Not found that genre id", responseData: {} };
    }
    const genre_name = genre[0].name;
    const movieList = JSON.parse(fs.readFileSync(p, "utf8"));
    const filteredMovieList = movieList.filter((movie) => {
      return movie.genre_ids.includes(+genreId);
    });
    const responseData = {
      page: page,
      total_pages: Math.ceil(filteredMovieList.length / 20),
      genre_name: genre_name,
      results: [],
    };
    for (
      let i = (+page - 1) * 20;
      i >= (+page - 1) * 20 && i <= (+page - 1) * 20 + 19;
      i++
    ) {
      if (filteredMovieList[i]) {
        responseData.results.push(filteredMovieList[i]);
      }
    }
    return { err: null, responseData };
  },
  getMovieByKeyWord: function (keyWord, page) {
    const movieList = JSON.parse(fs.readFileSync(p, "utf8"));
    const filteredMovieList = movieList.filter((movie) => {
      const title = movie.title ? movie.title : movie.name;
      return title.includes(keyWord) || movie.overview.includes(keyWord);
    });
    const responseData = {
      page: page,
      total_pages: Math.ceil(filteredMovieList.length / 20),
      results: [],
    };
    for (
      let i = (+page - 1) * 20;
      i >= (+page - 1) * 20 && i <= (+page - 1) * 20 + 19;
      i++
    ) {
      if (filteredMovieList[i]) {
        responseData.results.push(filteredMovieList[i]);
      }
    }
    return responseData;
  },
};

module.exports = Movies;
