const express = require("express");
const router = express.Router();
const menuController = require("./../controllers/menus");

router.get("/", menuController.getMenu);

module.exports = router;
