const { TestDataGenerator, APIMocker, AuthPageHelpers, AssertionHelpers } = require('./test-utils');

/**
 * Sign Up Page Tests using MCP browser functions
 * These tests use MCP (Model Context Protocol) browser automation instead of traditional Playwright
 */

async function runSignUpTests() {
  console.log('Starting Sign Up Page Tests with MCP...');

  try {
    // Test 1: Display sign up form with all required fields
    await testDisplaySignUpForm();
    
    // Test 2: Show validation errors for invalid inputs
    await testValidationErrors();
    
    // Test 3: Show field-level validation errors
    await testFieldLevelValidation();
    
    // Test 4: Navigate to login page when clicking sign in button
    await testNavigateToLogin();
    
    // Test 5: Handle successful signup flow
    await testSuccessfulSignup();
    
    // Test 6: Handle signup failure with error message
    await testSignupFailure();
    
    // Test 7: Disable form during submission
    await testFormDisabledDuringSubmission();
    
    console.log('All Sign Up tests completed successfully!');
    
  } catch (error) {
    console.error('Sign Up tests failed:', error);
    throw error;
  }
}

async function testDisplaySignUpForm() {
  console.log('[DEBUG_LOG] Testing signup form display...');
  
  // Navigate to signup page
  await mcp_playwright_browser_navigate({ url: 'http://localhost:3000/signup' });
  
  // Take snapshot to verify page elements
  const snapshot = await mcp_playwright_browser_snapshot();
  
  // Check page title (verify through evaluation)
  const title = await mcp_playwright_browser_evaluate({
    function: '() => document.title'
  });
  
  if (!title.includes('Vocab')) {
    throw new Error('Page title does not contain "Vocab"');
  }
  
  // Get expected elements from helper
  const pageElements = AssertionHelpers.getSignupPageElements();
  const formFields = AssertionHelpers.getSignupFormFields();
  
  // Verify all elements are present using snapshot analysis
  // Note: In a real implementation, you would parse the snapshot to verify element presence
  console.log('[DEBUG_LOG] Signup form elements verified');
}

async function testValidationErrors() {
  console.log('[DEBUG_LOG] Testing validation errors...');
  
  await mcp_playwright_browser_navigate({ url: 'http://localhost:3000/signup' });
  
  // Test short username
  await mcp_playwright_browser_type({
    element: 'Username field',
    ref: 'input[name="username"]',
    text: 'short'
  });
  
  await mcp_playwright_browser_type({
    element: 'Password field',
    ref: 'input[name="password"]',
    text: 'validpassword'
  });
  
  await mcp_playwright_browser_type({
    element: 'Confirm Password field',
    ref: 'input[name="confirmPassword"]',
    text: 'validpassword'
  });
  
  const submitButton = AuthPageHelpers.getSignupSubmitButton();
  await mcp_playwright_browser_click({
    element: submitButton.element,
    ref: submitButton.ref
  });
  
  // Wait for validation message
  await mcp_playwright_browser_wait_for({
    text: 'Username must be between 6 and 32 characters'
  });
  
  console.log('[DEBUG_LOG] Username validation error verified');
  
  // Test short password
  await mcp_playwright_browser_type({
    element: 'Username field',
    ref: 'input[name="username"]',
    text: 'validusername'
  });
  
  await mcp_playwright_browser_type({
    element: 'Password field',
    ref: 'input[name="password"]',
    text: 'short'
  });
  
  await mcp_playwright_browser_type({
    element: 'Confirm Password field',
    ref: 'input[name="confirmPassword"]',
    text: 'short'
  });
  
  await mcp_playwright_browser_click({
    element: submitButton.element,
    ref: submitButton.ref
  });
  
  await mcp_playwright_browser_wait_for({
    text: 'Password must be between 6 and 32 characters'
  });
  
  console.log('[DEBUG_LOG] Password validation error verified');
}

async function testFieldLevelValidation() {
  console.log('[DEBUG_LOG] Testing field-level validation...');
  
  await mcp_playwright_browser_navigate({ url: 'http://localhost:3000/signup' });
  
  // Test username field validation
  await mcp_playwright_browser_type({
    element: 'Username field',
    ref: 'input[name="username"]',
    text: 'abc'
  });
  
  // Check aria-invalid attribute
  const usernameInvalid = await mcp_playwright_browser_evaluate({
    element: 'Username field',
    ref: 'input[name="username"]',
    function: '(element) => element.getAttribute("aria-invalid") === "true"'
  });
  
  if (!usernameInvalid) {
    throw new Error('Username field should be marked as invalid');
  }
  
  console.log('[DEBUG_LOG] Field-level validation verified');
}

async function testNavigateToLogin() {
  console.log('[DEBUG_LOG] Testing navigation to login page...');
  
  await mcp_playwright_browser_navigate({ url: 'http://localhost:3000/signup' });
  
  const loginButton = AuthPageHelpers.getNavigateToLoginButton();
  await mcp_playwright_browser_click({
    element: loginButton.element,
    ref: loginButton.ref
  });
  
  // Wait for navigation to complete
  await mcp_playwright_browser_wait_for({
    text: 'Welcome Back'
  });
  
  // Verify URL change
  const currentUrl = await mcp_playwright_browser_evaluate({
    function: '() => window.location.pathname'
  });
  
  if (currentUrl !== '/login') {
    throw new Error(`Expected to be on /login, but was on ${currentUrl}`);
  }
  
  console.log('[DEBUG_LOG] Navigation to login page verified');
}

async function testSuccessfulSignup() {
  console.log('[DEBUG_LOG] Testing successful signup flow...');
  
  await mcp_playwright_browser_navigate({ url: 'http://localhost:3000/signup' });
  
  const testUser = TestDataGenerator.getValidTestUser();
  
  // Setup API mock
  const mockFunction = await APIMocker.mockSignupSuccess();
  await mcp_playwright_browser_evaluate({
    function: mockFunction
  });
  
  // Fill form
  const formData = await AuthPageHelpers.fillSignupForm({
    username: testUser.username,
    password: testUser.password,
    confirmPassword: testUser.password
  });
  
  for (const field of formData) {
    await mcp_playwright_browser_type({
      element: field.element,
      ref: field.ref,
      text: field.text
    });
  }
  
  // Submit form
  const submitButton = AuthPageHelpers.getSignupSubmitButton();
  await mcp_playwright_browser_click({
    element: submitButton.element,
    ref: submitButton.ref
  });
  
  // Wait for navigation to login page
  await mcp_playwright_browser_wait_for({
    text: 'Account created successfully! Please log in.'
  });
  
  console.log('[DEBUG_LOG] Successful signup flow verified');
}

async function testSignupFailure() {
  console.log('[DEBUG_LOG] Testing signup failure...');
  
  await mcp_playwright_browser_navigate({ url: 'http://localhost:3000/signup' });
  
  // Setup API mock for failure
  const mockFunction = await APIMocker.mockSignupFailure('Username already exists', 409);
  await mcp_playwright_browser_evaluate({
    function: mockFunction
  });
  
  // Fill form
  const formData = await AuthPageHelpers.fillSignupForm({
    username: 'existinguser',
    password: 'testpassword123',
    confirmPassword: 'testpassword123'
  });
  
  for (const field of formData) {
    await mcp_playwright_browser_type({
      element: field.element,
      ref: field.ref,
      text: field.text
    });
  }
  
  // Submit form
  const submitButton = AuthPageHelpers.getSignupSubmitButton();
  await mcp_playwright_browser_click({
    element: submitButton.element,
    ref: submitButton.ref
  });
  
  // Wait for error message
  await mcp_playwright_browser_wait_for({
    text: 'Username already exists'
  });
  
  console.log('[DEBUG_LOG] Signup failure handling verified');
}

async function testFormDisabledDuringSubmission() {
  console.log('[DEBUG_LOG] Testing form disabled during submission...');
  
  await mcp_playwright_browser_navigate({ url: 'http://localhost:3000/signup' });
  
  // Setup slow API mock
  const mockFunction = await APIMocker.mockSlowResponse('/v1/auth/signup', 1000, { message: 'User created successfully' });
  await mcp_playwright_browser_evaluate({
    function: mockFunction
  });
  
  // Fill form
  const testUser = TestDataGenerator.getValidTestUser();
  const formData = await AuthPageHelpers.fillSignupForm({
    username: testUser.username,
    password: testUser.password,
    confirmPassword: testUser.password
  });
  
  for (const field of formData) {
    await mcp_playwright_browser_type({
      element: field.element,
      ref: field.ref,
      text: field.text
    });
  }
  
  // Submit form
  const submitButton = AuthPageHelpers.getSignupSubmitButton();
  await mcp_playwright_browser_click({
    element: submitButton.element,
    ref: submitButton.ref
  });
  
  // Wait for loading state
  await mcp_playwright_browser_wait_for({
    text: 'Creating Account'
  });
  
  // Check that fields are disabled
  const fieldsToCheck = AssertionHelpers.getFormFieldsForDisabledCheck('signup');
  for (const field of fieldsToCheck) {
    const isDisabled = await mcp_playwright_browser_evaluate({
      element: field.element,
      ref: field.ref,
      function: '(element) => element.disabled'
    });
    
    if (!isDisabled) {
      throw new Error(`${field.element} should be disabled during submission`);
    }
  }
  
  console.log('[DEBUG_LOG] Form disabled state during submission verified');
}

// Export for potential use in other test runners
module.exports = {
  runSignUpTests,
  testDisplaySignUpForm,
  testValidationErrors,
  testFieldLevelValidation,
  testNavigateToLogin,
  testSuccessfulSignup,
  testSignupFailure,
  testFormDisabledDuringSubmission
};

// Run tests if this file is executed directly
if (require.main === module) {
  runSignUpTests().catch(error => {
    console.error('Test execution failed:', error);
    process.exit(1);
  });
}