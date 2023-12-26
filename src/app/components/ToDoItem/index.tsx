import { useToDo } from '@/app/context/ToDoContext'

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
    <div>
      <input type="checkbox" checked={todo.completed} onChange={handleToggle} />
      <span
        style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}
      >
        {todo.text}
      </span>
      <button onClick={handleDelete}>Delete</button>
    </div>
  )
}

export default TodoItem
