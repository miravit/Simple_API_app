const express = require('express')
const router = express.Router()

const userRoutes = require('./userRoutes') //
const authRoutes = require('../api/authRoutes')

//????
router.use('/users', userRoutes)

//logga in och skapa ny
router.use('/auth', authRoutes)

module.exports = router
