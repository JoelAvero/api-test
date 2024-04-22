exports.success = function (req, res, message, status) {
  res.status(status || 200).send({
    error: false,
    status,
    body: message || "",
  });
};

exports.error = function (req, res, message, status) {
  res.status(status || 500).send({
    error: true,
    status,
    body: message || "Internal Server Error",
  });
};
