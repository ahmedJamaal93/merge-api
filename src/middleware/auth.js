const passport = require("passport");
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
import { Roles } from '../resources/roles/roles.model';
import config from '../config';



module.exports = function() {
    var opts = {};
    opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
    opts.secretOrKey = config.secret;
    var strategy = new JwtStrategy(opts, function(payload, done) {
        console.log(payload._id);
        Roles.findOne({ userId: payload._id }, function(err, user) {
            if (err) {
                return done(err, false);
            }
            if (user) {
                console.log(user);
                return done(null, user);
            } else {
                return done(null, false);
                // or you could create a new account
            }
        });
    });
    passport.use(strategy);
    return {
        initialize: function() {
            return passport.initialize();
        },
        authenticate: function() {
            return passport.authenticate("jwt", config.jwtSession);
        }
    };
};