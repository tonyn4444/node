var express = require("express");
var app = express();

// Routes

app.get("/", function(req, res) {
	res.send("Hi there, welcome to my assignment!");
})

app.get("/speak/:animal", function(req, res) {
	var sounds = {
		dog: "woof",
		cat: "meow",
		cow: "moo",
		goldfish: "..."
	};

	var animal = req.params.animal;
	var sound = "";
	
	res.send("The " + animal + " says " + sounds[animal]);
});

app.get("/repeat/:phrase/:num", function(req, res) {
	var phrase = req.params.phrase;
	var fullResponse = ""
	var num = Number(req.params.num);
	for (var i = 0; i < num; i++) {
		fullResponse = fullResponse + " " + phrase;
	}
	res.send(fullResponse);
})

app.get("*", function(req, res) {
	res.send("Sorry, page not found...What are you doing with your life?");
});

app.listen(3000, function() {
	console.log("Server listening on port 3000");
});