const express = require("express");
const bodyParser = require("body-parser");

const swaggerUI = require("swagger-ui-express");

const config = require("../config");
const user = require("./components/user/network");

const app = express();

// Middleware
app.use(bodyParser.json());

const swaggerDoc = require("./openapi.json");

// Routes
app.use("/api/user", user);
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerDoc));

app.listen(config.api.port, () =>
  console.log(`Listening on port ${config.api.port}`)
);
