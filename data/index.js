(function(data){
    var seedData = require('./seedData');
    var database = require('./database');

    data.getSessions = function (next) {
        database.getDb(function(err, db) {
            if(err) {
                next(err, null);
            } else {
                db.sessions.find({speaker: 'Adam Byram'}).toArray(function (err, results) {
                    if(err) {
                        next(err, null);
                    } else {
                        next(null, results);
                    }
                });
            }
        });

    };

    function seedDatabase() {
        database.getDb(function(err, db) {
           if(err) {
               console.log('Failed to seed database: ' + err);
           } else {
                db.sessions.count(function(err, count) {
                   if(err) {
                       console.log('Failed to get database count: ' + err);
                   } else {
                       if(count === 0) {
                           console.log('Seeding the database...');
                           seedData.sessionList.forEach(function(session) {
                              db.sessions.insert(session, function(err) {
                                 if(err) {
                                     console.log('Failed to insert data in seed database: ' + err);
                                 }
                              });
                           });
                       } else {
                           console.log('Database already seeded.');
                       }
                   }
                });
           }
        });
    };

    seedDatabase();
})(module.exports);
