package com.abadeksvp.vocabbackend.integration;

import com.abadeksvp.vocabbackend.integration.helpers.TestDateTimeGenerator;
import com.abadeksvp.vocabbackend.integration.helpers.TestUuidGenerator;
import com.abadeksvp.vocabbackend.integration.helpers.TestWordManager;
import com.abadeksvp.vocabbackend.model.api.SignUpRequest;
import com.abadeksvp.vocabbackend.model.api.UserResponse;
import java.nio.charset.StandardCharsets;
import org.apache.commons.io.IOUtils;
import org.junit.jupiter.api.Test;
import org.skyscreamer.jsonassert.JSONAssert;
import org.skyscreamer.jsonassert.JSONCompareMode;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.request.RequestPostProcessor;
import org.testcontainers.shaded.com.google.common.base.Charsets;

import java.time.LocalDateTime;
import java.util.UUID;

import static com.abadeksvp.vocabbackend.integration.helpers.TestDateTimeGenerator.FORMATTER;
import static com.abadeksvp.vocabbackend.integration.helpers.TestUserManager.DEFAULT_TEST_USERNAME;
import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.user;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@WithMockUser(username = DEFAULT_TEST_USERNAME)
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
        testUserManager.signUpDefaultTestUser();
        createWordGlow();

        String updateWordRequest = fileReader.read("/request/words/update-word-request.json");
        String actualUpdateWordResponse = mockMvc.perform(put("/v1/words")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(updateWordRequest))
                .andExpect(status().isOk())
                .andReturn().getResponse().getContentAsString(StandardCharsets.UTF_8);
        String expectedUpdateWordResponse = fileReader.read("/response/words/update-word-response.json");
        JSONAssert.assertEquals(expectedUpdateWordResponse, actualUpdateWordResponse, JSONCompareMode.STRICT);

        String changeStatusRequest = fileReader.read("/request/words/change-status-request.json");
        String actualChangeStatusWordResponse = mockMvc.perform(patch("/v1/words/status")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(changeStatusRequest))
                .andExpect(status().isOk())
                .andReturn().getResponse().getContentAsString(StandardCharsets.UTF_8);
        String expectedChangeStatusRequest = fileReader.read("/response/words/change-status-response.json");
        JSONAssert.assertEquals(expectedChangeStatusRequest, actualChangeStatusWordResponse, JSONCompareMode.STRICT);
    }

    @Test
    public void getWordsTest() throws Exception {
        testUserManager.signUpDefaultTestUser();
        createWordGlow();
        createWordStop();
        createWordFast();
        createWordFinish();

        String actualAllToLearnWordsResponse = mockMvc.perform(get("/v1/words")
                        .param("status", "TO_LEARN"))
                .andExpect(status().isOk())
                .andReturn().getResponse().getContentAsString(StandardCharsets.UTF_8);

        String expectedAllToLearnWordsResponse = fileReader.read("/response/words/get-to-learn-words-response.json");
        JSONAssert.assertEquals(expectedAllToLearnWordsResponse, actualAllToLearnWordsResponse, JSONCompareMode.STRICT);

        String actualAllLearnedWordsResponse = mockMvc.perform(get("/v1/words")
                        .param("status", "LEARNED"))
                .andExpect(status().isOk())
                .andReturn().getResponse().getContentAsString(StandardCharsets.UTF_8);

        String expectedAllLearnedWordsResponse = fileReader.read("/response/words/get-learned-words-response.json");
        JSONAssert.assertEquals(expectedAllLearnedWordsResponse, actualAllLearnedWordsResponse, JSONCompareMode.STRICT);
    }

    @Test
    public void returnOnlyUsersWords() throws Exception {
        UserResponse user1 = testUserManager.signUp(SignUpRequest.builder()
                .username("aaaaaa")
                .password("aaaaaa")
                .build());

        UserResponse user2 = testUserManager.signUp(SignUpRequest.builder()
                .username("aaaaab")
                .password("aaaaab")
                .build());

        createWordGlow(user("aaaaaa"));
        createWordFinish(user("aaaaab"));

        mockMvc.perform(get("/v1/words").with(user("aaaaaa")))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.data.length()").value(1))
                .andExpect(jsonPath("$.data[*].id").value(GLOW_WORD_ID.toString()));

        mockMvc.perform(get("/v1/words").with(user("aaaaab")))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.data.length()").value(1))
                .andExpect(jsonPath("$.data[*].id").value(FINISH_WORD_ID.toString()));

    }

    @Test
    public void createSerbianWord() throws Exception {
        testUserManager.signUpDefaultTestUser();
        createWord(SERBIAN_WORD_ID,
                "/request/words/create-serbian-word-request.json",
                SERBIAN_WORD_DATE_TIME);

        String actualAllToLearnWordsResponse = mockMvc.perform(get("/v1/words")
                        .param("status", "TO_LEARN")
                        .param("language", "SERBIAN"))
                .andExpect(status().isOk())
                .andReturn().getResponse().getContentAsString(StandardCharsets.UTF_8);

        String expectedAllToLearnWordsResponse = fileReader.read("/response/words/get-serbian-words-response.json");
        JSONAssert.assertEquals(expectedAllToLearnWordsResponse, actualAllToLearnWordsResponse, JSONCompareMode.STRICT);
    }

    private void createWordGlow() throws Exception {
        createWord(GLOW_WORD_ID,
                "/request/words/create-word-glow-request.json",
                GLOW_WORD_DATE_TIME);
    }

    private void createWordGlow(RequestPostProcessor postProcessor) throws Exception {
        createWord(GLOW_WORD_ID,
                "/request/words/create-word-glow-request.json",
                GLOW_WORD_DATE_TIME,
                postProcessor);
    }

    private void createWordStop() throws Exception {
        createWord(STOP_WORD_ID,
                "/request/words/create-word-stop-request.json",
                STOP_WORD_DATE_TIME);
    }

    private void createWordFast() throws Exception {
        createWord(FAST_WORD_ID,
                "/request/words/create-word-fast-request.json",
                FAST_WORD_DATE_TIME);
    }

    private void createWordFinish() throws Exception {
        createWord(FINISH_WORD_ID,
                "/request/words/create-word-finish-request.json",
                FINISH_WORD_DATE_TIME);
    }

    private void createWordFinish(RequestPostProcessor postProcessor) throws Exception {
        createWord(FINISH_WORD_ID,
                "/request/words/create-word-finish-request.json",
                FINISH_WORD_DATE_TIME,
                postProcessor);
    }

    private void createWord(UUID wordId, String requestPath, LocalDateTime datetime) throws Exception {
        uuidGenerator.setUuid(wordId);
        dateTimeGenerator.setDateTime(datetime);
        testWordManager.createWord(requestPath);
    }

    private void createWord(UUID wordId, String requestPath, LocalDateTime datetime, RequestPostProcessor postProcessor) throws Exception {
        uuidGenerator.setUuid(wordId);
        dateTimeGenerator.setDateTime(datetime);
        testWordManager.createWord(requestPath, postProcessor);
    }
}
