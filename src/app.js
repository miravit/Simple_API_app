require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const todoRoutes = require('./routes/todoRoutes')

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
