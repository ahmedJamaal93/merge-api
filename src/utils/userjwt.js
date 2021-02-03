const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
import { Agents } from '../resources/agents/agents.model';
import config from '../config';
module.exports = function(passport) {
    var opts = {};
    opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
    opts.secretOrKey = config.secret;
    passport.use(new JwtStrategy(opts, function(jwt_payload, done) {
        return Agents.findOne({ id: jwt_payload.id })
            .then(user => {
                console.log(user);
                return done(null, user);
            })
            .catch(err => {
                return done(err);
            });
    }));
};