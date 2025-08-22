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
npm install
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
npm test

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
  - Contains npm dependencies that can be regenerated via `npm install`
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