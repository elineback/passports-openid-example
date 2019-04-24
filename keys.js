// add this file to .gitignore

module.exports = {
    google: {
        clientID: '{yourId}',
        clientSecret: '{yourSecret}'
    },
    session: {
        cookieKey: 'SomethingNobodyWillEverGuess'
    },
    oidc: {
        issuer: 'https://your/uri',
        authorizationURL: 'https://your/uri',
        tokenURL: 'https://your/uri',
        userInfoURL: 'https://your/uri',
        clientID: '{yourId}',
        clientSecret: '{yourSecret}',
        callbackURL: 'https://your/uri',
        scope: 'openid profile'
    }
};
