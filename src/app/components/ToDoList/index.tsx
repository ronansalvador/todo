import React from 'react'
import TodoItem from '../ToDoItem'
import { useToDo } from '@/app/context/ToDoContext'

interface Todo {
  id: number
  text: string
  completed: boolean
}

const TodoList = () => {
  const { todos } = useToDo()
  return (
    <div>
      {todos.map((todo) => (
        <TodoItem key={todo.id} todo={todo} />
      ))}
    </div>
  )
}

export default TodoList
