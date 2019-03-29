const express = require("express");
const router = express.Router();
const dayMenuController = require("./../controllers/dayMenus");
const isAuth = require("./../middleware/isAuth");

router.get("/dayMenus/add", isAuth, dayMenuController.addDayMenu);

router.post("/dayMenu", dayMenuController.postAddDayMenu);

module.exports = router;
