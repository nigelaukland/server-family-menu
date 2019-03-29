const User = require('./../models/user');
const bcrypt = require('bcryptjs');

exports.getLogin = (req, res, next) => {
  res.status(200).render('login', {
    pageTitle: 'Login',
    activePage: '/login'
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
          req.session.user = userDoc;
          req.session.isAuthenticated = true;
          return req.session.save(() => {
            res.redirect('/');
          });
        } else {
          console.log(`User ${email} password not valid`);
          return res.redirect('/login');
        }
      });
    } else {
      console.log(`User ${email} not found`);
      req.flash('error', `User ${email} not found - please register an account below.`);
      req.flash('email', email);
      return res.redirect('/signup');
    }
  });
};

exports.getSignUp = (req, res, next) => {
  let message = req.flash('message');
  let error = req.flash('error');

  if (message.length > 0) {
    message = message[0];
  } else {
    message = null;
  };
  if (error.length > 0) {
    error = error[0];
  } else {
    error = null;
  };
  res.status(200).render('signup', {
    pageTitle: 'Signup',
    activePage: '/signup',
    error: error,
    message: message,
    email: req.flash('email')
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
        return res.redirect('/login');
      }
      const newUser = new User({
        email: email,
        password: bcrypt.hashSync(password, 12)
      });
      return newUser.save().then(result => {
        console.log(`Created user ${newUser.email}`);
        res.redirect('/login');
      });
    })
    .catch(err => {
      console.log(err);
    });
};

exports.postLogout = (req, res, next) => {
  return req.session.destroy(() => {
    console.log(`User logged out`);
    res.redirect('/');
  });
};
