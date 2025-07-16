# React ToDo List with Category Filter

A fully-featured Todo List application built with React, TypeScript, and Jest. This project demonstrates Test-Driven Development (TDD) practices with comprehensive test coverage.

## Features

- ✅ Add, delete, and toggle completion of tasks
- 🏷️ Category filtering (Work, Personal, Study)
- 💾 Local storage persistence
- 📱 Responsive design
- 🧪 100% test coverage with 38 tests
- 🔷 TypeScript for type safety

## Technology Stack

- **Framework**: React 19.1.0
- **Language**: TypeScript 5.8.3
- **Testing**: Jest 30.0.4 + React Testing Library 16.3.0
- **State Management**: Custom hooks (useTodos)
- **Styling**: CSS modules
- **Persistence**: localStorage

## Getting Started

### Prerequisites

- Node.js (version 16 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/hiro51282/autotest.git
cd autotest
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm start
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Testing

Run all tests:
```bash
npm test
```

Run tests in watch mode:
```bash
npm run test:watch
```

### Test Coverage

- **Total Tests**: 38 ✅
- **TodoItem**: 6 tests (display, checkbox, delete, completion state, CSS)
- **TodoList**: 7 tests (multiple display, empty state, event propagation)
- **CategoryFilter**: 7 tests (category selection, filtering, state management)
- **useTodos**: 9 tests (state management, localStorage, CRUD operations)
- **App (Integration)**: 9 tests (full flow, UI operations, data persistence)

## Building

Build the project:
```bash
npm run build
```

## Project Structure

```
src/
├── components/
│   ├── TodoItem.tsx          # Individual task component
│   ├── TodoItem.css
│   ├── TodoList.tsx          # Task list component
│   ├── TodoList.css
│   ├── CategoryFilter.tsx    # Category filter component
│   └── CategoryFilter.css
├── hooks/
│   └── useTodos.ts          # Custom hook for state management
├── __tests__/
│   ├── TodoItem.test.tsx    # Unit tests (6 tests)
│   ├── TodoList.test.tsx    # Unit tests (7 tests)
│   ├── CategoryFilter.test.tsx # Unit tests (7 tests)
│   ├── useTodos.test.tsx    # Hook tests (9 tests)
│   └── App.test.tsx         # Integration tests (9 tests)
├── App.tsx                  # Main application
├── App.css
├── index.tsx
├── setupTests.ts            # Test configuration
└── types.ts                 # TypeScript type definitions
```

## Features in Detail

### Basic Functionality
- Add tasks with Enter key or button
- Mark tasks as complete/incomplete
- Delete tasks
- Input validation (prevents empty tasks)

### Category System
- Three categories: Work, Personal, Study
- Filter by category or show all
- Dynamic category button generation
- Visual category indicators

### Data Persistence
- Automatic saving to localStorage
- State restoration on page reload
- Proper handling of corrupted data

### UI/UX
- Responsive design
- Strikethrough for completed tasks
- Color-coded categories
- Intuitive interactions

## Development Guidelines

### Code Quality
- Maintain 100% test coverage
- Use TypeScript strict mode
- Follow single responsibility principle
- Write tests first (TDD approach)

### Extending the Application

Ready-to-implement features:
- Task editing
- Priority levels
- Due dates
- Drag & drop sorting

Future enhancements:
- Database integration
- User authentication
- Task sharing
- Analytics dashboard

## Contributing

1. Fork the repository
2. Create a feature branch
3. Write tests for new functionality
4. Implement the feature
5. Ensure all tests pass
6. Submit a pull request

## License

This project is licensed under the ISC License.

## Author

Created with Claude Code - A comprehensive example of TDD practices in React development.