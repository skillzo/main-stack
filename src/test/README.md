# Testing Setup

This project uses Vitest for unit testing with React Testing Library for component testing.

## Test Structure

```
src/
  __tests__/
    components/          # Component tests
    hooks/              # Custom hook tests
    lib/                # Utility function tests
  test/
    setup.ts           # Test configuration
    mocks/             # Mock handlers (MSW)
```

## Running Tests

```bash
# Run all tests
npm run test

# Run tests in watch mode
npm run test:run

# Run tests with UI
npm run test:ui
```

## Test Coverage

### Components (37 tests)

- **AppsDropdown**: Conditional rendering, app data display
- **StatCard**: Currency formatting, value display
- **StatsGrid**: Wallet data rendering, default values
- **TransactionCard**: Status styling, amount formatting

### Hooks (20 tests)

- **useUser**: Data fetching, error handling, helper functions
- **useWallet**: API integration, loading states
- **useTransactions**: Data transformation, filtering

### Utilities (26 tests)

- **utils**: Class name merging with Tailwind
- **filterUtils**: Transaction filtering, date ranges

## Key Features Tested

✅ **Component Rendering**: All components render correctly with props
✅ **User Interactions**: Button clicks, conditional displays
✅ **Data Formatting**: Currency, dates, status indicators
✅ **Error Handling**: Network errors, API failures
✅ **Loading States**: Async operations, data fetching
✅ **Utility Functions**: Class merging, filtering logic
✅ **Type Safety**: TypeScript integration with tests

## Test Configuration

- **Vitest**: Fast test runner with Vite integration
- **React Testing Library**: Component testing utilities
- **MSW**: API mocking (disabled for hook tests)
- **Jest DOM**: Additional matchers for DOM testing
