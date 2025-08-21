package com.abadeksvp.vocabbackend.integration.helpers;

import org.apache.commons.io.IOUtils;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.RequestPostProcessor;
import org.testcontainers.shaded.com.google.common.base.Charsets;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

public class TestWordManager {

    private final MockMvc mockMvc;

    public TestWordManager(MockMvc mockMvc) {
        this.mockMvc = mockMvc;
    }

    public void createWord(HttpHeaders authHeader, String requestPath) throws Exception {
        // Backward-compatible method; ignore headers and delegate to the new overload
        createWord(requestPath);
    }

    public void createWord(String requestPath) throws Exception {
        createWord(requestPath, null);
    }

    public void createWord(String requestPath, RequestPostProcessor postProcessor) throws Exception {
        String createWordRequest = IOUtils.toString(getClass().getResource(requestPath), Charsets.UTF_8);
        var builder = post("/v1/words")
                .param("status", "TO_LEARN")
                .contentType(MediaType.APPLICATION_JSON)
                .content(createWordRequest);
        if (postProcessor != null) {
            builder = builder.with(postProcessor);
        }
        mockMvc.perform(builder)
                .andExpect(status().isOk());
    }
}
