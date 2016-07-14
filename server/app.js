var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var User = require('./models/User');
var jwt = require('jwt-simple');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var flash = require('connect-flash');



//var jwt = require('./services/jwt');

app.use(bodyParser.json());
//use Passport
app.use(passport.initialize());

passport.serializeUser(function (user, done) {
    done(null, user.id);
});



//enable CORS
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
    next();
});

//setup local strategy for Passport

var strategyOptions = { usernameField: 'email' };

var strategy = new LocalStrategy(strategyOptions, function (email, password, done) {
    var searchUser = { email: email };
    User.findOne(searchUser, function (err, user) {
        if (err) return done(err);

        if (!user) {
            return done(null, false, { message: 'Wrong email' });
        }

        user.comparePasswords(password, function (err, isMatch) {
            if (err) return done(err);
            if (!isMatch) {
                return done(null, false, { message: 'Wrong password' });
            }

            return done(null, user);
        });
    });
});

var registerStrategy = new LocalStrategy(strategyOptions, function (email, password, done) {
        
       var newUser = new User({
            email: email,
            password: password
        });

        newUser.save(function (err) {
            if (err) return done(null, false, { message: 'Email already existed' });
            done(null, newUser);
        });

});

passport.use('local-login', strategy);
passport.use('local-register', registerStrategy);


app.post('/register', function (req, res, next) {

    passport.authenticate('local-register', function (err, user, info) {
        if(!user) return res.status(401).json(info);
        createSendToken(user, res);

    })(req, res, next);

});

app.post('/login', function (req, res, next) {

    passport.authenticate('local-login', function (err, user, info) {
        if (err) next(err);
        if (!user) {
            return res.status(401).json(info);
        }
        req.login(user, function (err) {
            if (err) return res.status(401).json(info);
            createSendToken(user, res);
        })
    })(req, res, next);

});

function createSendToken(user, res) {
    var payload = {
        //iss: req.hostname,
        sub: user.id
    }

    var token = jwt.encode(payload, 'shhh');
    res.status(200).send({
        user: user.toJSON(),
        token: token
    });
}

var jobs = [
    'Docter',
    'Teacher',
    'Engineer',
    'Developer'
];

app.get('/jobs', function (req, res) {

    if (!req.headers.authorization) {
        return res.status(401).json({ message: 'You are not authorized' });
    }
    var token = req.headers.authorization.split(' ')[1];
    var payload = jwt.decode(token, 'shhh');


    if (!payload.sub) {
        return res.status(401).send({ message: 'Authentication failed' });
    }


    res.json(jobs);
});

mongoose.connect('mongodb://localhost/jwt');



var server = app.listen(3000, function () {
    console.log('Server is listening on port', server.address().port);
});