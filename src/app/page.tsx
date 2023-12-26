'use client'

import TodoList from './components/ToDoList'
import TodoForm from './components/ToDoForm'
import styles from './page.module.css'

const Home = () => {
  return (
    <main className={`${styles.main}`}>
      <h1>Lista de Tarefas</h1>
      <TodoForm />
      <TodoList />
    </main>
  )
}

export default Home
