const tokenModel = require("../models/userToken");

const authMiddleWare = (req, res, next) => {
  const token = req.query.token;
  const responseData = tokenModel.validateToken(token);
  if (responseData) {
    next();
  } else {
    res.statusCode = 400;
    res.statusMessage = "Unauthorized";
    res.end();
  }
};

module.exports = authMiddleWare;
