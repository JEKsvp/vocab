package com.abadeksvp.vocabbackend.integration;

import com.abadeksvp.vocabbackend.integration.helpers.TestDateTimeGenerator;
import com.abadeksvp.vocabbackend.integration.helpers.TestUuidGenerator;
import com.abadeksvp.vocabbackend.integration.helpers.TestWordManager;
import com.abadeksvp.vocabbackend.model.api.SignUpRequest;
import com.abadeksvp.vocabbackend.model.api.UserResponse;
import org.apache.commons.io.IOUtils;
import org.junit.jupiter.api.Test;
import org.skyscreamer.jsonassert.JSONAssert;
import org.skyscreamer.jsonassert.JSONCompareMode;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.testcontainers.shaded.com.google.common.base.Charsets;

import java.time.LocalDateTime;
import java.util.UUID;

import static com.abadeksvp.vocabbackend.integration.helpers.TestDateTimeGenerator.FORMATTER;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

public class WordsIntegrationTest extends AbstractIntegrationTest {

    public static final UUID GLOW_WORD_ID = UUID.fromString("5d764a34-04c7-4878-a676-8574f9a336a4");
    public static final UUID STOP_WORD_ID = UUID.fromString("5d764a34-04c7-4878-a676-8574f9a336a5");
    public static final UUID FAST_WORD_ID = UUID.fromString("5d764a34-04c7-4878-a676-8574f9a336a6");
    public static final UUID FINISH_WORD_ID = UUID.fromString("5d764a34-04c7-4878-a676-8574f9a336a7");
    public static final UUID SERBIAN_WORD_ID = UUID.fromString("5d764a34-04c7-4878-a676-8574f9a336a8");

    public static final LocalDateTime GLOW_WORD_DATE_TIME = LocalDateTime.parse("2022-09-25 22:30:40", FORMATTER);
    public static final LocalDateTime STOP_WORD_DATE_TIME = LocalDateTime.parse("2022-09-26 22:30:40", FORMATTER);
    public static final LocalDateTime FAST_WORD_DATE_TIME = LocalDateTime.parse("2022-09-27 22:30:40", FORMATTER);
    public static final LocalDateTime FINISH_WORD_DATE_TIME = LocalDateTime.parse("2022-09-28 22:30:40", FORMATTER);
    public static final LocalDateTime SERBIAN_WORD_DATE_TIME = LocalDateTime.parse("2022-09-29 22:30:40", FORMATTER);

    @Autowired
    private TestUuidGenerator uuidGenerator;

    @Autowired
    private TestDateTimeGenerator dateTimeGenerator;

    @Autowired
    private TestWordManager testWordManager;

    @Test
    public void createAndChangeWordTest() throws Exception {
        HttpHeaders authHeader = testUserManager.signUpUserAndAuthHeader();
        createWordGlow(authHeader);


        String updateWordRequest = IOUtils.toString(getClass().getResource("/request/words/update-word-request.json"), Charsets.UTF_8);
        String actualUpdateWordResponse = mockMvc.perform(put("/v1/words")
                        .contentType(MediaType.APPLICATION_JSON)
                        .headers(authHeader)
                        .content(updateWordRequest))
                .andExpect(status().isOk())
                .andReturn().getResponse().getContentAsString();
        String expectedUpdateWordResponse = IOUtils.toString(getClass().getResource("/response/words/update-word-response.json"), Charsets.UTF_8);
        JSONAssert.assertEquals(expectedUpdateWordResponse, actualUpdateWordResponse, JSONCompareMode.STRICT);

        String changeStatusRequest = IOUtils.toString(getClass().getResource("/request/words/change-status-request.json"), Charsets.UTF_8);
        String actualChangeStatusWordResponse = mockMvc.perform(patch("/v1/words/status")
                        .contentType(MediaType.APPLICATION_JSON)
                        .headers(authHeader)
                        .content(changeStatusRequest))
                .andExpect(status().isOk())
                .andReturn().getResponse().getContentAsString();
        String expectedChangeStatusRequest = IOUtils.toString(getClass().getResource("/response/words/change-status-response.json"), Charsets.UTF_8);
        JSONAssert.assertEquals(expectedChangeStatusRequest, actualChangeStatusWordResponse, JSONCompareMode.STRICT);
    }

    @Test
    public void getWordsTest() throws Exception {
        HttpHeaders authHeader = testUserManager.signUpUserAndAuthHeader();
        createWordGlow(authHeader);
        createWordStop(authHeader);
        createWordFast(authHeader);
        createWordFinish(authHeader);

        String actualAllToLearnWordsResponse = mockMvc.perform(get("/v1/words")
                        .param("status", "TO_LEARN")
                        .headers(authHeader))
                .andExpect(status().isOk())
                .andReturn().getResponse().getContentAsString();

        String expectedAllToLearnWordsResponse = IOUtils.toString(getClass().getResource("/response/words/get-to-learn-words-response.json"), Charsets.UTF_8);
        JSONAssert.assertEquals(expectedAllToLearnWordsResponse, actualAllToLearnWordsResponse, JSONCompareMode.STRICT);

        String actualAllLearnedWordsResponse = mockMvc.perform(get("/v1/words")
                        .param("status", "LEARNED")
                        .headers(authHeader))
                .andExpect(status().isOk())
                .andReturn().getResponse().getContentAsString();

        String expectedAllLearnedWordsResponse = IOUtils.toString(getClass().getResource("/response/words/get-learned-words-response.json"), Charsets.UTF_8);
        JSONAssert.assertEquals(expectedAllLearnedWordsResponse, actualAllLearnedWordsResponse, JSONCompareMode.STRICT);
    }

    @Test
    public void returnOnlyUsersWords() throws Exception {
        UserResponse user1 = testUserManager.signUp(SignUpRequest.builder()
                .username("aaaaaa")
                .password("aaaaaa")
                .build());
        HttpHeaders authHeader1 = testUserManager.obtainAuthHeader("aaaaaa", "aaaaaa");

        UserResponse user2 = testUserManager.signUp(SignUpRequest.builder()
                .username("aaaaab")
                .password("aaaaab")
                .build());
        HttpHeaders authHeader2 = testUserManager.obtainAuthHeader("aaaaab", "aaaaab");

        createWordGlow(authHeader1);
        createWordFinish(authHeader2);

        mockMvc.perform(get("/v1/words")
                        .headers(authHeader1))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.data.length()").value(1))
                .andExpect(jsonPath("$.data[*].id").value(GLOW_WORD_ID.toString()));

        mockMvc.perform(get("/v1/words")
                        .headers(authHeader2))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.data.length()").value(1))
                .andExpect(jsonPath("$.data[*].id").value(FINISH_WORD_ID.toString()));

    }

    @Test
    public void createSerbianWord() throws Exception {
        HttpHeaders authHeader = testUserManager.signUpUserAndAuthHeader();
        createWord(authHeader,
                SERBIAN_WORD_ID,
                "/request/words/create-serbian-word-request.json",
                SERBIAN_WORD_DATE_TIME);

        String actualAllToLearnWordsResponse = mockMvc.perform(get("/v1/words")
                        .param("status", "TO_LEARN")
                        .param("language", "SERBIAN")
                        .headers(authHeader))
                .andExpect(status().isOk())
                .andReturn().getResponse().getContentAsString();

        String expectedAllToLearnWordsResponse = IOUtils.toString(getClass().getResource("/response/words/get-serbian-words-response.json"), Charsets.UTF_8);
        JSONAssert.assertEquals(expectedAllToLearnWordsResponse, actualAllToLearnWordsResponse, JSONCompareMode.STRICT);
    }


    private void createWordGlow(HttpHeaders authHeader) throws Exception {
        createWord(authHeader,
                GLOW_WORD_ID,
                "/request/words/create-word-glow-request.json",
                GLOW_WORD_DATE_TIME);
    }

    private void createWordStop(HttpHeaders authHeader) throws Exception {
        createWord(authHeader,
                STOP_WORD_ID,
                "/request/words/create-word-stop-request.json",
                STOP_WORD_DATE_TIME);
    }

    private void createWordFast(HttpHeaders authHeader) throws Exception {
        createWord(authHeader,
                FAST_WORD_ID,
                "/request/words/create-word-fast-request.json",
                FAST_WORD_DATE_TIME);
    }

    private void createWordFinish(HttpHeaders authHeader) throws Exception {
        createWord(authHeader,
                FINISH_WORD_ID,
                "/request/words/create-word-finish-request.json",
                FINISH_WORD_DATE_TIME);
    }

    private void createWord(HttpHeaders authHeader, UUID wordId, String requestPath, LocalDateTime datetime) throws Exception {
        uuidGenerator.setUuid(wordId);
        dateTimeGenerator.setDateTime(datetime);
        testWordManager.createWord(authHeader, requestPath);
    }
}
