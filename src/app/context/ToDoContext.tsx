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
  saveTodos: (todos: ToDo[]) => void
}

const ToDoContext = createContext<ToDoContextProps>({
  todos: [],
  setTodos: () => {},
  addTodo: () => {},
  toggleTodo: () => {},
  deleteTodo: () => {},
  saveTodos: () => {},
})

export const ToDoProvider = ({ children }: { children: React.ReactNode }) => {
  const [todos, setTodos] = useState<ToDo[]>([])

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedTodos = localStorage.getItem('todos')
      if (storedTodos) {
        setTodos(JSON.parse(storedTodos))
      }
    }
  }, [setTodos])

  const saveTodos = (todos: ToDo[]): void => {
    localStorage.setItem('todos', JSON.stringify(todos))
  }

  const addTodo = (text: string) => {
    const newTodo: ToDo = {
      id: Date.now(),
      text,
      completed: false,
    }

    setTodos((prevTodos) => {
      const updatedTodos = [...prevTodos, newTodo]
      saveTodos(updatedTodos)
      return updatedTodos
    })
  }

  const toggleTodo = (id: number) => {
    setTodos((prevTodos) => {
      const updatedTodos = prevTodos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo,
      )
      saveTodos(updatedTodos)
      return updatedTodos
    })
  }

  const deleteTodo = (id: number) => {
    setTodos((prevTodos) => {
      const updatedTodos = prevTodos.filter((todo) => todo.id !== id)
      saveTodos(updatedTodos)
      return updatedTodos
    })
  }
  return (
    <ToDoContext.Provider
      value={{ todos, addTodo, toggleTodo, deleteTodo, setTodos, saveTodos }}
    >
      {children}
    </ToDoContext.Provider>
  )
}

export const useToDo = () => useContext(ToDoContext)
