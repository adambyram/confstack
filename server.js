var http = require('http');
var express = require('express');
var app = express();
var controllers = require('./controllers');
var bodyParser = require('body-parser');
var flash = require('connect-flash');
var session = require('express-session');
var RedisStore = require('connect-redis')(session);
var cookieParser = require('cookie-parser');
var responseTime = require('response-time');

app.set("view engine", "jade");
app.use(express.static(__dirname + '/public'));
app.use(bodyParser());
app.use(cookieParser());

if(process.env.REDISTOGO_URL) {
    var rtg   = require("url").parse(process.env.REDISTOGO_URL);
    var redis = require("redis").createClient(rtg.port, rtg.hostname);
    redis.auth(rtg.auth.split(":")[1]);
    app.use(session({ store: new RedisStore({ client: redis }), secret: "Cats are awesome."}));
} else {
    app.use(session({ store: new RedisStore({ url: "redis://localhost:6379" }), secret: "Cats are awesome."}));
}

app.use(flash());
app.use(responseTime(3));

controllers.init(app);


var server = http.createServer(app);
server.listen(process.env.PORT || 3000);