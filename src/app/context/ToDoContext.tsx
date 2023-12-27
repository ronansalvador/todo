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
  const [todos, setTodos] = useState<ToDo[]>([])

  // Salvar os todos no localStorage sempre que a lista de todos for atualizada
  // useEffect(() => {
  //   localStorage.setItem('todos', JSON.stringify(todos))
  // }, [todos])

  const addTodo = (text: string) => {
    const newTodo: ToDo = {
      id: Date.now(),
      text,
      completed: false,
    }

    setTodos((prevTodos) => {
      const updatedTodos = [...prevTodos, newTodo]
      localStorage.setItem('todos', JSON.stringify(updatedTodos))
      return updatedTodos
    })
  }

  const toggleTodo = (id: number) => {
    setTodos((prevTodos) => {
      const updatedTodos = prevTodos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo,
      )
      localStorage.setItem('todos', JSON.stringify(updatedTodos))
      return updatedTodos
    })
  }

  const deleteTodo = (id: number) => {
    setTodos((prevTodos) => {
      const updatedTodos = prevTodos.filter((todo) => todo.id !== id)
      localStorage.setItem('todos', JSON.stringify(updatedTodos))
      return updatedTodos
    })
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
