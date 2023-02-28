const express = require("express");

const cors = require("cors");

const app = express();

// const bodyParser = require("body-parser");

const filmControllers = require("./controllers/film");
const auth = require("./controllers/auth");

//Express.json() parses incoming JSON requests and puts the parsed data in req.body.
//Without express.json(), req.body is undefined
// app.use(express.json());

//Cross-origin resource sharing. cors() giúp trang web có thể truy vấn từ domain khác của domain đó
app.use(cors());

// app.use(bodyParser.urlencoded({ extended: false }));

//Lấy các phim đang Trending
app.get("/api/movies/trending", auth, filmControllers.getTrending);

//Lấy các phim có Rating cao
app.get("/api/movies/top-rate", auth, filmControllers.getTopRate);

//Lấy các phim theo thể loại
app.get("/api/movies/discover/", auth, (req, res, next) => {
  res.statusCode = 400;
  res.statusMessage = "Not found genre param";
  res.end();
});
app.get("/api/movies/discover/:genreId", auth, filmControllers.getDiscover);

//Lấy trailer của một bộ phim
app.get("/api/movies/video/", auth, (req, res, next) => {
  res.statusCode = 400;
  res.statusMessage = "Not found fim_id param";
  res.end();
});
app.get("/api/movies/video/:movieId", auth, filmControllers.getVideo);

//Tìm kiếm phim theo từ khóa
app.get("/api/movies/search/", auth, (req, res, next) => {
  res.statusCode = 400;
  res.statusMessage = "Not found key_word param";
  res.end();
});
app.get("/api/movies/search/:keyWord", auth, filmControllers.getFilmByKeyword);

//Khi nhập sai endpoint
app.use((req, res, next) => {
  res.statusCode = 404;
  res.statusMessage = "Route not found";
  res.send("<div>Route not found</div>");
  res.end();
});

//nhận http://localhost:5000
app.listen(5000);
