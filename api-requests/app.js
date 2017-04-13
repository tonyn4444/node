var request = require('request');

request('https://www.reddit.com/api/info.json', function(error, response, body) {
	var parserdData = JSON.parse(body);
	console.log(parserdData.kind);
});