// express built in
const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
const session = require("express-session");
const MongoDBStore = require('connect-mongodb-session')(session);
const mongoose = require("mongoose");
const app = express();
const store = new MongoDBStore({
  uri: 'mongodb://localhost:27017/family-menu',
  collection: 'sessions'
});
const csrf = require('csurf');

// database connections using mongo
// const mongoConnect = require("./utils/database").mongoConnect;
// const dbConnect = require("./utils/database").dbConnect;

// import routes
const menuRoutes = require("./routes/menu");
const dayMenuRoutes = require("./routes/dayMenu");
const recipeRoutes = require("./routes/recipe");
const authRoutes = require("./routes/auth");
const errorRoutes = require("./routes/error");

// configure csrf protection
const csrfProtection = csrf();

// set express variables
app.set("view engine", "ejs");
app.set("views", "views");

// Set up express middlewares
app.use(express.static(path.join(__dirname, "public")));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  session({ 
    secret: "whitey2020", 
    resave: false, 
    saveUninitialized: false,
    store: store
   })
);

app.use(csrfProtection);

// add middleware that defines local variables for each and every view
app.use((req, res, next) => {
  res.locals.isAuthenticated = req.session.isAuthenticated;
  res.locals.csrfToken = req.csrfToken();
  next();
});

// Register the routes
app.use(menuRoutes);
app.use(dayMenuRoutes);
app.use(recipeRoutes);
app.use(authRoutes);
app.use(errorRoutes);

mongoose
  .connect('mongodb://localhost:27017/family-menu')
  .then(result => {
    app.listen(3000);
  })
  .catch(err => {
    console.log(err);
    throw err;
  });
