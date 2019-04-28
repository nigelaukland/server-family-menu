const mongoose = require("mongoose");
const Menu = require("./../models/menu");
const DayMenu = require("./../models/dayMenu");

exports.getCurrentMenu = (req, res, next) => {
  Menu.findOne()
    .populate({
      path: "meals",
      populate: {
        path: "morningRecipeId lunchRecipeId dinnerRecipeId"
      }
    })
    .then(menuData => {
      res.status(200).render("menu-home", {
        pageTitle: "Welcome to family menu",
        activePage: "/",
        menu: menuData
      });
    })
    .catch(err => {
      console.log(err);
    });
};

exports.addMenu = (req, res, next) => {
  res.status(200).render("menu-add", {
    pageTitle: "Add a new menu",
    activePage: "/menus"
  });
};

exports.getMenus = (req, res, next) => {
  Menu.find()
    .then(menusData => {
      res.status(200).render("menus", {
        pageTitle: "Family Menu : Your menus",
        activePage: "/menus",
        menus: menusData
      });
    })
    .catch(err => {
      console.log(err);
    });
};

exports.postAddMenu = (req, res, next) => {
  const name = req.body.name;
  const startDate = req.body.startDate;

  // create a default empty dayMenu for the start of the menu
  const dayMenu = new DayMenu({ startDate: startDate });
  
  // save the default dayMenu and then save the menu
  dayMenu
  .save()
  .then(doc => {
    console.log(`Saved default dayMenu for ${startDate}`);

    // now save the menu with the default dayMenu
    const meals = [ dayMenu._id ]; 
    const menu = new Menu({ name: name, startDate: startDate, meals: meals });
    menu
      .save()
      .then(res => {
        console.log(`Saved menu ${name}`);
      });
  })
  .catch(err => {
    console.log(err)
  });

  res.redirect("/");
};

exports.getEditMenu = (req, res, next) => {
  const menuId = req.params.menuId;
  Menu.findById(menuId).then(menu => {
    res.status(200).render("menu-edit", {
      pageTitle: "Edit menu",
      activePage: "/menus",
      menu: menu,
      csrfToken: req.csrfToken()
    });
  });
};

exports.postEditMenu = (req, res, next) => {
  const _id = req.body._id;
  const name = req.body.name;
  const startDate = req.body.startDate;
  const dayMenu1 =
    req.body.dayMenu1 === ""
      ? undefined
      : mongoose.Types.ObjectId(req.body.dayMenu1);
  const dayMenu2 =
    req.body.dayMenu2 === ""
      ? undefined
      : mongoose.Types.ObjectId(req.body.dayMenu2);

  Menu.findById(_id)
    .then(menu => {
      menu.name = name;
      menu.startDate = startDate;
      menu.meals[0] = dayMenu1;
      menu.meals[1] = dayMenu2;
      menu.markModified("meals");
      return menu.save();
    })
    .then(res => {
      console.log(`Edited menu: ${name}`);
    })
    .catch(err => {
      console.log(err);
    });
  res.redirect("/menus");
};

exports.postDeleteMenu = (req, res, next) => {
  const menuId = req.params.menuId;
  Menu.findByIdAndDelete(menuId)
    .then(res => {
      console.log(`Deleted menu ${menuId}`);
    })
    .catch(err => {
      console.log(err);
    });
  res.redirect("/menus");
};
