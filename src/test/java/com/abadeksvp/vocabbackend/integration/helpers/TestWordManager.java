package com.abadeksvp.vocabbackend.integration.helpers;

import org.apache.commons.io.IOUtils;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.testcontainers.shaded.com.google.common.base.Charsets;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

public class TestWordManager {

    private final MockMvc mockMvc;

    public TestWordManager(MockMvc mockMvc) {
        this.mockMvc = mockMvc;
    }


    public void createWord(HttpHeaders authHeader, String requestPath) throws Exception {
        String createWordRequest = IOUtils.toString(getClass().getResource(requestPath), Charsets.UTF_8);
        mockMvc.perform(post("/v1/words")
                        .param("status", "TO_LEARN")
                        .contentType(MediaType.APPLICATION_JSON)
                        .headers(authHeader)
                        .content(createWordRequest))
                .andExpect(status().isOk());
    }
}
