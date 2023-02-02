const express = require('express')
const { getAllTodos, getTodoById, createNewTodo, updateTodoById, deleteTodo } = require('../controllers/todoControllers')
const router = express.Router()

router.get('/', getAllTodos) //wrappar hela funktionen i en try catch så jag slipper görade t i mina controllers

router.get('/:projectId', getTodoById)

router.post('/', createNewTodo)

router.put('/:projectId', updateTodoById)

router.delete('/:projectId', deleteTodo)

module.exports = router
