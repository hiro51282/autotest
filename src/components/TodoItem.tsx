import React from 'react';
import { TodoItemProps } from '../types';
import './TodoItem.css';

export const TodoItem: React.FC<TodoItemProps> = ({ todo, onToggle, onDelete }) => {
  return (
    <div className="todo-item">
      <div className="todo-content">
        <input
          type="checkbox"
          checked={todo.completed}
          onChange={() => onToggle(todo.id)}
        />
        <span className={`todo-text ${todo.completed ? 'completed' : ''}`}>
          {todo.text}
        </span>
        <span className="todo-category">{todo.category}</span>
      </div>
      <button onClick={() => onDelete(todo.id)} className="delete-button">
        削除
      </button>
    </div>
  );
};