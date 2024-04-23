const express = require("express");
const response = require("../../../network/response");
const Controller = require("./index");
const secure = require("./secure");

const router = express.Router();

router.get("/", getAll);
router.get("/:id", getById);
router.post("/", upsert);
router.put("/", secure("update"), upsert);
router.delete("/:id", remove);

async function getAll(req, res, next) {
  try {
    const data = await Controller.lisst();
    response.success(req, res, data, 200);
  } catch (error) {
    next(error);
  }
}

async function getById(req, res, next) {
  try {
    const id = req.params.id;

    const data = await Controller.getById(id);
    response.success(req, res, data, 200);
  } catch (error) {
    next(error);
  }
}

async function upsert(req, res, next) {
  try {
    const data = await Controller.upsert(req.body);
    response.success(req, res, data, 200);
  } catch (error) {
    next(error);
  }
}

async function remove(req, res, next) {
  try {
    const id = req.params.id;
    const data = await Controller.remove(id);
    response.success(req, res, data, 200);
  } catch (error) {
    next(error);
  }
}

module.exports = router;
