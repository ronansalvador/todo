import { useToDo } from '@/app/context/ToDoContext'
import styles from './styles.module.css'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever'

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
    <div
      className={`${styles.task} ${
        todo.completed ? `${styles.completed}` : ''
      }`}
    >
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={handleToggle}
        className={styles.check}
      />

      <span
        className={styles.description}
        style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}
      >
        {todo.text}
      </span>

      <DeleteForeverIcon onClick={handleDelete} className={styles.delete} />
    </div>
  )
}

export default TodoItem
