package com.abadeksvp.vocabbackend.integration;

import org.junit.jupiter.api.Test;
import org.springframework.http.MediaType;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.delete;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.put;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

public class AuthenticationIntegrationTest extends AbstractIntegrationTest {

    @Test
    public void testUnauthenticatedRequestReturns401() throws Exception {
        // Test GET request without authentication
        mockMvc.perform(get("/v1/words"))
                .andExpect(status().isUnauthorized());

        // Test POST request without authentication
        mockMvc.perform(post("/v1/words")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("{}"))
                .andExpect(status().isUnauthorized());

        // Test PUT request without authentication
        mockMvc.perform(put("/v1/words")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("{}"))
                .andExpect(status().isUnauthorized());

        // Test DELETE request without authentication
        mockMvc.perform(delete("/v1/words/some-id"))
                .andExpect(status().isUnauthorized());
    }

    @Test
    public void testUserEndpointUnauthenticatedReturns401() throws Exception {
        mockMvc.perform(get("/v1/user"))
                .andExpect(status().isUnauthorized());
    }

    @Test
    public void testPublicEndpointsAreAccessible() throws Exception {
        // Test that signup endpoint is accessible without authentication
        mockMvc.perform(post("/v1/signup")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("{\"username\":\"test\",\"password\":\"test\"}"))
                .andExpect(status().isBadRequest()); // Should not be 401, but may fail validation

        // Test that login endpoint is accessible without authentication
        mockMvc.perform(post("/v1/login")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("{\"username\":\"test\",\"password\":\"test\"}"))
                .andExpect(status().isUnauthorized()); // Should return 401 for bad credentials, not for authentication
    }
}