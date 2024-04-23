const auth = require("../../../auth");
const response = require("../../../network/response");
module.exports = function checkAuth(action) {
  return function middleware(req, res, next) {
    const owner = req.body.id;

    switch (action) {
      case "update":
        auth.check.own(req, owner);
        next();
        break;

      default:
        next();
    }
  };
};
