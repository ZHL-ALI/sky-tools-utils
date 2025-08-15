// Jest setup file for global test configuration

// Global test setup
beforeEach(() => {
  // Clear all mocks before each test
  jest.clearAllMocks();
});

// Mock console methods to avoid noise in tests
global.console = {
  ...console,
  // Uncomment to silence console.log in tests
  // log: jest.fn(),
  warn: jest.fn(),
  error: jest.fn(),
};
