// express built in
const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
const multer = require("multer");
const sharp = require("sharp");
const session = require("express-session");
const MongoDBStore = require('connect-mongodb-session')(session);
const mongoose = require("mongoose");
const app = express();
const store = new MongoDBStore({
  uri: 'mongodb://localhost:27017/family-menu',
  collection: 'sessions'
});
const csrf = require('csurf');
const flash = require('connect-flash'); 

// import routes
const menuRoutes = require("./routes/menu");
const dayMenuRoutes = require("./routes/dayMenu");
const recipeRoutes = require("./routes/recipe");
const authRoutes = require("./routes/auth");
const errorRoutes = require("./routes/error");

// configure csrf (cross site request forgery) protection
const csrfProtection = csrf();

// configure file storage for multer
const multerStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'images/')
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`)
  }
});

// set express variables
app.set("view engine", "ejs");
app.set("views", "views");

// Set up express middlewares
/// file serving
app.use(express.static(path.join(__dirname, "public")));
app.use('/images', express.static(path.join(__dirname, "images")));

/// request parsing
app.use(bodyParser.urlencoded({ extended: true }));

/// deal with image upload and processing on sepcific routes
//app.post("/recipe", multer({ storage: multerStorage }).single('imagePath'));
app.post("/recipe", multer({ storage: multerStorage }).single('imagePath'), (req, res, next) => { 
  
  // add the filenames to the body
  req.body.tinyImagePath = path.join(req.file.destination, `tiny_${req.file.filename}`);
  req.body.mediumImagePath = path.join(req.file.destination, `medium_${req.file.filename}`);
  
  const inputImage = sharp(req.file.path);
  // create tiny 80px image
  inputImage
    .clone()
    .resize( 80, 80, { fit: 'contain', position: 'left top' })
    .toFile(path.join(req.file.destination, `tiny_${req.file.filename}`))
    .then(() => {
    })
    .catch((err) => {
      console.log(err)
      throw err
    });
  // create medium 300px image
  inputImage
    .clone()
    .resize( 300, 300, { fit: 'contain', position: 'left top' })
    .toFile(path.join(req.file.destination, `medium_${req.file.filename}`))
    .then(() => {
    })
    .catch((err) => {
      console.log(err)
      throw err
    });
  next();
});

/// sessions
app.use(
  session({ 
    secret: "whitey2020", 
    resave: false, 
    saveUninitialized: false,
    store: store
   })
);

/// add flash middleware to pass transient messages to views
app.use(flash());

/// add CSRF check middleware
app.use(csrfProtection);

/// add middleware that defines local variables for each and every view
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
