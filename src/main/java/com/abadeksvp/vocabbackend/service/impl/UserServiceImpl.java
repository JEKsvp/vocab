package com.abadeksvp.vocabbackend.service.impl;

import com.abadeksvp.vocabbackend.exceptions.ApiException;
import com.abadeksvp.vocabbackend.mapping.mapper.SignUpRequestAndUserMapper;
import com.abadeksvp.vocabbackend.mapping.mapper.UserToUserResponseMapper;
import com.abadeksvp.vocabbackend.model.api.SignUpRequest;
import com.abadeksvp.vocabbackend.model.api.UserResponse;
import com.abadeksvp.vocabbackend.model.db.User;
import com.abadeksvp.vocabbackend.repository.UserRepository;
import com.abadeksvp.vocabbackend.service.UserService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.text.MessageFormat;
import java.util.Optional;

@Service
@Slf4j
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;
    private final SignUpRequestAndUserMapper createUserRequestToUser;
    private final UserToUserResponseMapper userToUserResponse;

    public UserServiceImpl(UserRepository userRepository,
                           SignUpRequestAndUserMapper createUserRequestToUser,
                           UserToUserResponseMapper userToUserResponse) {
        this.userRepository = userRepository;
        this.createUserRequestToUser = createUserRequestToUser;
        this.userToUserResponse = userToUserResponse;
    }

    @Override
    public UserResponse signUp(SignUpRequest request) {
        log.debug("Starting user signup process for username: {}", request.getUsername());
        if (userRepository.findByUsername(request.getUsername()).isPresent()) {
            log.debug("User signup failed - username already exists: {}", request.getUsername());
            throw new ApiException(MessageFormat.format("User with username {0} already exists.", request.getUsername()), HttpStatus.CONFLICT);
        }
        log.debug("Creating new user entity for username: {}", request.getUsername());
        User newUser = createUserRequestToUser.map(request);
        User createdUser = userRepository.save(newUser);
        log.debug("User successfully created with ID: {} for username: {}", createdUser.getId(), createdUser.getUsername());
        return userToUserResponse.map(createdUser);
    }

    @Override
    public Optional<UserResponse> findByUserName(String username) {
        log.debug("Finding user by username: {}", username);
        Optional<UserResponse> result = userRepository.findByUsername(username)
                .map(userToUserResponse::map);
        log.debug("User search result for username {}: {}", username, result.isPresent() ? "found" : "not found");
        return result;
    }

}
