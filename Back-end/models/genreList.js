const path = require("path");
const fs = require("fs");
const p = path.join(
  path.dirname(process.mainModule.filename),
  "data",
  "genreList.json"
);

const Genres = {
  all: function () {
    return JSON.parse(fs.readFileSync(p, "utf8"));
  },
};

module.exports = Genres;
