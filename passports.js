var Passports = require("passports"),
    BasicStrategy = require("passport-http").BasicStrategy,
    GoogleStrategy = require('passport-google-oauth20').Strategy,
    keys = require('./keys'),
    Passport = require("passport").Passport,
    OidcStrategy = require('passport-openidconnect').Strategy;

var passports = new Passports

passports._getConfig = function _getConfig(req, cb) {
    return cb(null, req.host, {
        realm: req.host,
    });
};

passports._createInstance = function _createInstance(options, cb) {
    var instance = new Passport();

    instance.use("basic", new BasicStrategy(options, function(name, password, done) {
        return done(null, {name: name});
    }));

    instance.use("google",
        new GoogleStrategy({
            // options for google strategy
            clientID: keys.google.clientID,
            clientSecret: keys.google.clientSecret,
            callbackURL: "/auth/google/redirect"
        }, function(accessToken, refreshToken, profile, done) {
            console.log("user is: ", profile);
            done(null, profile);
        })
    );

    instance.use(
        'oidc',
        new OidcStrategy(
            {
                issuer: keys.oidc.issuer,
                authorizationURL: keys.oidc.authorizationURL,
                tokenURL: keys.oidc.tokenURL,
                userInfoURL: keys.oidc.userInfoURL,
                clientID: keys.oidc.clientID,
                clientSecret: keys.oidc.clientSecret,
                callbackURL: keys.oidc.callbackURL,
                scope: keys.oidc.scope
            },
            (issuer, sub, profile, accessToken, refreshToken, done) => {
                return done(null, profile)
            }
        )
    )

    instance.serializeUser(function(user, cb) {
        user.realm = options.realm;

        cb(null, JSON.stringify(user));
    });

    instance.deserializeUser(function(id, cb) {
        cb(null, JSON.parse(id));
    });

    cb(null, instance);
};

module.exports = passports