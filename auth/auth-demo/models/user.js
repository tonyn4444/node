var mongoose = require("mongoose");
var passportLocalMongoose = require("passport-local-mongoose");

var UserSchema = new mongoose.Schema({
	username: String,
	password: String
});

// set up our schema with passportLocalMongoose
// this gives our User model the necessary methods
UserSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("User", UserSchema);
