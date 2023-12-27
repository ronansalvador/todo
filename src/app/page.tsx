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
      {todos.length > 0 ? <TodoList /> : <h2>Lista de Tarefas Vazia!</h2>}
    </main>
  )
}

export default Home
