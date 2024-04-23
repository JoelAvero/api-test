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

async function getAll(req, res) {
  try {
    const data = await Controller.list();
    response.success(req, res, data, 200);
  } catch (error) {
    response.error(req, res, error, 500);
  }
}

async function getById(req, res) {
  try {
    const id = req.params.id;

    const data = await Controller.getById(id);
    response.success(req, res, data, 200);
  } catch (error) {
    response.error(req, res, error, 500);
  }
}

async function upsert(req, res) {
  try {
    const data = await Controller.upsert(req.body);
    response.success(req, res, data, 200);
  } catch (error) {
    response.error(req, res, error, 500);
  }
}

async function remove(req, res) {
  try {
    const id = req.params.id;
    const data = await Controller.remove(id);
    response.success(req, res, data, 200);
  } catch (error) {
    response.error(req, res, error, 500);
  }
}

module.exports = router;
