// express built in
const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');

const app = express();

const menuRoutes = require('./routes/menu');
const recipeRoutes = require('./routes/recipe');
const errorRoutes = require('./routes/error');

// set express variables
app.set('view engine', 'ejs');
app.set('views', 'views');

// Set up express middlewares
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({extended: true}));

// Set up routes
app.use(menuRoutes);
app.use(recipeRoutes);
app.use(errorRoutes);

app.listen(3000);