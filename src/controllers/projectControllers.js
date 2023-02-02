const Todo = require('.././models/Todo')

exports.getAllTodos = async (req, res) => {
	try {
		const limit = req.query?.limit || 5
		const offset = req.query?.offset || 0

		console.log(req.query)
		//nu har vi satt upp en router för denna url.
		const projects = await Todo.find().limit(Number(limit)).skip(Number(offset))
		const totalProjectsInDatabase = await Todo.countDocuments()
		console.log(projects)
		return res.json({
			//istället för att returna responsen så kan vi göra såhär för att skicka tillbaka ett objekt.
			data: projects, //detta ska matcha datan vi vill att användaren ska få tillbaka.
			meta: {
				total: totalProjectsInDatabase, //total project tillgängliga
				limit: limit,
				offset: offset,
				count: projects.length, //så många vi faktiskt fick,
			},
		})
	} catch (error) {
		console.log(error)
		return res.status(500).json({ message: error.message })
	}
}
