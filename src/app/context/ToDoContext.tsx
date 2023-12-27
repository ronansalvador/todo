'use client'
import React, { createContext, useContext, useState, useEffect } from 'react'

interface ToDo {
  id: number
  text: string
  completed: boolean
}

interface ToDoContextProps {
  todos: ToDo[]
  setTodos: (todos: ToDo[]) => void
  addTodo: (text: string) => void
  toggleTodo: (id: number) => void
  deleteTodo: (id: number) => void
}

const ToDoContext = createContext<ToDoContextProps>({
  todos: [],
  setTodos: () => {},
  addTodo: () => {},
  toggleTodo: () => {},
  deleteTodo: () => {},
})

export const ToDoProvider = ({ children }: { children: React.ReactNode }) => {
  const savedToDosString = localStorage.getItem('todos')
  const savedToDos = savedToDosString ? JSON.parse(savedToDosString) : []
  const [todos, setTodos] = useState<ToDo[]>(savedToDos)

  // Carregar os todos do localStorage quando o componente for montado
  useEffect(() => {
    const storedTodos = localStorage.getItem('todos')
    if (storedTodos) {
      setTodos(JSON.parse(storedTodos))
    }
  }, [])

  // Salvar os todos no localStorage sempre que a lista de todos for atualizada
  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos))
  }, [todos])

  const addTodo = (text: string) => {
    const newTodo: ToDo = {
      id: Date.now(),
      text,
      completed: false,
    }
    setTodos([...todos, newTodo])
    localStorage.setItem('todos', JSON.stringify(todos))
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
    <ToDoContext.Provider
      value={{ todos, addTodo, toggleTodo, deleteTodo, setTodos }}
    >
      {children}
    </ToDoContext.Provider>
  )
}

export const useToDo = () => useContext(ToDoContext)
