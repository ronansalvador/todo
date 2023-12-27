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
    <div className={styles.task}>
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={handleToggle}
        className={styles.check}
      />
      {/* {!todo.completed ? (
        <button onClick={handleToggle}>
          <Image src={done} alt="feito" className={styles.done}></Image>
        </button>
      ) : (
        <button onClick={handleToggle}>Fazer</button>
      )} */}
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
