var router = require('express').Router(),
    passports = require("./passports");


router.get("/login", passports.middleware("authenticate", "basic", {
    successRedirect: "/auth/test",
}));

router.get("/google/login", passports.middleware("authenticate", "google", {
    successRedirect: "/auth/test", scope: ['profile'],
}));

router.get("/google/redirect", function (req, res) {
    res.send("Hello");
})

router.get("/oidc/login", passports.middleware("authenticate", "oidc", {

}))

router.get("/", function(req, res, next) {
    if (!req.user) {
        return res.redirect("/auth/login");
    }

    return res.send("hello, " + JSON.stringify(req.user));
});

router.get("/test", function (req, res) {
    res.send("yo yo");
})

module.exports = router