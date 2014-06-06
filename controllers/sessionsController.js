(function(sessionsController) {

    var data = require('../data');

    sessionsController.init = function(app) {
        app.get('/api/sessions/:sessionTitle', function(req, res) {
            var sessionTitle = req.params.sessionTitle;
            data.getSessionDetail(sessionTitle, function(err, session) {
                if(err) {
                    res.send(400, err);
                } else {
                    res.set('Content-Type', 'application/json');
                    res.send(session);
                }
            });
        });
    };

})(module.exports);
