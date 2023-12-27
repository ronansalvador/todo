'use client'

import TodoList from './components/ToDoList'
import TodoForm from './components/ToDoForm'
import styles from './page.module.css'
import { useToDo } from './context/ToDoContext'
import { useEffect } from 'react'
interface ToDo {
  id: number
  text: string
  completed: boolean
}
const Home = () => {
  const { todos, setTodos } = useToDo()
  const done = todos.filter((todo) => todo.completed === true)
  let savedToDos: ToDo[] = []
  if (typeof window !== 'undefined') {
    const savedToDosString = localStorage.getItem('todos')
    savedToDos = savedToDosString ? JSON.parse(savedToDosString) : []
  }

  // Carregar os todos do localStorage quando o componente for montado
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedTodos = localStorage.getItem('todos')
      if (storedTodos) {
        setTodos(JSON.parse(storedTodos))
      }
    }
  }, [setTodos])
  return (
    <main className={`${styles.main}`}>
      <h1>Lista de Tarefas</h1>
      <TodoForm />
      {todos.length > 0 ? (
        <>
          <div className={styles.count_tasks}>
            <p>
              Tarefas criadas: <span>{todos.length}</span>
            </p>
            <p>
              Concluidas: <span>{`${done.length} de ${todos.length}`}</span>
            </p>
          </div>
          <TodoList />
        </>
      ) : (
        <p>Lista de Tarefas Vazia!</p>
      )}
    </main>
  )
}

export default Home
