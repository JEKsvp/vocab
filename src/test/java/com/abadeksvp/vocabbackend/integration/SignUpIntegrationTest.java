package com.abadeksvp.vocabbackend.integration;

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
        String requestBody = IOUtils.toString(getClass().getResource("/request/sign-up-request.json"), Charsets.UTF_8);
        String expectedResponse = IOUtils.toString(getClass().getResource("/response/sign-up-response.json"), Charsets.UTF_8);
        String actualResponse = mockMvc.perform(post("/v1/signup")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(requestBody))
                .andExpect(status().isOk())
                .andReturn().getResponse().getContentAsString();
        JSONAssert.assertEquals(expectedResponse, actualResponse, JSONCompareMode.NON_EXTENSIBLE);
    }

    @Test
    public void invalidSignUpTest() throws Exception {
        String requestBody = IOUtils.toString(getClass().getResource("/request/invalid-sign-up-request.json"), Charset.defaultCharset());
        String expectedResponse = IOUtils.toString(getClass().getResource("/response/invalid-sign-up-response.json"), Charset.defaultCharset());
        String actualResponse = mockMvc.perform(post("/v1/signup")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(requestBody))
                .andExpect(status().is4xxClientError())
                .andReturn().getResponse().getContentAsString();
        JSONAssert.assertEquals(expectedResponse, actualResponse, excludeFields("id"));
    }
}
