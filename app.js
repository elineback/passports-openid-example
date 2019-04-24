#!/usr/bin/env node

const   express = require("express")
const   passports = require("./passports")
const   winston = require('winston')
const   expressWinston = require('express-winston')
const   cookieParser = require('cookie-parser')
const   session = require('express-session')
const   routes = require('./routes')
const   notFoundMiddleware = require('./not-found-handler')

const app = express()

// express-winston logger makes sense BEFORE the router
app.use(expressWinston.logger({
    transports: [
        new winston.transports.Console()
    ],
    format: winston.format.combine(
        winston.format.colorize(),
        winston.format.json()
    )
}));
app.use(cookieParser());
app.use(session({secret: "keyboard cat"}));
app.use(passports.attach());
app.use(passports.middleware("initialize"));
app.use(passports.middleware("session"));

var apiRouter = new express.Router()
apiRouter.use('/auth', routes, notFoundMiddleware())

app.use('/', apiRouter)

app.listen(3000, function() {
  console.log("listening");
});
