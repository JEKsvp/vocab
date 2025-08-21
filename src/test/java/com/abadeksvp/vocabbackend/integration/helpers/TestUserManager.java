package com.abadeksvp.vocabbackend.integration.helpers;

import com.abadeksvp.vocabbackend.model.api.LoginRequest;
import com.abadeksvp.vocabbackend.model.api.SignUpRequest;
import com.abadeksvp.vocabbackend.model.api.UserResponse;
import com.abadeksvp.vocabbackend.service.UserService;
import lombok.SneakyThrows;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;

import jakarta.validation.Valid;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
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
    public HttpHeaders obtainAuthHeader(String login, String password) {
        LoginRequest loginRequest = new LoginRequest(login, password);
        String body = TestObjectMapper.getInstance().writeValueAsString(loginRequest);
        MvcResult result = this.mockMvc.perform(post("/v1/login")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(body))
                .andExpect(status().isOk())
                .andReturn();

        String setCookie = result.getResponse().getHeader(HttpHeaders.SET_COOKIE);
        String cookieValue = null;
        if (setCookie != null) {
            int idx = setCookie.indexOf(';');
            cookieValue = idx > 0 ? setCookie.substring(0, idx) : setCookie;
        }
        MultiValueMap<String, String> map = new LinkedMultiValueMap<>();
        if (cookieValue != null) {
            map.add(HttpHeaders.COOKIE, cookieValue);
        }
        return new HttpHeaders(map);
    }

    @SneakyThrows
    public HttpHeaders obtainDefaultUserHeader() {
        return obtainAuthHeader(DEFAULT_TEST_USERNAME, DEFAULT_TEST_PASSWORD);
    }
}
