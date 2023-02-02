require('dotenv').config()
require('express-async-errors') //hjälper till med att wrappa och fånga upp errors istället för att ha try/catch i våra controllers
const express = require('express')
const mongoose = require('mongoose')
const todoRoutes = require('./routes/todoRoutes')
const path = require('path')
const { json } = require('express')

// 1.skapa våran express app
const app = express() //innehåller alla methods vi kommer använda efteråt

app.use(express.json())

// 3. sätt upp våran middleware. för att hålla koll på vilka request som kommer in
app.use((req, res, next) => {
	console.log(`processing ${req.method} request to ${req.path}`) //.method är GET och req.path är '/'
	console.log(req.path)
	next() //när koden ovan är körd, gå vidare till middleware/routing
})

//CRUD projects // vi måste ha en route per sak vi vill göra. så en för get, post, put, delete

//skapa routern
app.use('/api/v1/projects', todoRoutes)

//post route middleware // om jag inte lägger till en endpoint i end.use så blir det 404. Länkar in views
app.use((req, res) => {
	const isApiPath = req.path.startsWith('/api/')

	if (isApiPath) return res.sendStatus(404) //skickar 404-fel man går till /api/

	return res.sendFile(path.join(__dirname, './views/notFound.html'))
})

app.use((error, req, res, next) => {
	return res.json(error.message)
})

// 2. starta server
const port = process.env.PORT || 5000 //port finnns i min env fil.
async function run() {
	try {
		mongoose.set('strictQuery', false) //tar bort n ågot felmeddelande man kan få i konsollen
		const conn = await mongoose.connect(process.env.MONGODB_URI) //connectar till våran mongoose url.
		// const conn = await mongoose.connect(process.env.MONGODB_URI)
		// console.log(`MongoDB connected: ${conn.connection.host}`)

		app.listen(port, () => {
			console.log(`server not running on http://localhost:${port}`)
		})
	} catch (error) {
		console.log(error)
	}
}

run()
