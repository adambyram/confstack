var http = require('http');
var express = require('express');
var app = express();
var controllers = require('./controllers');

app.set("view engine", "jade");
controllers.init(app);

var server = http.createServer(app);
server.listen(3000);