package com.abadeksvp.vocabbackend.integration.helpers;

import com.abadeksvp.vocabbackend.model.api.SignUpRequest;
import com.abadeksvp.vocabbackend.model.api.UserResponse;
import com.abadeksvp.vocabbackend.service.UserService;
import lombok.SneakyThrows;
import org.springframework.boot.json.JacksonJsonParser;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.ResultActions;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;

import javax.validation.Valid;

import static com.abadeksvp.vocabbackend.integration.helpers.DefaultClient.CLIENT_ID;
import static com.abadeksvp.vocabbackend.integration.helpers.DefaultClient.SECRET;
import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.httpBasic;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

public class TestUserManager {

    private final UserService userService;
    private final MockMvc mockMvc;

    public static final String DEFAULT_TEST_USERNAME = "test_username";
    public static final String DEFAULT_TEST_PASSWORD = "test_password";

    private static final SignUpRequest DEFAULT_SIGNUP = SignUpRequest.builder()
            .username(DEFAULT_TEST_USERNAME)
            .password(DEFAULT_TEST_PASSWORD)
            .build();

    public TestUserManager(UserService userService, MockMvc mockMvc) {
        this.userService = userService;
        this.mockMvc = mockMvc;
    }

    @SneakyThrows
    public UserResponse signUp(@Valid SignUpRequest signUpRequest) {
        return userService.signUp(signUpRequest);
    }

    public HttpHeaders signUpUserAndAuthHeader(){
        signUpDefaultTestUser();
        return obtainDefaultUserHeader();
    }

    public UserResponse signUpDefaultTestUser() {
        return userService.signUp(DEFAULT_SIGNUP);
    }

    @SneakyThrows
    public String obtainAccessToken(String login, String password) {
        MultiValueMap<String, String> params = new LinkedMultiValueMap<>();
        params.add("grant_type", "password");
        params.add("username", login);
        params.add("password", password);

        ResultActions result
                = this.mockMvc.perform(post("/oauth/token")
                        .params(params)
                        .with(httpBasic(CLIENT_ID, SECRET))
                        .accept(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8));

        String resultString = result.andReturn().getResponse().getContentAsString();

        JacksonJsonParser jsonParser = new JacksonJsonParser();
        return jsonParser.parseMap(resultString).get("access_token").toString();
    }

    @SneakyThrows
    public HttpHeaders obtainAuthHeader(String login, String password) {
        MultiValueMap<String, String> map = new LinkedMultiValueMap<>();
        String token = obtainAccessToken(login, password);
        map.add("Authorization", "Bearer " + token);
        return new HttpHeaders(map);
    }

    @SneakyThrows
    public HttpHeaders obtainDefaultUserHeader() {
        return obtainAuthHeader(DEFAULT_TEST_USERNAME, DEFAULT_TEST_PASSWORD);
    }
}
