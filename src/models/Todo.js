const mongoose = require('mongoose') //importera mongoose

const TodoSchema = new mongoose.Schema( //skapa mongoose schema. /namnet här ska alltid vara singular och inte plural, annars ändrar mongoDB det.
	{
		todo: {
			type: String,
			required: true, //måste skicka med en string
			minlength: 3, //minst 3 tecken
			maxlength: 100, //max 100 tecken
		},
		done: {
			type: Boolean,
		},
	},
	{ timestamps: true }
)

const PrivateSchema = new mongoose.Schema({
	homeTasks: {
		type: String,
	},
})
const WorkSchema = new mongoose.Schema({
	workTasks: {
		type: String,
	},
})

module.exports = mongoose.model('Todo', TodoSchema) //koppla ihop schemat. Gör om vårat schema till en model och exporterar den.
// module.exports = mongoose.model('Home', PrivateSchema)
// module.exports = mongoose.model('Work', WorkSchema)
