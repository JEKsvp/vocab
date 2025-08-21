package com.abadeksvp.vocabbackend.integration;

import com.abadeksvp.vocabbackend.integration.helpers.TestObjectMapper;
import com.abadeksvp.vocabbackend.integration.helpers.TestUuidGenerator;
import com.abadeksvp.vocabbackend.integration.helpers.TestWordManager;
import com.abadeksvp.vocabbackend.model.WordStatus;
import com.abadeksvp.vocabbackend.model.api.word.response.WordResponse;
import com.abadeksvp.vocabbackend.model.db.Language;
import com.fasterxml.jackson.core.type.TypeReference;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;

import java.util.List;
import java.util.Set;
import java.util.UUID;
import java.util.stream.Collectors;

import static org.junit.jupiter.api.Assertions.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

public class WordsBatchIntegrationTest extends AbstractIntegrationTest {

    @Autowired
    private TestUuidGenerator uuidGenerator;

    @Autowired
    private TestWordManager testWordManager;


    @Test
    public void createWordsBatchTest() throws Exception {
        HttpHeaders authHeader = testUserManager.signUpUserAndAuthHeader();
        for (int i = 0; i < 30; i++) {
            uuidGenerator.setUuid(UUID.randomUUID());
            testWordManager.createWord(authHeader, "/request/words/create-word-glow-request.json");
            uuidGenerator.setUuid(UUID.randomUUID());
            testWordManager.createWord(authHeader, "/request/words/create-word-stop-request.json");
        }
        mockMvc.perform(post("/v1/words-batch/generate")
                        .param("size", "10")
                        .headers(authHeader))
                .andExpect(status().isOk());

        String firstResponse = mockMvc.perform(get("/v1/words-batch")
                        .headers(authHeader))
                .andExpect(status().isOk())
                .andReturn().getResponse().getContentAsString();

        mockMvc.perform(post("/v1/words-batch/generate")
                        .param("size", "10")
                        .headers(authHeader))
                .andExpect(status().isOk());

        String secondResponse = mockMvc.perform(get("/v1/words-batch")
                        .headers(authHeader))
                .andExpect(status().isOk())
                .andReturn().getResponse().getContentAsString();

        List<WordResponse> firstBatch = TestObjectMapper.getInstance().readValue(firstResponse, new TypeReference<>() {
        });

        List<WordResponse> secondBatch = TestObjectMapper.getInstance().readValue(secondResponse, new TypeReference<>() {
        });

        Set<UUID> firstIds = firstBatch.stream()
                .map(WordResponse::getId)
                .collect(Collectors.toSet());

        Set<UUID> secondIds = secondBatch.stream()
                .map(WordResponse::getId)
                .collect(Collectors.toSet());

        assertEquals(firstIds.size(), secondIds.size());
        assertNotEquals(firstIds, secondIds);

        long toLearnCount = firstBatch.stream()
                .filter(word -> WordStatus.TO_LEARN == word.getStatus())
                .count();
        assertEquals(7, toLearnCount);

        long learnedCount = firstBatch.stream()
                .filter(word -> WordStatus.LEARNED == word.getStatus())
                .count();
        assertEquals(3, learnedCount);
    }


    @Test
    public void differentLanguagesDifferentBatchesTest() throws Exception {
        HttpHeaders authHeader = testUserManager.signUpUserAndAuthHeader();
        for (int i = 0; i < 11; i++) {
            uuidGenerator.setUuid(UUID.randomUUID());
            testWordManager.createWord(authHeader, "/request/words/create-word-glow-request.json");
            uuidGenerator.setUuid(UUID.randomUUID());
            testWordManager.createWord(authHeader, "/request/words/create-serbian-word-request.json");
        }
        mockMvc.perform(post("/v1/words-batch/generate")
                        .param("size", "10")
                        .headers(authHeader))
                .andExpect(status().isOk());

        String defaultEnglishBatch = mockMvc.perform(get("/v1/words-batch")
                        .headers(authHeader))
                .andExpect(status().isOk())
                .andReturn().getResponse().getContentAsString();

        mockMvc.perform(post("/v1/words-batch/generate")
                        .param("size", "10")
                        .param("language", "ENGLISH")
                        .headers(authHeader))
                .andExpect(status().isOk());

        String explicitEnglishBatchResponse = mockMvc.perform(get("/v1/words-batch")
                        .param("language", "ENGLISH")
                        .headers(authHeader))
                .andExpect(status().isOk())
                .andReturn().getResponse().getContentAsString();

        mockMvc.perform(post("/v1/words-batch/generate")
                        .param("size", "10")
                        .param("language", "SERBIAN")
                        .headers(authHeader))
                .andExpect(status().isOk());

        String serbianBatchResponse = mockMvc.perform(get("/v1/words-batch")
                        .param("language", "SERBIAN")
                        .headers(authHeader))
                .andExpect(status().isOk())
                .andReturn().getResponse().getContentAsString();

        List<WordResponse> englishBatch = TestObjectMapper.getInstance().readValue(defaultEnglishBatch, new TypeReference<>() {
        });

        List<WordResponse> explicitEnglishBatch = TestObjectMapper.getInstance().readValue(explicitEnglishBatchResponse, new TypeReference<>() {
        });
        List<WordResponse> serbianBatch = TestObjectMapper.getInstance().readValue(serbianBatchResponse, new TypeReference<>() {
        });

        assertTrue(englishBatch.stream()
                .noneMatch(word -> Language.SERBIAN == word.getLanguage())
        );

        assertTrue(explicitEnglishBatch.stream()
                .noneMatch(word -> Language.SERBIAN == word.getLanguage())
        );

        assertTrue(serbianBatch.stream()
                .noneMatch(word -> Language.ENGLISH == word.getLanguage())
        );
    }

}
