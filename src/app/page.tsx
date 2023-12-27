'use client'

import TodoList from './components/ToDoList'
import TodoForm from './components/ToDoForm'
import styles from './page.module.css'
import { useToDo } from './context/ToDoContext'

const Home = () => {
  const { todos } = useToDo()
  const done = todos.filter((todo) => todo.completed === true)
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
