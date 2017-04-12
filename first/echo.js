function echo(phrase, num) {
	for (i = 0; i < num; i++) {
		console.log(phrase);
	};
}

function average(scores) {
	var sum = scores.reduce(function(total, val) {
		return total + val
	});

	return Math.round(sum / scores.length);
}

var scores = [90, 98, 89, 100, 100, 86, 94]

console.log(average(scores));

