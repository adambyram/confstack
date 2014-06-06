(function(data){
    var seedData = require('./seedData');
    data.getSessions = function (next) {
      next(null, seedData.sessionList);
    };
})(module.exports);
