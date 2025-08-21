package com.abadeksvp.vocabbackend.service;

import com.abadeksvp.vocabbackend.model.api.SignUpRequest;
import com.abadeksvp.vocabbackend.model.api.UserResponse;

import java.util.Optional;

public interface UserService {

    UserResponse signUp(SignUpRequest user);
    Optional<UserResponse> findByUserName(String username);
}
