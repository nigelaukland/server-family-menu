exports.getLogin = (req, res, next) => {
  res.status(200).render("login", {
    pageTitle: "Login",
    activePage: "/login"
  });
};

exports.postLogin = (req, res, next) => {
  req.session.isLoggedIn = true;
  res.redirect('/');
};