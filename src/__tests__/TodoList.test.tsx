import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { TodoList } from '../components/TodoList';
import { Todo } from '../types';

describe('TodoList', () => {
  const mockTodos: Todo[] = [
    { id: '1', text: 'Todo 1', completed: false, category: '仕事' },
    { id: '2', text: 'Todo 2', completed: true, category: 'プライベート' },
    { id: '3', text: 'Todo 3', completed: false, category: '仕事' },
  ];

  const mockOnToggle = jest.fn();
  const mockOnDelete = jest.fn();

  beforeEach(() => {
    mockOnToggle.mockClear();
    mockOnDelete.mockClear();
  });

  test('renders empty state when no todos', () => {
    render(
      <TodoList
        todos={[]}
        onToggle={mockOnToggle}
        onDelete={mockOnDelete}
      />
    );

    expect(screen.getByText('タスクがありません')).toBeInTheDocument();
  });

  test('renders all todos', () => {
    render(
      <TodoList
        todos={mockTodos}
        onToggle={mockOnToggle}
        onDelete={mockOnDelete}
      />
    );

    expect(screen.getByText('Todo 1')).toBeInTheDocument();
    expect(screen.getByText('Todo 2')).toBeInTheDocument();
    expect(screen.getByText('Todo 3')).toBeInTheDocument();
  });

  test('calls onToggle when todo checkbox is clicked', () => {
    render(
      <TodoList
        todos={mockTodos}
        onToggle={mockOnToggle}
        onDelete={mockOnDelete}
      />
    );

    const firstCheckbox = screen.getAllByRole('checkbox')[0];
    fireEvent.click(firstCheckbox);

    expect(mockOnToggle).toHaveBeenCalledWith('1');
  });

  test('calls onDelete when delete button is clicked', () => {
    render(
      <TodoList
        todos={mockTodos}
        onToggle={mockOnToggle}
        onDelete={mockOnDelete}
      />
    );

    const deleteButtons = screen.getAllByText('削除');
    fireEvent.click(deleteButtons[0]);

    expect(mockOnDelete).toHaveBeenCalledWith('1');
  });

  test('displays correct number of todos', () => {
    render(
      <TodoList
        todos={mockTodos}
        onToggle={mockOnToggle}
        onDelete={mockOnDelete}
      />
    );

    const todoItems = screen.getAllByText(/Todo \d/);
    expect(todoItems).toHaveLength(3);
  });

  test('propagates toggle events from child components', () => {
    render(
      <TodoList
        todos={mockTodos}
        onToggle={mockOnToggle}
        onDelete={mockOnDelete}
      />
    );

    const secondCheckbox = screen.getAllByRole('checkbox')[1];
    fireEvent.click(secondCheckbox);

    expect(mockOnToggle).toHaveBeenCalledWith('2');
  });

  test('propagates delete events from child components', () => {
    render(
      <TodoList
        todos={mockTodos}
        onToggle={mockOnToggle}
        onDelete={mockOnDelete}
      />
    );

    const deleteButtons = screen.getAllByText('削除');
    fireEvent.click(deleteButtons[2]);

    expect(mockOnDelete).toHaveBeenCalledWith('3');
  });
});