import { useState, useEffect, useMemo } from 'react';
import { Todo } from '../types';

export const useTodos = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('すべて');

  useEffect(() => {
    const savedTodos = localStorage.getItem('todos');
    if (savedTodos) {
      try {
        const parsedTodos = JSON.parse(savedTodos);
        setTodos(parsedTodos);
      } catch (error) {
        console.error('Failed to parse saved todos:', error);
        setTodos([]);
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const addTodo = (text: string, category: string) => {
    const newTodo: Todo = {
      id: `${Date.now()}-${Math.random()}`,
      text,
      completed: false,
      category,
    };
    setTodos(prev => [...prev, newTodo]);
  };

  const toggleTodo = (id: string) => {
    setTodos(prev => 
      prev.map(todo => 
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const deleteTodo = (id: string) => {
    setTodos(prev => prev.filter(todo => todo.id !== id));
  };

  const categories = useMemo(() => {
    const uniqueCategories = Array.from(new Set(todos.map(todo => todo.category)));
    return ['すべて', ...uniqueCategories];
  }, [todos]);

  const filteredTodos = useMemo(() => {
    if (selectedCategory === 'すべて') {
      return todos;
    }
    return todos.filter(todo => todo.category === selectedCategory);
  }, [todos, selectedCategory]);

  return {
    todos,
    filteredTodos,
    categories,
    selectedCategory,
    addTodo,
    toggleTodo,
    deleteTodo,
    setSelectedCategory,
  };
};