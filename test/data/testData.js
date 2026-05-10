// Test Data
// Like test fixtures in Playwright/Cypress
// Keep test data separate from test logic

const testData = {
  users: {
    validUser: {
      username: 'bob@example.com',
      password: '10203040',
      fullName: 'Test User',
    },
    invalidUser: {
      username: 'invalid@example.com',
      password: 'WrongPassword',
    },
  },

  loginForm: {
    validCredentials: {
      email: 'bob@example.com',
      password: '10203040',
    },
    invalidCredentials: {
      email: 'wrong@appium.io',
      password: 'wrongpass',
    },
  },

  products: [
    {
      name: 'Product 1',
      price: 29.99,
      description: 'Test Product 1',
    },
    {
      name: 'Product 2',
      price: 49.99,
      description: 'Test Product 2',
    },
  ],

  messages: {
    successLogin: 'Login successful',
    errorLogin: 'Invalid credentials',
    addedToCart: 'Added to cart',
    emptyField: 'This field is required',
  },

  timeouts: {
    short: 5000,
    medium: 10000,
    long: 30000,
  },
};

module.exports = testData;
