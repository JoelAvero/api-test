const express = require("express");
const config = require("./config");
const user = require("./components/user/network");
const bodyParser = require("body-parser");
const app = express();

// Middleware
app.use(bodyParser.json());

// Routes
app.use("/api/user", user);

app.listen(config.api.port, () =>
  console.log(`Listening on port ${config.api.port}`)
);
