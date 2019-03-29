exports.error404 = (req, res, next) => {
  res.status(404).render("404", {
    pageTitle: "Page not found",
    requestedRoute: req.url,
    activePage: "404"
  });
};
