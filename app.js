//jshint esversion:6
require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const ejs = require('ejs');
const mongoose = require('mongoose');
const encrypt = require('mongoose-encryption');

const app = express();


app.use(express.static('public'));
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({
  extended: true
}));



//mongoose,mongo
mongoose.connect('mongodb://localhost:27017/userDB', {useNewUrlParser: true, useUnifiedTopology: true});


//mongoose schema
const userSchema = new mongoose.Schema({
  user: String,
  password: String
});

//mongoose encrypt , add before model
const secret = process.env.SECRET;
userSchema.plugin(encrypt, {secret: secret, encryptedFields: ['password']});

//mongoose model
const User = mongoose.model('User', userSchema);
//mongoose doc
const point1 = new User ({
  user: 'Test',
  password: 'fart2'
});
// point1.save();




//Home Page
app.route('/')

.get(function(req,res){
  res.render('home');
})

.post();



//Login
app.route('/login')
.get(function(req,res){
  res.render('login');
})
.post(function(req,res){
  const username = req.body.username;
  const password = req.body.password;

  User.findOne({user: username}, function(err,foundUser){
    if (foundUser.user === username && foundUser.password === password){
      res.render('secrets');
    } else {
      console.log(err);
      res.send('No such found on this time of hither here now!');
    }
  });

});





//Register
app.route('/register')
.get(function(req,res){
  res.render('register');
})
.post(function(req,res){
  const newUser = new User ({
    user: req.body.username,
    password: req.body.password
  });
  newUser.save(function(err){
    if(err){
      console.log(err);
    } else {
      res.render('secrets');
    }
  });

});




//Secrets
app.route('/secrets')
//no get request because we don't want them getting in this way

.post();




//Submit
app.route('/submit')

.get(function(req,res){
  res.render('submit');
})

.post();







app.listen(3000, function(req,res){
  console.log('Server running on port 3000');
});
