const express = require("express");
const router = express.Router();
const menuController = require("./../controllers/menus");

router.get("/", menuController.getCurrentMenu);

router.get("/menus", menuController.getMenus);

router.get("/menus/add", menuController.addMenu);

router.get("/menu/edit/:menuId", menuController.getEditMenu);

router.post("/menu", menuController.postAddMenu);

router.post("/menu/edit", menuController.postEditMenu);

router.get("/menu/delete/:menuId", menuController.postDeleteMenu);

module.exports = router;
