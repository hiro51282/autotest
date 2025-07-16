import { renderHook, act } from '@testing-library/react';
import { useTodos } from '../hooks/useTodos';

describe('useTodos', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  test('initializes with empty todos array', () => {
    const { result } = renderHook(() => useTodos());
    expect(result.current.todos).toEqual([]);
  });

  test('adds a new todo', () => {
    const { result } = renderHook(() => useTodos());
    
    act(() => {
      result.current.addTodo('Test todo', '仕事');
    });

    expect(result.current.todos).toHaveLength(1);
    expect(result.current.todos[0]).toMatchObject({
      text: 'Test todo',
      category: '仕事',
      completed: false,
    });
    expect(result.current.todos[0].id).toBeDefined();
  });

  test('toggles todo completion status', () => {
    const { result } = renderHook(() => useTodos());
    
    act(() => {
      result.current.addTodo('Test todo', '仕事');
    });

    const todoId = result.current.todos[0].id;
    expect(result.current.todos[0].completed).toBe(false);

    act(() => {
      result.current.toggleTodo(todoId);
    });

    expect(result.current.todos[0].completed).toBe(true);

    act(() => {
      result.current.toggleTodo(todoId);
    });

    expect(result.current.todos[0].completed).toBe(false);
  });

  test('deletes a todo', () => {
    const { result } = renderHook(() => useTodos());
    
    act(() => {
      result.current.addTodo('Test todo 1', '仕事');
      result.current.addTodo('Test todo 2', 'プライベート');
    });

    expect(result.current.todos).toHaveLength(2);

    const todoId = result.current.todos[0].id;
    act(() => {
      result.current.deleteTodo(todoId);
    });

    expect(result.current.todos).toHaveLength(1);
    expect(result.current.todos.find(todo => todo.text === 'Test todo 2')).toBeDefined();
  });

  test('filters todos by category', () => {
    const { result } = renderHook(() => useTodos());
    
    act(() => {
      result.current.addTodo('Work todo', '仕事');
      result.current.addTodo('Personal todo', 'プライベート');
      result.current.addTodo('Study todo', '学習');
    });

    expect(result.current.filteredTodos).toHaveLength(3);

    act(() => {
      result.current.setSelectedCategory('仕事');
    });

    expect(result.current.filteredTodos).toHaveLength(1);
    expect(result.current.filteredTodos[0].text).toBe('Work todo');

    act(() => {
      result.current.setSelectedCategory('すべて');
    });

    expect(result.current.filteredTodos).toHaveLength(3);
  });

  test('returns unique categories', () => {
    const { result } = renderHook(() => useTodos());
    
    act(() => {
      result.current.addTodo('Work todo 1', '仕事');
      result.current.addTodo('Work todo 2', '仕事');
      result.current.addTodo('Personal todo', 'プライベート');
    });

    const categories = result.current.categories;
    expect(categories).toContain('すべて');
    expect(categories).toContain('仕事');
    expect(categories).toContain('プライベート');
    expect(categories).toHaveLength(3);
  });

  test('persists todos to localStorage', () => {
    const { result } = renderHook(() => useTodos());
    
    act(() => {
      result.current.addTodo('Test todo', '仕事');
    });

    const savedTodos = localStorage.getItem('todos');
    expect(savedTodos).toBeTruthy();
    
    const parsedTodos = JSON.parse(savedTodos!);
    expect(parsedTodos).toHaveLength(1);
    expect(parsedTodos[0].text).toBe('Test todo');
  });

  test('loads todos from localStorage on initialization', () => {
    const initialTodos = [
      { id: '1', text: 'Saved todo', completed: false, category: '仕事' }
    ];
    localStorage.setItem('todos', JSON.stringify(initialTodos));

    const { result } = renderHook(() => useTodos());
    
    expect(result.current.todos).toHaveLength(1);
    expect(result.current.todos[0].text).toBe('Saved todo');
  });

  test('handles invalid localStorage data gracefully', () => {
    localStorage.setItem('todos', 'invalid json');

    const { result } = renderHook(() => useTodos());
    
    expect(result.current.todos).toEqual([]);
  });
});