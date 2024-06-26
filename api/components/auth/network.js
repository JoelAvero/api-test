const express = require("express");
const response = require("../../../network/response");
const Controller = require("./index");
const router = express.Router();

router.post("/login", async (req, res) => {
  try {
    const token = await Controller.login(req.body.username, req.body.password);
    if (!token) {
      return response.error(req, res, "Invalid credentials", 401);
    }
    response.success(req, res, token, 200);
  } catch (error) {
    response.error(req, res, error, 500);
  }
});

module.exports = router;
