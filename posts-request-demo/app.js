var express = require('express');
var app = express();
var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({extended: true}));

app.use(express.static('public'));
app.set('view engine', 'ejs');

var friends = ['.', 'Tom', 'Jim', 'Jason', '.'];


app.get('/', function(req, res) {
	res.render('home');
});

app.post('/addfriend', function(req, res) {
	var newFriend = req.body.newfriend;
	friends.push(newFriend);
	res.redirect('friends');
});

app.get('/friends', function(req, res) {
	res.render('friends', {friends: friends});
})

app.listen(3000, function() {
	console.log("Server listening on PORT:3000!")
})