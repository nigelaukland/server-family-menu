isAuth = (req, res, next) => {
  console.log('check auth here');
  if (!req.session.isAuthenticated) {
    return res.redirect('/login');
  } else {
    next();
  }
};

module.exports = isAuth;