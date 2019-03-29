const express = require("express");
const router = express.Router();
const menuController = require("./../controllers/menus");
const isAuth = require("./../middleware/isAuth");

router.get("/", menuController.getCurrentMenu);

router.get("/menus", menuController.getMenus);

router.get("/menus/add", isAuth, menuController.addMenu);

router.get("/menu/edit/:menuId", isAuth, menuController.getEditMenu);

router.post("/menu", isAuth, menuController.postAddMenu);

router.post("/menu/edit", isAuth, menuController.postEditMenu);

router.get("/menu/delete/:menuId", isAuth, menuController.postDeleteMenu);

module.exports = router;
