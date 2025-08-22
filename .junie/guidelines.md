# Vocab Backend Development Guidelines

## Project Overview
This is a vocabulary learning application built with Spring Boot 3.3.3 backend and React 19 frontend. The project uses MongoDB for data persistence and includes comprehensive testing infrastructure.

## Build/Configuration Instructions

### Command Notation for Multiple Commands
- When providing multiple commands in a single line, use semicolon-separated notation: <command1>; <command2>; <commandN>.
- Insert a space after each semicolon for readability.
- Do not use &&, &, or newline-separated forms in this notation; prefer ;.
- Use quotes if an argument contains spaces: <cmd "arg with spaces">; <next-cmd>.
- For platform-specific lines, provide separate lines for each OS if needed, each using the same semicolon-separated style.

### Prerequisites
- **Java 21** (configured with toolchain)
- **Node.js/npm** (for client build)
- **Docker** (required for integration tests with Testcontainers)
- **MongoDB** (via Docker Compose for local development)

### Environment Setup

#### Database Setup
1. Start MongoDB using Docker Compose:
   ```bash
   # From project root
   cd env
   docker-compose up -d mongo
   ```
   - MongoDB runs on port 27017
   - Database: `vocab`
   - Credentials: `root/testpassword`
   - Mongo Express UI available at http://localhost:8085

#### Development Configuration
- Main application runs on port 8080
- MongoDB URI: `mongodb://root:testpassword@127.0.0.1:27017/vocab?authSource=admin`
- JWT-based authentication with OAuth2
- Custom logging levels for service and security packages

### Build Process

#### Full Application Build
```bash
# Builds both backend and frontend
./gradlew build
```

#### Backend Only
```bash
./gradlew assemble -x npmBuild -x npmInstall
```

#### Frontend Only
```bash
cd client
npm install --no-audit --no-fund
npm run build
```

#### Development Server
```bash
# Backend
./gradlew bootRun

# Frontend (separate terminal)
cd client
npm start
```

**Note**: The build system automatically integrates React client build into Spring Boot's static resources via the `processResources` task. Client builds to `client/dist` and gets copied to `static/` in the final JAR.

## Testing Information

### Backend Testing

#### Test Infrastructure
- **Testcontainers** with MongoDB 7.0.12 for integration tests
- **JUnit 5** with Spring Boot Test
- **MockMvc** for web layer testing
- **JSONAssert** for API response validation
- Docker availability check before running tests

#### Test Categories
1. **Unit Tests**: Direct class testing (e.g., `ShufflerTest.java`)
2. **Integration Tests**: Full Spring context with Testcontainers

#### Running Backend Tests
```bash
# All tests
./gradlew test

# Specific test class
./gradlew test --tests "com.abadeksvp.vocabbackend.integration.SignUpIntegrationTest"

# Unit tests only (excluding integration)
./gradlew test --exclude-task integrationTest
```

#### Test Configuration
- Test profile activated with `@ActiveProfiles("test")`
- Automatic database cleanup after each test
- Dynamic property configuration for test database
- Test-specific beans (TestDateTimeGenerator, TestUuidGenerator)

#### Integration Test Pattern
```java
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
@Import(IntegrationTestsConfiguration.class)
@ActiveProfiles("test")
@AutoConfigureMockMvc
@Testcontainers
public abstract class AbstractIntegrationTest {
    // Base setup for integration tests
}
```

#### Test Data Management
- JSON request/response fixtures in `src/test/resources/`
- `FileReader` helper for loading test data
- `JsonComparators.excludeFields()` for flexible response comparison
- Test helpers: `TestUserManager`, `TestWordManager`

### Frontend Testing

#### Test Setup
- **React Testing Library** with **Jest**
- **@testing-library/user-event** for interaction testing
- **@testing-library/jest-dom** for custom matchers

#### Running Frontend Tests
```bash
cd client

# Interactive mode
npm test -- --watchAll=false

# Single run (CI mode)
npm test -- --watchAll=false

# With coverage
npm test -- --coverage --watchAll=false
```

#### Example Test Execution
```bash
# Verified working test output:
Test Suites: 1 passed, 1 total
Tests:       4 passed, 4 total
```

### End-to-End Testing with MCP

#### MCP Setup
- **MCP (Model Context Protocol)** for cross-browser end-to-end testing via MCP server
- **Cross-browser support**: Chromium, Firefox, WebKit via MCP browser tools
- **Test utilities** for authentication flows and API mocking
- **MCP browser tools** for direct browser interaction and testing

#### MCP Server Browser Tools
The MCP (Model Context Protocol) server provides browser automation capabilities without requiring local Playwright installation or console commands. Key MCP browser functions include:

- **Browser Management**: `mcp_playwright_browser_navigate`, `mcp_playwright_browser_close`
- **Element Interaction**: `mcp_playwright_browser_click`, `mcp_playwright_browser_type`, `mcp_playwright_browser_hover`
- **Form Handling**: `mcp_playwright_browser_select_option`, `mcp_playwright_browser_file_upload`
- **Page Analysis**: `mcp_playwright_browser_snapshot`, `mcp_playwright_browser_take_screenshot`
- **Network Monitoring**: `mcp_playwright_browser_network_requests`
- **Console Access**: `mcp_playwright_browser_console_messages`

#### Test Configuration
Test files are located in `client/e2e/`:
- **Test directory**: `client/e2e/`
- **Test files**: `signup.spec.js`, `login.spec.js`
- **Utilities**: `test-utils.js` (TestDataGenerator, APIMocker, AuthPageHelpers)
- **Base URL**: `http://localhost:3000` (React dev server)

#### Running Tests with MCP Server
Instead of console commands, use MCP server browser tools directly:

```javascript
// Navigate to application
await mcp_playwright_browser_navigate({ url: 'http://localhost:3000/signup' });

// Take page snapshot for analysis
await mcp_playwright_browser_snapshot();

// Interact with form elements
await mcp_playwright_browser_type({
  element: 'Username field',
  ref: 'input[name="username"]',
  text: 'testuser123'
});

// Click submit button
await mcp_playwright_browser_click({
  element: 'Create Account button',
  ref: 'button[type="submit"]'
});
```

#### Test Structure
Tests are organized in `client/e2e/`:
- **signup.spec.js**: Sign up form validation and flow testing
- **login.spec.js**: Login form validation and authentication testing
- **test-utils.js**: Shared utilities for data generation and API mocking

#### Example E2E Test
```javascript
const { TestDataGenerator, APIMocker, AuthPageHelpers } = require('./test-utils');

async function testSuccessfulSignup() {
  console.log('[DEBUG_LOG] Testing successful signup flow...');
  
  const testUser = TestDataGenerator.getValidTestUser();
  
  // Navigate to signup page
  await mcp_playwright_browser_navigate({ url: 'http://localhost:3000/signup' });
  
  // Mock successful API response using browser evaluation
  const mockFunction = await APIMocker.mockSignupSuccess();
  await mcp_playwright_browser_evaluate({ function: mockFunction });
  
  // Fill form using MCP browser functions
  await mcp_playwright_browser_type({
    element: 'Username field',
    ref: 'input[name="username"]',
    text: testUser.username
  });
  
  await mcp_playwright_browser_type({
    element: 'Password field',
    ref: 'input[name="password"]',
    text: testUser.password
  });
  
  await mcp_playwright_browser_type({
    element: 'Confirm Password field',
    ref: 'input[name="confirmPassword"]',
    text: testUser.password
  });
  
  // Submit form
  const submitButton = AuthPageHelpers.getSignupSubmitButton();
  await mcp_playwright_browser_click({
    element: submitButton.element,
    ref: submitButton.ref
  });
  
  // Wait for navigation to login page
  await mcp_playwright_browser_wait_for({
    text: 'Sign In'
  });
  
  // Verify URL change
  const currentUrl = await mcp_playwright_browser_evaluate({
    function: '() => window.location.pathname'
  });
  
  if (currentUrl !== '/login') {
    throw new Error(`Expected to be on /login, but was on ${currentUrl}`);
  }
  
  console.log('[DEBUG_LOG] Successful signup flow verified');
}
```

#### Test Utilities
The `test-utils.js` file provides:

**TestDataGenerator**:
- `generateUniqueUsername()`: Creates unique test usernames
- `generateValidPassword()`: Creates valid passwords
- `getValidTestUser()`: Returns complete test user data
- `getInvalidUsernames()`: Test data for validation scenarios

**APIMocker**:
- `mockSignupSuccess()`: Mock successful signup API calls
- `mockLoginSuccess()`: Mock successful login API calls
- `mockSignupFailure()`: Mock API error responses
- `mockSlowResponse()`: Test loading states with delayed responses

**AuthPageHelpers**:
- `fillSignupForm()`: Helper to fill signup form fields
- `fillLoginForm()`: Helper to fill login form fields
- `submitSignupForm()`: Submit signup form
- `navigateToLogin()`: Navigate between auth pages

#### Test Coverage
Current MCP tests cover:

**Sign Up Flow**:
- Form field validation (username/password length, password confirmation)
- Successful account creation and navigation to login
- Error handling for existing users or server errors
- Loading states and form disabling during submission
- Navigation between signup and login pages

**Login Flow**:
- Successful authentication and navigation to home page
- Form submission with various input combinations
- Loading states during authentication
- Error handling for invalid credentials or network issues
- Success message display from signup redirect

#### Debugging MCP Tests
Instead of console commands, use MCP server browser tools for debugging:

**Page Analysis and Debugging**:
```javascript
// Take screenshot for visual debugging
await mcp_playwright_browser_take_screenshot({
  filename: 'debug-screenshot.png',
  fullPage: true
});

// Capture page snapshot to analyze elements
await mcp_playwright_browser_snapshot();

// Monitor console messages for errors
await mcp_playwright_browser_console_messages();

// Track network requests for API debugging
await mcp_playwright_browser_network_requests();
```

**Interactive Debugging**:
```javascript
// Evaluate JavaScript on page for debugging
await mcp_playwright_browser_evaluate({
  function: '() => { console.log("Debug info:", document.title); }'
});

// Hover over elements to inspect them
await mcp_playwright_browser_hover({
  element: 'Form field',
  ref: 'input[name="username"]'
});
```

#### Best Practices
- **API Mocking**: Always mock API responses to avoid dependencies on backend state
- **Unique Test Data**: Use `TestDataGenerator` to avoid conflicts between test runs
- **Page Object Pattern**: Use helper classes for common interactions
- **Selective Testing**: Focus on critical user journeys rather than exhaustive coverage
- **Stable Selectors**: Use semantic selectors (labels, roles) over CSS selectors
- **Wait Strategies**: Use MCP browser wait functions rather than manual timeouts

#### Troubleshooting
- **Server Not Starting**: Ensure React dev server can start on port 3000
- **Test Flakiness**: Check for proper API mocking and avoid race conditions
- **MCP Server Connection**: Ensure MCP server is properly configured and accessible
- **Port Conflicts**: Make sure port 3000 is available for test server
- **Element Selection Issues**: Use stable selectors and verify element references with browser snapshot

### Adding New Tests

#### Backend Integration Test
1. Extend `AbstractIntegrationTest`
2. Create request/response JSON fixtures in `src/test/resources/`
3. Use `MockMvc` for HTTP testing
4. Use `JSONAssert` for response validation

```java
@Test
public void testEndpoint() throws Exception {
    String requestBody = fileReader.read("/request/test-request.json");
    String expectedResponse = fileReader.read("/response/test-response.json");
    
    String actualResponse = mockMvc.perform(post("/v1/endpoint")
            .contentType(MediaType.APPLICATION_JSON)
            .content(requestBody))
        .andExpected(status().isOk())
        .andReturn().getResponse().getContentAsString(StandardCharsets.UTF_8);
    
    JSONAssert.assertEquals(expectedResponse, actualResponse, JSONCompareMode.NON_EXTENSIBLE);
}
```

#### Frontend Test
```javascript
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from '../app/store';

test('renders component', () => {
  render(
    <Provider store={store}>
      <ComponentToTest />
    </Provider>
  );
  expect(screen.getByText('Expected Text')).toBeInTheDocument();
});
```

## Additional Development Information

### File and Directory Management
- **node_modules/**: Should be ignored in version control and excluded from project searches/indexing
  - Contains npm dependencies that can be regenerated via `npm install --no-audit --no-fund`
  - Located in `client/node_modules/` directory
- **dist/**: Should be ignored in version control as it contains build artifacts
  - Frontend build output directory (`client/dist/`)
  - Automatically generated during build process
  - Contents get copied to Spring Boot's static resources

### Technology Stack
- **Backend**: Spring Boot 3.3.3, Spring Security, Spring Data MongoDB
- **Database**: MongoDB with Querydsl 5.1.0
- **Frontend**: React 19, Redux Toolkit, Material-UI, React Router
- **Testing**: Testcontainers 1.20.1, JUnit 5, React Testing Library
- **Build**: Gradle with integrated npm build process

### Code Organization
- Integration test helpers in `com.abadeksvp.vocabbackend.integration.helpers`
- Test configuration in `IntegrationTestsConfiguration`
- JSON fixtures organized by feature in test resources
- Cross-platform build support (Windows/Linux npm detection)

### Security Configuration
- JWT tokens with configurable validity periods
- OAuth2 resource server setup
- Custom signing key and client credentials
- Security realm: "vocab realmushka"

### Logging Configuration
- Root level: INFO (dev), DEBUG (test)
- Service package: DEBUG level
- Security package: DEBUG level

### Docker Integration
- Testcontainers requires Docker daemon running
- Tests automatically skip if Docker unavailable
- MongoDB container lifecycle managed automatically
- Database cleanup between test runs

### Build Optimization Notes
- Client build outputs to `client/dist` via BUILD_PATH environment variable
- Cross-platform npm command detection (`npm.cmd` on Windows)
- No audit/fund flags for faster npm install
- Static resources integration via processResources task dependency

### Troubleshooting
- Ensure Docker is running before integration tests
- MongoDB connection issues: verify docker-compose services are up
- Frontend proxy configured for `http://localhost:8080`
- Test failures: check database state and cleanup between runs