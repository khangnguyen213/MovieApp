const videoModel = require("../models/videoList");
const movieModel = require("../models/movieList");

exports.getTrending = (req, res, next) => {
  let page = 1;
  if (req.query.page) {
    page = req.query.page;
  }
  res.status(200).send(movieModel.getTrendingMovie(page));
};

exports.getTopRate = (req, res, next) => {
  let page = 1;
  if (req.query.page) {
    page = req.query.page;
  }
  res.status(200).send(movieModel.getRatingMovie(page));
};

exports.getDiscover = (req, res, next) => {
  let page = 1;
  if (req.query.page) {
    page = req.query.page;
  }
  const result = movieModel.getMovieByGenre(req.params.genreId, page);
  if (!result.err) {
    res.status(200).send(result.responseData);
  } else {
    res.statusCode = 400;
    res.statusMessage = result.err;
    res.end();
  }
};

exports.getVideo = (req, res, next) => {
  const responseData = videoModel.getVideoById(req.params.movieId);
  if (responseData.length === 0) {
    res.statusCode = 404;
    res.statusMessage = "Not found video";
    res.end();
  } else {
    res.status(200).send(responseData);
  }
};

exports.getFilmByKeyword = (req, res, next) => {
  let page = 1;
  if (req.query.page) {
    page = req.query.page;
  }
  const responseData = movieModel.getMovieByKeyWord(req.params.keyWord, page);
  res.send(responseData);
};
