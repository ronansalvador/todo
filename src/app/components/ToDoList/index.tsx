import React from 'react'
import TodoItem from '../ToDoItem'
import { useToDo } from '@/app/context/ToDoContext'
import styles from './styles.module.css'

interface Todo {
  id: number
  text: string
  completed: boolean
}

const TodoList = () => {
  const { todos } = useToDo()
  return (
    <div className={styles.list}>
      {todos.map((todo) => (
        <TodoItem key={todo.id} todo={todo} />
      ))}
    </div>
  )
}

export default TodoList
