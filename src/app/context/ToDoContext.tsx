'use client'
import React, { createContext, useContext, useState, useEffect } from 'react'
import { ToDoType } from '../types'

interface ToDoContextProps {
  todos: ToDoType[]
  setTodos: (todos: ToDoType[]) => void
  addTodo: (text: string) => void
  toggleTodo: (id: number) => void
  deleteTodo: (id: number) => void
  saveTodos: (todos: ToDoType[]) => void
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
  const [todos, setTodos] = useState<ToDoType[]>([])

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedTodos = localStorage.getItem('todos')
      if (storedTodos) {
        setTodos(JSON.parse(storedTodos))
      }
    }
  }, [setTodos])

  const saveTodos = (todos: ToDoType[]): void => {
    localStorage.setItem('todos', JSON.stringify(todos))
  }

  const addTodo = (text: string) => {
    const newTodo: ToDoType = {
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
