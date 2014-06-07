(function(database) {
    var mongodb = require('mongodb');
    var mongoUrl = process.env.MONGOHQ_URL || 'mongodb://localhost:27017/confstack';
    var theDb = null;
    database.getDb = function (next) {
        if(!theDb) {
            mongodb.MongoClient.connect(mongoUrl, function(err, db) {
               if(err) {
                   next(err);
               } else {
                   theDb = {
                       db: db,
                       sessions: db.collection('sessions')
                   };
                   next(null, theDb);
               }
            });
        } else {
            next(null, theDb);
        }
    };
})(module.exports);