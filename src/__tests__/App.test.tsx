import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';

describe('App Integration Tests', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  test('renders app with title and initial UI', () => {
    render(<App />);
    
    expect(screen.getByText('React ToDo List')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('新しいタスクを入力')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: '追加' })).toBeInTheDocument();
    expect(screen.getByText('カテゴリフィルター')).toBeInTheDocument();
    expect(screen.getByText('タスクがありません')).toBeInTheDocument();
  });

  test('adds a new todo', async () => {
    const user = userEvent.setup();
    render(<App />);
    
    const input = screen.getByPlaceholderText('新しいタスクを入力');
    const categorySelect = screen.getByDisplayValue('仕事');
    const addButton = screen.getByRole('button', { name: '追加' });
    
    await user.type(input, 'Test todo');
    await user.click(addButton);
    
    expect(screen.getByText('Test todo')).toBeInTheDocument();
    const todoItem = screen.getByText('Test todo').closest('.todo-item');
    expect(todoItem?.querySelector('.todo-category')?.textContent).toBe('仕事');
    expect(input).toHaveValue('');
  });

  test('toggles todo completion', async () => {
    const user = userEvent.setup();
    render(<App />);
    
    const input = screen.getByPlaceholderText('新しいタスクを入力');
    const addButton = screen.getByRole('button', { name: '追加' });
    
    await user.type(input, 'Test todo');
    await user.click(addButton);
    
    const checkbox = screen.getByRole('checkbox');
    expect(checkbox).not.toBeChecked();
    
    await user.click(checkbox);
    expect(checkbox).toBeChecked();
  });

  test('deletes a todo', async () => {
    const user = userEvent.setup();
    render(<App />);
    
    const input = screen.getByPlaceholderText('新しいタスクを入力');
    const addButton = screen.getByRole('button', { name: '追加' });
    
    await user.type(input, 'Test todo');
    await user.click(addButton);
    
    expect(screen.getByText('Test todo')).toBeInTheDocument();
    
    const deleteButton = screen.getByRole('button', { name: '削除' });
    await user.click(deleteButton);
    
    expect(screen.queryByText('Test todo')).not.toBeInTheDocument();
    expect(screen.getByText('タスクがありません')).toBeInTheDocument();
  });

  test('filters todos by category', async () => {
    const user = userEvent.setup();
    render(<App />);
    
    const input = screen.getByPlaceholderText('新しいタスクを入力');
    const categorySelect = screen.getByDisplayValue('仕事');
    const addButton = screen.getByRole('button', { name: '追加' });
    
    await user.type(input, 'Work todo');
    await user.click(addButton);
    
    await user.selectOptions(categorySelect, 'プライベート');
    await user.type(input, 'Personal todo');
    await user.click(addButton);
    
    expect(screen.getByText('Work todo')).toBeInTheDocument();
    expect(screen.getByText('Personal todo')).toBeInTheDocument();
    
    const workFilterButton = screen.getByRole('button', { name: '仕事' });
    await user.click(workFilterButton);
    
    expect(screen.getByText('Work todo')).toBeInTheDocument();
    expect(screen.queryByText('Personal todo')).not.toBeInTheDocument();
    
    const allFilterButton = screen.getByRole('button', { name: 'すべて' });
    await user.click(allFilterButton);
    
    expect(screen.getByText('Work todo')).toBeInTheDocument();
    expect(screen.getByText('Personal todo')).toBeInTheDocument();
  });

  test('persists todos in localStorage', async () => {
    const user = userEvent.setup();
    render(<App />);
    
    const input = screen.getByPlaceholderText('新しいタスクを入力');
    const addButton = screen.getByRole('button', { name: '追加' });
    
    await user.type(input, 'Persistent todo');
    await user.click(addButton);
    
    const savedTodos = localStorage.getItem('todos');
    expect(savedTodos).toBeTruthy();
    
    const parsedTodos = JSON.parse(savedTodos!);
    expect(parsedTodos).toHaveLength(1);
    expect(parsedTodos[0].text).toBe('Persistent todo');
  });

  test('loads todos from localStorage on app start', () => {
    const initialTodos = [
      { id: '1', text: 'Saved todo', completed: false, category: '仕事' }
    ];
    localStorage.setItem('todos', JSON.stringify(initialTodos));
    
    render(<App />);
    
    expect(screen.getByText('Saved todo')).toBeInTheDocument();
    const todoItem = screen.getByText('Saved todo').closest('.todo-item');
    expect(todoItem?.querySelector('.todo-category')?.textContent).toBe('仕事');
  });

  test('prevents adding empty todos', async () => {
    const user = userEvent.setup();
    render(<App />);
    
    const addButton = screen.getByRole('button', { name: '追加' });
    await user.click(addButton);
    
    expect(screen.getByText('タスクがありません')).toBeInTheDocument();
  });

  test('handles multiple categories correctly', async () => {
    const user = userEvent.setup();
    render(<App />);
    
    const input = screen.getByPlaceholderText('新しいタスクを入力');
    const categorySelect = screen.getByDisplayValue('仕事');
    const addButton = screen.getByRole('button', { name: '追加' });
    
    await user.type(input, 'Work todo');
    await user.click(addButton);
    
    await user.selectOptions(categorySelect, 'プライベート');
    await user.type(input, 'Personal todo');
    await user.click(addButton);
    
    await user.selectOptions(categorySelect, '学習');
    await user.type(input, 'Study todo');
    await user.click(addButton);
    
    expect(screen.getByRole('button', { name: 'すべて' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: '仕事' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'プライベート' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: '学習' })).toBeInTheDocument();
  });
});