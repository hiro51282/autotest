import React, { useState } from 'react';
import { TodoList } from './components/TodoList';
import { CategoryFilter } from './components/CategoryFilter';
import { useTodos } from './hooks/useTodos';
import './App.css';

const App: React.FC = () => {
  const [newTodoText, setNewTodoText] = useState('');
  const [newTodoCategory, setNewTodoCategory] = useState('仕事');
  
  const {
    filteredTodos,
    categories,
    selectedCategory,
    addTodo,
    toggleTodo,
    deleteTodo,
    setSelectedCategory,
  } = useTodos();

  const handleAddTodo = () => {
    if (newTodoText.trim()) {
      addTodo(newTodoText.trim(), newTodoCategory);
      setNewTodoText('');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleAddTodo();
    }
  };

  return (
    <div className="app">
      <header className="app-header">
        <h1>React ToDo List</h1>
      </header>
      
      <main className="app-main">
        <div className="add-todo-form">
          <input
            type="text"
            placeholder="新しいタスクを入力"
            value={newTodoText}
            onChange={(e) => setNewTodoText(e.target.value)}
            onKeyPress={handleKeyPress}
            className="todo-input"
          />
          <select
            value={newTodoCategory}
            onChange={(e) => setNewTodoCategory(e.target.value)}
            className="category-select"
          >
            <option value="仕事">仕事</option>
            <option value="プライベート">プライベート</option>
            <option value="学習">学習</option>
          </select>
          <button onClick={handleAddTodo} className="add-button">
            追加
          </button>
        </div>

        <CategoryFilter
          categories={categories}
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
        />

        <TodoList
          todos={filteredTodos}
          onToggle={toggleTodo}
          onDelete={deleteTodo}
        />
      </main>
    </div>
  );
};

export default App;