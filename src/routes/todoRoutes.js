const express = require('express')
const { getAllTodos, getTodoById, createNewTodo, updateTodoById, deleteTodo } = require('../controllers/todoControllers')
const router = express.Router()

router.get('/', getAllTodos)

router.get('/:projectId', getTodoById)

router.post('/', createNewTodo)

router.put('/:projectId', updateTodoById)

router.delete('/:projectId', deleteTodo)

module.exports = router
