import { useToDo } from '@/app/context/ToDoContext'
import React, { useState } from 'react'

const TodoForm = () => {
  const [text, setText] = useState('')
  const { addTodo } = useToDo()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (text.trim() !== '') {
      addTodo(text)
      setText('')
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Adicione uma nova tarefa..."
      />
      <button type="submit">Adicionar Tarefa</button>
    </form>
  )
}

export default TodoForm
