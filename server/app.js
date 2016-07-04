var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

app.use(bodyParser.json());
//enable CORS
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
    next();
});

var User = mongoose.model('User', {
    email: String,
    password: String
})
app.post('/register', function (req, res) {
    var user = req.body;
    var newUser = new User({
        email: user.email,
        password: user.password
    });
    newUser.save(function (err) {
        res.status(200).json(newUser);
    })
});

mongoose.connect('mongodb://localhost/jwt');

var server = app.listen(3000, function () {
    console.log('Server is listening on port', server.address().port);
});