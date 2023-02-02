const Todo = require('../models/Todo')

exports.getAllTodos = async (req, res, next) => {
	//throw new Error('Fel!!!') //kommentera ut denna för att tvinga felmedelande. Detta hör ihop med app.use error i app.js
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
}

exports.getTodoById = async (req, res, next) => {
	//exempel http://localhost:4000/api/v1/projects/63d8fcf3e7bf7db6630f4126
	// try {
	//throw new Error('fel id')
	const projectId = req.params.projectId

	const project = await Todo.findById(projectId)

	if (!project) return res.sendStatus(404)

	res.json(project) //denna måste finnas kvar ifall jag inte har npm paketer expressasync-errors
	// } catch (error) {
	// 	next(error)
	// }
}

exports.createNewTodo = async (req, res, next) => {
	const todo = req.body.todo || ''
	const done = req.body.done
	if (!todo)
		return res.status(400).json({
			message: 'You must provide a name',
		}) //Skapar ny todo
	const newTodo = await Todo.create({
		todo: todo,
		done: done,
	}) // return res.json(req.body)
	return res.setHeader('Location', `http://localhost:4000/api/v1/projects/${newTodo._id}`).status(201).json(newTodo)
}

exports.updateTodoById = async (req, res, next) => {
	// place project id in local variable
	const projectId = req.params.projectId
	//place name and desc from req.body in locxal vcariables
	const { todo, done } = req.body

	//get project
	const projectToUpdate = await Todo.findById(projectId)
	//if no name or description respond with bad request
	if (!todo && !done)
		return res.sendStatus(404).json({
			message: 'youy must provide a todo and if it is done',
		})
	//if no project respond with no found
	if (!projectToUpdate) return res.sendStatus(404)
	//update project
	if (todo) projectToUpdate.todo = todo
	if (done) projectToUpdate.done = done

	const response = await projectToUpdate.save()

	// craft response (return updated project)
	return res.json(response)
}

exports.deleteTodo = async (req, res) => {
	//kopiera in id i url på POSTMAN. dokumentet som deletades syns i terminalen
	//get project id and place in local variable
	const projectId = req.params.projectId
	//chec if project exists
	const projectToDelete = await Todo.findById(projectId)
	// if no projects return not found
	if (!projectToDelete) return res.sendStatus(404)
	//delete project
	const response = await projectToDelete.delete()
	console.log(response)
	//respond

	return res.send('deleting')
}
