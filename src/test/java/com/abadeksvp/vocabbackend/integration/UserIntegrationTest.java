package com.abadeksvp.vocabbackend.integration;

import com.abadeksvp.vocabbackend.integration.helpers.TestObjectMapper;
import com.abadeksvp.vocabbackend.model.api.UserResponse;
import java.nio.charset.StandardCharsets;
import org.junit.jupiter.api.Test;
import org.skyscreamer.jsonassert.JSONAssert;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;

import static com.abadeksvp.vocabbackend.integration.helpers.TestUserManager.DEFAULT_TEST_USERNAME;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

public class UserIntegrationTest extends AbstractIntegrationTest {

    @Test
    @WithMockUser(username = DEFAULT_TEST_USERNAME)
    public void getCurrentUserTest() throws Exception {
        UserResponse userResponse = testUserManager.signUpDefaultTestUser();
        String response = mockMvc.perform(
                        get("/v1/current-user")
                                .contentType(MediaType.APPLICATION_JSON)
                )
                .andExpect(status().isOk())
                .andReturn().getResponse().getContentAsString(StandardCharsets.UTF_8);
        JSONAssert.assertEquals(TestObjectMapper.getInstance().writeValueAsString(userResponse), response, false);
    }
}
