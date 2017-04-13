var express = require("express");
var app = express();

app.get("/", function(req, res) {
	res.send("Hi there!");
})

app.listen(3000, function() {
	console.log("Express app listening on port 3000!");
})