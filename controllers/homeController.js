(function (homeController) {
    var jade = require('jade');
    var data = require('../data');
    homeController.init = function(app) {
        app.get('/sessions', function(req, res) {
            data.getSessions(function(err, sessions) {
                res.render('sessionList', {title: 'Current Session List', sessions: sessions});
            })
        });
    };
})(module.exports);
