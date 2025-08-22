/**
 * Test utilities for MCP E2E tests
 */

/**
 * Generates unique test data for user registration/login
 */
class TestDataGenerator {
  static generateUniqueUsername(prefix = 'testuser') {
    const uuid = crypto.randomUUID().replace(/-/g, '').substring(0, 8);
    return `${prefix}_${uuid}`;
  }

  static generateValidPassword(length = 12, useUuidPostfix = false) {
    const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let password = '';
    
    if (useUuidPostfix) {
      // Ensure minimum password length of 6, with UUID taking up part of the total length
      const uuidLength = 8;
      const baseLength = Math.max(6, length - uuidLength);
      
      for (let i = 0; i < baseLength; i++) {
        password += chars.charAt(Math.floor(Math.random() * chars.length));
      }
      
      const uuid = crypto.randomUUID().replace(/-/g, '').substring(0, uuidLength);
      password += uuid;
      
      // Trim to exact length if necessary
      if (password.length > length) {
        password = password.substring(0, length);
      }
    } else {
      for (let i = 0; i < length; i++) {
        password += chars.charAt(Math.floor(Math.random() * chars.length));
      }
    }
    
    return password;
  }

  static getValidTestUser() {
    return {
      username: this.generateUniqueUsername(),
      password: this.generateValidPassword()
    };
  }

  static getInvalidUsernames() {
    return [
      'short',           // Too short (< 6 chars)
      'a'.repeat(33),    // Too long (> 32 chars)
      '',                // Empty
      '     ',           // Only spaces
      'user@name',       // Special characters
      '123456'           // Only numbers
    ];
  }

  static getInvalidPasswords() {
    return [
      'short',           // Too short (< 6 chars)
      'a'.repeat(33),    // Too long (> 32 chars)
      '',                // Empty
      '     '            // Only spaces
    ];
  }
}

/**
 * API mocking utilities using MCP browser functions
 * Note: API mocking with MCP is handled through browser evaluation rather than route interception
 */
class APIMocker {
  /**
   * Mock successful signup response using fetch override
   */
  static async mockSignupSuccess(customResponse = {}) {
    const mockResponse = {
      message: 'User created successfully',
      ...customResponse
    };
    
    const mcpFunction = `() => {
      const originalFetch = window.fetch;
      window.fetch = function(url, options) {
        if (url.includes('/v1/auth/signup')) {
          return Promise.resolve({
            ok: true,
            status: 201,
            json: () => Promise.resolve(${JSON.stringify(mockResponse)}),
            text: () => Promise.resolve(JSON.stringify(${JSON.stringify(mockResponse)}))
          });
        }
        return originalFetch.apply(this, arguments);
      };
    }`;
    
    return mcpFunction;
  }

  /**
   * Mock signup failure response
   */
  static async mockSignupFailure(errorMessage = 'Username already exists', statusCode = 409) {
    const mockResponse = { message: errorMessage };
    
    const mcpFunction = `() => {
      const originalFetch = window.fetch;
      window.fetch = function(url, options) {
        if (url.includes('/v1/auth/signup')) {
          return Promise.resolve({
            ok: false,
            status: ${statusCode},
            json: () => Promise.resolve(${JSON.stringify(mockResponse)}),
            text: () => Promise.resolve(JSON.stringify(${JSON.stringify(mockResponse)}))
          });
        }
        return originalFetch.apply(this, arguments);
      };
    }`;
    
    return mcpFunction;
  }

  /**
   * Mock successful login response
   */
  static async mockLoginSuccess(user = {}, token = 'mock-jwt-token') {
    const mockResponse = {
      token,
      user: {
        id: user.id || '123',
        username: user.username || 'testuser',
        ...user
      }
    };
    
    const mcpFunction = `() => {
      const originalFetch = window.fetch;
      window.fetch = function(url, options) {
        if (url.includes('/v1/auth/login')) {
          return Promise.resolve({
            ok: true,
            status: 200,
            json: () => Promise.resolve(${JSON.stringify(mockResponse)}),
            text: () => Promise.resolve(JSON.stringify(${JSON.stringify(mockResponse)}))
          });
        }
        return originalFetch.apply(this, arguments);
      };
    }`;
    
    return mcpFunction;
  }

  /**
   * Mock login failure response
   */
  static async mockLoginFailure(errorMessage = 'Invalid credentials', statusCode = 401) {
    const mockResponse = { message: errorMessage };
    
    const mcpFunction = `() => {
      const originalFetch = window.fetch;
      window.fetch = function(url, options) {
        if (url.includes('/v1/auth/login')) {
          return Promise.resolve({
            ok: false,
            status: ${statusCode},
            json: () => Promise.resolve(${JSON.stringify(mockResponse)}),
            text: () => Promise.resolve(JSON.stringify(${JSON.stringify(mockResponse)}))
          });
        }
        return originalFetch.apply(this, arguments);
      };
    }`;
    
    return mcpFunction;
  }

  /**
   * Mock slow API response for testing loading states
   */
  static async mockSlowResponse(endpoint, delay = 1000, response = {}) {
    const mcpFunction = `() => {
      const originalFetch = window.fetch;
      window.fetch = function(url, options) {
        if (url.includes('${endpoint}')) {
          return new Promise(resolve => {
            setTimeout(() => {
              resolve({
                ok: true,
                status: 200,
                json: () => Promise.resolve(${JSON.stringify(response)}),
                text: () => Promise.resolve(JSON.stringify(${JSON.stringify(response)}))
              });
            }, ${delay});
          });
        }
        return originalFetch.apply(this, arguments);
      };
    }`;
    
    return mcpFunction;
  }

  /**
   * Mock network error
   */
  static async mockNetworkError(endpoint) {
    const mcpFunction = `() => {
      const originalFetch = window.fetch;
      window.fetch = function(url, options) {
        if (url.includes('${endpoint}')) {
          return Promise.reject(new Error('Network request failed'));
        }
        return originalFetch.apply(this, arguments);
      };
    }`;
    
    return mcpFunction;
  }
}

/**
 * Common page interactions for authentication flows using MCP browser functions
 */
class AuthPageHelpers {
  /**
   * Fill signup form with provided data
   */
  static async fillSignupForm({ username, password, confirmPassword }) {
    // Note: These return MCP function calls that should be executed with mcp_playwright_browser_type
    return [
      {
        element: 'Username field',
        ref: 'input[name="username"]',
        text: username
      },
      {
        element: 'Password field', 
        ref: 'input[name="password"]',
        text: password
      },
      {
        element: 'Confirm Password field',
        ref: 'input[name="confirmPassword"]', 
        text: confirmPassword || password
      }
    ];
  }

  /**
   * Fill login form with provided data
   */
  static async fillLoginForm({ username, password }) {
    return [
      {
        element: 'Username field',
        ref: 'input[name="username"]',
        text: username
      },
      {
        element: 'Password field',
        ref: 'input[name="password"]', 
        text: password
      }
    ];
  }

  /**
   * Submit signup form
   */
  static getSignupSubmitButton() {
    return {
      element: 'Create Account button',
      ref: 'button[type="submit"]'
    };
  }

  /**
   * Submit login form
   */
  static getLoginSubmitButton() {
    return {
      element: 'Sign In button', 
      ref: 'button[type="submit"]'
    };
  }

  /**
   * Get loading button selector for waiting
   */
  static getLoadingButton(formType = 'signup') {
    const text = formType === 'signup' ? 'Creating Account' : 'Signing In';
    return {
      element: `${text} button`,
      ref: `button:has-text("${text}")`
    };
  }

  /**
   * Navigate between auth pages
   */
  static getNavigateToLoginButton() {
    return {
      element: 'Sign In to Existing Account button',
      ref: 'button:has-text("Sign In to Existing Account")'
    };
  }

  static getNavigateToSignupButton() {
    return {
      element: 'Create New Account button', 
      ref: 'button:has-text("Create New Account")'
    };
  }
}

/**
 * Assertion helpers for common test scenarios using MCP browser functions
 * Note: These return element selectors that should be used with mcp_playwright_browser_snapshot
 * to verify element presence and state
 */
class AssertionHelpers {
  /**
   * Get signup form field selectors for assertion
   */
  static getSignupFormFields() {
    return [
      {
        element: 'Username field',
        ref: 'input[name="username"]'
      },
      {
        element: 'Password field',
        ref: 'input[name="password"]'
      },
      {
        element: 'Confirm Password field',
        ref: 'input[name="confirmPassword"]'
      },
      {
        element: 'Create Account button',
        ref: 'button[type="submit"]'
      }
    ];
  }

  static getLoginFormFields() {
    return [
      {
        element: 'Username field',
        ref: 'input[name="username"]'
      },
      {
        element: 'Password field',
        ref: 'input[name="password"]'
      },
      {
        element: 'Sign In button',
        ref: 'button[type="submit"]'
      }
    ];
  }

  /**
   * Get form field selectors for disabled state checking
   */
  static getFormFieldsForDisabledCheck(formType = 'signup') {
    const fields = [
      {
        element: 'Username field',
        ref: 'input[name="username"]'
      },
      {
        element: 'Password field',
        ref: 'input[name="password"]'
      }
    ];
    
    if (formType === 'signup') {
      fields.push({
        element: 'Confirm Password field',
        ref: 'input[name="confirmPassword"]'
      });
    }
    
    return fields;
  }

  /**
   * Get error message selector
   */
  static getErrorMessage(expectedMessage) {
    return {
      element: `Error message: ${expectedMessage}`,
      ref: `text=${expectedMessage}`
    };
  }

  /**
   * Get success message selector
   */
  static getSuccessMessage(expectedMessage) {
    return {
      element: `Success message: ${expectedMessage}`,
      ref: `text=${expectedMessage}`
    };
  }

  /**
   * Get page title and heading selectors
   */
  static getSignupPageElements() {
    return [
      {
        element: 'Create Account heading',
        ref: 'text=Create Account'
      },
      {
        element: 'Join us text',
        ref: 'text=Join us to start building your vocabulary'
      }
    ];
  }

  static getLoginPageElements() {
    return [
      {
        element: 'Welcome Back heading',
        ref: 'text=Welcome Back'
      },
      {
        element: 'Sign in text',
        ref: 'text=Sign in to your account to continue'
      }
    ];
  }
}

module.exports = {
  TestDataGenerator,
  APIMocker,
  AuthPageHelpers,
  AssertionHelpers
};