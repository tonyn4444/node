var express = require('express');
var mongoose = require('mongoose');
var passport = require('passport');
var bodyParser = require('body-parser');
var LocalStrategy = require("passport-local");
var passportLocalMongoose = require("passport-local-mongoose");
var User = require("./models/user");

mongoose.connect('mongodb://localhost/auth_demo_app');

var app = express();

// requiring express-session and then passing the minimum 3 arguments we need
app.use(require("express-session")({
	// 1.this secret can be anything at all (is used to and decode the info from our session)
	secret: "Rusty is the best and cutest dog in the world",
	// 2.
	resolve: false,
	// 3.
	saveUninitialized: false

}));

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));

// call passport methods to set up passport with app
app.use(passport.initialize());
app.use(passport.session());

// These two methods are very important for passport
// They are responsible for reading the info from session and then unencoding (deserialize)
// and taking information from the session and encoding it (serialize)
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// We're able to use (User.serializeUser() & User.deseralizeUser())
// Because we applied passport-mongoose to our schema for the methods

// =======================
//	ROUTES
// =======================

app.get('/', function(req, res) {
	res.render("home");
});

// Show sign-up form
app.get('/register', function(req, res) {
	res.render('register');
});

// handling user sign up
app.post('/register', function(req, res) {
	// we first create a new User and save the user with username to the DB
	// THEN we pass the password param, but we don't want to save the password to DB without encrypting
	User.register(new User({username: req.body.username}), req.body.password, function(err, user) {
		if(err) {
			console.log(err);
			// we have a return statement in order to short-circuit everything
			// if we have an error
			return res.render("register");
		}
		// if there are no errors, we will authenticate the user (log them in)
		// passport will take care of everything for us (e.g. call serialize method, store appropriate information, log user in)
		// specifying that we are using the 'local' strategy for auth
		passport.authenticate("local")(req, res, function(){
			res.redirect('/secret');
		})
	})
});

// LOGIN ROUTES
// render login form
app.get('/login', function(req, res) {
	res.render('login');
});

// login logic
// middleware that tries to log the user in
app.post('/login', passport.authenticate("local", {
	successRedirect: "/secret",
	failureRedirect: "/login"
}), function(req, res) {

});

// LOGOUT ROUTES
app.get('/logout', function(req, res) {
	req.logout();
	res.redirect("/");
});

// 'res.render("secret")' will never run if the get request does not pass the middleware check 
app.get("/secret", isLoggedIn, function(req, res){
	res.render("secret");
});

// Middleware
// checks to see if user is logged in, if they are, run the next action in route (render 'secret')
function isLoggedIn(req, res, next) {
	if(req.isAuthenticated()) {
		return next();
	}
	res.redirect('/login');
}

app.listen(3000, process.env.IP, function() {
	console.log("Server has started");
})