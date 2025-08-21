package com.abadeksvp.vocabbackend.integration;

import com.abadeksvp.vocabbackend.integration.configuration.IntegrationTestsConfiguration;
import com.abadeksvp.vocabbackend.integration.helpers.TestUserManager;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.Assumptions;
import org.junit.jupiter.api.BeforeAll;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.context.annotation.Import;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.DynamicPropertyRegistry;
import org.springframework.test.context.DynamicPropertySource;
import org.springframework.test.web.servlet.MockMvc;
import org.testcontainers.DockerClientFactory;
import org.testcontainers.containers.MongoDBContainer;
import org.testcontainers.junit.jupiter.Testcontainers;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
@Import(IntegrationTestsConfiguration.class)
@ActiveProfiles("test")
@AutoConfigureMockMvc
@Testcontainers
public abstract class AbstractIntegrationTest {

    @BeforeAll
    static void checkDockerAvailability() {
        Assumptions.assumeTrue(DockerClientFactory.instance().isDockerAvailable(), "Docker not available for Testcontainers");
    }

    private static final MongoDBContainer MONGO_DB_CONTAINER = new MongoDBContainer("mongo:7.0.12");

    static {
        MONGO_DB_CONTAINER.start();
    }

    @DynamicPropertySource
    static void registerMongoProperties(DynamicPropertyRegistry registry) {
        registry.add("spring.data.mongodb.uri", () -> MONGO_DB_CONTAINER.getConnectionString() + "/vocab_test");
        registry.add("spring.data.mongodb.database", () -> "vocab_test");
    }

    @Autowired
    protected MockMvc mockMvc;

    @Autowired
    protected TestUserManager testUserManager;

    @Autowired
    private MongoTemplate mongoTemplate;

    @AfterEach
    public void cleanup() {
        mongoTemplate.getCollectionNames()
            .forEach(collection -> mongoTemplate.dropCollection(collection));
    }
}
