import React from 'react'
import TodoItem from '../ToDoItem'
import { useToDo } from '@/app/context/ToDoContext'
import styles from './styles.module.css'

const TodoList = () => {
  const { todos, setTodos, saveTodos } = useToDo()
  return (
    <div className={styles.list}>
      {todos.map((todo) => (
        <TodoItem key={todo.id} todo={todo} />
      ))}
      <button
        className={styles.clear_btn}
        onClick={() => {
          setTodos([])
          saveTodos([])
        }}
      >
        Limpar lista
      </button>
    </div>
  )
}

export default TodoList
