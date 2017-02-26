//Dependencies

var express = require('express');
var expresshb = require('express-handlebars');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var request = require('request');
var cheerio = require('cheerio');
var morgan = require('morgan');

//Import Models
var Comment = require('./models/Comment.js');
var Article = require('.models/Article.js');

//init express
var app = express();
app.use(logger('dev'));
app.use(bodyParser.urlencoded({
    extended:false
}))

//static content

app.engine('handlebars', 'expresshb'({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

//Database with mongoose
if(process.env.NODE_ENV == 'production'){
    mongoose.connect('mongodb://heroku_6vhzftzh:4gjvgve4871g1mbqrbbkm237n7@ds161029.mlab.com:61029/heroku_6vhzftzh')
} else{
    mongoose.connect('mongodb://localhost/scraper');
}
var db = mongoose.connection;

//show errors
db.on('error', function(err){
    console.log (err);
});

//if logged in show success message
db.once('open', function(){
    console.log('Mongoose connection successful!');
});

//import routes & controller
var router = require('./controllers/controller.js');
app.use('/', router);

//Launch app
var port = process.env.PORT || 3000;
app.listen(port, function(){
    console.log('listening on port: ' + port);
});