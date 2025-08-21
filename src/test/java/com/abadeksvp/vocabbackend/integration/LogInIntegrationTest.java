package com.abadeksvp.vocabbackend.integration;

import org.junit.jupiter.api.Test;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.ResultActions;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;

import static com.abadeksvp.vocabbackend.integration.helpers.DefaultClient.CLIENT_ID;
import static com.abadeksvp.vocabbackend.integration.helpers.DefaultClient.SECRET;
import static com.abadeksvp.vocabbackend.integration.helpers.TestUserManager.DEFAULT_TEST_PASSWORD;
import static com.abadeksvp.vocabbackend.integration.helpers.TestUserManager.DEFAULT_TEST_USERNAME;
import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.httpBasic;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

public class LogInIntegrationTest extends AbstractIntegrationTest {

    @Test
    public void validLogInTest() throws Exception {
        testUserManager.signUpDefaultTestUser();

        MultiValueMap<String, String> params = new LinkedMultiValueMap<>();
        params.add("grant_type", "password");
        params.add("username", DEFAULT_TEST_USERNAME);
        params.add("password", DEFAULT_TEST_PASSWORD);

        ResultActions result
                = mockMvc.perform(post("/oauth/token")
                        .params(params)
                        .with(httpBasic(CLIENT_ID, SECRET))
                        .accept(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8));

        String resultString = result.andReturn().getResponse().getContentAsString();
        System.out.println(resultString);
    }
}
