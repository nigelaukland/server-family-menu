const express = require("express");
const router = express.Router();
const errorController = require("../controllers/errors");

router.use("/", errorController.error404);

module.exports = router;
