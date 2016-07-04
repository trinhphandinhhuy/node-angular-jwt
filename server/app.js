var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var User = require('./models/User');
var jwt = require('jwt-simple');

//var jwt = require('./services/jwt');

app.use(bodyParser.json());
//enable CORS
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
    next();
});


app.post('/register', function (req, res) {
    var user = req.body;
    var newUser = new User({
        email: user.email,
        password: user.password
    });
    
    var payload = {
        iss: req.hostname,
        sub: newUser.id
    }
    
    var token = jwt.encode(payload, 'shhh');
    newUser.save(function (err) {
        res.status(200).send({
            user : newUser.toJSON(),
             token: token});
    })
});

app.get('/login', function (req, res) {
    req.user = req.body;
    User.findOne({email: req.user.email}, function (err, user) {
        if(err) throw err;
        
        user.comparePasswords(req.user.password, function (err, isMatch) {
            if(err) throw err;
            
        });
    });
});

var jobs = [
    'Docter',
    'Teacher',
    'Engineer',
    'Developer'
];

app.get('/jobs', function (req,res){
    
    if(!req.headers.authorization){
        return res.status(401).json({message: 'You are not authorized'});
    }
    var token = req.headers.authorization.split(' ')[1];
    var payload = jwt.decode(token,'shhh');

    
    if(!payload.sub){
        return res.status(401).send({message: 'Authentication failed'});    
    }
    
    
    res.json(jobs);
});

mongoose.connect('mongodb://localhost/jwt');



var server = app.listen(3000, function () {
    console.log('Server is listening on port', server.address().port);
});