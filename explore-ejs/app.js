var express = require("express");
var app = express();

app.use(express.static("public"));
app.set("view engine", "ejs");

app.get('/', function(req, res) {
	res.render('home');
});

app.get('/:user', function(req, res) {
	var user = req.params.user
	res.render('love', { user: user});
});

app.listen(3000, function() {
	console.log("Listening for requests on port 3000!");
});