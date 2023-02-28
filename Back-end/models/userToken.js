const path = require("path");
const fs = require("fs");
const p = path.join(
  path.dirname(process.mainModule.filename),
  "data",
  "userToken.json"
);

const Users = {
  all: function () {
    return JSON.parse(fs.readFileSync(p, "utf8"));
  },
  validateToken: function (token) {
    const tokenList = JSON.parse(fs.readFileSync(p, "utf8"));
    const userData = tokenList.filter((user) => user.token === token)[0];
    return userData;
  },
};

module.exports = Users;
