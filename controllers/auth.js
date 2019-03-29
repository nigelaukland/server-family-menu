const User = require("./../models/user");
const bcrypt = require("bcryptjs");

exports.getLogin = (req, res, next) => {
  res.status(200).render("login", {
    pageTitle: "Login",
    activePage: "/login",
    isAuthenticated: req.session.isAuthenticated,
    csrfToken: req.csrfToken()
  });
};

exports.postLogin = (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  User.findOne({ email: email }).then(userDoc => {
    if (userDoc) {
      bcrypt.compare(password, userDoc.password).then(result => {
        if (result) {
          console.log(`User ${email} logged in`);
          req.session.isAuthenticated = true;
          req.session.user = userDoc;
          return req.session.save(() => {
            res.redirect("/");
          });
        } else {
          console.log(`User ${email} password not valid`);
          return res.redirect("/login");
        }
      });
    } else {
      console.log(`User ${email} not found`);
      return res.redirect("/signup");
    }
  });
};

exports.getSignUp = (req, res, next) => {
  res.status(200).render("signup", {
    pageTitle: "Signup",
    activePage: "/signup",
    isAuthenticated: req.session.isAuthenticated,
    csrfToken: req.csrfToken()
  });
};

exports.postSignUp = (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  const confirmPassword = req.body.confirmPassword;
  User.findOne({ email: email })
    .then(userDoc => {
      if (userDoc) {
        console.log(`User ${email} already present`);
        return res.redirect("/login");
      }
      const newUser = new User({
        email: email,
        password: bcrypt.hashSync(password, 12)
      });
      return newUser.save().then(result => {
        console.log(`Created user ${newUser.email}`);
        res.redirect("/login");
      });
    })
    .catch(err => {
      console.log(err);
    });
};

exports.postLogout = (req, res, next) => {
  req.session.isAuthenticated = false;
  return req.session.destroy(() => {
    console.log(`User logged out`);
    res.redirect("/");
  });
};
