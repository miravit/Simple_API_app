const express = require('express')
const { userRoles } = require('../../constants/users') //importera de olika rollerna
const router = express.Router()
const { deleteUserById } = require('../../controllers/api/userControllers') //alla controllers
const { isAuthenticated, authorizeRoles } = require('../../middleware/authenticationMiddleware') //all middleware

// router.get('/', isAuthenticated, authorizeRoles(userRoles.ADMIN), getAllUsers) // admin only

// router.get('/:userId', isAuthenticated, getUserById) // authenticated

router.delete('/:userId', isAuthenticated, deleteUserById) // authenticated (user themselves && admin only)

module.exports = router
