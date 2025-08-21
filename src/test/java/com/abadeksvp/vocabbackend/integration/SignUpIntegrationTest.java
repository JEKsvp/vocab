package com.abadeksvp.vocabbackend.integration;

import java.nio.charset.StandardCharsets;
import org.apache.commons.io.IOUtils;
import org.junit.jupiter.api.Test;
import org.skyscreamer.jsonassert.JSONAssert;
import org.skyscreamer.jsonassert.JSONCompareMode;
import org.springframework.http.MediaType;
import org.testcontainers.shaded.com.google.common.base.Charsets;

import java.nio.charset.Charset;

import static com.abadeksvp.vocabbackend.integration.helpers.JsonComparators.excludeFields;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;


public class SignUpIntegrationTest extends AbstractIntegrationTest{

    @Test
    public void validSignUpTest() throws Exception {
        String requestBody = fileReader.read("/request/sign-up-request.json");
        String expectedResponse = fileReader.read("/response/sign-up-response.json");
        String actualResponse = mockMvc.perform(post("/v1/signup")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(requestBody))
                .andExpect(status().isOk())
                .andReturn().getResponse().getContentAsString(StandardCharsets.UTF_8);
        JSONAssert.assertEquals(expectedResponse, actualResponse, JSONCompareMode.NON_EXTENSIBLE);
    }

    @Test
    public void invalidSignUpTest() throws Exception {
        String requestBody = fileReader.read("/request/invalid-sign-up-request.json");
        String expectedResponse = fileReader.read("/response/invalid-sign-up-response.json");
        String actualResponse = mockMvc.perform(post("/v1/signup")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(requestBody))
                .andExpect(status().is4xxClientError())
                .andReturn().getResponse().getContentAsString(StandardCharsets.UTF_8);
        JSONAssert.assertEquals(expectedResponse, actualResponse, excludeFields("id"));
    }
}
