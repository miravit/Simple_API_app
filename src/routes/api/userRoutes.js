const express = require('express')
const { userRoles } = require('../../constants/users') //importera de olika rollerna
const router = express.Router()
// const { getAllUsers, getUserById, deleteUserById } = require('../../controllers/api/userControllers') //alla controllers
// const { isAuthenticated, authorizeRoles } = require('../../middleware/authMiddleware') //all middleware

exports.isAuthenticated = async (req, res, next) => {
	let token
	const authHeader = req.headers.authorization
	console.log(authHeader)
}
