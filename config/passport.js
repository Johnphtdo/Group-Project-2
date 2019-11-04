const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const db = require("../models");

// Serialize Sessions
passport.serializeUser(function(user_name,done){
    done(null,user_name);
});

// Deserialize Sessions
passport.deserializeUser(function(user_name,done){
    db.Users.findOne({where: {id: user_name.id}}).success(function(user_name){
            done(null,user)
        }).error(function(err){
                done(err,null)
            });
        });
            
// For Authentication
passport.use(new LocalStrategy(
    function(user_name, password, done){
        db.Users.findOne({where: {user_name: user_name}}).success(function(user){
            if (!user) {
                console.log('Unknown Username');
          return done(null, false, { message: 'Unknown Username' });
              } else {
                bcrypt.compare(userPW, user.password, function(err, result) {
                  if (result == true) {
                      console.log("Password Matched")
                    return done(null, user_name);
                  } else {
                      console.log("Incorrect Password")
                    return done(null, false, { message: 'Incorrect Password' });

                  }
                });
              }
        })

    }

))

        