const User = require('./../models/user');

exports.getLogin = (req, res, next) => {
  res.status(200).render("login", {
    pageTitle: "Login",
    activePage: "/login"
  });
};

exports.postLogin = (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  User.findOne({email: email, password: password})
    .then(userDoc => {
      if (userDoc) {
        console.log(`User ${email} found`);
        req.session.isLoggedIn = true;
        req.session.user = userDoc;
        return req.session.save(() => {
          console.log(`User ${email} logged in`);
          res.redirect('/');
        });
      } else {
          console.log(`User ${email} credentials invalid`);
          return res.redirect('/login');
      }
    });
};

exports.getSignUp = (req, res, next) => {
  res.status(200).render("signup", {
    pageTitle: "Signup",
    activePage: "/signup"
  });
};

exports.postSignUp = (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  const confirmPassword = req.body.confirmPassword;
  User.findOne({email: email})
    .then(userDoc => {
      if (userDoc) {
        console.log(`User ${email} already present`);
        return res.redirect('/login');
      }
      const newUser = new User({
        email: email,
        password: password
      });
      return newUser.save()
      .then(result => {
        console.log(`Created user ${newUser.email}`);
        res.redirect('/login');
      })
    })
    .catch(err => {
      console.log(err);
    });
};