(function(controllers) {
    var homeController = require("./homeController");
    var sessionsController = require('./sessionsController');

    controllers.init = function(app) {
        homeController.init(app);
        sessionsController.init(app);
    }

})(module.exports);