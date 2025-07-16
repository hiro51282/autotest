import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { CategoryFilter } from '../components/CategoryFilter';

describe('CategoryFilter', () => {
  const mockCategories = ['すべて', '仕事', 'プライベート', '学習'];
  const mockOnCategoryChange = jest.fn();

  beforeEach(() => {
    mockOnCategoryChange.mockClear();
  });

  test('renders all category options', () => {
    render(
      <CategoryFilter
        categories={mockCategories}
        selectedCategory="すべて"
        onCategoryChange={mockOnCategoryChange}
      />
    );

    mockCategories.forEach(category => {
      expect(screen.getByText(category)).toBeInTheDocument();
    });
  });

  test('shows selected category as active', () => {
    render(
      <CategoryFilter
        categories={mockCategories}
        selectedCategory="仕事"
        onCategoryChange={mockOnCategoryChange}
      />
    );

    const selectedButton = screen.getByText('仕事');
    expect(selectedButton).toHaveClass('active');
  });

  test('calls onCategoryChange when category is clicked', () => {
    render(
      <CategoryFilter
        categories={mockCategories}
        selectedCategory="すべて"
        onCategoryChange={mockOnCategoryChange}
      />
    );

    const categoryButton = screen.getByText('プライベート');
    fireEvent.click(categoryButton);

    expect(mockOnCategoryChange).toHaveBeenCalledWith('プライベート');
  });

  test('renders correct number of category buttons', () => {
    render(
      <CategoryFilter
        categories={mockCategories}
        selectedCategory="すべて"
        onCategoryChange={mockOnCategoryChange}
      />
    );

    const buttons = screen.getAllByRole('button');
    expect(buttons).toHaveLength(mockCategories.length);
  });

  test('only one category can be selected at a time', () => {
    render(
      <CategoryFilter
        categories={mockCategories}
        selectedCategory="仕事"
        onCategoryChange={mockOnCategoryChange}
      />
    );

    const activeButtons = screen.getAllByText('仕事');
    const selectedButton = activeButtons.find(btn => btn.closest('button')?.classList.contains('active'));
    expect(selectedButton).toBeInTheDocument();

    const otherButtons = screen.getAllByRole('button').filter(btn => 
      btn.textContent !== '仕事' && !btn.classList.contains('active')
    );
    expect(otherButtons.length).toBeGreaterThan(0);
  });

  test('handles empty categories array', () => {
    render(
      <CategoryFilter
        categories={[]}
        selectedCategory=""
        onCategoryChange={mockOnCategoryChange}
      />
    );

    const buttons = screen.queryAllByRole('button');
    expect(buttons).toHaveLength(0);
  });

  test('maintains state when selectedCategory changes', () => {
    const { rerender } = render(
      <CategoryFilter
        categories={mockCategories}
        selectedCategory="すべて"
        onCategoryChange={mockOnCategoryChange}
      />
    );

    let selectedButton = screen.getByText('すべて');
    expect(selectedButton).toHaveClass('active');

    rerender(
      <CategoryFilter
        categories={mockCategories}
        selectedCategory="学習"
        onCategoryChange={mockOnCategoryChange}
      />
    );

    selectedButton = screen.getByText('学習');
    expect(selectedButton).toHaveClass('active');
    
    const previousButton = screen.getByText('すべて');
    expect(previousButton).not.toHaveClass('active');
  });
});