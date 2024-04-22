const express = require("express");
const response = require("../../../network/response");
const Controller = require("./index");
const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const data = await Controller.list();
    response.success(req, res, data, 200);
  } catch (error) {
    response.error(req, res, error, 500);
  }
});

router.get("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    console.log(id);
    const data = await Controller.getById(id);
    response.success(req, res, data, 200);
  } catch (error) {
    response.error(req, res, error, 500);
  }
});

router.post("/", async (req, res) => {
  try {
    const data = await Controller.upsert(req.body);
    response.success(req, res, data, 200);
  } catch (error) {
    response.error(req, res, error, 500);
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const data = await Controller.remove(id);
    response.success(req, res, data, 200);
  } catch (error) {
    response.error(req, res, error, 500);
  }
});

module.exports = router;
