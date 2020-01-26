var express = require('express');
var bodyparser = require('body-parser');
var routes = require('./routes/routes.js');
var path = require('path');

var app=express();

app.set('views/pages',path.join(__dirname,'views/pages'));
app.engine('html',require('ejs').renderFile);
app.set('view engine','html');

app.use(bodyparser.json());
app.use('/',routes);

app.listen(2000,function(){
  console.log('Server Started on Port 2000 ');
});