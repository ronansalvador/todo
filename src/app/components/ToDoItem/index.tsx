import { useToDo } from '@/app/context/ToDoContext'
import styles from './styles.module.css'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever'
import { ToDoType } from '@/app/types'

interface TodoItemProps {
  todo: ToDoType
}

const TodoItem: React.FC<TodoItemProps> = ({ todo }) => {
  const { toggleTodo, deleteTodo } = useToDo()
  return (
    <div
      className={`${styles.task} ${
        todo.completed ? `${styles.completed}` : ''
      }`}
    >
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={() => toggleTodo(todo.id)}
        className={styles.check}
      />

      <span
        className={styles.description}
        style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}
      >
        {todo.text}
      </span>

      <DeleteForeverIcon
        onClick={() => deleteTodo(todo.id)}
        className={styles.delete}
      />
    </div>
  )
}

export default TodoItem
