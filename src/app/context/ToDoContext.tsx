'use client'
import React, { createContext, useContext, useState } from 'react'

interface ToDo {
  id: number
  text: string
  completed: boolean
}

interface ToDoContextProps {
  todos: ToDo[]
  addTodo: (text: string) => void
  toggleTodo: (id: number) => void
  deleteTodo: (id: number) => void
}

const ToDoContext = createContext<ToDoContextProps>({
  todos: [],
  addTodo: () => {},
  toggleTodo: () => {},
  deleteTodo: () => {},
})

export const ToDoProvider = ({ children }: { children: React.ReactNode }) => {
  const [todos, setTodos] = useState<ToDo[]>([])

  const addTodo = (text: string) => {
    const newTodo: ToDo = {
      id: Date.now(),
      text,
      completed: false,
    }
    setTodos([...todos, newTodo])
  }

  const toggleTodo = (id: number) => {
    const updatedTodos = todos.map((todo) =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo,
    )
    setTodos(updatedTodos)
  }

  const deleteTodo = (id: number) => {
    const updatedTodos = todos.filter((todo) => todo.id !== id)
    setTodos(updatedTodos)
  }

  return (
    <ToDoContext.Provider value={{ todos, addTodo, toggleTodo, deleteTodo }}>
      {children}
    </ToDoContext.Provider>
  )
}

export const useToDo = () => useContext(ToDoContext)
