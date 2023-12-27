'use client'

import TodoList from './components/ToDoList'
import TodoForm from './components/ToDoForm'
import styles from './page.module.css'
import { useToDo } from './context/ToDoContext'

const Home = () => {
  const { todos } = useToDo()
  return (
    <main className={`${styles.main}`}>
      <h1>Lista de Tarefas</h1>
      <TodoForm />
      {todos.length > 0 ? <TodoList /> : <p>Lista de Tarefas Vazia!</p>}
    </main>
  )
}

export default Home
