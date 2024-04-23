const response = require("./response");

function errors(err, req, res, next) {
  // console.error("[error]", err);
  const status = err.statusCode || 500;
  const message =
    status === 500
      ? "Internal Server Error"
      : err.message || "Internal Server Error";

  response.error(req, res, message, status);
}

module.exports = errors;
