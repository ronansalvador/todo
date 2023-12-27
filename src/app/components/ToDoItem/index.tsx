import { useToDo } from '@/app/context/ToDoContext'
import styles from './styles.module.css'

interface TodoItemProps {
  todo: {
    id: number
    text: string
    completed: boolean
  }
}

const TodoItem: React.FC<TodoItemProps> = ({ todo }) => {
  const { toggleTodo, deleteTodo } = useToDo()
  const handleToggle = () => {
    toggleTodo(todo.id)
  }

  const handleDelete = () => {
    deleteTodo(todo.id)
  }

  return (
    <div className={styles.task}>
      {/* <input type="checkbox" checked={todo.completed} onChange={handleToggle} /> */}
      <span
        className={styles.description}
        style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}
      >
        {todo.text}
      </span>
      {!todo.completed ? (
        <button onClick={handleToggle}>Done</button>
      ) : (
        <button onClick={handleToggle}>Fazer</button>
      )}
      <button onClick={handleDelete}>Delete</button>
    </div>
  )
}

export default TodoItem
