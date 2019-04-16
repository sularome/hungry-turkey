var express = require('express'),
  app = express(),
  port = process.env.PORT || 5005,
  mongoose = require('mongoose'),
  Ingredient = require('./api/models/ingredientListModel'), //created model loading here
  Recipe = require('./api/models/recipeListModel'), //created model loading here
  Unit = require('./api/models/unitListModel'), //created model loading here
  bodyParser = require('body-parser');
  
// mongoose instance connection url connection
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/ydietdb'); 


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
app.options("/*", function(req, res, next){
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');
    res.sendStatus(200);
});
var ingredientRoutes = require('./api/routes/ingredientListRoutes');
ingredientRoutes(app);
var recipeRoutes = require('./api/routes/recipeListRoutes');
recipeRoutes(app);
var unitRoutes = require('./api/routes/unitListRouter');
unitRoutes(app);
app.use(function(req, res) {
    res.status(404).send({url: req.originalUrl + ' not found'})
});
app.listen(port);


console.log('todo list RESTful API server started on: ' + port);