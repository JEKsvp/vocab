package com.abadeksvp.vocabbackend.integration;

import com.abadeksvp.vocabbackend.integration.configuration.IntegrationTestsConfiguration;
import com.abadeksvp.vocabbackend.integration.helpers.TestUserManager;
import org.junit.jupiter.api.AfterEach;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.context.annotation.Import;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.web.servlet.MockMvc;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
@Import(IntegrationTestsConfiguration.class)
@ActiveProfiles("test")
@AutoConfigureMockMvc
public abstract class AbstractIntegrationTest {

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
