const express = require("express");
const {
  create,
  getAll,
  getById,
  update,
  remove,
} = require("../controllers/crud.controller.js");

const router = express.Router();

router.post("/", create);
router.get("/", getAll);
router.get("/:id", getById);
router.put("/:id", update);
router.delete("/:id", remove);

module.exports = router;
