const path = require("path");
const fs = require("fs");
const p = path.join(
  path.dirname(process.mainModule.filename),
  "data",
  "videoList.json"
);

const Videos = {
  all: function () {
    return JSON.parse(fs.readFileSync(p, "utf8"));
  },
  getVideoById: function (movieId) {
    const videoList = JSON.parse(fs.readFileSync(p, "utf8"));
    const videoData = videoList.filter((movie) => movie.id === +movieId);
    return videoData;
  },
};

module.exports = Videos;
