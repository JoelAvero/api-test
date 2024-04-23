const jwt = require("jsonwebtoken");
const config = require("../config");
const error = require("../utils/error");
const secret = config.jwt.secret;

function sign(data) {
  return jwt.sign(data, secret);
}

function verify(token) {
  return jwt.verify(token, secret);
}

const check = {
  own: function (req, owner) {
    const decoded = decodeHeader(req);
    console.log(decoded);
    if (decoded.id !== owner) {
      throw error("Unauthorized", 401);
    }
  },
};

function getToken(authorization) {
  if (!authorization) {
    throw error("No token provided", 401);
  }

  if (authorization.indexOf("Bearer") === -1) {
    throw error("Invalid token", 401);
  }

  return authorization.replace("Bearer ", "");
}

function decodeHeader(req) {
  const authorization = req.headers.authorization || "";
  const token = getToken(authorization);
  const decoded = verify(token);

  req.user = decoded;

  return decoded;
}

module.exports = {
  sign,
  check,
};
