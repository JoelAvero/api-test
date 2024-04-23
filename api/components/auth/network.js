const express = require("express");
const response = require("../../../network/response");
const Controller = require("./index");
const router = express.Router();

router.post("/login", async (req, res, next) => {
  try {
    const token = await Controller.login(req.body.username, req.body.password);

    if (!token) {
      return response.error(req, res, "Invalid credentials", 401);
    }

    response.success(req, res, token, 200);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
