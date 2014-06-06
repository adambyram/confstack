(function (homeController) {
    var jade = require('jade');
    homeController.init = function(app) {
        app.get('/', function(req, res) {
            //res.send('<html><body><h1>' + req.url + '</h1></body></html>');
            var widgetNames = ['W1', 'W2', 'W3'];
            var widgets = [];
            widgetNames.map(function (widgetName) {
                jade.renderFile('views/_widget.jade', { widgetName: widgetName }, function(err, html) {
                    widgets.push(html);
                });
            })
            res.render('index', { title: 'Example Node.js App', widgets: widgets });
        });

        app.get('/api/users', function(req, res) {
            res.set('Content-Type', 'application/json');
            res.send({ name: 'Adam', isValid: true, group: 'Admin' });
        });
    };

})(module.exports);
