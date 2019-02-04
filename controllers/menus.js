exports.getMenu = (req, res, next) => {
  res.status(200).render('menu-home', {
    pageTitle : "Welcome to family menu",
    activePage : "/"
  })
};