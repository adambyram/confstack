(function (homeController) {
    var jade = require('jade');
    var data = require('../data');
    homeController.init = function(app) {

        app.get('/', function(req, res) {
            res.render('index', { path: 'home' });
        });

        app.get('/sessions', function(req, res) {
            data.getSessions(function(err, sessions) {
                var error = req.flash('errorMessage');
                sessions.forEach(function(session) {
                   session.rawLink = '/api/sessions/' + session.title;
                });
                res.render('sessionList', {title: 'Current Session List', sessions: sessions, error: error, path: 'sessions' });
            })
        });

        app.post('/newSession', function(req, res) {
            var sessionTitle = req.body.sessionTitle;
            var sessionSpeaker = req.body.sessionSpeaker;
            data.createSession(sessionTitle, sessionSpeaker, function(err) {
                if(err) {
                    console.log(err);
                    req.flash('errorMessage', err.message);
                    res.redirect('/sessions');
                } else {
                    res.redirect('/sessions');
                }
            });

        });
    };
})(module.exports);
