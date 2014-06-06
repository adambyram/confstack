var http = require('http');
var express = require('express');
var app = express();
var controllers = require('./controllers');
var bodyParser = require('body-parser');
var flash = require('connect-flash');
var session = require('express-session');
var cookieParser = require('cookie-parser');

app.set("view engine", "jade");
app.use(express.static(__dirname + '/public'));
app.use(bodyParser());
app.use(cookieParser());
app.use(session({ secret: "Cats are awesome."}));
app.use(flash());

controllers.init(app);


var server = http.createServer(app);
server.listen(3000);