const mongoose = require('mongoose')
const { userRoles } = require('../constants/users') //importera rollerna

const UserSchema = new mongoose.Schema({
	//schema med username, email, password och roll (roll importerad)
	username: {
		type: String,
		unique: true,
		required: true,
		minlength: 3,
		maxlength: 50,
	},
	email: {
		type: String,
		unique: true,
		required: true,
	},
	password: {
		type: String,
		required: true,
		minlength: 6,
	},
	role: {
		type: String,
		enum: Object.keys(userRoles), //måste välja mellan en av dom (vad gör keys)
		default: userRoles.USER, //default är den vanlig user.
	},
})

module.exports = mongoose.model('User', UserSchema)
