const express = require("express");

const {
  createData,
  readData,
  updateData,
  deleteData,
  findData,
} = require("../controllers/user_controller");

const router = express.Router();

const family = ""; //"/" // + "family";

router
  .post(family + "/", createData)
  .get(family + "/", readData) //grab every item
  .get(family + "/items/:id", findData) //grab a specific item
  .put(family + "/:id", updateData)
  .delete(family + "/:id", deleteData);

module.exports = router;
