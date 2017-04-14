var mongoose = require('mongoose');

mongoose.connect("mongodb://localhost/blog_demo");

// User - email, name
var userSchema = new mongoose.Schema({
	email: String,
	name: String,
	posts: [postSchema]
});

var User = mongoose.model("User", userSchema);

// var newUser = User({
// 	email: "Hermione@hogwarts.edu",
// 	name: "Hermione Granger"
// });

// newUser.posts.push({
// 	title: "How to brew polyjuice potion",
// 	content: "Just kidding. GO to potions class to learn it!"
// });

// newUser.save(function(err, user) {
// 	if(err) {
// 		console.log(err);
// 	} else {
// 		console.log(user);
// 	}
// })

User.findOne({name: "Hermione Granger"}, function(err, user) {
	if(err) {
		// console.log(err);
	} else {
		user.posts.push({
			title: "3 Things I really hate.",
			content: "Voldermort, Voldermort, Voldermort"
		})
		user.save(function(err, user) {
			if(err) {
				console.log(err);
			} else {
				console.log(user);
			}
		});
	}
});


// var newPost = new Post({
// 	title: "Reflections on Apples",
// 	content: "They are delicious."
// });

// newPost.save(function(err, post) {
// 	if(err) {
// 		console.log(err);
// 	} else {
// 		console.log(post);
// 	}
// });