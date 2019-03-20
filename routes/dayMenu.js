const express = require("express");
const router = express.Router();
const dayMenuController = require("./../controllers/dayMenus");

router.get("/dayMenus/add", dayMenuController.addDayMenu);

router.post("/dayMenu", dayMenuController.postAddDayMenu);

module.exports = router;
